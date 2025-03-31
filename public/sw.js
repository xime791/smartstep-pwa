function insertIndexedDB(data) {
    let request = indexedDB.open("database", 1);

    request.onupgradeneeded = event => {
        let db = event.target.result;
        if (!db.objectStoreNames.contains("libros")) {
            db.createObjectStore("libros", { autoIncrement: true });
        }
    };

    request.onsuccess = event => {
        let db = event.target.result;
        let transaction = db.transaction("libros", "readwrite");
        let store = transaction.objectStore("libros");

        store.add(data);
        console.log("Usuario guardado en IndexedDB (sin conexión):", data);
    };
}

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('appShell').then(cache => {
            return cache.addAll([
                "/src/index.css",
                "/src/App.css",
                "/src/App.jsx",
                "/src/main.jsx",
                "/src/components/Login.jsx",
                "/src/components/Register.jsx"
            ]);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    caches.delete("appShell-1");
    caches.delete("dinamico-1");
});

self.addEventListener('fetch', event => {
    if (event.request.method === "POST" && event.request.url.includes("/api/usuarios")) {
        event.respondWith(
            fetch(event.request).catch(() => {
                event.request.clone().json().then(data => {
                    insertIndexedDB(data);
                    self.registration.sync.register("syncUsers");
                });
                return new Response(JSON.stringify({ message: "Usuario guardado en IndexedDB y será sincronizado cuando haya internet" }), {
                    headers: { "Content-Type": "application/json" }
                });
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(response => {
                return response || fetch(event.request).then(resp => {
                    return caches.open('dinamico').then(cache => {
                        cache.put(event.request, resp.clone());
                        return resp;
                    });
                });
            }).catch(() => {
                return caches.match(event.request);
            })
        );
    }
});

self.addEventListener('sync', event => {
    if (event.tag === "syncUsers") {
        console.log("Intentando sincronizar usuarios con MongoDB...");

        event.waitUntil(
            new Promise((resolve, reject) => {
                let request = indexedDB.open("database", 1);
                request.onsuccess = event => {
                    let db = event.target.result;
                    let transaction = db.transaction("libros", "readwrite");
                    let store = transaction.objectStore("libros");

                    let getAllRequest = store.getAll();
                    getAllRequest.onsuccess = () => {
                        let users = getAllRequest.result;
                        if (users.length === 0) {
                            console.log("No hay usuarios pendientes de sincronización.");
                            return resolve();
                        }

                        let syncPromises = users.map(user =>
                            fetch("/api/usuarios", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(user)
                            })
                        );

                        Promise.all(syncPromises)
                            .then(() => {
                                let clearTransaction = db.transaction("libros", "readwrite");
                                let clearStore = clearTransaction.objectStore("libros");
                                clearStore.clear();
                                console.log("Usuarios sincronizados y eliminados de IndexedDB.");
                                resolve();
                            })
                            .catch(reject);
                    };
                };
            })
        );
    }
});


self.addEventListener('push', event => {
    self.registration.showNotification("Tienes una notificación");
});


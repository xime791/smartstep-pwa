import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../views/Register"; // Ajusta la ruta según tu estructura

test("Renderiza el formulario de registro y permite escribir en los inputs", () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  // Verificar que el título "Registro" está en la pantalla
  expect(screen.getByText("Registro")).toBeInTheDocument();

  // Buscar los inputs y simular escritura
  const nombreInput = screen.getByPlaceholderText("Nombre completo");
  const correoInput = screen.getByPlaceholderText("Correo electrónico");
  const passwordInput = screen.getByPlaceholderText("Contraseña");

  fireEvent.change(nombreInput, { target: { value: "Ximena Tiscareño" } });
  fireEvent.change(correoInput, { target: { value: "ximena@gmail.com" } });
  fireEvent.change(passwordInput, { target: { value: "123456" } });

  // Comprobar que los valores se actualizaron
  expect(nombreInput.value).toBe("Ximena Tiscareño");
  expect(correoInput.value).toBe("ximena@gmail.com");
  expect(passwordInput.value).toBe("123456");
});

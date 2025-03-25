import React, { useEffect, useState } from "react"; 
import { Bar } from "react-chartjs-2"; 
import { 
  Chart as ChartJS, 
  Title, 
  Tooltip, 
  Legend, 
  BarElement, 
  LinearScale, 
  CategoryScale 
} from "chart.js"; 
import "chartjs-adapter-date-fns"; 
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(Title, Tooltip, Legend, BarElement, LinearScale, CategoryScale);

const FootPressureChart = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date("2025-03-01")); // Fecha inicial

  useEffect(() => {
    const generateRandomData = () => {
      const labels = ["Pie Izquierdo", "Pie Derecho"];
      const data = [Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)]; // Fuerza aleatoria entre 0 y 1000

      return { labels, data };
    };

    const { labels, data } = generateRandomData();

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Fuerza (N)",
          data: data,
          backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(75, 192, 192, 0.6)"],
        },
      ],
    });
  }, []); // Solo se ejecuta una vez al montar el componente

  // Actualizar los datos cuando cambie la fecha seleccionada
  useEffect(() => {
    const updatedData = {
      labels: ["Pie Izquierdo", "Pie Derecho"],
      datasets: [
        {
          label: "Fuerza (N)",
          data: [Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)], // Nuevos valores aleatorios
          backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(75, 192, 192, 0.6)"],
        },
      ],
    };

    setChartData(updatedData);
  }, [selectedDate]); // Actualiza los datos al cambiar la fecha

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false, // Desactivar la relación de aspecto
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 10 }, // Reducir tamaño de fuente de las etiquetas de la leyenda
        },
      },
      title: { 
        display: true, 
        text: "Fuerza Ejercida en Cada Pie",
        font: {
          size: 14, // Reducir tamaño del título
        }
      },
    },
    scales: {
      x: {
        title: { 
          display: true, 
          text: "Pies",
          font: { size: 12 }, // Reducir tamaño de fuente del título del eje X
        },
        ticks: {
          font: { size: 10 }, // Reducir tamaño de fuente de las etiquetas del eje X
        },
      },
      y: {
        title: { 
          display: true, 
          text: "Fuerza (N)",
          font: { size: 12 }, // Reducir tamaño de fuente del título del eje Y
        },
        ticks: {
          font: { size: 10 }, // Reducir tamaño de fuente de las etiquetas del eje Y
        },
      },
    },
    animation: {
      duration: 200, // Duración de la animación en milisegundos
      easing: 'easeInOutQuad', // Tipo de easing para suavizar la transición
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", margin: "20px" }}>
      <h1 style={{ fontSize: "20px", marginBottom: "10px" }}>Fuerza Ejercida en Cada Pie</h1>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        style={{ marginBottom: "10px" }}
      />
      {chartData ? (
        <div style={{ width: "1000px", height: "440px" }}> {/* Ajustar el tamaño de la gráfica */}
          <Bar data={chartData} options={barOptions} />
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default FootPressureChart;

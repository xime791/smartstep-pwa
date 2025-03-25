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

const DailyStepsBarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date("2025-03-01"));

  useEffect(() => {
    const generateRandomData = () => {
      const labels = [];
      const data = [];
      const startDate = new Date("2025-03-01");
      for (let i = 0; i < 31; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        labels.push(date.toLocaleDateString());
        const steps = Math.floor(Math.random() * 10000);
        data.push(steps);
      }
      return { labels, data };
    };

    const { labels, data } = generateRandomData();

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Pasos Diarios",
          data: data,
          backgroundColor: data.map((_, index) => {
            const date = new Date("2025-03-01");
            date.setDate(date.getDate() + index);
            return date.toLocaleDateString() === selectedDate.toLocaleDateString()
              ? "rgba(255, 99, 132, 0.6)"
              : "rgba(75, 192, 192, 0.6)";
          }),
        },
      ],
    });
  }, []);

  useEffect(() => {
    if (chartData) {
      const updatedColors = chartData.datasets[0].data.map((_, index) => {
        const date = new Date("2025-03-01");
        date.setDate(date.getDate() + index);
        return date.toLocaleDateString() === selectedDate.toLocaleDateString()
          ? "rgba(255, 99, 132, 0.6)"
          : "rgba(75, 192, 192, 0.6)";
      });

      // Solo actualiza si los colores han cambiado
      const hasChanged = updatedColors.some((color, index) => color !== chartData.datasets[0].backgroundColor[index]);

      if (hasChanged) {
        setChartData((prevData) => ({
          ...prevData,
          datasets: prevData.datasets.map((dataset) => ({
            ...dataset,
            backgroundColor: updatedColors,
          })),
        }));
      }
    }
  }, [selectedDate, chartData]);

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false, // Desactivar la relación de aspecto para tener más control
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 10 }, // Reducir tamaño de la fuente de las leyendas
        },
      },
      title: { 
        display: true, 
        text: "Progreso Diario de Pasos",
        font: {
          size: 14, // Reducir tamaño del título
        },
      },
    },
    scales: {
      x: {
        title: { 
          display: true, 
          text: "Fecha",
          font: { size: 12 }, // Reducir tamaño de fuente del título del eje X
        },
        ticks: {
          font: { size: 10 }, // Reducir tamaño de fuente de las etiquetas del eje X
        },
      },
      y: {
        title: { 
          display: true, 
          text: "Pasos",
          font: { size: 12 }, // Reducir tamaño de fuente del título del eje Y
        },
        ticks: {
          font: { size: 10 }, // Reducir tamaño de fuente de las etiquetas del eje Y
        },
      },
    },
    animation: {
      duration: 0, // Desactivar la animación para mayor rapidez y fluidez
      easing: 'easeInOutQuad',
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "20px" }}>
      <h1 style={{ fontSize: "20px", marginBottom: "10px" }}>Progreso Diario de Pasos</h1>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        maxDate={new Date("2025-03-31")}
        minDate={new Date("2025-03-01")}
        style={{ marginBottom: "10px" }}
      />
      {chartData ? (
        <div style={{ width: "990px", height: "430px" }}> {/* Ajusta el tamaño de la gráfica */}
          <Bar data={chartData} options={barOptions} />
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default DailyStepsBarChart;

'use client'
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import './page.css';

Chart.register(ArcElement, Tooltip, Legend);

const getColor = (value: number) => {
  if (value < 20) return '#ff0000'; // Đỏ
  if (value < 40) return '#ffa500'; // Cam
  if (value < 60) return '#ffff00'; // Vàng
  if (value < 80) return '#00ff00'; // Xanh lá cây
  return '#008000'; // Xanh đậm
};

const drawCenterText = {
  id: 'drawCenterText',
  beforeDraw: (chart: any) => {
    const { width, height, ctx } = chart;
    const text = chart.config.options?.plugins?.center?.text || '';
    const color = chart.config.options?.plugins?.center?.color || '#000';
    const fontStyle = 'Calibri';

    ctx.save();
    ctx.font = `bold ${Math.round((height as number) / 4)}px ${fontStyle}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    const centerX = width / 1.9;
    const centerY = height / 1.1; // Điều chỉnh vị trí Y để văn bản nằm ở cạnh dưới của biểu đồ
    ctx.fillStyle = color;
    ctx.fillText(text, centerX, centerY);
    ctx.restore();
  },
};

Chart.register(drawCenterText);

const TaGaugeChart: React.FC<{}> = ({ }) => {

  const value = 20.15
  const data: any = {
    datasets: [
      {
        data: [value, 100 - value], // Tỷ lệ phần trăm của gauge
        backgroundColor: [getColor(value), '#e0e0e0'], // Màu sắc của gauge
        borderWidth: 0,
        cutout: '80%',
        rotation: 270,
        circumference: 180,
        weight: 1,
      },
    ],
  };

  const options: any = {
    rotation: -90,
    circumference: 180,
    cutout: '80%',
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      center: {
        text: `${value}%`,
        color: getColor(value),
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="ta-gauge-chart-container">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default TaGaugeChart;

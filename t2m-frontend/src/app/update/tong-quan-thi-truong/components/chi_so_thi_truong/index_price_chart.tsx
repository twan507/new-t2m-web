import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const IndexPriceChart = (props: any) => {
	const data = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: 'My First dataset',
				data: [65, 59, 80, 81, 56, 55, 40],
				fill: true,
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				borderColor: 'rgba(75, 192, 192, 1)',
			},
		],
	};

	const options: any = {
		responsive: true,
		maintainAspectRatio: false, // Đảm bảo biểu đồ sẽ điều chỉnh kích thước theo container
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
			},
			tooltip: {
				mode: 'index',
				intersect: false,
			},
		},
		interaction: {
			mode: 'index',
			intersect: false,
		},
	};

	return (
		<div style={{ width: props?.width, height: props?.height, marginLeft: '25px' }}>
			<Line data={data} options={options} />
		</div>
	);
};

export default IndexPriceChart;







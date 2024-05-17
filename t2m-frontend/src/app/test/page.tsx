'use client'
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels // Đăng ký plugin datalabels
);

const NnTdHispory = (props: any) => {
    // Tạo sample dataset
    const sampleData = [
        { date: '2024-05-01', nn_value: 150, td_value: -100 },
        { date: '2024-05-02', nn_value: -200, td_value: 200 },
        { date: '2024-05-03', nn_value: 300, td_value: -150 },
        { date: '2024-05-04', nn_value: -100, td_value: 100 },
        { date: '2024-05-05', nn_value: 50, td_value: -50 },
    ];

    const dateList: string[] = sampleData.map((item: any) => {
        const date = new Date(item.date);
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Lấy tháng và thêm số 0 nếu cần
        const day = ('0' + date.getDate()).slice(-2); // Lấy ngày và thêm số 0 nếu cần
        return `${day}-${month}`;
    });

    const data = {
        labels: dateList || [],
        datasets: [
            {
                label: 'NN Value',
                data: sampleData.map((item: any) => item.nn_value),
                backgroundColor: '#C031C7',
            },
            {
                label: 'TD Value',
                data: sampleData.map((item: any) => item.td_value),
                backgroundColor: '#025bc4',
            },
        ],
    };

    const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: {
                    boxWidth: 20, // Độ rộng của hộp màu trong legend
                    boxHeight: 8,
                    padding: 10, // Khoảng cách giữa các mục trong legend
                    pointStyle: 'circle', // Đặt kiểu điểm thành hình tròn
                    usePointStyle: true, // Bảo đảm sử dụng pointStyle cho biểu tượng
                    font: {
                        size: 15, // Điều chỉnh cỡ chữ của legend
                        family: 'Calibri', // Điều chỉnh font chữ của legend
                    },
                }
            },
            title: {
                display: true,
                text: 'Lịch sử mua/bán ròng 20 phiên',
                padding: {
                    bottom: 20, // Tăng khoảng cách phía dưới tiêu đề
                },
                font: {
                    family: 'Calibri, sans-serif',
                    size: props?.fontSize, // Chỉnh sửa cỡ chữ
                    weight: 'bold', // Chỉnh sửa kiểu chữ
                },
                color: '#dfdfdf' // Chỉnh sửa màu chữ
            },
            datalabels: {
                display: props?.ww > 768 ? true : false,
                anchor: (context: any) => {
                    const value = context.dataset.data[context.dataIndex];
                    return value > 0 ? 'end' : 'start';
                },
                align: (context: any) => {
                    const value = context.dataset.data[context.dataIndex];
                    return value > 0 ? 'top' : 'bottom';
                },
                formatter: (value: any) => Math.round(value).toLocaleString(), // Định dạng giá trị hiển thị
                font: {
                    family: 'Helvetica, sans-serif',
                    size: parseInt(props?.fontSize) - 7, // Chỉnh sửa cỡ chữ
                },
                color: '#dfdfdf',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Loại bỏ grid dọc
                },
                ticks: {
                    color: '#dfdfdf', // Màu của các nhãn trên trục X
                    padding: 5, // Khoảng cách giữa các nhãn và trục x
                },
            },
            y: {
                position: 'right',
                grid: {
                    display: false, // Loại bỏ grid ngang
                },
                ticks: {
                    color: '#dfdfdf', // Màu của các nhãn trên trục X
                },
            },
        },
    };

    const [checkAuth, setCheckAuth] = useState(true);
    useEffect(() => {
        setCheckAuth(false)
    }, []);

    if (!checkAuth) {
        return (
            <>
                <div style={{ height: '200px', width: '100%' }}>
                    <Bar data={data} options={options} />;
                </div>
            </>
        )
    }
};

export default NnTdHispory;

'use client'
import { sendRequest } from "@/utlis/api"
import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function MarketBreathChart() {
  const getData = async (tableName: string) => {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_STOCK_API}/stock/v1/database/${tableName}`,
      method: "GET",
    })
    if (tableName === 'market_info_df') {
      set_market_info_df(res.data)
    }
  }

  useEffect(() => {
    getData('market_info_df')
  }, [])

  const [market_info_df, set_market_info_df] = useState<any[]>([]);

  console.log(market_info_df.map(item => (item.count / (market_info_df.reduce((sum, item) => sum + item.count, 0))).toFixed(2)))

  const data = {
    labels: market_info_df.map(item => item.name),
    datasets: [
      {
        label: '',
        data: market_info_df.map(item => item.count), // Giá trị value từ dữ liệu của bạn
        backgroundColor: [
          '#24B75E', // Màu cho Tăng giá
          '#D0be0f', // Màu cho Không đổi
          '#e14040',  // Màu cho Giảm giá
        ],
        borderColor: [
          '#24B75E',
          '#D0be0f',
          '#e14040',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const label = data.labels[tooltipItem.dataIndex];
            const value = tooltipItem.raw;
            const percentage = ((value / market_info_df.reduce((sum, item) => sum + item.count, 0)) * 100).toFixed(2) + '%';
            return `Số lượng: ${value} (${percentage})`;
          }
        }
      },
      legend: {
        position: 'right', // Đặt vị trí của legend sang bên phải
        align: 'center', // Căn giữa legend theo chiều dọc
        labels: {
          boxWidth: 10, // Độ rộng của hộp màu trong legend
          padding: 20, // Khoảng cách giữa các mục trong legend
          pointStyle: 'circle', // Đặt kiểu điểm thành hình tròn
          usePointStyle: true // Bảo đảm sử dụng pointStyle cho biểu tượng
        }
      }
    }
  };

  const [checkAuth, setCheckAuth] = useState(true);
  useEffect(() => {
    setCheckAuth(false)
  }, []);
  if (!checkAuth) {
    return (
      <div style={{ width: '400px', height: '200px' }}> {/* Điều chỉnh kích thước container */}
        <Pie data={data} options={options} />
      </div>
    )
  }
}

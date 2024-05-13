'use client'
import { sendRequest } from "@/utlis/api"
import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";

export default function TestPage() {
  const getData = async () => {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_STOCK_API}/stock/v1/database`,
      method: "GET",
    })
    setTableList(res.data)
  }

  useEffect(() => {
    getData()
  }, [])

  const [tableList, setTableList] = useState([]);
  const [checkAuth, setCheckAuth] = useState(true);
  useEffect(() => {
    setCheckAuth(false)
  }, []);
  if (!checkAuth) {
    return (
      <>
        <Row>
          <Col>
            <Row>
              <h1>Thống kê hiệu quả hoạt động</h1>
            </Row>
            <Row>
              <Col span={8} style={{ background: 'blue', height: '300px' }}>
              </Col>
            </Row>
          </Col>
        </Row >
      </>
    )
  }
}

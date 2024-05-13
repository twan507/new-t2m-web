'use client'
import { sendRequest } from "@/utlis/api"
import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import MarketBreathChart from "./components/market_breath";

export default function Page1() {
  const getData = async (tableName: string) => {
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_STOCK_API}/stock/v1/database/${tableName}`,
      method: "GET",
    })
    if (tableName === 'update_time') {
      set_update_time(res.data)
    } else if (tableName === 'index_card_df') {
      set_index_card_df(res.data)
    } else if (tableName === 'market_info_df') {
      set_market_info_df(res.data)
    }
  }

  useEffect(() => {
    getData('update_time')
    getData('index_card_df')
    getData('market_info_df')
  }, [])

  const [update_time, set_update_time] = useState<any[]>([]);
  const [index_card_df, set_index_card_df] = useState<any[]>([]);
  const [market_info_df, set_market_info_df] = useState<any[]>([]);

  console.log(market_info_df)


  const [checkAuth, setCheckAuth] = useState(true);
  useEffect(() => {
    setCheckAuth(false)
  }, []);
  if (!checkAuth) {
    return (
      <>
        <Col style={{
          display: 'flex',
          justifyContent: 'center',  // Căn giữa ngang
          alignItems: 'center',      // Căn giữa dọc
          marginTop: '30px'
        }}>
          <Row>
            <Col style={{ width: '1230px' }}>
              <Row style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <p style={{ color: 'white', fontSize: '30px', fontFamily: 'Calibri, sans-serif', margin: 0, padding: 0, fontWeight: 'bold' }}>Chỉ số thị trường</p>
                <p style={{ color: 'white', fontSize: '14px', fontFamily: 'Calibri, sans-serif', margin: 0, padding: 0 }}>{update_time[0]?.date}</p>
              </Row>
              <Row gutter={10}>
                <Col span={4}>
                  <div style={{ height: '60px', background: '#161616', borderRadius: '5px', marginBottom: '10px' }}>
                    <p style={{ color: 'white', fontSize: '18px', fontFamily: 'Calibri, sans-serif', fontWeight: 'bold', margin: '0px 0px 0px 5px', padding: 5 }}>
                      {index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.stock}
                    </p>
                    <div style={{ display: 'flex', margin: 0, padding: 0 }}>
                      <p style={{ color: 'white', fontSize: '16px', fontFamily: 'Calibri, sans-serif', fontWeight: 'bold', margin: '0px 0px 0px 10px', padding: 0 }}>
                        {index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.close}
                      </p>
                      <p style={{
                        fontSize: '16px', fontFamily: 'Calibri, sans-serif',
                        fontWeight: 'bold', margin: '0px 0px 0px 15px', padding: 0,
                        color: (index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.change_value.toFixed(2)}
                      </p>
                      <p style={{
                        fontSize: '16px', fontFamily: 'Calibri, sans-serif', color: 'white',
                        fontWeight: 'bold', margin: '-2px 0px 0px 15px', padding: '2px 3px 2px 3px', borderRadius: '5px',
                        background: (index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {((index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.change_percent) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                  <div style={{ height: '60px', background: '#161616', borderRadius: '5px', marginBottom: '10px' }}>
                    <p style={{ color: 'white', fontSize: '18px', fontFamily: 'Calibri, sans-serif', fontWeight: 'bold', margin: '0px 0px 0px 5px', padding: 5 }}>
                      {index_card_df.filter(item => item.stock === 'VN30')[0]?.stock}
                    </p>
                    <div style={{ display: 'flex', margin: 0, padding: 0 }}>
                      <p style={{ color: 'white', fontSize: '16px', fontFamily: 'Calibri, sans-serif', fontWeight: 'bold', margin: '0px 0px 0px 10px', padding: 0 }}>
                        {index_card_df.filter(item => item.stock === 'VN30')[0]?.close}
                      </p>
                      <p style={{
                        fontSize: '16px', fontFamily: 'Calibri, sans-serif',
                        fontWeight: 'bold', margin: '0px 0px 0px 15px', padding: 0,
                        color: (index_card_df.filter(item => item.stock === 'VN30')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'VN30')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'VN30')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {index_card_df.filter(item => item.stock === 'VN30')[0]?.change_value.toFixed(2)}
                      </p>
                      <p style={{
                        fontSize: '16px', fontFamily: 'Calibri, sans-serif', color: 'white',
                        fontWeight: 'bold', margin: '-2px 0px 0px 15px', padding: '2px 3px 2px 3px', borderRadius: '5px',
                        background: (index_card_df.filter(item => item.stock === 'VN30')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'VN30')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'VN30')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {((index_card_df.filter(item => item.stock === 'VN30')[0]?.change_percent) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                  <div style={{ height: '60px', background: '#161616', borderRadius: '5px', marginBottom: '10px' }}>
                    <p style={{ color: 'white', fontSize: '18px', fontFamily: 'Calibri, sans-serif', fontWeight: 'bold', margin: '0px 0px 0px 5px', padding: 5 }}>
                      {index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.stock}
                    </p>
                    <div style={{ display: 'flex', margin: 0, padding: 0 }}>
                      <p style={{ color: 'white', fontSize: '16px', fontFamily: 'Calibri, sans-serif', fontWeight: 'bold', margin: '0px 0px 0px 10px', padding: 0 }}>
                        {index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.close}
                      </p>
                      <p style={{
                        fontSize: '16px', fontFamily: 'Calibri, sans-serif',
                        fontWeight: 'bold', margin: '0px 0px 0px 15px', padding: 0,
                        color: (index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.change_value.toFixed(2)}
                      </p>
                      <p style={{
                        fontSize: '16px', fontFamily: 'Calibri, sans-serif', color: 'white',
                        fontWeight: 'bold', margin: '-2px 0px 0px 15px', padding: '2px 3px 2px 3px', borderRadius: '5px',
                        background: (index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {((index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.change_percent) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                  <div style={{ height: '60px', background: '#161616', borderRadius: '5px', marginBottom: '10px' }}>
                    <p style={{ color: 'white', fontSize: '18px', fontFamily: 'Calibri, sans-serif', fontWeight: 'bold', margin: '0px 0px 0px 5px', padding: 5 }}>
                      {index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.stock}
                    </p>
                    <div style={{ display: 'flex', margin: 0, padding: 0 }}>
                      <p style={{ color: 'white', fontSize: '16px', fontFamily: 'Calibri, sans-serif', fontWeight: 'bold', margin: '0px 0px 0px 10px', padding: 0 }}>
                        {index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.close}
                      </p>
                      <p style={{
                        fontSize: '16px', fontFamily: 'Calibri, sans-serif',
                        fontWeight: 'bold', margin: '0px 0px 0px 15px', padding: 0,
                        color: (index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.change_value.toFixed(2)}
                      </p>
                      <p style={{
                        fontSize: '16px', fontFamily: 'Calibri, sans-serif', color: 'white',
                        fontWeight: 'bold', margin: '-2px 0px 0px 15px', padding: '2px 3px 2px 3px', borderRadius: '5px',
                        background: (index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {((index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.change_percent) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                  <div style={{ height: '60px', background: '#161616', borderRadius: '5px', marginBottom: '10px' }}>
                    <p style={{ color: 'white', fontSize: '18px', fontFamily: 'Calibri, sans-serif', fontWeight: 'bold', margin: '0px 0px 0px 5px', padding: 5 }}>
                      {index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.stock}
                    </p>
                    <div style={{ display: 'flex', margin: 0, padding: 0 }}>
                      <p style={{ color: 'white', fontSize: '16px', fontFamily: 'Calibri, sans-serif', fontWeight: 'bold', margin: '0px 0px 0px 10px', padding: 0 }}>
                        {index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.close}
                      </p>
                      <p style={{
                        fontSize: '16px', fontFamily: 'Calibri, sans-serif',
                        fontWeight: 'bold', margin: '0px 0px 0px 15px', padding: 0,
                        color: (index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.change_value.toFixed(2)}
                      </p>
                      <p style={{
                        fontSize: '16px', fontFamily: 'Calibri, sans-serif', color: 'white',
                        fontWeight: 'bold', margin: '-2px 0px 0px 15px', padding: '2px 3px 2px 3px', borderRadius: '5px',
                        background: (index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {((index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.change_percent) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </Col>
                <Col span={20}>
                  <Row gutter={10} style={{ height: '60px', marginBottom: '10px' }}>
                    <Col span={12}>
                      <div style={{ background: 'blue', width: '100%', height: '100%' }} />
                    </Col>
                    <Col span={12}>
                      <div style={{ background: 'blue', width: '100%', height: '100%' }} />
                    </Col>
                  </Row>
                  <Row>
                    <MarketBreathChart />
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row >
        </Col >
      </>
    )
  }
}

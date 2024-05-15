'use client'
import { sendRequest } from "@/utlis/api"
import { Button, Card, Col, Menu, MenuProps, Radio, Row } from "antd";
import { useEffect, useState } from "react";
import MarketBreathChart from "./components/chi_so_thi_truong/market_breath";
import MarketTopStockChart from "./components/chi_so_thi_truong/market_top_stock";
import IndexPriceChart from "./components/chi_so_thi_truong/index_price_chart";
import './styles.css'
import TaTable from "./components/chi_so_thi_truong/index_ta_table";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(Math.min(window.innerWidth, 1250));

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(Math.min(window.innerWidth, 1250));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowWidth;
};

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
    } else if (tableName === 'index_price_chart_df') {
      set_index_price_chart_df(res.data)
    } else if (tableName === 'ta_index_df') {
      set_ta_index_df(res.data)
    }
  }

  useEffect(() => {
    getData('update_time')
    getData('index_card_df')
    getData('market_info_df')
    getData('index_price_chart_df')
    getData('ta_index_df')
  }, [])

  //State lưu trữ dữ liệu cổ phiếu
  const [update_time, set_update_time] = useState<any[]>([]);
  const [index_card_df, set_index_card_df] = useState<any[]>([]);
  const [market_info_df, set_market_info_df] = useState<any[]>([]);
  const [index_price_chart_df, set_index_price_chart_df] = useState<any[]>([]);
  const [ta_index_df, set_ta_index_df] = useState<any[]>([]);

  //State lưu giữ trạng thái hiển thị của các nút bấm
  const [chi_so_thi_truong, set_chi_so_thi_truong] = useState('TQ');
  const [time_span, set_time_span] = useState('1Y');
  const [index_name, set_index_name] = useState('VNINDEX');
  const [mobile_ta_mode, set_mobile_ta_mode] = useState('month');

  const ww = useWindowWidth();
  console.log(ww)
  const pixel = (ratio: number, min: number) => {
    return `${Math.max(ratio * ww, min).toFixed(0)}px`;
  }

  const onChangeChiSoThiTruong = (e: any) => {
    const value = e.target.value;
    set_chi_so_thi_truong(value)
  };

  const onChangeChiSoThiTruongMobile: MenuProps['onClick'] = (e) => {
    set_chi_so_thi_truong(e.key);
  };

  const onChangeIndexPriceChartTimeSpan = (e: any) => {
    const value = e.target.value;
    set_time_span(value)
  };

  const onChangeMobileTaMode = (e: any) => {
    const value = e.target.value;
    set_mobile_ta_mode(value)
  };

  const chi_so_thi_truong_mobile_items: any = [
    {
      key: 'TQ',
      label: 'Tổng quan',
    },
    {
      key: 'BD',
      label: 'Biểu đồ',
    },
    {
      key: 'PTKT',
      label: 'PTKT',
    },
  ];

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
            <Col style={{ width: ww, margin: 0.03 * ww }}>
              <Row style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <p style={{ color: 'white', fontSize: pixel(0.025, 18), fontFamily: 'Calibri, sans-serif', margin: 0, padding: 0, fontWeight: 'bold' }}>Chỉ số thị trường</p>
                <p style={{ color: 'white', fontSize: pixel(0.011, 10), fontFamily: 'Calibri, sans-serif', margin: 0, padding: 0 }}>{update_time[0]?.date}</p>
              </Row>
              <Row gutter={10}>
                <Col xs={8} sm={6} md={5} lg={5} xl={4}>
                  <Button onClick={() => { set_index_name('VNINDEX') }} type='text' style={{
                    height: '60px', background: '#161616', borderRadius: '5px',
                    margin: 0, padding: 0, width: '100%',
                    marginBottom: '10px', display: 'flex', flexDirection: 'column'
                  }}>
                    <p style={{
                      height: '28px', color: 'white', fontSize: pixel(0.015, 14), fontFamily: 'Calibri, sans-serif', fontWeight: 'bold',
                      margin: `1px 0px 0px ${pixel(0.01, 0)}`, display: 'flex', alignItems: 'center'
                    }}>
                      {index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.stock}
                    </p>
                    <div style={{ height: '24px', display: 'flex', margin: 0, padding: 0, alignItems: 'center' }}>
                      <p style={{
                        color: 'white', fontSize: pixel(0.012, 10), fontFamily: 'Calibri, sans-serif', fontWeight: 'bold',
                        margin: `0px 0px 0px ${pixel(0.01, 0)}`
                      }}>
                        {index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.close.toFixed(2)}
                      </p>
                      <p style={{
                        fontSize: pixel(0.012, 10), fontFamily: 'Calibri, sans-serif',
                        fontWeight: 'bold', margin: `0px 0px 0px ${pixel(0.01, 2)}`, padding: 0,
                        color: (index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.change_value.toFixed(2)}
                      </p>
                      <p style={{
                        fontSize: pixel(0.012, 10), fontFamily: 'Calibri, sans-serif', color: 'white',
                        fontWeight: 'bold', margin: `0px 0px 0px ${pixel(0.01, 2)}`, padding: '0px 3px 0px 3px', borderRadius: '5px',
                        background: (index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {((index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.change_percent) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </Button>
                  <Button onClick={() => { set_index_name('VN30') }} type='text' style={{
                    height: '60px', background: '#161616', borderRadius: '5px',
                    margin: 0, padding: 0, width: '100%',
                    marginBottom: '10px', display: 'flex', flexDirection: 'column'
                  }}>
                    <p style={{
                      height: '28px', color: 'white', fontSize: pixel(0.015, 14), fontFamily: 'Calibri, sans-serif', fontWeight: 'bold',
                      margin: `1px 0px 0px ${pixel(0.01, 0)}`, display: 'flex', alignItems: 'center'
                    }}>
                      {index_card_df.filter(item => item.stock === 'VN30')[0]?.stock}
                    </p>
                    <div style={{ height: '24px', display: 'flex', margin: 0, padding: 0, alignItems: 'center' }}>
                      <p style={{
                        color: 'white', fontSize: pixel(0.012, 10), fontFamily: 'Calibri, sans-serif', fontWeight: 'bold',
                        margin: `0px 0px 0px ${pixel(0.01, 0)}`
                      }}>
                        {index_card_df.filter(item => item.stock === 'VN30')[0]?.close.toFixed(2)}
                      </p>
                      <p style={{
                        fontSize: pixel(0.012, 10), fontFamily: 'Calibri, sans-serif',
                        fontWeight: 'bold', margin: `0px 0px 0px ${pixel(0.01, 2)}`, padding: 0,
                        color: (index_card_df.filter(item => item.stock === 'VN30')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'VN30')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'VN30')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {index_card_df.filter(item => item.stock === 'VN30')[0]?.change_value.toFixed(2)}
                      </p>
                      <p style={{
                        fontSize: pixel(0.012, 10), fontFamily: 'Calibri, sans-serif', color: 'white',
                        fontWeight: 'bold', margin: `0px 0px 0px ${pixel(0.01, 2)}`, padding: '0px 3px 0px 3px', borderRadius: '5px',
                        background: (index_card_df.filter(item => item.stock === 'VN30')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'VN30')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'VN30')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {((index_card_df.filter(item => item.stock === 'VNINDEX')[0]?.change_percent) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </Button>
                  <Button onClick={() => { set_index_name('HNXINDEX') }} type='text' style={{
                    height: '60px', background: '#161616', borderRadius: '5px',
                    margin: 0, padding: 0, width: '100%',
                    marginBottom: '10px', display: 'flex', flexDirection: 'column'
                  }}>
                    <p style={{
                      height: '28px', color: 'white', fontSize: pixel(0.015, 14), fontFamily: 'Calibri, sans-serif', fontWeight: 'bold',
                      margin: `1px 0px 0px ${pixel(0.01, 0)}`, display: 'flex', alignItems: 'center'
                    }}>
                      {index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.stock}
                    </p>
                    <div style={{ height: '24px', display: 'flex', margin: 0, padding: 0, alignItems: 'center' }}>
                      <p style={{
                        color: 'white', fontSize: pixel(0.012, 10), fontFamily: 'Calibri, sans-serif', fontWeight: 'bold',
                        margin: `0px 0px 0px ${pixel(0.01, 0)}`
                      }}>
                        {index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.close.toFixed(2)}
                      </p>
                      <p style={{
                        fontSize: pixel(0.012, 10), fontFamily: 'Calibri, sans-serif',
                        fontWeight: 'bold', margin: `0px 0px 0px ${pixel(0.01, 2)}`, padding: 0,
                        color: (index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.change_value.toFixed(2)}
                      </p>
                      <p style={{
                        fontSize: pixel(0.012, 10), fontFamily: 'Calibri, sans-serif', color: 'white',
                        fontWeight: 'bold', margin: `0px 0px 0px ${pixel(0.01, 2)}`, padding: '0px 3px 0px 3px', borderRadius: '5px',
                        background: (index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {((index_card_df.filter(item => item.stock === 'HNXINDEX')[0]?.change_percent) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </Button>
                  <Button onClick={() => { set_index_name('UPINDEX') }} type='text' style={{
                    height: '60px', background: '#161616', borderRadius: '5px',
                    margin: 0, padding: 0, width: '100%',
                    marginBottom: '10px', display: 'flex', flexDirection: 'column'
                  }}>
                    <p style={{
                      height: '28px', color: 'white', fontSize: pixel(0.015, 14), fontFamily: 'Calibri, sans-serif', fontWeight: 'bold',
                      margin: `1px 0px 0px ${pixel(0.01, 0)}`, display: 'flex', alignItems: 'center'
                    }}>
                      {index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.stock}
                    </p>
                    <div style={{ height: '24px', display: 'flex', margin: 0, padding: 0, alignItems: 'center' }}>
                      <p style={{
                        color: 'white', fontSize: pixel(0.012, 10), fontFamily: 'Calibri, sans-serif', fontWeight: 'bold',
                        margin: `0px 0px 0px ${pixel(0.01, 0)}`
                      }}>
                        {index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.close.toFixed(2)}
                      </p>
                      <p style={{
                        fontSize: pixel(0.012, 10), fontFamily: 'Calibri, sans-serif',
                        fontWeight: 'bold', margin: `0px 0px 0px ${pixel(0.01, 2)}`, padding: 0,
                        color: (index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.change_value.toFixed(2)}
                      </p>
                      <p style={{
                        fontSize: pixel(0.012, 10), fontFamily: 'Calibri, sans-serif', color: 'white',
                        fontWeight: 'bold', margin: `0px 0px 0px ${pixel(0.01, 2)}`, padding: '0px 3px 0px 3px', borderRadius: '5px',
                        background: (index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {((index_card_df.filter(item => item.stock === 'UPINDEX')[0]?.change_percent) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </Button>
                  <Button onClick={() => { set_index_name('VN30F1M') }} type='text' style={{
                    height: '60px', background: '#161616', borderRadius: '5px',
                    margin: 0, padding: 0, width: '100%',
                    marginBottom: '10px', display: 'flex', flexDirection: 'column'
                  }}>
                    <p style={{
                      height: '28px', color: 'white', fontSize: pixel(0.015, 14), fontFamily: 'Calibri, sans-serif', fontWeight: 'bold',
                      margin: `1px 0px 0px ${pixel(0.01, 0)}`, display: 'flex', alignItems: 'center'
                    }}>
                      {index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.stock}
                    </p>
                    <div style={{ height: '24px', display: 'flex', margin: 0, padding: 0, alignItems: 'center' }}>
                      <p style={{
                        color: 'white', fontSize: pixel(0.012, 10), fontFamily: 'Calibri, sans-serif', fontWeight: 'bold',
                        margin: `0px 0px 0px ${pixel(0.01, 0)}`
                      }}>
                        {index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.close.toFixed(2)}
                      </p>
                      <p style={{
                        fontSize: pixel(0.012, 10), fontFamily: 'Calibri, sans-serif',
                        fontWeight: 'bold', margin: `0px 0px 0px ${pixel(0.01, 2)}`, padding: 0,
                        color: (index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.change_value.toFixed(2)}
                      </p>
                      <p style={{
                        fontSize: pixel(0.012, 10), fontFamily: 'Calibri, sans-serif', color: 'white',
                        fontWeight: 'bold', margin: `0px 0px 0px ${pixel(0.01, 2)}`, padding: '0px 3px 0px 3px', borderRadius: '5px',
                        background: (index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.change_percent) > 0.0001 ? '#24B75E' :
                          ((index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.change_percent) >= -0.001 &&
                            (index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                      }}>
                        {((index_card_df.filter(item => item.stock === 'VN30F1M')[0]?.change_percent) * 100).toFixed(2)}%
                      </p>
                    </div>
                  </Button>
                </Col>
                <Col xs={16} sm={17} md={18} lg={19} xl={20}>
                  <Row gutter={20} style={{ height: ww > 768 ? '60px' : '100px', marginBottom: '10px' }}>
                    <Col span={12} style={{ display: 'flex', flexDirection: ww > 800 ? 'row' : 'column' }}>
                      {chi_so_thi_truong === 'TQ' && (
                        <>
                          <div style={{ marginLeft: ww > 800 ? '10px' : '-10px' }}>
                            <p style={{ fontSize: pixel(0.015, 12), fontFamily: 'Calibri, sans-serif', color: '#B3B3B3', fontWeight: 'bold', margin: '5px 0px 0px 10px', padding: 0 }}>
                              Khối lượng giao dịch
                            </p>
                            <p style={{ fontSize: pixel(0.016, 14), fontFamily: 'Calibri, sans-serif', color: 'white', fontWeight: 'bold', margin: '5px 0px 0px 10px', padding: 0 }}>
                              {market_info_df.reduce((sum, item) => sum + item.volume, 0).toLocaleString('en-US')}
                            </p>
                          </div>
                          <div style={{ marginLeft: ww > 800 ? '40px' : '-10px', marginTop: ww > 800 ? '0px' : '10px' }}>
                            <p style={{ fontSize: pixel(0.015, 12), fontFamily: 'Calibri, sans-serif', color: '#B3B3B3', fontWeight: 'bold', margin: '5px 0px 0px 10px', padding: 0 }}>
                              Giá trị giao dịch
                            </p>
                            <p style={{ fontSize: pixel(0.016, 14), fontFamily: 'Calibri, sans-serif', color: 'white', fontWeight: 'bold', margin: '5px 0px 0px 10px', padding: 0 }}>
                              {Math.round(market_info_df.reduce((sum, item) => sum + item.value, 0)).toLocaleString('en-US')} <span style={{ fontSize: pixel(0.015, 12), color: '#B3B3B3' }}>Tỷ</span>
                            </p>
                          </div>
                        </>
                      )}
                      {(chi_so_thi_truong === 'BD' || chi_so_thi_truong === 'PTKT') && (
                        <>
                          <Button type='text' style={{
                            height: '60px', borderRadius: '5px',
                            margin: 0, padding: 0, width: '100%',
                            marginBottom: '10px', display: 'flex', flexDirection: 'column', marginTop: '-5px'
                          }}>
                            <p style={{
                              height: '28px', color: 'white', fontSize: pixel(0.02, 14), fontFamily: 'Calibri, sans-serif', fontWeight: 'bold',
                              margin: `1px 0px 0px ${pixel(0.01, 0)}`, display: 'flex', alignItems: 'center'
                            }}>
                              Chỉ số {index_name}
                            </p>
                            <div style={{ height: '24px', display: 'flex', margin: 0, padding: 0, alignItems: 'center', marginTop: '8px' }}>
                              <p style={{
                                color: 'white', fontSize: pixel(0.015, 12), fontFamily: 'Calibri, sans-serif', fontWeight: 'bold',
                                margin: `0px 0px 0px ${pixel(0.01, 0)}`
                              }}>
                                {index_card_df.filter(item => item.stock === index_name)[0]?.close.toFixed(2)}
                              </p>
                              {ww > 500 && (
                                <p style={{
                                  fontSize: pixel(0.015, 12), fontFamily: 'Calibri, sans-serif',
                                  fontWeight: 'bold', margin: `0px 0px 0px ${pixel(0.01, 2)}`, padding: 0,
                                  color: (index_card_df.filter(item => item.stock === index_name)[0]?.change_percent) > 0.0001 ? '#24B75E' :
                                    ((index_card_df.filter(item => item.stock === index_name)[0]?.change_percent) >= -0.001 &&
                                      (index_card_df.filter(item => item.stock === index_name)[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                                }}>
                                  {index_card_df.filter(item => item.stock === index_name)[0]?.change_value.toFixed(2)}
                                </p>
                              )}
                              <p style={{
                                fontSize: pixel(0.015, 12), fontFamily: 'Calibri, sans-serif', color: 'white',
                                fontWeight: 'bold', margin: `0px 0px 0px ${pixel(0.01, 2)}`, padding: '0px 3px 0px 3px', borderRadius: '5px',
                                background: (index_card_df.filter(item => item.stock === index_name)[0]?.change_percent) > 0.0001 ? '#24B75E' :
                                  ((index_card_df.filter(item => item.stock === index_name)[0]?.change_percent) >= -0.001 &&
                                    (index_card_df.filter(item => item.stock === index_name)[0]?.change_percent) <= 0.001 ? '#D0be0f' : '#e14040')
                              }}>
                                {((index_card_df.filter(item => item.stock === index_name)[0]?.change_percent) * 100).toFixed(2)}%
                              </p>
                            </div>
                          </Button>
                        </>
                      )}
                    </Col>
                    <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {ww > 768 && (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                          <Radio.Group
                            className="custom-radio-group"
                            defaultValue={chi_so_thi_truong}
                            buttonStyle="solid"
                            onChange={onChangeChiSoThiTruong}
                            style={{ display: 'flex', width: '100%', marginTop: '5px', height: '20px' }}
                          >
                            <Radio.Button value="TQ" className="custom-radio-button"
                              style={{
                                fontFamily: 'Calibri, sans-serif', fontSize: pixel(0.013, 12), color: '#dfdfdf'
                              }}>Tổng quan
                            </Radio.Button>
                            <Radio.Button value="BD" className="custom-radio-button"
                              style={{
                                fontFamily: 'Calibri, sans-serif', fontSize: pixel(0.013, 12), color: '#dfdfdf'
                              }}>Biểu đồ
                            </Radio.Button>
                            <Radio.Button value="PTKT" className="custom-radio-button"
                              style={{
                                fontFamily: 'Calibri, sans-serif', fontSize: pixel(0.013, 12), color: '#dfdfdf'
                              }}>PTKT
                            </Radio.Button>
                          </Radio.Group>
                          {chi_so_thi_truong === 'BD' && (
                            <Radio.Group
                              className="custom-radio-group" size="small"
                              defaultValue={time_span}
                              buttonStyle="solid"
                              onChange={onChangeIndexPriceChartTimeSpan}
                              style={{ display: 'flex', width: '100%', marginTop: '20px', height: '20px' }}
                            >
                              <Radio.Button value="1M" className="custom-radio-button"
                                style={{
                                  fontFamily: 'Calibri, sans-serif', fontSize: pixel(0.011, 10), color: '#dfdfdf'
                                }}>1M
                              </Radio.Button>
                              <Radio.Button value="3M" className="custom-radio-button"
                                style={{
                                  fontFamily: 'Calibri, sans-serif', fontSize: pixel(0.011, 10), color: '#dfdfdf'
                                }}>3M
                              </Radio.Button>
                              <Radio.Button value="6M" className="custom-radio-button"
                                style={{
                                  fontFamily: 'Calibri, sans-serif', fontSize: pixel(0.011, 10), color: '#dfdfdf'
                                }}>6M
                              </Radio.Button>
                              <Radio.Button value="1Y" className="custom-radio-button"
                                style={{
                                  fontFamily: 'Calibri, sans-serif', fontSize: pixel(0.011, 10), color: '#dfdfdf'
                                }}>1Y
                              </Radio.Button>
                            </Radio.Group>
                          )}
                        </div>
                      )}
                      {ww <= 768 && (
                        <Menu
                          theme='dark'
                          onClick={onChangeChiSoThiTruongMobile}
                          className="centered-menu"
                          style={{ width: '100%', background: 'black', fontFamily: 'Calibri, sans-serif', fontSize: pixel(0.013, 12), color: '#dfdfdf', height: '100px' }}
                          defaultOpenKeys={[chi_so_thi_truong]}
                          selectedKeys={[chi_so_thi_truong]}
                          mode="vertical"
                          items={chi_so_thi_truong_mobile_items}
                        />
                      )}
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    {chi_so_thi_truong === 'TQ' && (
                      <>
                        <Col xs={24} sm={24} md={12} lg={11} xl={10} style={{ display: 'flex', justifyContent: 'center', height: '240px' }}>
                          <MarketBreathChart width={ww > 400 ? '100%' : '200px'} height={ww > 800 ? '230px' : '180px'} ww={ww} pixel={pixel} />
                        </Col>
                        <Col xs={0} sm={0} md={12} lg={13} xl={14}>
                          <MarketTopStockChart ww={ww} pixel={pixel} />
                        </Col>
                      </>
                    )}
                    {chi_so_thi_truong === 'BD' && (
                      <>
                        {ww < 768 && (
                          <Radio.Group
                            className="custom-radio-group" size="small"
                            defaultValue={time_span}
                            buttonStyle="solid"
                            onChange={onChangeIndexPriceChartTimeSpan}
                            style={{ display: 'flex', width: '100%', marginTop: '0px', height: '20px' }}
                          >
                            <Radio.Button value="1M" className="custom-radio-button"
                              style={{
                                fontFamily: 'Calibri, sans-serif', fontSize: pixel(0.011, 10), color: '#dfdfdf'
                              }}>1M
                            </Radio.Button>
                            <Radio.Button value="3M" className="custom-radio-button"
                              style={{
                                fontFamily: 'Calibri, sans-serif', fontSize: pixel(0.011, 10), color: '#dfdfdf'
                              }}>3M
                            </Radio.Button>
                            <Radio.Button value="6M" className="custom-radio-button"
                              style={{
                                fontFamily: 'Calibri, sans-serif', fontSize: pixel(0.011, 10), color: '#dfdfdf'
                              }}>6M
                            </Radio.Button>
                            <Radio.Button value="1Y" className="custom-radio-button"
                              style={{
                                fontFamily: 'Calibri, sans-serif', fontSize: pixel(0.011, 10), color: '#dfdfdf'
                              }}>1Y
                            </Radio.Button>
                          </Radio.Group>
                        )}
                        <IndexPriceChart data={index_price_chart_df} index_name={index_name} time_span={time_span} width='100%' height={ww > 768 ? '270px' : '210px'} />
                      </>
                    )}
                    {chi_so_thi_truong === 'PTKT' && (
                      <>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                          {ww < 768 && (
                            <Radio.Group
                              className="custom-radio-group" size="small"
                              defaultValue={mobile_ta_mode}
                              buttonStyle="solid"
                              onChange={onChangeMobileTaMode}
                              style={{ display: 'flex', width: '100%', marginTop: '-5px', height: '20px' }}
                            >
                              <Radio.Button value="month" className="custom-radio-button"
                                style={{
                                  fontFamily: 'Calibri, sans-serif', fontSize: pixel(0.011, 10), color: '#dfdfdf'
                                }}>Tháng
                              </Radio.Button>
                              <Radio.Button value="quarter" className="custom-radio-button"
                                style={{
                                  fontFamily: 'Calibri, sans-serif', fontSize: pixel(0.011, 10), color: '#dfdfdf'
                                }}>Quý
                              </Radio.Button>
                              <Radio.Button value="year" className="custom-radio-button"
                                style={{
                                  fontFamily: 'Calibri, sans-serif', fontSize: pixel(0.011, 10), color: '#dfdfdf'
                                }}>Năm
                              </Radio.Button>
                            </Radio.Group>
                          )}
                          <div style={{ background: '#161616', padding: '10px 10px 0px 10px', borderRadius: '5px', margin: 0, marginTop: ww > 768 ? '0px' : '15px' }}>
                            <p style={{
                              fontFamily: 'Calibri, sans-serif', fontWeight: 'bold', fontSize: pixel(0.016, 15), color: 'white',
                              marginTop: '1px', margin: 0, height: ww > 768 ? '32px' : '22px'
                            }}>Chỉ số {ww > 768 ? 'tháng' : (mobile_ta_mode === 'month' ? 'tháng' : (mobile_ta_mode === 'quarter' ? 'quý' : 'năm'))}</p>
                            <TaTable data={ta_index_df} index_name={index_name} id={ww > 768 ? 'month' : mobile_ta_mode} ta_name={['candle']}
                              fontSize={pixel(0.012, 12)} lineHeight={ww > 768 ? '20px' : '15px'}
                              width='100%' height={ww > 768 ? '70px' : '50px'} marginTop={ww > 768 ? '0px' : '0px'}
                            />
                            <hr style={{ border: 0, height: '1px', backgroundColor: '#dfdfdf', margin: 0 }} />
                            <TaTable data={ta_index_df} index_name={index_name} id={ww > 768 ? 'month' : mobile_ta_mode} ta_name={['ma', 'pivot']}
                              fontSize={pixel(0.012, 12)} lineHeight={ww > 768 ? '20px' : '15px'}
                              width='100%' height={ww > 768 ? '70px' : '50px'} marginTop={ww > 768 ? '8px' : '8px'} />
                            <hr style={{ border: 0, height: '1px', backgroundColor: '#dfdfdf', margin: 0 }} />
                            <TaTable data={ta_index_df} index_name={index_name} id={ww > 768 ? 'month' : mobile_ta_mode} ta_name={['fibo']}
                              fontSize={pixel(0.012, 12)} lineHeight={ww > 768 ? '20px' : '15px'}
                              width='100%' height={ww > 768 ? '70px' : '50px'} marginTop={ww > 768 ? '8px' : '8px'} />
                          </div>
                        </Col>
                        <Col xs={0} sm={0} md={8} lg={8} xl={8}>
                          <div style={{ background: '#161616', padding: '10px 10px 0px 10px', borderRadius: '5px', margin: 0, marginTop: ww > 768 ? '0px' : '15px' }}>
                            <p style={{
                              fontFamily: 'Calibri, sans-serif', fontWeight: 'bold', fontSize: pixel(0.016, 15), color: 'white',
                              marginTop: '1px', margin: 0, height: ww > 768 ? '32px' : '22px'
                            }}>Chỉ số quý</p>
                            <TaTable data={ta_index_df} index_name={index_name} id='quarter' ta_name={['candle']}
                              fontSize={pixel(0.012, 12)} lineHeight={ww > 768 ? '20px' : '15px'}
                              width='100%' height={ww > 768 ? '70px' : '50px'} marginTop={ww > 768 ? '0px' : '0px'}
                            />
                            <hr style={{ border: 0, height: '1px', backgroundColor: '#dfdfdf', margin: 0 }} />
                            <TaTable data={ta_index_df} index_name={index_name} id='quarter' ta_name={['ma', 'pivot']}
                              fontSize={pixel(0.012, 12)} lineHeight={ww > 768 ? '20px' : '15px'}
                              width='100%' height={ww > 768 ? '70px' : '50px'} marginTop={ww > 768 ? '8px' : '8px'} />
                            <hr style={{ border: 0, height: '1px', backgroundColor: '#dfdfdf', margin: 0 }} />
                            <TaTable data={ta_index_df} index_name={index_name} id='quarter' ta_name={['fibo']}
                              fontSize={pixel(0.012, 12)} lineHeight={ww > 768 ? '20px' : '15px'}
                              width='100%' height={ww > 768 ? '70px' : '50px'} marginTop={ww > 768 ? '8px' : '8px'} />
                          </div>
                        </Col>
                        <Col xs={0} sm={0} md={8} lg={8} xl={8}>
                          <div style={{ background: '#161616', padding: '10px 10px 0px 10px', borderRadius: '5px', margin: 0, marginTop: ww > 768 ? '0px' : '15px' }}>
                            <p style={{
                              fontFamily: 'Calibri, sans-serif', fontWeight: 'bold', fontSize: pixel(0.016, 15), color: 'white',
                              marginTop: '1px', margin: 0, height: ww > 768 ? '32px' : '22px'
                            }}>Chỉ số năm</p>
                            <TaTable data={ta_index_df} index_name={index_name} id='year' ta_name={['candle']}
                              fontSize={pixel(0.012, 12)} lineHeight={ww > 768 ? '20px' : '15px'}
                              width='100%' height={ww > 768 ? '70px' : '50px'} marginTop={ww > 768 ? '0px' : '0px'}
                            />
                            <hr style={{ border: 0, height: '1px', backgroundColor: '#dfdfdf', margin: 0 }} />
                            <TaTable data={ta_index_df} index_name={index_name} id='year' ta_name={['ma', 'pivot']}
                              fontSize={pixel(0.012, 12)} lineHeight={ww > 768 ? '20px' : '15px'}
                              width='100%' height={ww > 768 ? '70px' : '50px'} marginTop={ww > 768 ? '8px' : '8px'} />
                            <hr style={{ border: 0, height: '1px', backgroundColor: '#dfdfdf', margin: 0 }} />
                            <TaTable data={ta_index_df} index_name={index_name} id='year' ta_name={['fibo']}
                              fontSize={pixel(0.012, 12)} lineHeight={ww > 768 ? '20px' : '15px'}
                              width='100%' height={ww > 768 ? '70px' : '50px'} marginTop={ww > 768 ? '8px' : '8px'} />
                          </div>
                        </Col>
                      </>
                    )}
                  </Row>
                </Col>
              </Row >
            </Col >
          </Row >
        </Col >
      </>
    )
  }
}

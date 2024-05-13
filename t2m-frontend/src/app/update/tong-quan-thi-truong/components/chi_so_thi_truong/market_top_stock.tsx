import { sendRequest } from "@/utlis/api";
import Treemap from "../../../../../components/chart/treemap";
import { useEffect, useState } from "react";

interface IProps {
    width: number;
    height: number;
  }

const MarketTopStockChart = (props: IProps) => {
    const getData = async (tableName: string) => {
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_STOCK_API}/stock/v1/database/${tableName}`,
            method: "GET",
        })
        set_market_top_stock(res.data)
    }

    const [market_top_stock, set_market_top_stock] = useState<any[]>([]);

    let top_data = {
        name: "root",
        children: market_top_stock.filter(item => item.t0_score > 0).map(item => ({ name: item.stock, value: item.t0_score, change: item.price_change }))
    };

    let bottom_data = {
        name: "root",
        children: market_top_stock.filter(item => item.t0_score < 0).map(item => ({ name: item.stock, value: item.t0_score, change: item.price_change }))
    };

    useEffect(() => {
        getData('market_top_stock')
    }, [])

    const [checkAuth, setCheckAuth] = useState(true);
    useEffect(() => {
        setCheckAuth(false)
    }, []);
    if (!checkAuth) {
        return (
            <>
                <div style={{ marginTop: '40px' }}>
                    <Treemap data={top_data} width={props?.width} height={props?.height/2} />
                </div>
                <div style={{ marginTop: '-3px' }}>
                    <Treemap data={bottom_data} width={props?.width} height={props?.height/2} />
                </div>
            </>
        )
    }
}

export default MarketTopStockChart

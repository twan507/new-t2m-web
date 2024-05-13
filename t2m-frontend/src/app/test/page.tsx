'use client'
import { sendRequest } from "@/utlis/api"
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
    console.log(tableList)
}

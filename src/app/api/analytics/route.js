import { getAllOrders } from "@/query/query";
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic';

export const GET = async (req, res) => {
    try {
        const orders = await getAllOrders({});
        const pendingOrders = await getAllOrders({orderStatus: 'pending'})
        const paidOrders = await getAllOrders({ orderStatus: 'paid' })
        const canceledOrders = await getAllOrders({ orderStatus: 'canceled' })
        return NextResponse.json({
            status: true,
            statusCode: 200,
            orders: orders,
            pendingOrders,
            paidOrders,
            canceledOrders

        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            statusCode: 500,
            message: error.message
        })
    }
}
import connectToDB from "@/config/connectDb"
import Order from "@/models/order.model"
import { NextResponse } from "next/server"

export const POST = async (req, res) => {
    connectToDB()
    try {
        const { orderStatus, id } = await req.json();
        await Order.findByIdAndUpdate(id, {
            $set: {
                orderStatus: orderStatus
            }
        })

        return NextResponse.json({
            success: true,
            statusCode: 200,
            orderStatus,
            message:'Order updated successfully!!!'
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            statusCode: 500,
            message: error.message
        })
    }
}
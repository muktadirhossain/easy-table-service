import connectToDB from "@/config/connectDb"
import MenuItems from "@/models/menuItems.model"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic';

export const GET = async (req, res) => {
    connectToDB()
    try {

        const menuItems = await MenuItems.find({}).populate({
            path:'category',
            select: 'categoryName'
        })
        return NextResponse.json({
            status: true,
            statusCode: 200,
            data: menuItems
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            statusCode: 500,
            message: error.message
        })
    }
}
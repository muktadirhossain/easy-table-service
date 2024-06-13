import connectToDB from "@/config/connectDb"
import User from "@/models/user.model"
import { NextResponse } from "next/server"

export const POST = async (req, res) => {
    connectToDB()
    try {
        const body = await req.json()

        const response = await User.create(body)

        return NextResponse.json({
            status: 201,
            message: "ok",
            data: response
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error.message,
        })
    }
}
import { getAllCategories } from "@/query/query";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const GET = async (req, res) => {

    try {
        const categories = await getAllCategories()
        return NextResponse.json({
            status: true,
            statusCode: 200,
            data: categories
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            statusCode: 500,
            message: error.message
        })
    }
}
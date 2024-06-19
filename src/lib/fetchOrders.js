import connectToDB from "@/config/connectDb"
import Order from "@/models/order.model"

export const getAllOrders = async () => {
    connectToDB()
    try {
        const orders = await Order.find()
        return orders
    } catch (error) {
        throw new Error(error?.message)
    }
}

export const getOrderById = async (id) => {
    connectToDB()
    try {
        const orders = await Order.findOne({_id: id})
        return orders
    } catch (error) {
        throw new Error(error?.message)
    }
}
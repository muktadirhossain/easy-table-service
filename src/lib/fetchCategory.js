import connectToDB from "@/config/connectDb"
import Category from "@/models/category.model"

export const getAllCategories = async () => {
    try {
        connectToDB()
        const res = await Category.find()
        return res

    } catch (error) {
        throw new Error(error.message)
    }
}
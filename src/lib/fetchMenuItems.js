import connectToDB from "@/config/connectDb"
import MenuItems from "@/models/menuItems.model"

export const getAllMenuItems = async () => {
    try {
        connectToDB()
        const res = await MenuItems.find({}).populate({ path: "category", select: "-createdAt -updatedAt -__V -_id" })
            
        return res
    } catch (error) {
        console.error(error)
        throw new Error(error.message)
    }
} 
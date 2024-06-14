import connectToDB from "@/config/connectDb"
import User from "@/models/user.model"

export const getAllUsers = async () => {
    connectToDB()
    try {
        const allUsers = await User.find()
        return allUsers
    } catch (error) {
        throw new Error(error.message)
    }
}
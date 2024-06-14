'use server'

import connectToDB from "@/config/connectDb"
import Category from "@/models/category.model"
import MenuItems from "@/models/menuItems.model"
import User from "@/models/user.model"
import uploadFileHandler from "@/utils/uploadFileHandler"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const addCategory = async (formData) => {
    connectToDB()
    try {
        const { categoryName } = Object.fromEntries(formData)
        console.log(categoryName)
        const res = await Category.create({ categoryName })

        revalidatePath(`/dashboard/category`)

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
    redirect('/dashboard/category')
}


export const deleteCategory = async (id) => {
    connectToDB()
    try {
        const res = await Category.findByIdAndDelete(id)

        revalidatePath(`/dashboard/category`)

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}


export const addMenu = async (formData) => {
    connectToDB()
    try {
        const { title, price, description, itemCode, img, category } = Object.fromEntries(formData)
        console.log(category)

        // Img upload
        // Save File to DB::
        const fileURL = await uploadFileHandler(
            img,
            "uploads/",
            title,
        );
        console.log(fileURL)

        const res = await MenuItems.create({ title, price, description, itemCode, category, image: fileURL })

        revalidatePath(`/dashboard/menu-items`)

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
    redirect('/dashboard/menu-items')
}

export const deleteMenuItem = async (id) => {
    connectToDB()
    try {
        const res = await MenuItems.findByIdAndDelete(id)

        revalidatePath(`/dashboard/menu-items`)

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}
export const deleteUser = async (id) => {
    connectToDB()
    try {
        const res = await User.findByIdAndDelete(id)

        revalidatePath(`/dashboard/users`)

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}
export const makeAdmin = async (id) => {
    connectToDB()
    try {
        const res = await User.findByIdAndUpdate(id, {
            $set: {
                'role': 'admin'
            }
        })

        revalidatePath(`/dashboard/users`)

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}
export const makeCustomer = async (id) => {
    connectToDB()
    try {
        const res = await User.findByIdAndUpdate(id, {
            $set: {
                'role': 'customer'
            }
        })

        revalidatePath(`/dashboard/users`)

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

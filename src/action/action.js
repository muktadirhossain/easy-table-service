'use server'

import connectToDB from "@/config/connectDb"
import Category from "@/models/category.model"
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


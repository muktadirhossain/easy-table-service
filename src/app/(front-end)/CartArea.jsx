'use client'

import GlobalContext from "@/context/globalContext"
import { useContext, useEffect } from "react";
import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { calculateSubtotal } from "@/utils/helpers";
import Link from "next/link";

const CartArea = () => {
    const { cartData, removeCartItem, addToCartHandler, decrementCartQuantity } = useContext(GlobalContext)

    useEffect(() => {

    }, [])

    return (
        <aside className="py-5 mx-5">
            <h3 className="text-center font-semibold text-xl text-rose-500">Your Order</h3>
            {
                cartData.length > 0 ?
                    <div>
                        <div>
                            {cartData.map(item =>
                                <div className="flex justify-between items-center m-1.5 border-b pb-5" key={item?._id}>
                                    <div className="flex items-center justify-between gap-x-3">
                                        <p className="font-semibold text-rose-500">{item?.title}</p>
                                        <p className="text-xs">({item?.price} * {item?.quantity} = {item?.price * item?.quantity}$)</p>
                                    </div>
                                    <div className="flex justify-evenly items-center gap-x-2 ">
                                        <button
                                            onClick={() => {
                                                addToCartHandler(item, "cartItems")
                                            }}
                                            className="btn btn-outline btn-circle btn-success btn-sm">
                                            <PlusIcon className="h-6 w-6" />
                                        </button>
                                        <p className="btn btn-info btn-sm">{item?.quantity}</p>
                                        {
                                            item?.quantity === 1 ?
                                                <button
                                                    onClick={() => {
                                                        removeCartItem(item?._id, "cartItems")
                                                    }}
                                                    className="btn btn-outline btn-circle btn-error btn-sm ">
                                                    <TrashIcon className="h-4 w-4" />
                                                </button>
                                                :
                                                <button
                                                    onClick={() => {
                                                        decrementCartQuantity(item?._id, "cartItems")
                                                    }}
                                                    className="btn btn-outline btn-circle btn-error btn-sm ">
                                                    <MinusIcon className="h-4 w-4" />
                                                </button>
                                        }


                                    </div>
                                </div>)}
                        </div>
                        <div className="flex justify-between m-1.5">
                            <p className="text-sm font-medium">SubTotal : </p>
                            <p>
                                {new Intl.NumberFormat("en-In").format(calculateSubtotal(cartData))}{" "}
                                Tk.
                            </p>
                        </div>
                        <div className="flex justify-between m-1.5">
                            <p className="text-sm font-medium">Vat (10%) : </p>
                            <p>
                                {new Intl.NumberFormat("en-In").format(calculateSubtotal(cartData) * 10 / 100)}{" "}
                                Tk.
                            </p>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between m-1.5">
                            <p className="text-sm font-medium">Grand Total : </p>
                            <p>
                                {new Intl.NumberFormat("en-In").format(calculateSubtotal(cartData) + calculateSubtotal(cartData) * 10 / 100)}{" "}
                                Tk.
                            </p>
                        </div>
                        <div className="flex justify-center mt-10">

                            <Link href={'/cart'} className="btn btn-error">
                                Review Order
                            </Link>
                        </div>
                    </div>
                    :
                    <h3 className="text-center font-mono text-slate-300 my-16">
                        Start adding items to your cart
                    </h3>
            }
        </aside >
    )
}

export default CartArea
import Link from "next/dist/client/link";
import {IoMdArrowForward} from 'react-icons/io'
import {FiTrash2} from 'react-icons/fi'
import { SideBarContext } from "../context/SideBarContext";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import getStripePromise from "../lib/stripe";

const SideBar = () => {
    const {isOpen, handleClose} = useContext(SideBarContext);
    const {cart, clearCart, total, itemAmount} = useContext(CartContext);
    const handlecheckout = async() => {
        const stripe = await getStripePromise();
        const response = await fetch('/api/stripe-session/', {
            method: 'POST',
            headers:{"Content-type" : "application/json"},
            cache: 'no-cache',
            body: JSON.stringify(cart),
        });

        const data = await response.json();
        if (data.session) {
            stripe?.redirectToCheckout({ sessionId: data.session.id });
          }
    }

    return (
        <div className={`fixed top-0 h-full bg-white shadow-2xl 
        md:w-[35vw] xl:max-w-[30vw] transition-all 
        duration-300 z-20 px-4 lg:px-[35px] ${isOpen ? 'right-0' : '-right-full'}`}>
            <div className="flex items-center justify-between
            py-6 border-b">
                <div className="uppercase text-sm 
                font-semibold"> Shopping Bag ({itemAmount})</div>
                <div onClick={handleClose} className="cursor-pointer w-8 h-8 flex
                justify-content items-center">
                    <IoMdArrowForward className="text-2xl"/>
                </div>
            </div>
            <div className="flex flex-col gap-y-2 h-[520px]
            lg:h-[640px] overflow-y-auto overflow-x-hidden 
            border-b"> {cart.map((item:any) => {
                return <CartItem item={item} key={item.id}/>
            })}
             <div className="flex flex-col gap-y-3 py-4"> 
                <div className="flex w-full
                justify-between items-center">
                    <div className="uppercase font-semibold"> 
                        <span className="mr-2"> Total: </span>$ {parseFloat(total).
                        toFixed(2)}
                    </div>
                    <div onClick={clearCart} className="cursor-pointer py-4 bg-red-500
                    text-white w-12 h-12 flex justify-center items-center text-xl">
                        <FiTrash2 />
                    </div>
                </div>
                <Link href="/" className="bg-gray-200 flex p-4 
                justify-center items-center text-primary 
                w-full font-medium"> View Cart </Link>
                <button onClick={handlecheckout} className="bg-primary flex p-4 
                justify-center items-center text-white 
                w-full font-medium"> Checkout </button>
            </div>
            </div>
        </div>
    )
}

export default SideBar;
import Link from "next/dist/client/link";
import {BsPlus, BsEyeFill} from 'react-icons/bs'
import {CartContext} from '../context/CartContext'
import { useContext } from "react";

const ProductPage = ({product}:{product:any}) => {
    const { _id, name, category, price, details, image} = product;
    const {addtoCart} = useContext(CartContext);
    return (
        <div>
            <div className="border border-[#e4e4e4] h-[300px] mb-4
            relative overflow-hidden group transition">
                <div className="w-full h-full flex justify-center items-center">
                    <div>
                        <img className="max-h-[160px]
                        group-hover:scale-110 transition duration-300" src={image['0']} />
                    </div>
                </div>
                <div className="absolute top-6 right-11 group-hover:right-5 p-2
                flex flex-col items-center justify-center gap-y-2
                opacity-0 group-hover:opacity-100 transition-all
                duration-300"> 
                    <button onClick={() => addtoCart(name, _id, price)}> 
                        <div className="flex justify-center items-center
                        text-white w-12 h-12 bg-red-500">
                            <BsPlus className="text-3xl"/>
                        </div>
                    </button>
                    <Link href={`/product/${_id}`} className="w-12 h-12 bg-white 
                    flex justify-center items-center text-primary drop-shadow-xl">
                        <BsEyeFill />
                    </Link>
                </div>
            </div>   
            <div>
                <div className="text-sm capitalize text-gray-500 mb-1"> {category} </div>
                <Link href={`/product/${_id}`}>
                    <h2 className="font-semibold mb-1">{name}</h2>
                </Link>
                <div className="font-semibold"> $ {price} </div>
            </div>
        </div>
    )
}

export default ProductPage;

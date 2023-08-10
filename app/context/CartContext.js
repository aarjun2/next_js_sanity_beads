import React, { createContext, useEffect, useState} from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [itemAmount, setItemAmount ] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const total = cart.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price * currentItem.amount;
        },0)
        setTotal(total);
    })

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            setCart(savedCart);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        if(cart) {
            const amount = cart.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.amount;
            }, 0)
            setItemAmount(amount);
        }
    }, [cart])

    const addtoCart = (product, id, price) => {
        const newItem = {product, price, id, amount : 1};
        const cartItem = cart.find((item) => {
            return item.id === id;
        })
        if (cartItem) {
            const newCart = [...cart].map(item => {
                if(item.id === id) {
                    return {...item, amount: cartItem.amount + 1};
                }
                else {
                    return item;
                }
            })
            setCart(newCart);
        }
        else {
            setCart([...cart,newItem]);
        }
    }

    const removeFromCart = (id) => {
        const newCart = cart.filter(item => {
            return item.id !== id;
        })
        setCart(newCart);
    }

    const clearCart = () => {
        setCart([]);
    }

    const increaseAmount = (id, price) => {
        const item = cart.find((item) => {
            item.id === id;
        })
        addtoCart(item, id, price);
    }

    const decreaseAmount = (id, price) => {
        const cartItem = cart.find((item) => item.id === id);
        if (cartItem) {
            const newCart = cart.map(item => {
                if (item.id === id) {
                    return { ...item, amount: cartItem.amount - 1 }
                } else {
                    return item;
                }
            })
            setCart(newCart);
            if (cartItem.amount < 2) {
                removeFromCart(id);
            }
        }
    }

    return <CartContext.Provider value={{cart, addtoCart, removeFromCart, clearCart
    , increaseAmount, decreaseAmount, itemAmount, total}}>
        {children}</CartContext.Provider>;
}
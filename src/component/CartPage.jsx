import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeItem, addItem } from "../utils/cartSlice";

const CartPage = () => {
    const cartItemCount = useSelector((state) =>
        state.cart.cartProduct.reduce((total, item) => total + item.quantity, 0) // ✅ Show total quantity
    );
    const AllCartItem = useSelector((state) => state.cart.cartProduct);
    const dispatch = useDispatch();

    return (
        <div className="container max-w-[1200px] mx-auto px-4 py-6">
            {/* Header Section */}
            <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-3xl font-semibold">Shopping Cart</h2>
                <span className="text-lg text-gray-600">({cartItemCount} items)</span>
            </div>

            {/* Cart Items */}
            {AllCartItem.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {AllCartItem.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col items-center"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-32 w-32 object-contain"
                            />
                            <h3 className="text-lg font-semibold mt-2 text-center">{item.title}</h3>
                            <p className="text-gray-600 text-md mt-1">${item.price.toFixed(2)}</p>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 mt-3">
                                <button
                                    onClick={() => dispatch(removeItem(item))}
                                    className="px-3 py-1 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
                                >
                                    -
                                </button>
                                <span className="text-lg font-semibold">{item.quantity}</span>
                                <button
                                    onClick={() => dispatch(addItem(item))}
                                    className="px-3 py-1 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-12">
                    <p className="text-xl text-gray-500">Your cart is empty.</p>
                </div>
            )}

            {/* Clear Cart Button */}
            {AllCartItem.length > 0 && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => dispatch(clearCart())}
                        className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition"
                    >
                        Clear Cart
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;

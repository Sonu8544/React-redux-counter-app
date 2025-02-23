import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, clearCart } from "../utils/cartSlice";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initialize Toastify
import { ToastContainer } from "react-toastify";

const FetchProductData = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cartItems = useSelector((state) => state.cart.cartProduct);
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                setProducts(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // ✅ Show toast when item is added
    const handleAddItem = (product) => {
        dispatch(addItem({ ...product, quantity: 1 }));
        toast.success(`${product.title} added to cart! 🛒`, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    };

    // ✅ Show toast when item is removed
    const handleRemoveItem = (product) => {
        dispatch(removeItem(product));
        toast.warn(`${product.title} removed from cart! ❌`, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    };

    // ✅ Show toast when cart is cleared
    const handleClearCart = () => {
        dispatch(clearCart());
        toast.error("Cart cleared! 🗑️", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <ToastContainer /> {/* Toast container to display notifications */}

            <div className="flex items-center justify-center mt-4">
                <button className="font-bold text-5xl">
                    Cart Items: <span className="text-blue-800">{cartItemCount}</span>
                </button>
            </div>

            {/* Clear Cart Button */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleClearCart}
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
                >
                    Clear Cart
                </button>
            </div>

            <div className="flex flex-wrap justify-center mt-6">
                {products.map((product) => {
                    const cartItem = cartItems.find((item) => item.id === product.id);

                    return (
                        <div
                            key={product.id}
                            className="w-[300px] bg-white shadow-lg rounded-2xl overflow-hidden p-4 m-4 flex flex-col items-center"
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-[150px] w-full object-cover rounded-md"
                            />
                            <h3 className="text-lg font-semibold mt-2 text-center">{product.title}</h3>
                            <p className="text-gray-600 text-md mt-1">${product.price.toFixed(2)}</p>

                            {/* Add to Cart / Quantity Controls */}
                            <div className="flex items-center gap-3 mt-3">
                                {!cartItem ? (
                                    <button
                                        onClick={() => handleAddItem(product)}
                                        className="px-5 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
                                    >
                                        Add to Cart
                                    </button>
                                ) : (
                                    <div className="flex items-center bg-gray-100 p-2 rounded-lg">
                                        <button
                                            onClick={() => handleRemoveItem(product)}
                                            className="px-3 py-1 font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                        >
                                            -
                                        </button>
                                        <span className="text-lg font-semibold mx-3">{cartItem.quantity}</span>
                                        <button
                                            onClick={() => handleAddItem(product)}
                                            className="px-3 py-1 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default FetchProductData;

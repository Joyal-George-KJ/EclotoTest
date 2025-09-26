import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const PRODUCTS = [
        { id: 1, name: "Laptop", price: 500 },
        { id: 2, name: "Smartphone", price: 300 },
        { id: 3, name: "Headphones", price: 100 },
        { id: 4, name: "Smartwatch", price: 150 },
    ];

    const FREE_GIFT = { id: "gift", name: "Wireless Mouse", price: 0 };

    const [total, setTotal] = useState(0);

    const [cart, setCart] = useState([]);

    const addToCart = (val) => {
        const checkIfExistInCart = cart.findIndex((item) => item.id === val.id);
        if (checkIfExistInCart !== -1) {
            incrementer(checkIfExistInCart);
            return;
        }
        setTotal((prev) => (prev += val.price));
        setCart((prev) => [...prev, val]);
    };

    const incrementer = (ind) => {
        setCart((prev) =>
            prev.map((val, index) =>
                ind === index ? { ...val, count: val.count + 1 } : val
            )
        );

        setTotal((prev) => (prev += cart[ind].price));
    };

    const decrementer = (ind) => {
        if (cart[ind].count === 1) {
            setCart((prev) => prev.filter((_, index) => index !== ind));
        } else {
            setCart((prev) =>
                prev.map((val, index) =>
                    ind === index ? { ...val, count: val.count - 1 } : val
                )
            );
        }
        setTotal((prev) => (prev -= cart[ind].price));
    };

    useEffect(() => {
        if (
            total >= 1000 &&
            cart.findIndex((item) => item.id === "gift") === -1
        )
            addToCart({ ...FREE_GIFT, count: 1 });
        else if (
            total <= 1000 &&
            cart.findIndex((item) => item.id === "gift") !== -1
        )
            setCart((prev) => prev.filter((item) => item.id !== "gift"));
    }, [total]);

    return (
        <>
            <header className="w-full text-center py-4">
                <h1 className="text-4xl font-extrabold">Shopping Cart</h1>
            </header>
            <section className="mx-4 md:mx-8 lg:mx-11">
                <div className="product-holder">
                    <h3 className="text-xl text-gray-700 font-bold pt-0 md:pt-8 py-2">
                        Products
                    </h3>
                    <div className="product-card-holder grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {PRODUCTS.map((val) => (
                            <div
                                className="shadow shadow-gray-700 p-4 bg-white"
                                key={val.id}
                            >
                                <h5 className="text-base font-bold title">
                                    {val.name}
                                </h5>
                                <p className="price">₹ {val.price}</p>
                                <button
                                    className="mt-1 text-white bg-blue-400 w-full py-1.5 rounded-md"
                                    type="button"
                                    onClick={() =>
                                        addToCart({ ...val, count: 1 })
                                    }
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cart-summary">
                    <h3 className="text-xl text-gray-700 font-bold pt-6 py-4">
                        Cart Summary
                    </h3>
                    <div className="bg-white p-4 shadow shadow-gray-700/25 mb-4">
                        <div className="total-cart-card-holder flex justify-between border-b-2 border-gray-600 mb-3">
                            <h5 className="text-base font-medium">Sub total</h5>
                            <p className="total-price">₹ {total}</p>
                        </div>
                        {total < 1000 ? (
                            <div className="gift-req p-4 bg-neutral-100">
                                <p className="text-lg font-medium mb-3">
                                    Add ₹1000 more to get a FREE Wireless Mouse!
                                </p>
                                <div className="progress-container w-full h-6 bg-blue-300 rounded-xl">
                                    <div
                                        className="progress-bar h-full max-w-full rounded-xl bg-blue-600"
                                        style={{
                                            width: (total / 1000) * 100 + "%",
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ) : (
                            <div className="gift-req p-4 bg-neutral-100 mb-5">
                                <p className="text-lg font-medium mb-3">
                                    You got a FREE Wireless Mouse!
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="cart grid gap-3 bg-white p-4 shadow shadow-gray-700/25 mb-8">
                    {cart.length > 0 ? (
                        cart.map((val, ind) =>
                            val?.id !== undefined && val.id === "gift" ? (
                                <div
                                    className="card bg-white grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-2 shadow shadow-gray-700/50 p-6"
                                    key={ind}
                                >
                                    <div className="contain-cart-card-main text-center">
                                        <h5 className="text-base font-mediumtitle">
                                            {val.name}
                                        </h5>
                                        <p className="price">
                                            ₹ {val.price} x {val.count}
                                        </p>
                                    </div>
                                    <div className="control-cart w-full grid justify-center">
                                        <span className="gift uppercase w-fit bg-green-300 text-green-950 py-1 px-3 rounded-xl text-base">
                                            Free Gift
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="card bg-white grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-4 shadow shadow-gray-700/50 p-6"
                                    key={ind}
                                >
                                    <div className="contain-cart-card-main text-center">
                                        <h5 className="text-base font-mediumtitle">
                                            {val.name}
                                        </h5>
                                        <p className="price">
                                            ₹ {val.price} x {val.count} ={" "}
                                            {val.price * val.count}
                                        </p>
                                    </div>
                                    <div className="control-cart flex gap-3 items-center md:justify-start md:justify-self-end justify-center">
                                        <button
                                            type="button"
                                            className="decrement-btn py-1 px-3 bg-red-600 text-white"
                                            onClick={() => decrementer(ind)}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            name="count"
                                            className="w-8 text-center text-neutral-900"
                                            value={val.count}
                                            readOnly
                                        />
                                        <button
                                            onClick={() => incrementer(ind)}
                                            type="button"
                                            className="increment-btn py-1 px-3 bg-green-600 text-white"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )
                        )
                    ) : (
                        <div className="empty-cart w-full text-center bg-neutral-100 py-6 text-neutral-600">
                            <p className="empty-cart-main-text text-2xl">
                                Your cart is empty
                            </p>
                            <p className="empty-cart-sub-text">
                                Add some products to see them here!
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default App;

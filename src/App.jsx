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
        const preventNegative = cart.findIndex((item) => item.count === 1);
        if (preventNegative !== -1) {
            setCart((prev) =>
                prev.filter((item, index) => index === ind && item.count > 1)
            );
            setTotal((prev) => (prev -= cart[ind].price));
            return;
        }
        setCart((prev) =>
            prev.map((val, index) =>
                ind === index && val.count !== 1
                    ? { ...val, count: val.count - 1 }
                    : val
            )
        );
        setTotal((prev) => (prev -= cart[ind].price));
    };

    useEffect(() => {
        console.log(cart);
        // setCart((prev) => prev.filter((item) => item.count > 0));
    }, [cart]);

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
            <header>
                <h1>Shopping Cart</h1>
            </header>
            <section>
                <div className="product-holder">
                    <h3>Products</h3>
                    <div className="product-card-holder">
                        {PRODUCTS.map((val) => (
                            <div className="card" key={val.id}>
                                <h5 className="title">{val.name}</h5>
                                <p className="price">₹ {val.price}</p>
                                <button
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
                    <h3>Cart Summary</h3>
                    <div className="total-cart-card-holder">
                        <h5>Sub total</h5>
                        <p className="total-price">₹ {total}</p>
                    </div>
                    {total < 1000 ? (
                        <div className="gift-req">
                            <p>Add ₹1000 more to get a FREE Wireless Mouse!</p>
                            <div className="progress-container">
                                <div
                                    className="progress-bar"
                                    style={{
                                        width: (total / 1000) * 100 + "%",
                                    }}
                                ></div>
                            </div>
                        </div>
                    ) : (
                        <div className="gift-req">
                            <p>You got a FREE Wireless Mouse!</p>
                        </div>
                    )}
                </div>

                <div className="cart">
                    {cart.length > 0 ? (
                        cart.map((val, ind) =>
                            val?.id !== undefined && val.id === "gift" ? (
                                <div className="card" key={ind}>
                                    <div className="contain-cart-card-main">
                                        <h5 className="title">{val.name}</h5>
                                        <p className="price">
                                            ₹ {val.price} x {val.count} ={" "}
                                            {val.price * val.count}
                                        </p>
                                    </div>
                                    <div className="control-cart">
                                        <span className="gift">Free Gift</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="card" key={ind}>
                                    <div className="contain-cart-card-main">
                                        <h5 className="title">{val.name}</h5>
                                        <p className="price">
                                            ₹ {val.price} x {val.count} ={" "}
                                            {val.price * val.count}
                                        </p>
                                    </div>
                                    <div className="control-cart">
                                        <button
                                            type="button"
                                            className="decrement-btn"
                                            onClick={() => decrementer(ind)}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            name="count"
                                            value={val.count}
                                            onChange={(e) =>
                                                setTotal(e.target.value)
                                            }
                                        />
                                        <button
                                            onClick={() => incrementer(ind)}
                                            type="button"
                                            className="increment-btn"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )
                        )
                    ) : (
                        <div className="empty-cart">
                            <p className="empty-cart-main-text">
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

import {useEffect} from "react";
import Header from "../../components/header/inex.tsx";
import "./styles.css";
import Card from "../../components/card";
import axios from "axios";

const products = [
    {
        id: "12",
        name: "Echo Dots",
        img: "https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SL1000_.jpg",
        price: 799,
        brand: "Amazon"
    },
    {
        id: "13",
        name: "Echo Dots",
        img: "https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SL1000_.jpg",
        price: 799,
        brand: "Amazon"
    },
    {
        id: "14",
        name: "Echo Dots",
        img: "https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SL1000_.jpg",
        price: 799,
        brand: "Amazon"
    },
    {
        id: "15",
        name: "Echo Dots",
        img: "https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SL1000_.jpg",
        price: 799,
        brand: "Amazon"
    }
]
export default function App() {
    async function getProducts() {
        const response = await axios.get("https://dummyjson.com/products");
        console.log(response.data.products);
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="container_home">
            <Header />
            <h1>Produtos</h1>
            <div className="list_cards">
                {products.map((product) => (
                    <Card
                        key={product.id}
                        name={product.name}
                        img={product.img}
                        brand={product.brand}
                        price={product.price} />
                ))}
            </div>

            <button className="float_button">+</button>
        </div>
    );
}
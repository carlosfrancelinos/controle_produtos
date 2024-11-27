import {useEffect, useState} from "react";
import Header from "../../components/header/inex.tsx";
import "./styles.css";
import Card from "../../components/card";
import axios from "axios";

interface Produto {
    id: string;
    title: string;
    price: string;
    description: string
    images: string[];
    brand: string;
}
export default function App() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    async function getProducts() {
        try {
            const response = await axios.get("https://dummyjson.com/products");
            setProdutos(response.data.products);
        } catch (error) {
            alert(`Erro ao buscar produtos ${error}`);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="container_home">
            <Header />
            <h1>Produtos</h1>
            <div className="list_cards">
                {produtos.map((product) => (
                    <Card
                        key={product.id}
                        title={product.title}
                        images={product.images[0]}
                        brand={product.brand}
                        price={product.price} />
                ))}
            </div>

            <button className="float_button">+</button>
        </div>
    );
}
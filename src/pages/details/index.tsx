import axios from "axios";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {Produto} from "../home";

export default function Details() {
    const params = useParams();

    const [product, setProduct] = useState<Produto>({} as Produto);
    const [imagem, setImagem] = useState("");

    async function getDatilsProduct() {
        const response = await axios.get(`https://dummyjson.com/products/${params.id}`);
        console.log(response.data);
        setProduct(response.data);
        setImagem(response.data.images[0]);
    }

    useEffect(() => {
        getDatilsProduct();
    }, []);

    return (
        <div>
            <h1>{product.title}
                <button>Apagar</button>
                <button>Editar</button>
            </h1>
            <img src={imagem}/>
            <p>{product.brand}</p>
            <p>{product.price}</p>
            <p>{product.description}</p>
        </div>
    )
}
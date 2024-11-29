import React, {useEffect, useState} from "react";
import Header from "../../components/header/inex.tsx";
import "./styles.css";
import Card from "../../components/card";
import Modal from 'react-modal';
import axios from "axios";

export interface Produto {
    id: string;
    title: string;
    price: string;
    description: string
    images: string[];
    brand: string;
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export default function App() {

    const [produtos, setProdutos] = useState<Produto[]>([]);

    const [isOpenModal, setIsOpenModal] = useState(false);

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagem, setImagem] = useState("");

    async function getProducts() {
        try {
            const response = await axios.get("https://dummyjson.com/products");
            setProdutos(response.data.products);
        } catch (error) {
            alert(`Erro ao buscar produtos ${error}`);
        }
    }

    async function saveProduct(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try{
            await axios.post("https://dummyjson.com/products/add", {
                title: nome,
                price: preco,
                description: descricao,
                images: [imagem],
                brand: fornecedor
            });
            getProducts();
            setIsOpenModal(false);
            limparEstados();
            alert(`|Produto Cadastrado com sucesso!`);
        } catch (error) {
            alert(`Houve um erro ao cadastrar o produto ${error}`);
        }
        //console.log({nome, preco, descricao, imagem, fornecedor});
    }

    function limparEstados() {
        setNome("");
        setDescricao("");
        setFornecedor("");
        setImagem("");
        setPreco("");
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
                        id={product.id}
                        title={product.title}
                        images={product.images[0]}
                        brand={product.brand}
                        price={product.price} />
                ))}
            </div>

            <button className="float_button" onClick={() => setIsOpenModal(true)}>+</button>
            <Modal style={customStyles} isOpen={isOpenModal}>
                <h1>Cadastrar Produto</h1>
                <form className="form" onSubmit={saveProduct}>
                <input placeholder="Nome do Produto"
                       value={nome}
                       onChange={(event) => setNome(event.target.value)}
                />
                <input placeholder="Preço"
                       value={preco}
                       onChange={(event) => setPreco(event.target.value)}
                />
                    <select
                        value={fornecedor}
                        onChange={(event) => setFornecedor(event.target.value)}
                    >
                        <option value=""></option>
                        <option value="Fornecedor 1">Fornecedor 1</option>
                        <option value="Fornecedor 2">Fornecedor 2</option>
                    </select>

                    <input placeholder="Url da imagem"
                           value={imagem}
                           onChange={(event) => setImagem(event.target.value)}
                    />
                    <input placeholder="Descrição"
                           value={descricao}
                           onChange={(event) => setDescricao(event.target.value)}
                    />

                    <button type="submit" className="btn_cadastrar">Cadastrar</button>
                    <button className="btn_cancelar" onClick={() => setIsOpenModal(false)}>Cancelar</button>
                </form>
            </Modal>
        </div>
    );
}
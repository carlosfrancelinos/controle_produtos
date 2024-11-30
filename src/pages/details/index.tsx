import axios from "axios";
import { useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Produto} from "../home";
import Modal from "react-modal";

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

export default function Details() {
    const params = useParams();

    const [product, setProduct] = useState<Produto>({} as Produto);
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagem, setImagem] = useState("");

    const [isOpenModal, setIsOpenModal] = useState(false);

    async function getDatilsProduct() {
        const response = await axios.get(`https://dummyjson.com/products/${params.id}`);
        console.log(response.data);
        setProduct(response.data);
        setImagem(response.data.images[0]);
    }

    useEffect(() => {
        getDatilsProduct();
    }, []);

    async function editProduct(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try{
            await axios.put(`https://dummyjson.com/products/${params.id}`,
                {
                    title: nome,
                    price: preco,
                    description: descricao,
                    images: [imagem],
                    brand: fornecedor
                });
            setIsOpenModal(false);
            getDatilsProduct();
            alert('Produto Editado com sucesso!');
        }catch(error){
            alert(`Erro ao Editar Produto. Causa: ${error}`);
        };

    }

    return (
        <div>
            <h1>{product.title}
                <button>Apagar</button>
                <button onClick={() => {
                    setIsOpenModal(true);
                    setNome(product.title);
                    setDescricao(product.description);
                    setFornecedor(product.brand);
                    setImagem(imagem);
                    setPreco(product.price);
                }}>Editar</button>
            </h1>
            <img src={imagem} style={ {width: 300 }}/>
            <p>Fornecedor: {product.brand}</p>
            <p>Preço: {product.price}</p>
            <p>Descrição: {product.description}</p>

            <Modal style={customStyles} isOpen={isOpenModal}>
                <h1>Editar Produto</h1>
                <form className="form" onSubmit={editProduct}>
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

                    <button type="submit" className="btn_cadastrar">Alterar</button>
                    <button className="btn_cancelar" onClick={() => setIsOpenModal(false)}>Cancelar</button>
                </form>
            </Modal>
        </div>
    )
}
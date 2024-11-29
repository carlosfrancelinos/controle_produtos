interface CardProps {
    id: string;
    title : string;
    images: string;
    brand: string
    price: string;
}



import { Link } from "react-router-dom";

import "./styles.css";


export default function Card(props: CardProps) {
    return (
        <Link to={`/details/${props.id}`}>
            <div className="card">
                <h3>{props.title}</h3>
                <img src={props.images}/>
                <p>{props.brand}</p>
                <p>R$ {props.price}</p>
            </div>
        </Link>
    )
}
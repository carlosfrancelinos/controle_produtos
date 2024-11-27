interface CardProps {
    title : string;
    images: string;
    brand: string
    price: string;
}

import "./styles.css";

export default function Card(props: CardProps) {
    return (
        <div className="card">
            <h3>{props.title}</h3>
            <img src={props.images}/>
            <p>{props.brand}</p>
            <p>R$ {props.price}</p>
        </div>
    )
}
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom"

export default function VanDetail() {
    const location = useLocation();
    const param = useParams();
    const [van, setVan] = useState(null);

    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    useEffect(() => {
        fetch(`/api/vans/${param.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans))
    }, [param.id])

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>
            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} alt={van.name} />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    )
}
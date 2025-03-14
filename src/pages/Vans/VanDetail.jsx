import { Await, Link, useLoaderData, useLocation } from "react-router-dom"
import { getHostVans } from "../../api";
import { Suspense } from "react";

export function loader({ params }) {
    const van = getHostVans(params.id);
    return ({ van })
}

export default function VanDetail() {
    const location = useLocation();
    const dataPromise = useLoaderData();

    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    function renderVanElement(van) {
        return (
            <>
                <div className="van-detail">
                    <img src={van.imageUrl} alt={van.name} />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            </>
        )
    }

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>
            <Suspense fallback={<h2>Loading van ...</h2>}>
                <Await resolve={dataPromise.van}>
                    {renderVanElement}
                </Await>
            </Suspense>

        </div>
    )
}
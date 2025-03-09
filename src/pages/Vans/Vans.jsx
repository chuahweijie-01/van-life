import { Await, Link, useLoaderData, useSearchParams } from "react-router-dom"
import { getVans } from "../../api";
import { Suspense } from "react";

export async function loader() {
    const vans = await getVans();
    return { vans };
}

export default function Vans() {
    const dataPromise = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();

    const typeFilter = searchParams.get('type');

    function renderVansElement(vans) {
        const displayedVans = typeFilter ? vans.filter(x => x.type === typeFilter) : vans;

        const vanElements = displayedVans.map(van => (
            <div key={van.id} className="van-tile">
                <Link to={van.id} state={{ search: `?${searchParams.toString()}`, type: typeFilter }}>
                    <img src={van.imageUrl} alt={`${van.name}`} />
                    <div className="van-info">
                        <p>{van.name}</p>
                        <p>${van.price}<span>/day</span></p>
                    </div>
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                </Link>
            </div>
        ))

        return (
            <>
                <div className="van-list-filter-buttons">
                    <button className={`van-type simple ${typeFilter === 'simple' ? 'selected' : ''}`} onClick={() => { setSearchParams({ type: "simple" }) }}>Simple</button>
                    <button className={`van-type luxury ${typeFilter === 'luxury' ? 'selected' : ''}`} onClick={() => { setSearchParams({ type: "luxury" }) }}>Luxury</button>
                    <button className={`van-type rugged ${typeFilter === 'rugged' ? 'selected' : ''}`} onClick={() => { setSearchParams({ type: "rugged" }) }}>Rugged</button>
                    {typeFilter && <button className="van-type clear-filters" onClick={() => { setSearchParams({}) }}>Clear Filters</button>}
                </div>
                <div className="van-list">
                    {vanElements}
                </div>
            </>
        )
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <Suspense fallback={<h2>Loading vans ...</h2>}>
                <Await resolve={dataPromise.vans}>
                    {renderVansElement}
                </Await>
            </Suspense>
        </div>
    )
}
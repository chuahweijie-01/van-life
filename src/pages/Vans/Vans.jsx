import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { getVans } from "../../api";

export default function Vans() {
    const [vans, setVans] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const typeFilter = searchParams.get('type');

    const displayedVans = typeFilter ? vans.filter(x => x.type === typeFilter) : vans;

    useEffect(() => {
        async function loadVans() {
            setLoading(true);
            try {
                const data = await getVans();
                setVans(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadVans();
    }, [])

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

    if (loading) {
        return (
            <h1 className="loading">Loading ...</h1>
        )
    }

    if (error) {
        return (
            <h1 className="loading">There was an error {error.message}</h1>
        )
    }


    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button className={`van-type simple ${typeFilter === 'simple' ? 'selected' : ''}`} onClick={() => { setSearchParams({ type: "simple" }) }}>Simple</button>
                <button className={`van-type luxury ${typeFilter === 'luxury' ? 'selected' : ''}`} onClick={() => { setSearchParams({ type: "luxury" }) }}>Luxury</button>
                <button className={`van-type rugged ${typeFilter === 'rugged' ? 'selected' : ''}`} onClick={() => { setSearchParams({ type: "rugged" }) }}>Rugged</button>
                {typeFilter && <button className="van-type clear-filters" onClick={() => { setSearchParams({}) }}>Clear Filters</button>}
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}
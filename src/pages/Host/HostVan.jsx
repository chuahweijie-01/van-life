import { Await, Link, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";
import { Suspense } from "react";

export async function loader({ request }) {
    await requireAuth(request);
    const vans = getHostVans();
    return ({ vans });
}

export default function HostVan() {
    const dataPromise = useLoaderData();

    function renderVansElement(vans) {
        const hostVansEls = vans.map(van => (
            <Link
                to={van.id}
                key={van.id}
                className="host-van-link-wrapper"
            >
                <div className="host-van-single" key={van.id}>
                    <img src={van.imageUrl} alt={`${van.name}`} />
                    <div className="host-van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}/day</p>
                    </div>
                </div>
            </Link>
        ))

        return (
            <>
                <h1 className="host-vans-title">Your listed vans</h1>
                <div className="host-vans-list">
                    <section>
                        {hostVansEls}
                    </section>
                </div>
            </>
        )

    }

    return (
        <section>
            <Suspense fallback={<h2>Loading vans ...</h2>}>
                <Await resolve={dataPromise.vans}>
                    {renderVansElement}
                </Await>
            </Suspense>

        </section>
    )
}
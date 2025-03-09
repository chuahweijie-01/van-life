import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Vans, { loader as vansLoader } from './pages/Vans/Vans';

import './server'

import VanDetail, { loader as vanDetailLoader } from './pages/Vans/VanDetail';
import Layout from './components/Layout';
import Income from './pages/Host/Income';
import Reviews from './pages/Host/Reviews';
import HostLayout from './components/HostLayout';
import Dashboard from './pages/Host/Dashboard';
import HostVan, { loader as hostVanLoader } from './pages/Host/HostVan';
import HostVanDetail, { loader as hostVanDetailLoader } from './pages/Host/HostVanDetail';
import HostVanPricing from './pages/Host/HostVanPricing';
import HostVanInfo from './pages/Host/HostVanInfo';
import HostVanPhotos from './pages/Host/HostVanPhotos';
import NotFound from './pages/NotFound';
import Error from './components/Error';
import Login, { loader as loginLoader, action as loginAction } from './pages/Login';
import { requireAuth } from './utils';


function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='login' element={<Login />} loader={loginLoader} action={loginAction} />
      <Route path='vans' element={<Vans />} loader={vansLoader} errorElement={<Error />} />
      <Route path='vans/:id' element={<VanDetail />} loader={vanDetailLoader} errorElement={<Error />} />

      <Route path='host' element={<HostLayout />}>
        <Route index element={<Dashboard />} loader={async ({ request }) => await requireAuth(request)} />
        <Route path='income' element={<Income />} loader={async ({ request }) => await requireAuth(request)} />
        <Route path='reviews' element={<Reviews />} loader={async ({ request }) => await requireAuth(request)} />
        <Route path='vans' element={<HostVan />} loader={hostVanLoader} errorElement={<Error />} />
        <Route path='vans/:id' element={<HostVanDetail />} loader={hostVanDetailLoader} errorElement={<Error />} >
          <Route index element={<HostVanInfo />} loader={async ({ request }) => await requireAuth(request)} />
          <Route path='pricing' element={<HostVanPricing />} loader={async ({ request }) => await requireAuth(request)} />
          <Route path='photos' element={<HostVanPhotos />} loader={async ({ request }) => await requireAuth(request)} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />}></Route>
    </Route>
  ))

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

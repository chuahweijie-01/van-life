import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Vans from './pages/Vans';

import './server'
import VanDetail from './pages/VanDetail';

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <Link to='/' className='site-logo'>#VanLife</Link>
          <nav>
            <Link to='/about'>About</Link>
            <Link to="/vans">Vans</Link>
          </nav>
        </header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/vans' element={<Vans/>} />
          <Route path='/vans/:id' element={<VanDetail/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

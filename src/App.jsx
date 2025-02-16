import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
          </nav>
        </header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

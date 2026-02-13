
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import About from './pages/About'
import Adopt from './pages/Adopt'
import Volunteer from './pages/Volunteer'
import Contact from './pages/Contact'
import Layout from './components/Layout'
import AdoptDetails from './pages/AdoptDetails'
import WhyAdopt from './pages/WhyAdopt'
import Doctors from "./pages/Doctors"
import Indies from './pages/Indies'
import Admin from './pages/Admin';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="adopt" element={<Adopt />} />
          <Route path="adopt/:id" element={<AdoptDetails />} />
          <Route path="volunteer" element={<Volunteer />} />
          {/*<Route path="surrender" element={<Surrender />} */}
          <Route path="contact" element={<Contact />} />
          <Route path="why-adopt" element={<WhyAdopt />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="indies" element={<Indies />} />
          <Route path="admin" element={<Admin />} />
          {/* <Route path="donate" element={<Donate />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />)

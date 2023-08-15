import "./App.css";
import NavBar from "./components/NavBar";
// import Footer from './components/Footer';
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";

import Landing from "./Pages/Landing";
import Account from "./Pages/Account";
import Admin from "./Pages/Admin";
import Mint from "./Pages/Mint";
import About from "./Pages/About";


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/info" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

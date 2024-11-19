import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home";
import Lista from "./Lista";
import Login from "./Login";
import Cadastro from "./Cadastro";

const Rotas = () => {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/lista" element={<Lista/>} />
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
        </Router>
    )       
}

export default Rotas;
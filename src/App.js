import React from "react";
import Home from "./pages/Home";
import Car from "./pages/Car";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Upload from "./pages/Upload";

import { Routes, Route } from 'react-router-dom';

import './App.css';
import Images from "./pages/Images";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/car" element={ <Car /> } />
      <Route path="/signin" element={ <Signin /> } />
      <Route path="/upload" element={ <Upload /> } />
      <Route path="/signup" element={ <Signup /> } />
      <Route path="/images" element={ <Images /> } />
    </Routes>
  )
}

export default App;

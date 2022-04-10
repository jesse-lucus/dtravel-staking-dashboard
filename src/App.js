import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { createBrowserHistory } from 'history'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Modal } from "@material-ui/core";
import Header from './layouts/header';
import Login from './Component/Login';
import Register from './Component/Register';
import Dashboard from './Component/Dashboard';

const App = () => {
  const history = createBrowserHistory();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;

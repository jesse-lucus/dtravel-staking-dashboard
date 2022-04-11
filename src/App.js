import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { createBrowserHistory } from 'history'
import { BrowserRouter, Routes, Route  } from "react-router-dom";
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
    <Box maxWidth={"1440px"} width={"100%"} display={"flex"} flexDirection={"column"} alignItems="center" boxSizing={"border-box"} sx={{ px: { xs: "24px", sm: "64px", md: "108px" } }}>
      <BrowserRouter>
      <Header></Header>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </Box>
    </>
  );
}

export default App;

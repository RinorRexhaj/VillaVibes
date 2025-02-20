import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Reservations from "../pages/Reservations";
import ChatBot from "../components/chatbot/ChatBot";

const AppRouter: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rezervo" element={<Reservations />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
      <ChatBot />
    </>
  );
};

export default AppRouter;

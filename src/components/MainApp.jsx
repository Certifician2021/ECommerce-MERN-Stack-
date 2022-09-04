import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import auth from "../utils/auth";
import Admin from "./Admin";
import Users from "./Users";
import Products from "./Products";
import AddProducts from "./AddProducts";
import NotFoundPage from "./NotFoundPage";

const MainApp = ({ routes }) => {
  useEffect(() => {}, []);

  const [showModal, setShowModal] = useState(true);

  const data = auth.getUserInfo();

  return (
    <div className="app-layout">
      <Sidebar />
      <section style={{width:"70%",height:"85vh"}} className="flex-grow-1">
        <Routes>
         <Route path="/admin" element={<Admin />} />
         <Route path="/users" element={<Users />} />
         <Route path="/products" element={<Products />} />
         <Route path="/add_products" element={<AddProducts />} />
         <Route path="*" element={NotFoundPage} />


        </Routes>
      </section>
    </div>
  );
};

export default MainApp;

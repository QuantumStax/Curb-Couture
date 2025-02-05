/* eslint-disable no-unused-vars */
import { useState } from "react";
import Nav from "../components/nav2";
import axios from "axios";
import AddProduct from "../components/admin/addProduct";

const Admin = () => {
  return (
    <section className="bg-primary h-screen">
      <Nav />
      <section className="bg-primary px-20 py-10">
        <AddProduct/>
      </section>
    </section>
  );
};

export default Admin;

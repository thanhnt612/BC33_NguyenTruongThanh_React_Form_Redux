import React from "react";
import { Outlet } from "react-router-dom";
import HeaderHome from "../Component/HeaderHome/HeaderHome";

export default function HomeTemplates() {
  return (
    <>
      <HeaderHome />
      <div className="container" style={{ minHeight: 800 }}>
        <Outlet />
      </div>
      <header className="bg-dark text-white text-center p-5">Footer</header>
    </>
  );
}

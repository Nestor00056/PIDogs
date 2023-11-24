import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import style from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetData } from "./redux/Action/GetData";
import Home from "./views/Home";
import Dogs from "./views/DogsCreate";
import FormCreate from "./views/FormCreate";
import LandingPage from "./views/LandingPage/LandingPage";

function App() {
  /*  let estado = useSelector((state) => state.data.AllData.Data);
  let dispatch = useDispatch();

  const getdata = async (page = 1) => {
    dispatch(GetData("http://localhost:3001/home?page=" + page));
  };

  useEffect(() => {
    if (!estado?.length > 0) {
      getdata();
    }
  }, [estado]); */
  /*   console.log(estado) */ return (
    <Routes>
      <Route path="/">
        <Route index element={<LandingPage></LandingPage>} />
        <Route path="/home" element={<Home></Home>} />
        <Route path="/Dogs" element={<Dogs></Dogs>} />
        <Route path="/FormCreate" element={<FormCreate></FormCreate>} />
      </Route>
    </Routes>
  );
}

export default App;

import { useDispatch, useSelector } from "react-redux";
import style from "./Render.module.css";
import RenderCards from "../Cards/RenderCards";
import { GetData } from "../../redux/Action/GetData";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RenderPage from "../RenderPages/RenderPages";
function RenderData({ isData }) {
  const estado = useSelector((state) => state.data.AllData.filterData);
  const loader = useSelector((state) => state.data.loader);
  const Url = useSelector((state) => (isData ? state.data.url : state.data.urlDogs));
  const dispatch = useDispatch();
  const url = useLocation();

  useEffect(() => {
    const getdata = async () => {
      dispatch(GetData(`${Url}${url.search}`));
    };
    if (estado?.length <= 0) {
      getdata();
    }
  }, [estado]);

  return (
    <article className={style.RenderContainer}>
      {estado.length > 0 ? (
        <ul className={style.Page}>
          <RenderPage isData={isData}></RenderPage>
        </ul>
      ) : (
        ""
      )}
      <div className={style.MainContent}>
        {loader ? (
          estado?.length > 0 ? (
            <RenderCards Data={estado} isData={isData}></RenderCards>
          ) : (
            <h1>No hay elementos</h1>
          )
        ) : (
          <h1>Cargando...</h1>
        )}
      </div>
    </article>
  );
}

export default RenderData;

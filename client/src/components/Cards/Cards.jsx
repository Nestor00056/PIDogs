import { useState } from "react";
import Detailed from "../DetailComponents/Detailed";
import style from "./Cards.module.css";

function Cards({ Data, isData }) {
  const [Detail, setDetail] = useState(false);
  return (
    <div className={style.Container}>
      <div className={style.ImageContent}>
        <img
          src={Data?.image ? Data?.image : "../../public/fondoBlanco.jpg"}
          className={style.Image}
        />
        <div className={style.CoverImage}>
          <button
            onClick={() => {
              setDetail(true);
            }}
          >
            More Details
          </button>
        </div>
      </div>
      <div className={style.Details}>
        <label>Race:</label>
        <p>{Data?.name}</p>
        <label>Temperament:</label>
        <p>{Data?.temperament}</p>
        <label>Weight:</label>
        <div className={style.Div}>
          <p>MaxWeight:{Data.weight.maxWeight}</p>
          <p>MinWeight:{Data.weight.minWeight}</p>
          {Detail ? (
            <Detailed Data={Data} Close={setDetail} isData={isData}></Detailed>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Cards;

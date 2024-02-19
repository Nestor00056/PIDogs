import { useNavigate } from "react-router-dom";
import style from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../../redux/Reducer/MainReducer";
import { SendfetchData } from "../../helpers/SendFetch";
import { useState } from "react";
import Form from "../FormComponents/Form";

function Detailed({ Data, Close }) {
  const url = useSelector((state) => state.data.urlDogs);
  const [update, setUpdate] = useState(false);
  const Dispacth = useDispatch();
  return (
    <div className={style.Cover}>
      <div className={style.MainContent}>
        <img
          src={Data?.image ? Data?.image : "../../public/fondoBlanco.jpg"}
          alt=""
          className={style.Image}
        />
        <div className={style.DataContent}>
          <div className={style.Title}>
            <span
              className={style.Close}
              onClick={() => {
                Close(false);
              }}
            >
              X
            </span>
            <h1>DETAILS</h1>
          </div>
          <h2>Race:</h2>
          <p>{Data?.name}</p>
          <h2>Weight:</h2>
          <p>{`MinWeight:${Data?.weight.minWeight}  MaxWeight:${Data?.weight.maxWeight} kg`}</p>
          <h2>Height:</h2>
          <p>{`${Data?.height}cm`}</p>
          <h2>Temperaments:</h2>
          <p>{Data?.temperament}</p>
          <h2>Life Span:</h2>
          <p>{`${Data?.life_span} ${Data?.create ? "years" : ""}`}</p>
          {Data?.create ? (
            <div className={style.ButtonContainer}>
              <button
                onClick={async () => {
                  let response = await SendfetchData(url, { name: Data.name }, "DELETE");
                  if (response?.success) {
                    alert(response.message);
                    Dispacth({ type: clearState });
                  } else {
                    alert("no se ha podido eliminar la raza");
                  }
                }}
              >
                Delete Dog
              </button>
              <button
                onClick={() => {
                  setUpdate(true);
                }}
              >
                Update Dog
              </button>
            </div>
          ) : (
            ""
          )}
          {update ? (
            <div className={style.UpdateCover}>
              <div className={style.UpdateTitle}>
                <span
                  onClick={() => {
                    setUpdate(false);
                  }}
                >
                  X
                </span>
                <h1>Update</h1>
              </div>
              <Form Data={Data} update={setUpdate} method={"PUT"}></Form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Detailed;

import { useState } from "react";
import style from "./Filter.module.css";
import { useDispatch } from "react-redux";
import {
  OderBymax,
  OderBymin,
  OrderByAZ,
  OrderByZA,
} from "../../redux/Reducer/MainReducer";

function OrderBy() {
  const Dispatch = useDispatch();
  return (
    <div className={style.OrderContainer}>
      <h1>OrderBy</h1>
      <label htmlFor="">Order By MaxWeight</label>
      <input
        type="radio"
        name="grupo1"
        id=""
        onClick={(event) => {
          Dispatch({ type: OderBymax });
        }}
      />
      <label htmlFor="">Order By MinWeight</label>
      <input
        type="radio"
        name="grupo1"
        id=""
        onClick={(event) => {
          Dispatch({ type: OderBymin });
        }}
      />
      <label>Order By alphabet A-Z</label>
      <input
        type="radio"
        name="grupo1"
        id=""
        onClick={(event) => {
          Dispatch({ type: OrderByAZ });
        }}
      />
      <label>Order By alphabet Z-A</label>
      <input
        type="radio"
        name="grupo1"
        id=""
        onClick={(event) => {
          Dispatch({ type: OrderByZA });
        }}
      />
    </div>
  );
}

export default OrderBy;

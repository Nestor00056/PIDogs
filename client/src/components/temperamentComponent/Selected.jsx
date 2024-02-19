import { useEffect, useState } from "react";
import style from "./Temp.module.css";
function Selected({ giveTemp, Temp, active }) {
  return (
    <div className={active?.includes(Temp) ? style.Select : style.Temp}>
      <h1>{Temp}</h1>
      <button
        onClick={() => {
          giveTemp(Temp);
        }}
      >
        {active?.includes(Temp) ? "Remove" : "Add"}
      </button>
    </div>
  );
}

export default Selected;

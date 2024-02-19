import { useState, useRef } from "react";
import style from "./Filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, filter, filterData } from "../../redux/Reducer/MainReducer";
import { GetData } from "../../redux/Action/GetData";

function FilterWeight() {
  const Dispatch = useDispatch();
  const Race = useRef(null);
  const weightMin = useRef(null);
  const weightMax = useRef(null);
  const Temperament = useRef(null);
  const DogUrl = useSelector((state) => state.data.urlDogs);
  const NormalUrl = useSelector((state) => state.data.url);
  const [filters, setfilters] = useState({
    minweight: "",
    maxweight: "",
    name: "",
    temperament: "",
  });
  const [search, setSearch] = useState("");
  return (
    <>
      <div className={style.Container}>
        <label className={style.Label}>SearchDog</label>
        <input
          className={style.Input}
          type="text"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <button
          className={style.InputButton}
          onClick={() => {
            try {
              Dispatch(GetData(`http://localhost:3001/DogSearch/${search}`));
            } catch (error) {
              alert(error.error);
            }
          }}
        >
          Search
        </button>
        <label className={style.Label}>RaceFilter</label>
        <input
          className={style.Input}
          type="text"
          ref={Race}
          onChange={(event) => {
            setfilters({ ...filters, name: event.target.value });
          }}
        />
      </div>
      <div className={style.Inputcontainer}>
        <label>MinWeight</label>
        <input
          type="text"
          ref={weightMin}
          onChange={(event) => {
            setfilters({ ...filters, minweight: parseInt(event.target.value) });
          }}
        />
        <label>MaxWeight</label>
        <input
          type="text"
          ref={weightMax}
          onChange={(event) => {
            setfilters({ ...filters, maxweight: parseInt(event.target.value) });
          }}
        />
        <label>Temperaments</label>
        <input
          type="text"
          ref={Temperament}
          onChange={(event) => {
            setfilters({ ...filters, temperament: event.target.value });
          }}
        />
        <button
          className={style.InputButton}
          onClick={(el) => {
            Dispatch({
              type: filter,
              payload: {
                filters: {
                  minWeight: filters.minweight,
                  maxWeight: filters.maxweight,
                  name: filters.name,
                  temperament: filters.temperament,
                },
                search: true,
              },
            });
            Dispatch({ type: filterData });
          }}
        >
          Filter
        </button>
        <button
          className={style.InputButton}
          onClick={(el) => {
            Dispatch({
              type: filter,
              payload: {
                filters: { minWeight: "", maxWeight: "", name: "", temperament: "" },
                search: false,
              },
            });
            setfilters({ minWeight: "", maxWeight: "", name: "", temperament: "" });
            Dispatch({ type: clearFilters });
            Race.current.value = "";
            weightMin.current.value = "";
            weightMax.current.value = "";
            Temperament.current.value = "";
          }}
        >
          Clear Filters
        </button>
      </div>
    </>
  );
}

export default FilterWeight;

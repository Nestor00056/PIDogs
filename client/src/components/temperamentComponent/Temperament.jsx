import { useEffect, useRef, useState } from "react";
import { fetchData } from "../../helpers/Fetch";
import style from "./Temp.module.css";
import Selected from "./Selected";
import RenderCards from "../Cards/RenderCards";
function Temperament({ setTemp, currentTemp }) {
  const [AllData, setData] = useState({ Data: [], backup: [] });
  const [String, setString] = useState([]);
  const [Active, setActive] = useState(false);
  const FilterInput = useRef(null);
  useEffect(() => {
    const FillData = async () => {
      try {
        let newData = await fetchData("http://localhost:3001/Temperaments");
        if (newData?.data.length > 0) {
          if (currentTemp.length > 0) {
            let temp = currentTemp.split(",");
            let newArray = [];
            for (let i = 0; i < temp.length; i++) {
              for (let j = 0; j < newData.data.length; j++) {
                // Operaciones con array1[i][j]
                if (temp[i].toLowerCase() === newData.data[j].temperament.toLowerCase()) {
                  newArray.push(temp[i]);
                  break;
                }
              }
            }
            if (newArray.length > 0) {
              setString([...newArray]);
            } else {
              alert("el temperamento que introduciste no existe, seleciona nuevos");
            }
          }
          setData({ Data: [...newData.data], backup: [...newData.data] });
        }
      } catch (error) {
        console.log(error?.message);
      }
    };
    if (AllData?.Data.length <= 0) {
      FillData();
    }
  }, [AllData]);
  const FilterData = (event) => {
    if (AllData.Data?.length > 0) {
      let newData = AllData.backup.filter((el) => {
        return (
          /* el.temperament.toLowerCase().replace(/\s/g, "") ===
          event.target.value.toLowerCase().replace(/\s/g, "") */
          el.temperament.toLowerCase().includes(event.target.value.toLocaleLowerCase())
        );
      });
      setData({
        ...AllData,
        Data: newData.length > 0 ? newData : AllData.backup,
      });
    }
  };

  const FilterString = (event) => {
    if (AllData.Data?.length > 0) {
      let newString = String.map((el) => {
        return { temperament: el };
      });
      let newData = newString.filter((el) => {
        return (
          /* el.temperament.toLowerCase().replace(/\s/g, "") ===
          event.target.value.toLowerCase().replace(/\s/g, "") */
          el.temperament.toLowerCase().includes(event.target.value.toLocaleLowerCase())
        );
      });
      setData({
        ...AllData,
        Data: newData.length > 0 ? newData : newString,
      });
    }
  };

  const giveTemp = (Temp) => {
    if (String.includes(Temp)) {
      let index = String.indexOf(Temp);
      let newArray = [...String];
      newArray.splice(index, 1);
      setString([...newArray]);
    } else {
      setString([...String, Temp.replace(/\s/g, "")]);
    }
  };

  return (
    <div className={style.TempContainer}>
      <div className={style.TempContent}>
        <span
          className={style.Close}
          onClick={() => {
            setTemp(String);
          }}
        >
          X
        </span>
        <h1>{String.length > 0 ? String.join(",") : "Temperaments"}</h1>
        <h2>Filter Per Temperament</h2>
        <div className={style.InputContainer}>
          <button
            className={Active ? style.Active : style.Button}
            onClick={() => {
              let newData = String.map((el) => {
                return { temperament: el };
              });
              setActive(Active ? false : true);
              setData({ ...AllData, Data: !Active ? [...newData] : [...AllData.backup] });
            }}
          >
            Active
          </button>
          <input
            type="text"
            ref={FilterInput}
            onChange={(event) => {
              if (!Active) {
                FilterData(event);
              } else {
                FilterString(event);
              }
            }}
          />
          <button
            className={style.Button}
            onClick={() => {
              if (!Active) {
                setData({ ...AllData, Data: [...AllData.backup] });
                setString([]);
                FilterInput.current.value = "";
              } else {
                let newData = String.map((el) => {
                  return { temperament: el };
                });
                setData({ ...AllData, Data: [...newData] });
                setString([]);
                FilterInput.current.value = "";
              }
            }}
          >
            Clear temperaments
          </button>
        </div>
        <div className={style.RenderContent}>
          <RenderCards
            isRender={true}
            Data={AllData.Data}
            isData={giveTemp}
            isActive={String}
          ></RenderCards>
        </div>
      </div>
      <button
        className={style.SendButton}
        onClick={() => {
          setTemp(String);
        }}
      >
        Send Temperaments
      </button>
    </div>
  );
}

export default Temperament;

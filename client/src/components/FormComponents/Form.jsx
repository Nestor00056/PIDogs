import { useEffect, useRef, useState } from "react";
import style from "./Form.module.css";
import ValidationData from "../../helpers/ValidationForm";
import { SendfetchData } from "../../helpers/SendFetch";
import { useSelector } from "react-redux";
import Temperament from "../temperamentComponent/Temperament";
function Form({ Data, method, update }) {
  const url = useSelector((state) => state.data.urlDogs);
  const [Form, setForm] = useState({});
  const [Temp, setTemp] = useState("");
  const [Error, setError] = useState({
    name: null,
    weight: null,
    height: null,
    temperament: null,
    image: null,
    life_span: null,
  });
  const tempInput = useRef(null);
  const [Close, setClose] = useState(false);
  useEffect(() => {
    const giveData = () => {
      let string = `${Data?.weight.minWeight}-${Data?.weight.maxWeight}`;
      console.log(typeof string === "string");
      setForm({
        name: Data?.name,
        weight: string,
        height: Data?.height,
        image: Data?.image,
        life_span: Data?.life_span,
      });
      setError(ValidationData({ ...Data, weight: string }));
      setTemp(Data?.temperament);
    };
    if (Data) {
      giveData();
    }
  }, []);
  const handleInput = (event) => {
    setForm({ ...Form, [event.target.name]: event.target.value });
    setError(ValidationData({ ...Form, [event.target.name]: event.target.value }));
  };

  const handleTemperament = (String) => {
    setTemp(String.join(","));
    setError(ValidationData({ ...Form, temperament: String.join(",") }));
    setClose(false);
    /* tempInput.current.disabled = false; */
  };
  const FetchApi = async () => {
    if (
      !Error.name &&
      !Error.weight &&
      !Error.height &&
      !Error.temperament &&
      !Error.image &&
      !Error.life_span
    ) {
      console.log({ Data, Form });
      let response = await SendfetchData(
        url,
        method === "PUT"
          ? { data: Data, newData: { ...Form, temperament: Temp } }
          : { ...Form, temperament: Temp },
        method === "POST" ? "POST" : "PUT"
      );
      if (response.success) {
        alert(response.message);
        method === "PUT" ? update(false) : "";
      } else {
        alert(response.error);
      }
    } else {
      alert(
        "no se puede crear o actualizar datos si algunos de los campos no cumple los requisitos"
      );
    }
  };
  return (
    <>
      <form
        className={style.Form}
        onSubmit={(event) => {
          event.preventDefault();
          FetchApi();
        }}
      >
        <div className={style.PartOne}>
          <label>Race:</label>
          <p>Aqui puedes colocar la raza de perro que deses ingresar</p>
          <input
            type="text"
            placeholder={Data?.name}
            name="name"
            defaultValue={Data?.name}
            onChange={(event) => {
              handleInput(event);
            }}
          />
          <p className={style.Error}>{Error.name}</p>

          <label>Weight:</label>
          <p>El peso debe ir asi ej: 10-20</p>
          <input
            type="text"
            placeholder={
              Data?.weight ? `${Data?.weight.minWeight}-${Data?.weight.maxWeight}` : ""
            }
            defaultValue={
              Data?.weight ? `${Data?.weight.minWeight}-${Data?.weight.maxWeight}` : ""
            }
            name="weight"
            onChange={(event) => {
              handleInput(event);
            }}
          />
          <p className={style.Error}>{Error.weight}</p>

          <label>Height:</label>
          <p>La altura debe ir asi ej: 10-20</p>
          <input
            type="text"
            placeholder={Data?.height}
            defaultValue={Data?.height}
            name="height"
            onChange={(event) => {
              handleInput(event);
            }}
          />
          <p className={style.Error}>{Error.height}</p>
        </div>

        <div className={style.PartTwo}>
          <div className={style.TemperamentContent}>
            <label>Temperaments:</label>
            <p>Los temperamentos deben ir separados por una coma ej:"Alerta,Amoroso"</p>
            <input
              type="text"
              placeholder={Data?.temperament}
              name="temperament"
              ref={tempInput}
              defaultValue={Temp}
              disabled={true}
              onClick={() => {
                if (Temp.length > 0) {
                  let newString =
                    Temp[Temp.length - 1] === ","
                      ? Temp.substring(0, Temp.length - 1)
                      : Temp;
                  setTemp(newString);
                }
                setClose(true);
                /*  tempInput.current.disabled = true; */
              }}
            />
            <button
              onClick={(event) => {
                event.preventDefault();
                setClose(true);
              }}
            >
              Temperament
            </button>
            <p className={style.Error}>{Error.temperament}</p>
          </div>

          <label>Image:</label>
          <p>es recomendable que use una imagen de una pagina o dirrecion directa</p>
          <input
            type="text"
            placeholder={Data?.image}
            name="image"
            onChange={(event) => {
              handleInput(event);
            }}
          />
          <p className={style.Error}>{Error.image}</p>

          <label>Life span:</label>
          <p>
            La esperanza de vida consiste entre minimo y maximo y se debe itroducir asi
            ej: 10-20
          </p>
          <input
            type="text"
            placeholder={Data?.life_span}
            name="life_span"
            defaultValue={Data?.life_span}
            onChange={(event) => {
              handleInput(event);
            }}
          />
          <p className={style.Error}>{Error.life_span}</p>
          <button>{method === "POST" ? "Crear" : "Actualizar"}</button>
        </div>
      </form>
      {Close ? (
        <Temperament currentTemp={Temp} setTemp={handleTemperament}></Temperament>
      ) : (
        ""
      )}
    </>
  );
}

export default Form;

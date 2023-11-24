import { useState } from "react";
import style from "./Form.module.css";
import ValidationData from "../../helpers/ValidationForm";
import { SendfetchData } from "../../helpers/SendFetch";
import { useSelector } from "react-redux";
function Form({ Data, method }) {
  const url = useSelector((state) => state.data.urlDogs);
  const [Form, setForm] = useState({
    name: "",
    weight: "",
    height: "",
    temperament: "",
    image: "",
    life_span: "",
  });
  const [Error, setError] = useState({
    name: null,
    weight: null,
    height: null,
    temperament: null,
    image: null,
    life_span: null,
  });

  const handleInput = (event) => {
    setForm({ ...Form, [event.target.name]: event.target.value });
    setError(ValidationData({ ...Form, [event.target.name]: event.target.value }));
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
      let response = await SendfetchData(url, Form, method ? "POST" : "PUT");
      if (response.access) {
        alert(response.message);
      } else {
        alert(response.message);
      }
    } else {
      alert(
        "no se puede crear o actualizar datos si algunos de los campos no cumple los requisitos"
      );
    }
  };
  return (
    <form
      className={style.Form}
      onSubmit={(event) => {
        event.preventDefault();
        FetchApi();
      }}
    >
      <label>Race:</label>

      <input
        type="text"
        placeholder={Data?.name}
        name="name"
        onChange={(event) => {
          handleInput(event);
        }}
      />
      <p className={style.Error}>{Error.name}</p>

      <label>Weight:</label>
      <p>El peso debe ir asi ej: 10-20</p>
      <input
        type="text"
        placeholder={`${Data?.weight.minWeight}-${Data?.weight.maxWeight}`}
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
        name="height"
        onChange={(event) => {
          handleInput(event);
        }}
      />
      <p className={style.Error}>{Error.height}</p>

      <label>Temperaments:</label>
      <p>Los temperamentos deben ir separados por una coma ej:"Alerta,Amoroso"</p>
      <input
        type="text"
        placeholder={Data?.temperament}
        name="temperament"
        onChange={(event) => {
          handleInput(event);
        }}
      />
      <p className={style.Error}>{Error.temperament}</p>

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
        La esperanza de vida consiste entre minimo y maximo y se debe itroducir asi ej:
        10-20
      </p>
      <input
        type="text"
        placeholder={Data?.life_span}
        name="life_span"
        onChange={(event) => {
          handleInput(event);
        }}
      />
      <p className={style.Error}>{Error.life_span}</p>
      <button>{method === true ? "Crear" : "Actualizar"}</button>
    </form>
  );
}

export default Form;

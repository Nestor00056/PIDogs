import RenderData from "../components/RnderComponents/RenderData";
import Menu from "../components/MenuComponents/Menu";
import style from "./View.module.css";
import { useDispatch } from "react-redux";
import { clearState } from "../redux/Reducer/MainReducer";
import { useEffect } from "react";
import Form from "../components/FormComponents/Form";
function FormCreate() {
  return (
    <div className={style.container}>
      <div className={style.mainContent}>
        <h1 className={style.Title}>The Dog Api</h1>
        <div className={style.RenderContent}>
          <Menu></Menu>
          <div className={style.FormContainer}>
            <h1>CREATE</h1>
            <Form method={"POST"}></Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormCreate;

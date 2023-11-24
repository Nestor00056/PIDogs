import RenderData from "../components/RnderComponents/RenderData";
import Menu from "../components/MenuComponents/Menu";
import style from "./View.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearState } from "../redux/Reducer/MainReducer";
function Home() {
  const Dispatch = useDispatch();
  function clear() {
    Dispatch({ type: clearState });
  }
  useEffect(() => {
    return () => {
      clear();
    };
  }, []);
  return (
    <div className={style.container}>
      <div className={style.mainContent}>
        <h1 className={style.Title}>The Dog Api</h1>
        <div className={style.RenderContent}>
          <Menu></Menu>
          <RenderData isData={true}></RenderData>
        </div>
      </div>
    </div>
  );
}

export default Home;

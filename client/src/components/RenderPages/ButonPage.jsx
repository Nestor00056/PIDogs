import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "./Button.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GetData } from "../../redux/Action/GetData";

function ButtonPage({ page, update, isData }) {
  const { search, pathname } = useLocation();
  const url = pathname + search;
  const consult = useSelector((state) => (isData ? state.data.url : state.data.urlDogs));
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Link
      className={pathname + `?page=${page}` === url ? style.Active : style.ButtonPage}
      onClick={(e) => {
        e.preventDefault();
        Dispatch(GetData(`${consult}?page=${page}`));
        navigate(`?page=${page}`);
        if (typeof update !== "undefined") {
          update(page);
        }
      }}
    >
      {page}
    </Link>
  );
}

export default ButtonPage;

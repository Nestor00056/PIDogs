import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import { useSelector } from "react-redux";
function LandingPage() {
  return (
    <main className={style.MainContent}>
      <div className={style.Entry}>
        <h1 className={style.Title}>THE DOG API</h1>
        <h3>Bienvenidos a mi PI</h3>
        <Link to={`http://localhost:5173/home?page=1`} className={style.Button}>
          Go to DogApi
        </Link>
      </div>
    </main>
  );
}

export default LandingPage;

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ButtonPage from "./ButonPage";
import { useSelector } from "react-redux";
import style from "./Button.module.css";

function RenderPage({ isData }) {
  const { search } = useLocation();
  const [currentPage, setCurrentPage] = useState(undefined);
  const [Pages, setPages] = useState([]);
  const MaxNumPage = useSelector((state) => state.data.MaxPage);
  const initPage = (current) => {
    let newArray = [];
    if (current <= 2) {
      for (
        let index = current === 1 ? current + 1 : current;
        index <= current + 3;
        index++
      ) {
        newArray.push(index);
      }
    } else {
      let limiter = current - 4 < 2 ? current - 3 : current - 4 < 0 ? 1 : current - 4;
      for (let index = current; index >= limiter; index--) {
        newArray.unshift(index);
      }
    }
    setPages(newArray);
    setCurrentPage(current);
  };

  const CreatePages = (current) => {
    let newArray = [];
    if (current + 4 >= MaxNumPage) {
      let limiter = MaxNumPage - 4 < 0 ? 1 : MaxNumPage - 4;
      for (let index = MaxNumPage - 1; index >= limiter; index--) {
        newArray.unshift(index);
      }
    } else {
      let limiter = current + 4 > MaxNumPage ? MaxNumPage : current + 4;
      for (let index = current === 1 ? current + 1 : current; index <= limiter; index++) {
        newArray.push(index);
      }
    }
    setPages(newArray);
    setCurrentPage(current);
  };
  const GetPages = () => {
    let newArray = [];
    let searchArray = search.split("");
    for (let index = searchArray.length - 1; index > 0; index--) {
      if (isNaN(parseInt(searchArray[index]))) {
        break;
      } else {
        newArray.unshift(searchArray[index]);
      }
    }
    let currentPage = parseInt(newArray.join(""));
    return currentPage > MaxNumPage ? MaxNumPage : currentPage;
  };

  useEffect(() => {
    if (!currentPage && !Pages.length > 0) {
      let currentPage = GetPages();
      CreatePages(currentPage);
      setCurrentPage(currentPage);
    }
  }, []);

  return (
    <>
      <ButtonPage page={1} update={initPage} isData={isData}></ButtonPage>
      {currentPage < 5 ? "" : <p style={{ color: "white" }}>...</p>}
      {Pages.map((el, index) => {
        if (el === Pages[Pages.length - 1]) {
          return (
            <ButtonPage
              isData={isData}
              key={index + Math.random() * 1642458}
              page={el}
              update={CreatePages}
            ></ButtonPage>
          );
        } else if (el === Pages[0]) {
          return (
            <ButtonPage
              isData={isData}
              key={index + Math.random() * 1642458}
              page={el}
              update={initPage}
            ></ButtonPage>
          );
        }

        return (
          <ButtonPage
            key={index + Math.random() * 1642458}
            page={el}
            isData={isData}
          ></ButtonPage>
        );
      })}
      {currentPage + 3 >= MaxNumPage ? "" : <p style={{ color: "white" }}>...</p>}
      {MaxNumPage <= 1 ? (
        ""
      ) : (
        <ButtonPage page={MaxNumPage} update={CreatePages} isData={isData}></ButtonPage>
      )}
    </>
  );
}

export default RenderPage;

import Selected from "../temperamentComponent/Selected";
import Cards from "./Cards";

function RenderCards({ Data, isData, isRender, isActive }) {
  return (
    <>
      {isRender
        ? Data.map((el, index) => {
            return (
              <Selected
                key={index + Math.random() * 1642458}
                giveTemp={isData}
                Temp={el.temperament}
                active={isActive}
              ></Selected>
            );
          })
        : Data?.map((el, index) => {
            return (
              <Cards
                key={index + Math.random() * 1642458}
                Data={el}
                isData={isData}
              ></Cards>
            );
          })}
    </>
  );
}

export default RenderCards;

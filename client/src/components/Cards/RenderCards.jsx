import Cards from "./Cards";

function RenderCards({ Data, isData }) {
  return (
    <>
      {Data?.map((el, index) => {
        return (
          <Cards key={index + Math.random() * 1642458} Data={el} isData={isData}></Cards>
        );
      })}
    </>
  );
}

export default RenderCards;

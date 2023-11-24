const fetchData = async (url) => {
  try {
    let data = await fetch(url);

    if (!data.ok) {
      throw new Error(
        `Ha ocurrido un error: el estatus es: ${data.status} y el texto es: ${data.statusText}`
      );
    }
    let newData = await data.json();
    return newData;
  } catch (error) {
    return { error: error.message };
  }
};

export { fetchData };

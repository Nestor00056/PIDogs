const SendfetchData = async (url, data, METHOD = "POST") => {
  let config = {
    method: METHOD,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    let data = await fetch(url, config);
    let newData = await data.json();
    return newData;
  } catch (error) {
    console.log("hay un error:" + error);
    return { error };
  }
};

export { SendfetchData };

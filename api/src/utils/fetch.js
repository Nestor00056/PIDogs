const fetchApi = (url) => {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`el error es: ${response.text} y el codigo es: ${response.status}`);
    }

    return response.json();
  });
};

module.exports = fetchApi;

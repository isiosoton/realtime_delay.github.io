const getapi = async (api_url) => {
  const response = await fetch(api_url);
  const data = await response.json();
  return data;
};

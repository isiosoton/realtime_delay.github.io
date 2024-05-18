// ロケーション情報を取得する
const location_url = "https://api-public.odpt.org/api/v4/odpt:Train?odpt:operator=odpt.Operator:Toei&odpt:railway=odpt.Railway:Toei.Asakusa";
const station_url = "https://api-public.odpt.org/api/v4/odpt:Station?odpt:operator=odpt.Operator:Toei";

document.addEventListener("DOMContentLoaded", () => {
  getLocation();
});

// ロケーション情報を取得する
const getLocation = async () => {
  const location_json_data = await getapi(location_url);
  let station_list = [];
  location_json_data.forEach((dict_data) => {
    station_list.push(dict_data["odpt:fromStation"]);
    // station_list.push(dict_data["odpt:toStation"]);
  });
  const station_str = station_list.join(",");
  //   console.log(station_str);
  const station_api_url = `${station_url}&owl:sameAs=${station_str}`;
  console.log(station_api_url);
  const station_json_data = await getapi(station_api_url);
  console.log(station_json_data);
  station_json_data.forEach((dict_data) => {
    console.log(dict_data["dc:title"]);
  });
};

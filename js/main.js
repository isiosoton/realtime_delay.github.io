// ロケーション情報を取得する
const location_url = "https://api-public.odpt.org/api/v4/odpt:Train?odpt:operator=odpt.Operator:Toei&odpt:railway=odpt.Railway:Toei.Asakusa";
const station_url = "https://api-public.odpt.org/api/v4/odpt:Station?odpt:operator=odpt.Operator:Toei";

document.addEventListener("DOMContentLoaded", () => {
  getLocation();
});

// ロケーション情報を取得する
const getLocation = async () => {
  const location_json_data = await getapi(location_url);
  // 編集できるlocation_json
  let location_json_data_edit = location_json_data;
  let station_list = [];
  // console.log(location_json_data);
  location_json_data.forEach((dict_data) => {
    station_list.push(dict_data["odpt:fromStation"]);
    station_list.push(dict_data["odpt:toStation"]);
  });
  // station_listの重複を消す
  station_list = Array.from(new Set(station_list));
  console.log(station_list);
  const station_str = station_list.join(",");
  const station_api_url = `${station_url}&owl:sameAs=${station_str}`;
  const station_json_data = await getapi(station_api_url);
  // console.log(station_json_data);
  location_json_data_edit.forEach((dict_data) => {
    from_station_data = station_json_data.find((station) => station["owl:sameAs"] === dict_data["odpt:fromStation"]);
    to_station_data = station_json_data.find((station) => station["owl:sameAs"] === dict_data["odpt:toStation"]);
    dict_data["odpt:fromStation"] = from_station_data == null ? null : from_station_data["dc:title"];
    dict_data["odpt:toStation"] = to_station_data == null ? null : to_station_data["dc:title"];
    // dict_data["odpt:toStation"] = station_json_data.find((station) => station["owl:sameAs"] === dict_data["odpt:toStation"])["dc:title"];
  });
  modifyHTML(location_json_data_edit);
  // console.log(location_json_data_edit);

  // station_json_data.forEach((dict_data) => {
  //   console.log(dict_data["dc:title"]);
  // });
  // modifyHTML(station_json_data);
};

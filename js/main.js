// ロケーション情報を取得する
const route_type = "Toei.Mita";

const location_url = `https://api-public.odpt.org/api/v4/odpt:Train?odpt:operator=odpt.Operator:Toei&odpt:railway=odpt.Railway:${route_type}`;
// const location_url = "https://api-public.odpt.org/api/v4/odpt:Train?odpt:operator=odpt.Operator:Toei&odpt:railway=odpt.Railway:Toei.Asakusa";
const station_url = "https://api-public.odpt.org/api/v4/odpt:Station?odpt:operator=odpt.Operator:Toei";

document.addEventListener("DOMContentLoaded", () => {
  make_list();
  getLocation();
});

const make_list = () => {
  const route_type_json = {
    三田線: "Toei.Mita",
    浅草線: "Toei.Asakusa",
    新宿線: "Toei.Shinjuku",
    大江戸線: "Toei.Oedo",
    荒川線: "Toei.Arakawa",
    "日暮里・舎人ライナー": "Toei.NipporiToneri",
  };
  const route_type_list = Object.keys(route_type_json);
  console.log(route_type_list);
  console.log(route_type_json);
  // const element = document.getElementById("route_type");
};

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
  // 漢字での駅名を取得する
  const station_str = station_list.join(",");
  const station_api_url = `${station_url}&owl:sameAs=${station_str}`;
  console.log(station_api_url);
  const station_json_data = await getapi(station_api_url);
  // console.log(station_json_data);
  location_json_data_edit.forEach((dict_data) => {
    from_station_data = station_json_data.find((station) => station["owl:sameAs"] === dict_data["odpt:fromStation"]);
    to_station_data = station_json_data.find((station) => station["owl:sameAs"] === dict_data["odpt:toStation"]);
    dict_data["odpt:fromStation"] = from_station_data == null ? null : from_station_data["dc:title"];
    dict_data["odpt:toStation"] = to_station_data == null ? "停止中" : to_station_data["dc:title"];
    // dict_data["odpt:toStation"] = station_json_data.find((station) => station["owl:sameAs"] === dict_data["odpt:toStation"])["dc:title"];
  });
  console.log(location_json_data_edit);
  modifyHTML(location_json_data_edit);
};

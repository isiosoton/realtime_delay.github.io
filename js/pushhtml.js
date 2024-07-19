// Modify the HTML data
function modifyHTML(data) {
  const element = document.getElementById("station");
  //   データ数分だけの表を作成
  data.forEach((dict_data) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    td1.textContent = dict_data["odpt:fromStation"];
    td2.textContent = dict_data["odpt:toStation"];
    td3.textContent = dict_data["odpt:delay"];
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    element.appendChild(tr);
  });
}

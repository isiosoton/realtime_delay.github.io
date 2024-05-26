// Modify the HTML data
function modifyHTML(data) {
  const element = document.getElementById("station");
  //   const data_count = data.length;
  //   データ数分だけの表を作成
  data.forEach((dict_data) => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    tr.appendChild(td);
    td.textContent = dict_data["dc:title"];
    element.appendChild(tr);
  });
}

//Aqui se imprime información de busqueda
function placesInfo(place) {
  searchResult.innerHTML += `
  <table class="table table-bordered">
    <tbody id="searchResult">
    <td>${place.name}</td>
    <td>${place.formatted_address}}</td>
    <td><img src="${place.icon}"></td>
    </tbody>
  </table>
  `;
}
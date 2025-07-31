const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0); //Se utiliza el id de la tabla, para indentificar esta tabla en particular, sin importar cuantas tablas se tengan en el html


let cont = 0;

//Validacion de cantidad
function validarCantidad() {
  if (txtNumber.value.length == 0) {
    return false;
  } //Tenga informacion

  if (isNaN(txtNumber.value)) {
    return false;
  } //Tiene que ser un numero

  if (Number(txtNumber.value) <= 0) {
    //lo que esta en el if es un constructor para cambiar de string a number
    return false;
  } //Mayor que  0
  return true;
} //validarCantidad

//Obtener precio
function getPrecio() {
  return Math.round(Math.random() * 10000) / 100;
} //getPrecio

btnAgregar.addEventListener("click", function (event) {
  event.preventDefault();
  let isValid = true; //bandera
  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";
  txtName.style.border = "";
  txtNumber.style.border = "";

  /**Name (productos)
   * validar que tenga informacion minimo tres letras
   *
   * *Number (cantidad)
   * Validar que contenga informacion y sea un numero
   * Validar que sea un numero mayor a 0
   */

  if (txtName.value.length < 3) {
    //Mensaje de error
    txtName.style.border = "medium red solid";
    alertValidacionesTexto.innerHTML =
      "<strong> El nombre del producto no es correcto</strong> <br/>"; //modificamos el texto del display que se encuentra en <p>
    alertValidaciones.style.display = "block"; //mandamos a llamar el display
    isValid = false;
  }

  if (!validarCantidad()) {
    //si esto es falso
    txtNumber.style.border = "medium red solid";
    alertValidacionesTexto.innerHTML +=
      "<strong> La cantidad no es no es correcto</strong>"; //+= significa que lo que ya se tenia se conserva y agrea el otro mensaje
    alertValidaciones.style.display = "block"; //mandamos a llamar el display
    isValid = false;
  } //validar cantidad

  //Agregando los elementos a la tabla
  if(isValid){
    cont++;
    let precio = getPrecio();
    let row = `<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
            
            </tr>`;

    cuerpoTabla.insertAdjacentHTML("beforeend", row);
    txtName.value = ""; //para limpiar los campos, despues de que se agrego la informacion a la tabla
    txtNumber.value = "";
    txtName.focus(); //manda el cursor al campo de nombre, para evitar el click en el campo
  }


}); //btnAgregar "click"

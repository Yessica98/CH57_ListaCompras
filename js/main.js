const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById(
  "alertValidacionesTexto"
);
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0); //Se utiliza el id de la tabla, para indentificar esta tabla en particular, sin importar cuantas tablas se tengan en el html

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

let cont = 0;
let totalProductos = 0;
let costoTotal = 0;

let datos = new Array(); //Datos de la tabla

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

//BOTON DE AGREGAR
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
  if (isValid) {
    cont++;
    let precio = getPrecio();
    let row = `<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
            
            </tr>`;

    //Objeto con los datos de la tabla
    let elementoArreglo = {
      cont: cont,
      nombre: txtName.value,
      cantidad: txtNumber.value,
      precio: precio,
    };

    //datos, es el nombre del arreglo
    datos.push(elementoArreglo);
    localStorage.setItem("datos", JSON.stringify(datos));

    cuerpoTabla.insertAdjacentHTML("beforeend", row);

    contadorProductos.innerText = cont;
    totalProductos += Number(txtNumber.value);
    productosTotal.innerText = totalProductos;
    costoTotal += precio * Number(txtNumber.value);
    //precioTotal.innerText = "$ " + costoTotal.toFixed(2), el toFixed, solo deja dos decimales, de acuerdo a lo que se encuentra en el parentesis
    precioTotal.innerText = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(costoTotal);

    //Objeto con json
    let resumen = {
      cont: cont,
      totalProductos: totalProductos,
      costoTotal: costoTotal,
    };
    //JSON.stringify, convierte el objeto (resumen) en candena de texto (string)
    //localStorage, almacena cadenas de texto
    localStorage.setItem("resumen", JSON.stringify(resumen));

    txtName.value = ""; //para limpiar los campos, despues de que se agrego la informacion a la tabla
    txtNumber.value = "";
    txtName.focus(); //manda el cursor al campo de nombre, para evitar el click en el campo
  }
}); //btnAgregar "click"

//WINDOW LOAD
window.addEventListener("load", function (event) {
  event.preventDefault();

  //A qui muestra la informacion de la tabla
  if (this.localStorage.getItem("datos") != null) {
    datos = JSON.parse(this.localStorage.getItem("datos"));
    datos.forEach((dato) => {
      let row = `<tr>
                    <td>${dato.cont}</td>
                    <td>${dato.nombre}</td>
                    <td>${dato.cantidad}</td>
                    <td>${dato.precio}</td>
            
            </tr>`;
      cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });
  }

  //Aqui muestra la informacion de resumen
  if (this.localStorage.getItem("resumen") != null) {
    let resumen = JSON.parse(this.localStorage.getItem("resumen"));
    costoTotal = resumen.costoTotal;
    totalProductos = resumen.totalProductos;
    cont = resumen.cont;
  }

  //A qui agrega datos, aun que no se tenga informacion, ya que las variables fueron inicializadas con 0, y muestra cero
  contadorProductos.innerText = cont;
  productosTotal.innerText = totalProductos;
  precioTotal.innerText = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(costoTotal);
}); //window load

/**
 * Limpiar todo
 * 1. Eliminar el localStorage
 * 2. Limpiar la tabla
 * 3. Limpiar los campos
 * 4.
 */

//BOTON DE LIMPIAR TODO
btnClear.addEventListener("click", function (event) {
  event.preventDefault();

  //1. Eliminar el localStorage
  localStorage.removeItem("datos");
  localStorage.removeItem("resume");

  //2. Limpiar la tabla
  cuerpoTabla.innerHTML = "";

  //3. Limpiar los campos
  txtName.value = ""; //para limpiar los campos, despues de que se agrego la informacion a la tabla
  txtNumber.value = "";
  txtName.focus(); //manda el cursor al campo de nombre, para evitar el click en el campo

  //4. Limpiar el borde los campos
  txtName.style.border = "";
  txtNumber.style.border = "";

  //5. Limpiar los alerts
  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";

  //6. Limpiar el resumen
  cont = 0;
  totalProductos = 0;
  costoTotal = 0;
  contadorProductos.innerText = cont;
  productosTotal.innerText = totalProductos;
  precioTotal.innerText = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(costoTotal);
  datos = new Array();


}); //btnLimpiarTodo

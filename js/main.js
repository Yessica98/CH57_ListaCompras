const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

//Validacion de cantidad
function validarCantidad (){
    if (txtNumber.value.length == 0){
        return false;
    } //Tenga informacion

    if (isNaN(txtNumber.value)){
        return false;
    } //Tiene que ser un numero

    if(Number(txtNumber.value) <= 0){ //lo que esta en el if es un constructor para cambiar de string a number
        return false;
    } //Mayor que  0 

return true;

} //validarCantidad

//Obtener precio
function getPrecio(){
    return Math.round(Math.random()*10000)/100;
}//getPrecio

btnAgregar.addEventListener("click", function(event){
event.preventDefault();
alertValidacionesTexto.innerHTML="";
alertValidaciones.style.display="none";
txtName.style.border = "";
txtNumber.style.border ="";

/**Name (productos)
 * validar que tenga informacion minimo tres letras
 * 
 * *Number (cantidad)
 * Validar que contenga informacion y sea un numero
 * Validar que sea un numero mayor a 0
 */

if (txtName.value.length <3 ){
    //Mensaje de error
    txtName.style.border = "medium red solid";
    alertValidacionesTexto.innerHTML = "<strong> El nombre del producto no es correcto</strong> <br/>"; //modificamos el texto del display que se encuentra en <p>
    alertValidaciones.style.display = "block"; //mandamos a llamar el display 
}

if (! validarCantidad()){ //si esto es falso
    txtNumber.style.border = "medium red solid";
    alertValidacionesTexto.innerHTML += "<strong> La cantidad no es no es correcto</strong>"; //+= significa que lo que ya se tenia se conserva y agrea el otro mensaje
    alertValidaciones.style.display = "block"; //mandamos a llamar el display 
} //validar cantidad 

}); //btnAgregar "click"



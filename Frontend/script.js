import FabricanteResource from "./boundary/FabricanteResource.js";
let data = new Object();

data.nombre = document.getElementById("txtIdFabricantes").value;
data.descripcion = document.getElementById("txtDescripcion").value;
data.correo = document.getElementById("txtCorreo").value;
data.telefono = document.getElementById("txtTelefono").value;
data.direccion = document.getElementById("txtDireccion").value;
let fr = new FabricanteResource();
document.getElementById('btnSend').addEventListener('click', (e)=>{
    console.log(JSON.stringify(data));
    fr.edit(data);
});
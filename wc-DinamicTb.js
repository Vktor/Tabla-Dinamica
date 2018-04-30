class dinamicTable extends HTMLElement {
    constructor(){
        super();
        this._from ="null";
    } //cierre de constructor

    connectedCallback(){
        let shadow = this.attachShadow({mode: 'open'}); //raiz del shadowDom
        let algo = this.path(`http://localhost:8080/MantenimientoTPI-web/webresources/${this.getAttribute('from')}`);
        //let algo = this.path(`https://jsonplaceholder.typicode.com/${this.getAttribute('from')}`);
        shadow.innerHTML += '<style>@import "tabla.css";</style>'; //se importan los estilos para la tabla
        algo.then(data =>  {
             let cont = this.crearTabla(data);
             shadow.appendChild(cont); //se guarda la tabla en el shadowdom
        })
        .catch(e =>console.log(e));
    } //cierre de callback

    crearTabla(losDatos){ 
        let contenedor = document.createElement('div'); //contenedor de la tabla
        contenedor.className ='tbContainer';
        let tabla = document.createElement('table');
        tabla.className ='tbTable'; 
        let tr = tabla.insertRow(-1); //Cabecera de la tabla
        tr.className ='tbfila-cabecera'
        let headerTb = [];

        var ids = [];
        var pivote;
        var count=0;

        for(let i = 0; i <losDatos.length; i++){
            for(let cabecera in losDatos[i]){
                if(headerTb.indexOf(cabecera)===-1){
                    headerTb.push(cabecera);

                    if(cabecera.indexOf("Collec") > -1){
                        pivote=cabecera
                        //  console.log(key);
                    }
                    if(cabecera.indexOf("id") > -1){
                        ids[count]= cabecera;
                        count++;
                    }
                 } //cierre if
            } //cierre for
        } //cierre for

        // we delete all the column Collection from the JSON
        let borrar=headerTb.indexOf(pivote);
        // console.log(borrar);
        headerTb.splice(borrar,1);

        //we sort the json and we put first the entity's id in the columns
        var count2=0;
        for(var i=0;i<headerTb.length;i++){
            for(var j=0; j < ids.length;j++){
                if(headerTb[i] == ids[j]){
                    var trade = headerTb[count2]; //primera posicion del arreglo
                    headerTb[count2] = ids [j]; //pasando el id al principio
                    ids[j] = trade;
                    headerTb[i] = trade;
                    count2++;
                }
            }
        }
        // console.log(headerTb);


        for (let i = 0; i < headerTb.length; i++) {
            let th = document.createElement("th");      // CABECERA DE LA TABLA 
            th.className = 'tbcelda-cabecera'
            th.innerHTML = headerTb[i];
            tr.appendChild(th);
            tabla.appendChild(tr);
        }
        for(let i=0; i<losDatos.length; i++){

                tr = tabla.insertRow(-1)  //FILA
                tr.className = 'tbfila'
            for(let j=0; j<headerTb.length; j++){
              let celda = tr.insertCell(-1); //CELDAS   
              celda.className = 'tbcelda'
               celda.innerHTML = losDatos[i][headerTb[j]]
           }
       }


        contenedor.appendChild(tabla); //devuelve toda la tabla
        return contenedor;
    } // cierre crear datos 


    path(URI){
        return fetch(URI) //se realiza la petición 
            .then(r => r.json());
    } //cierre de path
    

} //Cierre de clase

window.customElements.define('wc-dinamictb', dinamicTable);

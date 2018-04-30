class dinamicTable extends HTMLElement {
    constructor(){
        super();
        
    } //cierre de constructor
    
    connectedCallback(){
        let shadow = this.attachShadow({mode: 'open'}); //raiz del shadowDom
        let algo = this.path('https://jsonplaceholder.typicode.com/users');
        shadow.innerHTML += '<style>@import "tabla.css";</style>';
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
        for(let i = 0; i <losDatos.length; i++){
            for(let cabecera in losDatos[i]){
                if(headerTb.indexOf(cabecera)===-1){
                    headerTb.push(cabecera);
                 } //cierre if
            } //cierre for
        } //cierre for
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
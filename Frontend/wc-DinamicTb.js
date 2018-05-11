class dinamicTable extends HTMLElement {
    constructor(){
        super();
        this._from ="null";
        this.currentPage = 1;
        this.pages = 0;
        this.inited = false;
    } //cierre de constructor

    connectedCallback(){
        let shadow = this.attachShadow({mode: 'open'}); //raiz del shadowDom
      //  let prom = this.path(`https://jsonplaceholder.typicode.com/${this.getAttribute('from')}`);
        let prom = this.pathGET(`http://172.25.0.29:8181/MantenimientoTPI-web/webresources/${this.getAttribute('from')}`);

        //let put = this.pathPUT(`https://jsonplaceholder.typicode.com/posts/${idModificado}`)
        //let put = this.pathPUT(`http://172.25.0.29:8181/MantenimientoTPI-web/webresources/${this.getAttribute('from')}`);
        shadow.innerHTML += '<style>@import "tabla.css";</style>'; //se importan los estilos para la tabla
        prom.then(data =>  {
             let cont = this.crearTabla(data);
             this.init(data);
             shadow.appendChild(cont); //se guarda la tabla en el shadowdom
             shadow.appendChild(this.botonGuardar(cont)); //Se agrega el boton de agregar fila
        })
        .catch(e =>console.log(e));


    } //cierre de callback

    crearTabla(losDatos){ 
        let contenedor = document.createElement('div'); //contenedor de la tabla
        contenedor.className ='tbContainer';
        let tabla = document.createElement('table');
        tabla.className ='tbTable';
        tabla.id = 'tablepaging';
        let tr = tabla.insertRow(-1); //Cabecera de la tabla
        tr.className ='tbfila-cabecera';
        let tbody = document.createElement('tbody');
        tbody.className = 'tbBody';
        tbody.contentEditable="true";
        let headerTb = [];
        let ids = [];
        let pivote;
        let count=0;
        for(let i = 0; i <losDatos.length; i++){
            for(let cabecera in losDatos[i]){
                if(headerTb.indexOf(cabecera)===-1){
                    headerTb.push(cabecera);

                    if(cabecera.indexOf("List") > -1){
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
                tr.id =`f${i}`;
                tbody.appendChild(tr)
            for(let j=0; j<headerTb.length; j++){
              let celda = tr.insertCell(-1); //CELDAS   
              celda.className = 'tbcelda';
              celda.id =`f${i}c${j}`;
               celda.innerHTML = losDatos[i][headerTb[j]]
           }
       }

        tabla.appendChild(tbody);
        contenedor.appendChild(tabla); //devuelve toda la tabla
        return contenedor;


    } // cierre crear datos 
    

    
    botonGuardar(solotabla){
        //creacion del Boton en el Shadow DOM
        let btnConte = document.createElement("div");
        btnConte.className ='btnConte';
        let btnGuardar = document.createElement("button");
        btnGuardar.className ='btnAgregar';
        btnGuardar.innerText ='Guardar Cambios';
        //viarable para la peticion put

        //Obteniendo la fila del campo editado
        solotabla.addEventListener('click',(e)=>{
            e = e|| window.event;
            let target = e.target || e.srcElement,
                text = target.textContent, //Contenido de la celda clickeada
                elid = target.id; //id de la celda clickeada
                console.log(text+" el id es:"+elid);
        })

        btnGuardar.addEventListener('click',()=>{
            
        })

        return btnConte.appendChild(btnGuardar);
    }


    pathGET(URI){
        return fetch(URI) //se realiza la petición 
            .then(r => r.json());
    } //cierre de path

    pathPUT(URI){
        return fetch(URI,{
            method: 'PUT',
            body: datos
        })
        .then(r=>r.json());
            
    }

    init(data, itemsPerPage = 5){

        let rows = data.length;
        console.log(`rows ${rows}`);
        var records = (rows - 1);

        this.pages = Math.ceil(records / itemsPerPage);

        this.inited = true;

    }

    Pager(tableName, itemsPerPage) {

        this.tableName = tableName;

        this.itemsPerPage = itemsPerPage;

        this.currentPage = 1;

        this.pages = 0;

        this.inited = false;

        this.showRecords = function(from, to) {

            var rows = document.getElementById(tableName).rows;

// i starts from 1 to skip table header row

            for (var i = 1; i < rows.length; i++) {

                if (i < from || i > to)

                    rows[i].style.display = 'none';

                else

                    rows[i].style.display = '';

            }

        }
/*
        this.showPage = function(pageNumber) {

            if (! this.inited) {

                alert("not inited");

                return;

            }

            var oldPageAnchor = document.getElementById('pg'+this.currentPage);

            oldPageAnchor.className = 'pg-normal';

            this.currentPage = pageNumber;

            var newPageAnchor = document.getElementById('pg'+this.currentPage);

            newPageAnchor.className = 'pg-selected';

            var from = (pageNumber - 1) * itemsPerPage + 1;

            var to = from + itemsPerPage - 1;

            this.showRecords(from, to);

        }

        this.prev = function() {

            if (this.currentPage > 1)

                this.showPage(this.currentPage - 1);

        }

        this.next = function() {

            if (this.currentPage < this.pages) {

                this.showPage(this.currentPage + 1);

            }

        }

        this.init = function() {

            var rows = document.getElementById(tableName).rows;

            var records = (rows.length - 1);

            this.pages = Math.ceil(records / itemsPerPage);

            this.inited = true;

        }

        this.showPageNav = function(pagerName, positionId) {

            if (! this.inited) {

                alert("not inited");

                return;

            }

            var element = document.getElementById(positionId);

            var pagerHtml = '<span onclick="' + pagerName + '.prev();" class="pg-normal"> << Prev </span> ';

            for (var page = 1; page <= this.pages; page++)

                pagerHtml += '<span id="pg' + page + '" class="pg-normal" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '</span> ';

            pagerHtml += '<span onclick="'+pagerName+'.next();" class="pg-normal"> Next >></span>';

            element.innerHTML = pagerHtml;

        }
*/
    }


} //Cierre de clase

window.customElements.define('wc-dinamictb', dinamicTable);

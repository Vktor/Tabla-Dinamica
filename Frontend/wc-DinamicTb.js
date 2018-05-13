class dinamicTable extends HTMLElement {
    constructor(){
        super();
        this._from ="null";
        this._busquedas = null;
        this._metodo = null;
    } //cierre de constructor

    connectedCallback(){
        const sd = this.attachShadow({ mode: 'open' });
        let style = `<style>
        * {
          font-family: "Gill Sans", sans-serif;
        }
        .tbContainer{ /* Estilos del div contenedor de la tabla */
            width: 100%;
            overflow-x: auto;
            max-height: 30em;
            /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
        }

        .tbTable{
            border-radius: 15px;
            /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
            min-width: 100%;
            max-height: 50%;
            white-space: nowrap;
            border-collapse: collapse;
            border-spacing: 0;
            -webkit-overflow-scrolling: touch;
            background-size: 10px 100%, 10px 100%;
            background-attachment: scroll, scroll;
            background-repeat: no-repeat;
            border: 1px solid rgba(84, 83, 83, 0.371);
            border-style: outset;
        }

               
        .tbfila-cabecera{
            background-color: #1A1F25;
            font-size: 1.1em;
            color: white;
            font-family: 'Roboto', sans-serif;
            text-align: left;
             }
        
        .tbcelda-cabecera{
            padding: 0.5em;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            text-transform: uppercase;
           
        }
        
        .tbfila:nth-child(odd){
            background-color:#EBEBEB;
        
        }
            
        .tbfila:nth-child(even) {
            background-color: #FFFFFF;
            
        }
        .tbfila:hover{
            background-color: rgb(104, 102, 102);
            color: white;
            cursor: pointer;
        }
        
        .tbcelda{
            padding: 0.5em;
            font-family: 'Nunito', sans-serif;
        }
        
        .btnAgregar{
            margin-top: 20px;
           
            height: 30px;
            font-size: 1em
        }
        
        @media only screen and (max-width: 600px) {
            .tbContainer {
                background-color:pink;
                width: 100%;
            }
            .tbTable{
                margin: 0 auto;
                width: 90%;
            }
        
        }
        #paginacionBar {
          text-align: center;
          margin-top: 20px;
        }

        #paginacionBar * {
          margin: 3px;
        }

        button {    
          background-color: #1A1F25;
          border-style: outset;
          border-width: 2px;
          border-color: #331832;
          border-radius: 5px;
          font-weight: bold;
          padding: 7px;
          color: whitesmoke;
        }

        button:hover {
          background-color: rgb(104, 102, 102);
        }
        </style>
        <div>
            <slot entidad = 'entidad'></slot>
        </div>`

        sd.innerHTML = style;
/*
        const contenedor = document.createElement('div');
        contenedor.id = 'tablaContenedor';
        contenedor.className ='tbContainer';

        let tabla = document.createElement('table');
        //tabla.id = 'tablaEntidad';
        tabla.id ='tbTable';

        let tbody = document.createElement('tbody');
        tbody.className = 'tbBody';
        tbody.contentEditable="true";
        let headerTb = [];
        let ids = [];

        let cabecera = document.createElement('th');
        cabecera.id = 'cabeceraEntidad';

        let celda = document.createElement('td');
        celda.id = 'celdaEntidad';
*/
        //Recibe un json con la busqueda deseada
        let crearTablaEntidad = function (busquedas, paginacion) {
            let maxPage = Math.ceil(busquedas.length / paginacion);
            let actualPageNumber = 1;

            var renderPagination = function () {
                sd.innerHTML = style;

                let changePage = function (option) {
                    if (this.innerText == '<<') {
                        actualPageNumber = 1;
                        this.disabled = true;
                    } else if (this.innerText == '<') {
                        if (actualPageNumber != 1) {
                            actualPageNumber--;
                        }
                    } else if (this.innerText == '>') {
                        if (actualPageNumber != maxPage) {
                            actualPageNumber++;
                        }
                    } else {
                        actualPageNumber = maxPage;
                        this.disabled = true;
                    }

                    renderPagination();
                }

                let contenedor = document.createElement('div');
                contenedor.className ='tbContainer';

                let tabla = document.createElement('table');
                //tabla.id ='tbTable';
                tabla.className ='tbTable';

                let tbody = document.createElement('tbody');
                tbody.className = 'tbBody';
                tbody.contentEditable="true";
                let headerTb = [];
                let ids = [];

                let cabecera = document.createElement('th');
                cabecera.id = 'cabeceraEntidad'

                let celda = document.createElement('td');
                celda.id = 'celdaEntidad';

                let columna = [];

                for (var i = 0; i < busquedas.length; i++) {
                    for (var key in busquedas[i]) {
                        if (columna.indexOf(key) === -1) {
                            columna.push(key);
                        }
                    }
                }

                var tr = tabla.insertRow(-1);
                tr.className ='tbfila-cabecera';

                for (var i = 0; i < columna.length; i++) {
                    var th = document.createElement('th');
                    th.className = 'tbcelda-cabecera'
                    th.innerHTML = columna[i];
                    tr.appendChild(th);
                    tabla.appendChild(tr);
                }

                let maxIndex = actualPageNumber == maxPage ? busquedas.length : paginacion * actualPageNumber;

                for (var i = paginacion * actualPageNumber - paginacion; i < maxIndex; i++) {
                    tr = tabla.insertRow(-1);
                    tr.className = 'tbfila';
                    tbody.appendChild(tr);
                    for (var j = 0; j < columna.length; j++) {
                        var newCelda = tr.insertCell(-1);
                        celda.className = 'tbcelda';
                        newCelda.innerHTML = busquedas[i][columna[j]];
                        tr.onclick = function(){

                            console.log(this.innerText);
                        };
                    }
                }

                tabla.appendChild(tbody);
                contenedor.appendChild(tabla);
                let paginacionBar = document.createElement("div");
                let tableTitleBar = document.createElement("div");
                paginacionBar.id = "paginacionBar";
                tableTitleBar.id = "tableTitleBar";

                let tableTitle = document.createElement("h1");
                //tableTitle.innerText = this.getAttribute("busqueda");
                tableTitleBar.appendChild(tableTitle);

                let buttonFirst = document.createElement("button");
                let buttonPrevious = document.createElement("button");
                let buttonNext = document.createElement("button");
                let buttonLast = document.createElement("button");
                let span = document.createElement("span");
                buttonFirst.innerText = "<<";
                buttonFirst.onclick = changePage;
                buttonPrevious.innerText = "<";
                buttonPrevious.onclick = changePage;
                buttonNext.innerText = ">"
                buttonNext.onclick = changePage;
                buttonLast.innerText = ">>";
                buttonLast.onclick = changePage;
                span.innerText = "Pág " + actualPageNumber + " de " + maxPage;
                paginacionBar.appendChild(buttonFirst);
                paginacionBar.appendChild(buttonPrevious);
                paginacionBar.appendChild(span);
                paginacionBar.appendChild(buttonNext);
                paginacionBar.appendChild(buttonLast);

                sd.appendChild(tableTitleBar);
                sd.appendChild(contenedor);
                sd.appendChild(paginacionBar);
            }

            renderPagination();
        }

        let accion = function (entidad, paginacion = 5) {// AA
            fetch(`http://localhost:8080/MantenimientoTPI-web/webresources/${entidad}`).then(function (respuesta) {
                // Convertir a JSON
                return respuesta.json();
            }).then(function (j) {
                // Ahora 'j' es un objeto JSON
                crearTablaEntidad(j, paginacion);
            });
        }
        accion(this.getAttribute("from"), this.getAttribute("paginacion"));
    }

} //Cierre de clase

window.customElements.define('wc-dinamictb', dinamicTable);

import AbstractResource from "./boundary/AbstractResource.js";
class dinamicTable extends HTMLElement {
    constructor(){
        super();
        this._search = null;
        this._method = null;
        this._datos;
    } //cierre de constructor


    connectedCallback(){
        let fabricante = new AbstractResource();
        let data = fabricante.findAll(this.getAttribute('entidad'));
        const shadow = this.attachShadow({ mode: 'open' });
        let style = `<style>@import "tabla.css";</style>
        <div>
            <slot entidad = 'entidad'></slot>
        </div>`;

        shadow.innerHTML=style;

        //Recibe un json con la busqueda deseada
        let crearTabla = function (search, paginacion=5) {
            let maxPage = Math.ceil(search.length / paginacion);
            let actualPageNumber = 1;

            var renderPagination = function () {
                shadow.innerHTML = style;

                let changePage = function (option) {
                    if (this.innerText == 'Start') {
                        actualPageNumber = 1;
                        this.disabled = true;
                    } else if (this.innerText == 'Previous') {
                        if (actualPageNumber != 1) {
                            actualPageNumber--;
                        }
                    } else if (this.innerText == 'Next') {
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

                for (var i = 0; i < search.length; i++) {
                    for (var key in search[i]) {
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

                let maxIndex = actualPageNumber == maxPage ? search.length : paginacion * actualPageNumber;

                for (var i = paginacion * actualPageNumber - paginacion; i < maxIndex; i++) {
                    tr = tabla.insertRow(-1);
                    tr.className = 'tbfila';
                    tbody.appendChild(tr);
                    for (var j = 0; j < columna.length; j++) {
                        var newCelda = tr.insertCell(-1);
                        celda.className = 'tbcelda';
                        newCelda.innerHTML = search[i][columna[j]];
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
                buttonFirst.innerText = "Start";
                buttonFirst.onclick = changePage;
                buttonPrevious.innerText = "Previous";
                buttonPrevious.onclick = changePage;
                buttonNext.innerText = "Next"
                buttonNext.onclick = changePage;
                buttonLast.innerText = "Last";
                buttonLast.onclick = changePage;
                span.innerText = "Pág " + actualPageNumber + " de " + maxPage;
                paginacionBar.appendChild(buttonFirst);
                paginacionBar.appendChild(buttonPrevious);
                paginacionBar.appendChild(span);
                paginacionBar.appendChild(buttonNext);
                paginacionBar.appendChild(buttonLast);

                shadow.appendChild(tableTitleBar);
                shadow.appendChild(contenedor);
                shadow.appendChild(paginacionBar);
            }

            renderPagination();
        }
        
        if (fabricante.findAll() !== undefined) {
            crearTablaEntidad(data, 5);
        } else{
            let advertencia = document.createElement("h1");
            advertencia.innerText = "no funciona :v undefined";
            shadow.appendChild(advertencia);
        }
        

        /**let conection = function (entidad, paginacion = 5) {
            fetch(entidad).then(function (request) {
                // Convertir a JSON
                return request.json();
            }).then(function (data) {
                // data es un objeto JSON
                crearTablaEntidad(data, paginacion);
            });
        }
        conection(this.getAttribute("from"), this.getAttribute("paginacion"));
        **/
    }

} //Cierre de clase

window.customElements.define('wc-dinamictb', dinamicTable);

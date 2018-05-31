export default class AbstractResource {
    constructor() {
        this.baseURL = `http://localhost:8080/MantenimientoTPI-web/webresources/`;
    }

/*

    Entity() {
        return this.entity;
    }
*/
    findAll(entity){
        var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open('GET',this.baseURL+entity,false);
        Httpreq.send(null);
        let data = JSON.parse(Httpreq.responseText);
        console.log(data);
        return data;
    }

    edit(){
        if(metodo == 'POST' || metodo == 'PUT'){

            Httpreq.open(metodo,this.baseURL+entity,true);
            Httpreq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            let data = JSON.parse(Httpreq.responseText);
            console.log(data);
        }
    }
/*
    findAll(entity, metodo){
            let myHeaders = new Headers();
            let options = {
                method: metodo,
                mode: 'cors'
            };
            fetch(this.baseURL+entity, options).then(
                response => response.json()).then(result => {
                        console.log(result);
                        return result;
                    });
    }

    findAll(entity, datos) {
        fetch(this.baseURL+entity).then(
            response => {
                response.json().then((data) => {
                    if (data != null) {
                        console.log(data);
                        datos = data;
                    }else {
                        console.log('Es un json vacio');
                    }
                })
            });
       // return this.datos.length;
    }

*/
    findByRange(first, pagesize) {

        let url = this.baseURL + "?pagesize=" + pagesize + "&first=" + first;

        fetch(url).then(function (respuesta) {

            return respuesta.json();


        });

    }
}

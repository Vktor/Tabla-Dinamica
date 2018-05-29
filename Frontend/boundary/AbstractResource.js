export default class AbstractResource {
    constructor(entity) {
        this.baseURL = `http://localhost:8080/MantenimientoTPI-web/webresources/${entity}`;
    }


    Entity() {
        return this.entity;
    }

    findAll() {
        let fabricante;
        fetch(this.baseURL).then(
            response => {
                response.json().then((data) => {
                    fabricante = data;
                    console.log(fabricante);
                    
                })
            });
        return fabricante;
    }

    findByRange(first, pagesize) {

        let url = this.baseURL + "?pagesize=" + pagesize + "&first=" + first;

        fetch(url).then(function (respuesta) {

            return respuesta.json();


        });

    }


}

export default class AbstractResource {
    constructor() {
        this.baseURL = `http://localhost:8080/MantenimientoTPI-web/webresources/`;
    }

    findAll(entity) {
        let Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open('GET', `${this.baseURL}/${entity}`, false);
        Httpreq.send(null);
        let data = JSON.parse(Httpreq.responseText);
        console.log(data);
        return data;
    }

    edit(metod, data) {
        if (metodo == 'POST' || metodo == 'PUT') {
            let Httpreq = new XMLHttpRequest();
            Httpreq.open(metodo, `${this.baseURL}/${entity}`, true);
            Httpreq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            Httpreq.send(JSON.stringify(data));
            console.log(data);
        }
    }

    findByNameLike(entity, name) {
        if (name != null) {
            let url = `${this.baseURL}/${entity}/${name}`;
            let Httpreq = new XMLHttpRequest(); // a new request
            Httpreq.open('GET', this.baseURL + entity, false);
            Httpreq.send(null);
            let data = JSON.parse(Httpreq.responseText);
            console.log(data);
            return data;
        } else {
            throw new Error("El nombre es nulo");
        }
    }

    findByRange(first, pagesize) {

        let url = `${this.baseURL}/${entity}/?pagesize=${pagesize}&first=${first}`;

        let Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open('GET', url, false);
        Httpreq.send(null);
        let data = JSON.parse(Httpreq.responseText);
        console.log(data);
        return data;

    }
}

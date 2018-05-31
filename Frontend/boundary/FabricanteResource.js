import AbstractResource from "./AbstractResource.js";

export default class FabricanteResource extends AbstractResource {

    constructor() {
        
        super('fabricantes')
    }

     findByNameLike(name) {
        if (name != null) {
            let url = this.baseURL + "/" + name + "/";
            fetch(url).
                then(response => {
                    if (response.ok) {
                        console.log(response.json());
                        return response.json();
                    } else {
                        throw new Error("Not OK");
                    }

                });
        } else {
            throw new Error("El nombre es nulo");
        }
    }

}
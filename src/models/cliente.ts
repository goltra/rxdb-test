export class Cliente{
    _id: string;
    type: string="cliente";
    nombre: string="";
    telefono: string="";
    direccion: string="";
    localidad: string="";
    provincia: string="";
    email: string="";
    personacontacto: string="";
    _rev: string;

     /**Funcion estatica que inicializa un objecto de tipo parte en base a los
     * valores de un objeto pasado.
     */
    static inicializa(values:Object) {
        // console.log("parte.inicializa");
        // console.log(values);
        try {
            let cliente = new Cliente();
            // console.log("parte inicializado a null")
            for(let p in values){
                if(Object.getOwnPropertyDescriptor(values, p)!=undefined ){
                   cliente[p] = values[p];
                }
            }
            // console.log("parte despues del for")
            // console.log(parte);
            return cliente;
        } catch (error) {
            alert ("Cliente.inicializa " + error);
        }
    }

}

export default{
    presupuestos: {
        ingresos: {
            tipo: [
                {name: "sdfasda"},
                {name: "saodksaod"}
            ],
            valor: [
                {name: 4545},
                {name: 345435}
            ],
        },
        egresos: {
            tipo: [
                {name: "sdfasda"},
                {name: "saodksaod"}
            ],
            valor: [
                {name: 4545},
                {name: 345435}
            ],
        }
    },
    
    show(){
        const ws = new Worker("storage/wsMyHeader.js", {type:"module"});
        this.presupuestos.ingresos.valor.forEach((val, id)=>{
            console.log(val.name);
        });
        console.log(ws);
        
    }

}




let wsMyComponent = {    
    imprimirDatos(p1) {
            return `
            <h5 class="py-3">Presupuesto disponible</h5> 
            <h1 class="pb-3">$ ${p1.contador}</h1>
                <div class="ing col-12 p-3 w-25 justify-content-between mb-2 d-flex justify-content-center">
                    <p class="px-3">INGRESOS</p>
                    <p>$${p1.ingresos.contador}</p>
                </div>  
                <div class="ing2 col-12 w-25 p-3 d-flex  justify-content-between justify-content-center">
                <p class="px-3">EGRESOS</p>
                <div class="d-flex">
                <p class="px-2">$${p1.egresos.contador} </p>
                <p class="porce px-2"> ${p1.egresos.porcentaje}%</p>
                </div>
                </div>`        
      },
      imprimirIngresos(p1){ 
        return `<div class="ingresos col-12 col-md-6 w-25 p-5">
        <h2 class="px-1">INGRESOS</h2>  
        <div class="datoIngreso d-flex  justify-content-between">
        <table class="table ">
        <tbody>
        ${p1.ingresos.datos.map((val, id)=> {return `<tr class="trimportant text-end d-flex align-items-center justify-content-between"><td class="text-center">${val.tipo} </td> <td>${val.valor}</td>${p1.ingresos.info.map((val,id2)=>{return `<td>${val.porcentajes[id]}%</td>`})}<td class="tdimportant"><button id="btn${id}" class="btn3"> x </button></td></tr>`}).join("")}  
        </tbody>
        </table>   
        </div>     
    </div>
    <div class="egresos col-12 col-md-6 w-25 p-5">
        <h2 class="px-1">EGRESOS</h2>
        <div class="datoIngreso d-flex justify-content-between">
        <table class="table ">
        <tbody class="celda">
        ${p1.egresos.datos.map((val, id)=> {return `<tr class="trimportant text-end d-flex align-items-center justify-content-between"><td class="text-center">${val.tipo} </td> <td>${val.valor}</td>${p1.egresos.info.map((val,id2)=>{return `<td>${val.porcentajes[id]}%</td>`})}<td class="tdimportant"><button id="btn${id}" class="btn3"> x </button></td></tr>`}).join("")}
        </tbody>
        </table>
        </div>    
    </div>`
      },
    }
self.addEventListener("message", (e)=>{
    postMessage(wsMyComponent[`${e.data.module}`](e.data.data));
})
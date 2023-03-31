    
let wsMyComponent = {
    
    imprimirDatos(p1) {
            return `
            <h5 class="py-3">${p1.titulo}</h5> 
            <h1 class="pb-3">$ ${p1.contador}</h1>
                <div class="ing col-12 p-3 w-25 justify-content-between mb-2 d-flex justify-content-center">
                    <p class="">${p1.ingresos.titulo}</p>
                    <p>$${p1.ingresos.contador}</p>
                </div>  
                <div class="ing2 col-12 w-25 p-3 d-flex  justify-content-between justify-content-center">
                <p class="">${p1.egresos.titulo}</p>
                <p>$${p1.egresos.contador}</p>
                <p>${p1.egresos.porcentaje}%</p>
                </div>`        
            
      
      },

      imprimirIngresos(){
        return `<div class="ingresos col-12 col-md-6 w-25 p-5">
        <h2>INGRESOS</h2>
        
        <div class="datoIngreso p-3 d-flex  justify-content-between">
            <p>tipoDeIngreso</p>
            <p>+ $-----</p>
        </div>
        
    </div>
    <div class="egresos col-12 col-md-6 w-25 p-5">
        <h2>EGRESOS</h2>
       
        <div class="datoIngreso p-3 d-flex justify-content-between">
            <p>tipoDeEngreso</p>
            <p>- $-----</p>
            <p>---%</p>
        </div>
        
    </div>`
      }
}
self.addEventListener("message", (e)=>{
    postMessage(wsMyComponent[`${e.data.module}`](e.data.data));
})


/* let plantilla = p1.map((val, id) => {
    
    return `<div class="col-lg-6">
          <div class="row g-0 border rounded overflow-hidden flex-col flex-md-row  mb-4 shadow-sm bg-secondary  position-relative " id="cards">
            <div class="col p-4 d-flex  flex-column position-static">
              <strong class="d-inline-block mb-2 articles">${val.article}</strong>
              <h3 class="mb-0">${val.title}</h3>
              <div class="mb-1 ">${val.date}</div>
              <p class="card-text mb-auto">${val.paragraph}...</p>
              <a href="#" class="stretched-link continue">${val.btn.name}</a>
            </div>
            <div class="col-12 col-md-auto justify-content-center d-flex align-items-center ">
              <img src="${val.image}" class="imgresponsive " alt="" srcset="">
            </div>
          </div>
        </div>`
  })

  
  return plantilla.join(''); */

  
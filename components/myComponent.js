import config from "../storage/config.js";
let informacion = document.querySelector("#formulario");
let contadorIngresos = 0;
let contadorEgresos = 0; 
let disponible = 0;
let porcentajetotal = 0;

export default{
    
    
    show(){
      config.dataMyComponent();
      Object.assign(this, JSON.parse(localStorage.getItem("myComponent")));
      const ws = new Worker("storage/wsMyComponent.js", {type:"module"});
      let id = [];
      let count = 0;
      id.push("#superior");
      ws.postMessage({module: "imprimirDatos", data: this.contenido});
      id.push("#ingresos");
      ws.postMessage({module: "imprimirIngresos", data: this.contenido});
      ws.addEventListener("message", (e)=>{
          let doc = new DOMParser().parseFromString(e.data, "text/html");
          
          document.querySelector(id[count]).append(...doc.body.children);
          (id.length-1==count) ? ws.terminate() : count++;
      })
      informacion.addEventListener("submit", (e)=>{


        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
        console.log(data);
        if(data.signo == "+"){
            contadorIngresos = contadorIngresos + parseInt(data.valor);
            this.contenido.ingresos.datos.unshift(data);
            this.contenido.ingresos.contador = contadorIngresos;
             
        }else{
            contadorEgresos = contadorEgresos - parseInt(data.valor);
            this.contenido.egresos.datos.unshift(data);
            this.contenido.egresos.contador = contadorEgresos; 
            
        };
        disponible = contadorIngresos - (-contadorEgresos);
        this.contenido.contador = disponible;
        porcentajetotal = -(100*contadorEgresos)/contadorIngresos;
        this.contenido.egresos.porcentaje = parseInt(porcentajetotal);
        console.log(this.contenido);
        console.log(contadorEgresos);
        console.log(contadorIngresos);
        console.log(disponible);
        console.log(porcentajetotal);
        informacion.reset();
        
        const ws = new Worker("storage/wsMyComponent.js", {type:"module"});
        let id = [];
        let count = 0;
        id.push("#superior");
        ws.postMessage({module: "imprimirDatos", data: this.contenido});
        id.push("#ingresos");
        ws.postMessage({module: "imprimirIngresos", data: this.contenido});
        
        ws.addEventListener("message", (e)=>{
            let doc = new DOMParser().parseFromString(e.data, "text/html");
            document.querySelector(id[count]).append(...doc.body.children);
            (id.length-1==count) ? ws.terminate() : count++;
        })

        
        })
       
    },

    
    
}



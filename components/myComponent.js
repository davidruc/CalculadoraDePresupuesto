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
       
        if(data.signo == "+"){
            contadorIngresos = contadorIngresos + parseInt(data.valor);
            this.contenido.ingresos.datos.unshift(data);
            this.contenido.ingresos.contador = contadorIngresos;
             
        }else{
            contadorEgresos = contadorEgresos - parseInt(data.valor);
            /* this.contenido.egresos.datos.unshift(data.valor); */
            
            console.log(this.contenido.egresos.info);
            
            let calculoPorcentajes = "";
            this.contenido.egresos.info.map((val,id)=>{
                console.log(val);
                val.porcentajes = [];
                val.datos.unshift(data.valor)
                val.datos.map((val2,id)=>{
                    calculoPorcentajes = parseInt(-(parseInt(val2)*100)/contadorEgresos);
                    console.log(calculoPorcentajes);
                    val.porcentajes.push(calculoPorcentajes)
                })
             
                console.log(val.porcentajes);
                
            })
            console.log(calculoPorcentajes);
            
            /* this.contenido.egresos.info.foreach((val, id)=>{
                console.log("gonoreeaaaa");
                let porcentaje2 = -(100*val[id])/contadorEgresos;
                this.contenido.egresos.porcentajes.unshift(porcentaje2)
                console.log(porcentaje2);
            }) */
            this.contenido.egresos.datos.unshift(data);
            this.contenido.egresos.contador = contadorEgresos;         
        };
        
        disponible = contadorIngresos - (-contadorEgresos);
        this.contenido.contador = disponible;
        porcentajetotal = -(100*contadorEgresos)/contadorIngresos;
        this.contenido.egresos.porcentaje = parseInt(porcentajetotal);
        informacion.reset();
        
        const ws = new Worker("storage/wsMyComponent.js", {type:"module"});
        let id = [];
        let count = 0;
        id.push("#superior");
        ws.postMessage({module: "imprimirDatos", data: this.contenido});
        id.push("#ingresos");
        ws.postMessage({module: "imprimirIngresos", data: this.contenido});
        
        ws.addEventListener("message", (e)=>{
            
            document.querySelector(id[count]).innerHTML = e.data;
            (id.length-1==count) ? ws.terminate() : count++;
        })

        
        })
       
    },

    
    
}



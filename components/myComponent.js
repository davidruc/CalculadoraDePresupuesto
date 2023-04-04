import config from "../storage/config.js";
let informacion = document.querySelector("#formulario");

let contadorIngresos = 0;
let contadorEgresos = 0; 
let disponible = 0;
let porcentajetotal = 0;
let cuenta = 0;

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
            console.log(this.contenido.egresos.info);
            
            let calculoPorcentajes = "";
            
            this.contenido.egresos.info.map((val,id)=>{
                val.porcentajes = [];
                val.datos.unshift(data.valor)
                cuenta = 0;
                val.datos.map((val2,id)=>{
                    calculoPorcentajes = parseInt(-(parseInt(val2)*100)/contadorEgresos);
                    val.porcentajes.push(calculoPorcentajes);
                    cuenta++
                })
            })
            this.contenido.egresos.datos.unshift(data);
            this.contenido.egresos.contador = contadorEgresos;  
            
            
           
        };
        console.log("ultimo", this.contenido);
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
       
        console.log("aqui", this.contenido);
        ws.addEventListener("message", (e)=>{
            
            console.log(this.contenido);
            document.querySelector(id[count]).innerHTML = e.data;
            (id.length-1==count) ? ws.terminate() : count++;
        })
        console.log("donde no se sube",this.contenido);
        console.log("esta es mi cuenta",cuenta);

        for (let i = 0; i < cuenta; i++) {
            console.log("esta es mi cuenta",cuenta);
            console.log(i);
                console.log(`#btn${i}`);
                let botones = document.querySelector(`#btn${i}`);//estoy llamando del documento algo que no existe, ya que lo creo en el worker, debe haber alguna forma de enlazarlos, por eso es Null
                
                console.log(botones);
                botones.addEventListener("click", (e)=>{
                    console.log(`hey, le di click al ${i} `);
                    /* this.contenido.egresos.delete.datos[i]; */
                    console.log(this.contenido.egresos.datos);
                })
            }
        })
        
    },   
}



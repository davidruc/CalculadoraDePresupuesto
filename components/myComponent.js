import config from "../storage/config.js";
let informacion = document.querySelector("#formulario");

let contadorIngresos = 0;
let contadorEgresos = 0;
let disponible = 0;
let porcentajetotal = 0;
let cuenta = 0;

export default {
  show() {
    config.dataMyComponent();
    Object.assign(this, JSON.parse(localStorage.getItem("myComponent")));
    const ws = new Worker("storage/wsMyComponent.js", { type: "module" });
    let id = [];
    let count = 0;
    id.push("#superior");
    ws.postMessage({ module: "imprimirDatos", data: this.contenido });
    id.push("#ingresos");
    ws.postMessage({ module: "imprimirIngresos", data: this.contenido });
    ws.addEventListener("message", (e) => {
      let doc = new DOMParser().parseFromString(e.data, "text/html");

      document.querySelector(id[count]).append(...doc.body.children);
      id.length - 1 == count ? ws.terminate() : count++;
    });
    informacion.addEventListener("submit", (e) => {
      e.preventDefault();
     
    
      let data = Object.fromEntries(new FormData(e.target));

      if (data.signo == "+") {
        contadorIngresos =
          this.contenido.ingresos.contador + parseInt(data.valor);
        this.contenido.ingresos.datos.unshift(data);
        this.contenido.ingresos.contador = contadorIngresos;

        let calculoPorcentajes2 = 0;

        this.contenido.ingresos.info.map((val, id) => {
          val.porcentajes = [];
          val.datos.unshift(data.valor);
          val.nombres.unshift(data.tipo);
          val.datos.map((val2, id) => {
            calculoPorcentajes2 = parseInt(
              (parseInt(val2) * 100) / contadorIngresos
            );
            val.porcentajes.push(calculoPorcentajes2);
          });
        });
      } else {
        contadorEgresos =
          this.contenido.egresos.contador - parseInt(data.valor);
        this.contenido.egresos.datos.unshift(data);
        this.contenido.egresos.contador = contadorEgresos;

        let calculoPorcentajes = 0;

        this.contenido.egresos.info.map((val, id) => {
          val.porcentajes = [];
          val.datos.unshift(data.valor);
          val.nombres.unshift(data.tipo);
          val.datos.map((val2, id) => {
            calculoPorcentajes = parseInt(
              -(parseInt(val2) * 100) / contadorEgresos
            );
            val.porcentajes.push(calculoPorcentajes);
          });
        });
      }
      disponible =
        this.contenido.ingresos.contador - -this.contenido.egresos.contador;
      this.contenido.contador = disponible;
      porcentajetotal =
        -(100 * this.contenido.egresos.contador) /
        this.contenido.ingresos.contador;
      this.contenido.egresos.porcentaje = parseInt(porcentajetotal);
      informacion.reset();

      const ws = new Worker("storage/wsMyComponent.js", { type: "module" });
      let id = [];
      let count = 0;
      id.push("#superior");
      
      ws.postMessage({ module: "imprimirDatos", data: this.contenido });
      id.push("#ingresos");
      ws.postMessage({ module: "imprimirIngresos", data: this.contenido });
      ws.addEventListener("message", (e) => {
        let doc = new DOMParser().parseFromString(e.data, "text/html");
        document.querySelector(id[count]).innerHTML = "";
        document.querySelector(id[count]).append(...doc.body.children);
        id.length - 1 == count ? ws.terminate() : count++;
      });

      /* ws.postMessage({ module:"eliminarbotones"}) */
      
      
    
        
      //Gráficas
      const getOptionChart = () => {
        return {
          title: {
            text: "Gráfica de Egresos",
          },
          xAxis: {
            type: "category",
            data: this.contenido.egresos.info[0].nombres,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: this.contenido.egresos.info[0].porcentajes,
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(180, 180, 180, 0.2)",
              },
            },
          ],
        };
      };

      const initCharts = () => {
        const chart = echarts.init(document.querySelector("#graficas"));
        chart.setOption(getOptionChart());
      };

      const getOptionChart2 = () => {
        return {
          title: {
            text: "Gráfica de Ingresos",
          },
          xAxis: {
            type: "category",
            data: this.contenido.ingresos.info[0].nombres,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: this.contenido.ingresos.info[0].porcentajes,
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(180, 180, 180, 0.2)",
              },
            },
          ],
        };
      };
      const initCharts2 = () => {
        const chart2 = echarts.init(document.querySelector("#graficas2"));
        chart2.setOption(getOptionChart2());
      };
      initCharts2();
      initCharts();

      localStorage.setItem("myComponent", JSON.stringify(this));
    
        let cuenta = this.contenido.egresos.info[0].datos.length;
        for (let i = 0; i < cuenta; i++) {
          let botones = document.querySelector(`#btn${i}`);
          botones.addEventListener("click", (e) => {
            console.log(`hey, le di click al  `);
          });//no hace nada
        
      }

     
    });
    
  },
  
};





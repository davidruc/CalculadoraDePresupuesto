import myComponent from "./components/myComponent.js";
const getOptionChart = ()=>{
    return {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      };
}

const initCharts = ()=>{
    const chart = echarts.init(document.querySelector("#graficas"));
    chart.setOption(getOptionChart());
}

window.addEventListener("load", ()=>{
    initCharts()
})
myComponent.show();
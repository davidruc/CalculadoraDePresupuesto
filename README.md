# CALCURADORA DE PRESUPUESTO.

Este proyecto es una calculadora de presupuestos personalizada.

## Funcionalidad:

En este proyecto es posible ingresar egresos e ingresos y suministrar información sobre dicho gasto. Es útil porque existe persistencia de datos de manera local gracias a que existe un localstorage. 

## Utilidades implementadas en el código:

Es un proyecto que utiliza js nativo. Además, uso de la modularización de Javascript.

* Se implementó un localstorage para poder guardar de manera local los cambios realizados, por lo que la única forma de reiniciar los datos del proyecto es abriendo el inspector -> application -> local Storage, y borrar los datos que se encuentran ahí

* Se usaron Workers para mejorar el rendimiento de la aplicación y el manejo de los datos.

* Se utilizó la librería de gráficas [echarts](https://echarts.apache.org/en/index.html) para realizar un análisis más detallado de los datos ingresados al proyecto.

## Advertencias
* Se presentarion problemas en la implementación de los botones de actualizar y borrar datos. Esto principalmente a que la creación de los botones se realizó desde los workers y esto generaba un conflicto en su ejecución. Si en un futuro se desea continuar con el proyecto es necesario tener esto en cuenta.

#### Autor: David Rueda. (Davidruc)

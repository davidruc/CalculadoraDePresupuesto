export default{
    dataMyComponent(){
        localStorage.setItem("myComponent", JSON.stringify({
            contenido:{
                titulo: "Presupuesto disponible",
                contador: 0,
                ingresos: {
                    titulo: "INGRESOS",
                    contador: 0,
                    datos: [
        
                    ]
                    
                },
                egresos: {
                    titulo: "EGRESOS",
                    contador: 0,
                    porcentaje: 0,
                    datos: [
        
                    ]
                }
        
                
        
            },
            
        }))
    }
}



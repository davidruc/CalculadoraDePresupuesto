export default{
    dataMyComponent(){
        const data = {
            contenido:{     
                contador: 0,

                ingresos: {                 
                    contador: 0,
                    info:[{
                        datos:[
                            
                        ],
                        porcentajes: [

                        ],
                        nombres:[
                            
                        ]

                    }
                        
                    ],
                    datos: [
        
                    ]
                    
                },
                egresos: {
                    contador: 0,
                    porcentaje: "",
                    
                    info:[{
                        datos:[
                            
                        ],
                        porcentajes: [

                        ],
                        nombres:[
                            
                        ]

                    }
                        
                    ],
                    
                    datos: [
                    ]
                }
        
                
        
            },
        }
        const feto = localStorage.getItem("myComponent");
        if (!feto) localStorage.setItem("myComponent", JSON.stringify(data));
    }
}



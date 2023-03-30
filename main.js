import myHeader from "./components/myHeader.js";

myHeader.show();

let formulario = document.querySelector(`#formulario`);

self.addEventListener("submit", (e)=>{
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target))
    console.log(data);

    formulario.reset();
})
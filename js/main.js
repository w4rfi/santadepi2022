class Zonas {
    constructor (zona, precio, id, sexo) {
        this.zona = zona;
        this.precio = precio;
        this.id = id;
        this.sexo = sexo;
    }

    descuentoUno () {
        return this.precio * 0.90     
    }

    descuentoDos () {
        return this.precio * 0.75
    }
}

const listaZonas = [];

listaZonas.push( new Zonas("Bozo", 500, 1, "femenino"))
listaZonas.push( new Zonas("Rostro", 900, 2, "femenino"))
listaZonas.push( new Zonas("Axila", 900, 3, "femenino"))
listaZonas.push( new Zonas("Cavado", 1200, 4, "femenino"))
listaZonas.push( new Zonas("Cavado bikini", 900, 5, "femenino"))

listaZonas.push( new Zonas("Pecho", 500, 6, "masculino"))
listaZonas.push( new Zonas("Abdomen", 500, 7, "masculino"))
listaZonas.push( new Zonas("Espalda", 500, 8, "masculino"))
listaZonas.push( new Zonas("Gluteos", 500, 9, "masculino"))
listaZonas.push( new Zonas("Zona intima", 500, 10, "masculino"))

// for (const elemento of listaZonas) {
//     console.log("id=", elemento.id)
//     console.log("nombre=", elemento.zona)
//     console.log("precio=", elemento.precio)
//     console.log("sexo=", elemento.sexo)
// }

// const ocultar = () => {
//     document.getElementById("addFeminineZones").style.display = 'none';
// }


// 


const eventoClickfem = document.getElementById("fem");
const eventoClickmasc = document.getElementById("masc");

const costo = document.getElementById("costArea");

// Evento para mostrar precios!

eventoClickfem.addEventListener("click", () => {
    costo.innerHTML = "";
    for (const zonas of listaZonas) {
        if (zonas.sexo != "masculino") {
            const costs = document.createElement("div")
            costs.innerHTML = `
                        <h3> Zona: ${zonas.zona} </h3>               
                        <p> Precio: <strong> ${zonas.precio} </strong><p>
                        `;
        costo.append(costs);
        }
    }
    
});

eventoClickmasc.addEventListener("click", (e) => {
    costo.innerHTML = "";
    for (const zonas of listaZonas) {
        if (zonas.sexo != "femenino") {
            const costs = document.createElement("div")
            costs.innerHTML = `
                        <h3> Zona: ${zonas.zona} </h3>               
                        <p> Precio: <strong> ${zonas.precio} </strong><p>
                        `;
        costo.append(costs);
        }
    }
    
});









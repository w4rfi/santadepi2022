
// ###############
//  CONSTRUCTOR PARA ZONAS
// ###############
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

// ###############################
// ARRAY PARA PUSHEAR NUEVAS ZONAS
// ###############################

const listaZonas = [];

listaZonas.push( new Zonas("Bozo", 500, 1, "femenino"))
listaZonas.push( new Zonas("Rostro", 900, 2, "femenino"))
listaZonas.push( new Zonas("Axila", 900, 3, "femenino"))
listaZonas.push( new Zonas("Cavado", 1200, 4, "femenino"))

listaZonas.push( new Zonas("Pecho", 500, 6, "masculino"))
listaZonas.push( new Zonas("Abdomen", 500, 7, "masculino"))
listaZonas.push( new Zonas("Espalda", 500, 8, "masculino"))
listaZonas.push( new Zonas("Zona intima", 1200, 10, "masculino"))

// ######################################
// SE MUESTRAN LAS ZONAS A TRAVEZ DEL DOM
// ######################################

const zonasYprecios = document.getElementById("zonasYprecios");

for (const zonas of listaZonas) {
    const placa = document.createElement("div");
    placa.classList.add("col-3")
    placa.classList.add("cardo")
    placa.innerHTML = `
        <div class="card text-center" style="width: 18rem; height: 18rem">
            <div class="card-body">
                <h5 class="card-title">${zonas.zona}</h5>
                <p class="card-text text-uppercase text-white">Precio: $${zonas.precio}</p>
                <a href="#" id="${zonas.id}" class="btn btn-light agregar">Agregar</a>
            </div>
        </div> 
                `;

    zonasYprecios.append(placa);
}

// #########################################
// FUNCION QUE EMPUJA EL PRODUCTO A LA TABLA 
// #########################################

const agregarEleccionATabla = ({sexo, zona, precio}) => {
    const agregarTabla = document.getElementById("agregarTabla");
    const tr = document.createElement('tr');
    tr.innerHTML =`
        <td>${sexo}</td>
        <td>${zona}</td>
        <td>${precio}</td>
        `
        agregarTabla.append(tr)
}

// #################################################################################
// SE MANTIENE EN LA TABLA LO QUE FUE ANTERIORMENTE SELECCIONADO A TRAVES DEL LOCAL
// STORAGE
// #################################################################################

const eleccionString = localStorage.getItem('agregados');
const eleccionParseado = JSON.parse(eleccionString) || [];

eleccionParseado.forEach((agregar) => {
    agregarEleccionATabla(agregar);
    });

// #################################################################################
// SE RECORRER EL ARRAY QUE GENERA EL LLAMADO A LA CLASE, SE IDENTIFICA EL PRODUCTO
// Y SE AGREGA A LA TABLA
// #################################################################################
    
const clickAgregar = document.getElementsByClassName("agregar");

for (const seleccion of clickAgregar) {
    seleccion.addEventListener("click", (e) => {
        e.preventDefault()
        console.log(e.target.id)
        let producto = listaZonas.find(item => item.id === parseInt(e.target.id))
        agregarEleccionATabla(producto);

// ######################################################
// SE AGREGO LO SELECCIONADO EN LA LISTA AL LOCALSTORAGE
// ######################################################

        const eleccionString = localStorage.getItem('agregados');
        const eleccionParseado = eleccionString ? JSON.parse(eleccionString) : [];

            eleccionParseado.push(producto);
        
            localStorage.setItem('agregados', JSON.stringify(eleccionParseado));    
    })
}


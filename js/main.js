
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

// ########################################################
// FUNCION QUE GENERA E INCORPORA LAS CARDS DE LOS PRODUCTOS
// ########################################################

const productosYprecios = ({zona, precio, id}) => {
    const zonasYprecios = document.getElementById("zonasYprecios");
    const placa = document.createElement("div");
    placa.classList.add("product")
    placa.innerHTML = `
                <div class="proname">${zona}</div>
                <h2>$${precio}</h2>
                <button id="${id}" class="selectButton agregar">Seleccionar!</button>
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


// ######################################
// SE AGREGAN LOS PRODUCTOS SEGÚN EL SEXO
// ######################################

const eventoSexo = document.getElementsByClassName("sexo")

for (const sexos of eventoSexo) {
        sexos.addEventListener("click", (e) => {
        // e.preventDefault()
        console.log(e.target.id)
        zonasYprecios.innerHTML = "";
        if (sexos.id === "femenino") {
            for (const cardsZonas of listaZonas) {
                if (cardsZonas.sexo != "masculino") {
                    productosYprecios(cardsZonas);
                }
            }
        } else if (sexos.id === "masculino") {
            for (const cardsZonas of listaZonas) {
                if (cardsZonas.sexo != "femenino") {
                    productosYprecios(cardsZonas);
                }
            }
        }

// #################################################################################
// SE RECORRER EL ARRAY QUE GENERA EL LLAMADO A LA CLASE, SE IDENTIFICA EL PRODUCTO
// Y SE AGREGA A LA TABLA
// #################################################################################

const clickAgregar = document.getElementsByClassName("agregar");

for (const seleccion of clickAgregar) {
        seleccion.addEventListener("click", (e) => {
        e.preventDefault()
        console.log(e.target.id)
        Swal.fire({
            title: 'Listo!',
            text: 'Agregaste una zona al carrito!',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });
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
    })
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

const agregarTotal = document.getElementsByClassName("total");

let sumall = eleccionParseado.map(item => item.precio).reduce((prev, curr) => prev + curr, 0);
    // const total = document.createElement('div');
    // total.innerHTML = `<p>Su total es: ${sumall}</p>`
    console.log(sumall);


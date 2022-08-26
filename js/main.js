
// #######################
//  CONSTRUCTOR PARA ZONAS
// #######################
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

// ################################################
// ARRAY PARA PUSHEAR NUEVAS ZONAS UTILIZANDO FETCH
// ################################################

const listaZonas = [];

const getZonas = async () => {
    const response = await fetch('../js/zonas.json');
    const data = await response.json();
    const arrayData =  data.map((zona) => {
        listaZonas.push(new Zonas(zona.zona, zona.precio, zona.id, zona.sexo));
    });

    console.log(listaZonas);
}
getZonas()


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
    tr.classList.add('quitar')
    tr.innerHTML =`
        <td>${sexo}</td>
        <td>${zona}</td>
        <td>${precio}</td>
        <td><i id="${zona}" class="fa-solid fa-xmark"></i></td>
        `
        agregarTabla.append(tr)
}


// ######################################
// SE AGREGAN LOS PRODUCTOS SEGÚN EL SEXO
// ######################################

const eventoSexo = document.getElementsByClassName("sexo")

for (const sexos of eventoSexo) {
        sexos.addEventListener("click", (e) => {
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
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Agregaste una zona al carrito!',
            showConfirmButton: false,
            timer: 1500
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

// ############################################################

const clickEliminar = document.getElementsByClassName('quitar');

for (const quitar of clickEliminar) {
    quitar.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e.target.id);
    quitar.remove();

    const eleccionParseado = JSON.parse(eleccionString);   
    const quitarLocal = eleccionParseado.filter( nombre => nombre.zona !== e.target.id );

    localStorage.setItem('agregados', JSON.stringify(quitarLocal))

console.log(quitarLocal)
    
    })
}

// ##############################################################


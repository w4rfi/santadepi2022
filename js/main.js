const eleccionString = localStorage.getItem('agregados');
const eleccionParseado = eleccionString ? JSON.parse(eleccionString) : [];

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

const eventoSexo = document.getElementsByClassName("sexo")
const clickEliminar = document.getElementsByClassName('quitar');
const clickAgregar = document.getElementsByClassName("agregar");
const sumaTotal = eleccionParseado.map(item => item.precio).reduce((prev, curr) => prev + curr, 0);

// ######################################
// SE AGREGAN LOS PRODUCTOS SEGÚN EL SEXO
// ######################################

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

for (const seleccion of clickAgregar) {
        seleccion.addEventListener("click", (e) => {
        e.preventDefault()
        console.log(e.target.id)

        let producto = listaZonas.find(item => item.id === parseInt(e.target.id));
        let controlLocal = eleccionParseado.includes(producto);

        if (controlLocal == false){
            agregarEleccionATabla(producto);
            eleccionParseado.push(producto);
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Agregaste una zona al carrito!',
                showConfirmButton: false,
                timer: 2500
            });
        } else if (controlLocal) {
            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'Esta zona ya se agrego al carrito!',
                showConfirmButton: false,
                timer: 2500
            });
        }
        
        localStorage.setItem('agregados', JSON.stringify(eleccionParseado));    


for (const quitar of clickEliminar) {
        quitar.addEventListener("click", (event) => {
        event.preventDefault();
        let nombreZona = event.target.id;
        quitar.remove();
            console.log(nombreZona)
        const quitarLocal = eleccionParseado.filter(nombre =>  nombre.zona !== nombreZona);
            
            console.log(quitarLocal);
        
        localStorage.setItem('agregados', JSON.stringify(quitarLocal))
        
    })
}


// #############################
// SE MUESTRA EL TOTAL
// #############################
    const sumaTotal = eleccionParseado.map(item => item.precio).reduce((prev, curr) => prev + curr, 0);
    const p = document.getElementById('totalSuma');
    p.innerText = `Total: ${sumaTotal}`;

// ##############################
    })
}
    })
}


//#################################################################################
// SE MANTIENE EN LA TABLA LO QUE FUE ANTERIORMENTE SELECCIONADO A TRAVES DEL LOCAL
// STORAGE
//#################################################################################

eleccionParseado.forEach((agregar) => {
    agregarEleccionATabla(agregar);
    });

// ############################################################

for (const quitar of clickEliminar) {
    quitar.addEventListener("click", (event) => {
    event.preventDefault();
    let nombreZona = event.target.id;
    quitar.remove();
        console.log(nombreZona)
    const quitarLocal = eleccionParseado.filter(nombre =>  nombre.zona !== nombreZona);
    
        console.log(quitarLocal);

    localStorage.setItem('agregados', JSON.stringify(quitarLocal))


    })
}

// #############################
// SE MUESTRA EL TOTAL
// #############################

    const p = document.getElementById('totalSuma');
    p.innerText = `Total: ${sumaTotal}`;

// ##############################


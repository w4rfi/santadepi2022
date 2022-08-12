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

listaZonas.push( new Zonas("Pecho", 500, 6, "masculino"))
listaZonas.push( new Zonas("Abdomen", 500, 7, "masculino"))
listaZonas.push( new Zonas("Espalda", 500, 8, "masculino"))
listaZonas.push( new Zonas("Zona intima", 1200, 10, "masculino"))




const zonasYprecios = document.getElementById("zonasYprecios");
const agregarTabla = document.getElementById("agregarTabla");



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


const clickAgregar = document.getElementsByClassName("agregar");

for (const seleccion of clickAgregar) {
    seleccion.addEventListener("click", (e) => {
        e.preventDefault()
        console.log(e.target.id)
        let producto = listaZonas.find(item => item.id === parseInt(e.target.id))
        const tr = document.createElement('tr');
        tr.innerHTML =`
            <td>${producto.sexo}</td>
            <td>${producto.zona}</td>
            <td>${producto.precio}</td>
            `
            agregarTabla.append(tr)

// SE AGREGO LO SELECCIONADO EN LA LISTA AL LOCALSTORAGE

        const eleccionString = localStorage.getItem('agregados');
        let eleccionParseado = [];
        if (eleccionString) {
            eleccionParseado = JSON.parse(eleccionString);
        }
        
            eleccionParseado.push(producto);
        
            localStorage.setItem('agregados', JSON.stringify(eleccionParseado));    
    })
}


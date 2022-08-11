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


const eventoClickfem = document.getElementById("fem");
const eventoClickmasc = document.getElementById("masc");


const costo = document.getElementById("costArea");

// Evento para mostrar precios!

eventoClickfem.addEventListener("click", () => {
    costo.innerHTML = "";
    for (const zonas of listaZonas) {
        if (zonas.sexo != "masculino") {
            const costs = document.createElement("div");
            costs.classList.add("prices");
            costs.innerHTML = `
                        <label class="formOptions" id="pricesOptions" for="">
                        <input name="insecto" type="checkbox" value="${zonas.precio}">
                        <p>${zonas.zona}: ${zonas.precio}</p>
                        </label>
                        `;
        costo.append(costs);
        }
    }
    const calculatorBtn = document.createElement("div")
    calculatorBtn.classList.add("calculator")
    calculatorBtn.innerHTML = `
                        <button type="submit" id="calculatorBtn" class="btn"><strong>Calcular</strong></button>
                        `;

    costo.append(calculatorBtn);
    
});

eventoClickmasc.addEventListener("click", (e) => {
    costo.innerHTML = "";
    for (const zonas of listaZonas) {
        if (zonas.sexo != "femenino") {
            const costs = document.createElement("div");
            costs.classList.add("prices");
            costs.innerHTML = `
                        <label class="formOptions" id="pricesOptions" for="">
                        <input name="insecto" type="checkbox" value="${zonas.precio}">
                        <p>${zonas.zona}: ${zonas.precio}</p>
                        </label>
                        `;
        costo.append(costs);
        }
    }

    const calculatorBtn = document.createElement("div")
    calculatorBtn.classList.add("calculator")
    calculatorBtn.innerHTML = `
                    <button type="submit" id="calculatorBtn" class="btn"><strong>Calcular</strong></button>
                    `;

        costo.append(calculatorBtn);

        costo.addEventListener("click", (e) => {
            const selectPrices = e.target; 
        
            const select = [
                parseInt(selectPrices[0].value),
                parseInt(selectPrices[1].value),
                parseInt(selectPrices[2].value),
                parseInt(selectPrices[3].value),
                parseInt(selectPrices[4].value)
            ];
        
            console.log(select);
        });
    
});







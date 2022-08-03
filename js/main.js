const feminineZones = [{id: 1, zona: 'Bozo', precio: 500},
                        {id: 2, zona: 'Rostro', precio: 900},
                        {id: 3, zona: 'Axila', precio: 900},
                        {id: 4, zona: 'Cavado', precio: 1200},
                        {id: 5, zona: 'Cavado bikini', precio: 900}];

const masculineZones = [{id: 1, zona: 'Pecho', precio: 900},
                        {id:2, zona: 'Abdomen', precio: 900},
                        {id: 3, zona: 'Espalda', precio: 900},
                        {id: 4, zona: 'Gluteos', precio: 900},
                        {id: 5, zona: 'Zona intima', precio: 1700}];


const costsFem = document.getElementById("addFeminineZones");
const costsMasc = document.getElementById("addMasculineZones");

for (const femininee of feminineZones) {
    const feminineCosts = document.createElement("div")
    feminineCosts.innerHTML = `<h3> Zona: ${femininee.zona} </h3>
                                <p> Precio: <strong> ${femininee.precio} </strong><p>`;

    costsFem.append(feminineCosts);               
}

for (const masculinee of masculineZones) {
    const masculineCosts = document.createElement("div")
    masculineCosts.innerHTML = `<h3> Zona: ${masculinee.zona} </h3>
                                <p> Precio: <strong> ${masculinee.precio} </strong><p>`;

    costsMasc.append(masculineCosts);               
}
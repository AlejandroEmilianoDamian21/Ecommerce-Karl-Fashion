const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment();
let carrito =  {};


document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

//Esperamos el evento CLICK en el boton
items.addEventListener('click', e => {
    addCarrito(e);
});

const fetchData = async() =>{
    try{
        const res = await fetch('api.json');
        const data = await res.json();
        // console.log(data);
        pintarCards(data);
    }catch(error){
        console.erwwror();
    }

}

//Pintamos los productos
const pintarCards = data => {
        // console.log(data);
    data.forEach(producto => {
        // console.log(producto);
        templateCard.querySelector('p').textContent = producto.title;
        templateCard.querySelector('h4').textContent = "$"+ producto.precio;
        templateCard.querySelector('img').setAttribute("src",producto.thumbnailUrl);
         templateCard.querySelector('button').dataset.id = producto.id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })
    items.appendChild(fragment);
}

//Agregar aL carrito
const addCarrito = e =>{
    // console.log(e.target);
    // console.log(e.target.classList.contains('btn-carrito'));
    if(e.target.classList.contains('btn-carrito')){
        // console.log(e.target.parentElement);
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation();
}

const setCarrito = objeto => {
    console.log(objeto);
    const producto = {
        id: objeto.querySelector('.btn-carrito').dataset.id,
        nombre: objeto.querySelector('p').textContent,
        precio: objeto.querySelector('h4').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }
    carrito[producto.id] = {...producto}

    console.log(carrito);
    // console.log(carrito);
}

// let carrito = ['pene1'];
// const divisa = '$';

// function llevarProductos(){
//     carrito.push(prompt('Nombre del producto que desea llevar'));
//     console.log(carrito);
// }

// function cargarProductos(){
//     let precio = prompt('Ingrese el precio');
//     baseDeDatos.push({nombre: prompt('Ingrese el Nombre del producto'), genero: prompt('Ingrese el genero'), precio: parseInt(precio)})
//     console.log(baseDeDatos);
// }

// function borradoProductos(){
//     let vaciarCarrito = prompt('Desea vaciar el carrito? Si = 1 o No = 0');
//     let vaciarCarritoInt = parseInt(vaciarCarrito);
//     if(vaciarCarritoInt === 1){
//         carrito = [];
//         console.log(carrito);
//     }else{
//         carrito.slice(0,1);
//         console.log(carrito)
//     }
//     console.log(vaciarCarritoInt);
// }

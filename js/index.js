const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');

const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content

const fragment = document.createDocumentFragment();
let carrito =  {};


document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

//Esperamos el evento CLICK en el boton
cards.addEventListener('click', e => {
    addCarrito(e);

    Swal.fire(
        'Producto agregado al Carrito!',
        'Click en el boton para continuar',
        'success'
      )

});

const fetchData = async() =>{
    try{
        const res = await fetch('api.json');
        const data = await res.json();
        // console.log(data);
        pintarCards(data);
    }catch(error){
        console.error();
    }

}

//Pintamos los productos
const pintarCards = data => {
        // console.log(data);
    data.forEach(producto => {
        // console.log(producto);
        templateCard.querySelector('p').textContent = producto.title;
        templateCard.querySelector('h4').textContent = producto.precio;
        templateCard.querySelector('img').setAttribute("src",producto.thumbnailUrl);
        templateCard.querySelector('button').dataset.id = producto.id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })
    cards.appendChild(fragment);
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
    //console.log(objeto);
    const producto = {
        id: objeto.querySelector('.btn-carrito').dataset.id,
        nombre: objeto.querySelector('p').textContent,
        cantidad: 1,
        precio: objeto.querySelector('h4').textContent,
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }
    carrito[producto.id] = {...producto}

    pintarCarrito();
    // console.log(carrito);
    // console.log(carrito);
}

const pintarCarrito = () => {
    console.log(carrito);
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre;
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id;
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id;
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio


        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
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

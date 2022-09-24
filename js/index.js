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
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
});

//Esperamos el evento CLICK en el boton
cards.addEventListener('click', e => {
    addCarrito(e);
});

items.addEventListener('click', e => { btnAumentarDisminuir(e) })


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
        templateCard.querySelector('h4').textContent =  producto.precio;
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
        Swal.fire(
            'Producto agregado al Carrito!',
            'Click en el boton para continuar',
            'success'
          )
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
    
    pintarFooter()
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


const pintarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío!</th>
        `
        return
    }
    
    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    // console.log(nPrecio)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        Swal.fire(
            'Acaba de vaciar el Carrito',
            'Click en el boton para continuar',
            'info'
          )
        pintarCarrito()
    })

}

const btnAumentarDisminuir = e => {
    // console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito()
        Swal.fire(
            'Producto sumado al Carrito!',
            'Click en el boton para continuar',
            'success'
          )
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
        Swal.fire(
            'Producto restado del Carrito!',
            'Click en el boton para continuar',
            'warning'
          )
    }
    e.stopPropagation()
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

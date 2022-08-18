const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment();



document.addEventListener('DOMContentLoaded', () => {
    fetchData();
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

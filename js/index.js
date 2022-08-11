console.log("hola");

//Productos que tendremos para vender
const baseDeDatos = [
    {
       
        nombre: 'Camisa de lisa',
        genero: 'masculino',
        precio: 1200
    },
    {
        
        nombre: 'Camisa de rayas',
        genero: 'masculino',
        precio: 1000
    },
    {
        
        nombre: 'Vestido liso',
        genero: 'femenino',
        precio: 900
    },
    {
        
        nombre: 'Jeans Moom',
        genero: 'masculino',
        precio: 2000
    },
    {
        
        nombre: 'Jeans Moom',
        genero: 'fememino',
        precio: 1100
    },
    {
        
        nombre: 'bermuda lisa',
        genero: 'masculino',
        precio: 1900
    },
    {
        
        nombre: 'Shorts jeans',
        genero: 'femenino',
        precio: 2200
    }
];
let carrito = ['pene1'];
const divisa = '$';

function llevarProductos(){
    carrito.push(prompt('Nombre del producto que desea llevar'));
    console.log(carrito);
}

function cargarProductos(){
    let precio = prompt('Ingrese el precio');
    baseDeDatos.push({nombre: prompt('Ingrese el Nombre del producto'), genero: prompt('Ingrese el genero'), precio: parseInt(precio)})
    console.log(baseDeDatos);
}

function borradoProductos(){
    let vaciarCarrito = prompt('Desea vaciar el carrito? Si = 1 o No = 0');
    let vaciarCarritoInt = parseInt(vaciarCarrito);
    if(vaciarCarritoInt === 1){
        carrito = [];
        console.log(carrito);
    }else{
        carrito.slice(0,1);
        console.log(carrito)
    }
    console.log(vaciarCarritoInt);
}
borradoProductos();

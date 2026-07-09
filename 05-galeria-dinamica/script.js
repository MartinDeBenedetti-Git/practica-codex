const productos=[
    {
        id:1,
        nombre:"Notebook Lenovo",
        precio:50000,
        categoria:"Notebook",
        stock:10
    },
    {
        id:2,
        nombre:"Colchon Simmons",
        precio:80000,
        categoria:"Colchones",
        stock:5
    },
    {
        id:3,
        nombre:"Silla Ergonomica",
        precio:30000,
        categoria:"Sillas",
        stock:15
    },
    {
        id:4,
        nombre:"Play Station 5",
        precio:60000,
        categoria:"Consolas",
        stock:5
    },
    {
        id:5,
        nombre:"Xbox Series X",
        precio:55000,
        categoria:"Consolas",
        stock:5
    },
    {
        id:6,
        nombre:"Lavarropas Samsung",
        precio:100000,
        categoria:"Lavarropas",
        stock:10
    },
    {
        id:7,
        nombre:"Heladera Whirlpool",
        precio:120000,
        categoria:"Heladeras",
        stock:10
    },
]

const listarProductos=()=>{
    return productos;  //devuelve un array con todos los productos
}

const renderizarProductos=()=>{
    const contenedor = document.querySelector(".contenedor");
    productos.forEach(producto=>{
        const productoElemento = document.createElement("article");
        productoElemento.classList.add("producto");
        productoElemento.innerHTML = `
            <h2>${producto.nombre}</h2>
            <p>id:${producto.id}, nombre:${producto.nombre}, precio:${producto.precio}, categoria:${producto.categoria}, stock:${producto.stock}</p>
        `;
        contenedor.appendChild(productoElemento);
    })
}
renderizarProductos();

const buscarProducto = document.getElementById("buscarProducto");

buscarProducto.addEventListener("input", event => {
    const buscado = event.target.value.toLowerCase();
    const productosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(buscado));
    renderizarProductos(productosFiltrados);
});

button.addEventListener("click", event => {
    const producto = productos.find(producto => producto.id === id);
    if(!producto){
        console.log("Producto no encontrado");
        return null;
    }
    else{
        console.log(`ID: ${producto.id} - Nombre: ${producto.nombre} - Precio: ${producto.precio} - Categoria: ${producto.categoria} - Stock: ${producto.stock}`);
        return producto;
    }
});








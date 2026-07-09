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

const renderizarProductos=(lista=productos)=>{
    const contenedor = document.querySelector(".contenedor");
    contenedor.innerHTML = "";
    lista.forEach(producto => {
        const productoElemento = document.createElement("article");
        productoElemento.classList.add("producto");
        productoElemento.innerHTML = `
            <h2>${producto.nombre}</h2>
            <p>id:${producto.id}, nombre:${producto.nombre}, precio:${producto.precio}, categoria:${producto.categoria}, stock:${producto.stock}</p>
        `;
        contenedor.appendChild(productoElemento);
    });
};
renderizarProductos(listarProductos());

const buscarProducto = document.getElementById("buscarProducto");

buscarProducto.addEventListener("input", event => {
    const buscado = event.target.value.toLowerCase();
    const productosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(buscado));
    renderizarProductos(productosFiltrados);
});

const button = document.getElementById("AgregarProducto");
const formProducto = document.getElementById("formProducto");


const agregarProducto = formProducto => {
    const nombre = formProducto.nombre.value;
    const descripcion = formProducto.descripcion.value;
    const categoriaId = formProducto.categoriaId.value;
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: nombre,
        precio: 0,
        categoria: categoriaId,
        stock: 0
    };
    productos.push(nuevoProducto);
    renderizarProductos();
    console.log("El producto se ha creado correctamente");
    return nuevoProducto;
};

button.addEventListener("click", event => {
    const nuevoProducto = agregarProducto(formProducto);
});









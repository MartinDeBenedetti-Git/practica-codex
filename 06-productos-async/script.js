let productos=[]

const obtenerProductos = async() =>{   //la funcion que trae los datos es async porque se necesita una petición ajax
    mostrarCargando();  //se muestra un mensaje de cargando en el DOM mientras se obtiene los datos

    try{
        const respuesta = await fetch("https://fakestoreapi.com/products")  //se hace la petición 

        if(!respuesta.ok){
            throw new Error(`Error del servidor: ${respuesta.status}`);   //chequemos el error porque fetch no lo hace
        }
        const datos = await respuesta.json();  //se obtiene el json
        productos = datos;
        renderizarProductos(productos);
        console.log("Productos obtenidos correctamente");
    }
    catch(error){
        mostrarError(error);  //se muestra un mensaje de error en el DOM
    }
};
obtenerProductos();  //se llama una vez cargada la página

const mostrarCargando = () => {
    const mensaje= document.createElement("p");
    mensaje.innerText = "Cargando...";
    document.querySelector("main").appendChild(mensaje);
};

const mostrarError = (error) => {
    const mensaje= document.createElement("p");
    mensaje.innerText = `Error: ${error.message}`;
    document.querySelector("main").appendChild(mensaje);
};


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
    const categoriaId = formProducto.categoriaId.value;
    const precio = formProducto.precio.value;
    const stock = formProducto.stock.value;
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: nombre,
        precio: precio,
        categoria: categoriaId,
        stock:  stock
    };
    productos.push(nuevoProducto);
    renderizarProductos();
    console.log("El producto se ha creado correctamente");
    return nuevoProducto;
};

button.addEventListener("click", event => {
    event.preventDefault();
    const nuevoProducto = agregarProducto(formProducto);
    formProducto.reset();
});

const formEliminar = document.getElementById("eliminarProducto");

const eliminarProducto = formEliminar => {
    event.preventDefault();
    const id = formEliminar.id.valueAsNumber;
    const index = productos.findIndex(producto => producto.id === id);
    if (index === -1) {
        console.log("El producto no existe");
        return;
    }
    else {
        productos.splice(index, 1);
        renderizarProductos();
        console.log("El producto se ha eliminado correctamente");
        return id;
    }
};

const buttonEliminar = document.getElementById("EliminarProducto");
buttonEliminar.addEventListener("click", event => {
    event.preventDefault();
    const id = eliminarProducto(formEliminar);
    formEliminar.reset();
});








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

function listarProductos(){
    productos.forEach(producto => {
        console.log(`ID: ${producto.id} - Nombre: ${producto.nombre} - Precio: ${producto.precio} - Categoria: ${producto.categoria} - Stock: ${producto.stock}`);
    });
}

function buscarProductoPorId(id){
    const producto = productos.find(producto => producto.id === id);
    if(producto === undefined){
        console.log("Producto no encontrado");
    }else{
        console.log(`ID: ${producto.id} - Nombre: ${producto.nombre} - Precio: ${producto.precio} - Categoria: ${producto.categoria} - Stock: ${producto.stock}`);
    }
}

function filtarProductosPorCategoria(categoria){
    const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
    productosFiltrados.forEach(producto => {
        console.log(`ID: ${producto.id} - Nombre: ${producto.nombre} - Precio: ${producto.precio} - Categoria: ${producto.categoria} - Stock: ${producto.stock}`);
    })
    console.log(`Total de productos filtrados: ${productosFiltrados.length}`);
}

function crearProducto(nombre, precio, categoria, stock){
    const producto = {
        id:productos.length + 1,
        nombre,
        precio,
        categoria,
        stock
    }
    productos.push(producto);
    console.log("El producto se ha creado correctamente");
    console.log(`ID: ${producto.id} - Nombre: ${producto.nombre} - Precio: ${producto.precio} - Categoria: ${producto.categoria} - Stock: ${producto.stock}`);
}

function actualizarProducto(id, nombre, precio, categoria, stock){
    const producto = productos.find(producto => producto.id === id);
    if(producto === undefined){
        console.log("Producto no encontrado");
        return;
    }
    else{
        producto.nombre = nombre;
        producto.precio = precio;
        producto.categoria = categoria;
        producto.stock = stock;
        console.log("El producto se ha actualizado correctamente");
        console.log(`ID: ${producto.id} - Nombre: ${producto.nombre} - Precio: ${producto.precio} - Categoria: ${producto.categoria} - Stock: ${producto.stock}`);
    }
}

function eliminarProducto(id){
    const producto = productos.find(producto => producto.id === id);
    if(producto === undefined){
        console.log("Producto no encontrado");
        return;
    }
    else{
        const productoIndex = productos.indexOf(producto);
        productos.splice(productoIndex, 1);
        console.log("El producto se ha eliminado correctamente");
    }
}

function calcularValorTotalInventario(){
    let valorTotalInventario = 0;
    productos.forEach(producto => {
        valorTotalInventario += producto.precio * producto.stock;
    });
    console.log(`El valor total del inventario es de ${valorTotalInventario}`);
}





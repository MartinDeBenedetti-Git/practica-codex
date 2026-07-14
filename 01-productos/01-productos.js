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
    return productos;  //devuelve un array con todos los productos
}


function buscarProductoPorId(id){
    const producto = productos.find(producto => producto.id === id);
    if(!producto){
        console.log("Producto no encontrado");
        return null;
    }else{
        console.log(`ID: ${producto.id} - Nombre: ${producto.nombre} - Precio: ${producto.precio} - Categoria: ${producto.categoria} - Stock: ${producto.stock}`);
        return producto;
    }
}

function filtarProductosPorCategoria(categoria){
    return productos.filter(producto => producto.categoria === categoria);  //devuelve un array con los productos que cumplen la condición
}                                                                           //el filter() devuelve un array con los elementos que cumplen la condición, en este caso, los productos que pertenecen a la categoría especificada


function crearProducto(datosProducto){
    const nuevoID = productos.length + 1;
    const producto = {
        id: nuevoID,
        nombre: datosProducto.nombre,
        precio: datosProducto.precio,
        categoria: datosProducto.categoria,
        stock: datosProducto.stock
    };
    productos.push(producto);
    console.log("El producto se ha creado correctamente");
    return producto;
}


function actualizarProducto(id, datosActualizados){
    const producto = productos.find(producto => producto.id === id);
    if(!producto){  //el ! es un operador de negación, lo que significa que si el producto no existe, devuelve null
        console.log("Producto no encontrado");
        return null;
    }
    else{
        Object.assign(producto, datosActualizados);  //Object.assign() permite actualizar las propiedades de un objeto con las propiedades de otro objeto
        return producto;  //devuelve el producto actualizado
    }
}

function eliminarProducto(id){
    const producto = productos.find(producto => producto.id === id);
    if(!producto){
        console.log("Producto no encontrado");
        return null;
    }
    else{
        const productoIndex = productos.indexOf(producto);
        productos.splice(productoIndex, 1);   //el splice elimina el producto del array
        console.log("El producto se ha eliminado correctamente");
        return producto;  //devuelve el producto eliminado
    }
}

function calcularValorTotalInventario() {
    return productos.reduce((total, producto) => {
        return total + producto.precio * producto.stock;
    }, 0);  //el cero es el valor inicial, el reduce() llama a la función de acuerdo a cada elemento del array, y devuelve el resultado final
}



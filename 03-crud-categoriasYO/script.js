// Lista de productos de ejemplo (ya existía en tu proyecto)
const categorias = [
  { id: 1, nombre: "Notebook Lenovo", precio: 50000, categoria: "Notebook", stock: 10 }, // producto 1
  { id: 2, nombre: "Colchon Simmons", precio: 80000, categoria: "Colchones", stock: 5 }, // producto 2
  { id: 3, nombre: "Silla Ergonomica", precio: 30000, categoria: "Sillas", stock: 15 }, // producto 3
  { id: 4, nombre: "Play Station 5", precio: 60000, categoria: "Consolas", stock: 5 }, // producto 4
  { id: 5, nombre: "Xbox Series X", precio: 55000, categoria: "Consolas", stock: 5 }, // producto 5
  { id: 6, nombre: "Lavarropas Samsung", precio: 100000, categoria: "Lavarropas", stock: 10 }, // producto 6
  { id: 7, nombre: "Heladera Whirlpool", precio: 120000, categoria: "Heladeras", stock: 10 }, // producto 7
]; // fin array productos

// Selecciono elementos del DOM necesarios
const form= document.querySelector('#formCategoria'); // formulario general
const listaCategorias = document.querySelector('#listaCategorias'); // lista donde muestro categorías
const inputNombre = document.querySelector('#nombre'); // input nombre
const inputDescripcion = document.querySelector('#descripcion');
const buttonAgregar = document.querySelector('#agregarCategoria'); 
const buttonEliminar = document.querySelector('#eliminarCategoria');

function renderizarCategorias() {
    listaCategorias.innerHTML = ''; // limpio la lista actual
    categorias.forEach((categoria) => { // recorro cada categoria
        const li = document.createElement('li'); // creo elemento li
        li.textContent = categoria.nombre; // pongo el nombre
        listaCategorias.appendChild(li); // agrego a la lista
    });
}

function crearCategoria(datosCategoria){
    const nuevaId = categorias.length + 1;
    const categoria = {
        id: nuevaId,
        nombre: datosCategoria.nombre,
        descripcion: datosCategoria.descripcion
    };
    categorias.push(categoria);
    console.log("La categoria se ha creado correctamente");
    return categoria;
}

function actualizarCategoria(id, datosActualizados){
    const categoria = categorias.find(categoria => categoria.id === id);
    if(!categoria){  //el ! es un operador de negación, lo que significa que si el producto no existe, devuelve null
        console.log("Categoria no encontrada");
        return null;
    }
    else{
        Object.assign(categoria, datosActualizados);  //Object.assign() permite actualizar las propiedades de un objeto con las propiedades de otro objeto
        return categoria;  //devuelve el producto actualizado
    }
}

function eliminarCategoria(id){
    const categoria = categorias.find(categoria => categoria.id === id);
    if(!categoria){
        console.log("Categoria no encontrada");
        return null;
    }
    else{
        const categoriaIndex = categorias.indexOf(categoria);
        categorias.splice(categoriaIndex, 1);   //el splice elimina el producto del array
        console.log("La categoria se ha eliminado correctamente");
        return categoria;  //devuelve el producto eliminado
    }
}

buttonAgregar.addEventListener("click", agregarCategoria);
buttonEliminar.addEventListener("click", eliminarCategoria);


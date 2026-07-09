// Lista de productos de ejemplo (ya existía en tu proyecto)
let categorias = [
  { id: 1, nombre: "Notebook", descripcion: "" },
  { id: 2, nombre: "Colchones", descripcion: "" },
  { id: 3, nombre: "Consolas", descripcion: "" }
]; // fin array categorias

// Selecciono elementos del DOM necesarios
const form= document.querySelector('#formCategoria'); // formulario general
const listaCategorias = document.querySelector('#listaCategorias'); // lista donde muestro categorías
const inputNombre = document.querySelector('#nombre'); // input nombre
const inputDescripcion = document.querySelector('#descripcion');

function renderizarCategorias() {
    listaCategorias.innerHTML = '';

    categorias.forEach((categoria) => {
        const li = document.createElement('li');

        const nombreCategoria = document.createElement('span');
        nombreCategoria.textContent = categoria.nombre;

        const buttonEliminar = document.createElement('button');
        buttonEliminar.type = 'button';
        buttonEliminar.textContent = 'Eliminar';
        buttonEliminar.addEventListener('click', () => {
            eliminarCategoria(categoria.id);
            guardarCategorias();
            renderizarCategorias();
        });

        const buttonEditar = document.createElement('button');
        buttonEditar.type = 'button';
        buttonEditar.textContent = 'Editar';
        buttonEditar.addEventListener('click', () => {
            editarCategoria(categoria.id);
            guardarCategorias();
            renderizarCategorias();
        });

        li.appendChild(nombreCategoria);
        li.appendChild(buttonEliminar);
        li.appendChild(buttonEditar);

        listaCategorias.appendChild(li);
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

function editarCategoria(id){
    const categoria = categorias.find(categoria => categoria.id === id);
    if(!categoria){
        return null;
    }
    else{
        const nombre = prompt("Ingrese el nuevo nombre de la categoria");
        if(nombre){
            actualizarCategoria(id, {nombre});
        }
        return categoria;
    }
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = inputNombre.value.trim();
    const descripcion = inputDescripcion.value.trim();

    if (nombre === '') {
        return;
    }

    crearCategoria({
        nombre: nombre,
        descripcion: descripcion
    });

    inputNombre.value = '';
    inputDescripcion.value = '';
    guardarCategorias();
    renderizarCategorias();
});
cargarCategorias();
renderizarCategorias();

// Guarda el array de categorías en localStorage
function guardarCategorias() {
  localStorage.setItem('categorias', JSON.stringify(categorias)); // serializa y guarda
}
// Carga el array de categorías desde localStorage
function cargarCategorias(){
    const datos = localStorage.getItem('categorias');
    if(datos){
        categorias = JSON.parse(datos);
    }   
}
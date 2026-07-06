// Lista de productos de ejemplo (ya existía en tu proyecto)
const productos = [
  { id: 1, nombre: "Notebook Lenovo", precio: 50000, categoria: "Notebook", stock: 10 }, // producto 1
  { id: 2, nombre: "Colchon Simmons", precio: 80000, categoria: "Colchones", stock: 5 }, // producto 2
  { id: 3, nombre: "Silla Ergonomica", precio: 30000, categoria: "Sillas", stock: 15 }, // producto 3
  { id: 4, nombre: "Play Station 5", precio: 60000, categoria: "Consolas", stock: 5 }, // producto 4
  { id: 5, nombre: "Xbox Series X", precio: 55000, categoria: "Consolas", stock: 5 }, // producto 5
  { id: 6, nombre: "Lavarropas Samsung", precio: 100000, categoria: "Lavarropas", stock: 10 }, // producto 6
  { id: 7, nombre: "Heladera Whirlpool", precio: 120000, categoria: "Heladeras", stock: 10 }, // producto 7
]; // fin array productos

// Selecciono elementos del DOM necesarios
const listaCategorias = document.querySelector('#listaCategorias'); // lista donde muestro categorías
const textAgregarCategoria = document.querySelector('#nombre'); // input nombre
const inputDescripcion = document.querySelector('#descripcion'); // input descripción
const formCategoria = document.querySelector('#formCategoria'); // formulario general
const selectCategorias = document.querySelector('#selectCategorias'); // select para elegir categoría
const inputCategoriaId = document.querySelector('#categoriaId'); // hidden con id de edición
const buttonCancel = document.querySelector('#cancelEdit'); // botón cancelar edición
const feedback = document.createElement('div'); // elemento para mensajes de feedback
feedback.id = 'feedback'; // le pongo id para estilos
formCategoria.after(feedback); // inserto el feedback justo después del formulario

// Inicializo categorías: extraigo nombres únicos de productos y los convierto en objetos con id
const categoriasIniciales = [...new Set(productos.map((p) => p.categoria))].map((nombre, i) => ({ id: i + 1, nombre, descripcion: '' }));
// intento cargar categorías desde localStorage, si no existen uso las iniciales
let categorias = JSON.parse(localStorage.getItem('categorias')) || categoriasIniciales; // array de objetos {id,nombre,descripcion}

// Guarda el array de categorías en localStorage
function guardarCategorias() {
  localStorage.setItem('categorias', JSON.stringify(categorias)); // serializa y guarda
}

// Muestra un mensaje temporal en el DOM
function mostrarMensaje(mensaje, tipo = 'info') {
  feedback.textContent = mensaje; // setea texto
  feedback.className = tipo; // aplica clase (ej: success, error)
  setTimeout(() => { feedback.textContent = ''; feedback.className = ''; }, 2500); // borra luego
}

// Renderiza la lista de categorías en el `ul`
function renderizarCategorias() {
  listaCategorias.innerHTML = ''; // limpio la lista actual
  categorias.forEach((categoria) => { // recorro cada categoría
    const li = document.createElement('li'); // creo elemento li
    li.dataset.id = categoria.id; // guardo id en atributo data
    const left = document.createElement('div'); // contenedor izquierdo
    left.className = 'left'; // clase para estilos
    const nombreSpan = document.createElement('span'); // span para el nombre
    nombreSpan.className = 'name'; // clase para estilos
    nombreSpan.textContent = categoria.nombre; // pongo el nombre
    left.appendChild(nombreSpan); // añado el nombre al left
    if (categoria.descripcion) { // si tiene descripción
      const meta = document.createElement('div'); // creo div meta
      meta.className = 'meta'; // clase para estilos
      meta.textContent = categoria.descripcion; // pongo la descripción
      left.appendChild(meta); // añado meta al left
    }
    const controls = document.createElement('div'); // contenedor de botones
    controls.className = 'item-controls'; // clase para estilos

    const buttonEditar = document.createElement('button'); // botón editar
    buttonEditar.type = 'button'; // evito submit
    buttonEditar.textContent = 'Editar'; // texto del botón
    buttonEditar.addEventListener('click', () => setEdicion(categoria.id)); // al click pongo en modo edición

    const buttonBorrar = document.createElement('button'); // botón borrar
    buttonBorrar.type = 'button'; // evito submit
    buttonBorrar.textContent = 'Borrar'; // texto borrar
    buttonBorrar.classList.add('delete'); // clase delete para estilos
    buttonBorrar.addEventListener('click', () => borrarCategoria(categoria.id)); // asocio borrado

    controls.appendChild(buttonEditar); // añado editar a controls
    controls.appendChild(buttonBorrar); // añado borrar a controls

    li.appendChild(left); // añado left al li
    li.appendChild(controls); // añado controls al li
    listaCategorias.appendChild(li); // finalmente añado li al ul
  });
  rellenarSelect(); // actualizo el select cada vez que renderizo
}

// Rellena el select con las categorías actuales
function rellenarSelect() {
  selectCategorias.innerHTML = ''; // limpio opciones
  const opcionNueva = document.createElement('option'); // opción para crear nueva categoría
  opcionNueva.value = ''; // valor vacío -> modo nueva
  opcionNueva.textContent = '-- Nueva categoría --'; // texto
  selectCategorias.appendChild(opcionNueva); // añado primera opción
  categorias.forEach((categoria) => { // por cada categoría
    const opt = document.createElement('option'); // creo option
    opt.value = String(categoria.id); // valor = id
    opt.textContent = categoria.nombre; // texto = nombre
    selectCategorias.appendChild(opt); // añado al select
  });
}

// Lógica para agregar o actualizar categoría (submit del formulario)
function agregarOActualizarCategoria(event) {
  event.preventDefault(); // prevengo comportamiento por defecto del form

  const nombre = textAgregarCategoria.value.trim(); // leo y limpio el nombre
  const descripcion = inputDescripcion.value.trim(); // leo y limpio la descripción
  if (nombre === '') { mostrarMensaje('Ingrese una categoría válida.', 'error'); return; } // validación básica

  const idEdicion = inputCategoriaId.value ? Number(inputCategoriaId.value) : null; // si hay id, es edición

  // Si es edición: actualizo el objeto correspondiente
  if (idEdicion) {
    // verifico duplicados (salvo el propio)
    if (categorias.some((c) => c.nombre === nombre && c.id !== idEdicion)) { mostrarMensaje('La categoría ya existe.', 'error'); return; }
    categorias = categorias.map((c) => (c.id === idEdicion ? { ...c, nombre, descripcion } : c)); // actualizo array
    guardarCategorias(); // persisto
    renderizarCategorias(); // vuelvo a renderizar
    limpiarForm(); // limpio form
    mostrarMensaje('Categoría actualizada.', 'success'); // feedback
    return; // terminar
  }

  // Si no es edición: agrego nueva categoría con id único
  if (categorias.some((c) => c.nombre === nombre)) { mostrarMensaje('La categoría ya existe.', 'error'); return; } // duplicado
  const nuevoId = categorias.length ? Math.max(...categorias.map((c) => c.id)) + 1 : 1; // calculo nuevo id
  categorias.push({ id: nuevoId, nombre, descripcion }); // agrego objeto
  guardarCategorias(); // persisto
  renderizarCategorias(); // renderizo
  limpiarForm(); // limpio form
  mostrarMensaje('Categoría agregada correctamente.', 'success'); // mensaje
}

// Borra una categoría por id
function borrarCategoria(id) {
  categorias = categorias.filter((c) => c.id !== id); // quito la categoría del array
  guardarCategorias(); // persisto cambios
  renderizarCategorias(); // renderizo de nuevo
  // si estaba en edición la categoría borrada, limpio el form
  if (Number(inputCategoriaId.value) === id) { limpiarForm(); }
  mostrarMensaje('Categoría borrada.', 'success'); // mensaje
}

// Pone la UI en modo edición llenando el formulario con la categoría seleccionada
function setEdicion(id) {
  const cat = categorias.find((c) => c.id === id); // busco la categoría por id
  if (!cat) return; // si no existe, salgo
  inputCategoriaId.value = String(cat.id); // seteo id oculto
  textAgregarCategoria.value = cat.nombre; // lleno el nombre
  inputDescripcion.value = cat.descripcion || ''; // lleno descripción
  selectCategorias.value = String(cat.id); // seteo el select en la cat elegida
  textAgregarCategoria.focus(); // foco en el input nombre
}

// Limpia el formulario y resetea el estado de edición
function limpiarForm() {
  inputCategoriaId.value = ''; // limpio id oculto
  textAgregarCategoria.value = ''; // limpio nombre
  inputDescripcion.value = ''; // limpio descripción
  selectCategorias.value = ''; // seteo select a nueva categoría
  textAgregarCategoria.focus(); // vuelvo a poner foco
}

// Cuando el usuario cambia la opción del select, autocompleta o limpia el formulario
selectCategorias.addEventListener('change', () => {
  const val = selectCategorias.value; // obtengo valor
  if (!val) { limpiarForm(); return; } // si es nueva categoría, limpio
  const id = Number(val); // convierto a número
  setEdicion(id); // lleno form con la categoría seleccionada
});

// Asociaciones de eventos: submit del formulario y cancelar edición
formCategoria.addEventListener('submit', agregarOActualizarCategoria); // submit -> agrega o actualiza
buttonCancel.addEventListener('click', limpiarForm); // cancelar -> limpiar form

// Render inicial al cargar la página
renderizarCategorias(); // muestra la lista y rellena select al inicio





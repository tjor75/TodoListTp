const nuevaTareaForm = document.getElementById("nuevaTareaForm");
const nuevaTareaInput = document.getElementById("nuevaTareaInput");
const tareas = [];
const listaDeTareas = document.getElementById("listaDeTareas");

function enviarNuevaTarea() {
    
}
function agregarTareaLista(tarea) {
    const nuevoElemento = document.createElement("li");
    nuevoElemento.innerHTML = `${tarea.nombre}`;
    listaDeTareas.appendChild(nuevoElemento);
}
function agregarTarea() {
    const tarea = {
        fechaCreacion: new Date(),
        fechaCompletado: null,
        nombre: nuevaTareaInput.value
    };


    if (nuevaTareaInput.value !== "") {
        agregarTareaLista(tarea);
    
        nuevaTareaInput.value = "";
    }
}

function listarTareas() {
    
}

function eliminarTarea(pos) {
    
}

function vaciar() {
    
}

nuevaTareaForm.addEventListener("submit", evento => {
    evento.preventDefault();
    agregarTarea();
});
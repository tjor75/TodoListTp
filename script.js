const nuevaTareaForm = document.getElementById("nuevaTareaForm");
const nuevaTareaInput = document.getElementById("nuevaTareaInput");
const tareasUl = document.getElementById("tareasUl");
let tareas = [];
let ultimoTid;

function agregarTareaLi(tarea) {
    const nuevoElemento = document.createElement("li");
    nuevoElemento.innerHTML = `${tarea.nombre}`;
    nuevoElemento.setAttribute("tid", tarea.tid);
    tareasUl.appendChild(nuevoElemento);
}

function agregarTarea() {
    let tarea;

    if (nuevaTareaInput.value !== "") {
        ultimoTid++;

        tarea = {
            tid: ultimoTid,
            fechaCreacion: new Date(),
            fechaCompletado: null,
            nombre: nuevaTareaInput.value
        };

        tareas.push(tarea);
        agregarTareaLi(tarea);
        nuevaTareaInput.value = "";
    }
}

function listarTareas() {
    
}

function eliminarTarea(pos) {
    
}

function vaciar() {
    tareas = [];
    tareasUl.innerHTML = "";
}

nuevaTareaForm.addEventListener("submit", evento => {
    evento.preventDefault();
    agregarTarea();
});
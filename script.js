const nuevaTareaForm = document.getElementById("nuevaTareaForm");
const nuevaTareaInput = document.getElementById("nuevaTareaInput");
const tareasUl = document.getElementById("tareasUl");
let tareas = [];
let ultimoTid;


function cargarBackup() {
    let doNew = false;
    try {
        tareas = JSON.parse(localStorage.getItem("tareas"));
        ultimoTid = parseInt(localStorage.getItem("ultimoTid"));
        doNew = tareas === null || isNaN(ultimoTid);
    } catch (e) {
        console.log("No se puede cargar un backup. Creando una nueva lista.");
        doNew = true;
    } finally {
        if (doNew) {
            tareas = [];
            ultimoTid = 0;
        }
    }
}
function guardarBackup() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
    localStorage.setItem("ultimoTid", ultimoTid);
}


function agregarTareaLi(tarea) {
    const li = document.createElement("li");
    li.innerHTML = `
        <p>${tarea.nombre}</p>
        <button onclick="eliminarTarea(${tarea.tid})">🗑</button>
    `;
    tareasUl.appendChild(li);
}
function agregarTodasTareasLi() {
    for (const tarea of tareas)
        agregarTareaLi(tarea);
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
        guardarBackup();

        nuevaTareaInput.value = "";
    }
}

function eliminarTarea(tid) {
    const pos = tareas.findIndex(tarea => tid === tarea.tid);
    tareas.splice(pos, 1);
    tareasUl.removeChild(tareasUl.children[pos]);
    guardarBackup();
}

function vaciar() {
    tareas = [];
    tareasUl.innerHTML = "";
    localStorage.removeItem("tareas");
}


cargarBackup();
agregarTodasTareasLi();


nuevaTareaForm.addEventListener("submit", evento => {
    evento.preventDefault();
    agregarTarea();
});
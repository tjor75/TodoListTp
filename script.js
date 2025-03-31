const nuevaTareaForm = document.getElementById("nuevaTareaForm");
const nuevaTareaInput = document.getElementById("nuevaTareaInput");
const tareasUl = document.getElementById("tareasUl");
let tareas = [];
let ultimoTid;


function cargarBackup() {
    let doNew = false;
    try {
        tareas = JSON.parse(localStorage.getItem("tareas"));
        tareas = tareas.map(tarea => {
            if (tarea.fechaCreacion !== null)
                tarea.fechaCreacion = new Date(tarea.fechaCreacion);
            if (tarea.fechaCompletado !== null)
                tarea.fechaCompletado = new Date(tarea.fechaCompletado);
            return tarea;
        });

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
    const input = document.createElement("input");
    const p = document.createElement("p");
    const btnRemover = document.createElement("button");

    input.type = "checkbox";
    if (tarea.fechaCompletado !== null)
        input.setAttribute("checked", "");
    input.addEventListener("change", () => {
        if (tarea.fechaCompletado === null)
            tarea.fechaCompletado = new Date();
        else
            tarea.fechaCompletado = null;
        guardarBackup();
    });

    p.innerHTML = `${tarea.nombre}`;
    
    btnRemover.innerText = "🗑";
    btnRemover.onclick = () => eliminarTarea(tarea.tid);

    li.appendChild(input);
    li.appendChild(p);
    li.appendChild(btnRemover);
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
function eliminarTareasCompletadas() {
    for (const tarea of tareas)
        if (tarea.fechaCompletado !== null)
            eliminarTarea(tarea.tid);
}

function vaciar() {
    tareas = [];
    tareasUl.innerHTML = "";
    localStorage.removeItem("tareas");
}

function mostrarTareaMasRapida() {
    const tareasCompletadas = tareas.filter(tarea => tarea.fechaCompletado !== null);
    let difTiempo;
    let difTiempoMasRapida = Number.MAX_VALUE;
    let masRapida;

    if (tareasCompletadas.length !== 0) {
        for (const tarea of tareasCompletadas) {
            console.log(tarea);
            difTiempo = tarea.fechaCompletado - tarea.fechaCreacion;
            if (difTiempo < difTiempoMasRapida) {
                difTiempoMasRapida = difTiempo;
                masRapida = tarea;
            }
        }
    
        alert(`La tarea más rápida es ${masRapida.nombre} con ${difTiempoMasRapida / 1000}s`);
    } else {
        alert("No hay tareas completadas");
    }
}

function filtrar(modo) {
}


cargarBackup();
agregarTodasTareasLi();


nuevaTareaForm.addEventListener("submit", evento => {
    evento.preventDefault();
    agregarTarea();
});
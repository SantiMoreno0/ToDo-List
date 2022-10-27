const input = document.querySelector(".input");
const enviar = document.querySelector(".btn-enviar");
const tabla = document.querySelector(".lista");
const completar = document.getElementById("completado");

function crearObjetivo(objetivo) {
    return fetch("http://localhost:3000/perfil", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({objetivo, id: uuid.v4()})
    })
}

function eliminarObjetivo(id) {
    return fetch(`http://localhost:3000/perfil/${id}`, {
        method: "DELETE"
    })
}

function listaObjetivos() {
    return fetch("http://localhost:3000/perfil").then((respuesta) => respuesta.json())
}

function crearNuevaLinea(objetivo, id) {
    const linea = document.createElement("li");
    const contenido = `
    <li class="objetivo">
    <span class="tituloObj">${objetivo}</span>
    <i id="${id}" class="fa-solid fa-check  completado"></i>
    <i id="${id}"class="fa-solid fa-trash-can  borrar"></i>
    </li>
    `;
    linea.innerHTML = contenido;

    const borrar = linea.querySelector(".borrar");
    borrar.addEventListener("click", function (e) {
        e.preventDefault();
        let objetivoSeleccionado = e.target.id;
        eliminarObjetivo(objetivoSeleccionado);
    })

    const completar = linea.querySelector(".completado");
    completar.addEventListener("click", function (e) {
        let li = e.target.parentElement.firstElementChild;
        console.log(li.innerHTML)
        li.style.textDecoration = "line-through";
        li.style.opacity = "0.9"

    }
    )

    return linea;

}

listaObjetivos().then(function (data) {
    data.forEach(function ({ objetivo, id  }) {
        const nuevaLinea = crearNuevaLinea(objetivo, id);
        tabla.appendChild(nuevaLinea);
    })
})

enviar.addEventListener("click", function (e) {
    e.preventDefault();
    let objetivo = input.value;
    console.log(input.value);
    if (objetivo.length > 0) {
        crearObjetivo(objetivo);    
    }
})

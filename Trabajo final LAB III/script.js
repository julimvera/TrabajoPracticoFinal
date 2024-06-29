const apiUrl = `https://api.yumserver.com/16472/products`;

//elementos del DOM
const tablaDeProductos = document.getElementById('tablaDeProductos');
const frmNuevoProducto = document.getElementById('frmNuevoProducto');
const frmModificarProducto = document.getElementById('frmModificarProducto');
const tituloProducto = document.getElementById('tituloProducto');
const precioPesoProducto = document.getElementById('precioPesoProducto');
const precioDolarProducto = document.getElementById('precioDolarProducto');
const fechaProducto = document.getElementById('fechaProducto');


//Inicializa la tabla de productos al cargar la página
if (window.location.pathname.endsWith('index.html')) {
    obtenerProductos();
}

//Obtiene los productos de la API
function obtenerProductos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            mostrarProductos(data);
        })
        .catch(error => console.error('Error:', error));
}


//Carga los productos en la tabla
function mostrarProductos(productos) {
    const tbody = document.getElementById('tbodyProductos');
    tbody.innerHTML = '';
    productos.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.idcod}</td>
            <td>${producto.titulo}</td>
            <td>${producto.precioPeso}</td>
            <td>${producto.precioDolar}</td>
            <td>${producto.fecha}</td>
            <td>
                <button onclick="editarProducto('${producto.idcod}')">Editar</button>
                <button onclick="eliminarProducto('${producto.idcod}')">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Manejar el envío del formulario para crear un nuevo producto


document.getElementById('btnGuardar').addEventListener('click', function() {
    let producto = {
        titulo: document.getElementById('tituloProducto').value,
        precioPeso: document.getElementById('precioPesoProducto').value,
        precioDolar: document.getElementById('precioDolarProducto').value,
        fecha: document.getElementById('fechaProducto').value,
    };
    
    // Solicitar a la API cargar los datos del nuevo producto
    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(producto)
    })
    .then(response => response.text())
    .then(function(texto) {
        if (texto.trim() === "OK") {
            alert('Se creó el producto con éxito.');
            window.location.href = 'index.html'; 
        } else {
            alert(texto);
        }
    })
    .catch(error => console.error('Error:', error));
});


//ELIMINA UN PRODUCTO DE LA API PREGUNTANDO CONFIRMACION
function eliminarProducto(id) {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (!confirmacion) return;

    fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idcod: id })
    })
        .then(response => response.text())
        .then(data => {
            if (data === 'OK') {
                alert('Producto eliminado correctamente');
                obtenerProductos();
            } else {
                alert(`Error: ${data}`);
            }
        })
        .catch(error => console.error('Error:', error));
}



//Abre la ventana para modificar un producto
function editarProducto(id) {
    window.open(`modificar.html?id=${id}`, '_blank');
}

//Manejar el envío del formulario para modificar un producto

   



// Función para cargar los datos del producto a modificar en modificar.html
function cargarDatosProducto(id) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    fetch(`${apiUrl}/${productId}`)
    .then(response => response.json())
    .then(producto => {
        document.getElementById('idcod').value = producto.idcod;
        document.getElementById('tituloProducto').value = producto.titulo;
        document.getElementById('precioPesoProducto').value = producto.precioPeso;
        precioDolarProducto.value = producto.precioDolar;
        fechaProducto.value = producto.fecha;
    })
    .catch(error => console.error('Error:', error));

   
   
}

// Función para modificar un producto en la API
function modificarProducto(producto) {
    fetch(`${apiUrl}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        return response.text(); 
    })
    .then(data => {
        if (data === 'OK') {
            alert('Producto modificado correctamente');
            window.location.href = 'index.html'; 
        } else {
            alert('Hubo un error al modificar el producto: ' + data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al modificar el producto.');
    });
}



























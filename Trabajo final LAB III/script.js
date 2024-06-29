const apiUrl = `https://api.yumserver.com/16472/products`;

const tablaDeProductos = document.getElementById('tablaDeProductos');
const frmNuevoProducto = document.getElementById('frmNuevoProducto');
const frmModificarProducto = document.getElementById('frmModificarProducto');
const tituloProducto = document.getElementById('tituloProducto');
const precioPesoProducto = document.getElementById('precioPesoProducto');
const precioDolarProducto = document.getElementById('precioDolarProducto');
const fechaProducto = document.getElementById('fechaProducto');


if (window.location.pathname.endsWith('index.html')) {
    obtenerProductos();
}

function obtenerProductos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            mostrarProductos(data);
        })
        .catch(error => console.error('Error:', error));
}


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

document.getElementById('btnGuardar').addEventListener('click', function() {
    let producto = {
        titulo: document.getElementById('tituloProducto').value,
        precioPeso: document.getElementById('precioPesoProducto').value,
        precioDolar: document.getElementById('precioDolarProducto').value,
        fecha: document.getElementById('fechaProducto').value,
    };
    
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

function editarProducto(id) {
    window.open(`modificar.html?id=${id}`, '_blank');
}






























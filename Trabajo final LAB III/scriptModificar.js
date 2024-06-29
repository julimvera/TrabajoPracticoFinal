const apiUrl = 'https://api.yumserver.com/16472/products';

const urlParams = new URLSearchParams(window.location.search);
const idProducto = urlParams.get('id');

//OBTENGO LOS DETALLES DEL PRODUCTO A MODIFICAR
fetch(`${apiUrl}/${idProducto}`)
.then(response => {
    if (!response.ok) {
        throw new Error('No se pudo obtener el producto');
    }
    return response.json();
})
.then(producto => {
    //LE ASIGNO LOS VALORES EN LOS CAMPOS DE TEXTO.
    document.getElementById('tituloProducto').value = producto.titulo;
    document.getElementById('precioPesoProducto').value = producto.precioPeso;
    document.getElementById('precioDolarProducto').value = producto.precioDolar;
    document.getElementById('fechaProducto').value = producto.fecha;
})
.catch(error => {
    console.error('Error:', error);
    alert('Error al obtener los datos del producto');
});


document.getElementById('btnGuardarModificado').addEventListener('click', function() {
    const id = idProducto;
    const nuevoTitulo = document.getElementById('tituloProducto').value;
  //CONVERTIR FECHA EN AÑO-MES-DIA"
    const fechaInput = document.getElementById('fechaProducto').value;
    const fechaPartes = fechaInput.split('-'); 
    const anio = fechaPartes[0]; 
    const mes = fechaPartes[1]; 
    const dia = fechaPartes[2]; 
    const nuevaFecha = `${anio}-${mes}-${dia}`;
    const nuevoPesos = document.getElementById('precioPesoProducto').value;
    const nuevoDolar = document.getElementById('precioDolarProducto').value;

 //ARMO EL OBJETO CON DATOS ACTUALIZADOS.
    const datosActualizados = {
    idcod : id,
    titulo: nuevoTitulo, 
    precioPeso: nuevoPesos,
    precioDolar: nuevoDolar,
    fecha: nuevaFecha
    };
  //VERIFICAR QUE SE COMPLETEN TODOS LOS DATOS
    if (nuevoTitulo === '' || fechaInput === '' || nuevoPesos === '' || nuevoDolar === '') {
    alert('Debes completar todos los datos del producto.');
    return;
    }

  //ENVIO LA SOLICITUD A LA API PARA MODIFICAR.
    fetch(apiUrl, {
       method: 'PATCH',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(datosActualizados)
    })
    .then(response => {
    console.log(datosActualizados)
    if (!response.ok) {
    throw new Error('Error al actualizar el producto');
    }
      alert('Producto actualizado exitosamente');
      window.location.href = 'index.html'; 
    })
    .catch(error => {
    console.error('Error al actualizar el producto:', error);
    });
})



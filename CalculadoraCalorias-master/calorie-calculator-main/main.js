// capturar formulario
const formularioCalculadora = document.getElementById('formulario-calculadora');
const resultado = document.getElementById('resultado');

formularioCalculadora.addEventListener('submit', (evento) => {
    // eliminar el comportamiento de los eventos
    evento.preventDefault();
    calcularCalorias();
});


function calcularCalorias() {
    aparecerResultado();
    const tipodocumento = document.querySelector('#tdocumento');
    const ndocumento = document.querySelector('#documento');
    const nombre = document.querySelector('#nombre');
    const edad = document.querySelector('#edad');
    const peso = document.querySelector('#peso')
    const altura = document.querySelector('#altura');
    const actividad = document.querySelector('#actividad');
    const genero = document.querySelector('input[name="genero"]:checked');

    //validaciones tempranas
    if (!(edad.value && peso.value && altura.value)) {
        mostrarMensajeDeError('por favor complete todos los cambios');
        return
    }

    //grupo poblacional

   if(parseInt(edad.value) >=15 && parseInt(edad.value) <= 29 )
   {
     alert("Eres joven");
   }else if(parseInt(edad.value) <= 59)
   {
     alert("Eres adulto");
   }else{
     alert("Eres adulto mayor");
   }
   

    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    }
    
    var tipodocu = tipodocumento.value;
    var documento = ndocumento.value;
    var nombrep = nombre.value;
    let calculoCalorias;
    let producto = actividad.value * (multiplicadorTMB.peso * peso.value) +
             (multiplicadorTMB.altura * altura.value) - (multiplicadorTMB.edad * edad.value);

    calcularCalorias = (genero.id=='femenino')?producto-161:producto+5;

    //calcularCalorias = (genero.id=='masculino')?producto-161:producto-5;
 
    
    //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5

    //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161


    // totalCalorias.value = `${Math.floor(calculoCalorias)} kcal`;

    resultado.innerHTML = `
    <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
     <div class="card" style="width: 18rem;">
  
        <div class="card-body">
            <h5 class="card-title text-center">Calorias</h5>
                <p class="card-text text-justify">El paciente: ${nombrep} identificado con ${tipodocu}
                   NO.${documento},requiere un total de:  ${Math.floor(calcularCalorias)} kcal para el sostenimiento de su TBM"
                </p>
        
        </div>
     </div>
    </div>
    `
    // Volver a limpiar variables

}

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';

    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}
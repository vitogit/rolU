let focuses = [
  'Evento lejano puede afectar al protagonista',
  'Aparece un nuevo personaje',
  'Algo bueno pasa',
  'Algo malo pasa',
  'Algo malo le pasa al protagonista',
  'Algo malo le pasa a un aliado',
  'Algo bueno le pasa a un aliado',
  'Algo bueno le pasa al enemigo',
  'Avanza la trama',
  'Se cierra o abre alguna trama',
  'Obstaculo, cambio de enfoque'
]
let actions = [
'Obtener',
'Comenzar',
'Luchar',
'Ganar',
'Defender',
'Comunicar',
'Aumentar',
'Disminuir',
'Abandonar',
'Preguntar',
'Mover',
'Confiar',
'Desconfiar',
'Separar',
'Romper',
'Detener',
'Ayudar',
'Mentir',
'Informar',
'Liberar',
'Retener',
'Desarrollar',
'Traicionar',
'Robar',
'Dividir',
'Abrir',
'Cerrar',
'Controlar',
'Fallar',
'Cambiar',
]

let subjects = [
'Objetivo',
'Territorio',
'Realidad',
'Aliados',
'Enemigos',
'El mal',
'El bien',
'Guerra',
'Paz',
'Inocente',
'Mente',
'Espiritu',
'Fisico',
'Ideas',
'Mensaje',
'Energia',
'Proyecto',
'Planes',
'Negocios',
'Caminos',
'Competencia',
'Atencion',
'Viaje',
'Hogar',
'Tacticas',
'Estrategias',
'Suerte',
'Poder',
'Heridas',
'Lo extraño',
'Lo oculto',
'La libertad',
'Lo común',
'La masa',
'Armas',
'Peligro',
'Clima',
]

function randArray(myArray) {
 return myArray[Math.floor(Math.random() * myArray.length)];
}

export function randomEvent() {

  var focus = randArray(focuses);
  var action = randArray(actions);
  var subject = randArray(subjects);

  var el =  "";
  el += "<b>Foco:</b> "+focus+"<br>";
  el += "<b>Accion:</b> "+action+"<br>";
  el += "<b>Sujeto:</b> "+subject+"<br>";

  return el;
}

export function complexQuestion() {

  var focus = randArray(focuses);
  var action = randArray(actions);
  var subject = randArray(subjects);

  var el =  "";
  el += "<b>Respuesta:</b> "+action+"/"+subject+"<br>";

  return el;
}

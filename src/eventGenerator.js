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

let places = [
  'Lago',
  'Calle',
  'Barrio pobre',
  'Barrio rico',
  'Bosque',
  'Ruinas',
  'Parque',
  'Colinas',
  'Casa',
  'Puente',
  'Centro',
  'Cueva',
  'Campamento',
  'Campo',
  'Lago',
  'Pantano',
  'Fabrica',
  'Empresa',
  'Oficina',
  'Cementerio',
  'Laboratorio',
  'Hospital',
  'Academia',
  'Apartamento',
  'Mercado',
  'Parada',
  'Iglesia',
  'Monumento',
  'Libreria',
  'Museo',
  'Galeria',
  'Teatro',
  'Restaurant',
  'Tienda',
  'Aeropuerto',
  'Banco',
  'Subte',
]

let adjective = [
'Aburrido',
'Alegre',
'Alto',
'Bajo',
'Claro',
'Oscuro',
'Caliente',
'Frio',
'Bueno',
'Malo',
'Duro',
'Blando',
'Fuerte',
'Debil',
'Facil',
'Dificil',
'Exterior',
'Interior',
'Falso',
'Fresco',
'Grande',
'Chico',
'Humedo',
'Seco',
'Imosible',
'Util',
'Inutil',
'Joven',
'Viejo',
'Antiguo',
'Lento',
'Rapido',
'Masivo',
'Diminuto',
'Vivo',
'Muerto',
'Natural',
'Pobre',
'Rico',
'Pobre',
'Raro',
'Extranio',
'Real',
'Brillante',
'Palido',
'Sano',
'Enfermo',
'Corrupto',
'Aislado',
'Triste',
'Desaolado',
'Verde',
'Anormal',
'Abandonado',
'Colosal',
'Oculto',
'Siniestro',
'Escondido',
'Complejo',
'Simple',
'Derruido',
'Roto',
'Desolado',
'Asqueroso',
'Calmo',
'Abierto',
'Hermoso',
'Sucio',
'Limpio',
'Clasico',
'Espeluznante',
'Normal',
'Delicado',
'Desagradable',
'Vacio',
'Exotico',
'Familiar',
'Historico',
'Horrible',
'Valioso',
'Importante',
'Podido',
'Divertido',
'Aromatico',
'Luminoso',
'Macabro',
'Glorioso',
'Peligroso',
'Pacifico',
'Agresivo',
'Calmo',
'Festivo',
'Eterno',
'Majestuoso',
'Imponente',
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

export function place() {

  var a1 = randArray(places);

  var el =  "";
  el += "<b>Lugar:</b> "+a1+"<br>";

  return el;
}

export function complexDescription() {

  var a1 = randArray(adjective);
  var a2 = randArray(adjective);

  var el =  "";
  el += "<b>Descripcion:</b> "+a1+"/"+a2+"<br>";

  return el;
}

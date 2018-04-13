let goals = [
  'Ganar o competir ',
  'Detener algo/alguien',
  'Entregar algo ',
  'Llegar a algun lugar',
  'Encontrar/Obtener algo concreto (objeto, persona)',
  'Encontrar/Obtener algo abstracto (admiracion, amor, informacion)',
  'Escapar de algo fisico (prision, dolor)',
  'Escapar de algo mental (preocupacion, miedo, sospechas)',
  'Escapar de algo emocional (depresion, soledad)'
]

let sceneExtra = [
  'Mover al personaje hacia su objetivo final',
  'Dar una experiencia que cambie el objetivo',
  'Dar una experiencia que cambie aumente su motivacion',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
]

let actions = [
  'Buscar informacion',
  'Esconder informacion',
  'Esconderse',
  'Esconder a alguien/algo',
  'Atacar o confrontar a alguien/algo',
  'Reparar o destruir objeto',

]

let conflicts = [
  'Oposicion directa: personaje, clima, etc interfiere en conseguir el objetivo',
  'Oposicion interna: el protagonista aprende algo que cambia su postura respecto al objetivo',
  'Dificultad pasajera: no tiene lo que necesita, no lo encuentra, etc',
  'Conflicto activo: pelea, discusion',
  'Conflicto pasivo: lo ignoran, lo evitan, etc',
]

let conflictsMore = [
  'Altercado fisico',
  'Altercado verbal',
  'Obstaculo fisico: clima, puente roto, camino bloqueado, lastimado',
  'Obstaculo mental: Miedo, amnesia',
  'Falta algo fisico: Necesita algo especifico',
  'Pasivo agresivo: Intencional o no',
  'Interferencia indirecta: de larga distancia, no intencional de otro personaje',
]

let disasters = [
  'Enfrentamiento directo: El personaje busca algo que el antagonista no quiere dar',
  'Enfrentamiento indirecto: El personaje se desvia o es desviado de su objetivo',
  'Enfrentamiento parcial: El personaje obtiene solo una parte de lo que busca',
  'Victoria vacia: El personaje obtiene lo que queria pero se da cuenta que es algo malo',
  'No, y',
  'Si, pero',
]

let disastersMore = [
  'Muerte',
  'Herida',
  'Herida emocional',
  'Descubre informacion perjudicial',
  'Comete un error imperdonable',
  'Se pone en peligro',
  'Pone en peligro a alguien mas',
  'Pierde algo importante',
  'Tiene un alto costo',
]

let reactions = [
  'Furia',
  'Ira',
  'Confusion',
  'Desesperacion',
  'Panico',
  'Culpa',
  'Shock',
  'Terror',
  'Euforia',
]

let triggers = [
  'Desacuerdo',
  'Cambio inesperado',
  'Cambio catastrofico',
  'Crisis',
  'Serie de crisis',
  'Diferencia de opinion',
  'Diferencia de temperamentos',
  'Diferencia de objetivos',
  'Diferencia de temperamentos',
  'Diferencia de creencias',
  'Diferencia de como resolver las cosas',
  'Diferencia de habitos',
  'Diferencia de conocimientos o informacion',
  'Diferencia de gustos',
]


function randArray(myArray) {
 return myArray[Math.floor(Math.random() * myArray.length)];
}

export default function generate() {

  var goal = randArray(goals);
  var action = randArray(actions);
  var conflict = randArray(conflicts);
  var conflictMore = randArray(conflictsMore);
  var disaster = randArray(disasters);
  var disasterMore = randArray(disastersMore);
  var trigger = randArray(triggers);
  var extra = randArray(sceneExtra);
  var reaction = randArray(reactions);




  var el =  "";
  el += "<b>Objetivo:</b> "+goal+"<br>";
  el += "<b>Accion:</b> "+action+"<br>";
  el += "<b>Conflicto:</b> "+conflict+"<br>";
  el += "<b>Nivel conflicto:</b> "+conflictMore+"<br>";
  el += "<b>Trigger:</b> "+trigger+"<br>";
  el += "<b>Desastre:</b> "+disaster+"<br>";
  el += "<b>Nivel Desastre:</b> "+disasterMore+"<br>";
  el += "<b>Reaction:</b> "+reaction+"<br>";
  el += "<b>Extra:</b> "+extra+"<br>";

  return el;
}

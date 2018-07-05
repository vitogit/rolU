<template>
  <div id="bagapp">
    <div>
      <header class="has-text-centered">
        <h1 class="title">
          Bolsas con cosas
        </h1>
        <p class="subtitle">
          Agrega, remueve y saca cosas de bolsas virtuales.
        </p>
      </header>
      <div style="padding-left:30px">
        <a @click="addBag">
            <b-icon
            pack="fa"
            icon="plus-square"
            size="is-large"
            >
            </b-icon>
        </a>
      </div>
      <br>
      <div>
        <bag
          class ="bag"
          @onRemove="removeBag(bag.number)"
          :name="bag.name"
          :items="bag.items"
          v-for="(bag, index) in bags"
          :key="index"/>
      </div>
    </div>
  </div>
</template>

<script>
import bag from './Bag.vue'

const STORAGE_KEY = 'rolu_bag_of_many_things'
const itemStorage = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    todos.forEach((todo, index) => {
      todo.id = index
    })
    itemStorage.uid = todos.length
    return todos
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
};

export default {
  name: 'bagApp',
  components: {bag},
  data () {
    let fetched = itemStorage.fetch()
    let defaultBags = [
                       {name:'Movimientos: Master', items:[
                          {name:'Aislar'},
                          {name:'Capturar aliado'},
                          {name:'Capturar protagonista'},
                          {name:'Poner alguien en peligro'},
                          {name:'Entrever un enemigo futuro'},
                          {name:'Entrever un peligro futuro'},
                          {name:'Quitar algo'},
                          {name:'Utilizar sus ventajas como desventajas'},
                          {name:'Ofrecer una oportunidad con un costo'},
                          {name:'Esto tendrá consecuencias. Lo haces?'},
                          {name:'Utilizar su movimiento en su contra'},
                          {name:'Enfrentarse al peligro'},
                          {name:'Causar daño'},
                          {name:'Mostrar pruebas u objeto util'},
                          {name:'Mover recursos para cambiar la situación'},
                          {name:'Activar movimiento de la localización'},
                          {name:'Activar movimiento de la situación'},
                          {name:'Activar movimiento del peligro latente o enemigo'},
                          {name:'Activar movimiento global: Poder, Multitud, Territorio, Extraño'},
                          {name:'Revelar conocimiento'}], number: 3},
                       {name:'Movimientos: Poderoso', items:[
                          {name:'Aislar, encerrar'},
                          {name:'Atacar brutalmente'},
                          {name:'Atacar sigilosamente'},
                          {name:'Intimidar'},
                          {name:'Mostrar su fuerza'},
                          {name:'Negociar: demandar obediencia'},
                          {name:'Negociar: buscar alianza o sobornar'},
                          {name:'Comprar un aliado'},
                          {name:'Buscar la debilidad y atacarla'},
                          {name:'Revelar un plan profundo'},
                          {name:'Reclamar el territorio'}],number: 4},
                       {name:'Movimientos: Multitud', items:[
                          {name:'Explotar en violencia descontrolada'},
                          {name:'Coordinar un ataque'},
                          {name:'Contar una historia. Tirar rumores.'},
                          {name:'Seguir ciegamente u oponerse a la autoridad'},
                          {name:'Mostrar su poder'},
                          {name:'Pedir ayuda'},
                          {name:'Ofender o insultar a alguien poderoso'},
                          {name:'Caputar algo o a alguien poderoso'},
                          {name:'Destruir algo o a alguien poderoso'},
                          {name:'Reclamar algo que les pertenece'}],number: 5},
                       {name:'Movimientos: Territorio', items:[
                          {name:'Revelar algo importante'},
                          {name:'Mostrar algo para que todos vean'},
                          {name:'Esconder algo'},
                          {name:'Cortar la entrada o dificultarla'},
                          {name:'Ofrecer guia'},
                          {name:'Presentar a su guardian'},
                          {name:'Crecer o cambiar'},
                          {name:'Conseguir o romper un objeto '}],number: 6},
                       {name:'Movimientos: Extraño', items:[
                          {name:'Revelar lo extraño y terrible del mundo'},
                          {name:'Develar su secreto'},
                          {name:'Atacar por detras'},
                          {name:'Atacar de frente'},
                          {name:'Provocar, insultar a alguien'},
                          {name:'Ofrecer algo con un alto costo'},
                          {name:'Robar algo importante'},
                          {name:'Raptar a alguien'},
                          {name:'Corromper algo o alguein'},
                          {name:'Interponerse en el camino '}],number: 7},
                       {name:'Ayuda: Si o No?', items:[
                          {name:'Si y además'},
                          {name:'Si, pero'},
                          {name:'Si'},
                          {name:'No'},
                          {name:'No, pero'},
                          {name:'No, y además'},
                        ],number: 8},
                       {name:'Ayuda: Lugar', items:[
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
                        ],number: 9},
                       {name:'Ayuda: Que pasa?', items:[
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
                      ],number: 10},
                       {name:'Sujeto', items:[
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
                      ],number: 11},
                       {name:'Accion', items:[
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
                      ],number: 12},
                       {name:'Ayuda: Descripciones 2', items:[
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
                        'Imponente'
                      ],number: 13},
                       {name:'Ayuda: Accion & Sujeto', items:[
                      ],number: 14},
                       {name:'Mazo: Lovecraft', items:[
                          "Personaje: Monstruo marino (Dagon)",
                          "Objeto: Necronomicon",
                          "Acontecimiento: Ritual de sacrificio",
                          "Lugar: Ruinas civilización antigua",
                          "Personaje: Gente Pez",
                          "Detalle: Branquias",
                          "Lugar: Garganta profunda",
                          "Lugar: En el fondo del mar",
                          "Aspecto: Pagano",
                          "Objeto: Símbolo Arcano",
                          "Lugar: Faro",
                          "Personaje: Arqueólogo",
                          "Objeto: Arpón",
                          "Lugar: Playa",
                          "Personaje: Párroco local",
                          "Detalle: Temporal (lluvia y viento)",
                          "Aspecto: Cenagoso",
                          "Lugar: Pueblo costero",
                          "Objeto: Barca de pescador",
                          "Acontecimiento: Metamorfosis",
                          "Acontecimiento: Naufragio de un buque",
                          "Personaje: Marinero",
                          "Objeto: Estatuilla",
                          "Acontecimiento: Cefalópodos",
                          "Personaje: Detective",
                          "Aspecto: Gomoso",
                          "Detalle: Ruido de chapoteo",
                          "Personaje: Escritor de novelas de terror",
                          "Detalle: Hombres y mujeres desnudos",
                          "Objeto: Cuchillo",
                          "Lugar: Buhardilla",
                          "Lugar: Vieja mansión",
                          "Personaje: Turista",
                          "Detalle: Oscuridad",
                          "Aspecto: Sangriento",
                          "Lugar: Hotel",
                          "Acontecimiento: Mordisco",
                          "Personaje: Agente de la ley"
                      ],number: 15}
                        ]
    let bags = (fetched.length ? fetched : defaultBags)
    let maxNumber = Math.max(...bags.map(e => e.number))

    return {
      bags: bags,
      number: maxNumber
    }
  },
  methods: {
    addBag() {
      this.number++
      this.bags.push({name:'bag '+this.number, number: this.number})
      this.$eventHub.$emit('mod-bags', this.bags)
    },
    removeBag(number) {
      this.bags = this.bags.filter(e => e.number !== number);
      this.$eventHub.$emit('mod-bags', this.bags)
    },
    save(){
      itemStorage.save(this.bags)
    }
  },
  created() {
    this.$eventHub.$emit('mod-bags', this.bags)
  }
}
</script>

<style>
  .bag {
    margin: 20px;
    width: 45%;
    display: inline-block;
  }
</style>

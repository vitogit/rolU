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
        <button class="button is-info " @click="save()">save</button>
        <button class="button is-info " @click="init()">Load</button>
     
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
          :number="bag.number"
          v-for="(bag, index) in bags"
          :key="index"/>
      </div>
    </div>
  </div>
</template>

<script>
import bag from './Bag.vue'

const STORAGE_KEY = 'rolu_bag_of_many_things'


export default {
  name: 'bagApp',
  components: {bag},
  data () {
    let defaultBags = [
                       {name:'Movimientos: Master', items:[
                          'Aislar',
                          'Capturar aliado',
                          'Capturar protagonista',
                          'Poner alguien en peligro',
                          'Entrever un enemigo futuro',
                          'Entrever un peligro futuro',
                          'Quitar algo',
                          'Utilizar sus ventajas como desventajas',
                          'Ofrecer una oportunidad con un costo',
                          'Esto tendrá consecuencias. Lo haces?',
                          'Utilizar su movimiento en su contra',
                          'Enfrentarse al peligro',
                          'Causar daño',
                          'Mostrar pruebas u objeto util',
                          'Mover recursos para cambiar la situación',
                          'Activar movimiento de la localización',
                          'Activar movimiento de la situación',
                          'Activar movimiento del peligro latente o enemigo',
                          'Activar movimiento global: Poder, Multitud, Territorio, Extraño',
                          'Revelar conocimiento'], number: 3},
                       {name:'Movimientos: Poderoso', items:[
                          'Aislar, encerrar',
                          'Atacar brutalmente',
                          'Atacar sigilosamente',
                          'Intimidar',
                          'Mostrar su fuerza',
                          'Negociar: demandar obediencia',
                          'Negociar: buscar alianza o sobornar',
                          'Comprar un aliado',
                          'Buscar la debilidad y atacarla',
                          'Revelar un plan profundo',
                          'Reclamar el territorio'],number: 4},
                       {name:'Movimientos: Multitud', items:[
                          'Explotar en violencia descontrolada',
                          'Coordinar un ataque',
                          'Contar una historia. Tirar rumores.',
                          'Seguir ciegamente u oponerse a la autoridad',
                          'Mostrar su poder',
                          'Pedir ayuda',
                          'Ofender o insultar a alguien poderoso',
                          'Caputar algo o a alguien poderoso',
                          'Destruir algo o a alguien poderoso',
                          'Reclamar algo que les pertenece'],number: 5},
                       {name:'Movimientos: Territorio', items:[
                          'Revelar algo importante',
                          'Mostrar algo para que todos vean',
                          'Esconder algo',
                          'Cortar la entrada o dificultarla',
                          'Ofrecer guia',
                          'Presentar a su guardian',
                          'Crecer o cambiar',
                          'Conseguir o romper un objeto '],number: 6},
                       {name:'Movimientos: Extraño', items:[
                          'Revelar lo extraño y terrible del mundo',
                          'Develar su secreto',
                          'Atacar por detras',
                          'Atacar de frente',
                          'Provocar, insultar a alguien',
                          'Ofrecer algo con un alto costo',
                          'Robar algo importante',
                          'Raptar a alguien',
                          'Corromper algo o alguein',
                          'Interponerse en el camino '],number: 7},
                       {name:'Ayuda: Si o No?', items:[
                          'Si y además',
                          'Si, pero',
                          'Si',
                          'No',
                          'No, pero',
                          'No, y además',
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
    let bags = defaultBags
    let maxNumber = Math.max(...bags.map(e => e.number))

    return {
      bags: bags,
      number: maxNumber,
      currentFile: {}
    }
  },
  watch: {
    bags: function (newBags) {
      this.$eventHub.$emit('mod-bags', newBags)
    }
  },
  created() {
    this.$eventHub.$on('mod-bag', (newBag) => {
      for (const [index, bag] of this.bags.entries()) {
        if (bag.number == newBag.number) {
          this.bags[index].name = newBag.name
          this.bags[index].items = newBag.items 
          this.$eventHub.$emit('mod-bags', this.bags)
          break
        }
      }
    })
    this.$eventHub.$on('gdrive-loaded', (newBag) => {
      this.init()
    })
    this.$eventHub.$emit('mod-bags', this.bags)
  },
  methods: {
    addBag() {
      this.number++
      this.bags.push({name:'bag '+this.number, number: this.number})
    },
    removeBag(number) {
      this.bags = this.bags.filter(e => e.number !== number);
    },
    save(){
      let self = this
      this.currentFile.content = JSON.stringify(this.bags)
      this.currentFile.name = STORAGE_KEY
      window.driveService.saveFileRaw(self.currentFile, function(file){
        self.currentFile = file
        self.$toast.open({
            message: `Guardado!`,
            type: 'is-success'
        })
      })
    },
    init() {
      window.driveService.listFiles('rolu', this.loadFile)
    },
    loadFile(err, files) {
      if (files) {
        let self = this 
        let tempFile = files[0]
        self.currentFile = tempFile
        driveService.loadFileRaw(tempFile, function(file){
          self.bags = JSON.parse(file.content)
          self.currentFile = file
          let maxNumber = Math.max(...self.bags.map(e => e.number)) 
          self.number = maxNumber
          self.$toast.open({
            message: `Listas cargadas!`,
            type: 'is-success'
          })
        })
      } else {
        console.log("error________")
      }
    }
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

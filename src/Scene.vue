<template>
    <div class="columns ">
      <div class="column is-8">
        <div class="card events-card">
          <header class="card-header">
            <p  class="card-header-title">
              {{name}}
            </p>
          </header>
          <div class="card-content messages-area" ref="messagesArea">
            <p @mouseenter="messageMousePosition = index"  @mouseleave="messageMousePosition = -1" v-for="m, index in messages" style="margin-top:5px">
              <span v-html="m"></span>
              <a  v-show="messageMousePosition == index" @click="messages.splice(index, 1);messageMousePosition=-1">
                  <b-icon
                  pack="fa"
                  icon="times"
                  size="is-small"
                  type="is-info">
                  </b-icon>
              </a>
            </p>
          </div>
          <footer class="card-footer">
            <textarea  @keyup.enter="addMessage"
                       v-model="newMessage"
                       class="textarea is-info"
                       type="text">
            </textarea>
          </footer>
          <footer class="card-footer" style="padding:10px">
            <div class="field">
                <b-dropdown position="is-top-right" hoverable>
                    <button class="button is-info" slot="trigger">
                        <span>Solo</span>
                    </button>
                    <b-dropdown-item  @click="rollMove('solo', index)" v-for="move, index in this.solo" :key="index">{{move['label']}}</b-dropdown-item>
                </b-dropdown>
                <b-dropdown position="is-top-right" hoverable v-for="bag, index in bags">
                    <button class="button is-info" slot="trigger">
                        <span>{{index}}</span>
                    </button>
                    <b-dropdown-item @click="getFromBag(bag)" v-for="bag in bags[index]" :key="bag.number">{{bag.name}}</b-dropdown-item>
                </b-dropdown>

                <b-dropdown position="is-top-right" hoverable>
                    <button class="button is-info" slot="trigger">
                        <span>Jugador</span>
                    </button>
                    <b-dropdown-item  @click="rollMove('moves', index)" v-for="move, index in moves" :key="index">{{move['label']}}</b-dropdown-item>
                </b-dropdown>
                <button class="button is-info" @click="wikiArticle">
                    <span>Wiki</span>
                </button>
                <div class="select">
                  <select v-model="currentModificator">
                    <option v-for="i in range(-3, 3)" v-text="i"></option>
                  </select>
                </div>
            </div>
          </footer>
        </div>
      </div>
      <div class="column is-4">
        <b-collapse class="card">
          <div slot="trigger" slot-scope="props" class="card-header">
              <p class="card-header-title">
                  Personajes
              </p>
              <a class="card-header-icon">
                <b-icon
                    pack="fa"
                    :icon="props.open ? 'angle-down' : 'angle-up'">
                </b-icon>
              </a>
          </div>
          <div class="panel">
            <div class="panel-block">
              <p class="control">
                <input v-model="newCharacter" @keyup.enter="addCharacter" class="input" type="text" placeholder="Agregar Personaje">
              </p>
            </div>
            <a @click="openModal(c)" class="panel-block" v-for="c in characters">
              {{c.name}}
            </a>
          </div>
        </b-collapse>

        <b-collapse class="card">
          <div slot="trigger" slot-scope="props" class="card-header">
              <p class="card-header-title">
                  Escena
              </p>
              <a class="card-header-icon">
                <b-icon
                    pack="fa"
                    :icon="props.open ? 'angle-down' : 'angle-up'">
                </b-icon>
              </a>
          </div>
          <div class="panel">
            <div class="panel-block">
              <p class="control">
                <input v-model="newAspect" @keyup.enter="addAspect" class="input" type="text" placeholder="Agregar aspecto">
              </p>
            </div>
            <a @click="openModal(a)" class="panel-block" v-for="a in aspects">
              {{a.name}}
            </a>
          </div>
        </b-collapse>
      </div>
      <b-modal :active.sync="isModalActive">
       <div class="card">
          <header class="card-header">
            <p class="card-header-title">
               <input v-model="currentElement.name" class="input" type="text" >
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <textarea class="textarea is-info" type="text">{{currentElement.data}}</textarea>
            </div>
          </div>
          <footer class="card-footer">
            <a @click="closeModal()" class="card-footer-item">Grabar</a>
            <a @click="deleteElement(currentElement)" class="card-footer-item">Eliminar</a>
          </footer>
        </div>
      </b-modal>
    </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'scene',
  props: ['name', 'messages'],  
  data () {
    return {
      newMessage: '',
      characters: [],
      aspects: [],
      isModalActive: false,
      currentElement: {},
      bags: {},
      currentModificator: 0,
      messageMousePosition: -1,
      newCharacter: '',
      newAspect: ''
    }
  },
  watch: {
    // whenever messages change, clean input and scroll bottom
    messages: function () {
      this.newMessage = ''
      let ref = this.$refs.messagesArea
      ref.scrollTop = ref.scrollHeight
    }
  },
  methods: {
    addCharacter(event) {
      let name = event.target.value
      if (name == '')
        return
      this.characters.push({name: name, data: ''})
      this.newCharacter = ''
    },
    addAspect(event) {
      let name = event.target.value
      if (name == '')
        return
      this.aspects.push({name: name, data: ''})
      this.newAspect = ''
    },
    addMessage() {
      if (this.newMessage == '')
        return
      this.messages.push(this.newMessage)
    },
    addDialog() {
      if (this.newMessage == '')
        return
      let message = this.addTextStyle(this.newMessage, 'dialog')
      this.messages.push(message)
    },
    openModal(element) {
      this.isModalActive = true
      this.currentElement = element
    },
    closeModal() {
      this.isModalActive = false
      this.currentElement = { name: '', data: '' }
    },
    deleteElement(element) {
      this.currentElement = { name: '', data: '' }
      this.aspects.splice(this.aspects.indexOf(element), 1);
      this.characters.splice(this.characters.indexOf(element), 1);

      console.log('this.aspects', this.aspects)
      console.log('ithis.characters', this.characters)

      this.closeModal() 
    },
    findBag(bagName) {
      console.log('findbag bagname', bagName)
      let bag = {}
      Object.keys(this.bags).forEach(categoryName => {
        let bags = this.bags[categoryName];
        Object.keys(bags).forEach(index => {
          console.log('bags[index].name', bags[index].name)
          if (bagName == bags[index].name) {
            bag = bags[index]
            return
          }
        });
      });
      return bag
    },
    //If bagName is 'bag: black & white' then it will pull 1 thing from the first and 1 thing from the second
    //If bagName is `things 2` it will pull 2 things
    getFromBag(bag) {
      let result = ''
      let count = 1
      let bigBagName = bag.name
      console.log(bigBagName)
      let hasGroup = bigBagName.includes('&')
      if (hasGroup) {
        let bagNames = bigBagName.split(':')[1].split('&')
        for (let bagName of bagNames ) {
          bagName = bigBagName.split(':')[0]+': '+bagName.trim()
          let bag = this.findBag(bagName)
          let element = bag.items[Math.floor(Math.random() * bag.items.length)];
          result += element + ' / '
        }
      } else {
        let hasCounter = bag.name.match(/ \d+$/)
        if (hasCounter) {
          count = hasCounter[0]
        }
        for (let i = 0; i < count; i++) {
          let element = bag.items[Math.floor(Math.random() * bag.items.length)];
          element = element.name || element;
          result += element + ' / '
        }
        result = result.replace(/\/ $/, "");
      }

      if (this.newMessage != '') {
        result = this.newMessage +': '+result
        this.newMessage = ''
      }
      let message = this.addTextStyle(result)
      this.messages.push(message)
    },
    addTextStyle(message, type) {
      if (type == 'dialog') {
        message = `<span style:'padding:10px' class="is-italic">—${message}</span>`
      } else {
        message = `<span class="has-text-primary is-italic has-text-weight-bold is-size-7">${message}</span>`
      }
      return message
    },
    rollDice() {
      let result =  this.randomNumber(6) + this.randomNumber(6) + parseInt(this.currentModificator)
      let message = this.newMessage +' ['+result+']'
      this.newMessage = ''
      message = this.addTextStyle(message)
      this.messages.push(message)
    },
    randomNumber(to) {
      return Math.floor((Math.random() * to) + 1);
    },
    range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
    },
    rollMove(moves, moveName) {
      console.log('moves', moves)
      if (moves == "solo") {
        moves = this.solo
      } else {
        moves = this.moves
      }
      let move = moves[moveName]
      let dice1 = this.randomNumber(6)
      let dice2 = this.randomNumber(6)
      let result =  dice1 + dice2 + parseInt(this.currentModificator)
      let message = `[${dice1}, ${dice2}]+${parseInt(this.currentModificator)} = ${result} ${this.newMessage}`

      if (result >= 10) {
        message += move['hit']
      } else if (result >=7) {
        message += move['partial']
      } else  if (result <= 6){
        message += move['miss']
      }

      this.newMessage = ''
      message = this.addTextStyle(message)
      this.messages.push(message)
    },
    wikiArticle() {
    axios.get("https://es.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&exchars=300&format=json&origin=*")
    .then(data => {
      let pages = data.data.query.pages
      let article = pages[Object.keys(pages)[0]].extract.replace(/<(?:.|\n)*?>/gm, '');
      let message = this.newMessage +' ['+article+']'
      this.newMessage = ''
      message = this.addTextStyle(message)
      this.messages.push(message)
    })
    .catch(error => {
      console.log(error);
    })           
    }
  },
  created() {
      this.solo = {
                    danger: {
                      label: 'Enfrentarse al peligro',
                      hit: ['+1 momentum'],
                      partial: ['Exito parcial con un costo, salud, espiritu, o Soft move (+3 en la tirada)'],
                      miss: ['Te hacen daño, pierdes la iniciativa o algo malo pasa. Hard move']
                    },
                    advance: {
                      label: 'Avanzar',
                      hit: ['Marcar progreso. El objetivo de la escena es algo positivo para el PJ. Si lo logras marca progreso'],
                      partial: ['El objetivo de la escena es superar una complicacion. Si superas marca progreso'],
                      miss: ['Pierdes salud, espiritu o aliado. Debes sobrevivir a un peligro inminente. Tirar un hard move']
                    },
                    fight: {
                      label: 'Pelea',
                      hit: ['Haces +1 daño y tienes la iniciativa. Puedes elegir terminar la pelea'],
                      partial: ['Elige hacer daño o continuar con la iniciativa'],
                      miss: ['Te hacen daño, pierdes la iniciativa o algo malo pasa. Hard move']
                    },
                    finish_fight: {
                      label: 'Terminar pelea',
                      hit: ['Dominas completamente'],
                      partial: ['Ganas con un costo. -1 daño, espiritu, situacion empeora'],
                      miss: ['Pierdes. Hard move']
                    },
                    advantage: {
                      label: 'Ganar ventaja',
                      hit: ['+1 momentum +1 proxima tirada'],
                      partial: ['+1 momentum'],
                      miss: ['Hard move']
                    },
                    info: {
                      label: 'Recabar informacion',
                      hit: ['3 preguntas'],
                      partial: ['1 pregunta'],
                      miss: ['1 pregunta pero Hard move']
                    },
                    talk: {
                      label: 'Convencer',
                      hit: ['Lo logras'],
                      partial: ['Lo logras por algo a cambio'],
                      miss: ['No. Hard move']
                    }
      }
      this.moves = {
                    general: {
                      label: 'General',
                      hit: ['Exito completo'],
                      partial: ['Exito parcial'],
                      miss: ['Fallas']
                    },
                    underpressure: {
                      label: 'Actuar bajo presión',
                      hit: ['Lo logras'],
                      partial: ['Dudas o te paralizas. Lo logras con un alto costo o tienes una dificil desición'],
                      miss: ['Fallas']
                    },
                    investigate: {
                      label: 'Investigar',
                      hit: ['Averiguas algo importante'],
                      partial: ['Averiguas algo pero te adentras en el peligro'],
                      miss: ['Fallas']
                    },
                    explore: {
                      label: 'Explorar',
                      hit: ['Encuntras un objeto interesante o una buena pista'],
                      partial: ['Encuentras un lugar secreto o un objeto menor o una trampa'],
                      miss: ['Nada interesante']
                    },
                    idea: {
                      label: 'Idea',
                      hit: ['Averiguas un conocimiento oculto o sabes que es, que significa y a que estar atento.'],
                      partial: ['Sabes lo que es o como funciona pero vagamente'],
                      miss: ['Fallas']
                    },
                    readPerson: {
                      label: 'Leer a alguien',
                      hit: ['Sabes para quien trabaja, sus deseos y sus debilidades'],
                      partial: ['Sabes que es lo que mas desea o una debilidad'],
                      miss: ['No sabes nada y puede meterte en problemas']
                    },
                    persuade: {
                      label: 'Persuadir',
                      hit: ['Aceptan tus condiciones'],
                      partial: ['Aceptan pero modifican las condiciones o demandan algo'],
                      miss: ['No logras persuadir y puede meterte en problemas']
                    },
                    attack: {
                      label: 'Atacar',
                      hit: ['Haces daño | Haces daño terrible o quitas algo'],
                      partial: ['Haces daño | Recibes daño o te pones en mala posición'],
                      miss: ['Fallas y recibes daño']
                    },
                    power: {
                      label: 'Desata tu poder',
                      hit: ['+1 a las tiradas | Expande tus sentidos o Intimidas'],
                      partial: ['Expande tus sentidos o Intimidas pero a un costo (lado oscuro)'],
                      miss: ['Te adentras en el lado oscuro']
                    },
                    escape: {
                      label: 'Escapar',
                      hit: ['Escape perfecto'],
                      partial: ['Escapas | Recibes daño o te pones en otra situación de peligro'],
                      miss: ['No logras escapar']
                    },
                    help: {
                      label: 'Ayudar',
                      hit: ['+1 a las tiradas o -2 en la tirada de alguien'],
                      partial: ['+1 a las tiradas o -2 en la tirada de alguien pero te pones en peligro o tiene un costo'],
                      miss: ['Fallas, te pones en peligro']
                    },
                    contacts: {
                      label: 'Contactos',
                      hit: ['Conoces a alguien que tiene algo'],
                      partial: ['Conoces a alguien que tiene algo pero el costo es alto o muy peligroso'],
                      miss: ['Fallas']
                    },
                }
    this.$eventHub.$on('mod-bags', (bags) => {
      this.bags = {}
      for (let bag of bags) {
        let regex = bag.name.match(/^(.*):(.*)/)

        let category = 'General'
        let name = bag.name
        if (regex) {
          category = regex[1]
          name = regex[2]
        }

        if (!this.bags[category]) {
          this.bags[category] = []
        }
        this.bags[category].push(bag)
      }
    })
  }
}
</script>

<style>
  .buttonMove {
    margin: 3px;
  }
</style>

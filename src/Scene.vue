<template>
    <div class="columns ">
      <div class="column is-8">
        <div class="card events-card">
          <header class="card-header">
            <p class="card-header-title">
              Escena 1
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
                        <span>Master</span>
                    </button>
                    <b-dropdown-item @click="getFromBag(bag.number)" v-for="bag in bags" :key="bag.number">{{bag.name}}</b-dropdown-item>
                </b-dropdown>

                <b-dropdown position="is-top-right" hoverable>
                    <button class="button is-info" slot="trigger">
                        <span>Jugador</span>
                    </button>
                    <b-dropdown-item  @click="rollMove(index)" v-for="move, index in moves" :key="index">{{move['label']}}</b-dropdown-item>
                </b-dropdown>

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
                <input @keyup.enter="addCharacter" class="input" type="text" placeholder="Agregar Personaje">
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
                <input @keyup.enter="addAspect" class="input" type="text" placeholder="Agregar aspecto">
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
              {{currentElement.name}}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <textarea class="textarea is-info" type="text">{{currentElement.data}}</textarea>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">Grabar</a>
            <a href="#" class="card-footer-item">Eliminar</a>
          </footer>
        </div>
      </b-modal>
    </div>

</template>

<script>
export default {
  name: 'scene',
  data () {
    return {
      messages: [],
      newMessage: '',
      characters: [],
      aspects: [],
      isModalActive: false,
      currentElement: {},
      bags: [],
      currentModificator: 0,
      messageMousePosition: -1,
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
    },
    addAspect(event) {
      let name = event.target.value
      if (name == '')
        return
      this.aspects.push({name: name, data: ''})
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
    getFromBag(number) {
      let bag = this.bags.find(e => e.number === number);
      console.log("bag________",bag)
      let element = bag.items[Math.floor(Math.random() * bag.items.length)].name;
      if (this.newMessage != '') {
        element = this.newMessage +': '+element
        this.newMessage = ''
      }
      let message = this.addTextStyle(element)
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
    rollMove(moveName) {

      let move = this.moves[moveName]
      let result =  this.randomNumber(6) + this.randomNumber(6) + parseInt(this.currentModificator)
      let message = this.newMessage +' ['+result+']'

      if (result >= 10) {
        message += move['hit']
      } else if (result >=6) {
        message += move['partial']
      } else {
        message += move['miss']
      }

      this.newMessage = ''
      message = this.addTextStyle(message)
      this.messages.push(message)
    }
  },
  created() {
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
                      hit: ['Averiguas un conocimiento oculto o sabes que es, que signigica y a que estar atento.'],
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
      this.bags = bags
    })
  }
}
</script>

<style>
  .buttonMove {
    margin: 3px;
  }
</style>

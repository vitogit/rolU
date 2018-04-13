<template>
  <div id="generators">
    <div>
      <header class="has-text-centered">
        <h1 class="title">
          Generadores aleatorios
        </h1>
      </header>

      <div>
        <div class="box">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <h3>Generar Personaje
                  <div class="select is-small">
                    <select v-model="characterLanguage">
                      <option value="spanish">Nombre en Español</option>
                      <option value="english">Nombre en Inglés</option>
                      <option value="both">Ambos</option>
                    </select>
                  </div>
                </h3>
                <p v-html="character">
                </p>
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                  <a @click="loadCharacter" class="level-item" aria-label="reply">
                    Recargar
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div>

        <div class="box">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <h3>Dado</h3>
                <button @click="roll">ROLL</button>
                <select v-model="diceCount">
                  <option v-for="index in 10" :value="index">{{index}}</option>
                </select>
                <dice-roller ref="diceroller" :count="diceCount"/>
              </div>
            </div>
          </article>
        </div>

        <div class="box">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <h3>Generar Escena </h3>
                <p v-html="randomScene">
                </p>
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                  <a @click="loadRandomScene" class="level-item" aria-label="reply">
                    Recargar
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div>
        
      <div class="box">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <h3>Generar Evento </h3>
              <p v-html="randomEvent">
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a @click="loadRandomEvent" class="level-item" aria-label="reply">
                  Evento
                </a>
                <a @click="loadComplexQuestion" class="level-item" aria-label="reply">
                  Pregunta compleja
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import generateCharacter from './characterGenerator.js'
import generateRandomScene from './sceneGenerator.js'
import {randomEvent, complexQuestion} from './eventGenerator.js'
import {DiceRoller} from 'vue-dice-roller'
export default {
  name: 'generators',
  components: {DiceRoller},
  data () {
    return {
      character:'',
      randomScene:'',
      characterLanguage:'spanish',
      diceCount: 6,
      randomEvent: ''
    }
  },
  methods: {
    loadCharacter(){
      this.character = generateCharacter(this.characterLanguage)
    },
    loadRandomScene() {
      this.randomScene = generateRandomScene()
    },
    loadRandomEvent() {
      this.randomEvent = randomEvent()
    },
    loadComplexQuestion() {
      this.randomEvent = complexQuestion()
    },
    roll() {
      this.$refs.diceroller.roll();
    }
  },
  created() {
      console.log("this.$refs________",this.$refs)
      console.log("vuediceroller________",DiceRoller)
  }
}
</script>

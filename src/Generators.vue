<template>
  <div id="generators">
    <div class="container">
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
      </div>
    </div>
  </div>  
</template>

<script>
import generateCharacter from './characterGenerator.js'
import {DiceRoller} from 'vue-dice-roller'
export default {
  name: 'generators',
  components: {DiceRoller},
  data () {
    return {
      character:'',
      characterLanguage:'spanish',
      diceCount: 6
    }
  },
  methods: {
    loadCharacter(){
      this.character = generateCharacter(this.characterLanguage)
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

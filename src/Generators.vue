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
      </div>
    </div>
  </div>  
</template>

<script>
import generateCharacter from './characterGenerator.js'

export default {
  name: 'generators',
  data () {
    return {
      character:'',
      characterLanguage:'spanish'
    }
  },
  methods: {
    loadCharacter(){
      this.character = generateCharacter(this.characterLanguage)
    }
  },
  created() {
  }
}
</script>

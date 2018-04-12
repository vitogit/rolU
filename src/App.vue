<template>
  <div id="app">
    <!-- START NAV -->
    <nav class="navbar is-white">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item brand-text" href="../">
            RolU
          </a>
          <div class="navbar-burger burger" data-target="navMenu">
            <!-- <span>
              <a @click="openPage('scene')">
                Inicio
              </a>
            </span>
            <span>
              <a @click="openPage('bagapp')">
                Bolsa de cosas
              </a>
            </span> -->
          </div>
        </div>
        <div id="navMenu" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" v-bind:class = "{ 'is-active': activePage=='scene' }" @click="openPage('scene')">
              Inicio
            </a>
            <a class="navbar-item" v-bind:class = "{ 'is-active': activePage=='bagapp' }" @click="openPage('bagapp')">
              Bolsa de cosas
            </a>
            <a class="navbar-item" v-bind:class = "{ 'is-active': activePage=='generators' }" @click="openPage('generators')">
              Generadores
            </a>
            <!-- <a class="navbar-item" href="admin.html">
              Escena
            </a>
            <a class="navbar-item" href="admin.html">
              Historia
            </a>
            <a class="navbar-item" href="admin.html">
              Exportar
            </a> -->
          </div>

        </div>
      </div>
    </nav>
    <!-- END NAV -->
    <div class="container main">
      <div class="columns">
        <div class="column is-2">
          <aside class="menu">
            <p class="menu-label">
              Escenas 
              <a @click="addScene">
                  <b-icon
                  pack="fa"
                  icon="plus-square"
                  size="is-medium"
                  type="is-info">
                  </b-icon>
              </a>
            </p>
            <ul class="menu-list">
              <li v-for="s in scenes">
                <a v-text = "s.name"
                  @click = "loadScene(s.name)"
                  v-bind:class = "{ 'is-active': s.name == currentScene }">
                </a>
              </li>
              
            </ul>
          </aside>
        </div>
        <scene v-show = "activePage == 'scene'" ></scene>
        <BagApp v-show = "activePage == 'bagapp'" ></BagApp>
        <generators v-show = "activePage == 'generators'" ></generators>
      </div>
    </div>

  </div>
</template>

<script>
import Scene from './Scene'
import BagApp from './BagApp'
import Generators from './Generators'
export default {
  name: 'app',
  components: {
    Scene,
    BagApp,
    Generators
  },  
  props: ['name', 'messages', 'characters', 'aspects'],
  data () {
    let tempScenes = [{ name: 'Escena 1: La llegada'}, {name: 'Secuela 1: Desaliento'},
                      { name: 'Escena 2: El pueblo dormido'}, {name: 'Secuela 2: La decisión'}]
    return {
      scenes: tempScenes,
      currentScene: tempScenes[0].name,
      activePage: 'scene'
    }
  },
  watch: {
  },  
  methods: {
    loadScene(sceneName) {
      this.currentScene= sceneName
    },
    addScene() {
      this.$dialog.prompt({
        message: `Nombre de la escena`,
        inputAttrs: {
          type: 'string'
        },
        confirmText:'Ok',
        cancelText:'Cancelar',
        onConfirm: (value) => this.scenes.push({ name: value})
      })
    },
    openPage(page) {
      this.activePage = page
    }
  }
}
</script>

<style>

</style>

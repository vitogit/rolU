<template>
  <div id="app">
    <!-- START NAV -->
    <nav class="navbar is-white">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item brand-text" href="../">
            RolU
          </a>
          <div class ="navbar-item">
            <span style="font-size: 12px;font-weight: normal;" v-if="logged">
                {{useremail}} <br> 
                <button class="button is-info is-small" @click="signOff()">Salir</button>
                <button class="button is-info is-small" @click="savePrompt()">Guardar</button>
                <button class="button is-info is-small" @click="newFile()">Nuevo</button>
            </span>
            <span v-if="!logged"><button class="button is-info" @click="signIn()">Sign-in</button></span>
          </div>
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
            <a class="navbar-item" v-bind:class = "{ 'is-active': activePage=='notes' }" @click="openPage('notes')">
              Notas
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
              <li v-for="s in app.scenes">
                <a v-text = "s.name"
                  @click = "loadScene(s.id)"
                  v-bind:class = "{ 'is-active': s.id == currentSceneId }">
                </a>
              </li>

            </ul>
            
            <p class="menu-label">
              Archivos
            </p>
            <ul class="menu-list">
              <li v-for="f in savedFiles">
                <a v-text = "f.name"
                  @click = "loadFile(f)"
                  v-bind:class = "{ 'is-active': f.id == currentFile.id }">
                </a>
              </li>
            </ul>
          </aside>
        </div>
        <div class="column is-10">
          <scene v-show = "activePage == 'scene'" :name='app.scenes[currentSceneId].name' :messages='app.scenes[currentSceneId].messages'></scene>
          <BagApp v-show = "activePage == 'bagapp'" ></BagApp>
          <generators v-show = "activePage == 'generators'" ></generators>
          <notes v-show = "activePage == 'notes'" ></notes>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import Scene from './Scene'
import BagApp from './BagApp'
import Generators from './Generators'
import Notes from './Notes'
export default {
  name: 'app',
  components: {
    Scene,
    BagApp,
    Generators,
    Notes
  },
  data () {
    return {
      savedFiles: [],
      currentFile: {id: null, name: 'test', content: ''},
      gapiLoadClientPromise: null,
      currentSceneId: 0,
      lastSceneId: 1,
      activePage: 'scene',
      logged: false,
      useremail: '',
      app: {
        scenes: [{ name: 'Escena 1', messages: ['La noche estaba en calma'], id: 0}, {name: 'Secuela 1', messages: ['El muro de piedra.'], id:1 }]
      }
    }
  },
  watch: {
  },
  methods: {
    loadScene(id) {
      this.currentSceneId = id
    },
    addScene() {
      this.$dialog.prompt({
        message: `Nombre de la escena`,
        inputAttrs: {
          type: 'string'
        },
        confirmText:'Ok',
        cancelText:'Cancelar',
        onConfirm: (value) => this.app.scenes.push({ name: value, messages:[], id: this.lastSceneId+1})
      })
    },
    openPage(page) {
      this.activePage = page
    },
    signIn() {
      window.loginService.signIn()
    },
    signOff(){
      window.loginService.signOut()
    },
    initClient() {
      window.loginService.initClient(this.updateSigninStatus)
    },
    updateSigninStatus(isSignedIn) {
      this.logged = isSignedIn 
      if (this.logged) {
        this.useremail = window.loginService.userProfile().getEmail()
        window.driveService.listFiles('', this.initList)
      }
    },
    initList(err, files) {
      this.savedFiles = files.filter(e => e.name !== 'rolu_bag_of_many_things');
      this.$eventHub.$emit('gdrive-loaded')
    },
    savePrompt() {
      if (this.currentFile.id) {
        this.saveFile(this.currentFile.name)
        return
      }
      this.$dialog.prompt({
          message: `Nombre del archivo`,
          inputAttrs: {
            placeholder: 'test',
          },
          onConfirm: (value) => this.saveFile(value)
      })
    },
    saveFile(name) {
      let self = this 
      this.currentFile.content = JSON.stringify(this.app)
      this.currentFile.name = name
      window.driveService.saveFileRaw(self.currentFile, function(file){
        self.currentFile = file
        self.$toast.open({
            message: `${self.currentFile.name} - Guardado!`,
            type: 'is-success'
        })
        window.driveService.listFiles('', self.initList)
      })
    },
    loadFile(tempFile) {
      let self = this 
      driveService.loadFileRaw(tempFile, function(file){
        self.currentFile = file
        self.app = JSON.parse(file.content)
        self.currentSceneId = 0
        self.lastSceneId = self.app.scenes.length-1
        self.$toast.open({
            message: `${self.currentFile.name} - Cargado!`,
            type: 'is-success'
        })
      })
    },
    newFile() {
      this.currentFile =  {id: null, name: 'test', content: ''},
      this.app =  {
        scenes: [{ name: 'Escena 1', messages: [], id: 0}]
      }
      this.$toast.open({
          message: `Nueva historia`,
          type: 'is-success'
      })
    }
  },
  created() {
    //https://www.googleapis.com/auth/drive.appdata
    const SCOPES = 'https://www.googleapis.com/auth/drive.file'
    const CLIENT_ID = '1090834378955-vcb77ec7mru0iab0uvs9k17eds73hk6m.apps.googleusercontent.com'
    const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']

    window.loginService = new LoginService(CLIENT_ID, SCOPES, DISCOVERY_DOCS)
    window.driveService = new DriveService()
  },
  mounted() {
    window.gapi.load('auth2', this.initClient)
    this.$eventHub.$on('scene-change', (scene) => {
      this.app.scenes[scene.id] = scene
    })

  }
}
</script>

<style>

</style>

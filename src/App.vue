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
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="navMenu" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href="admin.html">
              Inicio
            </a>
            <a class="navbar-item" href="admin.html">
              Bolsa de cosas
            </a>
            <!-- <a class="navbar-item" href="admin.html">
              Personajes
            </a>
            <a class="navbar-item" href="admin.html">
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
            </p>
            <ul class="menu-list">
              <li><a class="is-active">Escena 1: La llegada</a></li>
              <li><a>Secuela 1: Desaliento</a></li>
              <li><a>Escena 2: El pueblo dormido</a></li>
              <li><a>Secuela 2: La decisión</a></li>
            </ul>
          </aside>
        </div>
        <div class="column is-10">
          <section class="hero is-small">
            <div class="hero-body">
              <div class="container">
                <h1 class="title is-invisible">
                  El pueblo maldito de Aidenville.
                </h1>
                <h2 class="subtitle is-invisible">
                  Un alcalde sediento de poder, un volcán dormido y un pueblo lleno de secretos.
                </h2>
              </div>
            </div>
          </section>
          <div class="columns">
            <div class="column is-8">
              <div class="card events-card">
                <header class="card-header">
                  <p class="card-header-title">
                    Escena 1: La llegada
                  </p>
                </header>
                <div class="card-content messages-area" ref="messagesArea">
                  <p v-for="m in messages" v-html="m">
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
                  <div class="field is-grouped">
                    <p class="control">
                      <a @click="addDialog" class="button">
                        Diálogo
                      </a>
                      <a @click="getFromBag" class="button">
                        Sacar de la bolsa
                      </a>
                    </p>
                    <div class="select">
                      <select>
                        <option>Pistas</option>
                        <option>Secretos</option>
                        <option>Encuentros</option>
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
          </div>
        </div>
      </div>
      

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
  name: 'app',
  data () {
    return {
      messages: ['Era una noche oscura', 'El pueblo estaba en calma.'],
      newMessage: '',
      characters: [{name: 'Jacob Price', data: 'Hola soy Jacob'}],
      aspects: [{name: 'Tranquilidad', data: 'Pueblo tranquilo'}],
      isModalActive: false,
      currentElement: {},
      tempBag: ['Si', 'No', 'Si pero', 'No pero']
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
    getFromBag() {
      let element = this.tempBag[0]
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
    }
  }
}
</script>

<style>

</style>

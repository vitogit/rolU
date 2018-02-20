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
                <div class="card-content">
                  <p v-for="m in messages">
                    {{m}}
                  </p>
                </div>
                <footer class="card-footer">
                  <textarea class="textarea is-info" type="text"></textarea>
                </footer>
                <footer class="card-footer" style="padding:10px">
                  <div class="field is-grouped">
                    <p class="control">
                      <a class="button">
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
                  <div class="card-content">
                      <div class="content">
                          Tranquilidad
                      </div>
                  </div>
              </b-collapse>

              <b-collapse class="card">
                  <div slot="trigger" slot-scope="props" class="card-header">
                      <p class="card-header-title">
                          Historia
                      </p>
                      <a class="card-header-icon">
                          <b-icon
                              pack="fa"
                              :icon="props.open ? 'angle-down' : 'angle-up'">
                          </b-icon>
                      </a>
                  </div>
                  <div class="card-content">
                      <div class="content">
                          Brumas de Aiden
                      </div>
                  </div>
              </b-collapse>
            </div>
          </div>
        </div>
      </div>
      

    </div>
    <b-modal :active.sync="isCharacterModalActive">
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
      characters: [{name: 'Jacob Price', data: 'Hola soy Jacob'}],
      characterOpen: true,
      isCharacterModalActive: false,
      currentElement: {}
    }
  },
  methods: {
    addCharacter(event) {
      let name = event.target.value
      this.characters.push({name:name, data:''})
    },
    openModal(element) {
      this.isCharacterModalActive = true
      this.currentElement = element
    }
  }
}
</script>

<style>

</style>

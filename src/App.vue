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
              Home
            </a>
          </div>

        </div>
      </div>
    </nav>
    <!-- END NAV -->
    <div class="container">
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
                <h1 class="title">
                  El pueblo maldito de Aidenville.
                </h1>
                <h2 class="subtitle">
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
                  Era una noche oscura.
                </div>
                <footer class="card-footer">
                  <textarea class="textarea is-info" type="text"></textarea>
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
                  <div class="card-content">
                      <div class="content">
                        <div class="field">
                          <b-taginput
                              v-model="characterTags"
                              icon="label"
                              placeholder="Agregar personaje">
                          </b-taginput>
                        </div>
                      </div>
                  </div>
              </b-collapse>

              <nav class="panel">
                <p class="panel-heading">
                  Personajes
                </p>
                <div class="panel-block">
                  <p class="control has-icons-left">
                    <input class="input is-small" type="text" placeholder="Agregar">
                  </p>
                </div>
                <a class="panel-block is-active">
                  <span class="panel-icon">
                    <i class="fas fa-book"></i>
                  </span>
                  Jacob Price
                </a>
                <a class="panel-block">
                  <span class="panel-icon">
                    <i class="fas fa-book"></i>
                  </span>
                  Adel
                </a>
              </nav>
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
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      characterTags: ['Jacob Price']
    }
  }
}
</script>

<style>

</style>

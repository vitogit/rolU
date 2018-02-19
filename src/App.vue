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
                    Capítulo 1
                  </p>
                </header>
                <div class="card-table">
                  <div class="content">

                  </div>
                </div>
              </div>
            </div>
            <div class="column is-4">
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">
                    Personajes
                  </p>
                  <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </a>
                </header>
                <div class="card-content">
                  <div class="content">
                    <div class="control has-icons-left has-icons-right">
                    </div>
                  </div>
                </div>
              </div>
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">
                    Escena
                  </p>
                  <a href="#" class="card-header-icon" aria-label="more options">
                    <span class="icon">
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </a>
                </header>
                <div class="card-content">
                  <div class="content">
                    <div class="control has-icons-left has-icons-right">
                    </div>
                  </div>
                </div>
              </div>
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
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>

</style>

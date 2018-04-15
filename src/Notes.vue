<template>
  <div id="notesapp">
    <div>
      <header class="has-text-centered">
        <h1 class="title">
          Notas
          <a @click="addNote">
              <b-icon
              pack="fa"
              icon="plus-square"
              size="is-small"
              >
              </b-icon>
          </a>
        </h1>
      </header>
      <div>
        <nav class="panel" v-for="note in notes">
          <p class="panel-heading">
            <input
              v-model="note.name"
              class="input noteName"
              type="text"
            />
            <button class="button is-danger" @click="removeNote(note.number)">X</button>
          </p>
          <div class="panel-block">
            <p class="control">
              <textarea
                   v-model="note.text"
                   class="textarea is-info"
                   type="text">
              </textarea>
            </p>
          </div>
        </nav>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'notes',
  data() {
    return {
      number: 0,
      notes: [{name:'Personajes', text:'', number:0}]
    }
  },
  props: {
  },
  // watch change for localStorage persistence
  watch: {
  },
  methods: {
    addNote() {
      this.number++
      this.notes.push({name:'Note '+this.number, number: this.number})
    },
    removeNote(number) {
      this.notes = this.notes.filter(e => e.number !== number);
    },
  }
}
</script>

<style scoped>
  .textarea {
    height: 300px;
  }
  .noteName {
    width: 90%
  }
</style>

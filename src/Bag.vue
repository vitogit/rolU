<template>
  <nav class="panel">
    <p class="panel-heading">
      <input 
        class="input is-medium"
        style="width:50%"
        type="text"
        v-if="editingBag"
        v-model="name"
      />
      <button class="delete" @click="remove" style="vertical-align:middle">X</button>
      <label class="label"v-if="!editingBag">
        {{name}}
      </label>
      <span class="is-pulled-right">
        <span class="buttons">
          <span class="button is-small" @click="editingBag=!editingBag">Editar</span>
          <span class="button is-primary"
                @click="random">Sacar
          </span>
        </span>
      </span>
    </p>
    <div class="panel-block" v-if="randomThing !== ''">
      <article class="message is-info">
        <div class="message-body">
          {{randomThing}}
        </div>
      </article>
    </div>
    <div class="panel-block" v-if="editingBag">
      <p class="control has-icons-left">
        <input 
          class="input is-medium"
          type="text"
          placeholder="Agrega cosas"
          size="is-medium"
          v-model="newItem"
          @keyup.enter="addItem" />
      </p>
    </div>
    <div 
      class="panel-block"
      v-for="item in items"
      @dblclick="editItem(item)"
      v-if="editingBag">
      <span>
        <input 
          class="input is-small"
          type="text" 
          v-if="item === editingItem" 
          @keyup.enter="endEditing(item)"
          @blur="endEditing(item)" 
          v-model="item.name"
        />
        <label class="label" v-if="item !== editingItem">
            {{item.name}}
        </label>
      </span>

      <span class="is-pulled-right" v-if="item !== editingItem">
        <button class="delete" @click="removeItem(item)">X</button>
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'bag',
  data() {
    return {
      newItem: '',
      editingItem: {},
      editingBag: false,
      randomThing: '',
    }
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  // watch change for localStorage persistence
  watch: {
    // items: {
    //   handler: function(items) {
    //     itemStorage.save(items)
    //   },
    //   deep: true
    // }
  },
  methods: {
    addItem: function() {
      var itemText = this.newItem.trim();
      if (itemText) {
        this.items.push({
          name: itemText,
          checked: false
        });
        this.newItem = "";
      }
    },

    removeItem: function(item) {
      var index = this.items.indexOf(item);
      this.items.splice(index, 1);
    },

    editItem: function(item) {
      this.editingItem = item;
    },

    endEditing: function(item) {
      this.editingItem = {};
      if (item.name.trim() === "") {
        this.removeItem(item);
      }
    },
    random() {
      let rand = this.items[Math.floor(Math.random() * this.items.length)];
      this.randomThing = rand.name
    },
    remove() {
      this.$emit('onRemove')
    }
  }
}
</script>

<style scoped>
.panel-block {
  display: block;
}

.label {
  display: inline;
}

.panel-heading {
  font-size: 1em;
  line-height: 2em;
}
</style>

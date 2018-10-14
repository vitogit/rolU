<template>
  <nav class="panel">
    <p class="panel-heading">
      <input
        class="input is-medium"
        style="width:45%"
        type="text"
        v-if="editingBag"
        v-model="mutableName"
      />
      <button class="delete" @click="remove" style="vertical-align:middle">X</button>
      <label class="label"v-if="!editingBag">
        {{mutableName}}
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
      v-for="(item, index) in mutableItems"
      @dblclick="editItem(index)"
      v-if="editingBag">
      <span>
        <input
          class="input is-small"
          type="text"
          v-if="index === editingItemIndex"
          @keyup.enter="endEditing(item)"
          @blur="endEditing(item)"
          v-model="mutableItems[index]"
        />
        <label class="label" v-if="index !== editingItemIndex">
            {{item}}
        </label>
      </span>

      <span class="is-pulled-right" v-if="index !== editingItemIndex">
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
      editingItemIndex: -1,
      editingBag: false,
      randomThing: '',
      mutableName: this.name,
      mutableItems: this.items
    }
  },
  props: {
    number: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    mutableItems: function (newItems) {
      this.$eventHub.$emit('mod-bag', {number: this.number, name: this.mutableName, items: newItems})
    },
    mutableName: function (newName) {
      this.$eventHub.$emit('mod-bag', {number: this.number, name: newName, items: this.mutableItems})
    }    
  },  
  methods: {
    addItem: function() {
      var itemText = this.newItem.trim();
      if (itemText) {
        this.mutableItems.push(itemText);
        this.newItem = "";
      }
    },

    removeItem: function(item) {
      var index = this.mutableItems.indexOf(item);
      this.mutableItems.splice(index, 1);
    },

    editItem: function(index) {
      this.editingItemIndex = index;
    },

    endEditing: function(item) {
      this.editingItemIndex = -1;
      if (item.trim() === "") {
        this.removeItem(item);
      }
    },
    random() {
      let rand = this.mutableItems[Math.floor(Math.random() * this.mutableItems.length)];
      this.randomThing = rand
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

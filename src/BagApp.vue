<template>
  <div id="bagapp">
    <div class="container">
      <header class="has-text-centered">
        <h1 class="title">
          Bolsas con cosas
        </h1>
        <p class="subtitle">
          Agrega, remueve y saca cosas de bolsas virtuales.
        </p>
      </header>
      <div style="padding-left:30px">
        <a @click="addBag">
            <b-icon
            pack="fa"
            icon="plus-square"
            size="is-large"
            >
            </b-icon>
        </a>
      </div>
      <br>
      <div>
        <bag 
          class ="bag" 
          @onRemove="removeBag(bag.number)"
          :name="bag.name"
          :items="bag.items" 
          v-for="(bag, index) in bags" 
          :key="index"/>
      </div>
    </div>
  </div>  
</template>

<script>
import bag from './Bag.vue'

const STORAGE_KEY = 'rolu_bag_of_many_things'
const itemStorage = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    todos.forEach((todo, index) => {
      todo.id = index
    })
    itemStorage.uid = todos.length
    return todos
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
};

export default {
  name: 'bagApp',
  components: {bag},
  data () {
    let fetched = itemStorage.fetch()
    let defaultBags = [{name:'Dado de 6', items:[{name:1},{name:2},{name:3},{name:4},{name:5},{name:6}], number: 1}, 
                       {name:'Encuentros en el bosque', items:[{name:'Lobo'},{name:'Zombie'},{name:'Oso'},{name:'Vampiro'}], number: 2}]
    let bags = (fetched.length ? fetched : defaultBags)
    let maxNumber = Math.max(...bags.map(e => e.number))

    return {
      bags: bags,
      number: maxNumber
    }
  },
  methods: {
    addBag() {
      this.number++
      this.bags.push({name:'bag '+this.number, number: this.number})
      this.$eventHub.$emit('mod-bags', this.bags)
    },
    removeBag(number) {
      this.bags = this.bags.filter(e => e.number !== number);
      this.$eventHub.$emit('mod-bags', this.bags)
    },
    save(){
      itemStorage.save(this.bags)
    }
  },
  created() {
    this.$eventHub.$emit('mod-bags', this.bags)
  }
}
</script>

<style>
  .bag {
    margin: 20px;
    width: 45%;
    display: inline-block;
  }
</style>

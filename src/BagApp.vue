<template>
  <div id="bagapp">
    <div>
      <header class="has-text-centered">
        <h1 class="title">
          Bolsas con cosas
        </h1>
        <p class="subtitle">
          Agrega, remueve y saca cosas de bolsas virtuales.
        </p>
      </header>
      <div style="padding-left:30px">
        <button class="button is-info " @click="save()">save</button>
        <button class="button is-info " @click="init()">Load</button>
     
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
          :number="bag.number"
          v-for="(bag, index) in bags"
          :key="index"/>
      </div>
    </div>
  </div>
</template>

<script>
import bag from './Bag.vue'
import default_bags from './assets/bags.json'
const STORAGE_KEY = 'rolu_bag_of_many_things'


export default {
  name: 'bagApp',
  components: {bag},
  data () {
    let bags = default_bags
    let maxNumber = Math.max(...bags.map(e => e.number))

    return {
      bags: bags,
      number: maxNumber,
      currentFile: {}
    }
  },
  watch: {
    bags: function (newBags) {
      this.$eventHub.$emit('mod-bags', newBags)
    }
  },
  created() {
    this.$eventHub.$on('mod-bag', (newBag) => {
      for (const [index, bag] of this.bags.entries()) {
        if (bag.number == newBag.number) {
          this.bags[index].name = newBag.name
          this.bags[index].items = newBag.items 
          this.$eventHub.$emit('mod-bags', this.bags)
          break
        }
      }
    })
    this.$eventHub.$on('gdrive-loaded', (newBag) => {
      // this.init()
    })
    this.$eventHub.$emit('mod-bags', this.bags)
  },
  methods: {
    addBag() {
      this.number++
      this.bags.push({name:'bag '+this.number, number: this.number})
    },
    removeBag(number) {
      this.bags = this.bags.filter(e => e.number !== number);
    },
    save(){
      window.driveService.listFiles(STORAGE_KEY, this.saveFile)
    },
    saveFile(err, files){
      let self = this
      this.currentFile.content = JSON.stringify(this.bags)
      this.currentFile.name = STORAGE_KEY
      if (files[0]) {
        this.currentFile.id = files[0].id
      }
      window.driveService.saveFileRaw(self.currentFile, function(file){
        self.currentFile = file
        self.$toast.open({
            message: `Guardado!`,
            type: 'is-success'
        })
      })
    },
    init() {
      window.driveService.listFiles('rolu', this.loadFile)
    },
    loadFile(err, files) {
      if (files) {
        let self = this 
        let tempFile = files[0]
        self.currentFile = tempFile
        driveService.loadFileRaw(tempFile, function(file){
          self.bags = JSON.parse(file.content)
          self.currentFile = file
          let maxNumber = Math.max(...self.bags.map(e => e.number)) 
          self.number = maxNumber
          self.$toast.open({
            message: `Listas cargadas!`,
            type: 'is-success'
          })
        })
      } else {
        console.log("error________")
      }
    }
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

<template>
  <div class="header">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <div class="container-div-image-search">          
          <div>
            <img
              src="../images/logo.png"
              alt="button-close"
              class="image-field"
              width="200"
              height="55"
            >
          </div>
          <div class="container-input-field-search">
            <div class="container-input-div-text">
              <input
                type="text"
                v-model="search"
                name="input-search-comic"
                id="input-search-comic"
                placeholder="Search Character..."
                class="input-search-character"
              >
              <div @click="searchCharacterByName" class="cursor-p">
                <img
                  src="../images/search.png"
                  alt="button-close"
                  class="image-field-icon-search"
                  width="30"
                  height="30"
                >
              </div>
            </div>
          </div>
        </div>
		</div>
	</nav>
    <b-modal id="modal-search-character">
      <template #modal-header>
        <div class="container-header-btn-close" @click="$bvModal.hide('modal-search-character')">
          <img
            src="../images/btn-close.png"
            alt="button-close"
            class="image-field"
          >
        </div>
      </template>
      <div class="container-body-modal">
        <div v-for="character in results" :key="character.id">
          <b-card
            :img-src="character.url"
            :title="character.name"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 70%;"
            class="mb-2"
          >
            <b-card-text>
              <p class="font-wb">
                {{ character.description }}
              </p>
            </b-card-text>
          </b-card>
        </div>
      </div>
      <template #modal-footer>
        <div class="w-100 container-footer-modal">
          <div class="w-50 container-button-modal-section">
            <div
              class="container-imagen-and-p-button bg-color-gris2 hover-favourites"
              @click="enDesarrollo"
            >
              <img
                src="../images/btn-favourites-default.png"
                alt="shopping-cart-primary"
                class="image-field"
              >
              <p class="bg-color-black font-weight-bold margin-top-21">
                ADDED TO FAVOURITES
              </p>
            </div>            
          </div>
          <div
            class="w-50 container-button-modal-section bg-color-gris hover-price"
            @click="enDesarrollo"
          >
            <div class="container-imagen-and-p-button">
              <img
                src="../images/shopping-cart-primary.png"
                alt="shopping-cart-primary"
                class="image-field"
              >
              <p class="bg-color-red font-weight-bold margin-top-21">
                BUY FOR $
              </p>
            </div>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import configService from '@/http/http.js'
export default {
  name: 'Products',
  data () {
    return {
      search: '',
      detailComic: [],
      results: []
    }
  },
  methods: {
    enDesarrollo () {
      this.$bvToast.toast('Funcinalidad en Desarrollo', {
        title: 'Mensaje',
        variant: 'success',
        solid: true
      })
    },
    async searchCharacterByName () {
      try {
        const request = {
          method: 'GET',
          url: `/characters?name=${this.search}`
        }
        const responseCharacterByName = await configService(request)
        console.log(responseCharacterByName, '150')
        if (responseCharacterByName && responseCharacterByName.status === 200) {
          const characters = responseCharacterByName.data.data.results
          characters.forEach(item => {
            item.url = item.thumbnail.path ? item.thumbnail.path+'.'+item.thumbnail.extension : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            item.description = item.description ? item.description : 'No Description'
            item.price = item.prices && item.prices.length > 0 ? item.prices[0].price : '0.00'
          })
          console.log(characters)
          this.results = characters
          this.$bvModal.show('modal-search-character')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.header {
  background-color: #241f20 !important;
}
.container-input-field-search {
  margin-left: 250px;
  margin-top: 15px;
}
.container-div-image-search{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.input-field-search{
  width: 60px;
  height: 30px;
  background-color: #fff;
}
.input-search-character {
  width: 560px;
  height: 55px;
  border-radius: 4px;
  border: 0;
  padding: 13px;
}
.input-search-character::-moz-focus-inner {
  border: 0;
}
#input-search-comic::placeholder {
  font-size: 20px;
  color: #d9dcde;
}
.container-input-div-text{
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 4px;
  max-height: 55px;
}
.image-field-icon-search {
  margin-top: 11px;
  margin-right: 6px;
}
.cursor-p {
  cursor: pointer;
}
.container-header-btn-close{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  cursor: pointer;
  margin-right: 5px;
}
.container-body-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container-footer-modal{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}
.image-field{
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: 6px;
}
.margin-left-description {
  margin-left: 15px;
}
.color-title {
  color: #43464c;
  font-size: 20px;
}
.bg-color-descri {
  color: #97978c;
  font-size: 18px;
}
.font-wb{
  font-weight: 500;
}
</style>

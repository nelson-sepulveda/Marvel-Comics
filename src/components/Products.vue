<template>
  <div>
    <div class="main-container">
      <div class="container-mini-header-order mb-5 top-header">
        <div class="d-flex justify-content-center">
          <img
            src="../images/characters.png"
            alt="button-close"
            class="image-field"
          >
          <p class="font-weight-bold fz-20">
            Characters
          </p>
        </div>
        <div>
          
        </div>
      </div>
      <b-card-group class="container-cards-d-flex">
        <div v-for="character in characters" :key="character.id" class="col-md-6  mb-3">
          <b-card class="mb-2">
            <div class="body-card">
              <div>
                <img
                  :src="character.imageTh"
                  alt="button-close"
                  class="image-field image-card-character"
                  width="250"
                  height="250"
                >
                <p class="font-weight-bold fz-16 bg-color-gray">Related Comics</p>
              </div>
              <div class="container-view-description">
                <h4 class="font-weight-bold bg-color-name">
                  {{ character.name.toUpperCase() }}
                </h4>
                <p class="bg-color-gray fz-14">
                  {{ getDescription(character.description) }}
                </p>
                <div class="container-btn-view-more" @click="onPressDetailCharacter(character)">
                  <p>
                    VIEW MORE
                  </p>
                </div>
              </div>
            </div>
            <div class="container-view-comic-related" v-if="character.comics.items.length > 0 && character.comics.items.length >= 2">
              <div class="col-md-6">
                <p class="bg-color-gray fw-500">
                  {{ getTextOneLine(character.comics.items[0].name) }}
                </p>
              </div>
              <div class="col-md-6">
                <p class="bg-color-gray fw-500">
                  {{ getTextOneLine(character.comics.items[1].name) }}
                </p>
              </div>
              <div class="col-md-6">
                <p class="bg-color-gray font-weight-bold underline-block underline-hover">
                  More Comics
                </p>
              </div>
            </div>
            <div v-else>
              <p class="bg-color-gray">
                You don't have comics
              </p>
            </div>
          </b-card>
        </div>
      </b-card-group>
      <div class="card mt-5">
        <div class="card-header">
          Product List
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">
                    ID
                  </th>
                  <th>
                    Titulo
                  </th>
                  <th>
                    Fecha
                  </th>
                  <th>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="comic in comics" v-bind:key="comic.id">
                  <template>
                    <td>
                      {{comic.id}}
                    </td>
                    <td>
                      {{comic.title}}
                    </td>
                    <td>
                      {{comic.modified}}
                    </td>
                    <td>
                      <a href="#" class="icon">
                        <i @click="onPressDetailComic(comic)" class="fa fa-eye"></i>
                      </a>
                    </td>
                  </template>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="sidenav">
      <div class="main-sidenav">
        <div class="title-sidenav">
          <div class="ml-4">
            <img
              src="../images/favourites.png"
              alt="button-close"
              class="image-field"
            >
          </div>
          <div class="ml-3">
            <p class="font-weight-bold fz-20">
              My Favourites
            </p>
          </div>
        </div>
        <div v-if="favoritos.length > 0">
          <div v-for="favorito in favoritos" :key="favorito.id">
            <div class="container-image-sd">
              <img
                :src="getImage(favorito.images)"
                alt="button-close"
                class="image-field-favorite"
                width="210"
                height="300"
              >
              <div class="container-delete-btn" @click="deleteFavorito(favorito)">
                <img
                  src="../images/btn-delete.png"
                  alt="button-close"
                  class="image-delete-btn"
                >
              </div>
            </div>
            <div>
              <p class="container-image-sd font-weight-bold fz-16">
                {{ favorito.title }}
              </p>
            </div>
          </div>
        </div>
        <div v-else>
          <p class=" text-center font-weight-bold fz-16">
            You don't have Favourites Selected
          </p>
        </div>
      </div>
    </div>

    <b-modal id="modal-details-comic">
      <template #modal-header>
        <div class="container-header-btn-close" @click="$bvModal.hide('modal-details-comic')">
          <img
            src="../images/btn-close.png"
            alt="button-close"
            class="image-field"
          >
        </div>
      </template>
      <div class="container-body-modal">
        <div class="container-image-detail-modal">
          <img
            :src="detailComic.url"
            alt="shopping-cart-primary"
            class="image-field"
            width="210"
            height="300"
          >
        </div>
        <div class="margin-left-description">
          <p class="font-weight-bold color-title">
            {{ detailComic.title }}
          </p>
          <p class="bg-color-descri">
            {{ detailComic.description }}
          </p>
        </div>
      </div>
      <template #modal-footer>
        <div class="w-100 container-footer-modal">
          <div
            class="w-50 container-button-modal-section"
            @click="addToFavorites"
          >
            <div class="container-imagen-and-p-button bg-color-gris2 hover-favourites">
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
            @click="onPressBuy"
          >
            <div class="container-imagen-and-p-button">
              <img
                src="../images/shopping-cart-primary.png"
                alt="shopping-cart-primary"
                class="image-field"
              >
              <p class="bg-color-red font-weight-bold margin-top-21">
                BUY FOR $ {{ detailComic.price }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </b-modal>

  </div>
</template>

<script>
import db from '@/db'
import configService from '@/http/http.js'
export default {
  name: 'Products',
  data () {
    return {
      comics: [],
      favoritos: [],
      detailComic: {},
      characters: []
    }
  },
  created() {
    this.detailComic = {}
    this.getComics()
    this.getComicsFavorites()
    this.getCharacters()
  },
  computed:{
    sortedProducts(){
      return this.products.slice().sort((a,b)=>{
        return a.product_id - b.product_id
      })
    }
  },
  methods: {
    onPressBuy () {
      let message = ''
      let title = ''
      if (!this.detailComic.format) {
        message = 'Agregaste un Super Heroe a tu Coleccion, Enseñale como salvar el mundo'
        title = '¡Felicidades!'
      } else {
        message = 'Compraste la historieta ' + this.detailComic.title
        title = '¡Felicidades!'
      }
      this.$bvToast.toast(message, {
        title: title,
        variant: 'success',
        solid: true
      })
      this.$bvModal.hide('modal-details-comic')
    },
    getDescription (text) {
      if (text.length > 40) {
        const mitad = Math.floor((text.length + 5) / 2 + 1)
        const cad1 = text.substring(0, mitad) + '...'
        return cad1
      }
      return text
    },
    getTextOneLine (text) {
      if (text.length > 13) {
        const mitad = Math.floor((text.length + 5) / 2 + 1)
        const cad1 = text.substring(0, mitad) + '...'
        return cad1
      }
      return text
    },
    async getCharacters () {
      try {
        const request = {
          method: 'GET',
          url: '/characters'
        }
        const responseCharacters = await configService(request)
        console.log(responseCharacters)
        if (responseCharacters && responseCharacters.status === 200) {
          this.mergeCharacters(responseCharacters.data.data.results)
        }
      } catch (error) {
        console.log(error)
      }
    },
    mergeCharacters (results) {
      results.forEach(character => {
        if (!character.description || character.description === '') {
          character.description = 'No Description'
        }
        if (!character.thumbnail || character.thumbnail.length === 0) {
          character.imageTh = 'http://i.annihil.us/u/prod/marvel/i/mg/c/80/5e3d7536c8ada.jpg'
        } else if (character.thumbnail && character.thumbnail.path) {
          character.imageTh = character.thumbnail.path +'.'+character.thumbnail.extension
        }
      })
      console.log(results)
      this.characters = results
    },
    getIndex (favoritos, favorito) {
      let indice = -1
      for (let index = 0; index < favoritos.length; index++) {
        if (favoritos[index].id === favorito.id) {
          indice = index
        }
      }
      return indice
    },
    deleteFavorito (favorito) {
      const favoritos = JSON.parse(localStorage.getItem('favoritos'))
      favoritos.splice(this.getIndex(favoritos, favorito), 1)
      this.favoritos.splice(this.getIndex(this.favoritos, favorito), 1)
      localStorage.setItem('favoritos', JSON.stringify(favoritos))
      this.$bvToast.toast('Eliminación Exitosa', {
        title: 'Eliminación',
        variant: 'success',
        solid: true
      })
    },
    getImage (images) {
      if (images && images.length > 0) {
        return images[0].path + '.' + images[0].extension
      }
      return 'http://i.annihil.us/u/prod/marvel/i/mg/c/80/5e3d7536c8ada.jpg'
    },
    getComicsFavorites () {
      if (localStorage.getItem('favoritos')!==null) {
        const getFavoritos = JSON.parse(localStorage.getItem('favoritos'))
        this.favoritos = getFavoritos
      }
    },
    addToFavorites () {
      if (!this.detailComic.format) {
        this.detailComic.title = this.detailComic.name
        this.detailComic.images = []
        this.detailComic.images.push(this.detailComic.thumbnail)
      }
      if (localStorage.getItem('favoritos')===null) {
        const pushFavoritos = []
        pushFavoritos.push(this.detailComic)
        localStorage.setItem('favoritos', JSON.stringify(pushFavoritos))
        this.favoritos.push(this.detailComic)
      } else {
        const getFavoritos = JSON.parse(localStorage.getItem('favoritos'))
        const { duplicate, message } = this.validateComic(getFavoritos, this.detailComic)
        if (duplicate) {
          this.$bvToast.toast(message, {
            title: 'Error',
            variant: 'warning',
            solid: true
          })
        } else {
          getFavoritos.push(this.detailComic)
          localStorage.setItem('favoritos', JSON.stringify(getFavoritos))
          this.favoritos.push(this.detailComic)
          this.$bvToast.toast('Comic agregado exitosamente', {
            title: 'Mensaje',
            variant: 'success',
            solid: true
          })
        }
      }
      this.$bvModal.hide('modal-details-comic')
    },
    validateComic (favoritos, comic) {
      let haveComic = false
      favoritos.forEach(historieta => {
        if (historieta.id === comic.id) {
          haveComic = true
        }
      })
      return {
        duplicate: haveComic,
        message: haveComic ? 'Este Comic ya se encuentra seleccionado' : ''
      }
    },
    async onPressDetailCharacter (character) {
      try {
        const request = {
          method: 'GET',
          url: `/characters/${character.id}`
        }
        const responseDetailCharacter = await configService(request)
        if (responseDetailCharacter && responseDetailCharacter.status === 200) {
          console.log(responseDetailCharacter)
          const dataComic = responseDetailCharacter.data.data.results[0]
          this.$bvModal.show('modal-details-comic')
          this.detailComic = { ...dataComic }
          this.detailComic.url = dataComic.thumbnail.path ? dataComic.thumbnail.path+'.'+dataComic.thumbnail.extension : ''
          this.detailComic.description = dataComic.description ? dataComic.description : 'No Description'
          this.detailComic.price = dataComic.prices && dataComic.prices.length > 0 ? dataComic.prices[0].price : '0.00'
        }
      } catch (error) {
        console.log(error)
      }
    },
    async onPressDetailComic (comic) {
      try {
        const request = {
          method: 'GET',
          url: `/comics/${comic.id}`
        }
        const responseDetailComic = await configService(request)
        if (responseDetailComic && responseDetailComic.status === 200) {
          console.log(responseDetailComic)
          const dataComic = responseDetailComic.data.data.results[0]
          this.$bvModal.show('modal-details-comic')
          this.detailComic = { ...dataComic }
          this.detailComic.url = dataComic.images.length > 0 ? dataComic.images[0].path+'.'+dataComic.images[0].extension : ''
          this.detailComic.price = dataComic.prices.length > 0 ? dataComic.prices[0].price : '0.00'
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 
     */
    async getComics () {
      try {
        const request = {
          method: 'GET',
          url: '/comics',
        }
        const responseComic = await configService(request)
        if (responseComic && responseComic.status === 200) {
          this.comics = responseComic.data.data.results
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hover-favourites:hover {
  background-color: #939296;
}
.hover-price:hover {
  background-color: #c0c5c8;
}
.top-header {
  top: 20px;
}
.container-btn-view-more {
  background-color: #ea2628;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}
.container-btn-view-more:hover {
  background-color: #901114;
}
.container-btn-view-more > p {
  color: #fcfbfb;
  font-weight: 500;
  margin: 0;
  padding: 0;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}
.underline-hover:hover{
  color: #2c2323;
}
.fw-500 {
  font-weight: 500;
  padding: 0;
}
.fz-14 {
  font-size: 15px;
  font-weight: 500;
}
.bg-color-name {
  color: #43464c;
}
.container-view-description {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 50%;
}
.underline-block {
  text-decoration: underline;
  cursor: pointer;
}
.container-view-comic-related {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.bg-color-gray {
  color: #939296;
}
.body-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
h3{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
.icon{
  margin-right: 10px;
}
.icon i{
  cursor: pointer;
}
.container-footer-modal{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}
.modal-footer {
  padding: 0;
  border-top: 0;
}
.modal-footer > * {
  margin: 0;
}
.modal-header {
  border-bottom: 0;
}
.container-button-modal-section > p {
  margin: 0;
  padding: 0;
  margin-top:8px;
}
.container-button-modal-section {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.bg-color-red{
  color: #da2f30;
}
.bg-color-gris {
  background-color: #e3e0db;
}
.image-src-buil{
  margin-right: 5px;
}
.container-imagen-and-p-button{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
}
.image-field{
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: 6px;
}
.margin-top-21 {
  margin-top: 21px;
}
.bg-color-gris2 {
  background-color: #eae8e5;
}
.bg-color-black{
  color: #1c1f25;
}
.container-header-btn-close{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  cursor: pointer;
  margin-right: 5px;
}
.modal-header {
  align-items: flex-end;
  justify-content: flex-end;
  padding: 0;
}
.container-body-modal {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.color-title {
  color: #43464c;
  font-size: 20px;
}
@media (min-width: 700px) {
  .modal-dialog {
    max-width: 700px;
  }
}
.bg-color-descri {
  color: #97978c;
  font-size: 18px;
}
.margin-left-description {
  margin-left: 15px;
}
.container-full {
  background-color: #f4f4f4;
}
.max-w {
  max-width: 20rem;
}
.contaniner-comics-cards {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}
.container-cards-d-flex{ 
  justify-content: space-around;
}
.container-mini-header-order {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.fz-20 {
  font-size: 24px;
  padding: 0;
  margin: 0;
  margin-top: 15px;
}
.sidenav {
  height: 100%;
  width: 320px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: #e4e5e5;
  overflow-x: hidden;
  padding-top: 20px;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
}

.sidenav a:hover {
  color: #f1f1f1;
}
.main-container {
  margin-right: 316px;
  padding: 0px 10px;
  background-color: #ececec;
}
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
.main-sidenav {
  padding: 5px;
}
.title-sidenav{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.container-image-sd {
  display: flex;
  justify-content: center;
}
.fz-16{
  font-size: 20px;
  padding: 5px;
  margin: 0;
  margin-bottom: 20px;
}
.image-delete-btn {
  z-index: 1;
  position: relative;
  right: 25px;
}
.container-delete-btn{
  cursor: pointer;  
}
.image-field-favorite {
  z-index: -1;
  position: relative;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: 6px;  
}
.sidenav::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.sidenav::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.sidenav::-webkit-scrollbar-thumb:hover {
  background: #b3b3b3;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}

.sidenav::-webkit-scrollbar-thumb:active {
  background-color: #999999;
}
.image-card-character {
  border-radius: 50%;
  position: relative;
  z-index: 1;
  bottom: 48px;
  right: 36px;
}
.card {
  background-color: #fcfbfb !important;
  border: 0;
  border-radius: 0;
}

</style>

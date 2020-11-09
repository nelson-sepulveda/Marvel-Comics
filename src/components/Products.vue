<template>
  <div class="container-fluid">
    <div class="container-mini-header-order">
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
      <div v-for="comic in comics" :key="comic.id">
        <b-card
          title="Card Title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2 max-w col-md-4"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>
          <b-button href="#" variant="primary">Go somewhere</b-button>
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
    <b-sidebar
      id="sidebar-comics"
      title="Favoritos"
      backdrop
      shadow
      right
    >
      <div class="px-3 py-2">
        <div v-for="comic in favoritos" :key="comic.id">
          <p>
            {{ comic.title }}
          </p>
        </div>
      </div>
    </b-sidebar>

    <b-modal id="modal-details-comic">
      <template #modal-header>
        <div
          class="container-header-btn-close"
          @click="$bvModal.hide('modal-details-comic')"
        >
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
            <div class="container-imagen-and-p-button bg-color-gris2">
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
            class="w-50 container-button-modal-section bg-color-gris"
            @click="$bvModal.hide('modal-details-comic')"
          >
            <div class="container-imagen-and-p-button">
              <img
                src="../images/shopping-cart-primary.png"
                alt="shopping-cart-primary"
                class="image-field"
              >
              <p class="bg-color-red font-weight-bold margin-top-21">
                BUY FOR $3.99 
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
      variant: 'dark',
      comics: [],
      favoritos: [],
      detailComic: {},
      editId: '',
      productData: {
        'id' : '',
        'product_id': '',
        'product_name': '',
        'product_price': ''
      },
      editProductData: {
        'id' : '',
        'product_id': '',
        'product_name': '',
        'product_price': ''
      },
      products: []
    }
  },
  created() {
    this.getComics()
    this.getComicsFavorites()
  },
  computed:{
    sortedProducts(){
      return this.products.slice().sort((a,b)=>{
        return a.product_id - b.product_id
      })
    }
  },
  methods: {
    getComicsFavorites () {
      if (localStorage.getItem('favoritos')!==null) {
        const getFavoritos = JSON.parse(localStorage.getItem('favoritos'))
        this.favoritos = getFavoritos
      }
    },
    addToFavorites () {
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
        console.log(responseComic.data.data.results, '152')
        if (responseComic && responseComic.status === 200) {
          this.comics = responseComic.data.data.results
        }
      } catch (error) {
        console.log(error)
      }
    },
    getProducts() {
      db.collection('products').get().then(querySnapshot =>{
        const products = []
        // querySnapshot.forEach((doc)=>{
        //   products.push(doc.data())
        // })
        const productsArray = []
        let i = 0
        querySnapshot.forEach((doc)=>{
          productsArray.push(doc.data())
          productsArray[i].id = doc.id
          products.push(productsArray[i])
          i++
        })
        // for(let key in querySnapshot.docs){
        //   productsArray.push(querySnapshot.docs[key].data())
        //   productsArray[key].id = querySnapshot.docs[key].id
        //   products.push(productsArray[key])
        // }
        this.products = products
      })
    },
    onSubmit(){
      db.collection('products').add(this.productData).then(this.getProducts)
      this.productData.product_id = ''
      this.productData.product_name = ''
      this.productData.product_price = ''

    },
    // onDelete(product_id){
    //   db.collection('products').where('product_id', '==', product_id).get().then(querySnapshot =>{
    //     querySnapshot.forEach(doc=>{
    //       doc.ref.delete().then(this.getProducts)
    //     })
    //   })
    // }
    onDelete(id){
      db.collection('products').doc(id).delete().then((data)=> {
          this.getProducts()
      })
    },
    onEdit(product){
      this.editId = product.id
      this.editProductData.product_id = product.product_id
      this.editProductData.product_name = product.product_name
      this.editProductData.product_price = product.product_price
    },
    onCancel(){
      this.editId = ''
      this.editProductData.product_id = ''
      this.editProductData.product_name = ''
      this.editProductData.product_price = ''
    },
    onEditSubmit (id){
      db.collection("products").doc(id).set(this.editProductData).then(
        this.getProducts)
        this.editId = ''
        this.editProductData.product_id = ''
        this.editProductData.product_name = ''
        this.editProductData.product_price = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
  margin-bottom: 30px;
  margin-top: 30px;
}
.fz-20 {
  font-size: 24px;
}
</style>

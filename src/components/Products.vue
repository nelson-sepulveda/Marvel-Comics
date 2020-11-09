<template>
  <div class="products">
    <h3>Products</h3>
    <div class="card">
      <!-- <div class="card-header">
        Add a new product
      </div> -->
      <!-- <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>ID</label>
            <input v-model="productData.product_id" type="text" class="form-control ml-sm-2 mr-sm-4 my-2"  required>
          </div>
          <div class="form-group">
            <label>Name</label>
            <input v-model="productData.product_name" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Price</label>
            <input v-model="productData.product_price" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Add</button>
            
          </div>
        </form>
      </div> -->
    </div>

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

    <b-modal id="modal-details-comic" title="BootstrapVue">
      <p class="my-4">Hello from modal!</p>
      <p class="font-weigth-bold">
        {{ detailComic.title }}
      </p>
      <template #modal-footer>
        <div class="w-100">
          <p class="float-left">Modal Footer Content</p>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
          >
            Close
          </b-button>
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
    this.getProducts()
    this.getComics()
  },
  computed:{
    sortedProducts(){
      return this.products.slice().sort((a,b)=>{
        return a.product_id - b.product_id
      })
    }
  },
  methods: {
    onPressDetailComic (comic) {
      this.$bvModal.show('modal-details-comic')
      this.detailComic = { ...comic }
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
<style scoped>
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
</style>

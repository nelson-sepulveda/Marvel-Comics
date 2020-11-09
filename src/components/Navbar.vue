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
                name="input-search-comic"
                id="input-search-comic"
                placeholder="Search Character..."
                class="input-search-character"
              >
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
		  <!-- <router-link class="navbar-brand" to="/">Product Manager</router-link>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		    <span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse" id="navbarNav">
		    <ul class="navbar-nav">
		      <li class="nav-item active">
		        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
		      </li>
		      <li class="nav-item">
		        <a class="nav-link" href="#">Features</a>
		      </li>
		      <li class="nav-item">
		        <a class="nav-link" href="#">Pricing</a>
		      </li>
		      <li class="nav-item">
		        <a
              class="nav-link"
              href="#"
              v-b-toggle.sidebar-comics
            >
              Favoritos
            </a>
		      </li>
		    </ul>
		  </div> -->
		</div>
	</nav>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
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
</style>

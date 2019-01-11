<template>
  <div>
    <h1>DATA MANAGER</h1>
    <div class="container-fluid">
      <table class="table table-hover">
        <thead>
          <tr class="d-flex col-md-12 row">
            <th class="col-md-2">Picture</th>
            <th class="col-md-2">Name</th>
            <th class="col-md-4">Description</th>
            <th class="col-md-1">Category</th>
            <th class="col-md-1">Price</th>
            <th class="col-md-2">Active</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product,index) in listProducts"
            :idProduct="product.id"
            class="d-flex col-md-12 row"
          >
            <!-- picture -->
            <td class="col-md-2 data-img">
              <img class="img-data" v-bind:src="product.url">
            </td>
            <!-- Name -->
            <td v-if="product.onEdit" class="col-md-2 data data-name">
              <input v-model="product.Name">
            </td>
            <td v-else class="col-md-2 data data-name">{{product.Name}}</td>
            <!-- Description -->
            <td v-if="product.onEdit" class="col-md-4 data data-description">
              <input v-model="product.Description">
            </td>
            <td v-else class="col-md-4 data data-description">{{product.Description}}</td>
            <!-- Category -->
            <td v-if="product.onEdit" class="col-md-1 data-category">
              <select class="product-input-data" v-model="product.Category" name="Category">
                <option>smartphone</option>
                <option>tablet</option>
                <option>laptop</option>
              </select>
            </td>
            <td v-else class="col-md-1 data-category">{{product.Category}}</td>
            <!-- Price -->
            <td v-if="product.onEdit" class="col-md-1 data data-price">
              <input v-model="product.Price" type="number">
            </td>
            <td v-else class="col-md-1 data data-price">{{product.Price}}</td>
            <!-- active -->
            <td v-if="product.onEdit" class="col-md-2">
              <button class="btn btn-success ok-button" v-on:click="okClick(index)">ok</button>
              <button class="btn btn-secondary cancel-button" v-on:click="cancelClick(index)">cancel</button>
            </td>
            <td v-else class="col-md-2">
              <button class="btn btn-primary edit-button" v-on:click="editClick(index)">edit</button>
              <button class="btn btn-danger delete-button" v-on:click="deleteClick(index)">delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
 
<script>
module.exports = {
  data() {
    return {
      listProducts: []
    };
  },
  methods: {
    addProduct(data) {
      data.onEdit = false;
      this.listProducts.push(data);
    },
    showProduct() {
      console.log(this.listProducts);
    },
    editClick(index) {
      this.listProducts[index].onEdit = true;
      // console.log("editClick"+this.listProducts[index].id)
    },
    deleteClick(index) {
      if (confirm("delete product" + index)) {
        deleteProduct(this.listProducts[index].id);
        this.listProducts.splice(index);
      }
    },
    okClick(index) {
        updateProduct(this.listProducts[index])
        this.listProducts[index].onEdit = false;
    },
    cancelClick(index) {
      this.listProducts[index].onEdit = false;
    }
  }
};
</script>
 
<style>
</style>
<template>
  <div>
    <h1>FORM UPLOAD PRODUCT</h1>
    <div class="col-sm-8" id="Form">
      <table class="table table-hover">
        <tbody>
          <tr class="row">
            <td class="col-sm-4 product-infor-menu">Name:</td>
            <td class="col-sm-8">
              <input class="product-input-data" v-model="Name" name="productName">
            </td>
          </tr>
          <tr class="row">
            <td class="col-sm-4 product-infor-menu">Category:</td>
            <td class="col-sm-8">
              <select class="product-input-data" v-model="Category" name="Category">
                <option>smartphone</option>
                <option>tablet</option>
                <option>laptop</option>
              </select>
            </td>
          </tr>
          <tr class="row">
            <td class="col-sm-4 product-infor-menu">Description:</td>
            <td class="col-sm-8">
              <input class="product-input-data" v-model="Description" name="Description">
            </td>
          </tr>
          <tr class="row">
            <td class="col-sm-4 product-infor-menu">Price:</td>
            <td class="col-sm-8">
              <input class="product-input-data" v-model="Price" name="Price">
            </td>
          </tr>
          <tr class="row">
            <td class="col-sm-4 product-infor-menu">Picture:</td>
            <td class="col-sm-8">
              <input class="product-input-data" id="Picture" name="Picture" type="file">
            </td>
          </tr>
        </tbody>
      </table>
      <hr>
      <div class="form-group">
        <button class="btn btn-primary" v-on:click="addClick()">ADD</button>
      </div>
    </div>
  </div>
</template>
 
<script>
module.exports = {
  data() {
    return {
      Name: "",
      Description: "",
      Category: "",
      Price: ""
    };
  },
  methods: {
    getData: function() {
      return {
        Name: this.Name,
        Description: this.Description,
        Category: this.Category,
        Price: this.Price
      };
    },
    checkData: function() {
      if (this.Name == "") {
        alert("Please insert Name");
        return false;
      } else if (this.Description == "") {
        alert("Please insert Description");
        return false;
      } else if (this.Category == "") {
        alert("Please insert Category");
        return false;
      } else if (this.Price == "") {
        alert("Please insert Price");
        return false;
      }else if (!$("#Picture").val()) {
        alert("Please insert Price");
        return false;
      } else return true;
    },
    addClick: function() {
      var file_data = $("#Picture").prop("files")[0];
      if (this.checkData()) {
        uploadProductData(this.getData(),file_data);
      }
    }
  }
};
</script>
 
<style>
</style>
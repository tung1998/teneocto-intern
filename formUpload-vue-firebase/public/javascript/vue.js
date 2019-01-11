
Vue.component('product-list', httpVueLoader('/public/Components/product.vue'));
Vue.component('form-upload', httpVueLoader('/public/Components/form.vue'));
let app = new Vue({
    el: '#app',
})

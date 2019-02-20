let formData={};
// console.log(data)
// var form;
let editData = {};
// $("#Data-row button").click(()=>{
//     console.log($(this).parent());
// })
$(function() {
    data.forEach((item)=>{
        renderData(item)
    })

    $("#Data-row").on("click", "button.btn",(e)=>{
        let parent = e.target.parentElement.parentElement;
        let id = $(parent).attr("idProduct")
        console.log($(parent),$(e))
        if($(e.target).hasClass("edit-button")){
            editClick($(parent),id);
        }else if($(e.target).hasClass("delete-button")){
            deleteClick($(parent),id)
        }else if($(e.target).hasClass("ok-button")){
            okClick($(parent),id);
        }else {
            cancelClick($(parent),id);
        }


    })
});








function renderData(item) {
    $("#Data-row").append(`<tr class="d-flex col-md-12 row" idProduct="${item._id}">
                                <td class="col-md-2 data-img"><img class="img-data" src="/images/${item._id}"></td>
                                <td class="col-md-2 data data-name">${item.name}</td>
                                <td class="col-md-4 data data-description">${item.description}</td>
                                <td class="col-md-1 data-category">${item.category}</td>
                                <td class="col-md-1 data data-price">${item.price}</td>
                                <td class="col-md-2">
                                   <button class="btn btn-primary edit-button">edit</button>
                                   <button class="btn btn-danger delete-button">delete</button>
                                   <button class="btn btn-success ok-button" style="display: none">ok</button>
                                   <button class="btn btn-secondary cancel-button" style="display: none">cancel</button>
                        </td></tr>`)
}
function uploadData() {
    getData();
    console.log($(document).find('#Picture').get(0).files[0])
    let formUpload = new FormData();
    formUpload.append("picture", $(document).find('#Picture').get(0).files[0]);
    formUpload.append("name", formData.name);
    formUpload.append("description", formData.description);
    formUpload.append("category", formData.category);
    formUpload.append("price", formData.price);
    if(checkData()){
        $.ajax({
            type: 'post',
            url: '/uploadData',
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: formUpload,
            beforeSend: function(){
                // form = formUpload;
                // console.log(formUpload);
                alert("on Upload");
            },
            success: function (data) {
                // console.log(data);
                renderData(JSON.parse(data))
                alert("upload success")
            }
        })
    }
}
function getData() {
    formData.name = $("#Name").val();
    formData.description = $("#Description").val();
    formData.category = $("#Category").val();
    formData.price = $("#Price").val();
}

function checkData() {
    if(!formData.name) {
        alert("name empty")
        return false;
    }
    else if(!formData.description){
        alert("description empty")
        return false;
    }
    else if(!formData.category){
        alert("category empty")
        return false;
    }
    else if(!formData.price){
        alert("price empty")
        return false;
    }else if(!$("#Picture").val()){
        alert("picture empty")
        return false;
    }
    else return true;
}



function editClick(product,id) {
    product.find(`.ok-button`).show()
    product.find(`.cancel-button`).show()
    product.find(`.edit-button`).hide()
    product.find(`.delete-button`).hide();
    editData.name = product.find(`.data-name`).text();
    editData.description = product.find(`.data-description`).text();
    editData.category = product.find(`.data-category`).text();
    editData.price = product.find(`.data-price`).text();
    editData._id = id;
    product.find(".data").text("")
    product.find(".data-category").text("")
    product.find(`.data`).append(`<input>`)
    product.find(`.data-category`).append(`<select class="product-input-data" name="Category">
                                    <option>smartphone</option>
                                    <option>tablet</option>
                                    <option>laptop</option></select>`)


    product.find(`.data-name input`).val(editData.name);
    product.find(`.data-description input`).val(editData.description);
    product.find(`.data-category input` ).val(editData.category);
    product.find(`.data-price input`).val(editData.price);
    // (confirm("edit click"+id));
}

function deleteClick(product,id) {
    if(confirm("Delete Product?")){
        deleteProduct(product,id);
    }
    // alert("delete click"+id);

}
function okClick(product,id) {
    product.find(`.ok-button`).hide();
    product.find(`.cancel-button`).hide();
    product.find(`.edit-button`).show()
    product.find(`.delete-button`).show();
    editData.name=product.find(".data-name input").val()
    editData.description=product.find(".data-description input").val()
    editData.category=product.find(".data-category select").val()
    editData.price=product.find(".data-price input").val()


    product.find("input").remove
    product.find(`.data-category select`).remove();

    product.find(`.data-name`).text(editData.name);
    product.find(`.data-description`).text(editData.description);
    product.find(`.data-category` ).text(editData.category);
    product.find(`.data-price`).text(editData.price);
    editProduct();
    // alert("ok click"+id);
}
function cancelClick(product,id) {
    product.find(`.ok-button`).hide()
    product.find(`.cancel-button`).hide()
    product.find(`.edit-button`).show()
    product.find(`.delete-button`).show();



    product.find("input").remove
    product.find(`.data-category select`).remove();


    product.find(`.data-name`).text(editData.name);
    product.find(`.data-description`).text(editData.description);
    product.find(`.data-category` ).text(editData.category);
    product.find(`.data-price`).text(editData.price);
    // alert("cancel click"+id);
}

function deleteProduct(product,id) {
    $.ajax({
        type: 'post',
        url: '/deleteProduct',
        data: JSON.stringify({_id: id}),
        contentType: "application/json",
        success: function (data) {
            product.remove();
            alert("delete success"+id)
        }
    })

}

function editProduct() {
    console.log(editData);
    $.ajax({
        type: 'post',
        url: '/editProduct',
        data: JSON.stringify(editData),
        contentType: "application/json",
        success:  (data)=> {
            alert("edit success"+editData._id)
        }
    })
}

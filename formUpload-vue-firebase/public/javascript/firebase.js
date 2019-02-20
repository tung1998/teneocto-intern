
db.collection('products').orderBy('timeEdit').get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {
        let newData = doc.data();
        // newData.id = doc.id;
        // getUrl(newData)
        app.$children[1].addProduct(newData);
    });
})

var abc;


// file handle
var storageRef = firebase.storage().ref();
var $ = jQuery;

// function getUrl(newData){
//     let newRef = storageRef.child(`${newData.id}/${newData.id}`)
//     newRef.getDownloadURL().then((url)=>{
//         newData.url = url;
//         app.$children[1].addProduct(newData);
//     })
// }

function uploadProductData(data,file_data){
    db.collection('products').add(data)
    .then(function(docRef) {
        db.collection("products").doc(docRef.id).update({timeEdit:firebase.firestore.FieldValue.serverTimestamp()})
        const myNewFile = new File([file_data], docRef.id, {type: file_data.type});
        let ref = storageRef.child(`${docRef.id}/${docRef.id}`)
        console.log(docRef.id)
        ref.put(myNewFile).then((snapshot)=>{
            ref.getDownloadURL().then((url)=>{
                data.id = docRef.id;
                data.url = url;
                db.collection("products").doc(docRef.id).update({url:url,id:docRef.id})
                app.$children[1].addProduct(data);
            })
            alert("upload success")
        });
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    
}


function deleteProduct(id){
    db.collection("products").doc(id).delete();
    let newRef = storageRef.child(`${id}/${id}`)
    newRef.delete().then(function() {
        alert("delete Success")
        // File deleted successfully
      }).catch(function(error) {
          console.log(error);
        // Uh-oh, an error occurred!
      });
    
}

function updateProduct(newData){
    db.collection("products").doc(newData.id).update(newData)
    db.collection("products").doc(newData.id).update({timeEdit:firebase.firestore.FieldValue.serverTimestamp()})
}

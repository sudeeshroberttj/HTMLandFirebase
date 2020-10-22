/*   upid, uuid, name, description, algorithm, upvotes  */

const firestore = firebase.firestore();
const userTableBody = document.getElementById('userTableBody');
const browseTableBody = document.getElementById('browseTableBody');
const userform = document.getElementById('userForm');
const nameElement = document.getElementById('name');
const descElement = document.getElementById('description');
const algElement = document.getElementById('algorithm');
const upvotesElement = document.getElementById('upvotes');
const recordKeyElement = document.getElementById('recordkey');
const btnSaveChange = document.getElementById('saveChange');

userform.onsubmit = () =>{
    var upid = 1;
    var uuid = Math.floor(Math.random() * 1000); ;
    var name= nameElement.value;
    var description = descElement.value;
    var algorithm = algElement.value;
    var upvotes = upvotesElement.value;

    firestore.collection('pipelines').add({

        upid : upid,
        uuid : uuid,
        name : name,
        description : description,
        algorithm : algorithm,
        upvotes : upvotes
    });
  
    alert("Data updated");
    return false;
    
}

/* firestore.collection('pipelines').add({

    upid : 1,
    uuid : 2,
    name : "Modular image processing pipeline",
    description : "image transformations like translation, rotation, resizing, flipping and cropping",
    algorithm : "N/A",
    upvotes : "30"
}); */

firestore.collection('pipelines').get().then((snapshot)=>{
    userTableBody.innerHTML = "";
    snapshot.forEach((doc)=>{
      
        userTableBody.innerHTML += `<tr>    
        <td>${doc.id}</td>
        <td>${doc.data().name} </td>
        <td>${doc.data().description}</td> 
        <td>${doc.data().algorithm}</td> 
        <td>${doc.data().upvotes}</td> 
        <td><button type="button" onclick="editData('${doc.id}','${doc.data().uuid}')">Edit</button>
        <button type="button" onclick="deleteData('${doc.id}')">Delete</button>
        </td>`;
    })

})

function editData(recordId){

    firestore.collection('pipelines').doc(recordId).get().then(doc => {
       recordKeyElement.value = recordId;

        nameElement.value = doc.data().name;
        descElement.value = doc.data().description;
        algElement.value = doc.data().algorithm;
        upvotesElement.value = doc.data().upvotes;
    
})
return false;
}

btnSaveChange.onclick = () =>{
    recordId =  recordKeyElement.value;
    name= nameElement.value;
    description = descElement.value;
    algorithm = algElement.value;
    upvotes = upvotesElement.value;


    firestore.collection('pipelines').doc(recordId).update({
        name : name,
        description : description,
        algorithm : algorithm,
        upvotes : upvotes


    })
    return false;
}

function deleteData(recordId){

    firestore.collection('pipelines').doc(recordId).delete();
    alert("Data Deleted");


}


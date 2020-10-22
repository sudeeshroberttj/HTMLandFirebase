/*   upid, uuid, name, description, algorithm, upvotes  */

const firestore = firebase.firestore();
const browseTableBody = document.getElementById('browseTableBody');

firestore.collection('pipelines').get().then((snapshot)=>{
    browseTableBody.innerHTML = "";
    snapshot.forEach((doc)=>{
      
        browseTableBody.innerHTML += `<tr>    
        <td>${doc.id}</td>
        <td>${doc.data().name} </td>
        <td>${doc.data().description}</td> 
        <td>${doc.data().algorithm}</td> 
        <td>${doc.data().upvotes}</td>
        </tr>`;
    })

})




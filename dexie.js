//
// Declare Database
//
var db = new Dexie("FriendDatabase");
db.version(1).stores({
    friends: "++id,last_name,first_name"
});

const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
const submit = document.getElementById('submit');
//
// Manipulate and Query Database
//

submit.addEventListener('click', function () {
    var user = {
        first_name: first_name.value,
        last_name: last_name.value
    }
    db.friends.add(user)
        .catch(function (e) {
            alert("Error: " + (e.stack || e));
        });
});
db.friends.toArray()
    .then(
        data => data.forEach(element => {
            // Affiche le résultat + un bouton delete avec un identifiant unique
            document.getElementById('result').innerHTML += element.last_name + "<input  type='button' id='updateBTN" + element.id + "' value='update'><input  type='button' class='testdelete btn waves-effect waves-light' id='testDelete" + element.id + "' value='" + element.id + "'><br/>",
                // Supprime un élément de la liste
                document.getElementById('testDelete' + element.id).addEventListener('click', function () {
                    alert(document.getElementById('testDelete' + element.id).value);
                    db.friends.delete(parseInt(document.getElementById('testDelete' + element.id).value)).catch(function (e) {
                        alert("Error: " + (e.stack || e));
                    });

                });
            // Modifie
            document.getElementById('updateBTN' + element.id).addEventListener('click', function () {
                alert('dd');
                var user = {
                    last_name: "500",
                    first_name: "white"
                };

                db.friends.update(15, user).catch(function (e) {
                    alert("Error: " + (e.stack || e));
                });


            });


        }),

    ).catch(
        err => console.error(err)
    );



// Delete a row via its identifier fom database

/*indexedDB.deleteDatabase('FriendDatabase')
    .then(
        alert('DATABASE DELETED')
    ).catch(
        alert('FAIL DATABASE DELETED')
    );*/




function addUser() {
    const url = "https://mis321-backend.herokuapp.com/API/User";
    var emailText = document.getElementById("createEmail").value;
    var fNameText = document.getElementById("createFName").value;
    var lNameText = document.getElementById("createLName").value;

    let values = {
        email: emailText,
        userfname: fNameText,
        userlname: lNameText
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(values),
    })
    .then((response)=>{
        console.log(response);
        closePopout(0);
    });
}

function editUser() {
    var userid = document.getElementById("userid_edit").value;
    var emailText = document.getElementById("editEmail").value;
    var fNameText = document.getElementById("editFName").value;
    var lNameText = document.getElementById("editLName").value;
    var userStatus = parseInt(document.getElementById("userstatus").value);

    const url = "https://mis321-backend.herokuapp.com/API/User/" + userid;

    let values = {
        email: emailText,
        userfname: fNameText,
        userlname: lNameText,
        userstatus: userStatus
    };

    //console.log(values);

    fetch(url, {
        method: "PUT",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(values),
    })
    .then((response)=>{
        console.log(response);
        closePopout(1);
    });
}

function deleteUser() {
    var userid = document.getElementById("userid_delete").value;

    const url = "https://mis321-backend.herokuapp.com/API/User/" + userid;

    fetch(url, {
        method: "DELETE",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    })
    .then((response)=>{
        console.log(response);
        closePopout(2);
    });
}

function getUserIDs(i) {
    const loggedInUser = localStorage.getItem("userid");
    const url = "https://mis321-backend.herokuapp.com/API/User";

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "";
        json.forEach((user)=>{
            if (user.userid == loggedInUser) {
                html += "";
            }
            else {
                html += "<option value=\"" + user.userid + "\">" + user.userid;
                html += "; " + user.userfname + " " + user.userlname;
                html += "</option>";
            }
        });
        document.getElementsByClassName("userid_data")[i].innerHTML = html;
    });
}

function createUserPopup(){
    var modal = document.getElementById("createModal");
    modal.style.display = "block";
}

function editUserPopup(){
    var modal = document.getElementById("editModal");
    modal.style.display = "block";
    getUserIDs(0);
}

function deleteUserPopup(){
    var modal = document.getElementById("deleteModal");
    modal.style.display = "block";
    getUserIDs(1);
}

function closePopout(i)
{
    var modal = document.getElementsByClassName("modal")[i];
    modal.style.display = "none";
}

// window.onclick = function(event)
// {
//     var modal = document.getElementsByClassName("modal")[1,2,3];
//     if(event.target == modal)
//     {
//         modal.style.display = "none";
//     }
// }

function goBack() {
    history.back();
}
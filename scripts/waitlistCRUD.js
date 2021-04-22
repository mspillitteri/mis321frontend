function addWaitlist() {

    var itemid = parseInt(document.getElementById("waitlist_itemid_create").value);
    var userid = document.getElementById("waitlist_userid_create").value;

    const url = "https://mis321-backend.herokuapp.com/API/Waitlist/" + userid;

    let values = {
        itemid: itemid
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

function editWaitlist() {
    var waitlistid = document.getElementById("waitlistid_edit").value;
    var itemid = document.getElementById("waitlist_itemid_edit").value;
    var userid = document.getElementById("waitlist_userid_edit").value;

    const url = "https://mis321-backend.herokuapp.com/API/Waitlist/" + waitlistid + "/" + itemid + "/" + userid;

    fetch(url, {
        method: "PUT",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        }
    })
    .then((response)=>{
        console.log(response);
        closePopout(1);
    });
}

function deleteWaitlist() {
    var waitlistid = document.getElementById("waitlistid_delete").value;

    const url = "https://mis321-backend.herokuapp.com/API/Waitlist/" + waitlistid;

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

// function getItemIDs(i) {
//     const url = "https://localhost:5001/API/Item";

//     fetch(url).then(function(response){
//         console.log(response);
//         return response.json();
//     }).then(function(json){
//         let html = "";
//         json.forEach((item)=>{
//             if (item.ischeckedout == false) {
//                 html += "<option value=\"" + item.itemid + "\">" + item.itemid;
//                 html += "; " + item.itemname + " - " + item.itemstatus;
//                 html += "</option>";
//             }
//         });
//         document.getElementsByClassName("checkout_itemid_data")[i].innerHTML = html;
//     });
// }

function getOutgoingItemIDs(i) {
    const url = "https://mis321-backend.herokuapp.com/API/Item";

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "";
        json.forEach((item)=>{
            if (item.ischeckedout == true) {
                html += "<option value=\"" + item.itemid + "\">" + item.itemid;
                html += "; " + item.itemname + " - " + item.itemstatus;
                html += "</option>";
            }
        });
        document.getElementsByClassName("waitlist_itemid_data")[i].innerHTML = html;
    });
}

function getUserIDs(i) {
    const url = "https://mis321-backend.herokuapp.com/API/User";

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "";
        json.forEach((user)=>{
                html += "<option value=\"" + user.userid + "\">" + user.userid;
                html += "; " + user.userfname + " " + user.userlname;
                html += "</option>";
        });
        document.getElementsByClassName("waitlist_userid_data")[i].innerHTML = html;
    });
}

function getWaitlistIDs(i) {
    const url = "https://mis321-backend.herokuapp.com/API/Waitlist";

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "";
        json.forEach((waitlist)=>{
                html += "<option value=\"" + waitlist.waitlistid + "\">" + waitlist.waitlistid;
                html += "</option>";
        });
        document.getElementsByClassName("waitlistid_data")[i].innerHTML = html;
    });
}

function createWaitlistPopup(){
    var modal = document.getElementById("createModal");
    modal.style.display = "block";
    getOutgoingItemIDs(0);
    getUserIDs(0);
}

function editWaitlistPopup(){
    var modal = document.getElementById("editModal");
    modal.style.display = "block";
    getOutgoingItemIDs(1);
    getUserIDs(1);
    getWaitlistIDs(0);
}

function deleteWaitlistPopup(){
    var modal = document.getElementById("deleteModal");
    modal.style.display = "block";
    getWaitlistIDs(1);
}

function closePopout(i)
{
    var modal = document.getElementsByClassName("modal")[i];
    modal.style.display = "none";
}

function goBack() {
    history.back();
}

function writeUserName() {
    const userName = localStorage.getItem("userName");
    let html = "<p>Welcome " + userName + "</p>";
    document.getElementById("welcomeuser").innerHTML = html;
}
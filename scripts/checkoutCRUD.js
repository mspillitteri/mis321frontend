function addCheckout() {

    var itemid = parseInt(document.getElementById("checkout_itemid_create").value);
    var userid = document.getElementById("checkout_userid_create").value;

    const url = "https://mis321-backend.herokuapp.com/API/Checkout/" + userid;

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

function editCheckout() {
    var checkoutid = document.getElementById("checkoutid_edit").value;
    var itemid = parseInt(document.getElementById("checkout_itemid_edit").value);
    var userid = parseInt(document.getElementById("checkout_userid_edit").value);
    var checkoutTime = document.getElementById("checkout_checkouttime_edit").value;
    var dueDate = document.getElementById("checkout_duedate_edit").value;
    var returned = parseInt(document.getElementById("isReturned_edit").value);
    var isReturned = false;

    if (returned == 1) {
        isReturned = true;
    }

    const url = "https://mis321-backend.herokuapp.com/API/Checkout/" + checkoutid;

    let values = {
        itemid: itemid,
        userid: userid,
        checkouttime: checkoutTime,
        duedate: dueDate,
        isreturned: isReturned
    };

    console.log(values);

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

function deleteCheckout() {
    var checkoutid = document.getElementById("checkoutid_delete").value;

    const url = "https://mis321-backend.herokuapp.com/API/Checkout/" + checkoutid;

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

function getItemIDs(i) {
    const url = "https://mis321-backend.herokuapp.com/API/Item";

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "";
        json.forEach((item)=>{
            if (item.ischeckedout == false) {
                html += "<option value=\"" + item.itemid + "\">" + item.itemid;
                html += "; " + item.itemname + " - " + item.itemstatus;
                html += "</option>";
            }
        });
        document.getElementsByClassName("checkout_itemid_data")[i].innerHTML = html;
    });
}

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
        document.getElementsByClassName("checkout_itemid_data")[i].innerHTML = html;
    });
}

function getUserIDs(i) {
    //const loggedInUser = localStorage.getItem("userid");
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
        document.getElementsByClassName("checkout_userid_data")[i].innerHTML = html;
    });
}

function getCheckoutIDs(i) {
    const url = "https://mis321-backend.herokuapp.com/API/Checkout";

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "";
        json.forEach((checkout)=>{
                html += "<option value=\"" + checkout.checkoutid + "\">" + checkout.checkoutid;
                html += "</option>";
        });
        document.getElementsByClassName("checkoutid_data")[i].innerHTML = html;
    });
}

function createCheckoutPopup(){
    var modal = document.getElementById("createModal");
    modal.style.display = "block";
    getItemIDs(0);
    getUserIDs(0);
}

function editCheckoutPopup(){
    var modal = document.getElementById("editModal");
    modal.style.display = "block";
    getOutgoingItemIDs(1);
    getUserIDs(1);
    getCheckoutIDs(0);
}

function deleteCheckoutPopup(){
    var modal = document.getElementById("deleteModal");
    modal.style.display = "block";
    getCheckoutIDs(1);
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
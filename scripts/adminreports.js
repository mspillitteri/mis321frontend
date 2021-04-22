function onLoad() {
    getCheckedOut();
    getUserIDs();
}

function getInvItems() {
    const url = "https://mis321-backend.herokuapp.com/API/Item";
    
    //writeUserName();

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "<ul id=\"list\">";
        json.forEach((item)=>{
            html += "<li class=\"flex\"><div class=\"picture\"></div>"; 
            html += "&ensp;" + item.itemid + "&emsp;" + item.itemname + "&emsp;" + item.itemstatus;
        });
        html += "</ul>";
        document.getElementById("invitems").innerHTML = html;
    }).catch(function(error){
        console.log(error);
    });
}

function writeUserName() {
    const userName = localStorage.getItem("userName");
    let html = "<p>Welcome " + userName + "</p>";
    document.getElementById("welcomeuser").innerHTML = html;
}

function getCheckedOut() {
    const url = "https://mis321-backend.herokuapp.com/API/CheckedOutItem";

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "<ul id=\"list\">";
        json.forEach((item)=>{
            html += "<li class=\"flex\"><div class=\"picture\"></div>"; 
            html += "&ensp;" + item.itemid + "&emsp;" + item.itemname + "&emsp;" + item.userfname + " " + item.userlname + "&emsp;" + (new Date(Date.parse(item.duedate))).toLocaleDateString('en-US');
        });
        html += "</ul>";
        document.getElementById("coitems").innerHTML = html;
    }).catch(function(error){
        console.log(error);
    });
}

function goBack() {
    history.back();
}

function getUserIDs() {
    const url = "https://mis321-backend.herokuapp.com/API/User";

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "";
        json.forEach((user)=>{
            html += "<option value=\"" + user.userfname + user.userlname + "\">" + user.userid;
            html += "; " + user.userfname + " " + user.userlname;
            html += "</option>";
        });
        document.getElementById("emplsearch").innerHTML = html;
    });
}

//doesn't work atm

function filterCheckedOut() {
    var filter = document.getElementById("emplsearch").value;
    const url = "https://mis321-backend.herokuapp.com/API/CheckedOutItem";

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "<ul id=\"list\">";
        json.forEach((item)=>{
            if (filter == (item.userfname + item.userlname)) {
                html += "<li class=\"flex\"><div class=\"picture\"></div>"; 
                html += "&ensp;" + item.itemid + "&emsp;" + item.itemname + "&emsp;" + item.userfname + " " + item.userlname + "&emsp;" + (new Date(Date.parse(item.duedate))).toLocaleDateString('en-US');
            }
        });
        html += "</ul>";
        document.getElementById("coitems").innerHTML = html;
    }).catch(function(error){
        console.log(error);
    });
}
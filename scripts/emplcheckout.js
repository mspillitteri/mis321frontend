var waitlists = "";

function getItems() {
    const userid = localStorage.getItem("userid");
    const url = "https://mis321-backend.herokuapp.com/API/Item";
    writeUserName();

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "<ul id=\"list\">";
        json.forEach((item)=>{
            //var topUser = getTopOfWaitlist(item.itemid);
            //var hasWaitlist = waitlistCheck(item.itemid);
            html += "<li class=\"flex\"><div class=\"picture\"></div>"; 
            html += "&ensp;" + item.itemname + "&emsp;" + item.itemstatus;
            if (item.ischeckedout == true) { 
                //show if item is checked out
                html += "<button class=\"buttons\" onclick=\"addWaitlist("+item.itemid+",\'"+userid+"')\">Join Waitlist</button>";
                html += "&nbsp;";
                html += "<button class=\"buttons\" onclick=\"showPopout("+item.itemid+")\">Show Waitlist</button>";
            }
            else if (item.ischeckedout == false) {
                //show for everyone
                html += "<button class=\"buttons\" onclick=\"addCheckout("+item.itemid+",\'"+userid+"')\">Checkout</button>";
                html += "&nbsp;";
            }
            html += "</li><p></p>";
        });
        html += "</ul>";
        document.getElementById("items").innerHTML = html;
    }).catch(function(error){
        console.log(error);
    });
}

function addCheckout(currentItem, currentUser) {
    const url = "https://mis321-backend.herokuapp.com/API/Checkout/" + currentUser;

    fetch(url, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            itemid: currentItem
        })
    })
    .then((response)=>{
        console.log(response);
        getItems();
    })
}

function addWaitlist(currentItem, currentUser) {
    const url = "https://mis321-backend.herokuapp.com/API/Waitlist/" + currentUser;

    fetch(url, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            itemid: currentItem
        })
    })
    .then((response)=>{
        console.log(response);
        getItems();
    })
}

function writeUserName() {
    const userName = localStorage.getItem("userName");
    let html = "<p>Welcome " + userName + "</p>";
    document.getElementById("welcomeuser").innerHTML = html;
}

function getTopOfWaitlist(itemid) {
    const url = "https://mis321-backend.herokuapp.com/API/Waitlist";
    const userid = localStorage.getItem("userid");

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        console.log(json);
        var topUser = "";
        json.forEach((waitlist)=>{
        if (waitlist.itemid == itemid && waitlist.userid == userid) {
            topUser = waitlist.userid;
            }
        });
        return topUser;
    });
}

function waitlistCheck(itemid) {
    const url = "https://mis321-backend.herokuapp.com/API/Waitlist";

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        console.log(json);
        var hasWaitlist = false;
        json.forEach((waitlist)=>{
        if (waitlist.itemid == itemid) {
            hasWaitlist == true;
            }
        });
        return hasWaitlist;
    });
    
}

function getWaitlists() {
    const url = "https://mis321-backend.herokuapp.com/API/Waitlist";

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        console.log(json);
        return json;
    });
}

function goBack() {
    history.back();
}
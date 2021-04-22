function onLoad() {
    findUserCheckouts();
}

function findUserCheckouts() {
    const userid = localStorage.getItem("userid");
    const url = "https://mis321-backend.herokuapp.com/API/Checkout";

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        for (i=0; i<json.length; i++) {
            if (json[i].userid == userid) {
                getReturnItems(json[i].userid);
                break;
            }
        }
    });
}

function getReturnItems(checkout) {
    const userid = localStorage.getItem("userid");
    const url = "https://mis321-backend.herokuapp.com/API/Item";

    writeUserName();

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "<ul id=\"list\">";
        json.forEach((item)=>{
            if (item.ischeckedout && userid == checkout) {
                html += "<li class=\"flex\"><div class=\"picture\"></div>"; 
                html += "&ensp;" + item.itemname + "&emsp;" + item.itemstatus;
                html += "<button class=\"buttons\"onclick=\"findCheckout("+item.itemid+")\">Return</button>";
                html += "</li><p></p>";
            }
        });
        html += "</ul>";
        document.getElementById("items").innerHTML = html;
    }).catch(function(error){
        console.log(error);
    });
}

function addReturn(checkout, itemid) {

    const userstat = localStorage.getItem("userstatus");
    const userid = localStorage.getItem("userid");
    const url = "https://mis321-backend.herokuapp.com/API/Return/" + userid + "/" + userstat + "/" + itemid;

    fetch(url, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            checkoutid: checkout.checkoutid
        })
    })
    .then((response)=>{
        console.log(response);
        onLoad();
    })
}

function writeUserName() {
    const userName = localStorage.getItem("userName");
    let html = "<p>Welcome " + userName + "</p>";
    document.getElementById("welcomeuser").innerHTML = html;
}

function findCheckout(itemid)
{
    const userid = localStorage.getItem("userid");
    const url = "https://mis321-backend.herokuapp.com/API/Checkout/";

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        for (i=0; i<json.length; i++) {
            if (json[i].userid == userid && json[i].itemid == itemid) {
                addReturn(json[i], itemid);
                break;
            }
        }
    });

}

function goBack() {
    history.back();
}
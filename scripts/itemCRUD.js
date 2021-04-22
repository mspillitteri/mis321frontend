function addItem() {
    const url = "https://mis321-backend.herokuapp.com/API/Item";
    var nameText = document.getElementById("createName").value;

    let values = {
        itemname: nameText
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

function editItem() {
    var itemid = document.getElementById("itemid_edit").value;
    var nameText = document.getElementById("editName").value;
    var statusText = document.getElementById("editStatus").value;
    var checkedOut = parseInt(document.getElementById("isCheckedOut").value);
    var isCheckedOut = false;

    if (checkedOut == 1) {
        isCheckedOut = true;
    }

    const url = "https://localhost:5001/API/Item/" + itemid;

    let values = {
        itemname: nameText,
        itemstatus: statusText,
        ischeckedout: isCheckedOut
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

function deleteItem() {
    var itemid = document.getElementById("itemid_delete").value;

    const url = "https://localhost:5001/API/Item/" + itemid;

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
    const url = "https://localhost:5001/API/Item";

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        let html = "";
        json.forEach((item)=>{
            html += "<option value=\"" + item.itemid + "\">" + item.itemid;
            html += "; " + item.itemname + " - " + item.itemstatus;
            html += "</option>";
        });
        document.getElementsByClassName("itemid_data")[i].innerHTML = html;
    });
}

function createItemPopup(){
    var modal = document.getElementById("createModal");
    modal.style.display = "block";
}

function editItemPopup(){
    var modal = document.getElementById("editModal");
    modal.style.display = "block";
    getItemIDs(0);
}

function deleteItemPopup(){
    var modal = document.getElementById("deleteModal");
    modal.style.display = "block";
    getItemIDs(1);
}

function closePopout(i)
{
    var modal = document.getElementsByClassName("modal")[i];
    modal.style.display = "none";
}

function goBack() {
    history.back();
}
function getWaitlist(itemid) {
    const url = "https://mis321-backend.herokuapp.com/API/Waitlist/" + itemid;
    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
       
        let html = "<table class=\"halfpage\">";
        html += "<tr><th>WaitlistID</th><th>ItemID</th><th>UserID</th></tr>";
        json.forEach((waitlist)=>{
        if (waitlist.itemid == itemid) {
            html += "<tr><td>" + waitlist.waitlistid + "</td>"; 
            html += "<td>" + waitlist.itemid + "</td>"; 
            html += "<td>" + waitlist.userid + "</td>";
            html += "<td>" + waitlist.userfname + "</td>"; 
            html += "<td>" + waitlist.userlname + "</td></tr>";  
            }
        });
        html += "</table>";
        document.getElementById("emplWaitlist").innerHTML = html;
    });
}

function showPopout(itemid){
    getWaitlist(itemid);
    console.log(itemid);
    var modal = document.getElementById("editModal");
    modal.style.display = "block";
}

function closePopout()
{
    var modal = document.getElementById("editModal");
    modal.style.display = "none";
}

window.onclick = function(event)
{
    var modal = document.getElementById("editModal");
    if(event.target == modal)
    {
        modal.style.display = "none";
    }
}



function getUsers() {
    const url = "https://localhost:5001/API/User";

    fetch(url).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(json){
        console.log(json);
        users = json;
        login(users);
    });
}

function login(users) {
    const loginInfo = document.getElementById("logintext").value;
    users.forEach(user =>{
        if (loginInfo == user.email && user.isadmin == true) {
            localStorage.setItem("userid", user.userid);
            localStorage.setItem("userName", user.userfname + " " + user.userlname);
            localStorage.setItem("userstatus", user.userstatus);
            window.location.href = "./adminhome.html";
        }
        else if (loginInfo == user.email) {
            localStorage.setItem("userid", user.userid);
            localStorage.setItem("userName", user.userfname + " " + user.userlname);
            localStorage.setItem("userstatus", user.userstatus);
            window.location.href = "./emplhome.html";
        }
    });
}
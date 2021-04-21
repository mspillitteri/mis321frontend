function emplcheckout() {
    window.location.href = "./emplcheckout.html";

}
function emplreturn() {
    window.location.href = "./emplreturn.html";
}

function writeUserName() {
    const userName = localStorage.getItem("userName");
    let html = "<p>Welcome " + userName + "</p>";
    document.getElementById("welcomeuser").innerHTML = html;
}
function logOut() {
    history.back();
    localStorage.removeItem("userid");
    localStorage.removeItem("userName");
    localStorage.removeItem("userstatus");
}
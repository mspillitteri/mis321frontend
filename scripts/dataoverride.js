function adminUserCRUD() {
    window.location.href = "./adminuserCRUD.html";
}

function adminItemCRUD() {
    window.location.href = "./adminitemCRUD.html";
}

function adminCheckoutCRUD() {
    window.location.href = "./admincheckoutCRUD.html";
}

function adminWaitlistCRUD() {
    window.location.href = "./adminwaitlistCRUD.html";
}

function goBack() {
    history.back();
}

function writeUserName() {
    const userName = localStorage.getItem("userName");
    let html = "<p>Welcome " + userName + "</p>";
    document.getElementById("welcomeuser").innerHTML = html;
}
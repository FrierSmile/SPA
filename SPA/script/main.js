$(document).ready(function(){
    $('#pInfo').slideUp(0);
    $('#figure').slideUp(0).slideDown(1000);
    
    //это заранее созданые карточки в качестве примера
    users[0] = {firstName: "Генадий", sureName: "Русик",login: "10", password:"20", role:'user', imgPath: "../img/1.jpg"};
    users[1] = {firstName: "Саня", sureName: "Соткин",login: "100", password:"200", role:'masterUser', imgPath: "../img/2.jpg"};

    let back = document.createElement("button");//кнопка возвращения на страницу авторизации
    var txt = document.createTextNode("Exit");     
    back.appendChild(txt); 
    $('footer').append(back);  

    back.onclick = function(){indexPage()};

    let btn = document.createElement("button");//кнопка возвращения карточек к исходному виду
    var t = document.createTextNode("Refresh page");     
    btn.appendChild(t);                          
    $('footer').append(btn);  

    let content = $("#wrap");

    btn.onclick = function(){refreshPage(content)};

    createUserForm();
    showCount();
});

function showCount(){//показать сколько существует карточек
    let count = $(".userForm").length;
    $("header").html("Всего пользователей " + count);
}

function refreshPage(){
    users.length = 0;

    users[0] = {firstName: "Генадий", sureName: "Русик",login: "10", password:"20", role:'333', imgPath: "../img/1.jpg"};
    users[1] = {firstName: "Саня", sureName: "Соткин",login: "100", password:"200", role:'222', imgPath: "../img/2.jpg"};

    let parent = $("#content")[0];
    
    while($(".userForm").length){
        parent.removeChild($(".userForm")[0]);
    }

    createUserForm();
    showCount();
    moveFigureLeftShow();
}

function autorization(){

    let login = $("#iLogin").val();
    let password = $("#iPassword").val();

    if(login == "admin" && password == "admin"){
        window.open("html/Registr.html", "_self");
    }
    else{
        alert("Login or password are incorrect");
    }
}

function indexPage(){
    window.open("../Index.html", "_self");
}

var users = [];//массив карточек
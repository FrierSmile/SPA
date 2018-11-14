function createUserFormHelp1(form){
    let div = document.createElement("div");
    div.className = "dis";
    form.appendChild(div);

    return div;
}

function createUserFormHelp2(form){
    let info = document.createElement("div");
    info.className = "dis contur";
    form.appendChild(info);

    return info;
}

function createUserForm(user = 0){
    if (user == 0){ //ситуация, когда нужно создать карточки вместе с загрузкой страницы
        for(let i in users){
            let form = document.createElement("div");//"обертка карточки"
            form.className = "userForm";

            let parent = document.getElementById("content");
            parent.appendChild(form);

            let head = document.createElement("div");//текстовое описание карточки
            head.className ="text";
            form.appendChild(head);

            head.innerHTML = "Это человек";

            let photo = document.createElement("div");
            photo.className = "userPhoto";
            form.appendChild(photo);

            let userPhoto = document.createElement("img");
            userPhoto.setAttribute("alt","тут будет его фото");
            userPhoto.setAttribute("width","111px");
            userPhoto.setAttribute("height","111px");
            userPhoto.setAttribute("src", users[i].imgPath);

            photo.appendChild(userPhoto);     

            for(let j=0; j < $(".textbox").length; j++){    //создается наполнение карточки
                
                let div = createUserFormHelp1(form);

                div.innerHTML = $(".dis")[j].innerHTML;//это атрибуты (имя,фамилия,логин,пароль,права)

                let info = createUserFormHelp2(form);//это место, где будут лежать значения атрибутов

                info.innerHTML = users[i][$(".textbox")[j].name];//на карточку пользователя переносим информацию о пользователе
                info.trueValue = users[i][$(".textbox")[j].name];//это резервная копия этой информации
                    
                if(j % 4 == 0 && j != 0){
                    info.style.background ="red";
                }
            }
              

            let updateInfo = document.createElement("div");//создание кнопки обновления информации о пользователе
            updateInfo.className = "updateInfo";
            updateInfo.innerHTML = "Update";
            updateInfo.onclick = function(){update(updateInfo.parentNode);};
            form.appendChild(updateInfo);


            let del = document.createElement("div");//создание кнопки удаления карточки пользователя
            del.className = "del";
            del.innerHTML = "Delete";
            del.onclick = function(){delHuman(del);};
            form.appendChild(del);
            
            let checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.className = "checkbox"
            checkbox.onclick = function(){showHidePassword(form);};
            form.appendChild(checkbox);

            showHidePassword()

            showCount();
        }
    }
    else{//это админ добавил нового юзера и нажал save
        let form = document.createElement("div");
        form.className = "userForm";

        let parent = document.getElementById("content");
        parent.appendChild(form);

        let head = document.createElement("div");
        head.className ="text";
        form.appendChild(head);

        head.innerHTML = "Это человек";

        let photo = document.createElement("div");
        photo.className = "userPhoto";
        form.appendChild(photo);

        let userPhoto = document.createElement("img");
        userPhoto.setAttribute("alt","тут будет его фото");
        userPhoto.setAttribute("width","111px");
        userPhoto.setAttribute("height","111px");
        userPhoto.setAttribute("src", user.imgPath);

        photo.appendChild(userPhoto);
        
        for(let i=0; i < $(".textbox").length; i++){
                let div = createUserFormHelp1(form);

                div.innerHTML = $(".dis")[i].innerHTML;

                let info = createUserFormHelp2(form);

                info.innerHTML = user[$(".textbox")[i].name];
                info.trueValue = user[$(".textbox")[i].name];

                if(i == $(".textbox").length-1){
                    info.style.background ="red";
                }
        }

        let updateInfo = document.createElement("div");//создание кнопки обновления информации о пользователе
        updateInfo.className = "updateInfo";
        updateInfo.innerHTML = "Update";
        updateInfo.onclick = function(){update(updateInfo.parentNode);};
        form.appendChild(updateInfo);


        let del = document.createElement("div");
        del.className = "del";
        del.innerHTML = "Delete";
        del.onclick = function(){delHuman(del);};
        form.appendChild(del);    

        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.className = "checkbox"
        checkbox.onclick = function(){showHidePassword(form);};
        form.appendChild(checkbox);

        showHidePassword();

        showCount();
    }

    $(".userForm").slideUp(0);
}

function savePInfo(){ //Функция считывает информацию о создаваемом пользователе и отправляет данные на создание карточки
    var user = {};

    for(let i=0; i < $(".textbox").length; i++)
    {
        user[$(".textbox")[i].name] = $(".textbox")[i].value;
        $(".textbox")[i].value = "";
    }

    let path = "#";
    if($("#photo")[0].files[0]){
        path = $("#photo")[0].files[0].name;
    }

    user.imgPath = "../img/" + path;

    users.push(user);

    moveFigureLeftCreate();

    createUserForm(user);

    setTimeout(function(){//при создание нового пользователя произойдут анимации, которые приведут к показу реестра пользователей
        moveFigureLeftShow(); 
    }, 2100);
}

function delHuman(del){
    let name = del.parentNode.children[3].innerHTML;
    let result = confirm("Вы действительно хотите удалить пользователя "+name+"?")
    if(result)
        del.parentNode.parentNode.removeChild(del.parentNode);//Найди отца своего отца, пусть он удалит твоего отца (blood feud in js was added)
    
    delVidjet();
    showCount();
}

function showHidePassword(){
    $('input[type=checkbox]').each(function () {
        if ( $(this).is(":checked")) {
            doShow(this);
        }
        else    
            doHide(this);
    });
    function doHide(checkbox){
        checkbox.parentNode.children[9].innerHTML = checkbox.parentNode.children[9].innerHTML.replace(/[\s\S]/g, "*") ;
    }
    function doShow(checkbox){
        checkbox.parentNode.children[9].innerHTML = checkbox.parentNode.children[9].trueValue;
    }
}
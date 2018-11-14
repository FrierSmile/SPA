function update(target){    //создаем виджет апдейта карточки

    delVidjet();    //но перед этим удалим предыдущий виджет (если был такой)

    let form = document.createElement("div");
    form.id = "changeForm";

    let parent = document.getElementById("content");
    parent.appendChild(form);

    let head = document.createElement("div");
    head.className ="text";
    form.appendChild(head);

    head.innerHTML = "Редактировать пользователя";

    let photo = document.createElement("div");
    photo.className = "userPhoto";
    photo.style.marginLeft = "15px";
    photo.style.marginTop = "16px";
    photo.style.height = "98px";
    photo.style.width = "98px";
    form.appendChild(photo);

    let userPhoto = document.createElement("img");
    userPhoto.setAttribute("alt","тут будет его фото");
    userPhoto.setAttribute("width","98px");
    userPhoto.setAttribute("height","98px");

    let photoPath = target.children[1].firstChild.src;

    userPhoto.setAttribute("src",photoPath);
    
    userPhoto.onmouseover = userPhoto.style.cursor='pointer';
    userPhoto.onclick = function(){changePhoto(userPhoto);};

    photo.appendChild(userPhoto);

    let stop = 0;

    for(let i=0; i < $(".textbox").length; i++){// создаем текстбоксы и инпуты и копируем информацию из меняемой карточки

        if(i == $(".textbox").length-1){//это создание последней строчки виджета, оно отличается от всех остальных тем, что у нее инпут селект, а не текстбокс
            let div = createUserFormHelp1(form);
            div.innerHTML = $(".dis")[i].innerHTML;

            let input = document.createElement("select");

            let option1 = document.createElement("option");
            option1.setAttribute("value","User");
            option1.innerHTML = "User";

            let option2 = document.createElement("option");
            option2.setAttribute("value","Master user");
            option2.innerHTML = "Master user";

            let option3 = document.createElement("option");
            option3.setAttribute("value","Admin");
            option3.innerHTML = "Admin";

            input.appendChild(option1);
            input.appendChild(option2);
            input.appendChild(option3);
            
            form.appendChild(input);

            input.style.marginLeft = "25px";
            input.style.background ="red";
        }
        else{// это создание с первой до предпоследней строчки виджета
            let div = createUserFormHelp1(form);

            div.innerHTML = $(".dis")[i].innerHTML;
    
            let input = document.createElement("input");
            input.type = "text";
            input.style.marginLeft = "25px";
    
            for(let j = stop; j < target.children.length; j++){
               if (target.children[j].classList.contains("contur")){
                   input.value = target.children[j].trueValue;
                   stop = ++j;
                   break;                      
               }   
            }
    
            form.appendChild(input);
        }


    }   

    let save = document.createElement("div");//кнопка для сохранения внесенных изменений
    save.className = "save";
    save.innerHTML = "Save";
    save.onclick = function(){saveInfo(save, target);};
    form.appendChild(save);
}

function saveInfo(saveButton, parent){

    let div = saveButton.parentNode;

    parent.children[1].firstChild.src = div.children[1].firstChild.src;

    for(let j = 0; j < parent.children.length; j++){
        if (parent.children[j].classList.contains("contur")){
            parent.children[j].innerHTML = div.children[j].value;
            parent.children[j].trueValue = div.children[j].value;
        }
     }

     showHidePassword();
     
    div.parentNode.removeChild(div);
}

function delVidjet(){
    if($("#changeForm")[0]){    //если ранее был создан виджет и его не закрыли, то закрыть его
        $("#content")[0].removeChild($("#changeForm")[0]);
    }
}

function changePhoto(userPhoto){
    let globalPhoto = $('#photo');

    $('#photo').click();   
    globalPhoto[0].addEventListener("change", newPhotoShow)

    function newPhotoShow(){
        userPhoto.src ="../img/" + $("#photo")[0].files[0].name;
    }
}
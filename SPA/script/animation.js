var flag = false;
var animationFlag = false;
var textRemember;

function moveFigureLeftCreate(){//первре нажатие по кнопке приведет к одной анимации, второе нажатие приведет к обратной анимации    
    if(!flag && !animationFlag){//пока идет анимация новые нажатия по кнопке будут игнорироваться
        animationFlag = true;
        $('#figure').animate({left: "180"},1000);
        textRemember = $('#v1').html();
        $('#v1').html("Назад").animate({top: 30},1000);
        $('#v2').slideUp(500);    
        flag = true;         

        setTimeout(function(){
            $('#pInfo').slideToggle(1000);  
            setTimeout(function(){
                animationFlag = false;     
            }, 1000);   
        }, 1000); 
    }
    else{ 
        if(!animationFlag)
        {
            animationFlag = true;
            $('#pInfo').slideToggle(1000);

            setTimeout(function(){
                $('#figure').animate({left: "50%"},1000);
                $('#v1').html(textRemember).animate({top: 0},1000);
                $('#v2').slideDown(500);
                flag = false;
                setTimeout(function(){
                    animationFlag = false;     
                }, 1000);
            }, 1000);
        }
    }
}
//получились 2 очень схожие анимации, функции 2, а не одна потому
//что изначало планировалось анимировать стартовую карточку в разные стороны в зависимости от нажатой кнопки
function moveFigureLeftShow(){//тот же принып что и для предыдущей анимации
    if(!flag && !animationFlag){
        animationFlag = true;
        flag = true;
        $('#figure').animate({left: "180"},1000);
        textRemember = $('#v2').html();
        $('#v2').html("Назад").animate({top: 30},1000);
        $('#v1').slideUp(500);
        $('#figure').css({"position":"fixed"});
        
        setTimeout(function(){
            $(".userForm").slideDown(1000);
            setTimeout(function(){
                animationFlag = false;     
            }, 1000);
        },1000);
    }
    else{ if(!animationFlag)
        {
            delVidjet();

            animationFlag = true;
            flag = false;
            $(".userForm").slideUp(1000);

            setTimeout(function(){
                $('#figure').animate({left: "50%"},1000);
                $('#v2').html(textRemember).animate({top: 0},1000);
                $('#v1').slideDown(500);
                $('#figure').css({"position":"absolute"});
                setTimeout(function(){
                    animationFlag = false;   
                },1000);
            },1000);
        }
    }
}
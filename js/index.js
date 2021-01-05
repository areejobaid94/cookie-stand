'use strict';
let count = 6;
let moodIsBlack = false ;

function changeImg(){
    console.log('hi');
    let imgToHide = 'img-main-'+ count;
    count > 1 ?  count = count - 1 : count = 6;
    let imgToShow = 'img-main-' + count;
    document.getElementById(imgToHide).style.display = 'none';
    document.getElementById(imgToShow).style.display = 'block';
}

function changeTheMood(){
    if(moodIsBlack){
        console.log(moodIsBlack);
        document.body.style.background = "rgb(230, 253, 252) url('img_tree.png') no-repeat right top";
        document.body.style.color = "black";
        moodIsBlack = false;
    }else{
        console.log(moodIsBlack);
        document.body.style.background = "#000000 url('img_tree.png') no-repeat right top";
        document.body.style.color = "white";
        moodIsBlack = true;
    }
}
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

function changeTheMood(home){
    if(moodIsBlack){
        document.getElementById('nav-button').innerText = 'Dark Mood';
        document.body.style.background = "rgb(230, 253, 252) url('img_tree.png') no-repeat right top";
        if(!home){
            document.getElementById('add-data').style.background = "rgb(230, 253, 252) url('img_tree.png') no-repeat right top";
        }
        moodIsBlack = false;
    }else{
        document.getElementById('nav-button').innerText = 'Lite Mood';
        document.body.style.background = "#000000 url('img_tree.png') no-repeat right top";
        if(!home){
            document.getElementById('add-data').style.backgroundColor = 'black';
        }
        moodIsBlack = true;
    }
}


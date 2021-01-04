"use strict";

console.log('start')
let timeArray = ['6am', '7am', '8am', '9am', '10am', '11am','1pm','2pm','3pm','4pm','5pm','6pm','7pm']
let storesArrey = [] 

let totalCookies = function (obj) {
    let div = document.createElement('div');
    let card = document.createElement('div');
    card.className = 'card';
    div.className = "container";
    let ul = document.createElement('ul');
    let h1 = document.createElement('h1');
    h1.textContent = obj.location;
    let total = 0;
    for (let i = 0 ; i < timeArray.length; i++){
        let value = obj.getRandomIntInclusive() * obj.average;
        total = total + value;
        obj.totalCooliesPerHour.push(value);
        renderTheList(ul,value,timeArray[i])
    }
    div.appendChild(ul)
    card.appendChild(div);
    let totalLi = document.createElement('li');
    totalLi.innerHTML = `Total: ${total}`
    let main =  document.getElementById('main')
    main.appendChild(h1);
    main.appendChild(card);
}

function renderTheList(ul,value,time){
    let li = document.createElement('li');
    li.innerText = `${time}: ${Math.round(value)} cookies`;
    ul.appendChild(li);
}

function StoreObj(location,min,max,average) {
    this.location = location;
    this.min = min;
    this.max = max;
    this.average = average;
    this.totalCooliesPerHour = [];
    this.getRandomIntInclusive = function(){
        let min = Math.ceil(this.min);
        let max = Math.floor(this.max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }
}

function startPage (){
    let table =  document.getElementById('table');
    let htmlTable = document.createElement('table')
    let thLocation = document.createElement('th');
    thLocation.innerHTML = 'Location';
    htmlTable.appendChild(thLocation);
    let thMin = document.createElement('th');
    thMin.innerHTML = 'Min / Cust';
    htmlTable.appendChild(thMin);
    let thMax = document.createElement('th');
    thMax.innerHTML = 'Max / Cust';
    htmlTable.appendChild(thMax);
    let thAvg = document.createElement('th');
    thAvg.innerText = 'Avg Cookie / Sale';
    htmlTable.appendChild(thAvg);

    storesArrey.push(new StoreObj('Seattle', 23,65, 6.3));
    storesArrey.push(new StoreObj('Tokyo',3,24, 1.2));
    storesArrey.push(new StoreObj('Dubai',11, 38,3.7));
    storesArrey.push(new StoreObj('Paris',20, 38, 2.3));
    storesArrey.push(new StoreObj('Lima', 2,16, 4.6));

    for (let i = 0 ; i < storesArrey.length; i++){
        totalCookies(storesArrey[i]);
        let row = document.createElement('tr')
        let location = document.createElement('td')
        location.innerHTML = storesArrey[i].location;
        row.appendChild(location);
        let min = document.createElement('td');
        min.innerHTML = storesArrey[i].min;
        row.appendChild(min);
        let max = document.createElement('td');
        max.innerHTML =  storesArrey[i].max;
        row.appendChild(max);
        let avg = document.createElement('td');
        avg.innerText = storesArrey[i].average;
        row.appendChild(avg);
        htmlTable.appendChild(row);
    };
    table.appendChild(htmlTable)
}
startPage();

'use-static'
console.log('start')
let timeArray = ['6am', '7am', '8am', '9am', '10am', '11am','1pm','2pm','3pm','4pm','5pm','6pm','7pm']
let storesArrey = [{
    location:'Seattle',min: 23, max: 65, average: 6.3,totalCooliesPerHour:[],
    getRandomIntInclusive: function () {
        min = Math.ceil(this.min);
        max = Math.floor(this.max);
        return Math.floor(Math.random() * (this.max - this.min + 1) + this.min); //The maximum is inclusive and the minimum is inclusive
    }, totalCookies: function () {
        let ul = document.createElement('ul');
        let h1 = document.createElement('h1');
        h1.textContent = this.location;
        let total = 0;
        for (let i = 0 ; i < timeArray.length; i++){
            let value = this.getRandomIntInclusive() * this.average;
            total = total + value;
            this.totalCooliesPerHour.push(value);
            renderTheList(ul,value,timeArray[i])
        }
        let totalLi = document.createElement('li');
        totalLi.innerHTML = `Total: ${total}`
        let main =  document.getElementById('main')
        main.appendChild(h1);
        main.appendChild(ul)
    }
}, {
    location:'Tokyo',min: 3, max: 24, average: 1.2,totalCooliesPerHour:[],
    getRandomIntInclusive: function () {
        min = Math.ceil(this.min);
        max = Math.floor(this.max);
        return Math.floor(Math.random() * (this.max - this.min + 1) + this.min); //The maximum is inclusive and the minimum is inclusive
    }, totalCookies: function () {
        let ul = document.createElement('ul');
        let h1 = document.createElement('h1');
        h1.textContent = this.location;
        let total = 0;
        for (let i = 0 ; i < timeArray.length; i++){
            let value = this.getRandomIntInclusive() * this.average;
            total = total + value;
            this.totalCooliesPerHour.push(value);
            renderTheList(ul,value,timeArray[i])
        }
        let totalLi = document.createElement('li');
        totalLi.innerHTML = `Total: ${total}`
        let main =  document.getElementById('main')
        main.appendChild(h1);
        main.appendChild(ul)
    }
},{
    location:'Dubai',min: 11, max: 38, average: 3.7,totalCooliesPerHour:[],
    getRandomIntInclusive: function () {
        min = Math.ceil(this.min);
        max = Math.floor(this.max);
        return Math.floor(Math.random() * (this.max - this.min + 1) + this.min); //The maximum is inclusive and the minimum is inclusive
    },totalCookies: function () {
        let ul = document.createElement('ul');
        let h1 = document.createElement('h1');
        h1.textContent = this.location;
        let total = 0;
        for (let i = 0 ; i < timeArray.length; i++){
            let value = this.getRandomIntInclusive() * this.average;
            total = total + value;
            this.totalCooliesPerHour.push(value);
            renderTheList(ul,value,timeArray[i])
        }
        let totalLi = document.createElement('li');
        totalLi.innerHTML = `Total: ${total}`
        let main =  document.getElementById('main')
        main.appendChild(h1);
        main.appendChild(ul)
    }
},{
    location:'Paris',min: 20, max: 38, average: 2.3,totalCooliesPerHour:[],
    getRandomIntInclusive: function () {
        min = Math.ceil(this.min);
        max = Math.floor(this.max);
        return Math.floor(Math.random() * (this.max - this.min + 1) + this.min); //The maximum is inclusive and the minimum is inclusive
    }, totalCookies: function () {
        let ul = document.createElement('ul');
        let h1 = document.createElement('h1');
        h1.textContent = this.location;
        let total = 0;
        for (let i = 0 ; i < timeArray.length; i++){
            let value = this.getRandomIntInclusive() * this.average;
            total = total + value;
            this.totalCooliesPerHour.push(value);
            renderTheList(ul,value,timeArray[i])
        }
        let totalLi = document.createElement('li');
        totalLi.innerHTML = `Total: ${total}`
        let main =  document.getElementById('main')
        main.appendChild(h1);
        main.appendChild(ul)
    }
},{
    location:'Lima',min: 2, max: 16, average: 4.6,totalCooliesPerHour:[],
    getRandomIntInclusive: function () {
        min = Math.ceil(this.min);
        max = Math.floor(this.max);
        return Math.floor(Math.random() * (this.max - this.min + 1) + this.min); //The maximum is inclusive and the minimum is inclusive
    }, totalCookies: function () {
        let ul = document.createElement('ul');
        let h1 = document.createElement('h1');
        h1.textContent = this.location;
        let total = 0;
        for (let i = 0 ; i < timeArray.length; i++){
            let value = this.getRandomIntInclusive() * this.average;
            total = total + value;
            this.totalCooliesPerHour.push(value);
            renderTheList(ul,value,timeArray[i])
        }
        let totalLi = document.createElement('li');
        totalLi.innerHTML = `Total: ${total}`
        let main =  document.getElementById('main')
        main.appendChild(h1);
        main.appendChild(ul)
    }
}] 

function renderTheList(ul,value,time){
    let li = document.createElement('li');
    li.innerText = `${time}: ${Math.round(value)} cookies`;
    ul.appendChild(li);
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

    for (let i = 0 ; i < storesArrey.length; i++){
        storesArrey[i].totalCookies();
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

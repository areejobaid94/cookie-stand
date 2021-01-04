'use strict';

console.log('start')
let timeArray = ['Time', '6am', '7am', '8am', '9am', '10am', '11am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', 'Daily Location Total']
let tableHeads = ['Location', 'Min / Cust', 'Max / Cust', 'Avg Cookie / Sale'];
let storesArrey = [];
let totalValuePerHour = ['Totals'];
let hourlyCustomerTraffic = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6]

let printTableHeader = function (table, values) {
    let row = document.createElement('tr');
    for (let i in values) {
        if (typeof (values[i]) == "number" || typeof (values[i]) == "string") {
            let th = document.createElement('th');
            th.innerHTML = values[i];
            row.appendChild(th);
        }
    }
    table.appendChild(row);
};

let printTablefooter = function (table, values) {
    let row = document.createElement('tfoot');
    for (let i in values) {
        if (typeof (values[i]) == "number" || typeof (values[i]) == "string") {
            let th = document.createElement('td');
            th.innerHTML = values[i];
            row.appendChild(th);
        }
    }
    table.appendChild(row);
}

let printTableRow = function (table, values, location) {
    let row = document.createElement('tr');
    if (location) {
        let h = document.createElement('td');
        h.innerText = location;
        row.appendChild(h);
    };
    for (let i in values) {
        if (typeof (values[i]) == "number" || typeof (values[i]) == "string") {
            let th = document.createElement('td');
            th.innerHTML = values[i];
            row.appendChild(th);
        }
    };
    table.appendChild(row);
}

function StoreObj(location, min, max, average) {
    this.location = location;
    this.min = min;
    this.max = max;
    this.average = average;
    this.totalCooliesPerHour = [];
    this.getRandomIntInclusive = function () {
        let min = Math.ceil(this.min);
        let max = Math.floor(this.max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive

    };
    this.totalCookiesPerStore = function () {
        var total = 0;
        for (let i = 1; i < timeArray.length - 1; i++) {
            let value = Math.round(this.getRandomIntInclusive() * this.average * hourlyCustomerTraffic[i -1]);
            total = total + value;
            this.totalCooliesPerHour.push(value);
            totalValuePerHour[i] = (totalValuePerHour[i] || 0) + value;
        }
        totalValuePerHour[timeArray.length - 1] = (totalValuePerHour[timeArray.length - 1] || 0) + total;
        this.totalCooliesPerHour.push(total);
        this.render();
    };
    this.render = function () {
        let table = document.getElementById('main');
        printTableRow(table, this.totalCooliesPerHour, this.location);
    };
    this.totalCookiesPerStore();
}

function startPage() {
    let table = document.getElementById('table');
    let htmlTable = document.createElement('table');
    printTableHeader(htmlTable, tableHeads);

    let tableResult = document.getElementById('main');
    printTableHeader(tableResult, timeArray);
    storesArrey.push(new StoreObj('Seattle', 23, 65, 6.3));
    storesArrey.push(new StoreObj('Tokyo', 3, 24, 1.2));
    storesArrey.push(new StoreObj('Dubai', 11, 38, 3.7));
    storesArrey.push(new StoreObj('Paris', 20, 38, 2.3));
    storesArrey.push(new StoreObj('Lima', 2, 16, 4.6));

    for (let i = 0; i < storesArrey.length; i++) {
        printTableRow(htmlTable, storesArrey[i]);
    };
    printTablefooter(tableResult, totalValuePerHour);
    table.appendChild(htmlTable);

    printStaffingTable();
}
startPage();

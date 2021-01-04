'use strict';

let timeArray = ['Time', '6am', '7am', '8am', '9am', '10am', '11am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', 'Total']
let tableHeads = ['Location', 'Min / Cust', 'Max / Cust', 'Avg Cookie / Sale'];
let storesArrey = [];
let totalValuePerHour = ['Totals'];
let totalSalmonCookieTossersPerHour = ['Totals'];

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
    this.totalSalmonCookieTossers = []; 
    this.calculations();
}

StoreObj.prototype.getRandomIntInclusive =function () {
    let min = Math.ceil(this.min);
    let max = Math.floor(this.max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

StoreObj.prototype.render = function (table, total, location) {
    printTableRow(table, total, location);
};

StoreObj.prototype.calculations = function () {
    var total = 0;
    var totelSalmonCookieTossers = 0;
    for (let i = 1; i < timeArray.length - 1; i++) {
        let randomInt = this.getRandomIntInclusive();
        let value = Math.round(randomInt * this.average * hourlyCustomerTraffic[i - 1]);
        if(Math.ceil(randomInt/20) < 2){
            this.totalSalmonCookieTossers.push(2);
            totelSalmonCookieTossers += 2;
            totalSalmonCookieTossersPerHour[i] = (totalSalmonCookieTossersPerHour[i] || 0) + 2;
        }else{
            this.totalSalmonCookieTossers.push(Math.ceil(randomInt/20));
            totelSalmonCookieTossers += Math.ceil(randomInt/20);
            totalSalmonCookieTossersPerHour[i] = (totalSalmonCookieTossersPerHour[i] || 0) + Math.ceil(randomInt/20);
        }
        total = total + value;
        this.totalCooliesPerHour.push(value);
        totalValuePerHour[i] = (totalValuePerHour[i] || 0) + value;
    }
    totalValuePerHour[timeArray.length - 1] = (totalValuePerHour[timeArray.length - 1] || 0) + total;
    totalSalmonCookieTossersPerHour[timeArray.length - 1] = (totalSalmonCookieTossersPerHour[timeArray.length - 1] || 0) + totelSalmonCookieTossers;
    this.totalCooliesPerHour.push(total);
    this.totalSalmonCookieTossers.push(totelSalmonCookieTossers);
};

function startPage() {
    let table = document.getElementById('table');
    let htmlTable = document.createElement('table');
    printTableHeader(htmlTable, tableHeads);

    let tableResult = document.getElementById('main');
    printTableHeader(tableResult, timeArray);

    let tableManageStaffing = document.getElementById('manage-staffing');
    printTableHeader(tableManageStaffing, timeArray);

    storesArrey.push(new StoreObj('Seattle', 23, 65, 6.3));
    storesArrey.push(new StoreObj('Tokyo', 3, 24, 1.2));
    storesArrey.push(new StoreObj('Dubai', 11, 38, 3.7));
    storesArrey.push(new StoreObj('Paris', 20, 38, 2.3));
    storesArrey.push(new StoreObj('Lima', 2, 16, 4.6));

    for (let i = 0; i < storesArrey.length; i++) {
        printTableRow(htmlTable, storesArrey[i]);
        storesArrey[i].render(tableResult,storesArrey[i].totalCooliesPerHour,storesArrey[i].location);
        storesArrey[i].render(tableManageStaffing,storesArrey[i].totalSalmonCookieTossers,storesArrey[i].location);
    };
    printTablefooter(tableResult, totalValuePerHour);
    printTablefooter(tableManageStaffing, totalSalmonCookieTossersPerHour);

    table.appendChild(htmlTable);
}
startPage();

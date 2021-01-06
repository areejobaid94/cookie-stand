'use strict';
let timeArray = ['Time', '6am', '7am', '8am', '9am', '10am', '11am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', 'Total']
let tableHeads = ['Location', 'Addresse','Min / Cust', 'Max / Cust', 'Avg Cookie / Sale','Hours Open' , 'Contact Information','Delete','Edit'];
let storesArrey = [];
let totalValuePerHour = ['Totals'];
let totalSalmonCookieTossersPerHour = ['Totals'];
let hourlyCustomerTraffic = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6]
var index; 

let printTableHeader = function (table, values) {
    let row = document.createElement('tr');
    for (let i in values) {
        if (typeof (values[i]) == "number" || typeof (values[i]) == "string") {
            let th = document.createElement('th');
            th.innerText = values[i];
            row.appendChild(th);
        }
    }
    table.appendChild(row);
};

function deleteStore(row){
    let confirmMes = confirm('Are you Sure');
    if(confirmMes){
        var i = row.parentNode.parentNode.rowIndex;
        document.getElementById("table").deleteRow(i);
        document.getElementById("main").deleteRow(i);
        document.getElementById("main").deleteTFoot();
        document.getElementById("manage-staffing").deleteRow(i);
        document.getElementById("manage-staffing").deleteTFoot();
        for(var j = 0 ; j < storesArrey[i-1].totalCooliesPerHour.length; j++){
            totalValuePerHour[j+1] =totalValuePerHour[j+1] - storesArrey[i-1].totalCooliesPerHour[j];
            totalSalmonCookieTossersPerHour[j+1]= totalSalmonCookieTossersPerHour[j+1] - storesArrey[i-1].totalSalmonCookieTossers[j];
        }
        console.log(storesArrey,i);
        storesArrey.splice(i-1,1);
        console.log(storesArrey);
        printTablefooter(document.getElementById("main"),totalValuePerHour )
        printTablefooter(document.getElementById("manage-staffing"),totalSalmonCookieTossersPerHour )
    };
};

function editStore(row){
    document.getElementById('add-edit-data').innerText = 'Edit Data';
    document.getElementById('add-store').innerText = 'Hide Form';
    let form = document.getElementById('data-form');
    form.style.display = 'block';
    index = row.parentNode.parentNode.rowIndex;
    document.getElementById('location').value = storesArrey[index-1].location;
    document.getElementById('addresse').value = storesArrey[index-1].addresse;
    document.getElementById('min').value = storesArrey[index-1].min;
    document.getElementById('max').value = storesArrey[index-1].max;
    document.getElementById('average').value = storesArrey[index-1].average;
    document.getElementById('hoursOpen').value = storesArrey[index-1].hoursOpen;
    document.getElementById('contactInformation').value = storesArrey[index-1].contactInformation;
};

document.getElementById('data-form').addEventListener('submit',function(e){
    e.preventDefault();
    let confirmMes = confirm('Are you Sure');
    if(confirmMes){
        let header = document.getElementById('add-edit-data');
        if(header.textContent.split(' ')[0] == 'Add'){
            storesArrey.push(new StoreObj(e.target.location.value, e.target.addresse.value ,Number(e.target.min.value) ,Number(e.target.max.value) ,Number(e.target.average.value) ,e.target.hoursOpen.value  , e.target.contactInformation.value ));
            addRows();
        }else{
            editRows(e.target.location.value, e.target.addresse.value ,Number(e.target.min.value) ,Number(e.target.max.value) ,Number(e.target.average.value) ,e.target.hoursOpen.value  , e.target.contactInformation.value);
        }
    }
})

let printTablefooter = function (table, values) {
    let row = document.createElement('tfoot');
    for (let i in values) {
        if (typeof (values[i]) == "number" || typeof (values[i]) == "string") {
            let th = document.createElement('td');
            th.innerText = values[i];
            row.appendChild(th);
        }
    }
    table.appendChild(row);
}

let printTableRow = function (table, values, location, isMainTable,i) {
    let row = document.createElement('tr');
    if (location) {
        let h = document.createElement('td');
        h.innerText = location;
        row.appendChild(h);
    };
    for (let i in values) {
        if (typeof (values[i]) == "number" || typeof (values[i]) == "string") {
            let th = document.createElement('td');
            th.innerText = values[i];
            row.appendChild(th);
        }
    };
    if(isMainTable){
        let th = document.createElement('td');
        th.innerHTML = `<button onclick = "deleteStore(this)" >Delete</button>`;
        row.appendChild(th);
        th = document.createElement('td');
        th.innerHTML = `<button  onclick = "editStore(this)" >Edit</button>`;
        row.appendChild(th);
    }
    table.appendChild(row);
}

function StoreObj(location, min, max, average,addresse,hoursOpen,contactInformation) {
    this.location = location;
    this.addresse = addresse;
    this.min = min;
    this.max = max;
    this.average = average;
    this.totalCooliesPerHour = [];
    this.totalSalmonCookieTossers = []; 
    this.hoursOpen = hoursOpen;
    this.contactInformation = contactInformation;
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
    let htmlTable = document.getElementById('table');
    printTableHeader(htmlTable, tableHeads);

    let tableResult = document.getElementById('main');
    printTableHeader(tableResult, timeArray);

    let tableManageStaffing = document.getElementById('manage-staffing');
    printTableHeader(tableManageStaffing, timeArray);

    storesArrey.push(new StoreObj('Seattle', 23, 65, 6.3,'site number: 4','6am - 7pm' , 'Email: areej.obaid@yahoo.com'));
    storesArrey.push(new StoreObj('Tokyo',3, 24, 1.2,'site number: 5','6am - 7pm' ,'Email: areej.obaid@yahoo.com' ));
    storesArrey.push(new StoreObj('Dubai',11, 38, 3.7,'site number: 17' ,'6am - 7pm' , 'Email: areej.obaid@yahoo.com'));
    storesArrey.push(new StoreObj('Paris' ,20, 38, 2.3,'site number: 19','6am - 7pm' , 'Email: areej.obaid@yahoo.com'));
    storesArrey.push(new StoreObj('Lima' ,2, 16, 4.6, 'site number: 1','6am - 7pm' , 'Email: areej.obaid@yahoo.com'));

    for (let i = 0; i < storesArrey.length; i++) {
        printTableRow(htmlTable, storesArrey[i],undefined,true,i);
        storesArrey[i].render(tableResult,storesArrey[i].totalCooliesPerHour,storesArrey[i].location);
        storesArrey[i].render(tableManageStaffing,storesArrey[i].totalSalmonCookieTossers,storesArrey[i].location);
    };
    printTablefooter(tableResult, totalValuePerHour);
    printTablefooter(tableManageStaffing, totalSalmonCookieTossersPerHour);
}
startPage();

function addData(){
    document.getElementById('add-edit-data').innerText = 'Add New Data';
    document.getElementById('location').value = '';
    document.getElementById('addresse').value = '';
    document.getElementById('min').value = '';
    document.getElementById('max').value = '';
    document.getElementById('average').value = '';
    document.getElementById('hoursOpen').value = '';
    document.getElementById('contactInformation').value = '';
    var form = document.getElementById('data-form');
    if (form.style.display != 'block'){
        form.style.display = 'block';
        document.getElementById('add-store').innerText = 'Hide Form'
    }else{
        form.style.display = 'none';
        document.getElementById('add-store').innerText = "Add New Data"
    }
}

function addRows(){
    // add rows to output table
    let outputTable =  document.getElementById('main');
    outputTable.deleteTFoot();
    storesArrey[storesArrey.length -1].render(outputTable,storesArrey[storesArrey.length -1].totalCooliesPerHour,storesArrey[storesArrey.length -1].location);
    printTablefooter( outputTable, totalValuePerHour);

    // add rows to data table
    let DataTable = document.getElementById('table');
    printTableRow(DataTable,storesArrey[storesArrey.length -1],undefined,true);

    // add rows to output Manage Staffing table
    let staffingTable =  document.getElementById('manage-staffing');
    staffingTable.deleteTFoot();
    storesArrey[storesArrey.length -1].render(staffingTable,storesArrey[storesArrey.length -1].totalSalmonCookieTossers,storesArrey[storesArrey.length -1].location);
    printTablefooter( staffingTable, totalSalmonCookieTossersPerHour);
}

function editRows(location, addresse,min ,max ,average ,hoursOpen  , contactInformation){
    console.log('i',index);
    let beforeStore = storesArrey[index-1];
    console.log(location, addresse ,min,max ,average ,hoursOpen ,contactInformation );
    storesArrey[index-1] = new StoreObj(location, min , max ,average, addresse ,hoursOpen ,contactInformation );
    let dataTable = document.getElementById('table');
    dataTable.rows[index].cells[0].innerHTML = location;
    dataTable.rows[index].cells[1].innerHTML = addresse;
    dataTable.rows[index].cells[2].innerHTML = min;
    dataTable.rows[index].cells[3].innerHTML = max;
    dataTable.rows[index].cells[4].innerHTML = average;
    dataTable.rows[index].cells[5].innerHTML = hoursOpen;
    dataTable.rows[index].cells[6].innerHTML = contactInformation;

    let mainTable =  document.getElementById('main');
    let tableManageStaffing = document.getElementById('manage-staffing');
    mainTable.rows[index].cells[0].innerHTML = location;
    tableManageStaffing.rows[index].cells[0].innerHTML = location;
    for(let j = 0; j <  storesArrey[index-1].totalCooliesPerHour.length ; j++){
        mainTable.rows[index].cells[j+1].innerHTML = storesArrey[index-1].totalCooliesPerHour[j];
        tableManageStaffing.rows[index].cells[j+1].innerHTML = storesArrey[index-1].totalSalmonCookieTossers[j];
        totalValuePerHour[j+1] = totalValuePerHour[j+1] -  beforeStore.totalCooliesPerHour[j]  ;
        totalSalmonCookieTossersPerHour[j+1] = totalSalmonCookieTossersPerHour[j+1] - beforeStore.totalSalmonCookieTossers[j];  
    }
    mainTable.deleteTFoot();
    tableManageStaffing.deleteTFoot();
    printTablefooter(mainTable,totalValuePerHour);
    printTablefooter(tableManageStaffing,totalSalmonCookieTossersPerHour);
};

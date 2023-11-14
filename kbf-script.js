window.addEventListener("load",(event) => {



let wrapper = document.querySelector("#map");//Wrapper of map

let reserve_date = document.querySelector("#reserve-date");//Date pick of form


let check_btn = document.querySelector("#availability");//Check availability button

let imerominia_kratisis = reserve_date.value;
let contactFieldSet = document.querySelector("#contact")
//let refreshBtn = document.querySelector("#refresh");//Refresh Button
//refreshBtn.addEventListener("click",refreshMap);//Event - Refresh

//Form info values
let fName;
let lName;
let cMail;
let cPhone;
let num_of_people = document.querySelector("#num-of-people");
const rows = 5;
const tables_per_row = 5;
num_of_people.addEventListener("change", function() {
    let v = parseInt(this.value);
    if (v < 2) this.value = 2;
    if (v > 12) this.value = 12;
  });
reserve_date.addEventListener("change",refreshMap);

let reserve_list = {};

let map_heading = document.querySelector("#MapHeading");


let tables =[];
let kratiseis = [];
let dateValue;

let res_dic = {};

function fetchFormData(){
    fName = document.querySelector("#first-name").value;
    lName = document.querySelector("#last-name").value;
    cMail = document.querySelector("#email").value;
    cPhone = document.querySelector("#phone").value;
    num_of_people = document.querySelector("#num-of-people").value;//Number input of form to select number of people
    
}

//Disable reserved tables
function disableReserved(){
    dateValue = reserve_date.value;
    if(dateValue in reserve_list){
        reserve_list[dateValue].forEach(element => {
            let t = document.getElementById(element);
            t.classList.add("reserved");
            t.disabled = true;
            console.log(reserve_list[dateValue].includes(element));
            
        });
        
    }
    
}
function disableReserved2(){
    dateValue = reserve_date.value;
    if(dateValue in res_dic){
        Object.keys(res_dic[dateValue]).forEach(key => {
            let t = document.getElementById(key);
            t.classList.add("reserved");
            t.disabled = true;
            console.log(key in res_dic[dateValue]);
          });
    }
    
}
//Add Reservation
function addReservation(){
    dateValue = reserve_date.value;
   
    if(dateValue != ""){
        if(!(dateValue in reserve_list)){
            reserve_list[dateValue] = [];
        }
        if(reserve_list[dateValue].includes(this.innerText)){
            console.log("Table is already reserved");
        }else{

            reserve_list[dateValue].push(this.innerText);
            console.log(reserve_list);
            this.classList.add("reserved");
            this.disabled = true;
        }        
    }else{
        alert("Pick a date!")
    }
    
}
//Check Form info values
function checkInfo(){
    
    fetchFormData();
    
    if(!fName){
        alert("Enter your first name",fName);
        return false;
    }
    if(!lName){
        alert("Enter your last name");
        return false;
    }
    if(!cPhone){
        alert("Enter your phone number");
        return false;
    }
    if(!cMail){
        alert("Enter your mail");
        return false;
    }
    if(!num_of_people){
        alert("How many people?");
        return false;
    }
    return true;
}

function newRes(fn,ln,em,ph,nop){
    let newR = {
        "First Name" : fn,
        "Last Name" : ln,
        "Phone" : ph,
        "Email" : em,
        "People" : nop
    }
    return newR;
}
//Add Reservation2
function addReservation2(){
    if(checkInfo()){
        dateValue = reserve_date.value;
        let currTable = this.innerText;
        if(dateValue != ""){
            if(!(dateValue in res_dic)){
                res_dic[dateValue] = {};
            }
            if(currTable in res_dic[dateValue]){
                console.log("Table is already reserved");
            }else{
                
                res_dic[dateValue][currTable] = newRes(fName,lName,cMail,cPhone,num_of_people);
                newLog(dateValue,fName,lName,currTable,num_of_people,cPhone)
                console.log(res_dic);
                this.classList.add("reserved");
                this.disabled = true;
            }        
        }else{
            alert("Pick a date!")
        }
    }
    
}
//Create Row Function
function createRow(){
    let row = document.createElement("div");//Row is DIV element
    row.setAttribute("class","table-row");//Class = table-row
    return row;
}

//Create Table Function
function createTable(){
    let table = document.createElement("button");//Table is Button element
    table.setAttribute("class","table");//Class = table
    table.addEventListener("click",addReservation2);// {WIP} Event - Reserve
        
    return table;
}

//Refresh the whole Map
function refreshMap(){
    contactFieldSet.classList.remove("inactive");
    
    dateValue = reserve_date.value;
    map_heading.innerText = "Διαθέσιμα τραπέζια στις : " + dateValue;
    
    wrapper.innerHTML = "";//Clear the map
    createMap(rows,tables_per_row);
    disableReserved2();
    console.log("Refresh successfull");
}

function newLog(lD,lFN,lLN,lTa,lNOP,lTe){

    let logBody = document.querySelector("#logBody");
    let tRow = "<tr>";
    let fullName = lFN +" " +lLN;
    let dets = [lD,fullName,lTa,lNOP,lTe];
    dets.forEach(element => {
        tRow += "<td>"+element+"</td>";
    });
    tRow +="</tr>"
    logBody.innerHTML += tRow; 
    console.log(tRow);
}
function createMap(r,t){
    let newRow ;
    let newTable;
    let id = 1;
    for(let i = 0; i<rows;i++){
        newRow = createRow();
       tables[i] = [];
        for(let j=0; j<t;j++){
            newTable = createTable();
            newTable.setAttribute("id",id);
            newTable.innerText = id;
            newTable.dataset.row = i;
            newTable.dataset.col = j;
            let resArr = [];
            tables[i][j] =resArr;
            newRow.appendChild(newTable);
            id++;
        }
        wrapper.appendChild(newRow);
    }
}
/*
check_btn.addEventListener("click",loadMap);
function loadMap(){
    if(checkInfo()){
        refreshMap()
    }
}
*/
createMap(rows,tables_per_row);








})
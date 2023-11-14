window.addEventListener("load",(event) => {

let wrapper = document.querySelector("#map");
let reserve_date = document.querySelector("#reserve-date");
let num_of_people = document.querySelector("#num-of-people");
let check_btn = document.querySelector("#availability");

//Refresh Button
let refreshBtn = document.querySelector("#refresh");
refreshBtn.addEventListener("click",refreshMap);

const rows = 5;
const tables_per_row = 5;
let tables =[];



    

function createRow(){
    let row = document.createElement("div");
    row.setAttribute("class","table-row");
    return row;
}
function createTable(){
    let table = document.createElement("button");
    table.setAttribute("class","table");
    table.addEventListener("click",reserve)
    return table;
}
function reserve(){
    if(!this.is_reserved){
        this.is_reserved = true;
        this.setAttribute("class","table reserved");
        
    }else{
        this.is_reserved = false;
        this.setAttribute("class","table");
       
    }
    
}
function refreshMap(){
    wrapper.innerHTML = "";
    createMap(rows,tables_per_row);
    console.log("Refresh successfull");
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
createMap(rows,tables_per_row);


//Define table object
const trapezi = {
    id: 0,
    class: "table",
    is_reserved : false,
    reservations : [],
    new_reserve(res_date,people){
        let date = res_date;
        let ppl= people;
        let reserve = {res_date : ppl};
        this.reservations.push(reserve);
        console.log(this.reservations);
        
    }
};
})
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const screenOpt = document.querySelector('.opt');
const screenRslt = document.querySelector('.rslt');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.arith');

const ariths = ['-','+','÷','x'];
let numberStr = '';

numbers.forEach( number => {
    number.onclick = ()=> {
        updateRslt(number.textContent);
    }
});

operations.forEach( operation =>{
    operation.onclick = () =>{
        updateOpt(operation.textContent);
    }
});

clearBtn.onclick = ()=> clearFunc();
deleteBtn.onclick = ()=> deleteFunc();

function clearFunc(){
    screenOpt.innerHTML=' ';
    screenRslt.innerHTML='0';
    numberStr = '';
}

function deleteFunc(){ //fix the delete function
    if(!screenRslt.innerHTML || screenRslt.innerHTML==='0'){ // Rslt div is empty or 0
        if(!screenOpt.innerHTML){ // operation div is empty
            return;
        }
        else{ //operation div is not empty
            screenOpt.innerHTML = screenOpt.innerHTML.slice(0, -1);
        }
    }
    else{
        screenRslt.innerHTML= '0';
    }
}

function add(value){

}

function subtract(){

}

function multiply(){

}

function divide(){

}

function updateRslt(value){
    screenRslt.innerHTML += `${value}`;
    numberStr += `${value}`;
}

function updateOpt(value){
    if(!screenOpt.innerHTML){ //check if empty
        screenOpt+= `0${value}`;
    }
    else if(ariths.includes(screenOpt.innerHTML[screenOpt.innerHTML.length-1]) && screenRslt.innerHTML==='0'){  //arithmatic operation check
        screenOpt.innerHTML = screenOpt.innerHTML.slice(0,-1) + value;
        console.log(screenOpt.innerHTML[screenOpt.innerHTML.length-1]);
    }
    else {  //normal operation
        screenRslt.innerHTML ='0';
        numberStr += `${value}`;
        screenOpt.innerHTML += numberStr;
        numberStr='';
        console.log('2');
    }
}
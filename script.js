const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const screenOpt = document.querySelector('.opt');
const screenRslt = document.querySelector('.rslt');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.arith');
const equal = document.querySelector('.equal');

let lastElement = '';

const ariths = ['÷','x','+','-'];
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
equal.onclick = ()=> calculateRslt();

function clearFunc(){
    screenOpt.innerHTML='';
    screenRslt.innerHTML='0';
    numberStr = '';
}

function deleteFunc(){ //fix the delete function
    if(screenRslt.innerHTML==='0'){ // Rslt div is empty or 0
        if(!screenOpt.innerHTML){ // operation div is empty
            return;
        }
        else{ //operation div is not empty
            screenOpt.innerHTML = screenOpt.innerHTML.slice(0, -1);
        }
    }
    else{
        if(screenRslt.innerHTML.length === 1){
            screenRslt.innerHTML = '0';
            numberStr = '';
            
        }
        else{
            screenRslt.innerHTML= screenRslt.innerHTML.slice(0,-1);
            numberStr = numberStr.slice(0,-1);
        }
    }
}

function updateRslt(value){
    if(screenRslt.innerHTML === '0'){
        screenRslt.innerHTML = `${value}`;
    }
    else{
        screenRslt.innerHTML += `${value}`;
    }

    if(numberStr ==='' && value === '0'){
        return;
    }
    else{
        numberStr += `${value}`;
    }
}

function updateOpt(value){
    if(screenOpt.innerHTML === "" ){ //check if empty
            screenOpt.innerHTML+= screenRslt.innerHTML+` ${value}`;
            screenRslt.innerHTML='0';
            numberStr='';

    }
    else if(ariths.includes(screenOpt.innerHTML[screenOpt.innerHTML.length-1]) && screenRslt.innerHTML==='0'){  //arithmatic operation check
        screenOpt.innerHTML = screenOpt.innerHTML.slice(0,-1) + value;
    }
    else {  //normal operation
        screenRslt.innerHTML ='0';
        if(screenOpt.innerHTML === ''){
            screenOpt.innerHTML += numberStr +` ${value}`;
            numberStr = '';
        }
        else{
            screenOpt.innerHTML += ' '+ numberStr + ` ${value}`;
            numberStr='';
        }
    }
}

function calculateRslt(){
    numberStr = '';
    if(!screenOpt.innerHTML){ //screenOpt is empty
        screenRslt.innerHTML = '0';

        return;
    }
    else {
        if(screenRslt.innerHTML !== '0'){
            screenOpt.innerHTML = screenOpt.innerHTML + ' ' +screenRslt.innerHTML;
        }
    }

    let elements = screenOpt.innerHTML.split(" ");
    screenOpt.innerHTML = '';
    let operator;
    let firstNumber;
    let secondNumber;
    let opIndex;
    let result;

    for( let i = 0; i<ariths.length;i++){
        while(elements.includes(ariths[i])){
            opIndex = elements.findIndex((op)=> op === ariths[i]);
            firstNumber = elements[opIndex-1];
            secondNumber = elements[opIndex+1];
            operator = elements[opIndex];
            result = calculate(firstNumber,operator,secondNumber);
            elements.splice(opIndex-1, 3, result);
        }
    }

    screenRslt.innerHTML = result;
    return result;
}

function calculate(a, op , b){
    a = Number(a);
    b = Number(b);

    if(op === '÷'){
         return (b===0)? Nan:Number(a/b);
    }
    else if(op === 'x'){
        return Number(a*b);
    }
    else if(op === '+'){
        return Number(a+b);
    }
    else{
        return Number(a-b);
    }
}
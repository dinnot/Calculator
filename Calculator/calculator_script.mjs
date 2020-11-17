const calculator = {
    displayValue: "",
    firstOperand: "",
    secondOperand: "",
    operator: "",
    result: "",
    resultReady: false,
    secondOperandInserted: false,
    operatorInserted: false,
    equalsHandler : false,
  };

function showCalcDisplay(){
    $("#display").html(calculator.displayValue);
};

function showHistory(){
    $("#history").append(`${calculator.firstOperand} ${calculator.operator} ${calculator.secondOperand} = ${parseFloat(calculator.result.toFixed(8))}`+`<br>`);
}

function digitInput(digit){
    calculator.displayValue +=digit;
    if(calculator.operatorInserted){
        calculator.secondOperand = calculator.displayValue;
        calculator.secondOperandInserted = true;
    }
    if(calculator.displayValue.length === 11){
        calculator.displayValue = calculator.displayValue.slice(1,11);
    }
}

function decimalInput(dot){
    if(!calculator.displayValue.includes("."))
    calculator.displayValue = calculator.displayValue + dot;
}

function clearInput(){
    calculator.displayValue = "";
    calculator.firstOperand = "";
    calculator.secondOperand = "";
    calculator.operator = "";
    calculator.result = "";
    calculator.resultReady= false;
    calculator.operatorInserted = false;
    calculator.secondOperandInserted = false;
}

function backspaceInput(){
    calculator.displayValue = calculator.displayValue.slice(0,-1)
}

function operatorInput(operator){
    if(calculator.secondOperandInserted){
        if(calculator.operator === operator){
            equals();
            calculator.operator = operator;
            showCalcDisplay();
            calculator.displayValue = "";
        }else{
            equals();
            calculator.displayValue = calculator.firstOperand;
            calculator.operator = operator;
            showCalcDisplay();
            calculator.displayValue = "";        
        }    
    }else{
        if(!calculator.operatorInserted){
            calculator.operator = operator;
            calculator.operatorInserted = true;
            if(calculator.equalsHandler){
                calculator.firstOperand = calculator.result;
                calculator.equalsHandler = false; 
            }else{
                calculator.firstOperand = calculator.displayValue;
            }
            calculator.displayValue = "";
        } else {
            calculator.operator = operator;
        }    
    }
}

function calculate(){
        if(calculator.operator == "+"){
            calculator.result = parseFloat(calculator.firstOperand) + parseFloat(calculator.secondOperand);
        } else if(calculator.operator == "-"){
            calculator.result = parseFloat(calculator.firstOperand) - parseFloat(calculator.secondOperand);
        } else if(calculator.operator == "/"){
            calculator.result = parseFloat(calculator.firstOperand) / parseFloat(calculator.secondOperand);
        } else {
            calculator.result = parseFloat(calculator.firstOperand) * parseFloat(calculator.secondOperand);    
        }
    calculator.resultReady = true;
}

function equals(){
    calculate();
    if (calculator.result <= 9999999999){
        showHistory();
        calculator.displayValue = `${parseFloat(calculator.result.toFixed(8))}`;
        calculator.firstOperand = `${parseFloat(calculator.result.toFixed(8))}`;
    }else{
        clearInput();
        calculator.displayValue = `Error!`;
    }
    
}

$(".button").on("click",function(e){
    let target = $(e.target);
    if(!target.hasClass("button")){
        return;
    }
    if(target.hasClass("digit")){
        digitInput(target.html());
        showCalcDisplay();
    } else if(target.hasClass("operator")){
        operatorInput(target.html());
    } else if(target.hasClass("decimal")){
        decimalInput(target.html());
        showCalcDisplay();
    } else if(target.hasClass("C")){
        clearInput();
        showCalcDisplay();    
    } else if(target.hasClass("backspace")){
        backspaceInput();
        showCalcDisplay();
    } else if(target.hasClass("equals")){
        equals();
        showCalcDisplay();
        calculator.displayValue = "";
        calculator.operatorInserted = false;
        calculator.secondOperandInserted =false;
        calculator.equalsHandler = true;
    } 
});


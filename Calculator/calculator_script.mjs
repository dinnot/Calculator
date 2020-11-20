const calculator = {
    displayValue: "",
    result: "",   
    operandInserted: true,
    decimalInserted: false,
    operatorInserted: false,
    negPosValueHandler: false,
  };

  const last2 = calculator.displayValue.charAt(calculator.displayValue.length-2);
  const last1 = calculator.displayValue.charAt(calculator.displayValue.length-1);

function showCalcDisplay(){
    $("#display").html(calculator.displayValue);
};

function showHistory(){
    if(!isNaN(calculator.result)){
        $("#history").append(`${calculator.displayValue}`+`<br>`);
    }
}

function digitInput(digit){
    calculator.displayValue +=digit;
    calculator.operandInserted = true;
    calculator.operatorInserted = false;
    calculator.negPosValueHandler = true;
}

function decimalInput(dot){
    if(!calculator.decimalInserted&calculator.operandInserted){
        calculator.displayValue += dot;
        calculator.decimalInserted = true;
    }
}

function clearInput(){ 
    calculator.displayValue = "";
    calculator.operand = "";
    calculator.result = "";
    calculator.operatorInserted = false;
    calculator.decimalInserted = false;
    calculator.negPosValueHandler = false;
    
}

function backspaceInput(){
    calculator.displayValue = calculator.displayValue.slice(0,-1);
    calculator.operatorInserted = false;
    if(calculator.displayValue.length == 0){
        calculator.negPosValueHandler = false;
    }
}

function operatorInput(operator){
    if(!calculator.operatorInserted){
        calculator.displayValue += operator;
        calculator.operatorInserted = true;
        calculator.decimalInserted = false;
        calculator.operandInserted = false
    }else{
        calculator.displayValue = calculator.displayValue.slice(0,-1);
        calculator.displayValue += operator;
        calculator.decimalInserted = false;
        calculator.operandInserted = false;
    }
    if(calculator.operandInserted){
        if(!isNaN(calculator.displayValue.charAt(calculator.displayValue.length-1))){
            backspaceInput();
        }
    }
    if(!calculator.negPosValueHandler){
        if(calculator.displayValue == "/" | calculator.displayValue == "*"){
            backspaceInput();
        }
    }
}

function equals(){
        calculator.result = eval(calculator.displayValue);
        calculator.displayValue =`${calculator.displayValue}=${calculator.result}`;
        if(calculator.result === undefined){
            calculator.displayValue = "";
        }
        if(calculator.result > 999999999){
            calculator.result = `Error! Value to big`
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
        if(last1 == 0){
            if(target.html() == 0){
                if(!isNaN(last2)){
                    if(last2 == "."){
                        return
                    }else{
                        calculator.displayValue = calculator.displayValue.slice(0,-1);
                    }
                }
            }
        }
    } else if(target.hasClass("operator")){
        operatorInput(target.html());
        showCalcDisplay();
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
        showHistory();
        clearInput();
    }     
});

$(document).keypress(function(e) {
    for(let i = 48; i <= 57; i++){
        if(e.which == i){
            digitInput(i-48);
            showCalcDisplay();
        }
    }
});

$(document).keypress(function(e) {
    if(e.which == 46) {
        decimalInput(".");
        showCalcDisplay();
    }
});

$(document).keypress(function(e) {
    if(e.which == 42) {
        operatorInput("*");
        showCalcDisplay();
    }else if(e.which == 43){
        operatorInput("+");
        showCalcDisplay();
    }else if(e.which == 45){
        operatorInput("-");
        showCalcDisplay();
    }else if(e.which == 47){
        operatorInput("/");
        showCalcDisplay();
    }
});

$(document).keydown(function(e) {
    if(e.which == 27) {
        clearInput();
        showCalcDisplay();
    }
});

$(document).keydown(function(e) {
    if(e.which == 8) {
        backspaceInput();
        showCalcDisplay();
    }
});

$(document).keyup(function(e) {
    if(e.which == 13) {
        equals();
        showCalcDisplay();
        showHistory();
        clearInput();   
    }
});



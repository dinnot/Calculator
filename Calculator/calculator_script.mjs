//Asigning properties to the calculator
const calculator = {
    displayValue: "",
    result: "",
    operand: "",
    history: "",
    resultReady: false,
    operandInserted: true,
    decimalInserted: false,
    operatorInserted: false,
    negPosValueHandler: false,
    enabled: true,
};

//Creating the display
function showCalcDisplay(){
    $("#display").html(calculator.displayValue);
    //Resizing the font for large inputs
    if(calculator.displayValue.length>9){
        $("#display").css("font-size", "175%")
    }else{
        $("#display").css("font-size", "350%")
    }
    //Handling extra-large inputs
    if(calculator.displayValue.length>18){
        calculator.displayValue = calculator.displayValue.slice(1,19);
    }
}
//Creating the history
function showHistory(){
    if(!isNaN(calculator.result)){
        $("#history").append(`${calculator.history}`+`<br>`+`${calculator.result}`+`<br>`+`<br>`);
    }
}

//Handling digit input
function digitInput(digit){
    if(calculator.enabled){
        //Avoiding consecutive zeros, if not preceded by a non-zero digit or decimal dot
        if(calculator.operand == "0" ){
            calculator.operand = digit;
            calculator.displayValue = calculator.displayValue.slice(0,-1) + digit;
        }else{
            calculator.displayValue +=digit;
            calculator.operand += digit;
            calculator.operandInserted = true;
            calculator.operatorInserted = false;
            calculator.negPosValueHandler = true;
        }
    }
}

//Handling decimal input
function decimalInput(dot){
    if(calculator.enabled){
        //Avoiding consecutive decimal dots
        if(!calculator.decimalInserted&calculator.operandInserted){
            calculator.displayValue += dot;
            calculator.operand += dot
            calculator.decimalInserted = true;
        }
    }
}

//Handling C input
function clearInput(){ 
    if(calculator.enabled){
        calculator.displayValue = "";
        calculator.operand = "";
        calculator.operandInserted = true;
        calculator.result = "";
        calculator.history = "";
        calculator.operatorInserted = false;
        calculator.decimalInserted = false;
        calculator.negPosValueHandler = false; 
    }
}

//Handling backspace input
function backspaceInput(){
    if(calculator.enabled){
        calculator.displayValue = calculator.displayValue.slice(0,-1);
        calculator.operand = calculator.operand.slice(0,-1);
        calculator.operatorInserted = false;
        if(calculator.displayValue.length == 0){
            calculator.negPosValueHandler = false;
        }
    }
}

//Handling operators input
function operatorInput(operator){
    if(calculator.enabled){
        //Avoiding consecutive operators
        if(!calculator.operatorInserted){
            calculator.displayValue += operator;
            calculator.operand = "";
            calculator.operatorInserted = true;
            calculator.decimalInserted = false;
            calculator.operandInserted = false
        }else{
            calculator.displayValue = calculator.displayValue.slice(0,-1);
            calculator.displayValue += operator;
            calculator.decimalInserted = false;
            calculator.operandInserted = false;
        };
        if(calculator.operandInserted){
            if(!isNaN(calculator.displayValue.charAt(calculator.displayValue.length-1))){
                backspaceInput();
            }
        }
        //Allowing first value introduced to be negative
        if(!calculator.negPosValueHandler){
            if(calculator.displayValue == "/" | calculator.displayValue == "*"){
                backspaceInput();
            }
        }
    }
}

//Getting the result form the values and operations inserted
function equals(){
    if(calculator.enabled){
        calculator.history = calculator.displayValue;
        calculator.result = parseFloat(eval(calculator.displayValue).toFixed(5));
        if(calculator.result == calculator.displayValue){
            clearInput();
        }else{
            calculator.resultReady = true;
            //Arranging how the result should be displayed
            if((calculator.history.length+calculator.result.length)>=20){
                calculator.displayValue =`${calculator.displayValue}=`+`<br>`+`${calculator.result}`; 
            }else{
                calculator.displayValue =`${calculator.displayValue}=${calculator.result}`; 
            }
            //Displaying "Error" if the result in not a number
            if(isNaN(calculator.result)){
                calculator.displayValue = `Error`;
            }
        }
    }
}

//Sorting the buttons pressed and binding the corresponding functions to them
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
        //Transforming the result into a new operand
        calculator.displayValue = calculator.result
        calculator.operand = "";
        calculator.operandInserted = true;
        calculator.result = "";
        calculator.history = "";
        calculator.operatorInserted = false;
        calculator.decimalInserted = false;
        calculator.negPosValueHandler = false;  
    }     
});

//Binding the coresponding functions to the keyboard's keys
$(document).keypress(function(e){
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
        calculator.displayValue = calculator.result
        calculator.operand = "";
        calculator.operandInserted = true;
        calculator.result = "";
        calculator.history = "";
        calculator.operatorInserted = false;
        calculator.decimalInserted = false;
        calculator.negPosValueHandler = false;       
    }
});
 
//Binding keyboard input to the text area only
$("#notes").focus(function(){
    calculator.enabled = false;
});

$("#notes").blur(function(){
    calculator.enabled = true;
});

//Clearing History
$("#history").dblclick(function(){
   $("#history").html(`HISTORY`+`<br>`+`<br>`);
});

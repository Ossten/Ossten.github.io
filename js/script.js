const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue } = calculator;
  calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
  console.log(calculator);
}
function inputDecimal(dot) {
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
    console.log(calculator);
  }
}

function clearScreen() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

//**B */
function negateNumber() {
  calculator.displayValue = String(calculator.displayValue * -1);
  console.log(calculator);
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);
  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }
  return secondOperand;
}

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }

  console.log(calculator);
}

function updateDisplay() {
  const display = document.querySelector(".calc-screen");
  console.log(display.getAttribute("value"));
  display.setAttribute("value", calculator.displayValue);
  document.querySelector(".calc-screen").innerHTML = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector(".calculator-container");
keys.addEventListener("click", (event) => {
  // Access the clicked element
  const { target } = event;

  // Check if the clicked element is a button.
  // If not, exit from the function
  if (!target.matches(".button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    console.log("operator", target.getAttribute("value"));
    handleOperator(target.getAttribute("value"));
    updateDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    console.log("decimal", target.getAttribute("value"));
    inputDecimal(target.getAttribute("value"));
    updateDisplay();
    return;
  }

  if (target.classList.contains("all-clear")) {
    console.log("clear", target.getAttribute("value"));
    clearScreen();
    updateDisplay();
    return;
  }

  if (target.classList.contains("negate")) {
    console.log("negate", target.getAttribute("value"));
    negateNumber(target.getAttribute("value"));
    updateDisplay();
    return;
  }

  console.log("digit", target.getAttribute("value"));
  inputDigit(target.getAttribute("value"));
  updateDisplay();
});

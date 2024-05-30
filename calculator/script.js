let currentNumber = "";
let previousNumber = "";
let operator = "";
let stack = []; // Stack to handle parentheses

function appendNumber(number) {
  currentNumber += number;
  updateDisplay();
}

function appendOperator(op) {
  if (op === "(") {
    if (currentNumber !== "") {
      stack.push({ number: currentNumber, operator: operator });
      currentNumber = "";
      operator = "";
    }
    stack.push({ number: "(", operator: "" });
  } else if (op === ")") {
    if (currentNumber !== "") {
      while (stack.length > 0 && stack[stack.length - 1].number !== "(") {
        let previous = stack.pop();
        previousNumber = previous.number;
        operator = previous.operator;
        calculateResult(previousNumber, currentNumber, operator);
        currentNumber = previousNumber;
      }
      if (stack.length === 0 || stack[stack.length - 1].number !== "(") {
        alert("Mismatched parentheses!");
        return;
      }
      stack.pop(); // Remove the '(' from the stack
    } else {
      alert("Empty parentheses are not allowed!");
      return;
    }
  } else {
    if (currentNumber !== "") {
      if (previousNumber !== "" && operator !== "") {
        calculateResult(previousNumber, currentNumber, operator);
      }
      previousNumber = currentNumber;
      currentNumber = "";
      operator = op;
    }
  }
  updateDisplay();
}

function clearDisplay() {
  currentNumber = "";
  previousNumber = "";
  operator = "";
  stack = []; // Clear the stack
  document.getElementById("display").value = "";
}

function calculate() {
  // Check if there are unclosed parentheses before calculating
  if (stack.some(item => item.number === "(")) {
    alert("Mismatched parentheses!");
    return; // Exit the function to avoid calculations with unbalanced parentheses
  }
  if (currentNumber !== "" && previousNumber !== "") {
    calculateResult(previousNumber, currentNumber, operator);
  }
}

function calculateResult(prevNum, currNum, op) {
  if (prevNum !== "" && currNum !== "") {
    let result = 0;
    const prevNumFloat = parseFloat(prevNum);
    const currNumFloat = parseFloat(currNum);

    switch (op) {
      case "+":
        result = prevNumFloat + currNumFloat;
        break;
      case "-":
        result = prevNumFloat - currNumFloat;
        break;
      case "*":
        result = prevNumFloat * currNumFloat;
        break;
      case "/":
        if (currNumFloat !== 0) {
          result = prevNumFloat / currNumFloat;
        } else {
          alert("Division by zero is not allowed!");
          return; // Exit to avoid further execution
        }
        break;
      default:
        break;
    }

    currentNumber = result.toString();
    previousNumber = "";
    operator = "";
    updateDisplay();
  }
}

function updateDisplay() {
  let displayValue = "";
  stack.forEach(item => {
    if (item.number === "(" || item.number === ")") {
      displayValue += " " + item.number + " ";
    } else {
      displayValue += item.number;
    }
    if (item.operator) {
      displayValue += " " + item.operator + " ";
    }
  });
  if (previousNumber) {
    displayValue += previousNumber + " " + operator + " ";
  }
  displayValue += currentNumber;
  document.getElementById("display").value = displayValue.trim();
}

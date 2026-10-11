// Get the calculator display
const display = document.getElementById("display");


// Add a number or operator to the display
function appendValue(value) {

    // Get the current display value
    let currentValue = display.value;

    // Prevent two operators from being entered together
    if (
        ["+", "-", "*", "/", "%"].includes(value) &&
        ["+", "-", "*", "/", "%"].includes(currentValue.slice(-1))
    ) {
        return;
    }

    // Prevent more than one decimal point in the same number
    if (value === ".") {
        let parts = currentValue.split(/[\+\-\*\/\%]/);

        if (parts[parts.length - 1].includes(".")) {
            return;
        }
    }

    // Add the value to the display
    display.value += value;
}


// Clear the calculator display
function clearDisplay() {
    display.value = "";
}


// Delete the last entered character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}


// Calculate the result
function calculate() {

    // Get the expression entered by the user
    const expression = display.value;

    // Check if the display is empty
    if (expression === "") {
        return;
    }

    // Match two numbers with one mathematical operator
    const match = expression.match(
        /^(-?\d+(?:\.\d+)?)\s*([\+\-\*\/\%])\s*(-?\d+(?:\.\d+)?)$/
    );

    // Show error if the expression is invalid
    if (!match) {
        display.value = "Invalid";
        return;
    }

    // Convert the numbers from text to numbers
    const num1 = parseFloat(match[1]);
    const operator = match[2];
    const num2 = parseFloat(match[3]);

    let result;

    // Perform the selected operation
    switch (operator) {

        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "*":
            result = num1 * num2;
            break;

        case "/":
            // Prevent division by zero
            if (num2 === 0) {
                display.value = "Cannot divide by 0";
                return;
            }

            result = num1 / num2;
            break;

        case "%":
            // Prevent modulo by zero
            if (num2 === 0) {
                display.value = "Cannot divide by 0";
                return;
            }

            result = num1 % num2;
            break;

        default:
            display.value = "Invalid";
            return;
    }

    // Display the final result
    display.value = result;
}
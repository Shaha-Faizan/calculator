const display = document.getElementById('display');
let expression = "";

document.querySelectorAll('.button').forEach((button) => {
    button.addEventListener('click', () => {
        const buttonValue = button.innerHTML;
        
        if (buttonValue === '=') {
            try {
                expression = eval(expression);
                display.value = expression;
            } catch (error) {
                display.value = 'Error';
                expression = "";
            }
        } else if (buttonValue === 'AC') {
            expression = "";
            display.value = "";
        } else if (buttonValue === '←') { // ← represents the cut button
            expression = expression.slice(0, -1); // Remove the last character
            display.value = expression;
        } else if (buttonValue === '+/-') {
            if (expression.startsWith('-')) {
                expression = expression.slice(1); // Remove the negative sign
            } else {
                expression = '-' + expression; // Add a negative sign
            }
            display.value = expression;
        } else if (isOperator(buttonValue)) {
            if (!isOperator(expression.slice(-1))) { // Check if last character is not an operator
                expression += buttonValue;
                display.value = expression;
            }
        } else {
            expression += buttonValue;
            display.value = expression;
        }
    });
});

function isOperator(value) {
    return ['+', '-', '*', '/', '%'].includes(value);
}

const expressionInput = document.getElementById('expression');
const resultInput = document.getElementById('result');
let lastInputWasOperator = false;

document.querySelectorAll('.button').forEach((button) => {
    button.addEventListener('click', () => {
        let buttonValue = button.innerHTML;

        // Replace × with * and − with -
        buttonValue = buttonValue.replace('×', '*').replace('−', '-');

        if (buttonValue === '=') {
            try {
                const expression = expressionInput.value.replace(/×/g, '*').replace(/−/g, '-');
                const result = eval(expression);
                resultInput.value = result;
            } catch (error) {
                resultInput.value = 'Error';
            }
        } else if (buttonValue === 'AC') {
            expressionInput.value = '';
            resultInput.value = '';
            lastInputWasOperator = false;
        } else if (buttonValue === '←') {
            expressionInput.value = expressionInput.value.slice(0, -1);
        } else if (buttonValue === '+/-') {
            if (expressionInput.value.startsWith('-')) {
                expressionInput.value = expressionInput.value.slice(1);
            } else {
                expressionInput.value = '-' + expressionInput.value;
            }
        } else if (isOperator(buttonValue)) {
            if (!lastInputWasOperator) {
                const lastChar = expressionInput.value.slice(-1);
                if (!isOperator(lastChar)) {
                    expressionInput.value += buttonValue;
                    lastInputWasOperator = true;
                } else if (buttonValue !== lastChar) {
                    // Replace the last operator with the new one if they are different
                    expressionInput.value = expressionInput.value.slice(0, -1) + buttonValue;
                }
            }
        } else {
            expressionInput.value += buttonValue;
            lastInputWasOperator = false;
        }
    });
});

function isOperator(value) {
    return ['+', '-', '*', '/', '%', '×', '−'].includes(value);
}

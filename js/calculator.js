class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOpperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOpperand = this.currentOpperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOpperand.includes('.')) return;
    this.currentOpperand = this.currentOpperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOpperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOpperand;
    this.currentOpperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOpperand);
    if (isNaN(prev) || isNaN(current)) return;
    // how to calculate which operator
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      case '%':
        computation = (prev / 100) * current;
        break;
      default:
        return;
    }
    this.currentOpperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDislay;
    if (isNaN(integerDigits)) {
      integerDislay = '';
    } else {
      integerDislay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDislay}.${decimalDigits}`;
    } else {
      return integerDislay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOpperand
    );
    if (this.operation != null) {
      // shows the operant on the previous display
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

const numberButtons = document.querySelectorAll('[data-num]');
const operationButtons = document.querySelectorAll('[data-operation]');
const previousOperandTextElement = document.querySelector('[previous-operand]');
const currentOperandTextElement = document.querySelector('[current-operand]');
const equalBtn = document.querySelector('[data-equal]');
const clearBtn = document.querySelector('[data-clear]');
const allClearBtn = document.querySelector('[data-all-clear]');

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalBtn.addEventListener('click', (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearBtn.addEventListener('click', (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

clearBtn.addEventListener('click', (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

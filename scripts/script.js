class Calculator {
    constructor() {
        this.powerOn = true;
        this.numVisor = '0';
        this.memoriaTemp = '';
        this.secondStart = false;
        this.errorState = false;
        this.ptDecimal = false;
        this.memoria = 0;
        this.atualOp = '';

    }

    showVisor() {
        return this.numVisor;
    }

    insertDigit(dig) {
        if (!this.powerOn || this.errorState) return;
        if (dig !== '.' && (isNaN(parseInt(dig)) || this.numVisor.length >= 10)) return;
    
        if (!this.secondStart && this.atualOp) {
            this.secondStart = true;
            this.ptDecimal = false;
            this.numVisor = '0';
        }
    
        if (dig === '.') {
            if (this.ptDecimal) return;
            this.ptDecimal = true;
        }
    
        if (this.numVisor === '0') {
            this.numVisor = dig === '.' ? '0.' : dig;
        } else {
            if (this.numVisor.includes('.')) {
                const [integerPart, decimalPart] = this.numVisor.split('.');
                if (integerPart.length + 1 <= 10) {
                    this.numVisor += dig;
                }
            } else {
                if (this.numVisor.length + 1 <= 10) {
                    this.numVisor += dig;
                }
            }
        }
    
        if (parseFloat(this.numVisor).toString().includes('e+')) {
            this.numVisor = parseFloat(this.numVisor).toPrecision(12).toString();
        }
    
        updateView();
    }
    

    defineOperation(op) {
        if (!this.powerOn || this.errorState) return;
    
        if (op === '+' || op === '-' || op === '*' || op === '/') {
            if (this.atualOp) {
                this.equal(); 
            }
            this.memoriaTemp = this.numVisor;
            this.atualOp = op;
            this.secondStart = false;
            this.ptDecimal = false;
        }
        if (op === 'INV') {
            this.invertSign();
        }
        if (op === 'SQUARE') {
            this.square();
        }
        if (op === '%') {
            this.percentage();
        }
    }
    
    equal() {
        if (!this.powerOn || this.errorState) return;
        const num1 = parseFloat(this.memoriaTemp);
        const num2 = parseFloat(this.numVisor);
        let answer;
        switch (this.atualOp) {
            case '+':
                answer = num1 + num2;
                break;
            case '-':
                answer = num1 - num2;
                break;
            case '*':
                answer = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    this.numVisor = 'ERROR!';
                    updateView();
                    this.errorState = true;
                    return;
                }
                answer = num1 / num2;
                break;
            default:
                return;
        }
        if (Number.isInteger(answer)) {
            this.numVisor = answer.toString(); 
        } else {
            this.numVisor = parseFloat(answer.toFixed(10));
        }
        this.memoriaTemp = '';
        this.atualOp = '';
        this.ptDecimal = this.numVisor.includes('.');
        this.secondStart = false;
        updateView();
    }
    
    invertSign() {
        if (!this.powerOn || this.errorState) return;
        this.numVisor = (-parseFloat(this.numVisor)).toString();
        updateView();
    }

    square() {
        if (!this.powerOn || this.errorState) return;
        const num = parseFloat(this.numVisor);
        const result = (num ** 2).toFixed(10); 
        this.numVisor = parseFloat(result);
        updateView();
    }

    clearEntry() {
        if (!this.powerOn || this.errorState) return;
        this.numVisor = '0';
        this.ptDecimal = false;
        updateView();
    }

    percentage() {
        if (!this.powerOn || this.errorState) return;
        this.numVisor = (parseFloat(this.numVisor) / 100).toString();
        updateView();
    }

    keyCE() {
        if (!this.powerOn || this.errorState) return;
        this.clearEntry();
    }

    keyMR() {
        if (!this.powerOn || this.errorState) return;
        this.numVisor = this.memoria.toString();
        updateView();
    }

    keyMminus() {
        if (!this.powerOn || this.errorState) return;
        this.memoria -= parseFloat(this.numVisor);
        updateView();
    }

    keyMplus() {
        if (!this.powerOn || this.errorState) return;
        this.memoria += parseFloat(this.numVisor);
        updateView();
    }

    keyMC() {
        if (!this.powerOn || this.errorState) return;
        this.memoria = 0;
        updateView();
    }

    backspace() {
        if (!this.powerOn || this.errorState) return;
        this.numVisor = this.numVisor.length === 1 || (this.numVisor.length === 2 && this.numVisor.startsWith('-')) ? '0' : this.numVisor.slice(0, -1);
        updateView();
    }

    clearAll() {
        if (!this.powerOn) return;
        this.memoriaTemp = '';
        this.secondStart = false;
        this.errorState = false;
        this.ptDecimal = false;
        this.atualOp = '';
        this.numVisor = '0';
        updateView();
    }

    clearAcc() {
        this.memoriaTemp = '';
        this.secondStart = false;
        this.errorState = false;
        this.ptDecimal = false;
        this.atualOp = '';
        this.numVisor = '0';
        updateView();
    }

    on() {
        this.powerOn = true;
        this.clearAcc();
        updateView();
    }

    off() {
        this.clearAcc();
        this.keyMC();
        this.numVisor = 'OFF';
        updateView();
        this.powerOn = false;
    }

    raiz() {
        if (!this.powerOn || this.errorState) return;
        const num = parseFloat(this.numVisor);
        if (num < 0) {
            this.errorState = true;
            this.numVisor = 'ERROR!';
            updateView();
            return;
        }
        let result = Math.sqrt(num).toString();
        result = parseFloat(result).toFixed(8);
        this.numVisor = result;
        updateView();
    }

    inverse() {
        if (!this.powerOn || this.errorState) return;
        const num = parseFloat(this.numVisor);
        if (num === 0) {
            this.errorState = true;
            this.numVisor = 'ERROR!';
            updateView();
            return;
        }
        let result = (1 / num).toString();
        if (result.includes('.')) {
            const [integerPart, decimalPart] = result.split('.');
            if (integerPart.length > 10) {
                result = 'ERROR!';
            } else {
                result = integerPart.slice(0, 6) + '.' + decimalPart;
            }
        } else {
            if (result.length > 10) {
                result = 'ERROR!';
            }
        }
        this.numVisor = result;
        updateView();
    }

    memorySave() {
        if (!this.powerOn || this.errorState) return;
        const num = parseFloat(this.numVisor);
        this.memoria = num; 
        updateView();
    }
}

let calculator = new Calculator();

let updateView = () => {
    const visor = calculator.showVisor();
    document.getElementById('visor-id').innerHTML = visor;
}


let digit = (dig) => {
    calculator.insertDigit(dig);
    updateView();
}

let defineOp = (op) => {
    calculator.defineOperation(op);
}

let keyEqual = () => {
    calculator.equal();
    updateView();
}

let keyMR = () => {
    calculator.keyMR();
    updateView();
}

let keyMminus = () => {
    calculator.keyMminus();
}

let keyMplus = () => {
    calculator.keyMplus();
}

let keyMC = () => {
    calculator.keyMC();
}

let keyBackspace = () => {
    calculator.backspace();
}

let keyCE = () => {
    calculator.clearEntry();
    updateView();
}

let keyC = () => {
    calculator.clearAcc();
    updateView();
}

let keyOn = () => {
    calculator.on();
}

let keyOff = () => {
    calculator.off();
}

let raiz = () => {
    calculator.raiz();
}

let inverse = () => {
    calculator.inverse();
}

let keyMS = () => {
    calculator.memorySave();
}
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
            this.numVisor += dig;
        }
        updateView();
    }

    defineOperation(op) {
        if (!this.powerOn || this.errorState) return;

        if (op === 'CE') {
            this.clearEntry();
            return;
        }

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
                    this.errorState = true;
                    this.numVisor = 'ERROR!';
                    updateView();
                    return;
                }
                answer = num1 / num2;
                break;
            default:
                return;
        }
        this.numVisor = answer.toString().slice(0, 10);
        this.atualOp = '';
        this.ptDecimal = false;
        this.secondStart = false;
        this.memoriaTemp = '';
    }

    invertSign() {
        if (!this.powerOn || this.errorState) return;
        this.numVisor = (-parseFloat(this.numVisor)).toString();
        updateView();
    }

    square() {
        if (!this.powerOn || this.errorState) return;
        this.numVisor = (parseFloat(this.numVisor) ** 2).toString();
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
        if (!this.powerOn || this.errorState) return;
        this.numVisor = '0';
        this.memoriaTemp = '';
        this.secondStart = false;
        this.errorState = false;
        this.ptDecimal = false;
        this.atualOp = '';
        updateView();
    }

    on() {
        this.powerOn = true;
        this.clearAll();
        updateView();
    }

    off() {
        this.clearAll();
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
        this.numVisor = Math.sqrt(num).toString().slice(0, 12);
        updateView();
    }


}

let calculator = new Calculator();

let updateView = () => {
    document.getElementById('visor-id').innerHTML = calculator.showVisor();
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
    calculator.clearAll();
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


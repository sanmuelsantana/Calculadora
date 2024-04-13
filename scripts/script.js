class Calculator {
    constructor() {
        this.numVisor = '0';
        this.memoriaTemp = '';
        this.secondStart = false;
        this.errorState = false;
        this.ptDecimal = false;
        this.memoria = 0;
        this.op = {
            NOP: 0,
            SUM: 1,
            SUB: 2,
            MULT: 3, 
            DIV: 4, 
            E: 5,
            LOG: 6,
            PI: 7,
            RAIZ: 8,
            ELEVATE: 9,
            INVERT: 10,
            PERCENTAGE: 11,
            SQUARE: 12,
        }
        this.atualOp = this.op.NOP;
    }

    showVisor(){
        return this.numVisor;
    }

    insertDigit(dig) {
        if (this.errorState) return;
        if (dig.length != 1) return;
        if ((dig < '0' || dig > '9') && dig != '.') return;
        if (!this.secondStart && this.atualOp !== this.op.NOP) {
            this.secondStart = true;
            this.ptDecimal = false;
            this.numVisor = '0';
        }
        if (dig == '.') {
            if (this.ptDecimal) return;
            this.ptDecimal = true;
        }
        if (this.numVisor.length == 10) return;
        if (this.numVisor == '0') {
            this.numVisor = dig == '.' ? '0.' : dig;
        } else {
            this.numVisor += dig;
        }
        updateView();
    }

    defineOperation(op){
        if(this.errorState) return;
        switch(op){
            case '+':
                this.atualOp = this.op.SUM;
                break;
            case '-':
                this.atualOp = this.op.SUB;
                break;
            case '/':
                this.atualOp = this.op.DIV;
                break;
            case '*':
                this.atualOp = this.op.MULT;
                break;
            case 'INV':
                this.invertSign();
                break;
            case 'SQUARE':
                this.square();
                break;
            case 'CE':
                this.clearEntry();
                break;
            case '%':
                this.percentage();
                break;
        }
        this.memoriaTemp = this.numVisor;
    }

    invertSign() {
        if (this.errorState) return;
        let number = parseFloat(this.numVisor);
        this.numVisor = (-number).toString();
        updateView(); 
    }

    square() {
        if (this.errorState) return;
        let number = parseFloat(this.numVisor);
        this.numVisor = (number * number).toString();
        updateView();
    }

    clearEntry() {
        this.numVisor = '0';
        this.ptDecimal = false;
        updateView();
    }

    percentage() {
        if (this.errorState) return;
        let number = parseFloat(this.numVisor);
        this.numVisor = (number / 100).toString();
        updateView();
    }
    
    equal(){
        if(this.errorState) return;
        let num1 = parseFloat(this.memoriaTemp);
        let num2 = parseFloat(this.showVisor());
        let answer = 0;
        switch(this.atualOp) {
            case this.op.SUM:
                answer = num1 + num2;
                break;
            case this.op.SUB:
                answer = num1 - num2;
                break;
            case this.op.MULT:
                answer = num1 * num2;
                break;
            case this.op.DIV:
                if(num2 === 0) {
                    this.errorState = true;
                    this.numVisor = 'ERROR!';
                    updateView();
                    return;
                }
                answer = num1 / num2;
                break;
        }
        this.atualOp = this.op.NOP;
        this.ptDecimal = false;
        this.secondStart = false;
        this.memoriaTemp = '';
        this.numVisor = String(answer).slice(0, 12);
    }

    keyCE() {
        this.clearEntry();
        this.errorState = false;
    }

    keyMplus() {
        if(this.errorState) return;
        this.memoria += parseFloat(this.numVisor);
        updateView();
    }

    keyMminus(){
        if(this.errorState) return;
        this.memoria -= parseFloat(this.numVisor);
        updateView();
    }

    keyMR(){
        if(this.errorState) return;
        this.numVisor = String(this.memoria);
        updateView();
    }

    keyMC(){
        if(this.errorState) return;
        this.memoria = 0;
        updateView(); 
    }

    backspace() {
        if (this.errorState) return;
        if (this.numVisor.length === 1 || (this.numVisor.length === 2 && this.numVisor.startsWith('-'))) {
            this.numVisor = '0';
        } else {
            this.numVisor = this.numVisor.slice(0, -1); // Remove apenas o último dígito
        }
        updateView();
    }
}

let calculator = new Calculator();

let updateView = () => {
    document.getElementById('visor-id').innerHTML = calculator.showVisor();
}

let digit = (dig) =>  {
    calculator.insertDigit(dig);
    updateView();
}

let defineOp = (op) => {
    if(calculator.atualOp !== calculator.op.NOP) {
        calculator.equal();
    }
    calculator.defineOperation(op);
}

let keyCE = () => {
    calculator.keyCE();
    updateView();
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
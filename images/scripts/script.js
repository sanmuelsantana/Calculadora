class calc {
    constructor() {
        this.numVisor = '0';
        this.memoriaTemp = '';
        this.secondStart = false;
        this.errorState = false;
        this.ptDecimal = false;
        this.memoria = 0;
        this.op = {
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
        if (!this.secondStart && this.opAtual != this.op.NOP) {
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
        this.memoriaTemp = this.showVisor;
    }

    invertSign() {
        if (this.errorState) return;
        let number = parseFloat(this.numVisor);
        this.numVisor = (-number).toString();
    }

    square() {
        if (this.errorState) return;
        let number = parseFloat(this.numVisor);
        this.numVisor = (number * number).toString();
    }

    clearEntry() {
        this.numVisor = '0';
        this.ptDecimal = false;
    }

    percentage() {
        if (this.errorState) return;
        let number = parseFloat(this.numVisor);
        this.numVisor = (number / 100).toString();
    }
    
    equal(){
        if(this.errorState) return;
        let num1 = parseFloat(this.memoriaTemp);
        let num2 = parseFloat(this.showVisor);
        let answer = 0;
        switch(this.opAtual) {
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
                if(num == 0) {
                    this.errorState = true;
                    this.numVisor = 'ERROR!';
                    return;
                }
                answer = num1 / num2;
                break;
        }
        this.opAtual = this.op.NOP;
        this.ptDecimal = false;
        this.secondStart = false;
        this.memoriaTemp = '';
        this.numVisor = String(answer).slice(0, 12);
    }

    keyCE() {
        this.clearEntry();
    }

    keyMplus() {
        if(this.errorState) return;
        this.memoria += parseFloat(this.numVisor);
    }

    keyMminus(){
        if(this.errorState) return;
        this.memoria -= parseFloat(this.numVisor);
    }

    keyMR(){
        if(this.errorState) return;
        this.numVisor = String(this.memoria);
    }

    keyMC(){
        if(this.errorState) return;
        this.memoria = 0;
    }

}

let calc = new calc();

let updateView = () => {
    document.getElementById('screen').innerHTML = calc.showVisor();
}

let digit = (dig) =>  {
    if(calcualdora) {
        calc.insertDigit(dig);
        updateView();
    }

}

let defineOp = (op) => {
    if(calc.atualOp != calc.op.NOP) {
        equal();
        updateView();
    }
    calc.defineOperation(op);
}

let keyCE = () => {
    calc.keyCE();
    updateView();
}

let keyEqual = () => {
    calc.equal();
    updateView();
}

let keyMR = () => {
    calc.keyMR();
    updateView();
}

let keyMminus = () => {
    calc.keyMminus();
}

let keyMplus = () => {
    calc.keyMplus();
}

let keyMC = () => {
    calc.keyMC();
}

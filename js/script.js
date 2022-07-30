/* SELECIONAR ELEMENTOS */
let btnConverte= document.querySelector('#btnCvt');
let valorDigitado = document.querySelector('#txtv');
let btnClean = document.querySelector('.clean');
let icon = document.querySelector('.fas');
let dropdown = document.querySelector('.dropdown');

// COTACOES DO DIA 06/03/2022 
let dolar=5.06;
let euro=5.53;
let libra=6.70;
// let bitcoin=195510.98;
let bitcoin = 197659.96;
let valorConvertido;

// CONVERTER MOEDA
btnConverte.onclick=function(){
    if(valorDigitado.value.length == ''){
       let error =document.querySelector('.error-text');
       error.classList.add('show-error');
       valorDigitado.addEventListener('keydown',function(){
          error.classList.remove('show-error');
       });
    }else{
        ativarBotao();
        let valorEmReal = parseFloat(valorDigitado.value);
        let option=document.querySelector('.textBox').value; 

        switch (option) {
            case "USD/Dolar":
                valorConvertido = valorEmReal / dolar;
                document.getElementById('res').innerHTML = valorConvertido.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + ' Dólar';
                break;
            case "EUR/Euro":
                valorConvertido = valorEmReal / euro;
                document.getElementById('res').innerHTML = valorConvertido.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) + ' Euro.';
                break;
            case "Libra":
                valorConvertido = valorEmReal / libra;
                document.getElementById('res').innerHTML = valorConvertido.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }) + ' Libra';
                break;
            case "Bitcoin":
                valorConvertido = valorEmReal / bitcoin;
                document.getElementById('res').innerHTML = parseFloat(valorConvertido).toFixed(5) + ' BTC';
                break;
            default:
                check();
        }
    }
}

//SHOW
function show(text){
    document.querySelector('.textBox').value = text;
}
dropdown.onclick=function(){
 dropdown.classList.toggle('active');
}

// VALIDAR O SELECT CASO ESTEJA VAZIO
function check(){
    let errorSelect = document.querySelector('.error-select');
    errorSelect.classList.add('show-error');
    
    dropdown.classList.add('select-error')
    dropdown.addEventListener('click',function(){
       errorSelect.classList.remove('show-error');
       dropdown.classList.remove('select-error')
    });
}

//LIMPAR TELA E DESABILITAR O BOTÃO LIMPA
btnClean.disabled=true;
icon.style.color="#ccc";
btnClean.style.cursor="not-allowed"

btnClean.onclick=function(){
    valorDigitado.value = ''
    res.innerHTML = ''
    document.querySelector('.textBox').value = '';
}
function ativarBotao() {
    btnClean.removeAttribute('disabled');
    btnClean.style.cursor="pointer"
    icon.style.color="#0d79ec";
}
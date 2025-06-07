const btnConverte = document.querySelector('#btn-convert');
const valorDigitado = document.querySelector('#txtv');
const dropdown = document.querySelector('.dropdown');
const dropdownField = document.querySelector('.dropdown-field');
const inforBox = document.querySelector('#info');
const btnClean = document.querySelector('#btn-clean');

const API_TOKEN = '0c349e5f6cd7f33afbcc902277ef15dbac2f595f2c7bd72ec95f5fdc58eb80fa';
let ultimaAtualizacao = null;

const exchangeRates = {
    USD: null,
    EUR: null,
    GBP: null,
    BTC: null,
};
// Obter cotações ao carregar
document.addEventListener('DOMContentLoaded', obterCotacoes);
btnConverte.addEventListener('click', convertValue);
// Dropdown
dropdown.addEventListener('click',() => {
    dropdown.classList.toggle('active')
});
// Limpar campos
btnClean.addEventListener('click', cleanValues)

async function obterCotacoes() {
    const agora = Date.now();
    if (ultimaAtualizacao && (agora - ultimaAtualizacao < 5 * 60 * 1000)) return;
    try {
        const res = await fetch(`https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL?token=${API_TOKEN}`);
        const data = await res.json();

        exchangeRates.USD = +data.USDBRL.bid;
        exchangeRates.EUR = +data.EURBRL.bid;
        exchangeRates.GBP = +data.GBPBRL.bid;
        exchangeRates.BTC = +data.BTCBRL.bid;

        ultimaAtualizacao = agora;

    } catch (err) {
        console.error("Erro:", err);
        exchangeRates.USD = 5.06;
        exchangeRates.EUR = 5.53;
        exchangeRates.GBP = 6.70;
        exchangeRates.BTC = 197659.96;
    }
}
// Converter valor
async function convertValue(e){
    e.preventDefault();
    if (!exchangeRates.USD) {
        inforBox.innerHTML = 'Carregando cotações...';
        await obterCotacoes();
    }

    const valor = parseFloat(valorDigitado.value);
    const moeda = dropdownField.value;

    if (!valor || isNaN(valor)) return showError('Valor inválido', 'Digite um valor numérico válido em reais.');
    if (!moeda) return showError('Moeda não selecionada', 'Escolha uma moeda para conversão.');

    converterMoeda(valor, moeda);
};

function converterMoeda(valor, moeda) {
    const formatos = {
        "USD/Dólar": { rate: exchangeRates.USD, locale: "en-US", symbol: "USD" },
        "EUR/Euro": { rate: exchangeRates.EUR, locale: "de-DE", symbol: "EUR" },
        "GBP/Libra": { rate: exchangeRates.GBP, locale: "en-GB", symbol: "GBP" },
        "BTC/Bitcoin": { rate: exchangeRates.BTC, symbol: "BTC" }
    };

    const config = formatos[moeda];
    if (!config) return showError('.error-select', dropdown);

    const valorConvertido = valor / config.rate;

    inforBox.innerHTML = config.symbol === 'BTC'
        ? `${valorConvertido.toFixed(8)} BTC`
        : valorConvertido.toLocaleString(config.locale, { style: 'currency', currency: config.symbol });
}
// Mostrar moeda escolhida
function showValue(text) {
    dropdownField.value = text;
}
// Mostrar erros
function showError(title, text) {
  Swal.fire({
    toast: true,
    position: 'top-end',      
    icon: 'error',
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    showClass: {
      popup: 'swal2-show swal2-slide-in-right'
    },
    hideClass: {
      popup: 'swal2-hide swal2-slide-out-right'
    },
    didOpen: (toast) => {
      const progressBar = toast.querySelector('.swal2-timer-progress-bar');
      if (progressBar) {
        progressBar.style.background = '#f27474';
        progressBar.style.opacity = '1';
        progressBar.style.height = '4px';
      }
    }
  });
}
function cleanValues(){
    valorDigitado.value = ''
    inforBox.innerHTML = ''
    document.querySelector('..dropdown-field').value = '';
}



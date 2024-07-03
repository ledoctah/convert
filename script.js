const USD = 5.68;
const EUR = 6.10;
const GBP = 7.10;

const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById('currency');
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;

  amount.value = amount.value.replace(hasCharactersRegex, "");
});

form.onsubmit = evt => {
  evt.preventDefault();

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, currency.value);
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, currency.value);
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, currency.value);
      break;
  }
}

function convertCurrency(amount, price, currency) {
  try {
    description.innerText =
      `${formatCurrency(amount, currency, 0)} = ${formatCurrency(price, "BRL")}`;

    let total = amount * price;

    if (isNaN(total)) {
      alert("Por favor, digite o valor corretamente para converter.");
      return;
    }

    total = formatCurrency(total, "BRL").replace("R$", "");

    result.textContent = `${total} Reais`;

    footer.classList.add("show-result");
  } catch (err) {
    footer.classList.remove("show-result");
    console.error(err);
    alert("Não foi possível converter. Tente novamente mais tarde.")
  }
}

/**
 * Function to convert a numeric value to a specified currency format.
 * @param {number} value Value to be formatted
 * @param {string} currency Currency identifier
 * @param {number} decimalPlaces Number of decimal places to be shown
 * @returns {string}
 */
function formatCurrency(value, currency = "BRL", decimalPlaces = 2) {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: decimalPlaces,
  });
}

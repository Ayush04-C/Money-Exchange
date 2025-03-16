document.addEventListener("DOMContentLoaded", () => {
  // Stroing data of necessary elements
  const input = document.getElementById("userinput");
  const currenyfrom = document.getElementById("CurrencyFrom");
  const currenyto = document.getElementById("CurrencyTo");
  const convertbutton = document.getElementById("convert");
  const output = document.getElementById("CC");

  // Made a function so that when click on convert button exchange should be done and output should be given
  convertbutton.addEventListener("click", () => {
    const amount = input.value;
    const from = currenyfrom.value;
    const to = currenyto.value;

    // To check if datas are storing in specific variables
    console.log("Amount:", amount);
    console.log("Currency From:", from);
    console.log("Currency To:", to);

    // a condition to check if data entered by user is a valid amount
    if (!amount || isNaN(amount)) {
      output.textContent = "Please enter a valid amount";
      return;
    }

    const apikey = "343124e422efd7766fd58a43";

    // Getting data from ExchangeRate api
    fetch(
      `https://v6.exchangerate-api.com/v6/343124e422efd7766fd58a43/latest/${from}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error : ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // Conditon to check if status of API request is success
        if (data.result === "success") {
          const rate = data.conversion_rates[to];
          const convertedamt = (amount * rate).toFixed(2);
          output.textContent = `Converted amount : ${convertedamt} ${to}`;
        } else {
          output.textContent = "Invlaid Input";
          console.error("Error", error);
        }
      })
      .catch((error) => {
        output.textContent = "Error in fetching the exchange rates";
        console.error("Error :", error);
      });
  });
});

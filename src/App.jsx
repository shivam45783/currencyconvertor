import { useEffect, useState } from "react";
import useCurrencyInfo from "./components/hooks/useCurrencyInfo.js";
import { InputBox } from "./components/index.js";
function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from); // this is an object having key as diffrent currencies and value as their amount to be multiplied to change it it that currency
  const options = Object.keys(currencyInfo);

  useEffect(() => {
    convert();
  }, [amount, from]);
  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
  };
  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(
          "https://media.istockphoto.com/id/1407983911/photo/forex-diagrams-and-stock-market-rising-lines-with-numbers.jpg?s=612x612&w=0&k=20&c=zas1h6LR6v2iCvE7SWnVoZ_s7ZSiboN45UK0d5oMWac="
        )`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="from"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 hover:bg-blue-700"
                onClick={() => swap()} // or we can write directly {swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mb-1 flex flex-col justify-center align-middle gap-2">
              <InputBox
                label="to"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to}
                amountDisabled={true}
              />
              <button
                className="w-auto bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700"
                onClick={() => navigator.clipboard.writeText(convertedAmount)}
              >
                Copy
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

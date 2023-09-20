import React from 'react';
import './App.css';
import BalanceSheet from './components/BalanceSheet';
import Operations from './components/Operations';
import DenominationCard from './components/DenominationCard';

const DenominationValues = [
  { type: "Twenties", value: 0, count: 0, valueDenomination: 20 },
  { type: "Tens", value: 0, count: 0, valueDenomination: 10 },
  { type: "Fives", value: 0, count: 0, valueDenomination: 5 },
  { type: "Twos", value: 0, count: 0, valueDenomination: 2 },
  { type: "Ones", value: 0, count: 0, valueDenomination: 1 },
]

function App() {
  const [denominations, setDenominations] = React.useState(DenominationValues);

  return (
    <div className="container pb-5">
      <div className="row">
        <BalanceSheet denominations={denominations} />
        <Operations denominations={denominations} setDenominations={setDenominations} />
      </div>
      <div className="row">
        <div className="col-md-12 position-relative mt-5 floating-label-panel">
          <div className="border border-light shadow-sm rounded p-4 pt-5">
            <div className="position-absolute h2 bg-dark text-light px-2 mb-0">Denominations</div>
            <div className="row">
              {
                denominations.map((denomination, index) => (
                  <DenominationCard key={index} denomination={denomination} setDenominations={setDenominations} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

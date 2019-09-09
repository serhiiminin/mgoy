import React, { useState } from "react"
import { calculatePayments } from "../util"

const NAME_INITIAL_VALUE = '';
const AMOUNT_INITIAL_VALUE = 0;

const DebtorsList = () => {
  const [debtors, setDebtors] = useState([])
  const [name, setName] = useState(NAME_INITIAL_VALUE)
  const [amount, setAmount] = useState(AMOUNT_INITIAL_VALUE)

  const onSubmit = event => {
    event.preventDefault();
    setName(NAME_INITIAL_VALUE);
    setAmount(AMOUNT_INITIAL_VALUE);
    setDebtors(data => [...data, { name, amount, initAmount: amount }]);
  }
  const handleCalculate = () => {
    setDebtors(data => calculatePayments(data));
  }
  console.log(debtors)
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={name} onChange={event => setName(event.target.value)}/>
        <input type="number" value={amount} onChange={event => setAmount(parseFloat(event.target.value))} />
        <input type="submit" value="Add user" />
      </form>
      <ul>
        {debtors.map(({ name, amount, initAmount, receivers }) => (
          <li key={`${name}${amount}`}>
            <div>Name: {name}</div>
            <div>Amount: {initAmount}</div>
            {receivers && (
              <ul>
                {receivers.map(({ name, amount }) => (
                  <li key={`${name}${amount}`}>
                    <div>Name: {name}</div>
                    <div>Amount: {amount}</div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleCalculate} disabled={debtors.length < 2}>Calculate</button>
    </div>

  )
}

export default DebtorsList

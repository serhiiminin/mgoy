import React, { useState } from "react"
import { getTotalAmount, calculatePayments, getAverage } from "../util"

const NAME_INITIAL_VALUE = ""
const AMOUNT_INITIAL_VALUE = 0

const DebtorsList = () => {
  const [debtors, setDebtors] = useState([])
  const [name, setName] = useState(NAME_INITIAL_VALUE)
  const [amount, setAmount] = useState(AMOUNT_INITIAL_VALUE)
  const peopleCount = debtors.length
  const totalAmount = getTotalAmount(debtors)
  const average = getAverage(totalAmount, peopleCount)

  const onSubmit = () => {
    setName(NAME_INITIAL_VALUE)
    setAmount(AMOUNT_INITIAL_VALUE)
    setDebtors(data => [...data, { name, amount }])
  }

  const handleCalculate = () => {
    setDebtors(data => calculatePayments(data.map(({ name, amount }) => ({ name, amount }))))
  }

  return (
    <>
      <input
        type="text"
        value={name}
        placeholder='Name'
        onChange={event => setName(event.target.value)}
      />
      <input
        type="number"
        value={amount}
        placeholder='Amount'
        onChange={event => setAmount(parseFloat(event.target.value))}
      />
      <button onClick={onSubmit}>Add user</button>
      <h4>Total amount: {totalAmount}</h4>
      <h4>Average: {average}</h4>
      <ul>
        {debtors.map(({ name, amount, receivers }) => (
          <li key={`${name}${amount}`}>
            <div>Name: {name}</div>
            <div>Amount: {amount}</div>
            {receivers && (
              <>
                <h5>Need to pay to: </h5>
                <ul>
                  {receivers.map(({ name, amount }) => (
                    <li key={`${name}${amount}`}>
                      <div>Name: {name}</div>
                      <div>Amount: {amount}</div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleCalculate} disabled={peopleCount < 2}>Calculate</button>
    </>

  )
}

export default DebtorsList

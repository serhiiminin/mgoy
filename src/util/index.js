const getTotalAmount = data => data.reduce((acc, { amount }) => acc + amount, 0)
const getAverage = (totalAmount, count) => totalAmount / count
const getDifferences = (data, average) =>
  data.map(item => ({ ...item, amount: item.amount - average }))
const sortDataAmountByAsc = data =>
  data.sort(({ amount: a }, { amount: b }) => a - b)
const checkIsNonZeroPresent = data =>
  Boolean(data.find(({ amount }) => amount !== 0))

const getPayments = data => {
  const total = getTotalAmount(data)
  const count = data.length
  const average = getAverage(total, count)

  let diffs = [...sortDataAmountByAsc(getDifferences(data, average))]
  let isNonZeroPresent = checkIsNonZeroPresent(diffs)

  while (isNonZeroPresent) {
    let updatedDiffs = [...diffs]
    const mustPay = { ...updatedDiffs[0] }
    const mustGet = { ...updatedDiffs[count - 1] }
    const mustPayAmountAbs = Math.abs(mustPay.amount)

    if (mustPayAmountAbs >= mustGet.amount) {
      mustPay.receivers = [].concat(mustPay.receivers || [], {
        name: mustGet.name,
        amount: mustGet.amount,
      })
      mustPay.amount = mustPay.amount + mustGet.amount
      mustGet.amount = 0
    }

    if (mustPayAmountAbs < mustGet.amount) {
      mustPay.receivers = [].concat(mustPay.receivers || [], {
        name: mustGet.name,
        amount: mustPayAmountAbs,
      })
      mustPay.amount = 0
      mustGet.amount = mustGet.amount - mustPayAmountAbs
    }

    updatedDiffs = [mustPay, ...updatedDiffs.slice(1, count - 1), mustGet]

    diffs = sortDataAmountByAsc(updatedDiffs)
    isNonZeroPresent = checkIsNonZeroPresent(diffs)
  }

  return diffs
}

export {
  getTotalAmount,
  getAverage,
  getDifferences,
  sortDataAmountByAsc,
  checkIsNonZeroPresent,
  getPayments,
}

const getTotalAmount = data => data.reduce((acc, { amount }) => acc + amount, 0)
const getAverage = (totalAmount, count) => count > 0 ? totalAmount / count : 0
const getDifferences = (data, average) =>
  data.map(item => ({ ...item, diff: item.amount - average }))
const sortDataDiffByAsc = data =>
  data.sort(({ diff: a }, { diff: b }) => a - b)
const checkIsNonZeroPresent = data =>
  Boolean(data.find(({ diff }) => diff !== 0))

const calculatePayments = data => {
  const total = getTotalAmount(data)
  const count = data.length
  const average = getAverage(total, count)

  let diffs = [...sortDataDiffByAsc(getDifferences(data, average))]
  let isNonZeroPresent = checkIsNonZeroPresent(diffs)
  while (isNonZeroPresent) {
    let updatedDiffs = [...diffs]
    const mustPay = { ...updatedDiffs[0] }
    const mustGet = { ...updatedDiffs[count - 1] }
    const mustPayDiffAbs = Math.abs(mustPay.diff)

    if (mustPayDiffAbs >= mustGet.diff) {
      mustPay.receivers = [].concat(mustPay.receivers || [], {
        name: mustGet.name,
        amount: mustGet.diff,
      })
      mustPay.diff = mustPay.diff + mustGet.diff
      mustGet.diff = 0
    }

    if (mustPayDiffAbs < mustGet.diff) {
      mustPay.receivers = [].concat(mustPay.receivers || [], {
        name: mustGet.name,
        amount: mustPayDiffAbs,
      })
      mustPay.diff = 0
      mustGet.diff = mustGet.diff - mustPayDiffAbs
    }

    updatedDiffs = [mustPay, ...updatedDiffs.slice(1, count - 1), mustGet]

    diffs = sortDataDiffByAsc(updatedDiffs)
    isNonZeroPresent = checkIsNonZeroPresent(diffs)
  }

  return diffs
}

export {
  getTotalAmount,
  getAverage,
  getDifferences,
  sortDataDiffByAsc,
  checkIsNonZeroPresent,
  calculatePayments,
}

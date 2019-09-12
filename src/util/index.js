const roundAmount = num => Math.round(num*100)/100;
const getTotalAmount = data => data.reduce((acc, { amount }) => acc + amount, 0)
const getAverage = (totalAmount, count) => count > 0
  ? Math.round(100* totalAmount / count)/100
  : 0
const calculateDiffs = (data, average) =>
  data.map(item => ({ ...item, diff: roundAmount(item.amount - average) }))
const sortDataByDiffAsc = data =>
  data.sort(({ diff: a }, { diff: b }) => a - b)
const checkIsNonZeroDiffPresent = data =>
  Boolean(data.find(({ diff }) => diff !== 0))

const calculatePayments = data => {
  const total = getTotalAmount(data)
  const count = data.length
  const average = getAverage(total, count)
  let diffs = [...sortDataByDiffAsc(calculateDiffs(data, average))]
  let isNonZeroPresent = checkIsNonZeroDiffPresent(diffs)

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

    diffs = sortDataByDiffAsc(updatedDiffs)
    isNonZeroPresent = checkIsNonZeroDiffPresent(diffs)
  }

  return diffs
}

export {
  getTotalAmount,
  getAverage,
  calculateDiffs,
  sortDataByDiffAsc,
  checkIsNonZeroDiffPresent,
  calculatePayments,
}

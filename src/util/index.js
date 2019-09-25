const floorAmount = num => Math.floor(num * 100) / 100
const ceilAmount = num => Math.ceil(num * 100) / 100
const getTotalAmount = data => data.reduce((acc, { amount }) => acc + amount, 0)
const getAverage = (totalAmount, count) =>
  count > 0 ? floorAmount(totalAmount / count) : 0
const calculateDiffs = (data, totalAmount) => {
  const count = data.length
  const average = getAverage(totalAmount, count)
  const diffAverage = ceilAmount(totalAmount - count * average)

  return data.map((item, index) => ({
    ...item,
    diff: floorAmount(
      index === 0 && diffAverage > 0
        ? item.amount - (average + diffAverage)
        : item.amount - average
    ),
  }))
}
const sortDataByDiffAsc = data => data.sort(({ diff: a }, { diff: b }) => a - b)
const checkIsNonZeroDiffPresent = data =>
  Boolean(data.find(({ diff }) => diff !== 0))

const calculatePayments = data => {
  const total = getTotalAmount(data)
  const peopleCount = data.length
  let diffs = [...sortDataByDiffAsc(calculateDiffs(data, total))]
  let isNonZeroPresent = checkIsNonZeroDiffPresent(diffs)

  while (isNonZeroPresent) {
    let updatedDiffs = [...diffs]
    const mustPay = { ...updatedDiffs[0] }
    const mustGet = { ...updatedDiffs[peopleCount - 1] }
    const mustPayDiffAbs = Math.abs(mustPay.diff)

    if (mustPayDiffAbs >= mustGet.diff) {
      mustPay.receivers = [].concat(mustPay.receivers || [], {
        name: mustGet.name,
        amount: mustGet.diff,
      })
      mustPay.diff = floorAmount(mustPay.diff + mustGet.diff)
      mustGet.diff = 0
    }

    if (mustPayDiffAbs < mustGet.diff) {
      mustPay.receivers = [].concat(mustPay.receivers || [], {
        name: mustGet.name,
        amount: mustPayDiffAbs,
      })
      mustPay.diff = 0
      mustGet.diff = ceilAmount(mustGet.diff - mustPayDiffAbs)
    }

    updatedDiffs = [mustPay, ...updatedDiffs.slice(1, peopleCount - 1), mustGet]

    diffs = sortDataByDiffAsc(updatedDiffs)
    isNonZeroPresent = checkIsNonZeroDiffPresent(diffs)
    console.log(JSON.stringify(diffs))
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

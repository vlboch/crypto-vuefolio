export const formatNumber = (num) => {
  return num
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const calcAvgPrice = (arrPirces) => {
  const sum = arrPirces.reduce((acc, curr) => acc + curr[0], 0)
  const cost = arrPirces.reduce((acc, curr) => acc + curr[0] * curr[1], 0)

  console.log(sum, cost)

  return cost / sum
}

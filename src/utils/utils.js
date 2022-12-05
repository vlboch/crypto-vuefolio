export const formatNumber = (num) => {
  return num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

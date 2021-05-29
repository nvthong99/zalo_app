function formatCurrency(n) {
  return `${n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} VND`;
}

export { formatCurrency };

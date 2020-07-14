// Capitalize the first letter of every word
export const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
;

// Format specified number
// E.g.: 27657145 -> 27.657.145
export const formatNumber = (num) => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
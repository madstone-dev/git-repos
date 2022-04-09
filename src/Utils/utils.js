export const numberFormat = (number) => {
  return number
    ? number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    : "";
};

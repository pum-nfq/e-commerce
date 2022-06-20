export default function sumUp(arr) {
  let newArr = [];
  arr.forEach((i) => {
    if (i.sizes !== undefined) {
      const obj = newArr.find((o) => o.sizes.id === i.sizes.id);
      if (obj) {
        if (obj.total + i.total > obj.sizes.quantity) {
          obj.total = obj.sizes.quantity;
        } else {
          obj.total = obj.total + i.total;
        }
      } else {
        newArr.push(i);
      }
    }
  });
  return newArr;
}

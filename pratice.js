var list = [
  { date: "12/1/2011", reading: 3, id: 20055 },
  { date: "13/1/2011", reading: 5, id: 20053 },
  { date: "14/1/2011", reading: 6, id: 45652 },
  { date: "13/1/2011", reading: 5, id: 20051 },
];

function customFilter(list, key, value) {
  const res = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i][key] === value) {
      res.push(list[i]);
    }
  }
  return res;
}
console.log(customFilter(list, "reading", 5));

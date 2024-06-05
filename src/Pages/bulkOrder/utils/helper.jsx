export const quickSort = (list) => {
  if(list.length < 2) return list;
  //Define list divisions (left, right, pivot/end)
  const len = list.length - 1;
  const pivot = list[len];
  const left = []; //less than pivot
  const right = []; //greater than pivot

  for(let i = 0; i < len; i++){
    if(Number(list[i]?.file_row) < Number(pivot?.file_row)){
      left.push(list[i]);
    } else {
      right.push(list[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}
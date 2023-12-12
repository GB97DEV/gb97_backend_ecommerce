export const MiddleWhiteSpace = (text: string) => {
  const middle = Math.floor(text.length / 2);
  
  let leftSpace = middle;
  let rightSpace = middle;
  while (leftSpace >= 0 || rightSpace < text.length) {
    if (text[leftSpace] === ' ') {
      return leftSpace;
    }
    if (text[rightSpace] === ' ') {
      return rightSpace;
    }
    leftSpace--;
    rightSpace++;
  }
  
  return middle;
}
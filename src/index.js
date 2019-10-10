function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  let arr = expr.match(/[-*()+/]|\d+/g);
  let count = 0;
  let brackets = false;
  for(let item of arr) {
    if (item === '(') {
      count += 1;
      brackets = true;
    }
    if (item === ')') {
      count -= 1;
    }
  }
  if (count !== 0) {
    throw Error('ExpressionError: Brackets must be paired');
  }
  while (arr.length !== 1) {
    let openBracket;
    let closeBracket;
    if (brackets) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '(') {
          openBracket = i;
        }
        if (arr[i] === ')') {
          closeBracket = i;
          let expression = arr.slice(openBracket + 1, closeBracket);
          arr.splice(openBracket, expression.length + 2, calculate(expression));
          i = -1;
          if (!arr.includes('(')) {
            brackets = false;
          }
        }
      }
    } else {
      calculate(arr);
    }
  }
  return arr[0];
}

function calculate(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '/') {
      arr.splice(i - 1, 3, arithmetic(arr[i - 1], '/', arr[i + 1]));
      i -= 1;
    }
    if (arr[i] === '*') {
      arr.splice(i - 1, 3, arithmetic(arr[i - 1], '*', arr[i + 1]));
      i -= 1;
    }
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '+') {
      arr.splice(i - 1, 3, arithmetic(arr[i - 1], '+', arr[i + 1]));
      i -= 1;
    }
    if (arr[i] === '-') {
      arr.splice(i - 1, 3, arithmetic(arr[i - 1], '-', arr[i + 1]));
      i -= 1;
    }
  }
  return arr[0];
}

function arithmetic(first, sign, second) {
  switch (sign) {
    case '+':
      return Number(first) + Number(second);
    case '-':
      return Number(first) - Number(second);
    case '*':
      return Number(first) * Number(second);
    case '/':
      if (Number(second) === 0) {
        throw new Error('TypeError: Division by zero.');
      }
      return Number(first) / Number(second);
  }
}

module.exports = {
    expressionCalculator
}
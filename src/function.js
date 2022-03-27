export function isEven(number) {
	return number % 2 === 0;
}

export function fibonacci(n) {
	if (n < 1) {
		return `Enter valid number`;
	}
	let pastNum = 0;
	let currentNum = 1;
    let arr = []
	for (let i = 1; i <= n; i++) {
		const nextNum = pastNum + currentNum;
        arr.push(currentNum)
		// console.log(currentNum);
		pastNum = currentNum;
		currentNum = nextNum;
	}
    return arr.join(', ')
}
export function factorial(n){
	if(n === 0) return 1
  if (n>0){
   	return	n = n * factorial(n-1)
  }else{
  	return
  }
}

// 4
// 1 1 2 3
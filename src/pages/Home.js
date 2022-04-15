export function Home() {
	const x = [1, 3, 4, 56, 8, 9];

	let sum = x.reduce((acc, i) => acc + i, 0);

	function toBinary(number) {
		let binary = "";
		while (number > 0) {
			let mod = number % 2;
			number = parseInt(number / 2);
			binary = mod+binary ;
		}
		// console.log(binary.split("").reverse());
		return binary;
	}
	function toDecimal(number) {
		console.log("num", number);
		let decimal = 0;
		let numbers = number.split("").reverse();
		numbers.forEach((item, index) => {
			decimal += item * Math.pow(2, index);
		});

		return decimal;
	}
    
	return (
		<div>
			{/* Sum <span> {sum}</span> */}
			<p>to binary {toBinary(256)}</p>
			<p>to decimal {toDecimal("10101011")}</p>
		</div>
	);
}

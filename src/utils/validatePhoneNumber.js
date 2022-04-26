export const validatePhoneNumber = (str) => {
	const numbers = str.match(/\d+/g)?.join("") ?? "";
	return numbers.length === 11;
};


// Apply thousands separator by "." and decimals separator by ","
export const thousandsAndDecimalSeparatorFormat = (numberToFormat: number): string => {
	let result = '';
	let sign = '';
	let number = numberToFormat.toString().split('.')[0];
	
	if(number.indexOf('-') != -1)
	{
		let sign = '-';
		number = number.replace('-', '');
	}
	
	//let decimal = (numberToFormat.toString().split('.')[1]) == undefined ? '00' : numberToFormat.toString().split('.')[1];
	let decimal;
	
	if(numberToFormat.toString().split('.')[1] == undefined)
	{
		decimal = '00'
	}
	else if(numberToFormat.toString().split('.')[1].length == 1)
	{
		decimal = numberToFormat.toString().split('.')[1] + '0';
	}
	else
	{
		decimal = numberToFormat.toString().split('.')[1];
	}
		
	while( number.length > 3 )
	{
		 result = '.' + number.substr(number.length - 3) + result;
		 number = number.substring(0, number.length - 3);
	}
	
	result = sign + number + result + ',' + decimal;
	return result;
}
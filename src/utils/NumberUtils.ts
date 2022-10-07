
// Apply thousands separator by "." and decimals separator by ","
export const thousandsAndDecimalSeparatorFormat = (numberToFormat: number): string => {
	let result: string = '';
	let sign: string = '';
	let number:string = numberToFormat.toString().split('.')[0];
	
	if(number.indexOf('-') !== -1)
	{
		sign = '-';
		number = number.replace('-', '');
	}
	
	let decimalString: string;
	
	if(numberToFormat.toString().split('.')[1] == undefined)
	{
		decimalString = '00'
	}
	else if(numberToFormat.toString().split('.')[1].length == 1)
	{
		decimalString = numberToFormat.toString().split('.')[1] + '0';
	}
	else
	{
		decimalString = numberToFormat.toString().split('.')[1];
	}
		
	while( number.length > 3 )
	{
		 result = '.' + number.substr(number.length - 3) + result;
		 number = number.substring(0, number.length - 3);
	}
	
	result = sign + number + result + ',' + decimalString;
	return result;
}
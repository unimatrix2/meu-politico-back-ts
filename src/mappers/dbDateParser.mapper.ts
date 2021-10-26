const dateParser = (date: string, hours: string): Date => {
	const dateHeader = date.split('/');
	const hourHeader = hours.split(':');
	return new Date(
		Number(dateHeader[2]),
		Number(dateHeader[1]),
		Number(dateHeader[0]),
		Number(hourHeader[0]),
		Number(hourHeader[1]),
		Number(hourHeader[2])
		);
}

export default dateParser;
const userCreateErrorMapper = (error: any) => {
	const errorKeys = Object.keys(error.keyValue).map((value: string) => {
		const wordArray = value.split('');	// se concatenar aqui, será o retorno do splice
		wordArray														// e não queremos isso.
			.splice(0, 1, value.split('')[0].toUpperCase());
		// Concatenar o join também atuaria no retorno do splice, e não queremos isso.
		return [...wordArray].join('');
	});
	return errorKeys.join('-');
};

export default userCreateErrorMapper;

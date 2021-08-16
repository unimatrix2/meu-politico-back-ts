const userCreateErrorMapper = (error: any) => {
    let errorKeys = Object.keys(error.keyValue)[0].split('');
    errorKeys[0] = errorKeys[0].toUpperCase();
    return errorKeys.join('');
}

export default userCreateErrorMapper;
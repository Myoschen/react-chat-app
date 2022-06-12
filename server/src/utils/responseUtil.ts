const success = (success: boolean, message: string, data: any)  => {
  return {
    'success': success,
    'message': message,
    'data': data
  }
};

const failure = (success: boolean, message: string, data: any, errorCode: number) => {
  return {
    'success': success,
    'message': message,
    'data': data,
    'error_code': errorCode
  }
};

export default { success, failure };
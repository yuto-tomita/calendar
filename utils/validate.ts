type ErrorMessage = {
  message: string
}

export const requiredValidate = (formValue: string): boolean | ErrorMessage => {
  return formValue.length ? true : { message: '必須項目です' }
}

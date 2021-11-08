export const onPhoneRegexCheck = function (phone: string) {
  const regexPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  return regexPhone.test(phone);
};

export const onEmailRegexCheck = function (email: string) {
  const regexEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  return regexEmail.test(email);
};

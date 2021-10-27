import emailjs from "emailjs-com";

var _ = require("lodash");

const makeValidationNumber = function () {
  let result = "";
  for (let i = 0; i < 8; i++) {
    let num = _.random(10);
    result += num;
  }
  return result;
};

const sendEmail = function (to_email: String, message: String) {
  const user_id = String(process.env.REACT_APP_USER);
  emailjs.init(user_id);
  const service_id = String(process.env.REACT_APP_SERVICE);
  const template_id = String(process.env.REACT_APP_TEMPLATE);
  emailjs
    .send(service_id, template_id, {
      to_email: to_email,
      message: message,
    })
    .then((res: any) => {
      console.log(res);
    })
    .catch((error: any) => {
      alert("There is network error, please try again");
      console.log(error);
    });
};

export { makeValidationNumber, sendEmail };

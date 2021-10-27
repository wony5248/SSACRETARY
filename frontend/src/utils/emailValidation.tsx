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
  const service_id = String(process.env.REACT_APP_SERVICE);
  const template_id = String(process.env.REACT_APP_TEMPLATE);
  emailjs
    .send(service_id, template_id, {
      to_email: to_email,
      message: message,
    })
    .then((res: any) => {
      console.log(res.status);
    })
    .catch((error: any) => {
      alert("There is network error, please try again");
    });
};

export { makeValidationNumber, sendEmail };

// import PasswordWidget from '../components/PasswordWiget'
interface validateParams {
  pass1: string;
  pass2: string;
}
interface errorParmas {
  [propName: string]: any;
}
export default {
  name: "Demo",
  schema: {
    type: "object",
    properties: {
      pass1: {
        type: "string",
        // minLength: 10,
        test: true,
        title: "password",
      },
      pass2: {
        type: "string",
        minLength: 10,
        title: "re try password",
      },
      color: {
        type: "string",
        format: "color",
        title: "Input Color",
      },
    },
  },
  async customValidate(
    data: validateParams,
    errors: errorParmas
  ): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.pass1 !== data.pass2) {
          errors.pass2.addError("密码必须相同");
        }
        resolve(true);
      }, 2000);
    });
  },
  uiSchema: {
    properties: {
      pass1: {
        widget: "PasswordWidget",
      },
      pass2: {
        color: "red",
      },
    },
  },
  default: 1,
};

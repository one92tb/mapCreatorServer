const path = require('path');

const decode = jest.genMockFromModule("jwt-decode");

decode.mockReturnValue = {
  exp: new Date().getTime() / 1000 - 1,
  iat: 1575751766,
  userData: { isAdmin: true, login: "one92tb", userId: 1 }
};

export default decode;

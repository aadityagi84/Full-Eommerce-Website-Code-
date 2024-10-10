const bcrypt = require("bcrypt");

const hashPass = async (password) => {
  try {
    const saltsRounds = 10;

    const hashPassword = await bcrypt.hash(password, saltsRounds);
    return hashPassword;
  } catch (error) {
    console.log(`hass-pass-wrd ${error}`.bgBlue.white);
  }
};

const comparePassword = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
module.exports = { hashPass, comparePassword };

const fs = require('fs');

let path = `${__dirname}/.env.${process.env.NODE_ENV}`;

if (fs.existsSync(path) === false) {
  path = `${__dirname}/.env`;
}

module.exports = () => {
  require('dotenv').config({
    // debug: process.env.APP_DEBUG || false,
    path,
  });
};

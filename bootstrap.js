const path = require('path');
const fs = require('fs');

let envPath = path.resolve(__dirname, `.env.${process.env.NODE_ENV}`);

if (fs.existsSync(envPath) === false) {
  envPath = path.resolve(__dirname, '.env');
}

module.exports = () => {
  require('dotenv').config({
    // debug: process.env.APP_DEBUG || false,
    path: envPath
  });
};

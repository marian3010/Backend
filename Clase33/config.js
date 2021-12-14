const dotenv = require('dotenv').config();

module.exports = {
    MODE_ENV: process.env.MODE_ENV || 'development',
    PORT: process.env.PORT || 3000
}
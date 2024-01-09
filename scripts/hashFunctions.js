const crypto = require('crypto');


//Funcion para formatear el parametro 'email'
const hashEmail = (value) => crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');

//Funcion para formatear el parametro 'phone'
const hashPhone = (value) => crypto.createHash('sha256').update(value.replace(/[^0-9]/g, '').replace(/^0+/, '')).digest('hex');

//Funcion para formatear el parametro 'name'
const hashName = (value) => crypto.createHash('sha256').update(value.toLowerCase().replace(/[^\w]+/g, ''), 'utf8').digest('hex');

//Funcion para formatear el parametro 'country'
const hashCountry = (value) => crypto.createHash('sha256').update(value.toLowerCase()).digest('hex');

//Funcion para formatear el parametro 'zip code'
const hashPostalCode = (value) => crypto.createHash('sha256').update(value.replace(/\s|-/g, '').toLowerCase().substring(0, 5)).digest('hex');

//Funcion para formatear el parametro 'gender'
const hashGender = (value) => crypto.createHash('sha256').update(value.charAt(0).toLowerCase()).digest('hex');

//Funcion para formatear el parametro 'Price'
const formatPrice = (value) => {
  let currencyCode = '';
  if (value.includes('$')) {
    currencyCode = 'USD';
  } else if (value.includes('€')) {
    currencyCode = 'EUR';
  } else {
    return { amount: null, currency: null };
  }
  const numericValue = parseFloat(value.replace(/[^0-9.,]/g, ''));

  if (!isNaN(numericValue)) {
    return { amount: numericValue.toFixed(2), currency: currencyCode };
  } else {
    return { amount: null, currency: null };
  }
};

//Funcion para formatear el parametro 'Checkout_time'
const formatDate = (value) => {
  const dateObject = new Date(value);
  return Math.floor(dateObject.getTime() / 1000).toString();
};

module.exports = { hashEmail, hashPhone, hashName, hashPostalCode, hashCountry, hashGender, formatPrice, formatDate };


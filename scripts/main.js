const axios = require('axios');
const dotenv = require('dotenv').config();

const { hashEmail, hashPhone, hashName, hashPostalCode, hashCountry, hashGender, formatPrice, formatDate } = require('./hashFunctions');

//Datos requeridos alojados con variables de entorno
const csvURL = process.env.CSV_URL;
const API_VERSION = process.env.FACEBOOK_API_VERSION;
const PIXEL_ID = process.env.PIXEL_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

//Obtencion y preparacion del CSV
axios.get(csvURL)
    .then((response) => {
        let csvData = response.data;
        const cleanCSV = csvData.replace(/,(?=[^,]*$)/gm, (match, offset, input) => (offset < input.indexOf('\n') ? ',' : '.'));
        const lines = cleanCSV.split('\n');
        const header = lines[0].split(',').map(field => field.trim());

        let payload = {
            "data": []
        };

        for (let i = 1; i < lines.length; i++) {
            let fields = lines[i].split(',');
            
            const emailIndex = header.indexOf('email');
            const phoneIndex = header.indexOf('phone');
            const madidIndex = header.indexOf('madid');
            const nameIndex = header.indexOf('Name');
            const zipCodeIndex = header.indexOf('zip code');
            const countryIndex = header.indexOf('country');
            const genderIndex = header.indexOf('gender');
            const actionIndex = header.indexOf('action');
            const checkoutTimeIndex = header.indexOf('Checkout_time');
            const priceIndex = header.indexOf('Price');

            const eventData = {
                "event_name": "Purchase", 
                "event_time":  Math.floor(Date.now() / 1000),
                "action_source": "physical_store",
                "user_data": {
                    "em": fields.slice(emailIndex, emailIndex + 3).map(email => hashEmail(email)),
                    "ph": hashPhone(fields[phoneIndex]),
                    "fn": hashName(fields[nameIndex]),
                    "zp": hashPostalCode(fields[zipCodeIndex]),
                    "country": hashCountry(fields[countryIndex]),
                    "ge": hashGender(fields[genderIndex]),
                    "madid": fields[madidIndex]
                },
                "custom_data": {
                    "action": fields[actionIndex],
                    "Checkout_time": formatDate(fields[checkoutTimeIndex]),
                    "value": formatPrice(fields[priceIndex]).amount,
                    "currency": formatPrice(fields[priceIndex]).currency,
                }
            };

            payload.data.push(eventData);
        }
        // payload
        console.log(JSON.stringify(payload, null, 2));
        

        const facebookApiUrl = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
        
        // Enviar eventos a Facebook
        axios.post(facebookApiUrl, payload)
            .then((response) => {
                if (response.status === 200) {
                    console.log('Código 200. La solicitud fue exitosa. Respuesta de Facebook:', response.data);
                } else {
                    console.log('La solicitud fue exitosa, pero la respuesta no fue un código 200. Respuesta de Facebook:', response.data);
                }
            })
            .catch((error) => {
                console.error('Error al enviar eventos a Facebook:', error);
            });
    })
    .catch((error) => {
        console.error(`Error al leer el archivo CSV: ${error}`);
    });
// const fetch = require('node-fetch') ;

import axios from "axios";

type QuoteCall = {
    message: string,
}

export const apiCaller = async () => {
    const response = await axios('https://techy-api.vercel.app/api/json')
    const quote = await response.data;
    return quote;
}
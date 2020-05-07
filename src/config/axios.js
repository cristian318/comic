import axios from 'axios'

const clientAxios = axios.create({
    baseURL: 'https://xkcd.com/',
    headers: {
        "Accept": "application/json, text/plain",
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers" : '*'
    }
})

export default clientAxios

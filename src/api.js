import axios from 'axios'
//const server='localhost:8080'
const server=''
export const login = function (data,cb) {
    console.log(data)
    const {nickName,password}=data
    axios.post(`${server}/login`,{
        "nickName": nickName,
        "password": password
    })
        .then(function (response) {
            cb(response)
        })
        .catch(function (error) {
            cb(error)
        });
}
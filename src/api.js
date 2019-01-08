import axios from 'axios'
//const server='localhost:8080'
const server = ''
export const login = function (data, cb) {
    const { nickName, password } = data
    axios.post(`${server}/login`, {
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

export const getUserProfile = function (cb) {
    axios.get(`${server}/user/profile`)
        .then(function (response) {
            cb(response)
        })
        .catch(function (error) {
            cb(error)
        });
}

export const updateUserProfile = function (data, cb) {
    axios.post(`${server}/user/update`, data)
        .then(function (response) {
            cb(response)
        })
        .catch(function (error) {
            cb(error)
        });
}
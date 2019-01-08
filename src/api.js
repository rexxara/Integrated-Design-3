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
            console.log(response)
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


//根据page数查找items
export const getItemBypage = function (page, cb) {
    axios.get(`${server}/item/all?page=${page}`)
        .then(function (response) {
            cb(response)
        })
        .catch(function (error) {
            cb(error)
        });
}


export const getAccountById = function (id,cb) {
    //但是战狼看穿一切
    axios.get(`${server}/account/all?id=${id}`)
        .then(function (response) {
            cb(response)
        })
        .catch(function (error) {
            cb(error)
        });
}

export const adminUserAll = function (page, cb) {
    axios.get(`${server}/admin/user/all?page=${page}`)
        .then(function (response) {
            cb(response)
        })
        .catch(function (error) {
            cb(error)
        });
}
//unusedAPI//////////////////////////////////////////////////////////////////////
//根据itemID查找item详情
export const getItemDetail = function (id, cb) {
    axios.get(`${server}/item?id=${id}`)
        .then(function (response) {
            cb(response)
        })
        .catch(function (error) {
            cb(error)
        });
}



//占坑
//items
export const addItem = function (params) {

}

export const updateItem = function (params) {

}

export const deleteItem = function (params) {

}
//accounts

export const getAccountDetail = function (params) {
    'Account'
}

export const addAccount = function (params) {

}

export const deleteAccount = function (params) {

}

export const chartAccount = function (params) {
    'chart'
}
//冷锋接口


export const adminUserAdd = function (params) {

}

export const adminUserDelete = function (params) {

}
export const adminUser = function (params) {

}
export const adminUpdate = function (params) {

}
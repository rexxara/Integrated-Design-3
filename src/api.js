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


export const getAccountById = function (id, cb) {
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


export const adminUserDelete = function (id, cb) {
    axios.delete(`${server}/admin/user/delete?id=${id}`)
        .then(function (response) {
            cb(response)
        })
        .catch(function (error) {
            cb(error)
        });
}

export const adminUserAdd = function (data, cb) {
    axios.post(`${server}/admin/user/add`, data)
        .then(function (response) {
            cb(response)
        })
        .catch(function (error) {
            cb(error)
        });
}
export const adminUser = function (id, cb) {
    axios.get(`${server}/admin/user?id=${id}`)
        .then(function (response) {
            cb(response)
        })
        .catch(function (error) {
            cb(error)
        });
}
export const adminUpdate = function (data, cb) {
    axios.post(`${server}/admin/user/update`, data)
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
}//有个几把用啊这个接口你妈的list里不久有全部的detail了吗干嘛还要这玩意卧槽

export const addItem = function (data, cb) {
    axios.post(`${server}/item/add`, data)
        .then(function (response) {
            cb(response)
        })
        .catch(function (error) {
            cb(error)
        });
}

export const updateItem = function (data, cb) {
    axios.post(`${server}/item/update`, data)
        .then(function (response) {
            cb(response)
        })
        .catch(function (error) {
            cb(error)
        });
}

export const deleteItem = function (id, cb) {
    axios.delete(`${server}/item/delete?id=${id}`)
        .then(function (response) {
            cb(response)
        })
        .catch(function (error) {
            cb(error)
        });
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


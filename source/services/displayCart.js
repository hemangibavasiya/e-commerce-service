const comCon = require('../constants/comCon'),
dbCon = require('../constants/dbCon')
const {errorGanerator} = require('../common/errorHandlar'),
status  = require('http-status')
const { getData } = require('../repository/commonRepo'),
_ = require('lodash')


const fetchData = (userCode) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cartData = await getData({'user_id': userCode}, {_id:false, product_id: true, quantity: true}, dbCon.COLLECTION_CART)
            if(_.size(cartData) === 0) return reject(errorGanerator(status.NO_CONTENT, comCon.MSG_NO_CONTENT))
            const finalResponse = []
            for(product of cartData) {
                const resjson = {}
                const response = await getData({'id': product.product_id}, {_id:false}, dbCon.COLLECTION_PRODUCT)
                resjson[dbCon.FIELD_NAME] = response[0][dbCon.FIELD_NAME]
                resjson[dbCon.FIELD_DESCRIPTION] = response[0][dbCon.FIELD_DESCRIPTION]
                resjson[dbCon.FIELD_PRICE] = response[0][dbCon.FIELD_PRICE]
                resjson[dbCon.FIELD_QUANTITY] = product.quantity
                finalResponse.push(resjson)
            }
            
            return resolve(finalResponse)
        } catch (error) {
            return reject(error)
        }
    })
}

module.exports = {
    fetchData
}
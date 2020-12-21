const {
    addCartBodyValidation
} = require('../common/validation')
const {
    errorGanerator
} = require('../common/errorHandlar')
const {
    saveData,
    updateData,
    getData
} = require('../repository/commonRepo')
const status = require('http-status')
const dbCon = require('../constants/dbCon')
const _ = require('lodash')

const addCartData = (body, userCode) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                error
            } = addCartBodyValidation(body)
            if (error) return reject(errorGanerator(status.BAD_REQUEST, error.details[0].message))

            const productAvailability = await getData({
                'product_id': body.product_id,
                'user_id': userCode
            }, {}, dbCon.COLLECTION_CART)
            if (productAvailability && _.size(productAvailability) !== 0) {
                const query = {}
                query[dbCon.FIELD_PRODUCT_ID] = body.product_id
                query[dbCon.FIELD_USER_ID] = userCode
                const data = {}
                data[dbCon.FIELD_QUANTITY] = body.quantity
                const updatedData = await updateData(query, data, dbCon.COLLECTION_CART)
                return resolve(updatedData)
            } else {
                const insertJSon = {}
                insertJSon[dbCon.FIELD_PRODUCT_ID] = body.product_id
                insertJSon[dbCon.FIELD_QUANTITY] = body.quantity
                insertJSon[dbCon.FIELD_USER_ID] = userCode
                const insertData = await saveData(insertJSon, dbCon.COLLECTION_CART)
                return resolve(insertData)
            }
        } catch (error) {
            return reject(error)
        }
    })
}

module.exports = {
    addCartData
}
const router = require('express').Router();
const comCon = require('../constants/comCon');
const status  = require('http-status')
const {addCartData} = require('../services/addCart')
const {fetchData} = require('../services/displayCart')

router.post('/add', async(req,res) => {
    try {
        const body = req.body
        const userCode = req.headers[comCon.FIELD_USER_CODE]
        const response = await addCartData(body, userCode)
        res.status(status.OK).send(response)
    } catch (error) {
        if (error.status) res.status(error.status).send({"error_message": error.message})
        res.status(status.INTERNAL_SERVER_ERROR).send({"error_message": error})
    }
})

router.get('/display', async(req, res) => {
    try {
        const userCode = req.headers[comCon.FIELD_USER_CODE]
        const response = await fetchData(userCode)
        res.status(status.OK).send(response)
    } catch (error) {
        if (error.status) res.status(error.status).send({"error_message": error.message})
        res.status(status.INTERNAL_SERVER_ERROR).send({"error_message": error})
    }
})


module.exports = router
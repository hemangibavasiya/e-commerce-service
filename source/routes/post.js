const router = require('express').Router();
const comCon = require('../constants/comCon');
const { fetchData } = require('../services/display'),
status  = require('http-status')
const { addProductData } = require('../services/addProduct')
const multer = require('multer')
const _ = require('lodash')
const AllowedType = ['image/png', 'image/jepg', 'image/jpg']

const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})
const FileFilter = (req, file, cb) => {
    if(_.includes(AllowedType, file.mimetype)) {
        cb(null, true)
    } else{
        cb(null, false)
    }
}

const upload = multer({
    storage: Storage,
    fileFilter: FileFilter
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

router.post('/add/product', upload.single('productImage'), async(req,res) => {
    try {
        const userCode = req.headers[comCon.FIELD_USER_CODE]
        const body = req.body
        const productImage = req.file.path
        const response = await addProductData(userCode, body, productImage)
        res.status(status.OK).send(response)
    } catch (error) {
        if (error.status) res.status(error.status).send({"error_message": error.message})
        res.status(status.INTERNAL_SERVER_ERROR).send({"error_message": error})
    }
})
module.exports = router
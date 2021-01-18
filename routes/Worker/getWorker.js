require('rooty')()
const Worker = require('^/database/models/Worker')


module.exports = async (req, res, next) => {
    try{
        const {id} = req.params
        const worker = await Worker.findWorkerById(id)

        if(!worker){
            return res.status(404).json({
                msg: "Can't find worker!"
            })
        }

        res.json({
            worker
        })
    }catch (e) {
        console.log(e)
        next(e)
    }
}
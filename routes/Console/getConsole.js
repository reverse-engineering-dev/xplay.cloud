require('rooty')()
const Xbox = require('^/database/models/Xbox')


//TODO - select form db only specified fields in request
module.exports = async (req, res, next) => {
    try{
        const {id} = req.params

        const xbox = await Xbox.findConsoleById(id)

        if(xbox){
            return res.json({
                xbox
            })
        }

        res.status(404).json({
            msg: "Can't find xbox!"
        })
    }catch (e) {
        
    }
}
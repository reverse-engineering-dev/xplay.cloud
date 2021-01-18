require('rooty')()

module.exports = async (req, res, next) => {
    try{
        const user = req.user
        const {playtime} = req.body

        if(!user){
            res.status(400).json({
                msg: 'Invalid user'
            })
        }
        user.playTime = playtime
        await user.save()
    }catch (e) {
        next(e)
    }finally {
        res.end()
    }
}
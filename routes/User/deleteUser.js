require('rooty')()

module.exports = async (req, res, next) => {
    try{
        const user = req.user

        if(!user){
            return res.status(400).json({
                msg: 'Unavailable user!'
            })
        }

        const deletedUser = await user.deleteUser()

        res.status(204).json({
            msg: `User ${user.nickname} was deleted`,
            deletedUser
        })
    }catch (e) {
        res.status(400).json({
            'succes': false
        })
    }finally {
        await req.user.save()
    }
}
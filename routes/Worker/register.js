require('rooty')()
const Worker = require('^/database/models/Worker')


module.exports = async (req, res, next) => {
    try {
        const {username, password, email} = req.body

        if (await Worker.findWorkerByUsername(username)) {
            return res.status(409).json({
                msg: 'This username is already used!'
            })
        }

        const workerInfo = {
            username,
            email,
            password: Worker.hashPassword(password),
            ip: req.ip
        }

        const worker = new Worker(workerInfo)

        if (!worker) {
            return res.status(400).json({
                msg: 'Something went wrong, try again!'
            })
        }

        await worker.save()

        res.status(201).json({
            worker,
            msg: `Worker ${worker.username} was created!`
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}
require('rooty')()
const Player = require('^/database/models/Player')

module.exports = async (req, res, next) => {
	try {
		//req.user - data from authorization middleware
		const {password, newPassword, confirmPassword} = req.body

		if(newPassword !== confirmPassword) {
			return res.status(409).json({
				msg: "New password and confirmation doesn't match!"
			})
		}

		const player = await Player.findOne({_id: "5f6b2f221f20f429e4dc1de7"})

		if(!player) {
			return res.status(400).json({
				msg: 'Error, try again'
			})
		}

		if(!player.comparePasswords(password)) {
			return res.status(401).json({
				msg: 'Error on login, try again'
			})
		}

		player.changePassword(newPassword)
		await player.save()

		res.json({
			msg: 'Succes'
		})
	} catch(e) {
		next(e)
	}
}
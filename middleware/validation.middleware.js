const {validationResult} = require('express-validator')

const formatError = ({ location, msg, param, value}) => {
	//TODO - format errors to be more informative
	return msg
}

module.exports = async (req, res, next) => {
	console.log(validationResult(req).array())
	const errors = validationResult(req).formatWith(formatError).array()

	if(!errors.length) {
		return next()
	}

	res.status(409).json({
		errors,
		msg: 'Huston, we have a problem :('
	})
}
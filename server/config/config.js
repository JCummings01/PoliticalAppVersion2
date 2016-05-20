var config = {
	codes: {
		error: {
			notAuthorized: 403,
			couldNotFindUser: 404,
			missingUrlParameters: 427,
			emailNotValid: 428,
			userIdMissing: 429,
			passwordMissing: 430,
			badPasswordOrEmail: 431,
			general: 500,
			emailInUse: 512
		},
		success: {
			created: 201
		}
	},
	keys: {
		// appId: '',
		// api: '',
		// master: ''
	}
};

module.exports = config;

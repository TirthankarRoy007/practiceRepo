const { UnauthorisedError } = require('../errors');

class Authorisation {
	constructor(user, roles) {
		this.user = user;
		this.roles = roles;
	}

	isAllowed() {
		return new Promise(async (resolve, reject) => {
			try {
				if (this.roles.includes(this.user.role)) {
					resolve();
				} else {
					reject(new UnauthorisedError());
				}
			} catch (err) {
				console.error(err);
				reject(err);
			}
		});
	}
}

module.exports = Authorisation;
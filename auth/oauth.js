var ids = {
	facebook:{
		clientID:process.env.clientIDFB,
		clientSecret:process.env.clientSecretFB,
		callbackURL:'http://localhost:3000/auth/facebook/callback'
	},
	google:{
		clientID:process.env.clientIDGoogle,
		clientSecret:process.env.clientSecretGoogle,
		callbackURL:'http://localhost:3000/auth/google/callback'		
	},
	twitter: {
	    consumerKey: process.env.consumerKey,
	    consumerSecret:process.env.consumerSecret,
	    callbackURL: "http://localhost:3000/auth/twitter/callback"
	  }
}

module.exports = ids;
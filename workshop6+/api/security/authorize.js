function authorize(opts){
	var that = this;
	that.userInfo = {};
	that.sessionTimeout = 3600000;
	//console.log(opts);

	var Promise = require('bluebird');
	var _ = require('underscore');

	that.login =function(userInfo,callback){
		//Is valid user and password ?
		//Is Exist session
			//Y: Update Session
			//N: Register new session

		if(userInfo.userName)
			that.userInfo.userName = userInfo.userName;
		if(userInfo.password)
			that.userInfo.password = userInfo.password;
		if(!that.userInfo.userName || !that.userInfo.password)
			throw that.getMessage(523);

			that.isValidUser()
			.then(that.isExistSession)
			.then(that.updateSession)
			.then(that.registerSession)
			.then(function(){
				//console.log('result then ',that.result);
				callback(that.result);
			});
	}

	that.logout =function(sessionID,callback){
		that.removeSession()
				.then(function(deleted){
					console.log('deleted',deleted);
						if(deleted) {
							that.result =that.getMessage(200);
							that.result.message ="Logout successfully";

						}

						callback(that.result);
					})
					.catch(function(result){
						that.result= that.getMessage(528);
						callback(that.result);
					});


	}

	that.isValidUser=function(){
		var deferred = Promise.pending();
		var isValid = false;
		var user = that.users.find({name:that.userInfo.userName});

		if(user.length >0){
			if(user[0].password == that.userInfo.password)
				isValid = true;
			else
				isValid = false;
		}

		if(!isValid)
			that.result =that.getMessage(523);

		deferred.resolve(isValid);
		return deferred.promise;
		//return isValid;
	}

	that.isExistSession =function(isValid){
		//console.log('Valid',isValid);
		var deferred = Promise.pending();
		var user = that.logonList.find({sessionID:that.userInfo.sessionID});
		if(user.length>0)
			deferred.resolve(true);
		else
			deferred.resolve(false);
		return deferred.promise;
	}

	that.removeSession =function(){
		var deferred = Promise.pending();
		var total =that.logonList.data.length;

	  	var del =that.logonList.removeWhere({sessionID:that.userInfo.sessionID});
	  	//console.log('total',total);
	  	//console.log('logonList Length',that.logonList.data.length);

  	//console.log(that.logonList.data.length);
	  	var deleted =total - that.logonList.data.length;
	  //	console.log('deleted',deleted , ' total ',total);

		if(that.logonList.data.length <total || deleted ==0)
		  deferred.resolve(true);
		else
		  deferred.resolve(false);

		return deferred.promise;

	}

	that.updateSession = function(isExist){
		var deferred = Promise.pending();
		var now = new Date();
		var expiredAt = new Date(now.getTime() + that.sessionTimeout);
		//that.userInfo.expiredAt = expiredAt;
		if(isExist){
			var user = that.logonList.findOne({sessionID:that.userInfo.sessionID});
			user.expiredAt = expiredAt;
			that.logonList.update(user);
			that.result = that.getMessage(200);
			that.result.result = user;
			deferred.resolve(true);
		}
		else
			deferred.resolve(false);
		return deferred.promise;
	}

	that.registerSession=function(isExist){
		var deferred = Promise.pending();
		console.log('Exist',isExist);
		if(isExist){
			//that.result = that.getMessage(527);
			deferred.resolve(that.result);
			return deferred.promise;
		}

		var now = new Date();
		var expiredAt = new Date(now.getTime() + that.sessionTimeout);

		that.userInfo.expiredAt = expiredAt;
		var logon =_.clone(that.userInfo);
		var total = that.logonList.data.length;
		that.logonList.insert(logon);
		if(total < that.logonList.data.length){
			that.result = that.getMessage(200);
			that.result.result = logon;
		}
		else
			that.result = that.getMessage(527);

		deferred.resolve(that.result);
		return deferred.promise;
	}
	that.initConfig=function(opts){

		if(opts.logonList)
			that.logonList = opts.logonList;
		if(!that.logonList)
			throw that.getMessage(524);
		if(opts.sessionID)
			that.userInfo.sessionID =opts.sessionID;
		if(!that.userInfo.sessionID)
			throw that.getMessage(525);
		if(opts.users)
			that.users = opts.users;
		if(!that.users)
			throw that.getMessage(526);
		if(opts.ip)
			that.userInfo.ip = opts.ip;
	}
	that.getMessage = function(code){
		switch(code){
			case 200:
			return {code:code,status:"completed",message:"Login successfully."};
			case 523:
			return {code:code,status:"error",message:"Invalid User!"};
			case 524:
			return {code:code,status:"error",message:"Invalid Logon!"};
			case 525:
			return {code:code,status:'error',message:"No Session!"};
			case 526:
			return {code:code,status:'error',message:"Empty Users!"};
			case 527:
			return {code:code,status:'error',message:"Can't Login!"};
			case 528:
			return {code:code,status:'error',message:"Can't Logout!"};
		}
	}

	that.initConfig(opts);
}


module.exports = authorize;

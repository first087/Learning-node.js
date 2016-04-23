function docManager(){
	this.getModules = function(path,callback){
		var dirTree = require('directory-tree');
		var tree = dirTree.directoryTree(path[0]);
		callback(tree);
	}
	this.readDoc = function(file,callback){
console.log(file);
		var fs = require('fs'),
		    xml2js = require('xml2js');

		var parser = new xml2js.Parser();
		fs.readFile(file.path, function(err, data) {
		    parser.parseString(data, function (err, result) {
		        //console.dir(JSON.stringify(result));
		        //console.log('Done');
						callback(result);
		    });
		});
	}
}

//var doc = new docManager();
//doc.getModules();

module.exports = docManager;

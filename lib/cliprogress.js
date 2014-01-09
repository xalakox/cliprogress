if (typeof module === "object") module.exports = cliprogress;

cliProgress.prototype.start = function(){
	this.startTime = process.hrtime();
	console.log(" ----> "+this.settings.name + " <----");
};
 
cliProgress.prototype.end = function(){
	var difTime = process.hrtime(this.startTime);
	if (this.i>0){
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
	}
	console.log(' <---- %s took %d seconds and %d nanoseconds ---->', this.settings.name, difTime[0],difTime[1]);
	return difTime;
};

cliProgress.prototype.progress = function(msg){
	if (!this.settings.hideProgress){
		process.stdout.clearLine();  // clear current text
		process.stdout.cursorTo(0);  // move
		process.stdout.write(this.stat.charAt(this.i % this.limitI)+" "+msg);
		this.i++;
		return true;
	}
}; 

function cliProgress(settings) {
	//First parameter is the name, second one is if it should start now.
	this.settings = settings;
	this.stat = "▉▊▋▌▍▎▏▎▍▌▋▊▉";
	this.limitI = this.stat.length;
	this.i = 0;
	this.startTime = null;
	if (settings.auto){
		this.start();
	}
	
}
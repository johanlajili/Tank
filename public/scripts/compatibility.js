try { console.log('test'); } catch (e) { console = { log: function () { } } }

var Debug = {
	
	log : function(str) {
		
		console.log(str);
	}
}


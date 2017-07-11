define([
	'jquery'
	,'handlebars'
	,'boardApi'
], function($,handlebars, data){
	var bindTable = (function(){
		var wrapper;
		var bindTarget;

		function init(options){
			wrapper = $(options.wrapper);
			bindTarget=$(options.bindTarget);

			getData();
		}

		function getData(){
			var dummyDom = wrapper.html();
			var template= handlebars.compile(dummyDom);
			var dataItem="";

			for(var i in data.getApiData()){
				dataItem += template( data.getApiData()[i]);
			}

			var makeDom=( function(){
				bindTarget.append(dataItem);
			}());
		}
		return{
			init: init
		}
	})();
	return bindTable;
})

requirejs.config({
    baseUrl: '/',
    paths:{
    'jquery': 'lib/jquery-1.9.1.min',
    'cssLoader' : 'lib/css.min',
    'handlebars' : 'lib/handlebars-v4.0.5',
    'text' : 'lib/text',

    //Controller
    'index' : 'controller/index',
    'index2' : 'controller/index2',
    'Board' : 'controller/Board',
    'Handlebar' : 'controller/Handlebar',

	//Function Module
    'Device' : 'constant/Device',
	'responsive' : 'module/responsive',
	'selectBox' : 'module/selectBox',
    'tab':'module/tab',
    'table':'module/table',

    //APi
    'boardApi' : 'api/boardApi'
    },
    shim:{
        'jquery':{
            exports:'$'
        },
		'jqueryUI':{
			deps: ['jquery'],
			exports :'jqueryUI'
		},
		'jqueryEasing':{
			deps: ['jquery'],
			exports :'jqueryEasing'
		}
    },
    map: {
      '*': {
        'css': 'lib/css.min',
        'text': 'lib/text'
      }
  }
});

define([],function () {
    var BODY = document.body || document.documentElement;
    var TEMP = BODY.getAttribute("data-reference");
    require([TEMP]);
});

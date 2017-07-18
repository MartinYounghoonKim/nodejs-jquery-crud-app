define([], function(){
    requirejs([
        "jquery",
        "text!module/crudBoard.html",
        "css!module/crudBoard",
        "crudBoard"
    ], function($,text, style, crudBoard) {
        $('document,body').append(text);
        crudBoard.init({
            "wrapper" : "#getDataContents",
            "bindTarget" : "[data-bind='wrap']",
            "bindButton" : "[data-module-button='submit']"
        });
    });
})

define([], function(){
    requirejs([
        "jquery",
        "text!module/table.html",
        "css!module/table",
        "table"
    ], function($,text, table, bindTable) {
        $('document,body').append(text);
        bindTable.init({
            "wrapper" : "#getDataContents",
            "bindTarget" : "[data-bind='wrap']"
        });
    });

})

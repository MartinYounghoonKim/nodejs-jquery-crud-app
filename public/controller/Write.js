requirejs([], function(){
    requirejs([
        "jquery",
        "text!module/write.html",
        "css!module/write",
        "table"
    ], function($,text, table, bindTable) {
        $('document,body').append(text);
    });
    requirejs([
        "write"
    ], function(write){
        write({
            "dataIdx" : "#idx",
            "dataCreatorId" : "#creator_id",
            "dataTitle" : "#title",
            "dataIdx" : "#idx",
            "dataIdx" : "#idx",
        });
    })
})

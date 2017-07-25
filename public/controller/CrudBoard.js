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
            "bindButton" : "[data-module-button='submit']",
            "editingLayerPop" : "#editUserDataPopUp",
            "layerPopUp" : "[data-bind-target='editUserData']",
            "layerPopCtrl" : "[data-layer-ctrl='wrap']",
            "layerPopUpCancelButton" : "[data-layer-ctrl='cancel']",
            "layerPopUpEditButton" : "[data-layer-ctrl='edit']"
        });
    });
})

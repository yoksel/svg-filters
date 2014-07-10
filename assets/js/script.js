function list() {
    var doc = document;
    var filtersList = listItems.filters;
    var filtersListUser= JSON.parse(JSON.stringify(filtersList));// clone object
    var listElem = doc.querySelector(".list-filters");
    var svgDefsElem = doc.querySelector(".defs--filters");
    var stylesElem = doc.querySelector(".style-changing");
    var textareaElem =doc.querySelector(".code__textarea");
    var propItemClass = "filter-controls__item";
    var propInputClass = "filter-prop-control";

    var filtersCode = {};

    this.fillTemplate = function( templateId, jsonData){
        var template = doc.querySelector(templateId);
        var output = Mustache.render(template.innerHTML, jsonData);
        return output;
    }

    this.fillSvgDefs = function() {
        var finalHTML = "";

        for ( var i = 0; i < filtersList.length; i++){
            var filterItem = filtersList[i];
            filterItem.params.id = filtersList[i].id; // add filter ID to properties
            var filterCode = this.fillTemplate(filterItem.template, filterItem.params);
            filtersCode[filterItem.id] = filterCode; // save code for fither use
            finalHTML += filterCode;
            }

        svgDefsElem.innerHTML += finalHTML;
        // out(filtersCode, "this.fillSvgDefs");
    }

    this.printList = function() {
        var templateId = "#t-list-item";
        var jsonData = listItems;
        listElem.innerHTML = this.fillTemplate(templateId, jsonData);

        this.addLife();
    }

    this.applyFilter = function(filterId){
        stylesElem.innerHTML = ".preview__use { filter: url(#" + filterId + ");border: 1px solid red;}";
    }

    this.printCode = function(filterId){
        textareaElem.value = filtersCode[filterId];
    }

    this.getFilterData = function (filterId) {
        for ( var i = 0; i < filtersList.length; i ++ ){
            if ( filtersList[i].id == filterId ){
                return filtersList[i];
            }
        }
    }

    this.getUserFilterData = function (filterId) {
        for ( var i = 0; i < filtersListUser.length; i ++ ){
            if ( filtersListUser[i].id == filterId ){
                return filtersListUser[i];
            }
        }
    }

    this.paramsToControls = function(params){
        var finalHTML = "";

        var templateId = "#t-text-field";

        for ( var item in params ) {
                var value = params[item];
                if ( typeof( value) == "number" ){
                    var jsonData = {
                        "filterId": params.id,
                        "name": item,
                        "value": value,
                        "inputClass": propInputClass,
                        "itemClass": propItemClass
                        };
                    finalHTML += this.fillTemplate(templateId, jsonData);
                }
        }
        return finalHTML;
    }
    //

    this.addControlsLife = function(){
       var controls = doc.querySelectorAll("." + propInputClass);
       var parent = this;

       var filterElem = doc.querySelector("#blur");
       //filterElem.innerHTML = "";
       out( filterElem, "filterElem");
       var sp1 = doc.createElement("span");
       var parentElem = filterElem.parentNode;

       out(parentElem, "parentElem");

       // filterElem = parentElem.replaceChild(sp1, filterElem);


       for (var i = 0; i < controls.length; i++) {
           controls[i].onchange = function(){
                var filterId = this.getAttribute("data-filter-id");
                var prop = this.getAttribute("data-prop");
                // out(this.getAttribute("data-prop"));
                var params = parent.getUserFilterData(filterId).params;
                params[prop] = this.value;
                out(this.value);
                out(params);
           }
       };
       //out(controls);
    }

    this.printControls = function(filterId, elem){
        var params = this.getFilterData(filterId).params;
        var finalHTML = this.paramsToControls(params);

        // out(finalHTML);

        finalHTML = "<div class=\"filter-controls\" data-filter-id=\"" + filterId + "\">" + finalHTML  + "</div>";

        elem.innerHTML += finalHTML;

        this.addControlsLife();
        // elem.innerHTML += "sdsdf";

        // out(elem, "this.printControls");
    }

    this.addLife = function() {
        var listElem__items = listElem.querySelectorAll(".list-filters__item");
        var parent = this;

        for( var i = 0; i < listElem__items .length; i++ ){
            // out(i);
            var item = listElem__items[i];
            var filterId = item.getAttribute("data-filter-id");
            // out(filterId);
            this.printControls(filterId, item);
        }

        var listElem__titles = listElem.querySelectorAll(".filter-name");

        for( var i = 0; i < listElem__titles .length; i++ ){
            out(i);
            var item = listElem__titles[i];

            item.onclick = function(){
                var parentElem = this.parentNode;
                var filterId = parentElem.getAttribute("data-filter-id");
                parent.applyFilter(filterId);
                parent.printCode(filterId);
            }
        }

    }

    this.init = function() {
        this.fillSvgDefs();
        this.printList();
    }
}

//  Common
// ----------------------------------

function out(str, context) {
    console.log(str);
    if( context ){
        bg = "skyblue";
        color = "#333";

        style = "background: " + bg + ";";
        style +=" color: " + color + ";";

        data = "%c" + context;
        console.log( data, style );
        }
    console.log("----------");
}

var list = new list();
list.init();

// ----------------------------------
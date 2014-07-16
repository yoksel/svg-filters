function list() {
    var doc = document,
          filtersList = listItems.filters,
          filtersListUser = {},
          filtersCode = {},

          listElem = doc.querySelector(".js-list-filters"),
          svgDefsElem = doc.querySelector(".js-defs--filters"),
          stylesElem = doc.querySelector(".js-style-changing"),
          textareaElem =doc.querySelector(".js-code"),

          controlsJs = {
            "listClass": "js-controls",
            "inputClass": "js-control__input",
          },
          controls = {
            "listClass": "filter__controls controls " + controlsJs.listClass,
            "itemClass": "controls__item control",
            "labelClass": "control__label",
            "inputClass": "control__input " + controlsJs.inputClass,
          },

          filterJs = {
            "itemClass": "js-filter"
          },

          filter = {
            "itemClass": "list-filters__item filter " + filterJs.itemClass,
            "currentClass": "filter--current"
          }

    //  Init
    // ----------------------------------

    this.init = function() {
        this.fillSvgDefs();
        this.printList();
    }

    //  Initial Actions
    // ----------------------------------

    this.fillSvgDefs = function() {
        var finalHTML = "";

        for ( var i = 0; i < filtersList.length; i++) {
            var filterItem = filtersList[i];
            filterItem.params.id = filtersList[i].id; // add filter ID to properties
            var filterCode = this.fillTemplate(filterItem.template, filterItem.params);
            filtersCode[filterItem.id] = filterCode; // save code for fither use
            filterCode = "<g id=\"g-" + filterItem.id +"\">" + filterCode + "</g>";
            finalHTML += filterCode;
            }

        filtersListUser= JSON.parse(JSON.stringify(filtersList));// clone object
        svgDefsElem.innerHTML += finalHTML;
        // out(filtersCode, "this.fillSvgDefs");
    }

    this.printList = function() {
        var templateId = "#t-list-item";
        var jsonData = listItems;
        jsonData.itemClass = filter.itemClass;
        listElem.innerHTML = this.fillTemplate(templateId, jsonData);

        this.addLifeToList();
    }

    this.addLifeToList = function() {
        var listElem__items = listElem.querySelectorAll("." +filterJs.itemClass);
        var parent = this;

        for( var i = 0; i < listElem__items .length; i++ ) {
            // out(i);
            var item = listElem__items[i];
            var filterId = item.getAttribute("data-filter-id");
            // out(filterId);
            this.printControls(filterId, item);
        }

        var listElem__titles = listElem.querySelectorAll(".filter__name");

        for( var i = 0; i < listElem__titles .length; i++ ) {
            //out(i);
            var item = listElem__titles[i];

            item.onclick = function() {
                var parentElem = this.parentNode;
                var filterId = parentElem.getAttribute("data-filter-id");
                parent.applyFilter(filterId);
                parent.printCode(filterId);
                parent.showCurrentControls(parentElem);
            }
        }
    }

    //  Print controls
    // ----------------------------------

    this.printControls = function(filterId, elem) {
        var params = this.getFilterData(filterId).params;
        var finalHTML = this.paramsToControls(params);

        // out(finalHTML);

        finalHTML = "<ul class=\"" + controls.listClass +"\" data-filter-id=\"" + filterId + "\">" + finalHTML  + "</ul>";

        elem.innerHTML += finalHTML;

        this.addControlsLife();
        // elem.innerHTML += "sdsdf";

        // out(elem, "this.printControls");
    }

    this.paramsToControls = function(params) {
        var finalHTML = "";

        //out( params );

        for ( var item in params ) {
                // out(item, "ITEM");
                var value = params[item];

                var jsonData = {
                        "filterId": params.id,
                        "name": item,
                        "inputId": params.id + "-" + item,
                        "value": value,
                        "inputClass": controls.inputClass,
                        "labelClass": controls.labelClass,
                        "itemClass": controls.itemClass,
                        "options": [],
                        "elem": params.elem,
                        "container": params.container
                        };

                if ( !isNaN(parseInt(value)) ) {

                    var templateId = "#t-text-field";
                    finalHTML += this.fillTemplate(templateId, jsonData);
                }
                else if( item == "filterUnits") {
                    var templateId = "#t-select";

                    var filterUnits = ["userSpaceOnUse", "objectBoundingBox"];

                    for (var i = 0; i < filterUnits.length; i++) {
                        jsonData["options"][i] = {"value": filterUnits[i]};
                        if( value ==  filterUnits[i] ){
                            jsonData["options"][i] = {"selected": "selected"};
                        }
                    }

                    finalHTML += this.fillTemplate(templateId, jsonData);
                }
                else if( item == "feFuncs") {

                    for (var i = 0; i < value.length; i++) {
                        var name = value[i].name;
                        var jsonList = { name: name };

                        // get inputs from params
                        value[i].id = params.id;
                        value[i].elem = name;
                        value[i].container = item;
                        jsonList.items = this.paramsToControls(value[i]);
                        // get named list
                        finalHTML += this.fillTemplate("#t-named-list", jsonList);
                    }
                }
        }
        return finalHTML;
    }

    this.addControlsLife = function() {
       var controls = doc.querySelectorAll("." + controlsJs.inputClass);
       var parent = this;

       for (var i = 0; i < controls.length; i++) {
           controls[i].onchange = function() {
               parent.changeFilter(this);
           }
       }
    }

    this.changeFilter = function(elem) {
       var attrs = this.getAttrsbyList(elem);
       //out(attrs);

       var filterId = attrs["data-filter-id"];
       var container = attrs["data-container"];
       var elem = attrs["data-elem"];
       var prop = attrs["data-prop"];
       var value = attrs["value"];

       var filterGroup = doc.querySelector("#g-" + filterId);
       var params = this.getUserFilterData(filterId).params;
       if ( container ){
           // params[prop]
       }
       else {
           params[prop] = value;
       }
       out(prop);
       out(params);
       out("-------");
       var template = this.getUserFilterData(filterId).template;
       var filterCode = this.fillTemplate(template, params);

       filterGroup.innerHTML = filterCode;
    }

    //  Filters life
    // ----------------------------------

    this.applyFilter = function(filterId) {
        stylesElem.innerHTML = ".preview__use { filter: url(#" + filterId + ");}";
    }

    this.printCode = function(filterId) {
        textareaElem.value = filtersCode[filterId];
    }

    this.showCurrentControls = function(parentElem) {
        var currentFilterElem = doc.querySelector("." + filter.currentClass);
        if ( currentFilterElem ) {
            currentFilterElem.classList.remove(filter.currentClass);
        }

        parentElem.classList.add("filter--current");
    }

    //  Common
    // ----------------------------------

    this.fillTemplate = function( templateId, jsonData) {
        var template = doc.querySelector(templateId);
        var output = Mustache.render(template.innerHTML, jsonData);
        return output;
    }

    this.getFilterData = function (filterId) {
        for ( var i = 0; i < filtersList.length; i ++ ) {
            if ( filtersList[i].id == filterId ) {
                return filtersList[i];
            }
        }
    }

    this.getUserFilterData = function (filterId) {
        for ( var i = 0; i < filtersListUser.length; i ++ ) {
            if ( filtersListUser[i].id == filterId ) {
                return filtersListUser[i];
            }
        }
    }

    this.getAttrsbyList = function(elem) {
        var map = {};
        var list = ["value",
                        "data-filter-id",
                        "data-elem",
                        "data-container",
                        "data-prop"];
         for (var i = 0; i < list.length; i++) {
             map[list[i]] = elem.getAttribute(list[i]);
         };
         return map;
    }
}

//  Common
// ----------------------------------

function out(str, context) {
    console.log(str);
    if( context ) {
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
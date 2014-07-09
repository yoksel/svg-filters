function list() {
    var doc = document;
    var listElem = doc.querySelector(".list-filters");
    var svgDefsElem = doc.querySelector(".defs--filters");
    var stylesElem = doc.querySelector(".style-changing");

    this.fillTemplate = function( templateId, jsonData){
        var template = doc.querySelector(templateId);
        var output = Mustache.render(template.innerHTML, jsonData);
        return output;
    }

    this.fillSvgDefs = function() {
        var finalHTML = "";
        var filtersList = listItems.filters;

        for ( var i = 0; i < filtersList.length; i++){
            var filterItem = filtersList[i];
            finalHTML +=this.fillTemplate(filterItem.template, filterItem.params);
            }

        svgDefsElem.innerHTML += finalHTML;
        out(svgDefsElem.innerHTML);
    }

    this.print = function() {
        var templateId = "#template--list-item";
        var jsonData = listItems;
        listElem.innerHTML = this.fillTemplate(templateId, jsonData);
        this.addLife();
    }

    this.applyFilter = function(filtrId){
        stylesElem.innerHTML = ".preview__use { filter: url(#" + filtrId + ");border: 1px solid red;}";
    }

    this.addLife = function() {
        var listElem__items = listElem.querySelectorAll(".list-filters__item");

        out(listElem__items);
        var parent = this;

        for( var i = 0; i < listElem__items.length; i++ ){
            listElem__items[i].onclick = function(){
                var filterId = this.getAttribute("data-filter-id");
                parent.applyFilter(filterId);
            }
        }
        out(listElem__items);
    }


    this.init = function() {
        this.fillSvgDefs();
        this.print();
        this.addLife();
    }
}

//  Common
// ----------------------------------

function out(str) {
    console.log(str);
    console.log("----------");
}

var list = new list();
list.init();

// ----------------------------------
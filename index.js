var form = document.querySelector('#defineform');
if (form != null) {
    form.onsubmit = function () {
        var formData = new FormData(form);
        console.log(formData);
        var text = formData.get('defineword');
        var apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/" + text; //URL from API of specific word where JSON objects are returned
        fetch(apiUrl) //fetch JSON objects from the specific URL for the word inputted
            .then(function (response) {
            return response.json(); //repsonse from fetch as JSON object
        })
            .then(function (data) {

            var oldList = document.querySelector('.list-group'); //returns first element that matches the specified selector and save it as oldList
            var listParent = document.createElement('ul'); //creating element in TS for html
            listParent.classList.add('list-group'); //returns a live DOMTokenList collection of the class attributes of the listParent.
            
            var firstList = document.createElement('li');
            firstList.classList.add('list-group-item');
            firstList.textContent = data[0].word;
            listParent.append(firstList);

            for (var i = 0; i < data.length; i++) { //iterate through each of the result sets for any given word by each data object
                for (var j = 0; j < data[i].meanings.length; j++) { //iterating through results within each data object of that word
                    
                    var definitionTitle = document.createElement('li'); //defition title
                    definitionTitle.textContent = 'Definition:';
                    
                    var definitionItemList = document.createElement('ul'); //definition as a list for the word selected
                    definitionTitle.append(definitionItemList);
                    
                    for (var k = 0; k < data[i].meanings[j].definitions.length; k++) { //getting meanings, definitions for each
                        var definitionItem = document.createElement('li');
                        definitionItem.textContent = data[i].meanings[j].definitions[k].definition;
                        definitionItemList.append(definitionItem);
                    }
                    listParent.append(definitionTitle);
                }
            }
            oldList === null || oldList === void 0 ? void 0 : oldList.replaceWith(listParent);
            console.log(data);
        })["catch"](function (error) { return console.log(error); });
        console.log(text);
        return false; // prevent reload
    };
}
;

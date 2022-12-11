const form: HTMLFormElement | null = document.querySelector('#defineform');

if(form != null) { 
  form.onsubmit = () => {
    const formData = new FormData(form);

    console.log(formData);
    const text = formData.get('defineword') as string;
    const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/" + text; //URL from API of specific word where JSON objects are returned
    
    fetch(apiUrl) //fetch JSON objects from the specific URL for the word inputted
    .then((response) => { 
      return response.json() //repsonse from fetch as JSON object
    })
    .then((data) => {
      const oldList = document.querySelector('.list-group'); //returns first element that matches the specified selector and save it as oldList

      const listParent: HTMLUListElement = document.createElement('ul'); //creating element in TS for html
      listParent.classList.add('list-group'); //returns a live DOMTokenList collection of the class attributes of the listParent.

      const firstList: HTMLLIElement = document.createElement('li');
      firstList.classList.add('list-group-item');
      firstList.textContent = data[0].word;
      listParent.append(firstList);

      for (let i = 0; i < data.length; i++) { //iterate through each of the result sets for any given word by each data object
        for (let j = 0; j < data[i].meanings.length; j++) { //iterating through results within each data object of that word

            const definitionTitle: HTMLLIElement = document.createElement('li'); //display "Definition:""
            definitionTitle.textContent = 'Definition:';

            const definitionItemList: HTMLUListElement = document.createElement('ul'); //definition as a list for the word selected
            definitionTitle.append(definitionItemList);

            for (let k = 0; k < data[i].meanings[j].definitions.length; k++) { //getting meanings, definitions for each
                const definitionItem: HTMLLIElement = document.createElement('li');
                definitionItem.textContent = data[i].meanings[j].definitions[k].definition;
                definitionItemList.append(definitionItem);
            }
            listParent.append(definitionTitle);
        }
    }

      oldList?.replaceWith(listParent);
      console.log(data);
    })
    .catch((error) => console.log(error));

    console.log(text);
    return false; // prevent reload
  };
};

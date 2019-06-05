const btn = document.querySelector("#button");
const definitions = document.querySelector("#definitions");
const examples = document.querySelector("#examples");
const synonyms = document.querySelector("#synonyms");
const one = document.querySelector("#one");
const wrapper = document.querySelector("#wrapper");
const footer = document.querySelector("#footer");
const whySosyska = document.querySelector("#whySosyska");

btn.addEventListener('click', req);

function req() {
    // cleaning search results before new search
    definitions.innerHTML= '';
    examples.innerHTML= '';
    synonyms.innerHTML= '';

    const searchText = document.querySelector("#search").value;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://wordsapiv1.p.rapidapi.com/words/' + searchText);
    xhr.setRequestHeader("X-RapidAPI-Host", "wordsapiv1.p.rapidapi.com")
    xhr.setRequestHeader("X-RapidAPI-Key", "8bf04065bemsh59252e426972f8cp1a7d89jsne31a661243ef")
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText)

            // UI beauty
            if(!wrapper.classList.contains('open')) {
                wrapper.classList.add('open')
            }

            if(!one.classList.contains('visible')) {
                one.classList.add('visible')
                footer.classList.add('visible')
            }
        
            parseSection = function(appendTo, responseField) {
                let definitionHeader = false; 
                for (i = 0; i < response.results.length; i++) {
                    if(response.results[i][responseField]) {
                            
                        // Create header for results section
                        let h1 = document.createElement('h1')
                        let h2 = document.createElement('h2')

                        // Custom header for Definition
                        if(responseField === 'definition' && !definitionHeader) {
                            definitionHeader = true;
                            h1.innerHTML = 'Definitions of ' + '<span class="the-word">' + response.word + '</span>'
                            appendTo.appendChild(h1)
                        }

                        // All other headers
                        if(responseField !== 'definition' && !definitionHeader){
                            definitionHeader = true;
                            h2.innerHTML = responseField
                            appendTo.appendChild(h2)
                        }
                        
                        // Create list of results
                        let li = document.createElement('li')
                        let liContent = document.createTextNode(`${response.results[i][responseField]}`);
                        li.appendChild(liContent)
                        appendTo.appendChild(li)
                    }
                }
            }

            parseSection(definitions, 'definition')
            parseSection(examples, 'examples')
            parseSection(synonyms, 'synonyms')
        } else if (xhr.readyState === 4 && xhr.status === 404) {
            Swal.fire({
                type: 'error',
                title: 'Error 404',
                text: 'Please check the word and try again.'
              })
        }
    };
    
    xhr.send();
}

let whySosyskaFunc = function(){
    event.preventDefault();
    Swal.fire({
        title: 'Inspired by my dog, sosyska is her favorite treat',
        width: 600,
        padding: '3em',
        // background: '#fff url(../images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          center left
          no-repeat
        `
      })
}


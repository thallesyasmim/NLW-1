const uf = window.document.querySelector('select[name=uf]');
const city = window.document.querySelector('select[name=city]');
const inputHidden = window.document.querySelector('input[name=state]');

function populateUfs() {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(response => response.json() ).then(states => { 
        /*
        states.map(estado => {
            let optionElement = window.document.createElement('option');
            optionElement.setAttribute('value', `${estado.id}`);
            let sigla = document.createTextNode(estado.sigla);
            optionElement.appendChild(sigla);
            uf.appendChild(optionElement);  }) */

            for (const state of states){
                uf.innerHTML += `<option value=${state.id}>${state.nome}</option>`
            }
       
    });
}

populateUfs()

function getCities(event){
    const ufValue = event.target.value;

    const indexSelected = event.target.selectedIndex;

    inputHidden.value = event.target.options[indexSelected].text

    city.innerHTML = '';
    city.disable = true;

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`)
    .then(response =>  response.json()).then(cities => {
        for (citie of cities){
            city.innerHTML += `<option value=${citie.nome}>${citie.nome}</option>`
        }
    })

    city.disabled = false;
} 


uf.addEventListener('change', getCities);

// Items de coleta

const itemCollaction = window.document.querySelectorAll('.items-grid li');


itemCollaction.forEach(item => {
    item.addEventListener('click', handleSelectedItem)
})

const collectedItems = document.querySelector('input[name=items]');
let selectedItems = [];

function handleSelectedItem(event){
    const itemId = event.target.dataset.id;
    const listItem = event.target;

    listItem.classList.toggle('selected')

    const alreadySelected = selectedItems.findIndex(item => item == itemId);

    if(alreadySelected != -1 && alreadySelected >= 0) {
        const filteredItem = selectedItems.filter(item => item != itemId);
        selectedItems = filteredItem;
    } else {
        selectedItems.push(itemId);
    }

    collectedItems.value = selectedItems;
}
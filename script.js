'use strict';

const TYPES = {
    'Матовые': ['Classic', 'Pongs', 'Evolution', 'Teqtum', 'Premium', 'Lumfer', 'Cold Stretch'],
    'Глянцевые': ['Classic', 'Premium', 'Evolution', 'Pongs', 'Lumfer'],
    'Сатиновые': ['Classic', 'Premium', 'Evolution', 'Pongs', 'Lumfer'],
    'Тканевые': ['D-Premium', 'Clipso', 'Cerutti'],
};

const MATERIALE_PRICES = {
    'Classic': 140,
    'Premium': 190,
    'Evolution': 290,
    'Cold Stretch': 390,
    'Pongs': 390,
    'Teqtum': 440,
    'Lumfer': 660,
    'D-Premium': 580,
    'Clipso': 2390,
    'Cerutti': 2550,
};

const ANGLE_PRICE = 180;
const LAMP_PRICE = 290;
const CHANDELIER_PRICE = 450;

const COUNTS = {
    'Площадь': 0,
    'Углы': 4,
    'Светильники': 0,
    'Люстры': 0,
};

let resultPrice = 0;
let typeSelected = 'Матовые';
let manufacturerSelected = '';


const buttonBuy = document.querySelector('#button-buy');
const resultPriceNode = document.querySelector('.result__value');
const buttons = document.querySelectorAll('button');
const counts = document.querySelectorAll('[data-title]');
const materialsNode = document.querySelector('#materials');
const typeNodes = document.querySelectorAll('[role=type]');
const arrTypes = Array.from(typeNodes);
const arrMaterials = Array.from(materialsNode.children);
const arrButtons = Array.from(buttons);

arrTypes.forEach((item) => {
    item.addEventListener('click', clickOnTypeButon);
});

arrMaterials.forEach((item) => {
    item.addEventListener('click', clickOnMaterialButton);
});

arrButtons.forEach((button) => {
    const isIncrement = button.textContent === '+';
    button.addEventListener('click', (e) => clickOnCountButton(e, isIncrement))
});

buttonBuy.addEventListener('click', clickBuy);


function clickOnTypeButon(event) {
    const target = event.target;
    typeSelected = target.dataset.value;
    manufacturerSelected= '';
    arrTypes.forEach((item) => {
        item.classList.remove('radio__item_selected');
    });
    target.classList.add('radio__item_selected');

    for (let i = materialsNode.children.length-1; i >= 0; i--) {
        materialsNode.children[i].remove();
    }

    TYPES[typeSelected].map((item) => {
        const div = document.createElement('div');
        div.classList.add('radio__item');
        div.textContent = item;
        div.dataset.value = item;
        div.addEventListener('click', clickOnMaterialButton);
        materialsNode.append(div);
    });

    render();
}

function clickOnMaterialButton(event) {
    const target = event.target;
    manufacturerSelected = target.dataset.value;
    Array.from(materialsNode.children).forEach((item) => {
        item.classList.remove('radio__item_selected');
    });
    target.classList.add('radio__item_selected');

    render();
}

function clickOnCountButton(event, isIncrement) {
    const targetCountTitle = event.target.parentNode.querySelector('[data-title]').dataset.title;
    
    if (isIncrement) {
        COUNTS[targetCountTitle]++;
    }
    else {
        if (targetCountTitle === 'Площадь' && COUNTS[targetCountTitle] === 0) {
            return;
        }
        if (targetCountTitle === 'Углы' && COUNTS[targetCountTitle] === 4) {
            return;
        }
        if (targetCountTitle === 'Светильники' && COUNTS[targetCountTitle] === 0) {
            return;
        }
        if (targetCountTitle === 'Люстры' && COUNTS[targetCountTitle] === 0) {
            return;
        }        
        COUNTS[targetCountTitle]--;
    }

    render();
}

function render() {
    Array.from(counts).forEach((count) => {
        count.textContent = COUNTS[count.dataset.title];
    });

    if (manufacturerSelected === '' || COUNTS['Площадь'] === 0) {
        resultPrice = 0;
        resultPriceNode.textContent = resultPrice;
        return;
    }

    resultPrice = MATERIALE_PRICES[manufacturerSelected]*COUNTS['Площадь']
        + LAMP_PRICE*COUNTS['Светильники']
        + CHANDELIER_PRICE*COUNTS['Люстры']
        + (COUNTS['Углы'] > 4 ? ANGLE_PRICE*(COUNTS['Углы']-4) : 0)
    ;

    resultPriceNode.textContent = resultPrice;
}

function clickBuy() {
    if (manufacturerSelected === '') {
        alert('Заполните поле "Производитель"');
    }
    else if (COUNTS['Площадь'] === 0) {
        alert('Заполните поле "Площадь"');
    }
    else {
        alert('Оформлено');
    }
}
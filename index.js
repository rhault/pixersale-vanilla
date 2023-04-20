//Constantes
const navbarEmailButton = document.querySelector('.navbar-email');
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navbarShoppingCardButton = document.querySelector('.navbar-shopping-card');
const desktopMenu = document.querySelector('.desktop-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const productDetail = document.querySelector('.product-detail');
const CLASS_HIDDEN = 'hidden';
const addCardButton = './icons/btn_add_to_card.svg';
const cardContainer = document.querySelector('.cards-container');

//Functions

/* This function takes an array of elements and checks whether each one of them 
contains the 'hidden' class. If the element does not contain the class, 
the function adds the 'hidden' class to it.*/

const isHiddenElemnets = (elements) => {
    elements.forEach(element => {
        let isHiddenElement = element.classList.contains(CLASS_HIDDEN);

        if(!isHiddenElement) element.classList.add(CLASS_HIDDEN); 
    })
}

/*This function takes two parameters: the first parameter to show the element,
the second parameter hidden the elements*/
const togglElement = (showElement, hiddenElement) => {
    console.log('aqui')
    showElement.classList.toggle(CLASS_HIDDEN);
    isHiddenElemnets(hiddenElement);
}

//Events buttons
navbarEmailButton.addEventListener('click', () => {togglElement(desktopMenu, [productDetail])});
navbarShoppingCardButton.addEventListener('click', () => {togglElement(productDetail, [mobileMenu, desktopMenu])});
mobileMenuButton.addEventListener('click', () => {togglElement(mobileMenu, [productDetail])});

/*This is a function that creates a new HTML element with the specified tag,
adds attributes to it, and optionally adds content to it.
- element: the tag of the new HTML element to be created.
- attributes: an object{} containing the attributes and their respective values to be added to the new element.
- nodes: the content to be added to the new element.
*/
const createElement = (element, attributes = {}, ...nodes) => {
    const newElement = document.createElement(element);
    
    Object.entries(attributes).forEach(([key, value]) => {
        newElement.setAttribute(key, value);
    }) 
    
    for(const node of nodes){
        newElement.append(node);
    }

    return newElement
}

const products = [
    {name:'Computer', price:300, img:"https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    {name:'Computer', price:300, img:"https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    {name:'Computer', price:300, img:"https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    {name:'Computer', price:300, img:"https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    {name:'Computer', price:300, img:"https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    {name:'Computer', price:300, img:"https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"},
    {name:'Computer', price:300, img:"https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
];

/*
<div class="product-card">
    <img src="url" alt="">
    <div  class="producto-info">
        <div>
            <p>$3000,00</p>
            <p>Computador</p>
        </div>
        <figure>
            <img src="./icons/btn_add_to_card.svg" alt="">
        </figure>
    </div>
</div>
*/

for(const product of products){
    const {name, price, img} = product;

    //<img src="url" alt=""></img>
    const productImg = createElement('img',{src:img});

    
    const productPrice = createElement('p', {}, `$ ${price}`);
    const productName = createElement('p', {}, name);
    const divWrapper = createElement('div',{}, productPrice, productName);

    const addToCard = createElement('img', {src: addCardButton})
    const productFigure = createElement('figure', {}, addToCard);
    
    //<div  class="producto-info"></div>
    const productInfo = createElement('div',{class:'producto-info'}, divWrapper, productFigure);

    //<div class="product-card">
    cardContainer.append(createElement('div', {class: 'product-card'}, productImg, productInfo));        
}

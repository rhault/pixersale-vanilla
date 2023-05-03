//Constantes
const navbarEmailButton = document.querySelector('.navbar-email');
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navbarShoppingCartButton = document.querySelector('.navbar-shopping-card');
const addCartButton = './icons/btn_add_to_card.svg';
const closeInfoProductButton = document.querySelector('.icone-close');

const desktopMenu = document.querySelector('.desktop-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const productDetail = document.querySelector('.product-detail');
const cardContainer = document.querySelector('.cards-container');
const asideProductInfo =  document.querySelector('.aside-product-info');
const productOrder =  document.querySelector('.aside-my-order');
const shoppingCartNotification = document.querySelector('.shopping-card-notification'); 
const ItemsContainer = document.querySelector('.items-container');

const CLASS_HIDDEN = 'hidden';

//Functions

/* This function takes an array of elements and checks whether each one of them 
contains the 'hidden' class. If the element does not contain the class, 
the function adds the 'hidden' class to it.*/

const closeElemnets = (elements) => {
    elements.forEach(element => {
        let isHiddenElement = element.classList.contains(CLASS_HIDDEN);
        if(!isHiddenElement) element.classList.add(CLASS_HIDDEN); 
    })
}

/*This function takes two parameters: the first parameter to show or hidden the element,
the second parameter hidden the elements*/
const togglElement = (showElement, hiddenElement) => {
    showElement.classList.toggle(CLASS_HIDDEN);
    closeElemnets(hiddenElement);
}

/*This function takes three parameters: the first parameter to show the element, 
the second parameter is the product data, the third parameter hidden the elements*/
const openElement = (openElement, product, hiddenElement) => {
    console.log(product)
    openElement.classList.remove(CLASS_HIDDEN);
    closeElemnets(hiddenElement);
}

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

const addItemCart = (product) => {
    SHOPPINGCART.push(product);
    shoppingCartNotification.innerHTML = SHOPPINGCART.length;
    ItemsContainer.innerHTML = '';
    shoppingCardItems(SHOPPINGCART); 
}

const removeItemCart = (product) => {
    
    let indexRemoveItem = SHOPPINGCART.findIndex(element => element == product);
    shoppingCartNotification.innerHTML = SHOPPINGCART.length;
    ItemsContainer.innerHTML = '';
    shoppingCardItems(SHOPPINGCART); 
}


//Events buttons
navbarEmailButton.addEventListener('click', () => {togglElement(desktopMenu, [productDetail])});
navbarShoppingCartButton.addEventListener('click', () => {togglElement(productOrder, [mobileMenu, desktopMenu, asideProductInfo])});
mobileMenuButton.addEventListener('click', () => {togglElement(mobileMenu, [productDetail, asideProductInfo])});
closeInfoProductButton.addEventListener('click', () => {closeElemnets([asideProductInfo])});


const products = [
    {name:'Computer 1', price:300, img:"./img/Computer.jpg"},
    {name:'Computer 2', price:300, img:"./img/Computer.jpg"},
    {name:'Computer 3', price:300, img:"./img/Computer.jpg"},
    {name:'Computer 4', price:300, img:"./img/Computer.jpg"},
    {name:'Computer 5', price:300, img:"./img/Computer.jpg"},
    {name:'Computer 6', price:300, img:"./img/Computer.jpg"},
    {name:'Computer 7', price:300, img:"./img/Computer.jpg"}
];

let SHOPPINGCART = [];


const shoppingCardItems = (items) => {
    for (const item of items) {
        
        const {name, price, img} = item;
        
        const productImgitem = createElement('img', {src:img});
        const productFigureitem = createElement('figure', {}, productImgitem);
        const productNameitem = createElement('p',{}, name);
        const productPriceitem = createElement('p',{}, price);
        const removeProductItem = createElement('span',{}, '-');
        removeProductItem.addEventListener('click',() => {removeItemCart(item)} )
        const shoppingCartContainer = createElement('div', {class:'shopping-cart'}, productFigureitem, productNameitem, productPriceitem, removeProductItem);
        ItemsContainer.appendChild(shoppingCartContainer);
    }

    /* <div class="shopping-cart">
        <figure>
        <img src="./img/Computer.jpg" alt="">
        </figure>
        <p>Computer</p>
        <p>$50</p>
        <p>-</p>
        </div>
    */
}

const renderProducts = (products) => {
    for(const product of products){
        const {name, price, img} = product;
    
        //<img src="url" alt=""></img>
        const productImg = createElement('img',{src:img});
        productImg.addEventListener('click', () => {openElement(asideProductInfo,product,[mobileMenu, desktopMenu, productOrder])});
    
        
        const productPrice = createElement('p', {}, `$ ${price}`);
        const productName = createElement('p', {}, name);
        const divWrapper = createElement('div',{}, productPrice, productName);
    
        const addToCart = createElement('img', {src: addCartButton});
        addToCart.addEventListener('click', () => {addItemCart(product)});
        const productFigure = createElement('figure', {}, addToCart);
        
        //<div  class="producto-info"></div>
        const productInfo = createElement('div',{class:'producto-info'}, divWrapper, productFigure);
    
        //<div class="product-card">
        const productCard = createElement('div', {class: 'product-card'}, productImg, productInfo);
        cardContainer.append(productCard);        
    }
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
}

renderProducts(products)

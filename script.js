"use strict"

const menu = document.querySelector("#menu");
const carrinho = document.querySelector("#cart-btn");
const modal = document.querySelector("#cart-modal");
const itemsContainer = document.querySelector("#cart-items");
const total = document.querySelector("#cart-total");
const checkoutBtn = document.querySelector("#checkout-btn");
const closeModalBtn = document.querySelector("#close-modal-btn");
const cardCounter = document.querySelector("#cart-count");
const addressInput = document.querySelector("#address");
const addressWarn = document.querySelector("#address-warn");

let cart = [];

carrinho.addEventListener("click", function(){
    updateCartModal();
    modal.style.display = "flex";
})

// fechar o modal clicando no lado de fora.
// se o evento que eu clicar for modal (target) ele vai fechar
modal.addEventListener("click", function(event){
    if(event.target === modal) {
        modal.style.display = "none"
    }
});

closeModalBtn.addEventListener("click", function(){
    modal.style.display = "none";
});

menu.addEventListener("click", function(event){
    //console.log(event.target)

    let parentButton = event.target.closest(".add-to-cart-btn");

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        //Adicionar no Carrinho

        addToCart(name, price);
    }

});

//função adicionar no carrinho 

function addToCart(name, price){

    const existingItem = cart.find(item => item.name === name)

    if(existingItem) {
        // se o item ja existe aumenta apenas a quantidade mais um
        existingItem.quantity += 1;
    }else{
        cart.push({
            name, 
            price,
            quantity: 1,
    
        });
    }

    updateCartModal();
}

//atualiza o carrinho

function updateCartModal () {
    itemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");

        cartItemElement.innerHTML = `
        <div>
            <div>
                <p>${item.name}</p>
                <p>${item.quantity}</p>
                <p>R$ ${item.price}</p>
            </div>

            <div> 
                <button> Remover </button>
            </div>
        </div>
        `

        itemsContainer.appendChild(cartItemElement)
    })
}
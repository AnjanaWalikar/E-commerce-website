const products = [
    {id: 1, name:"Mountain Gasoline Scooter", Image:"https://s.alicdn.com/@sc04/kf/H8fd50d68f02744a5ac7060e041ce6164A.jpg?avif=close",price:162},
    {id:2, name:"Fast speed motion ebike", Image:"https://s.alicdn.com/@sc04/kf/H61e67af6df8a4289bf3fea07a05119d8F.jpg?avif=close", price:360},
    {id:3, name:"Lighting 3d Night Lights", Image:"https://s.alicdn.com/@sc04/kf/Hd802154c5b6940a09b6118906703aa1aM.jpg?avif=close", price:98},
    {id:4, name:"Apple iPhone 13 (128GB) - Blue", Image:"https://m.media-amazon.com/images/I/71xb2xkN5qL._SL1500_.jpg", price:43999},
]

function renderProducts(products, productList){
    const container = document.getElementById(productList);
    container.innerHTML = "";
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML = `
        <img src= "${product.Image}"/>
        <h3>${product.name}</h3>
        <h2>${product.price}</h2>
        <button onclick = "addToCart(${product.id})">Add to cart</button>
        `

    container.appendChild(productDiv);
    })
}

//search functionality
function searchProducts(query){
    const filterProducts = products.filter(product =>
        product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )
    renderProducts(filterProducts, "productList");
}


//eventlistener to button
document.getElementById("searchButton")?.addEventListener("click",() => {
    const query = document.getElementById("productSearch").value;
    searchProducts(query);
})
    //add to cart

    function addToCart(productId){
        const product = products.find(p => p.id === productId);
        let cart = JSON.parse(localStorage.getItem("cart"))||[];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} is added to cart`)
        renderCart();
    }

    //render items in cart

    function renderCart(){
        const cart = JSON.parse(localStorage.getItem("cart"))||[];
        const container = document.getElementById("cartItems");
        container.innerHTML="";
        if(cart.length == 0){
            container.innerHTML="<h1>Your cart is Empty</h1>"
    }
        cart.forEach(item => {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-item");
        cartDiv.innerHTML = `
        <img src="${item.Image}"/>
        <h3>${item.name}</h3>
        <h2>${item.price}</h2>
        <button onclick="removeFromCart(${item.id})">Remove</button>
        
        `
        container.appendChild(cartDiv);
    })
}
     if(document.getElementById("productList"))renderProducts(products,"productList");
     if(document.getElementById("cartItems"))renderCart();


    //Remove from cart
    function removeFromCart(productId){
        let cart = JSON.parse(localStorage.getItem("cart"))||[];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem("cart",JSON.stringify(cart));
        alert("Product is removed successfully");
        renderCart();

   }

   //calculate subtotal
   function renderSubtotal(cart){
    const subtotal = cart.reduce((total,item) => total + item.price,0);
    const subtotalContainer = document.getElementById("subtotal");
    if(cart.length > 0){
        subtotalContainer.innerHTML = `Subtotal : Rs. ${subtotal}`
    }else{
        subtotalContainer.innerHTML = `No items in the cart`
    }
   }
   //sorting
function sortProducts(criteria){
    if(criteria === "price"){
        return products.sort((a,b) => a.price-b.price);
    }
    return products;
}

//adding eventListeners
document.getElementById("sortOptions")?.addEventListener("change", (event)=>{
    const sortedProducts = sortProducts(event.target.value);
    renderProducts(sortedProducts, "productList");
})


        
    


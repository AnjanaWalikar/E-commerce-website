const products = [
    {id: 1, name:"Mountain Gasoline Scooter", Image:"https://s.alicdn.com/@sc04/kf/H8fd50d68f02744a5ac7060e041ce6164A.jpg?avif=close",price:162},
    {id:2, name:"Fast speed motion ebike", Image:"https://s.alicdn.com/@sc04/kf/H61e67af6df8a4289bf3fea07a05119d8F.jpg?avif=close", price:360},
    {id:3, name:"Lighting 3d Night Lights", Image:"https://s.alicdn.com/@sc04/kf/Hd802154c5b6940a09b6118906703aa1aM.jpg?avif=close", price:98},
    {id:4, name:"Apple iPhone 13 (128GB) - Blue", Image:"https://m.media-amazon.com/images/I/71xb2xkN5qL._SL1500_.jpg", price:43999},
    {id:5, name:"Hanging chair", Image:"https://s.alicdn.com/@sc04/kf/H0a5a5d7b1bfb42008fc350bc44aa2de1P.jpg?avif=close", price:20000},
    {id:6, name:"Mini-electric tram car", Image:"https://s.alicdn.com/@sc04/kf/Hcac9386b39134fc4b74528718f41fbc1z.jpg?avif=close", price:180955},
    {id:7, name:"USB Charging Business Travel Bags", Image:"https://s.alicdn.com/@sc04/kf/H777d6f9499364a78a668182c2dba6d4bD.jpg?avif=close", price:1172},
    {id:8, name:"Laptop", Image:"https://s.alicdn.com/@sc04/kf/Hf276a5a89d2e47d2aef96de476b7bfb6Z.jpg?avif=close", price:27981},
    {id:9, name:"Cat Bag Pet Backpack ", Image:"https://sc01.alicdn.com/kf/HTB1ZzjbOMHqK1RjSZFEq6AGMXXa4/231183121/HTB1ZzjbOMHqK1RjSZFEq6AGMXXa4.jpg", price:378},
    {id:10, name:"Tactical Detachable Goggles Mask ", Image:"https://s.alicdn.com/@sc04/kf/H671ed752c77c4703a6de5e9250f5548c0.jpeg?avif=close", price:114},
    {id:11, name:"Folding Wheelchair", Image:"https://s.alicdn.com/@sc04/kf/H33d0a9cce7bd4f828a3d94b99df5fe3fo.jpg?avif=close", price: 19154},
    {id:12, name:"Wireless Hair Straightener", Image:"https://s.alicdn.com/@sc04/kf/Hce9539da895244b1b14b825c253f686fZ.jpg_720x720q50.jpg", price:436},
    {id:13, name:"Wireless Gaming Mouse", Image:"https://s.alicdn.com/@sc04/kf/Ha163631c984f414bb97ad3faab33c218T.jpg_720x720q50.jpg", price:236},
    {id:14, name:"Custom Car Keychain", Image:"https://s.alicdn.com/@sc04/kf/Hf00549d9081b43c286dc6ce174f5039fK.jpg_720x720q50.jpg", price:132},
    {id:15, name:"UV LED Lamp for Nail Dryer", Image:"https://s.alicdn.com/@sc04/kf/Hd5e43bcc3668497cb927a2cdb7bdf4e5C.jpg_720x720q50.jpg", price:229},
    {id:16, name:" Night Light", Image:"https://s.alicdn.com/@sc04/kf/H74af8149e59c43b883e05ed93c8b60bfy.jpg_720x720q50.jpg", price: 78},
    {id:17, name:"Sport Watch Pedometer Fitness Bracelet Watch", Image:"https://s.alicdn.com/@sc04/kf/H12f53814c2de455eaf0778d41528a5cal.jpg_720x720q50.jpg", price:759},
    {id:18, name:"Shoes for Men and Women", Image:"https://s.alicdn.com/@sc04/kf/Ha60ac6c595f34120ac5915b5aa903171b.jpg?avif=close", price:1702},
    
    
    
    
    
    
    
    
    
    
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


        
    


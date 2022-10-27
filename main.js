
let productName = document.getElementById('productName');
let productPrice = document.getElementById('productPrice');
let productCategory = document.getElementById('productCategory');
let productDesc = document.getElementById('productDesc');
let productBtn = document.getElementById('addBtn');

//SEARCH INPUT
let searchInput =document.getElementById('searchInput');
//GLOBAL INDEX
let currentIndex =0;

//REGEX
let nameAlert = document.getElementById('nameAlert');
//ARRAY
let products = [];
//LOCAL STORAGE
if(JSON.parse(localStorage.getItem('productStorage'))!==null){
    products=JSON.parse(localStorage.getItem('productStorage')) ;
    displayProduct();
}



//TO CLEARE FORM
let clearInputs = document.getElementsByClassName('form-control');

//PRODUCT BTN
productBtn.onclick=function () {

    if (productBtn.innerHTML==='add product') { //ADD MODE
        addProduct();
    }
    else{ //UPDATE MODE
        updateProduct();
    }


  displayProduct();
  clearForm();
}

//ADD PRODUCT
function addProduct(){
    let product=
    {
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        desc:productDesc.value,
    }
    products.push(product);

    //LOCAL STORAGE
    localStorage.setItem('productStorage' ,JSON.stringify(products) )
    
}

//DISPLAY THE PRODUCT

function displayProduct() {
    let box = '';
    for (let i = 0; i < products.length; i++) {
       box+= 
       `
       <tr>
       <td>${products[i].name}</td>
       <td>${products[i].price}</td>
       <td>${products[i].category}</td>
       <td>${products[i].desc}</td>
       <td><button onclick="getProductInfo(${i})" class="btn btn-warning">Update</button></td>
       <td><button onclick="deleteProduct(${i})" class='btn btn-danger' >Delete</button></td>
       </tr>
       `  
    }
    document.getElementById('tableBody').innerHTML=box;
}


//DELETE PRODUCTS

function deleteProduct(i) {
products.splice(i,1);
displayProduct(); 
localStorage.setItem('productStorage' ,JSON.stringify(products) )
}

//CLEARE INPUTES
function clearForm(){
    for (let i = 0; i < clearInputs.length; i++) {
        clearInputs[i].value = ''
        
    }
}

//SEARCH 
searchInput.onkeyup=function(){
    let box = '';
    for (let i = 0; i < products.length; i++) {
  if (products[i].name.toUpperCase().includes(searchInput.value.toUpperCase()) ){
    box+= 
    `
    <tr>
    <td>${products[i].name}</td>
    <td>${products[i].price}</td>
    <td>${products[i].category}</td>
    <td>${products[i].desc}</td>
    <td><button class="btn btn-warning">Update</button></td>
    <td><button onclick="deleteProduct(${i})" class='btn btn-danger' >Delete</button></td>
    </tr>
    `  
  }
    }
    document.getElementById('tableBody').innerHTML=box;

}

//UPDATE
function getProductInfo(i) {
    currentIndex=i;

    let currentProduct = products[i];
    productName.value = currentProduct.name;
    productPrice.value = currentProduct.price;
    productCategory.value = currentProduct.category;
    productDesc.value = currentProduct.desc;

    productBtn.innerHTML='Update Product'
}

function updateProduct() {
    let product=
    {
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        desc:productDesc.value,
    }
    products[currentIndex]=product
    localStorage.setItem('productStorage' ,JSON.stringify(products) )
    productBtn.innerHTML='Add Product'
}

//REGEX
productName.onkeyup=function(){
    let nameRejex =/^[A-Z][a-z\s]{2,15}$/
    if(nameRejex.test(productName.value)){ //valid
     productBtn.removeAttribute('disabled')
     productName.classList.add('is-valid')
     productName.classList.remove('is-invalid')
    nameAlert.classList.add('d-none')
    }
 else{
    productBtn.disabled=true;
    productName.classList.add('is-invalid')
    productName.classList.remove('is-valid')
    nameAlert.classList.remove('d-none')
 }
    }


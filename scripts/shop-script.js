var jsonString = "{\"categories\": [{\"id\" : 0, \"name\" : \"Consumables\" }, {\"id\" : 1, \"name\" : \"Armors\" }, {\"id\" : 2, \"name\" : \"Weapons\" }, {\"id\" : 3, \"name\" : \"Junk\" }, {\"id\" : 4, \"name\" : \"Unique\" }, {\"id\" : 5, \"name\" : \"Miscellaneous\" } ], \"items\":[{\"id\": 0, \"ean\": \"9782054125987\", \"name\": \"Stimpak\", \"price\": 75.00, \"stock_quantity\": 10, \"img\" : \"img/stimpak.png\", \"categories\": [{\"id\": 0 } ] }, {\"id\": 1, \"ean\": \"9782054125988\", \"name\": \"Noodles\", \"price\": 5.00, \"stock_quantity\": 20, \"img\" : \"img/logo.png\", \"categories\": [{\"id\": 0 } ] } , {\"id\": 2, \"ean\": \"9782054125989\", \"name\": \"Gobi Desert Rifle\", \"price\": 6200.00, \"stock_quantity\": 1, \"img\" : \"img/gobi.png\", \"categories\": [{\"id\": 2 }, {\"id\": 4 } ] }, {\"id\": 3, \"ean\": \"9782054125990\", \"name\": \"Christine's COS silencer rifle\", \"price\": 6100.00, \"stock_quantity\": 1, \"img\" : \"img/christine.png\", \"categories\": [{\"id\": 2 }, {\"id\": 4 } ] }, {\"id\": 4, \"ean\": \"9782054125991\", \"name\": \"Desert Ranger Combat Armor\", \"price\": 8000.00, \"stock_quantity\": 2, \"img\" : \"img/desert.png\", \"categories\": [{\"id\": 1 } ] }, {\"id\": 5, \"ean\": \"9782054125992\", \"name\": \"Bobby pin\", \"price\": 1.00, \"stock_quantity\": 5, \"img\" : \"img/logo.png\", \"categories\": [{\"id\": 5 } ] }, {\"id\": 6, \"ean\": \"9782054125993\", \"name\": \"Cook-cook's head\", \"price\": 250.00, \"stock_quantity\": 1, \"img\" : \"img/logo.png\", \"categories\": [{\"id\": 3 }, {\"id\": 4 } ] }, {\"id\": 7, \"ean\": \"9782054125994\", \"name\": \"Cuddle's toy car\", \"price\": 2.00, \"stock_quantity\": 1, \"img\" : \"img/cuddle.png\", \"categories\": [{\"id\": 3 }, {\"id\": 4 } ] }, {\"id\": 8, \"ean\": \"9782054125995\", \"name\": \"Spatula\", \"price\": 1.00, \"stock_quantity\": 3, \"img\" : \"img/logo.png\", \"categories\": [{\"id\": 3 } ] } ], \"orders\":[{\"id\": 0, \"number\": \"20260120101730001\", \"date\": \"20/01/2296\", \"total_amount\": 20.0, \"client_id\": 0, \"items\": [{\"id\": 0, \"quantity\" : 1 }, {\"id\": 1, \"quantity\" : 1 } ] } ], \"customers\":[{\"id\": 0, \"lastname\": \"MacLane\", \"firstname\": \"Lucy\", \"address\": \"Vault 33\", \"login\": \"maclanelucy\", \"pwd\": \"okeydokey\", \"cart\": [{\"id\": 0, \"quantity\": 2 }, {\"id\": 5, \"quantity\": 10 } ] } ] }";

var db = JSON.parse(jsonString);

var customerId = 0;

var auth = true;

class Category{
    constructor(id, name){
        this.id = id;
        this.name = name;
    }
}

class Item{
    constructor(id, ean, name, price, stock_quantity, img, categories){
        this.id = id;
        this.ean = ean;
        this.name = name;
        this.price = price;
        this.stock_quantity = stock_quantity;
        this.img = img;
        this.categories = categories;
    }
    
    addCategory(category){
        this.categories.push(category);
    }
}

class Order{
    constructor(id, number, dateOrder, total_amount, items){
        this.id = id;
        this.number = number;
        this.dateOrder = dateOrder;
        this.total_amount = total_amount;
        this.items = items;
    }
    
    addItem(item){
        this.items.push(item);
    }
}

class Customer{
    constructor(id, firstname, lastname, address, login, pwd, orders, cart){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.login = login;
        this.pwd = pwd;
        this.orders = orders;
        this.cart = cart;
    }
    addOrder(order){
        this.orders.push(order);
    }
    addCartItem(idItem, quantity){
        var itemFound = false;
        for(var i = 0; i < this.cart.length; i++){
            if(this.cart[i][0].id == idItem){
                this.cart[i][0][0] += quantity;
                itemFound = true;
            }
        }
        if(itemFound == false){
            var newItem = shop.stock.find((item) => item.id === idItem);
            this.cart.push([[newItem][quantity]]);
        }
        console.log(this.cart);
    }
}

class Shop{
    constructor(categories, stock, customers){
        this.categories = categories;
        this.stock = stock;
        this.customers = customers;
    }
    
    addCategory(category){
        this.categories.push(category);
    }
    
    addItem(item){
        this.stock.push(item);
    }
    
    addCustomer(customer){
        this.customers.push(customer);
    }
}

// Functions

function findItem(tab, id) {
    return tab.id === id;
}

function toggleCategory(category){
    // Change appearance
    document.getElementById(category).classList.toggle("bg-warning");
    document.getElementById(category).classList.toggle("text-dark");
    document.getElementById(category).classList.toggle("text-warning");
    if(document.getElementById(category).classList.contains("bg-warning")){
        toggleItems(category, "on");
    }else{
        toggleItems(category, "off");
    }
    
}
function toggleItems(category, toggle){
    var itemCat = document.getElementsByClassName(category);
    for(var i = 0; i < itemCat.length; i++){
        if(toggle == "on"){
            document.getElementById(itemCat[i].id).style.display = "block";
        }else{
            document.getElementById(itemCat[i].id).style.display = "none";
        }
        console.log(document.getElementById(itemCat[i].id));    
    }
}

function displayCategoriesMenu(){
    var tagString = "";
    for(var i = 0; i < shop.categories.length; i++){
        tagString = '<li class="nav-item col"><a href="#" id="category-' + shop.categories[i].id + '" class="nav-link bg-warning text-dark" onclick="toggleCategory(\'category-' + shop.categories[i].id + '\')">' + shop.categories[i].name + '</a></li>';
        var doc = new DOMParser().parseFromString(tagString, "text/html");
        var cat = doc.getElementsByTagName("li");
        for(var j = 0; j < cat.length; j++){
            document.getElementById("menu").appendChild(cat[j]);
        }    
    }
}

function displayShopItemsList(){
    for(var i = 0; i < shop.stock.length; i++){
        var tagString = '<div id="item-' + shop.stock[i].id + '" class="col-3 col-md-2 col-lg-2 col-xl-2 card ';
        for(var j = 0; j < shop.stock[i].categories.length; j++){
            tagString = tagString + ' category-' + shop.stock[i].categories[j].id;
        }
        tagString = tagString + '" style="display: block;"><div class="card-body"><img src="' + shop.stock[i].img + '" class="img-thumbnail" /><dl><dt>' + shop.stock[i].name + '</dt><dd>' + shop.stock[i].price +' caps</dd></dl><button type="button" class="btn btn-success text-end" onClick="addToCart(' + shop.stock[i].id + ', 1)">+</button></div></div>';
        var doc = new DOMParser().parseFromString(tagString, "text/html");
        var art = doc.getElementById("item-" + shop.stock[i].id);
        document.getElementById("items-list").appendChild(art);
    }
}

function addToCart(idItem, quantity){
    for(var i = 0; i < shop.customers.length; i++){
        if(customerId == shop.customers[i].id){
            shop.customers[i].addCartItem(idItem, quantity);
        }
    }
}

if(auth){
    document.getElementById("connexion").style.display = "none";
    document.getElementById("account").style.display = "block";
}else{
    document.getElementById("connexion").style.display = "block";
    document.getElementById("account").style.display = "none";
}

// Main
var tabCategories = [];
var tabItems = [];
var tabCustomers = [];
var tabOrders = [];
var i = 0;
// Get categories from Json
for(i = 0; i < db.categories.length; i++){
    var category = new Category(db.categories[i].id, db.categories[i].name);
    tabCategories.push(category);
}
// Get items from Json with categories
for(i = 0; i < db.items.length; i++){
    var tabCat = [];
    
    for(var j = 0; j < db.items[i].categories.length; j++){
        var categoryFound = tabCategories.find((category) => category.id === db.items[i].categories[j].id);
        var category = new Category(categoryFound.id, categoryFound.name);
        tabCat.push(category);
    }
    var item = new Item(db.items[i].id, db.items[i].ean, db.items[i].name, db.items[i].price, db.items[i].stock_quantity, db.items[i].img, tabCat);
    tabItems.push(item);
}
// Get customers from Json, with cart and orders
for(i = 0; i < db.customers.length; i++){
    var tabCart = [];
    var tabOrders = [];
    for(var j = 0; j < db.customers[i].cart.length; j++){
        var itemFound = tabItems.find((item) => item.id === db.customers[i].cart[j].id);
        tabCart.push([[itemFound],[db.customers[i].cart[j].quantity]]);
    }
    for(var j = 0; j < db.orders.length; j++){
        var orderFound = db.orders.find((order) => order.client_id === db.customers[i].id);
        tabOrders.push(orderFound);
    }
    var customer = new Customer(db.customers[i].id, db.customers[i].firstname, db.customers[i].lastname, db.customers[i].address, db.customers[i].login, db.customers[i].pwd, tabOrders, tabCart);
    tabCustomers.push(customer);
}

var shop = new Shop(tabCategories, tabItems, tabCustomers);

displayShopItemsList();
displayCategoriesMenu();
// console.log(shop.customers);
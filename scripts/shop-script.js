var jsonString = "{\"categories\": [{\"id\" : 0, \"name\" : \"Consumables\" }, {\"id\" : 1, \"name\" : \"Armors\" }, {\"id\" : 2, \"name\" : \"Weapons\" }, {\"id\" : 3, \"name\" : \"Junk\" }, {\"id\" : 4, \"name\" : \"Unique\" }, {\"id\" : 5, \"name\" : \"Miscellaneous\" } ], \"items\":[{\"id\": 0, \"ean\": \"9782054125987\", \"name\": \"Stimpak\", \"price\": 75.00, \"stock_quantity\": 10, \"img\" : \"img/stimpak.png\", \"categories\": [{\"id\": 0 } ] }, {\"id\": 1, \"ean\": \"9782054125988\", \"name\": \"Noodles\", \"price\": 5.00, \"stock_quantity\": 20, \"img\" : \"img/logo.png\", \"categories\": [{\"id\": 0 } ] } , {\"id\": 2, \"ean\": \"9782054125989\", \"name\": \"Gobi Desert Rifle\", \"price\": 6200.00, \"stock_quantity\": 1, \"img\" : \"img/gobi.png\", \"categories\": [{\"id\": 2 }, {\"id\": 4 } ] }, {\"id\": 3, \"ean\": \"9782054125990\", \"name\": \"Christine's COS silencer rifle\", \"price\": 6100.00, \"stock_quantity\": 1, \"img\" : \"img/christine.png\", \"categories\": [{\"id\": 2 }, {\"id\": 4 } ] }, {\"id\": 4, \"ean\": \"9782054125991\", \"name\": \"Desert Ranger Combat Armor\", \"price\": 8000.00, \"stock_quantity\": 2, \"img\" : \"img/desert.png\", \"categories\": [{\"id\": 1 } ] }, {\"id\": 5, \"ean\": \"9782054125992\", \"name\": \"Bobby pin\", \"price\": 1.00, \"stock_quantity\": 5, \"img\" : \"img/logo.png\", \"categories\": [{\"id\": 5 } ] }, {\"id\": 6, \"ean\": \"9782054125993\", \"name\": \"Cook-cook's head\", \"price\": 250.00, \"stock_quantity\": 1, \"img\" : \"img/logo.png\", \"categories\": [{\"id\": 3 }, {\"id\": 4 } ] }, {\"id\": 7, \"ean\": \"9782054125994\", \"name\": \"Cuddle's toy car\", \"price\": 2.00, \"stock_quantity\": 1, \"img\" : \"img/cuddle.png\", \"categories\": [{\"id\": 3 }, {\"id\": 4 } ] }, {\"id\": 8, \"ean\": \"9782054125995\", \"name\": \"Spatula\", \"price\": 1.00, \"stock_quantity\": 3, \"img\" : \"img/logo.png\", \"categories\": [{\"id\": 3 } ] } ], \"orders\":[{\"id\": 0, \"number\": \"20260120101730001\", \"date\": \"20/01/2296\", \"total_amount\": 20.0, \"client_id\": 0, \"items\": [{\"id\": 0, \"quantity\" : 1 }, {\"id\": 1, \"quantity\" : 1 } ] } ], \"customers\":[{\"id\": 0, \"lastname\": \"MacLane\", \"firstname\": \"Lucy\", \"address\": \"Vault 33\", \"login\": \"maclanelucy\", \"pwd\": \"okeydokey\", \"cart\": [{\"id\": 0, \"quantity\": 2 }, {\"id\": 5, \"quantity\": 10 } ] } ] }";

var db = JSON.parse(jsonString);

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
    addCartItem(item, quantity){
        this.cart[item] = quantity;
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
}
function toggleItems(category){
    

    document.getElementById("items-list").classList.toggle("bg-warning");
}

// Events
document.getElementById("category1").addEventListener("click", toggleCategory("category1"));

// Main
var tabCategories = [];
var tabItems = [];
var tabCustomers = [];
var tabOrders = [];
var i = 0;
for(i = 0; i < db.categories.length; i++){
    var category = new Category(db.categories[0].id, db.categories[0].name);
    tabCategories.push(category);
}

for(i = 0; i < db.items.length; i++){
    var tabCat = [];
    for(var j = 0; j < db.items[i].categories.length; j++){
        var category = new Category(db.items[i].categories[j].id, db.items[i].categories[j].name);
        tabCat.push(category);
    }
    var item = new Item(db.items[i].id, db.items[i].ean, db.items[i].name, db.items[i].price, db.items[i].stock_quantity, db.items[i].img, tabCat);
    tabItems.push(item);
}

for(i = 0; i < db.customers.length; i++){
    var tabCart = {};
    // console.log(db.customers);
    for(var j = 0; j < db.customers[i].cart.length; j++){
        var itemFound = tabItems.find((item) => item.id === db.customers[i].cart[j].id);
        tabCart[db.customers[i].cart[j].quantity] = itemFound;
        console.log(tabCart);
    }
    //// VOIR COMMENT GERER LES COMMANDES ////
    var customer = new Customer(db.customers[i].id, db.customers[i].firstname, db.customers[i].lastname, db.customers[i].address, db.customers[i].login, db.customers[i].pwd, order, tabCart);
    tabCustomers.push(customer);
}

console.log(tabCustomers);


var shop = new Shop(db.categories, db.items, db.customers);

// Test log
// console.log(shop);
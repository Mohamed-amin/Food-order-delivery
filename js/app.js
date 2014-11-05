/*!
 * Food Delivery App
 * Copyright 2014 Amin.
 */


function App(){

    var App = this;

    this.Menu = function() {
        App.Menu.items = {};
        App.Menu.items.Meals = {};
        var currentMenu = "";
        App.Menu.loadItems = function (id) {
            currentMenu = id;
        };
        App.Menu.getItems = function (id) {
            return this.items = eval(currentMenu);
        };        
        App.Menu.getItemName = function (id) {
            return this.items[id].name;
        };
        App.Menu.getItemCost = function (id) {
            return this.items[id].price;
        };
    }

    this.CustomersList = function() {
        App.CustomersList.customers = {};
        App.CustomersList.getCustomers = function () {
            // return this.customers = {
            //     1: {name: "Amin", ordered: false, total: 0},
            //     2: {name: "Haider", ordered: false, total: 0},
            //     3: {name: "shehata", ordered: false, total: 0},
            //     4: {name: "Wael", ordered: false, total: 0},
            //     5: {name: "Hamdy", ordered: false, total: 0},
            //     6: {name: "Moustafa", ordered: false, total: 0},
            //     7: {name: "Omar", ordered: false, total: 0},
            //     8: {name: "Sanad", ordered: false, total: 0},
            //     9: {name: "Ali", ordered: false, total: 0},
            //     10: {name: "Mena", ordered: false, total: 0},
            //     11: {name: "Abo-El-Noor", ordered: false, total: 0},
            //     12: {name: "Said", ordered: false, total: 0},
            //     13: {name: "Yasmine", ordered: false, total: 0},
            //     14: {name: "Basayel", ordered: false, total: 0},
            //     15: {name: "Fawzia", ordered: false, total: 0},
            //     16: {name: "Hager", ordered: false, total: 0},
            //     17: {name: "Yomna", ordered: false, total: 0},
            //     18: {name: "Mai-Wanas", ordered: false, total: 0},
            //     19: {name: "Mai-Moustfa", ordered: false, total: 0},
            //     20: {name: "Mai-El-Naggar", ordered: false, total: 0},
            //     21: {name: "Mohamed-Tarek", ordered: false, total: 0},
            //     23: {name: "Fatma", ordered: false, total: 0},
            //     24: {name: "Zinab", ordered: false, total: 0},
            //     25: {name: "Khazendar", ordered: false, total: 0},
            //     26: {name: "Nada", ordered: false, total: 0},
            //     27: {name: "Sara-Haridy", ordered: false, total: 0},
            //     28: {name: "Tamer", ordered: false, total: 0},
            //     29: {name: "Alaa", ordered: false, total: 0},
            //     30: {name: "Shiamaa", ordered: false, total: 0},
            //     31: {name: "Sara-Salah", ordered: false, total: 0},
            //     32: {name: "Youssef", ordered: false, total: 0},
            //     33: {name: "Hatem", ordered: false, total: 0},

            // }
            return this.customers = persons;
        };
        App.CustomersList.draw = function () {
           var customers = this.getCustomers();
            var list = '';
            for(id in customers) {
                list += '<option id='+id+'>'+ customers[id].name +'</option>';
            } 
            $("#persons").append(list);
        };
        App.CustomersList.ordered = function (id) {
            this.customers[id].ordered = true;
        };
        App.CustomersList.getCustomerName = function(id) {
            return this.customers[id].name;
        };
        App.CustomersList.getCustomerTotal = function(id) {
            return this.customers[id].total;
        };
        App.CustomersList.updateCustomerTotal = function (id, value) {
            this.customers[id].total += value;
        }
    }

    this.Order = function(){
        App.Order.orderList = { total : 0};
        App.Order.Meals = {};
        App.Order.setTotals = function(customerId, menuItemId, qty){
            var total = 0;
            for (i in App.Order.orderList[customerId]) {
                if(App.Order.orderList[customerId][i].hasOwnProperty("sumTotal")){
                    total += App.Order.orderList[customerId][i].sumTotal();
                    App.Order.orderList[customerId].total =+ total;

                }
            }
            // console.log(App.Order.orderList[customerId].total  +"   Customer total after")

            var totalObj = 0;
            for (i in App.Order.orderList) {
                if(App.Order.orderList[i].hasOwnProperty("total")){
                    totalObj += App.Order.orderList[i].total;
                }
            }
            // console.log(totalObj + "   totalobj")
            App.Render.RenderTotals(totalObj, total, customerId);
            App.Order.orderList.total = totalObj;
            // console.log(App.Order.orderList)
        }
        App.Order.sumMeals = function (){
                var qty = 0,
                    name;
                // App.Order.Meals[menuItemId]
                for (i in App.Order.Meals) {
                        name = App.Order.Meals[i]["name"];
                        qty = App.Order.Meals[i]["qty"];
                        App.Render.RenderMeals(qty, name)
                    }
                
                console.log(App.Order.Meals)
        }
        App.Order.sumOrder = function (sharedExpensies){
                var totalObj = 0,
                    name,
                    customersCount = 0;

                for (i in App.Order.orderList) {
                    if(App.Order.orderList[i].hasOwnProperty("Name")){
                        customersCount ++;
                        totalObj = App.Order.orderList[i].total;
                        name = App.Order.orderList[i].Name;
                        App.Render.RenderAll(totalObj,name,sharedExpensies);

                    }
                }
                App.Order.orderList.customersCount = customersCount;
                console.log(App.Order.orderList)
        }
        App.Order.addNew = function(customerId, menuItemId, qty){
            // console.log(App.Order.orderList)
                qty = parseInt(qty)
                if(!App.Order.orderList.hasOwnProperty(customerId)){                
                    App.Order.createNewCustomer(customerId, menuItemId, qty);
                } else {
                    if (App.Order.orderList[customerId][menuItemId] !== undefined){
                        App.Order.updateOrderforCustomer(customerId, menuItemId, qty);
                    } else {
                        App.Order.createNewOrderforCustomer(customerId, menuItemId, qty);
                    }
                }
        };
        App.Order.createNewCustomer = function(customerId, menuItemId, qty){
            var customerName = App.CustomersList.getCustomerName(customerId);
            App.Order.orderList[customerId] = { 
                total : 0,
                Name : customerName,
                Id : customerId
            };
            App.CustomersList.ordered(customerId);
            var orderListobj = App.Order.orderList;
            App.Render.newTable(orderListobj, customerId, menuItemId, qty)
            App.Order.createNewOrderforCustomer(customerId, menuItemId, qty); 
        };
        App.Order.createNewOrderforCustomer = function (customerId, menuItemId, qty) {
            var customerName = App.CustomersList.getCustomerName(customerId),
                menuItemName = App.Menu.getItemName(menuItemId),
                menuItemCost = App.Menu.getItemCost(menuItemId);
                this.orderList[customerId][menuItemId] = { 
                    id : menuItemId,
                    qty : qty,
                    menuItemName : menuItemName,
                    customerId : customerId,
                    price : menuItemCost,
                    sumTotal : function () {
                        var total = this['qty']*this['price']
                        return total;
                    }
                };
                if (!App.Order.Meals.hasOwnProperty(menuItemId)) {
                    App.Order.Meals[menuItemId] = {
                        name : menuItemName,
                        qty : qty
                     }
                } 
                else{
                    App.Order.Meals[menuItemId]["qty"] += qty

                };
                
                // console.log(App.Order.Meals)
                App.Order.setTotals(customerId, menuItemId, qty);
                var orderListobj = App.Order.orderList;
                App.Render.newRow(orderListobj, customerId, menuItemId, qty)
        };
        App.Order.updateOrderforCustomer = function (customerId, menuItemId, qty) {
            var menuItemCost = App.Menu.getItemCost(menuItemId),
                currentQty = this.orderList[customerId][menuItemId]["qty"],
                newQty = parseInt(currentQty) + parseInt(qty);
            App.Order.orderList[customerId][menuItemId]["qty"] = newQty;
            // this.orderList[customerId][menuItemId].sumTotal();
            // console.log(customerId +"  " + menuItemId)
            App.Order.Meals[menuItemId]["qty"] = newQty;
            App.Order.setTotals(customerId, menuItemId, qty);
            console.log(App.Order.Meals)

            // console.log(this.orderList[customerId][menuItemId].sumTotal())
            var orderListobj = App.Order.orderList;
            App.Render.UpdateRow(orderListobj, customerId, menuItemId, qty)
        };
        App.Order.Remove = function(customerOrderItem, customerId, menuItemId, qty){
                if(customerOrderItem.hasClass("info")){
                    App.Order.RemoveCustomer(customerId, menuItemId, qty);
                    console.log("Removing table")
                } else {
                    App.Order.RemoveOrder(customerId, menuItemId, qty);    
                    console.log("Removing Row")            
                }
        };
        App.Order.RemoveCustomer = function(customerId, menuItemId, qty){
            App.Render.RemoveTable(customerId);
            delete this.orderList[customerId];  
            App.Order.setTotals(customerId, menuItemId, qty);            

        };
        App.Order.RemoveOrder = function(customerId, menuItemId, qty){
            App.Render.RemoveRow(customerId, menuItemId); 
            delete this.orderList[customerId][menuItemId] ;
            console.log( this.orderList)
            // App.Menu.items.Meals[menuItemId]["qty"] =-qty;
            // I didn't know what it does so I commented it :)

            App.Order.setTotals(customerId, menuItemId, qty);

            var count = 0;
            var i;
            for (i in this.orderList[customerId]) {
                if (this.orderList[customerId].hasOwnProperty(i)) {
                    count++;
                }
            }
            if (count < 4) {
                console.log(count +"delete now");
                App.Order.RemoveCustomer(customerId);
            };
        };
        App.Order.roundMe = function(n, sig) {
            if (n === 0) return 0;
            var mult = Math.pow(10, sig - Math.floor(Math.log(n < 0 ? -n: n) / Math.LN10) - 1);
            return Math.round(n * mult) / mult;
        }

    }
    this.Render = function() {
        App.Render.drawMenu = function (){
            $("#Menu").html('');
                App.Menu.getItems();

                var menuOptions = '';
                for(id in App.Menu.items){

                    menuOptions += '<option id='+id+'>'+ App.Menu.items[id].name +'</option>';
                }
            $("#Menu").append(menuOptions);
        };
        App.Render.drawCustomersList = function () {
            var customers = App.CustomersList.getCustomers();
            var list = '';
            for(id in customers) {
                list += '<option id='+id+'>'+ customers[id].name +'</option>';
            } 
            $("#persons").append(list);
        };
        App.Render.RenderTotals = function (orderTotal, customerTotal, customerId) {
            $(".total").text(orderTotal +" L.E");
            $(".totalCost").html(orderTotal +" L.E");
            $("#subtotal_" + customerId + "").text(customerTotal +" L.E");
        };
        App.Render.RenderAll = function(total, name, sharedExpensies){  
            if (sharedExpensies == undefined) {
                sharedExpensies = 0;
            } 
            var summery = '',
                stotal = parseFloat(total) + parseFloat(sharedExpensies) ;
            summery += "<tr><td>"+name+"</td><td>"+App.Order.roundMe(stotal,3)+" L.E</td></tr>";
            tbody = "<tbody></tbody>" 
            $(".summery tbody").append(summery)
        };
        App.Render.RenderMeals = function(qty, name){  
            var meals = '';
            meals += "<tr><td>"+name+"</td><td>"+qty+"</td></tr>";
            $(".charges tbody").append(meals)
        };
        App.Render.newTable = function (orderList, customerId, menuItemId, qty){
            var customerName = orderList[customerId].Name,
                customerId = orderList[customerId].Id,
                customerTotal = orderList[customerId].total;
                customerOrder = '<table class="table '+ customerName + '" data-type="tableholder">'
                    + '<tr class=" info "  data-person="' + customerName 
                    + '" data-personId="' + customerId + '" ><td>'+ customerName 
                    + '</td><td class="mealQty"> # </td><td> Items Odered</td><td> <span id="subtotal_' + customerId
                    +  '" >' + customerTotal
                    + '</span></td><td><a href="#" class="label label-danger delete">×</a></td></tr>'
                    + '</table>';
                $(".sheet").append(customerOrder);
        }
        App.Render.newRow = function (orderList, customerId, menuItemId, qty){
            var customerName = App.CustomersList.getCustomerName(customerId),
                menuItemName = App.Menu.getItemName(menuItemId),
                menuItemCost = App.Menu.getItemCost(menuItemId),
                customerOrderItem = '<tr class="mealRow" data-person="' + customerName
                                    + '" data-type="trholder" data-id="' + menuItemId 
                                    + '" data-personId="' + customerId 
                                    + '"><td></td><td class="mealQty"> <input class="form-control" type="number" min="1" value="' + qty
                                    + '"/></td><td>' + menuItemName + '</td><td class="subtotal">' + menuItemCost*qty
                                    + ' L.E</td><td><a href="#" class="label label-danger delete">×</a></td></tr>';

              $("." + customerName + " ").append(customerOrderItem);
        }
        App.Render.UpdateRow = function (orderList, customerId, menuItemId, qty){
            var menuItemCost = App.Menu.getItemCost(menuItemId),
                currentQty = orderList[customerId][menuItemId]["qty"];

            $(".mealRow[data-id="+menuItemId+"][data-personid='"+customerId+"']").find(".mealQty input").val(currentQty);
            $(".mealRow[data-id="+menuItemId+"][data-personid='"+customerId+"']").find(".subtotal").text(orderList[customerId][menuItemId].sumTotal());
        }
        App.Render.RemoveTable = function (customerId){
            var customerName = App.Order.orderList[customerId].Name;
            $(".table."+customerName+" ").remove();
        }
        App.Render.RemoveRow = function (customerId, menuItemId){
            $(".mealRow[data-id="+menuItemId+"][data-personid='"+customerId+"']").remove();
        }
    }
    this.Menu();
    this.CustomersList();
    this.Order();
    this.Render();

}

$( document ).ready(function() {
 var app;
   

    $(".addNewOrder").on('click', function() {
        var $this = $(this),
            qty = $this.closest("td").find(".qty").val(),
            menuItem = $("#Menu").find(":selected").attr('id'),
            customer = $("#persons").find(":selected").attr('id');
        app.Order.addNew(customer, menuItem, qty);
    });

    $('.sheet').on('click', '.delete', function(){
        var $this = $(this),
            customerOrderItem = $(this).closest("tr"),
            qty = parseInt(customerOrderItem.find(".mealQty input").val()),
            menuItemId = customerOrderItem.data("id"),
            customerId = customerOrderItem.data("personid");
        app.Order.Remove(customerOrderItem, customerId, menuItemId, qty);
    });
    $('.sheet').on('change', '.mealQty input', function(){
        var $this = $(this),
            customerOrderItem = $(this).closest("tr"),
            menuItemId = customerOrderItem.data("id"),
            customerId = customerOrderItem.data("personid");
            oldQty = app.Order.orderList[customerId][menuItemId]["qty"],
            currentQty = parseInt(customerOrderItem.find(".mealQty input").val()),
            newQty = currentQty - oldQty;

            app.Order.addNew(customerId, menuItemId, newQty);
    });  
    $('#myModal').on('change', '.bill', function(){
        var bill = $(this).val(),
            customersCount = app.Order.orderList["customersCount"],
            orignalTotal = app.Order.orderList["total"],
            sharedExpensies =  (bill - orignalTotal) / customersCount;            
            console.log(sharedExpensies)
        $(".summery tbody").html('');  
        app.Order.sumOrder(sharedExpensies);

    })
   
    $('#myModal').on('shown.bs.modal', function (e) {
        app.Order.sumOrder();
        app.Order.sumMeals();

    })
    $('#myModal').on('hidden.bs.modal', function (e) {
            $(".summery tbody").html(''); 
            $(".charges tbody").html('');  
    })
    $("#Menu").chosen()
    $("#persons").chosen()


    $("#restaurant").on('change',function(){
        var restaurantId = $(this).find(":selected").attr('id');
        // alert(restaurantId)
        $(".sheet").html("")
        $(".total").html("")

        app = new App();
        app.Order.orderList = {}

        // app.Render.drawMenu();
        app.Menu.loadItems(restaurantId);
        app.Render.drawMenu();
        app.Render.drawCustomersList();
        // console.log(app)
        $("select").trigger("chosen:updated");
    });
            

});
let products = []

const salesServiceUrl = "https://localhost:7086/api/Sales/"
const productsRoute = "Products"
const customersRoute = "Customers"

function listProducts(){

    let oldTbody = document.getElementById("table-body");
    var newTbody = document.createElement('tbody');
    newTbody.id = "table-body";

    oldTbody.parentElement.replaceChild(newTbody, oldTbody);

    table = newTbody;

    const httpClient = new XMLHttpRequest();
    httpClient.open("GET", salesServiceUrl + productsRoute);
    httpClient.send();

    httpClient.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            products = JSON.parse(httpClient.responseText);
            console.log(httpClient.responseText);

            products.forEach((p, i) => {

                var row = table.insertRow(i);
                
                var cellNumber = row.insertCell(0);
                cellNumber.innerHTML = p.id;
        
                var cellModel = row.insertCell(1);
                cellModel.innerHTML = p.description;
        
                var cellBrand = row.insertCell(2);
                cellBrand.innerHTML = p.registration;
        
                var cellQuantity = row.insertCell(3);
                cellQuantity.innerHTML = p.customerId;
            });
        }       
    }
}

function createProduct(){

    if (!validateProductsForm()){
        alert("Preencha os dados corretamente!");
        return;
    }

    let descriptionInput = document.getElementById("descriptionInput");
    let dateInput = document.getElementById("dateInput");
    let customerIdInput = document.getElementById("customerIdInput");
   

    let inputYear = Number(dateInput.value.split("-")[0]);
    let inputMonth = Number(dateInput.value.split("-")[1]);
    let inputDay = Number(dateInput.value.split("-")[2]);

    let registrationUTC = Date.UTC(inputYear, inputMonth, inputDay);

    let product = {
        description: descriptionInput.value,
        registration: new Date(registrationUTC).toISOString(),
        customerId: customerIdInput.value,
    }

    const httpClient = new XMLHttpRequest();
    httpClient.open("POST", salesServiceUrl + productsRoute);    
    httpClient.setRequestHeader("Content-Type", "application/json");
    httpClient.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            let table = document.getElementById("table-body");
            
            var row = table.insertRow(table.rows.length);
            
            var cellNumber = row.insertCell(0);
            cellNumber.innerHTML = table.rows.length;
    
            var cellModel = row.insertCell(1);
            cellModel.innerHTML = product.description;
    
            var cellBrand = row.insertCell(2);
            cellBrand.innerHTML = product.registration;
    
            var cellQuantity = row.insertCell(3);
            cellQuantity.innerHTML = product.customerId;

        }
    }

    httpClient.send(JSON.stringify(product));    
}

function validateProductsForm(){
    let descriptionInput = document.getElementById("descriptionInput");
    let dateInput = document.getElementById("dateInput");
    let customerIdInput = document.getElementById("customerIdInput");
    
    if (descriptionInput.value == null || descriptionInput.value == ""){
        return false;
    }
    if (dateInput.value == null || dateInput.value == ""){
        return false;
    }
    if (customerIdInput.value == null || customerIdInput.value == "0"){
        return false;
    }    

    return true;
}

function listCustomers(){

    let oldTbody = document.getElementById("table-body");
    var newTbody = document.createElement('tbody');
    newTbody.id = "table-body";

    oldTbody.parentElement.replaceChild(newTbody, oldTbody);

    table = newTbody;

    const httpClient = new XMLHttpRequest();
    httpClient.open("GET", salesServiceUrl + customersRoute);
    httpClient.send();

    httpClient.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            customers = JSON.parse(httpClient.responseText);
            console.log(httpClient.responseText);

            customers.forEach((c, i) => {

                var row = table.insertRow(i);
                
                var cellNumber = row.insertCell(0);
                cellNumber.innerHTML = c.id;
        
                var cellModel = row.insertCell(1);
                cellModel.innerHTML = c.name;
            });
        }       
    }
}

function createCustomer(){

    if (!validateCustomersForm()){
        alert("Preencha os dados corretamente!");
        return;
    }

    let nameInput = document.getElementById("nameInput");

    let customer = {
        name: nameInput.value,
    }

    const httpClient = new XMLHttpRequest();
    httpClient.open("POST", salesServiceUrl + customersRoute);    
    httpClient.setRequestHeader("Content-Type", "application/json");
    httpClient.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            let table = document.getElementById("table-body");
            
            var row = table.insertRow(table.rows.length);
            
            var cellNumber = row.insertCell(0);
            cellNumber.innerHTML = table.rows.length;
    
            var cellModel = row.insertCell(1);
            cellModel.innerHTML = customer.name;
        }
    }

    httpClient.send(JSON.stringify(customer));    
}



function validateCustomersForm(){
    let nameInput = document.getElementById("nameInput");
    
    if (nameInput.value == null || nameInput.value == ""){
        return false;
    }
    return true;
}
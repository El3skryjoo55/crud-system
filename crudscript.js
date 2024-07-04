let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submet = document.getElementById('submet');
let changer = 'create';
let jo;




// get total price. 
function gettotal(){
    if(price.value || taxes.value || ads.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }else{
        total.innerHTML = '';
        total.style.background = 'red';
    }
}


// create product.
let datapro;
if (localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro =[];
}

submet.onclick =function() {
    let newpro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }

    if(changer === 'Create'){
        if(newpro.count > 1){
            for(let i = 0; i < newpro.count; i++){
                datapro.push(newpro);
            }
        }else{
            datapro.push(newpro);
        }
    }else{
        datapro[jo] = newpro;
        changer = 'Create';
        submet.innerHTML = 'Create';
        count.style.display = 'block';
    }

    

    // sace to local storage.
    localStorage.setItem('product',    JSON.stringify(datapro)); 
    cleardata();
    showdata();

}


// clear inputs after create.
function cleardata(){
    title.value = '';
    taxes.value = '';
    price.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read.

function showdata(){
    gettotal();
let table_ = '';
for (let i = 0; i < datapro.length; i++ ){
    table_ += `
    <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick='updatedata(${i})' id="update_btn">Update</button></td>
        <td><button onclick='deletedata(${i})' id="delete_btn">Delete</button></td>
    </tr>

`

}


    document.getElementById('tbody').innerHTML = table_ ;
    let btndelete = document.getElementById('deleteall');
    if (datapro.length > 0){
        btndelete.innerHTML = `
        <button onclick='deleteall()'>Delete All</button>
        `
    }else{
        btndelete.innerHTML = ``;
    }

}
// showdata(); ?
// delete.
//ooopopopopopopopopopopopopopopo
function deletedata(i){
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showdata()
}

function deleteall(){
    localStorage.clear()
    datapro.splice(0)
    showdata()
}

//count.





//update.

 function updatedata(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    gettotal();
    count.style.display='none';
    category.value = datapro[i].category;
    submet.innerHTML = 'Update your data';
    changer = 'Update';
    jo = i; // Very important.
    scroll({
        top:0,
        behavior:"smooth",
    })
 }


//search.

// let searchmood = 'title';
// function getsearchmood(){
//     let search =document.getElementById('search')
//     if (id == 'search_title'){
//         searchmood = 'title';
//         search.placeholder = 'Search by Title'
//     }else{
//         searchmood = 'category';
//         search.placeholder = 'Search by category'

//     }
//     search.focus()
// } 



//clean data.
 









// .............................
showdata()









// dont forget for delete all submet. 
//1:41 ..


// search 
let searchmood = 'title';
function getsearchmood(id){
    let search = document.getElementById('search');
    if(id == 'search_title'){
        searchmood = 'title';
        search.Placeholder = 'Search By Title';
    }else{
        searchmood = 'category';
        search.Placeholder = 'Search By category';
    }
    search.focus()

}

function searchdata(value){
    let table = '';
    if (searchmood == 'title'){

        for(let i =0; i < datapro.length;i++){
            if(datapro[i].title.includes(value)){
                table_ += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick='updatedata(${i})' id="update_btn">Update</button></td>
                    <td><button onclick='deletedata(${i})' id="delete_btn">Delete</button></td>
                </tr>
            
            ` 
            }
        }

    }else{
        for(let i =0; i < datapro.length;i++){
            if(datapro[i].category.includes(value)){
                table_ += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick='updatedata(${i})' id="update_btn">Update</button></td>
                    <td><button onclick='deletedata(${i})' id="delete_btn">Delete</button></td>
                </tr>
            
            ` 
            }
        }
    }
    document.getElementById('tbody').innerHTML = table_ ;
}
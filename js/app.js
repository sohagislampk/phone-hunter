
const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 12) {
        phones = phones.slice(0, 12);
        showAll.classList.remove('hidden');
    }

    else {
        showAll.classList.add('hidden');
    }

    const error = document.getElementById('error');
    if (phones.length === 0) {
        error.classList.remove('hidden');
    } else {
        error.classList.add('hidden');
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('m-3');
        phoneDiv.innerHTML = `
     
        <div class="card bg-base-100 shadow-xl">
                <figure class="px-10 pt-10">
                    <img src="${phone.image}" alt="" class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2/ class="text-1xl"> ${phone.phone_name}</h2>
                    <h2/ class="card-title">Brand : ${phone.brand}</h2>
                    
                    <div  class="card-actions">
                    <label onclick="loadPhoneDetails('${phone.slug}')" for="my-modal" class="btn modal-button">Details</label>
                    </div>
                </div>
            </div>
        
                `;
        phoneContainer.appendChild(phoneDiv);


    });
    toggleProcess(false);
}
//  search preocess function 
const processSearch = (dataLimit) => {
    toggleProcess(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);

}
// search button function 
document.getElementById('search-btn').addEventListener('click', function () {
    processSearch(10);
})

// Enter press search 
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
})
// show all button event litener 
document.getElementById('showall-btn').addEventListener('click', function () {
    processSearch();
})
// Loading process function 
const toggleProcess = isLoading => {
    const loading = document.getElementById('loading');
    if (isLoading) {
        loading.classList.remove('hidden');
    } else {
        loading.classList.add('hidden');
    }
}
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showPhoneDetails(data.data);
}
const showPhoneDetails = phone => {
    console.log(phone);
    const eachPhoneDetail = document.getElementById('modal-body');
    eachPhoneDetail.innerHTML = `
    <h3 class="font-bold text-lg">${phone.name}</h3>
    <div class="flex">
    <img src="${phone.image}" alt="" class="rounded-xl m-3" />
    <div>
    <h5 class="font-bold">Main Feature</h5>
    <p class="py-1">Brand : ${phone.brand}</p>
    <p class="py-1">Chip Set : ${phone.mainFeatures.chipSet}</p>
    <p class="py-1">Display Size : ${phone.mainFeatures.displaySize}</p>
    <p class="py-1">Memory : ${phone.mainFeatures.memory}</p>
    </div>
    </div>
    
     <div class="modal-action">
        <label for="my-modal" class="btn">Close</label>
    </div>
       
    `


}

loadPhone('a');

const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
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
                    
                    <div class="card-actions">
                        <button class="btn btn-primary">Details</button>
                    </div>
                </div>
            </div>
        
                `;
        phoneContainer.appendChild(phoneDiv);


    });
}
const processSearch = (dataLimit) => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);

}
document.getElementById('search-btn').addEventListener('click', function () {
    processSearch(10);
})

document.getElementById('showall-btn').addEventListener('click', function () {
    processSearch();
})

loadPhone('a');
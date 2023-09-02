localStorage.clear()

// const elements
const body = document.querySelector('body');

// ********* ICONS 
const moonIcon = document.querySelector('#moon');
const searchIcon = document.querySelector('.search-icon');
const chevIcon = document.querySelector('#chev')

// **** btns
const themeBtn = document.getElementById('change-theme'); 
const changeRegion = document.querySelector('.select-region');

// **** CONTAINERS
const headerContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.container');
const countriesContainer = document.querySelector('.countries-container');

// ****** COMPONENTS
const searchBar = document.querySelector('.search-bar');
const searchInput = document.querySelector('#search');

const regionFilterBox = document.querySelector('#regions-options');
const regionText = document.querySelector('.select-text')

let data;



// styles of different themes
const darkBackground = `var( --Very-Dark-Blue)`;
const darkElement = `var(--Blue)`;
const darkText = 'var(--White)';

const lightBackground = 'var( --Very-Light-Gray )'
const lightElement = `var(--White)`;
const lightText = 'var(--Dark-Blue)';


// **************  FUNCTIONS


// function to change theme
function changeTheme(e){
    const card = document.querySelectorAll('.card');

    e.preventDefault();

    if(this.value == 'light'){
        // change to dark theme
        
        headerContainer.style.backgroundColor = darkElement;
        body.style.color = darkText;
        moonIcon.setAttribute('name', 'moon');
        searchIcon.style.color = darkText;
        
        this.style.color = darkText;
        mainContainer.style.backgroundColor = darkBackground;
        body.style.backgroundColor = darkBackground;
        body.style.color = darkText;

        regionFilterBox.style.backgroundColor = darkElement;
        
        searchBar.style.backgroundColor = darkElement;
        searchInput.style.backgroundColor = darkElement;
        searchInput.style.color = darkText;
        
        card.forEach(cd=>{
            cd.style.backgroundColor = darkElement;
        })
        
        changeRegion.style.backgroundColor = darkElement;
        
        this.value = 'dark'
    } 
    else {
        
        headerContainer.style.backgroundColor = darkText;
        body.style.color = lightText;
        moonIcon.setAttribute('name', 'moon-outline');
        searchIcon.style.color = lightText;
        this.style.color = lightText;

        regionFilterBox.style.backgroundColor = lightElement;
        
        mainContainer.style.backgroundColor = lightBackground;
        body.style.backgroundColor = lightBackground;
        body.style.color = lightText;
        
        searchBar.style.backgroundColor = lightElement;
        searchInput.style.backgroundColor = lightElement;
        searchInput.style.color = lightText;

        card.forEach(cd=>{
            cd.style.backgroundColor = lightElement;
        })

        changeRegion.style.backgroundColor = lightElement;

        this.value = 'light'
    }
}

// function to show filter region box
function showRegionFilterBox(){
    console.log(this)
    if(this.value == 'hide'){
        chevIcon.name = "chevron-down-outline"

        regionFilterBox.style.transform = 'translateY(0px)';
        regionFilterBox.style.opacity= '1';
        
        this.value = 'show'
    }  else{
        chevIcon.name = "chevron-up-outline"

        regionFilterBox.style.transform = 'translateY(-1000px)';
        regionFilterBox.style.opacity= '0';
    
        this.value = 'hide'
    } 
}


// function to render all country takes array of objects of country as parameter
function renderAllCountries(countryArr){
    countriesContainer.innerHTML = '';

    countryArr.forEach(couObj => {
        const pop = new Intl.NumberFormat('en-US').format(couObj.population)

        const html = `
        <!-- card item -->
            <div class="card grid" data-numcode="${couObj.numericCode}">
                <img src="${couObj.flag}" alt="country flag" >
                <div class="details">
                    <h2 class="country-name">${couObj.name}</h2>
                    <ul class="country-dets">
                        <li><span class="det-key">Population</span>:<span class="det-value"> ${pop}</span> </li>
                        <li><span class="det-key">Region</span>: <span class="det-value">${couObj.region}</span> </li>
                        <li><span class="det-key">Capital</span>: <span class="det-value">${couObj.capital}</span> </li>
                    </ul>
                </div>
            </div>  
        <!-- card item end -->
        `

        countriesContainer.insertAdjacentHTML('beforeend', html)
    })
}


// function to render search country
function renderSearchedCountry(name){
    countriesContainer.innerHTML = '';
    const searchName = name[0].toUpperCase() + name.slice(1)

    const couObj = data.find(obj => obj.name == searchName);

    if(couObj == undefined){
        return
    }
    const pop = new Intl.NumberFormat('en-US').format(couObj.population)

    const html = `
        <!-- card item -->
            <div class="card grid" data-numcode="${couObj.numericCode}">
                <img src="${couObj.flag}" alt="country flag" >
                <div class="details">
                    <h2 class="country-name">${couObj.name}</h2>
                    <ul class="country-dets">
                        <li><span class="det-key">Population</span>:<span class="det-value"> ${pop}</span> </li>
                        <li><span class="det-key">Region</span>: <span class="det-value">${couObj.region}</span> </li>
                        <li><span class="det-key">Capital</span>: <span class="det-value">${couObj.capital}</span> </li>
                    </ul>
                </div>
            </div>  
        <!-- card item end -->
        `

        countriesContainer.insertAdjacentHTML('beforeend', html)
}

// function to render country on basis of region 
function filterRegion(region){
    const regData = data.filter(obj => obj.region == region);
    renderAllCountries(regData)
}


// ***************  LOGIC

// requesting file data
const request = new XMLHttpRequest();
request.open('GET', './data.json');
request.send();

// retrieving file data
request.addEventListener('load', ()=>{
    data  = JSON.parse(request.responseText);
})

changeRegion.value = 'hide';
// event handling

// rendering country on page load
window.addEventListener('load',()=>{
    renderAllCountries(data)
})

// changing theme
themeBtn.addEventListener('click', changeTheme);


// filter region animation
changeRegion.addEventListener('click', showRegionFilterBox);

// rendering country according to search
searchInput.addEventListener('keydown',(e)=>{
    if (e.key == 'Enter' && searchInput.value != ''){
        renderSearchedCountry(searchInput.value)
    }
    if(searchInput.value == '') renderAllCountries(data)
})

// storing card details on click
countriesContainer.addEventListener('click', (e)=>{
    const clickedCard = e.target.closest('.card').dataset.numcode;
    localStorage.setItem('card-numcode', clickedCard);
    if(!e.target.classList.contains('countries-container')) location.href = 'country.html'
    console.log(!e.target.classList.contains('countries-container'))
})

// rendering country according to region
regionFilterBox.addEventListener('click', (e)=>{
    if(e.target.value != undefined){
        if(e.target.textContent != 'Remove filter'){
            const region = e.target.textContent
            regionText.textContent = region;
            filterRegion(region)

        } else{
            regionText.textContent = 'Filter by Region';
            renderAllCountries(data)
        }
    }
    chevIcon.name = "chevron-up-outline"
    regionFilterBox.style.transform = 'translateY(-1000px)';
    regionFilterBox.style.opacity= '0';    
    changeRegion.value = 'hide'

})




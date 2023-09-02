 // const elements
const body = document.querySelector('body');

// ********* ICONS 
const moonIcon = document.querySelector('#moon');

// **** btns
const themeBtn = document.getElementById('change-theme'); 
const backBtn = document.querySelector('#go-back');

// **** CONTAINERS
const headerContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.container');
const dataContainer = document.querySelector('.data-container');
const flagContainer = document.querySelector('#flag');
const borderContainer = document.querySelector('.border-countries');

// const borderList = document.querySelectorAll('.border-country')
const countryName = document.querySelector('.country-name');
let borderList;


let data;

// getting country data from local API
const countryCode = localStorage.getItem('card-numcode');


// ******** FUNCTIONS
function changeTheme(){
    if(this.value == 'light'){
        // change to dark theme
        headerContainer.style.backgroundColor = darkElement;
        body.style.color = darkText;
        moonIcon.setAttribute('name', 'moon');
        
        if(borderList != undefined){
            
        }
        borderList.forEach(e =>{
            e.style.backgroundColor = darkElement; 
        })
        
        backBtn.style.backgroundColor = darkElement;
        backBtn.style.color = darkText;

        this.style.color = darkText;
        mainContainer.style.backgroundColor = darkBackground;
        body.style.backgroundColor = darkBackground;
        body.style.color = darkText;
        this.value = 'dark'
    } 
    else {
        headerContainer.style.backgroundColor = darkText;
        body.style.color = lightText;
        moonIcon.setAttribute('name', 'moon-outline');
        this.style.color = lightText;

        borderList.forEach(e =>{
            e.style.backgroundColor = lightElement; 
        })        

        backBtn.style.backgroundColor = lightElement;
        backBtn.style.color = lightText;

        mainContainer.style.backgroundColor = lightBackground;
        body.style.backgroundColor = lightBackground;
        body.style.color = lightText;
        this.value = 'light'
    }
}



// ********* LOGIC
// styles of different themes
const darkBackground = `var( --Very-Dark-Blue)`;
const darkElement = `var(--Blue)`;
const darkText = 'var(--White)';

const lightBackground = 'var( --Very-Light-Gray )'
const lightElement = `var(--White)`;
const lightText = 'var(--Dark-Blue)';    


// EVENT HANDLING
themeBtn.addEventListener('click', changeTheme)
backBtn.addEventListener('click', ()=>{
    location.href = 'index.html'
})


// ************** REQUESTING API DATA
// requesting file data
const request = new XMLHttpRequest();
request.open('GET', './data.json');
request.send();

// retrieving file data
request.addEventListener('load', ()=>{
    data = JSON.parse(request.responseText);

    // updating DOM after loading data
    const countryData = data.find(obj => obj.numericCode === countryCode);
    countryName.textContent = countryData.name;
    flagContainer.src = countryData.flag;

    dataContainer.innerHTML = ""
    const html = `
        <ul class="data-left">
            <li class="data"><span class="key">Native Name:</span> ${countryData.nativeName}</li>
            <li class="data"><span class="key">Population:</span> ${countryData.population}</li>
            <li class="data"><span class="key">Region:</span> ${countryData.region}</li>
            <li class="data"><span class="key">Sub Region:</span> ${countryData.subregion}</li>
            <li class="data"><span class="key">Capital:</span> ${countryData.capital}</li>
        </ul>
        <ul class="data-right">
            <li class="data"><span class="key">Top Level Domain:</span> ${countryData.topLevelDomain}</li>
            <li class="data"><span class="key">Currencies:</span> ${countryData.currencies[0].name}</li>
            <li class="data"><span class="key">Languages:</span> ${countryData.languages[0].name}</li>
        </ul>
    `

    dataContainer.insertAdjacentHTML('afterbegin', html)
    borderContainer.innerHTML = '';
    if (countryData.borders != undefined){
        countryData.borders.forEach(bord => {
            const html = `<li class="border-country">${bord}</li>`
            borderContainer.insertAdjacentHTML('beforeend',html)
        })
        borderList = document.querySelectorAll('.border-country')
    } else document.querySelector('.borders-data').style.opacity = 0


})





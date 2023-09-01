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
const card = document.querySelector('.card');

const regionFilterBox = document.querySelector('#regions-options');





// styles 
const darkBackground = `var( --Very-Dark-Blue)`;
const darkElement = `var(--Blue)`;
const darkText = 'var(--White)';

const lightBackground = 'var( --Very-Light-Gray )'
const lightElement = `var(--White)`;
const lightText = 'var(--Dark-Blue)';


// **************  FUNCTIONS
function changeTheme(e){
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
        
        card.style.backgroundColor = darkElement;
        
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
        
        card.style.backgroundColor = lightElement;

        changeRegion.style.backgroundColor = lightElement;

        this.value = 'light'
    }
}

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



// ***************  LOGIC

themeBtn.addEventListener('click', changeTheme);
changeRegion.value = 'hide';

changeRegion.addEventListener('click', showRegionFilterBox)


// requesting file data
const request = new XMLHttpRequest();
request.open('GET', './data.json');
request.send();

// retrieving file data
request.addEventListener('load', ()=>{
    JSON.parse(request.responseText).forEach(country =>{
        // console.log(country)
    });
})



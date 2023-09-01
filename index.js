// const elements
const body = document.querySelector('body');

// ********* ICONS 
const moonIcon = document.querySelector('#moon');
const searchIcon = document.querySelector('.search-icon');

// **** btns
const themeBtn = document.getElementById('change-theme'); 
const changeRegion = document.querySelector('.select-region');

// **** CONTAINERS
const headerContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.container');

// ****** COMPONENTS
const searchBar = document.querySelector('.search-bar');
const searchInput = document.querySelector('#search');




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
        
        searchBar.style.backgroundColor = darkElement;
        searchInput.style.backgroundColor = darkElement;
        searchInput.style.color = darkText;
        
        changeRegion.style.backgroundColor = darkElement;
 
        this.value = 'dark'
    } 
    else {
     
        headerContainer.style.backgroundColor = darkText;
        body.style.color = lightText;
        moonIcon.setAttribute('name', 'moon-outline');
        searchIcon.style.color = lightText;
        this.style.color = lightText;
        
        mainContainer.style.backgroundColor = lightBackground;
        body.style.backgroundColor = lightBackground;
        
        searchBar.style.backgroundColor = lightElement;
        searchInput.style.backgroundColor = lightElement;
        searchInput.style.color = lightText;
        
        changeRegion.style.backgroundColor = lightElement;

        this.value = 'light'
    }
}



// ***************  LOGIC

themeBtn.addEventListener('click', changeTheme);


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



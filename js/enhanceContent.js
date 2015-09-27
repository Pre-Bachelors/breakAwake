// TODO:
// on desktop view, change logo img's src to big logo, reduce nav icon to 25% of it's original size
// get part of the article

function enhanceContent_phone(data) {
    // get featured game name
    var gameContainer = document.querySelector('#featured-game');
    var gameLink = gameContainer.querySelectorAll('a')[0];
    var gameID = gameLink.dataset.game;

    // replace link with content to be displayed using data's object properties
    // remove link
    gameLink.parentNode.removeChild(gameLink);
    // create content
    var gameTitle = document.createElement('h3');
    gameTitle.innerHTML = data.games[gameID].title;
    var gameDescription = document.createElement('p');
    gameDescription.innerHTML = data.games[gameID].description;
    var gameIcon = document.createElement('img');
    gameIcon.src = 'img/' + data.games[gameID].icon;
    var gameBtn = document.createElement('button');
    gameBtn.innerHTML = 'Play now!';
    
    
    // on btn click redirect to game
    addEvent(gameBtn, 'click', function() {
        window.location.replace('/games/' + gameID + '.html');
    });
    
    // add content to page
    gameContainer.appendChild(gameIcon);
    gameContainer.appendChild(gameTitle);
    gameContainer.appendChild(gameDescription);
    gameContainer.appendChild(gameBtn);
    
    return gameID; // return gameID so it can be used by other functions
}







function enhanceContent_phoneTablet(data, gameID) {
    // add more games btn
    var gameContainer = document.querySelector('#featured-game');
    var moreGames = document.createElement('button');
    moreGames.innerHTML = 'More Games';
    gameContainer.insertBefore(moreGames, document.querySelector('#featured-game button'));
    
    // on btn click redirect to game
    addEvent(moreGames, 'click', function() {
        window.location.replace('games.html');
    });
    
    // add 'Read Up' section    
    var readUpSection = document.createElement('section');
    readUpSection.id = 'read-up';
    var readUpHeading = document.createElement('h2');
    readUpHeading.innerHTML = 'Read Up';
    var readUpTitle = document.createElement('a');
    readUpTitle.href = '/articles/' + gameID + '.html';
    readUpTitle.innerHTML =  data.games[gameID].title + ' Post-Mortem';
                                                                    // TODO get part of the article (first 3 or so sentences)
    readUpSection.appendChild(readUpHeading);
    readUpSection.appendChild(readUpTitle);
    document.querySelector('main').appendChild(readUpSection);
    
    
    // reduce nav icon to 75% of it's original size
    var nav = document.querySelector('nav');
    nav.style.width = '40px';
    nav.style.height = '38px';
    
    // add nav text box (and search btn)
    var navText = document.createElement('input');
    navText.setAttribute('type', 'text');
    navText.setAttribute('value', '');
    navText.setAttribute('name', 'search');
    var navBtn = document.createElement('button');
    document.querySelector('header').insertBefore(navBtn, nav);
    document.querySelector('header').insertBefore(navText, nav);
}






function enhanceContent_tabletLaptop() {
    // add subtitle to the header
    var header = document.querySelector('header');
    var subtitle = document.createElement('h2');
    subtitle.textContent = 'a HTML5 game development team';
    header.appendChild(subtitle);
    
    // add nav bar
    var navItems = ['home', 'about', 'games', 'contact', 'more'];
    var navBar = document.createElement('ul');
    // find currently active navItem, to make it active in new nav bar
    var activeItem = document.querySelector('.active').textContent; 
    for (index in navItems) {
        // create new item
        var currentItem = navItems[index];
        var item = document.createElement('li');
        var itemLink = document.createElement('a');
        itemLink.href = currentItem;
        itemLink.textContent = currentItem;
        // add active class
        if (currentItem == activeItem) {
            item.setAttribute('class', 'active');
        }
        item.appendChild(itemLink);    
        navBar.appendChild(item);       
    }
    header.insertBefore(navBar, document.querySelector('header img'));
    
    // remove nav icon
    var nav = document.querySelector('nav');
    nav.parentNode.removeChild(nav);
}







function enhanceExperience(data) {
    var gameID = enhanceContent_phone(data);
    // check for 'phone/tablet view'
    if (window.matchMedia("only screen and (min-width: 45.75em)").matches) {
        enhanceContent_phoneTablet(data, gameID);
    }
    // check for tablet/laptop view 
    if (window.matchMedia("only screen and (min-width: 52.5em)").matches) {
        enhanceContent_tabletLaptop();
    }
    // check for 'desktop view'
}







// enhance experience - check for 'mobile portrait view'
if (window.matchMedia("only screen and (min-width: 30em) and (min-height: 20em)").matches) {
    // add featured game
    request = new XMLHttpRequest();
    request.open('GET', 'js/games.json', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400){
            // Success!
            data = JSON.parse(request.responseText);
            enhanceExperience(data);
        }
    };

    request.send();
} else if (window.matchMedia("only screen and (max-width: 31.25em) and (min-height: 32.5em)").matches) {
    // add featured game
    request = new XMLHttpRequest();
    request.open('GET', 'js/games.json', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400){
            // Success!
            data = JSON.parse(request.responseText);
            enhanceExperience(data);
        }
    };

    request.send();
}
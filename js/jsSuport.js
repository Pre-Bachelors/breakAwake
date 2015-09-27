/* 
 * Ensures that css for progressively enhanced content is
 * only download if content can be enhanced via javascript
 * (because this script will only run if js is supported)
 */

function addCSS(css) {
    var head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
}

var css = '';
addCSS(css);

let el = /* get your el */

let top = el.getBoundingClientRect().top + 
          el.ownerDocument.defaultView.pageYOffset

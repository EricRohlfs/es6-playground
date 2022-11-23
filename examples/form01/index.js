
import { checkoutForm01 } from './checkoutForm01.js'
import { checkoutForm02 } from './checkoutForm02.js'
import { checkoutForm03 } from './checkoutForm03.js'

export class checkoutFormStyle extends HTMLStyleElement {
  connectedCallback(){
    this.innerHTML = `
      input:invalid {
        border: 2px dashed red;
      }

      input:valid {
        border: 2px solid black;
      }
    `
  }
}

customElements.define('checkout-form-01', checkoutForm01, { extends: 'form'})
customElements.define('checkout-form-02', checkoutForm02, { extends:'form' })
customElements.define('checkout-form-03', checkoutForm03, { extends:'form' })
customElements.define('checkout-form-style', checkoutFormStyle, { extends:'style'})
document.body.append(new checkoutForm01())
document.body.append(new checkoutForm02())
document.body.append(new checkoutForm03())
document.head.append(new checkoutFormStyle)
export class checkoutForm03 extends HTMLFormElement {

  constructor(){
    super()
    // it is a good idea to have the a default version of the model in the constructor this will prevent any undefined errors later in the template or in any calculations.
    const defaultModel = {
      price: 0,
      quantity: 0,
      total: 0
    }

    const self = this // yeah, not ideal but works till I find a better way
    this.model = new Proxy(defaultModel, {
      get(obj, prop) {
        return prop in obj ? obj[prop]:null
      },
      set(obj, prop, value) {
        if(!(prop in obj)) return
        if(obj[prop] === value) return
         // we could check and cast any strings to int's here as well
        obj[prop] = value;
        obj.total = obj.price * obj.quantity // update the model
        self.querySelector(':scope #total').setAttribute('value', self.model.total) // update the DOM
        return true
      }
    })
  }

  connectedCallback(){
    this.innerHTML = this.templateLit()
    this.addEventListener('change', (evt)=>{
      // const tempModel = Object.fromEntries(new FormData(this).entries())
      const propName = evt.target.name
      this.model[propName] = evt.target.value
    })
  }

  templateLit(){
    // in production data/model needs to be sanitized
    return `
      <h3>Option #3 Example</h3>
      <p>Only update the total when price or quantity changes using proxies.</p>
      <div>
        <label for="price">Price</label>
        <input type="number" name="price" value="${this.model.price}" required />
      </div>
      <div>
        <label for="quantity">Quantity</label>
        <input type="number" name="quantity" value="${this.model.quantity}" required />
      </div>
      <div>
        <label for="total">Total</label>
        <input readonly id="total" type="text" name="total" value="${this.model.total}" />
      </div>
    `
  }

}
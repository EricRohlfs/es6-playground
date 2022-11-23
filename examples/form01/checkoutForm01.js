export class checkoutForm01 extends HTMLFormElement {

  constructor(){
    super()
    // it is a good idea to have the a default version of the model in the constructor this will prevent any undefined errors later in the template or in any calculations.
    this.model = {
      price: 0,
      quantity: 0,
      total:0
    }
  }

  connectedCallback(){
    this.innerHTML = this.templateLit()
    this.addEventListener('change', ()=>{
      this.model = Object.fromEntries(new FormData(this).entries())
      this.innerHTML = this.templateLit()
    })
  }

  templateLit(){
    // in production data/model needs to be sanitized
    return `
      <h3>Option #1 Example</h3>
      <p>re-render the entire form innerHtml on each change/update</p>
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
        <input readonly id="total" type="text" name="total" value="${this.model.price * this.model.quantity}" />
      </div>
    `
  }

}
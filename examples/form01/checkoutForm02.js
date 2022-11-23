export class checkoutForm02 extends HTMLFormElement {

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
    this.calculateTotal() // need to re-calculate just incase the data is being retrieved form sessionStorage or from a server.
    this.innerHTML = this.templateLit()
    this.addEventListener('change', ()=>{
      this.model = Object.fromEntries(new FormData(this).entries())
      this.updateComputedValues()
    })
  }

  calculateTotal(){
    this.model.total = this.model.price * this.model.quantity
  }

  updateComputedValues(){
    this.calculateTotal()
    const totalEle = this.querySelector(':scope #total')
    totalEle.setAttribute('value', this.model.total)
  }

  templateLit(){
    // in production data/model needs to be sanitized
    return `
      
      <h3>Option #2 Example</h3>
      <p>Only update the total when price or quantity changes</p>
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
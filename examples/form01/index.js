export class checkoutForm extends HTMLFormElement {

  constructor(){
    super()
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
      <p>
        Forms with computed values should update the computed value as data in the form changes.
        We have a few options to make this happen.
        <br/>
        <b>Options</b>
        <ol>
          <li>We could re-run the whole template on each change, this way we don't have to know too much about our form and the code stays fairly simple and is mostly reusable boilerplate. 
              This works when there are no external mutation observers watching component elements. We would need to keep track of the input focus (easy enough) and we need to make sure we are cleaning up any eventListeners so we don't have a memory leak.</li>
          <li> Or we can update just the value that needs to change. This requires us to write more code specific to the form we are manking, but in the end the coding time is trivial, but we do need to keep track of the timing of events.</li>
        </ol>
        This example shows option #2.
        </p>
        <p>
        In an option #1 example we wouldn't need to have a total in our model, we can just calculate it in the template.
        We would not need the updateComputedValues method either.
      </p>
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
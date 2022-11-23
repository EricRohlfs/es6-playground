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
    // the commented out code below works, but has focus issues. The other examples use this code, but do not have focus issues because the DOM is not being re-rendered.
    // this.addEventListener('change', (evt)=>{
    //   this.model = Object.fromEntries(new FormData(this).entries())
    //   this.innerHTML = this.templateLit()
    // })
    this.addEvents()
  }

  addEvents(){
    Array.from(this.elements).forEach(input=>{
      input.addEventListener('input', (evt)=> {
          const inputName = evt.target.name
          const selectionStart = evt.target.selectionStart
          this.model = Object.fromEntries(new FormData(this).entries())
          this.innerHTML = this.templateLit() // wipe out old DOM and then reset the focus
          const focusTo = this.querySelector(`:scope [name='${inputName}']`)
          focusTo.setSelectionRange(selectionStart, selectionStart)
          focusTo.focus()
          this.addEvents()
        })
      })
  }

  templateLit(){
    // in production data/model needs to be sanitized
    // this templateLit differs from the others in that the input types are text
    // the strategy used for focus does not work on type="number"
    // this also behaves a bit differently in that total updates on every keyup where the others only update when you tab or click out.
    return `
      <h3>Option #1 Example</h3>
      <p>re-render the entire form innerHtml on each change/update</p>
      <div>
        <label for="price">Price</label>
        <input type="text" name="price" value="${this.model.price}" required />
      </div>
      <div>
        <label for="quantity">Quantity</label>
        <input type="text" name="quantity" value="${this.model.quantity}" required />
      </div>
      <div>
        <label for="total">Total</label>
        <input readonly id="total" type="text" name="total" value="${this.model.price * this.model.quantity}" />
      </div>
    `
  }

}
class TextAndButton {
  constructor (rowValues) {
    this.rowValues = rowValues
    this.value = rowValues.querySelector('div#value-changeable')
    this.button = rowValues.querySelector('button#value-edit-button')
    this.button.addEventListener('click', () => {this.editClick()})
  }
  editClick() {
    let valueTextEdit = this.value.innerHTML
  
    this.value.innerHTML = '<input id="value-changeable-input" type="text" placeholder="' + valueTextEdit + '">'
    this.button.outerHTML = '<button id="value-save-button" type="button">Save</button>'
  
  
    this.button = this.rowValues.querySelector('button#value-save-button')
    this.button.addEventListener('click', () => {this.saveClick()})
  }
  saveClick() {
    let valueTextSave = this.rowValues.querySelector('input#value-changeable-input').value
  
    this.value.innerHTML =  valueTextSave
    this.button.innerHTML = 'Edit'
    this.button.id = 'value-edit-button'

    this.button = this.rowValues.querySelector('button#value-edit-button')
    this.button.addEventListener('click', () => {this.editClick()})
  }
}
// class Row {
//   constructor (valueRow) {
//     this.textAndButton = new TextAndButton(valueRow.querySelector('div#value-row'))
//     this.valueRow = valueRow
//   }
// }

// class ValueRow extends Row{
//   constructor (valueRow) {
//     super(valueRow, textAndButton)
//     this.valueRow.addEventListener('dragstart', () => {
//       this.valueRow.classList.add('dragging')
//     })

//     this.valueRow.addEventListener('dragend', () => {
//       this.valueRow.classList.remove('dragging')
//     }) 
//   }
// }

class ValueRow {
  constructor (valueRow) {
    this.textAndButton = new TextAndButton(valueRow.querySelector('div#value-row'))
    this.valueRow = valueRow
    this.valueRow.addEventListener('dragstart', () => {
      this.valueRow.classList.add('dragging')
    })

    this.valueRow.addEventListener('dragend', () => {
      this.valueRow.classList.remove('dragging')
    }) 
  }
}

const valuesDrags = document.querySelectorAll('.value-draggable')

valuesDrags.forEach(valuesDrag => {
  new ValueRow(valuesDrag)
})
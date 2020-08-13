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

class Row {
  constructor (valueRow) {
    this.valueRow = valueRow
    this.textAndButton = new TextAndButton(this.valueRow.querySelector('div#value-row'))
  }
}

class HeaderRow extends Row{
  constructor (headerRow){
    super(headerRow)
  }
}

// git commit -m "adding workable add button and saveing capabilies" 

class ValueRow extends Row{
  constructor (valueRow) {
    super(valueRow)
    this.valueRow.addEventListener('dragstart', () => {
      console.log('Working') // This is for debug
      this.valueRow.classList.add('dragging')
    })

    this.valueRow.addEventListener('dragend', () => {
      this.valueRow.classList.remove('dragging')
    }) 
  }
}

class AddRow extends Row{
  constructor (addRow) {
    super(addRow)
  }
}

class ValueBody {
  constructor (valueBody) {
    this.valuesDrags = valueBody.querySelectorAll('tr.value-draggable')
    this.addRow = new AddRow(valueBody.querySelector('tr.add-row'))
    this.valuesDrags.forEach(valueRow => {
      let x = new ValueRow(valueRow)
    })
  }
}

class ValueTable {
  constructor (valueTable) {
    this.valueTable = valueTable
    this.headerRows = new HeaderRow(valueTable.querySelector('thead#value-head>tr'))
    this.valueBody = new ValueBody(valueTable.querySelector('tbody#value-body'))
  }
  saveTable() {
    let categoryEle = this.valueTable.querySelector('div.category')
    let valuesEle = this.valueTable.querySelectorAll('div.value')
    let categoryText = categoryEle.innerHTML
    let tableEntry = {
      'category' : categoryText,
      'values' : []
    }
    valuesEle.forEach(valueEle => {
      let valueText = valueEle.innerHTML
      tableEntry.values.push(valueText)
    })
    return tableEntry
  }
}

class AllValueTables {
  constructor (tablesContainer) {
    this.tablesContainer = tablesContainer
    this.organEntry = []
    this.allTables = this.tablesContainer.querySelectorAll('table')
    this.saveTables()
    this.allEditButtons = this.tablesContainer.querySelectorAll('button#value-edit-button')

  }

  saveTables() {
    this.organEntry = []
    this.allTables.forEach(valueTable => {
      let table = new ValueTable(valueTable)
      let tableEntry = table.saveTable()
      this.organEntry.push(tableEntry)
    })
  }

  saveButton() {
    console.log(this.organEntry)
    this.allEditButtons.forEach(editButton => {
      editButton.addEventListener('click', () => {
        let saveButton = editButton.querySelector('button#value-save-button')
        saveButton.addEventListener('click', () => this.saveTables())
      })
    })
    console.log(this.organEntry)
  }
}


const tablesContainer = document.querySelector('div#tables-container')
const allValueTables = new AllValueTables(tablesContainer)
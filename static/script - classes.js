class TextAndButton {
  constructor (rowValues) {
    this.rowValues = rowValues
    this.value = rowValues.querySelector('div#value-changeable')
    this.button = rowValues.querySelector('button#value-edit-button')
    this.button.addEventListener('click', () => {this.editClick()})
  }
  editClick() {
    if (this.button.innerHTML != '+') {
      this.valueTextEdit = this.value.innerHTML
    }else if (this.button.innerHTML == '+') {
      this.valueTextEdit = 'New Value'
    }

    this.value.innerHTML = '<input id="value-changeable-input" type="text" placeholder="' + this.valueTextEdit + '">'
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

class ValueRow extends Row{
  constructor (valueRow) {
    super(valueRow)
    this.valueRow.addEventListener('dragstart', () => {
      // console.log('Working') // This is for debug
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
    this.valueBody = valueBody
    this.valuesDrags = valueBody.querySelectorAll('tr.value-draggable')
    this.addRow = valueBody.querySelector('tr.add-row')
    this.addRowClass = new AddRow(this.addRow)
    this.addButton = this.addRow.querySelector('button#value-edit-button')
    console.log(this.addButton.innerHTML)
    this.valuesDrags.forEach(valueRow => {
      let x = new ValueRow(valueRow)
    })
    this.valueBody.addEventListener('dragover', e => {
      e.preventDefault()
      const afterElement = this.moveValue(this.valueBody, e.clientY)
      const draggable = document.querySelector('.dragging')
      if (afterElement == null) {
          this.valueBody.appendChild(draggable)
        } else {
          this.valueBody.insertBefore(draggable, afterElement)
        }
    })
    // this.addButton.addEventListener('click', )
  }
  moveValue(table, y) {
    const draggableValues = [...table.querySelectorAll('.value-draggable:not(.dragging)')]
    
    return draggableValues.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child }
        } else {
          return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
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
    this.allTables.forEach(valueTable => {new ValueTable(valueTable)})
    // this.saveTables()
    this.allEditButtons = this.tablesContainer.querySelectorAll('button#value-edit-button')

  }

  // saveTables() {
  //   this.organEntry = []
  //   this.allTables.forEach(valueTable => {
  //     let table = new ValueTable(valueTable)
  //     let tableEntry = table.saveTable()
  //     this.organEntry.push(tableEntry)
  //   })
  // }

  // saveButton() {
  //   console.log(this.organEntry)
  //   this.allEditButtons.forEach(editButton => {
  //     editButton.addEventListener('click', () => {
  //       let saveButton = editButton.querySelector('button#value-save-button')
  //       saveButton.addEventListener('click', () => this.saveTables())
  //     })
  //   })
  //   console.log(this.organEntry)
  // }
}

// SAVE CHANGES
function saveValues() {
  let tablesCurrent = document.querySelectorAll('table')
  let orgEntry = []
  tablesCurrent.forEach(table => {
    let categoryEle = table.querySelector('div.category')
    let valuesEle = table.querySelectorAll('div.value')
    let categoryText = categoryEle.innerHTML
    let tableEntry = {
      'category' : categoryText,
      'values' : []
    }
    valuesEle.forEach(valueEle => {
      let valueText = valueEle.innerHTML
      tableEntry.values.push(valueText)
    })
    orgEntry.push(tableEntry)
  })
  // console.log(orgEntry)
  fetch(window.origin + '/update-values', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(orgEntry),
    cache: 'no-cache',
    headers: new Headers({
      'content-type': 'application/json'
    })
  })
}
// 

const tablesContainer = document.querySelector('div#tables-container')
const allValueTables = new AllValueTables(tablesContainer)
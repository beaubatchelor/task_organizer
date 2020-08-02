const valuesDrag = document.querySelectorAll('.value-draggable')
const tableBodies = document.querySelectorAll('#value-body')
const valueRows = document.querySelectorAll('div#value-row')
const tables = document.querySelectorAll('table')


// ADD VALUES
function rowChange(tableRow) {
  tableRow.classList.remove('new-row')
  tableRow.classList.add('value-draggable')
  tableRow.setAttribute('draggable', 'true')
}

tables.forEach(table => {
  let rowLen = table.querySelectorAll('tr').length
  let tr = table.insertRow(rowLen)
  let td = tr.insertCell(0)
  let containerDiv = document.createElement('div')
  let rowDiv = document.createElement('div')
  let colTextDiv = document.createElement('div')
  let colButDiv = document.createElement('div')
  let addButton = document.createElement('button')

  tr.classList.add('new-row')
  containerDiv.classList.add('container')
  rowDiv.classList.add('row')
  rowDiv.setAttribute('id', 'value-row')
  colTextDiv.classList.add('col-9')
  colTextDiv.setAttribute('id', 'value-changeable')
  colButDiv.classList.add('col-3')
  addButton.classList.add('value-button')
  addButton.setAttribute('id', 'value-add-button')
  addButton.setAttribute('type', 'button')
  addButton.innerHTML = '+'


  colButDiv.appendChild(addButton)
  rowDiv.appendChild(colTextDiv)
  rowDiv.appendChild(colButDiv)
  containerDiv.appendChild(rowDiv)
  td.appendChild(containerDiv)

  let newButton = table.querySelector('button#value-add-button')
  newButton.setAttribute('id', 'value-edit-button')
  newButton.addEventListener('click', () => {
    rowChange(tr)
    editClick(rowDiv)
  })
  // newButton.addEventListener('click', editClick(rowDiv))
})
// 

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

// BUTTONS CLICK FUNCITION
function editClick(valueRow) {
  let valueTextEleEdit = valueRow.querySelector('div#value-changeable')
  let valueButtonEleEdit = valueRow.querySelector('button#value-edit-button')
  let valueTextEdit = valueTextEleEdit.innerHTML

  valueTextEleEdit.innerHTML = '<input id="value-changeable-input" type="text" placeholder="' + valueTextEdit + '">'
  valueButtonEleEdit.outerHTML = '<button id="value-save-button" type="button">Save</button>'


  let newButtonEle = valueRow.querySelector('button#value-save-button')
  newButtonEle.addEventListener('click', () => {
    saveClick(valueRow)
    saveValues()
  })
}

function saveClick(valueRow) {
  let valueTextEleSave = valueRow.querySelector('div#value-changeable')
  let valueButtonEleSave = valueRow.querySelector('button#value-save-button')
  let valueTextSave = valueRow.querySelector('input#value-changeable-input').value

  valueTextEleSave.innerHTML =  valueTextSave
  valueButtonEleSave.innerHTML = 'Edit'
  valueButtonEleSave.id = 'value-edit-button'

  let newButtonEle = valueRow.querySelector('button#value-edit-button')
  newButtonEle.addEventListener('click', () => {editClick(valueRow)})
}

valueRows.forEach(valueRow => {
  const valueButtonEle = valueRow.querySelector('button#value-edit-button')
  valueButtonEle.addEventListener('click', () => {editClick(valueRow)})
})
// 


// ROW MOVEMENT FUNCITION
valuesDrag.forEach(valuesDrag => {
    valuesDrag.addEventListener('dragstart', () => {
        valuesDrag.classList.add('dragging')
    })

    valuesDrag.addEventListener('dragend', () => {
        valuesDrag.classList.remove('dragging')
    })
})

tableBodies.forEach(table => {
    table.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = moveValue(table, e.clientY)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
            table.appendChild(draggable)
          } else {
            table.insertBefore(draggable, afterElement)
          }
    })
})

function moveValue(table, y) {
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
// 
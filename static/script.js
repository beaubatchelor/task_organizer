const valuesDrag = document.querySelectorAll('.value-draggable')
const tables = document.querySelectorAll('#value-body')
const valueRows = document.querySelectorAll('div#value-row')

function editClick(valueRow) {
  let valueTextEleEdit = valueRow.querySelector('div#value-changeable')
  let valueButtonEleEdit = valueRow.querySelector('button#value-edit-button')
  let valueTextEdit = valueTextEleEdit.innerHTML

  valueTextEleEdit.outerHTML = '<div class="col-9" id="value-changeable"><input id="value-changeable-input" type="text" placeholder="' + valueTextEdit + '"></div>'
  valueButtonEleEdit.outerHTML = '<button id="value-save-button" type="button">Save</button>'

  let newButtonEle = valueRow.querySelector('button#value-save-button')
  newButtonEle.addEventListener('click', () => {saveClick(valueRow)});
};

function saveClick(valueRow) {
  let valueTextEleSave = valueRow.querySelector('div#value-changeable')
  let valueButtonEleSave = valueRow.querySelector('button#value-save-button')
  let valueTextSave = valueRow.querySelector('input#value-changeable-input').value

  valueTextEleSave.outerHTML = '<div class="col-9" id="value-changeable">' + valueTextSave + '</div>'
  valueButtonEleSave.outerHTML = '<button id="value-edit-button" type="button">Edit</button>'

  let newButtonEle = valueRow.querySelector('button#value-edit-button')
  newButtonEle.addEventListener('click', () => {editClick(valueRow)});
};



valueRows.forEach(valueRow => {
  const valueButtonEle = valueRow.querySelector('button#value-edit-button')
  valueButtonEle.addEventListener('click', () => {editClick(valueRow)})
})




valuesDrag.forEach(valuesDrag => {
    valuesDrag.addEventListener('dragstart', () => {
        valuesDrag.classList.add('dragging')
    })

    valuesDrag.addEventListener('dragend', () => {
        valuesDrag.classList.remove('dragging')     
    })
})

tables.forEach(table => {
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
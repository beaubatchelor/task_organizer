const valuesDrag = document.querySelectorAll('.value-draggable')
const tables = document.querySelectorAll('#value-body')
const valueRows = document.querySelectorAll('div#value-row')


valueRows.forEach(valueRow => {
  let counter = 1
  if (counter % 2) {
    let valueTextEle = valueRow.querySelector('div#value-changeable')
    let valueButtonEditEle = valueRow.querySelector('button#value-edit-button')
    let valueText = valueTextEle.innerHTML
    
    valueButtonEditEle.addEventListener('click', () => {
      valueTextEle.outerHTML = '<div class="col-9" id="value-changeable"><input type="text" placeholder="' + valueText + '"></div>'
      valueButtonEditEle.outerHTML = '<button id="value-save-button" type="button">Save</button>'
    })

    counter = ++counter
  } else {
    let valueButtonSaveEle = valueRow.querySelector('button#value-save-button')
    let valueChangeTextEle = valueRow.querySelector('div#value-changeable')
    let valueChangeTex = valueChangeTextEle.innerHTML

    valueButtonSaveEle.addEventListener('click', () => {
      valueChangeTextEle.outerHTML = '<div class="col-9" id="value-changeable"><h5>"' + valueChangeTex + '"</h5></div>'
      valueButtonSaveEle.outerHTML = '<button id="value-edit-button" type="button">Edit</button>'
    })
    counter = ++counter
  }
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
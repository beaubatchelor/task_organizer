const valuesDrag = document.querySelectorAll('.value-draggable')
const tables = document.querySelectorAll('#value-body')
// const editButtons = document.querySelectorAll('#value-button')

// editButtons.forEach(editButtons => {
//   editButtons.addEventListener('click', e => {

//   })
// })





valuesDrag.forEach(valuesDrag => {
    valuesDrag.addEventListener('dragstart', () => {
        valuesDrag.classList.add('dragging')
        console.log(valuesDrag.outerHTML)
    })

    valuesDrag.addEventListener('dragend', () => {
        valuesDrag.classList.remove('dragging')     
        console.log(valuesDrag.outerHTML)
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
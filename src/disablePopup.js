document.addEventListener("dblclick", (e) => {
  e.preventDefault()
  e.stopPropagation()
  return false
})

document.addEventListener("contextmenu", (e) => {
  e.preventDefault()
  return false
})

document.addEventListener("keydown", (e) => {
  if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I") || (e.ctrlKey && e.key === "u")) {
    e.preventDefault()
    return false
  }
})

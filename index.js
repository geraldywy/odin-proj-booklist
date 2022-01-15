const addBookBtn = document.querySelector('.add-book-btn')
const addBookFormPage = document.querySelector('.add-form-page')
addBookBtn.addEventListener('click', () => {
  addBookFormPage.classList.remove('hide')
})

const closeBtn = document.querySelector('.close-form-btn')
closeBtn.addEventListener('click', () => {
  addBookFormPage.classList.add('hide')
})

const addBookForm = document.querySelector('.add-book-form')
addBookForm.addEventListener('click', (e) => {
  e.stopPropagation() // prevent propagation to outside form container, when user interacts within the bounds of the form
})

addBookFormPage.addEventListener('click', () => { // when clicked on background, infer hide
  addBookFormPage.classList.add('hide')
})

let booklist = [newBook("sample", "some guy", true)]

const list = document.querySelector('.book-list')
const updateBookListDom = () => {  // could be optimised, instead of always rewriting the list
  while (list.lastChild) {
    list.removeChild(list.lastChild)
  }
  for (let i in booklist) {
    const entry = document.createElement('li')
    entry.innerHTML = `
    <li class="book-item">
      <h2 class="book-title">
        ${booklist[i].title}
      </h2>
      <p>Author: ${booklist[i].author}</p>
      <div class="read-info">
        <p class="read-status ${booklist[i].read ? 'read': ''}" data-attribute=${i}>${booklist[i].read ? 'read': 'unread'}</p>
        <label class="switch">
          <input type="checkbox" data-attribute=${i} ${booklist[i].read ? 'checked': ""}>
          <span class="slider round"></span>
        </label>
      </div>
      <button class="delete-btn" data-attribute=${i}>Delete</button>
    </li>
    `
    list.appendChild(entry)

    const entryCheckbox = document.querySelector(`input[data-attribute="${i}"]`)
    const readText = document.querySelector(`.read-status[data-attribute="${i}"]`)
    const deleteBtn = document.querySelector(`.delete-btn[data-attribute="${i}"]`)
    entryCheckbox.addEventListener('click', () => {
      if (readText.classList.contains('read')) {
        readText.textContent = "unread"
      } else {
        readText.textContent = "read"
      }
      readText.classList.toggle('read')
    })
    deleteBtn.addEventListener('click', () => {
      booklist.splice(parseInt(deleteBtn.getAttribute("data-attribute")), 1)
      updateBookListDom()
    })
  }
}

// init the inital sample book list
updateBookListDom()

const submitBtn = document.querySelector('.submit-btn')
const bookTitleInput = document.getElementById('book-title')
const bookTitleAuthor = document.getElementById('book-author')
const bookIsRead = document.getElementById('read-checkbox')

submitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  booklist = booklist.concat(newBook(bookTitleInput.value, bookTitleAuthor.value, bookIsRead.checked))
  updateBookListDom(booklist)
  addBookForm.reset()
  addBookFormPage.classList.add('hide')
})

function newBook(title, author, read) {
  return {
    title, author, read
  }
}


import { QuizzListPage } from "./lista-quizz.js"

export const renderBody = (page) => {
    const main = document.querySelector('#main')
    if (main.children.length >= 1) {
        main.innerHTML = ''
    }
    main.appendChild(page)
}

export const userQuizzes = [];

(() => {
    QuizzListPage()
})()


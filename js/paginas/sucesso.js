import { renderBody } from "../app.js"
import { QuizzBasicPage } from "./info-basica.js"
import { QuizzListPage } from "./lista-quizz.js"

export const SuccessQuizzPage = (basicFormData) => {
    const sucessPage = Page(basicFormData)
    renderBody(sucessPage.render())
    sucessPage.goToHome()
    sucessPage.accessQuizzPage()
}

const Page = (basicFormData) => {

    const render = () => {
        const page = document.createElement('div')
        page.classList.add('container')
        page.classList.add('container-sucesso')

        page.innerHTML = `
            <h2>Seu quizz está pronto</h2>
            <div class="imagem">
                <p>${basicFormData?.titulo}</p>
                <img src="${basicFormData?.urlImagem || ''} ">
            </div>
            <button class="acessar-quizz">Acessar quiz</button>
            <a class="home" href="">Voltar para home</a>
        `
        return page
    }

    const goToHome = () => {
        const link = document.querySelector('.home')
        link.onclick = (e) => {
            e.preventDefault()
            QuizzListPage()
        }
    }

    const accessQuizzPage = () => {
        const button = document.querySelector('.acessar-quizz')
        button.onclick = () => {

        }
    }

    return { render, goToHome, accessQuizzPage }
}


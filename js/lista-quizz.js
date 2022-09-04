import { QuizzApi } from './api.js'
import { renderBody } from './app.js'
import { QuizzBasicPage } from './info-basica.js'
import { storageUserData } from './user-storage.js'


export const QuizzListPage = async () => {
    const api = QuizzApi()
    const ids = storageUserData().getIds()
    const userQuizzes = []

    try {
        for (let i = 0; i < ids.length; i++) {
            const userQuizz = await api.getOneQuizz(ids[i])
            userQuizzes.push(userQuizz)
            console.log(userQuizz)
        }

        const getAllQuizzes = await api.getAllQuizzes()
        const quizzListPage = Page(getAllQuizzes, userQuizzes)

        renderBody(quizzListPage.render())
        quizzListPage.createQuizz()

    } catch (e) {
        console.log(e)
    }


}


const Page = (quizzesData, userQuizzes) => {

    const render = () => {
        const page = document.createElement('div')
        page.classList.add('container')
        page.classList.add('container-lista-quizz')

        console.log(userQuizzes)


        page.innerHTML = `
            ${!userQuizzes?.length ? `
                <div class="criaçao-quizz">
                    <p>Você não criou nenhum quizz ainda :(</p>
                    <button onclick="IrTelaCriaçãoDeQuizzes()" class="botao-criar-quizz">Criar Quizz</button>
                </div> `
                : `
                <div class="titulo-seus-quizzes">
                    <h2>Seus quizzes</h2>
                    <ion-icon class="add-icon-button" name="add-circle"></ion-icon>
                </div>
                <div class="caixa-seus-quizzes">
                    <div class="caixa-quizzes">
                        ${generateQuizzesElement(userQuizzes)}
                    </div>
                </div>
            `}
            <div class="titulo-todos-quizzes">
                <h2>Todos os quizzes</h2>
                <div class="caixa-quizzes">
                    ${generateQuizzesElement(quizzesData)}
                </div>
            </div>`

        return page
    }

    const generateQuizzesElement = (data) => {
        let quizzes = ''
        for (let i = 0; i < data.length; i++) {
            const quizz = `
                <div class="quizz">
                    <h2>${data[i].title}</h2>
                    <img src=${data[i].image}>
                </div>`
            quizzes += quizz
        }

        return quizzes
    }

    const createQuizz = () => {
        const button = document.querySelector('.botao-criar-quizz') || document.querySelector('.add-icon-button')
        button.onclick = () => {
            QuizzBasicPage()
        }
    }


    return { render, createQuizz }

}
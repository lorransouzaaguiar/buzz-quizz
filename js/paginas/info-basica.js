import { renderBody } from "../app.js"
import { QuizzQuestionPage } from "./perguntas.js"

export const QuizzBasicPage = () => {
    const basicQuizzPage = Page()
    renderBody(basicQuizzPage.render())
    basicQuizzPage.formBasicQuizz()
}

const Page = () => {

    const render = () => {
        const page = document.createElement('div')
        page.classList.add('container')
        page.classList.add('container-infobasica')

        page.innerHTML = `
            <h2>Comece pelo começo</h2>
            <div class="criar-quizz">
                <input placeholder="    Título do seu quizz" > </input>
                <input placeholder="    URL da imagem do seu quizz" >  </input>
                <input placeholder="    Quantidade de perguntas do quizz">  </input>
                <input placeholder="    Quantidade de níveis do quizz"> </input>
            </div>
            <button class="prosseguir">Prosseguir para criar perguntas</button>
        `
        return page
    }

    const formBasicQuizz = () => {
        let botao = document.querySelector('.prosseguir')

        botao.onclick = async () => {
            const todosInputsValidos = []
            const { respostaValidas, dados } = validarDadosQuizz(todosInputsValidos)

            if (respostaValidas) {
                QuizzQuestionPage(dados.numeroPerguntas, dados)
            } else {
                alert('Preencha os dados corretamente!')
            }
            todosInputsValidos.length = 0

        }
    }

    function validarDadosQuizz(todosInputsValidos) {

        let inputs = document.querySelector('.criar-quizz')

        let titulo = inputs.children[0].value

        if (titulo.length >= 20 && titulo.length <= 65) {
            todosInputsValidos.push(true)

        } else {
            todosInputsValidos.push(false)
        }
        let urlImagem = inputs.children[1].value


        if (urlImagem.match('https?:\/\/.*\.(?:png|jpg)')) {

            todosInputsValidos.push(true)
        } else {

            todosInputsValidos.push(false)

        }

        let numeroPerguntas = inputs.children[2].value

        if (parseInt(numeroPerguntas) >= 3) {

            todosInputsValidos.push(true)

        } else {
            todosInputsValidos.push(false)

        }

        let numeroNiveis = inputs.children[3].value

        if (parseInt(numeroNiveis) >= 2) {

            todosInputsValidos.push(true)

        } else {
            todosInputsValidos.push(false)

        }

        let respostaValidas = todosInputsValidos.every((resposta) => resposta)

        return {
            respostaValidas, dados: {
                titulo,
                urlImagem,
                numeroPerguntas,
                numeroNiveis
            }
        }
    }

    return { render, formBasicQuizz }
}

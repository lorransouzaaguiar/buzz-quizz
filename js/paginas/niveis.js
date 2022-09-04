import { QuizzApi } from "../api/api.js"
import { renderBody } from "../app.js"
import { SuccessQuizzPage } from "./sucesso.js"
import { validations } from "../utils/validations.js"

export const QuizzLevelPage = (numberOfLevels, formQuestions, basicFormData) => {
    const quizzLevelPage = Page(numberOfLevels, formQuestions, basicFormData)
    renderBody(quizzLevelPage.render())
    quizzLevelPage.formLevelQuizz()
    quizzLevelPage.abrirNovoNivel()
}

const Page = (numberOfLevels, formQuestions, basicFormData) => {

    const render = () => {
        const page = document.createElement('div')
        page.classList.add('container')
        page.classList.add('container-niveis')

        const niveis = []

        for (let i = 0; i < numberOfLevels; i++) {
            const nivel = `
                <div class="novo-nivel" id="novo-nivel">
                    <h3>Nível ${i + 1}</h3>
                    <img  src="./imagens/Vector.svg">
                </div> 
                <div class="criar-nivel escondido" id="criar-nivel" >
                    <h3>Nível ${i + 1}</h3>
                    <input placeholder="    Título do nível">  </input>
                    <input placeholder="    % acerto mínimo" id = "acerto-minimo" >  </input>
                    <input placeholder="    URL da imagem de nível">  </input>
                    <input placeholder="    Descrição do nível"> </input>
                </div>
            `
            niveis.push(nivel)
        }

        page.innerHTML = `
            <h2>Agora, decida os níveis</h2>
            ${niveis.map(nivel => nivel)}
            <button class="finalizar">Finalizar Quizz</button>
        `
        return page
    }

    const createQuizz = (formLevels, formQuestions, basicFormData) => {
        const createQuizzQuestion = (title, image, questions, levels) => ({
            title, image, questions, levels
        })

        const levels = formLevels.map(({ form }) => form)

        const questions = formQuestions.map(({ form }) => form)
        console.log(questions)

        return createQuizzQuestion(
            basicFormData.titulo, basicFormData.urlImagem, questions, levels)

    }


    const formLevelQuizz = () => {
        let botaoNivel = document.querySelector('.finalizar')
        const api = QuizzApi()

        botaoNivel.onclick = () => {
            const formLevels = validarNiveisQuizz()
            const isFormLevelValid = formLevels.every((({ respostaValidas }) => respostaValidas))

            formLevels.forEach(({ respostaValidas }, index) => {
                if (!respostaValidas)
                    alert(`Preencha os dados corretamente do formulario ${index + 1}!`)
            })

            if (isFormLevelValid) {
                const quizz = createQuizz(formLevels, formQuestions, basicFormData)

                api.createQuizz(quizz).then(response => {
                    const userQuizzesFromStorage = localStorage.getItem('id')
                    console.log(userQuizzesFromStorage)

                    if (userQuizzesFromStorage) {
                        const userQuizzes = JSON.parse(userQuizzesFromStorage)
                        userQuizzes.push(response.id)
                        localStorage.setItem('id', JSON.stringify(userQuizzes))
                        SuccessQuizzPage(basicFormData)
                    } else {
                        const userQuizzes = []
                        userQuizzes.push(response.id)
                        localStorage.setItem('id', JSON.stringify(userQuizzes))
                    }

                }).catch(console.log)
            }
        }
    }

    function validarNiveisQuizz() {
        const inputsNivelForms = Object.values(document.querySelectorAll('.criar-nivel'))

        return inputsNivelForms.map(inputsNivel => {
            const todosInputsNivelValidos = []

            const tituloNivel = inputsNivel.children[1].value
            const acertoMinimo = inputsNivel.children[2].value
            const urlImagemNivel = inputsNivel.children[3].value
            const descriçaoNivel = inputsNivel.children[4].value
            const verificarPorcentagem = Object.values(document.querySelectorAll('#acerto-minimo'))
            const acerto = verificarPorcentagem.filter((input) => input.value == 0)
            const val = validations()

            console.log(inputsNivel)

            todosInputsNivelValidos.push(val.string().isGreaterOrEqualThen(tituloNivel, 10))
            todosInputsNivelValidos.push(val.number().isBetweenArangeOf(parseInt(acertoMinimo), 0, 100))
            todosInputsNivelValidos.push(val.string().isUrlImage(urlImagemNivel))
            todosInputsNivelValidos.push(val.string().isGreaterOrEqualThen(descriçaoNivel, 30))
            //todosInputsNivelValidos.push(val.string().isGreaterOrEqualThen(acerto, 0))

            let respostaValidas = todosInputsNivelValidos.every((resposta) => resposta)

            console.log(todosInputsNivelValidos)
            console.log(respostaValidas)

            return {
                respostaValidas,
                form: {
                    title: tituloNivel,
                    image: urlImagemNivel,
                    minValue: acertoMinimo,
                    text: descriçaoNivel,
                }
            }
        })

    }

    function abrirNovoNivel() {

        let botaoNovoNivel = Object.values(document.querySelectorAll('.novo-nivel img'))
        console.log(botaoNovoNivel)

        botaoNovoNivel.forEach((botao, index) => {

            botao.onclick = () => {
                console.log(index)
                let removerEscondido = Object.values(document.querySelectorAll('.escondido'))[index]
                console.log(removerEscondido)

                removerEscondido.classList.remove('escondido')

                let removerNovoNivel = Object.values(document.querySelectorAll('.novo-nivel'))[index]

                removerNovoNivel.classList.add('escondido')

            }

        })
    }

    return { render, formLevelQuizz, abrirNovoNivel }
}




/* if (tituloNivel.length >= 10) {

       todosInputsNivelValidos.push(true)

   } else {
       todosInputsNivelValidos.push(false)
   } */


/*  if (parseInt(acertoMinimo) >= 0 && parseInt(acertoMinimo) <= 100) {

     todosInputsNivelValidos.push(true)

 } else {

     todosInputsNivelValidos.push(false)

 } */


/* if (urlImagemNivel.match('https?:\/\/.*\.(?:png|jpg)')) {

    todosInputsNivelValidos.push(true)
} else {

    todosInputsNivelValidos.push(false)

} */


/*  if (descriçaoNivel.length >= 30) {

     todosInputsNivelValidos.push(true)

 } else {
     todosInputsNivelValidos.push(false)

 } */

/* if (acerto.length !== 0) {

    console.log('VALIDADO')

} else {

    console.log('deu ruim')
} */

/*  let respostaValidas = todosInputsNivelValidos.every((resposta) => resposta) */

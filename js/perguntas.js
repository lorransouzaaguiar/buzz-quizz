import { renderBody } from "./app.js"
import { abrirNovoNivel, QuizzLevelPage } from "./niveis.js"
import { validations } from "./validations.js"

export const QuizzQuestionPage = (numberOfQuestions, data) => {

    const render = () => {
        const page = document.createElement('div')
        page.classList.add('container')
        page.classList.add('container-perguntas')

        const perguntas = []

        for (let i = 0; i < numberOfQuestions; i++) {
            const pergunta = `
                <div class="criar-pergunta">
                    <h2>Pergunta ${i + 1}</h2>
                    <input placeholder="   Texto da pergunta"> </input>
                    <input placeholder="   Cor do fundo da pergunta"> </input>
                    <h2>Resposta correta</h2>
                    <input placeholder="   Resposta correta"> </input>
                    <input placeholder="   URL da imagem"> </input>
                    <h2>Respostas incorretas</h2>
                    <input placeholder="   Resposta incorreta 1"> </input>
                    <input placeholder="   URL da imagem 1"> </input>
    
                    <input placeholder="   Resposta incorreta 2"> </input>
                    <input placeholder="   URL da imagem 2"> </input>
    
                    <input placeholder="   Resposta incorreta 3"> </input>
                    <input placeholder="   URL da imagem 3"> </input>
                </div>
            `
            perguntas.push(pergunta)
        }

        page.innerHTML = `
            <h2>Crie sua pergunta</h2>
            ${perguntas.map(pergunta => pergunta)}
            <button class="botao-prosseguir">Prosseguir para criar níveis</button>
        `
        return page
    }

    const formQuestionQuizz = () => {
        const button = document.querySelector('.botao-prosseguir')

        button.onclick = () => {
            let todosInputsNivelValidos = []

            const formQuestions = getQuestionFormValidations()
            formQuestions.forEach(formQuestion => {

                if (!formQuestion.isFormValid) {
                    alert(`Formulario ${formQuestion.index + 1} válido`)

                    const quizzLevelPage = QuizzLevelPage(data.numeroNiveis, formQuestions)
                    renderBody(quizzLevelPage.render())
                    quizzLevelPage.formLevelQuizz()
                    abrirNovoNivel()


                } else {
                    alert(`Formulario ${formQuestion.index + 1} inválido`)
                }
            })

            todosInputsNivelValidos.length = 0
        }
    }

    return { render, formQuestionQuizz }

}


const getformQuizzQuestionFromDOM = () => {
    const formQuizzElements = Object.values(document.querySelectorAll('.criar-pergunta'))

    const getQuizzQuestions = (formQuizzElement) => {
        const QuestionText = formQuizzElement.children[1].value
        const BackgroundColor = formQuizzElement.children[2].value

        const CorrectAnswer = formQuizzElement.children[4].value
        const UrlImage = formQuizzElement.children[5].value

        const Answer1 = formQuizzElement.children[7].value
        const Answer1UrlImage = formQuizzElement.children[8].value

        const Answer2 = formQuizzElement.children[9].value
        const Answer2UrlImage = formQuizzElement.children[10].value

        const Answer3 = formQuizzElement.children[11].value
        const Answer3UrlImage = formQuizzElement.children[12].value

        return {
            QuestionText,
            BackgroundColor,
            CorrectAnswer,
            UrlImage,
            Answer1,
            Answer1UrlImage,
            Answer2,
            Answer2UrlImage,
            Answer3,
            Answer3UrlImage
        }
    }

    const questionForms = formQuizzElements.map(formQuizzElement => getQuizzQuestions(formQuizzElement))

    return { questionForms }
}

const getQuestionFormValidations = () => {
    const val = validations()

    const { questionForms } = getformQuizzQuestionFromDOM()

    return questionForms.map((form, index) => {
        const formValidation = []

        const incorrectAnswer1Text = { answer: form.Answer1, imageUrl: form.Answer1UrlImage }
        const incorrectAnswer2Text = { answer: form.Answer2, imageUrl: form.Answer2UrlImage }
        const incorrectAnswer3Text = { answer: form.Answer3, imageUrl: form.Answer3UrlImage }

        const incorrectAnswers = [
            incorrectAnswer1Text, incorrectAnswer2Text, incorrectAnswer3Text]

        formValidation.push(val.string().isGreaterOrEqualThen(form.QuestionText, 20))
        formValidation.push(val.string().isHexaDecimalColor(form.BackgroundColor))
        formValidation.push(!val.string().isEmpty(form.CorrectAnswer))
        formValidation.push(!val.string().isEmpty(form.UrlImage))

        const incorrectAnswersNotEmpty = incorrectAnswers.filter((incorrectAnswer) =>
            !val.string().isEmpty(incorrectAnswer.answer) &&
            val.string().isUrlImage(incorrectAnswer.imageUrl))


        if (incorrectAnswersNotEmpty.length >= 1) {
            formValidation.push(true)
        } else {
            formValidation.push(false)
        }

        const isFormValid = formValidation.every(response => response)

        return {
            isFormValid,
            index,
            form
        }

    })

}

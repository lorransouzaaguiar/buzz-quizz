import { validations } from "./validations.js"

const getformQuizzQuestionFromDOM = () => {
    const formQuizzElement = Object.values(document.querySelectorAll('.criar-pergunta'))
    const button = document.querySelector('.botao-prosseguir')

    const getQuizzQuestions = (formQuizzElement) => {
        const QuestionText = formQuizzElement.children[1]
        const BackgroundColor = formQuizzElement.children[2]

        const CorrectAnswer = formQuizzElement.children[4]
        const UrlImage = formQuizzElement.children[5]

        const Answer1 = formQuizzElement.children[7]
        const Answer1UrlImage = formQuizzElement.children[8]

        const Answer2 = formQuizzElement.children[9]
        const Answer2UrlImage = formQuizzElement.children[10]

        const Answer3 = formQuizzElement.children[11]
        const Answer3UrlImage = formQuizzElement.children[12]

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

    const questionForm1 = getQuizzQuestions(formQuizzElement[0])
    const questionForm2 = getQuizzQuestions(formQuizzElement[1])
    const questionForm3 = getQuizzQuestions(formQuizzElement[2])

    return { questionForms: [questionForm1, questionForm2, questionForm3], button }
}

const applyFormValidation = () => {
    const val = validations()

    const { questionForms, button } = getformQuizzQuestionFromDOM()

    button.onclick = () => {
        questionForms.forEach((form, index) => {
            const formValidation = []

            const incorrectAnswer1Text = { answer: form.Answer1, imageUrl: form.Answer1UrlImage }
            const incorrectAnswer2Text = { answer: form.Answer2, imageUrl: form.Answer2UrlImage }
            const incorrectAnswer3Text = { answer: form.Answer3, imageUrl: form.Answer3UrlImage }

            const incorrectAnswers = [
                incorrectAnswer1Text, incorrectAnswer2Text, incorrectAnswer3Text]

            formValidation.push(val.string().isGreaterOrEqualThen(form.QuestionText.value, 20))
            formValidation.push(val.string().isHexaDecimalColor(form.BackgroundColor.value))
            formValidation.push(!val.string().isEmpty(form.CorrectAnswer.value))
            formValidation.push(!val.string().isEmpty(form.UrlImage.value))

            const incorrectAnswersNotEmpty = incorrectAnswers.filter((incorrectAnswer) =>
                !val.string().isEmpty(incorrectAnswer.answer.value) &&
                val.string().isUrlImage(incorrectAnswer.imageUrl.value))


            if (incorrectAnswersNotEmpty.length >= 1) {
                formValidation.push(true)
            } else {
                formValidation.push(false)
            }


            if (formValidation.every(response => response)) {
                alert(`Formulário ${index + 1} válido`)
            } else {
                alert(`Formulário ${index + 1} inválido`)
            }

        })
    }

}

applyFormValidation()

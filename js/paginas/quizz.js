import { renderBody } from "../app.js"

export const QuizzPage = (quizzData) => {
    const quizzPage = Page(quizzData)
    renderBody(quizzPage.render())
}

const Page = (quizzData) => {
    const render = () => {

        const page = document.createElement('div')

        page.innerHTML = `
            <div class="quizz-header">
                <h2 class="quizz-title">${quizzData.title}</h2>
                <img class='college-image' src="${quizzData.image}" alt="">
            </div>
            <div class="container container-quizz">
                ${renderQuestions(quizzData.questions)}
            </div>
        `

        return page
    }

    const renderAnswers = (answersData) => {
        let answers = ''
        const randomAnswers = answersData.sort(() => Math.random() - 0.5);
        randomAnswers.forEach(answer => {
            answers += `
                <div>
                    <img src="${answer.image}" alt="">
                    <h3>${answer.text}</h3>
                </div>
            `
        })

        return answers
    }

    const renderQuestions = (questionsData) => {

        let quizz = ''

        questionsData.forEach(question => {
            const titleStyle = `
                background-color:${question.color}";
                padding: 0 18px;
                color: var(--white1);
            `

            quizz += `
                <article class="wrapper-quizz">
                    <h2 style="${titleStyle}>${question.title}</h2>
                    <div class="group-image">
                        ${renderAnswers(question.answers)}
                    </div>    
                </article>`
        });

        return quizz
    }

    return { render }
}
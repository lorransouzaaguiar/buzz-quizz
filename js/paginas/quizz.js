import { renderBody } from "../app.js"

export const QuizzPage = (quizzData) => {
    const quizzPage = Page(quizzData)
    renderBody(quizzPage.render())
    quizzPage.chooseAnswer()
}

const Page = (quizzData) => {

    const render = () => {

        const page = document.createElement('div')

        const renderAnswers = (answersData) => {
            let answers = ''
            const randomAnswers = answersData.sort(() => Math.random() - 0.5);
            randomAnswers.forEach((answer, index) => {
                answers += `
                    <div class="quizz-answer" id="${JSON.stringify([index, answer.isCorrectAnswer])}">
                        <div class="quizz-img-wrapper">
                            <img src="${answer.image}" alt="">
                        </div>
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
                    background-color:${question.color === '#ffffff' ? '#DAD7D7' : question.color}";
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

    const chooseAnswer = () => {
        const quizzes = Object.values(document.querySelectorAll('.group-image'))

        quizzes.forEach(quizzGroupEl => {
            const quizzGroup = Array.from(quizzGroupEl.children)

            quizzGroup.forEach((quizz) => {
                const [id, isCorrectAnswer] = JSON.parse(quizz.getAttribute('id'))

                const image = quizz.children[0]
                const title = quizz.children[1]

                quizz.onclick = () => {
                    if (isCorrectAnswer) {
                        image.style = ''
                        title.style = `
                            color: var(--green1);
                        `
                    } else {
                        title.style = `color: var(--red3);`
                    }

                    console.log(id)
                    const otherQuizzes = quizzGroup.filter(el => {
                        const [otherId] = JSON.parse(el.getAttribute('id'))
                        return otherId !== id
                    })

                    otherQuizzes.forEach(quizz => {
                        const [_, isCorrectAnswer] = JSON.parse(quizz.getAttribute('id'))
                        const image = quizz.children[0]
                        const title = quizz.children[1]
                        image.style = `opacity: 0.3;`

                        if (isCorrectAnswer) {
                            title.style = `
                                color: var(--green1);`
                        } else {
                            title.style = `color: var(--red3);`

                        }

                        quizz.onclick = null
                    })

                    quizz.onclick = null
                }
            })
        })

        /*  const */
        /*  console.log(answersEl[0]) */
    }

    return { render, chooseAnswer }
}
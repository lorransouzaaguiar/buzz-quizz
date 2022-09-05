import { renderBody } from "../app.js"

export const QuizzPage = (quizzData) => {
    const quizzPage = Page(quizzData)
    renderBody(quizzPage.render())
    quizzPage.chooseAnswer()
}

const Page = (quizzData) => {
    const userAnswers = []

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
                    <article class="wrapper-quizz" data-identifier="question">
                        <h2 style="${titleStyle}>${question.title}</h2>
                        <div class="group-image" data-identifier="answer">
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
                        userAnswers.push('acertou')
                    } else {
                        title.style = `color: var(--red3);`
                        userAnswers.push('errou')
                    }

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

                    if (quizzData.questions.length === userAnswers.length) {
                        const correctAnswersTotal = userAnswers.filter(answer => answer === 'acertou').length
                        const porcetagemDeAcerto = Math.ceil(correctAnswersTotal * 100 / userAnswers.length)

                        const levels = quizzData.levels.map((level) => parseInt(level.minValue)).sort((a, b) => a - b)

                        const userLevel = levels.find((level => level >= porcetagemDeAcerto))

                        const leveldata = quizzData.levels.find(level => level.minValue === userLevel)
                        console.log(leveldata)
                        const quizzResultEl = renderFinalQuizz(userLevel, leveldata)

                        const containerQuizzEl = document.querySelector('.container-quizz')
                        containerQuizzEl.innerHTML += quizzResultEl
                    }
                }
            })
        })
    }

    const renderFinalQuizz = (userLevel, levelData) => {
        return `
            <article class="wrapper-quizz">
                    <h2 class="result-quizz-title" data-identifier="quizz-result">${userLevel}% de acerto: ${levelData?.title}</h2>
                    <div class="info-about-quizz">
                        <div>
                            <img src="${levelData?.image}" alt="">
                        </div>
                        <p>${levelData?.text}</p>
                    </div>
            </article>
            <footer class="quizz-footer">
                <button class="acessar-quizz">Reiniciar Quizz</button>
                <a class="home" href="">Voltar para home</a>
            </footer>
        `
    }

    return { render, chooseAnswer }
}
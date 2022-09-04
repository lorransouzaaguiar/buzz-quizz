const URLBASE = 'https://mock-api.driven.com.br/api/v4/buzzquizz'

export const QuizzApi = () => {
    const createQuizz = async (quizz) => {
        const response = await axios.post(`${URLBASE}/quizzes`, quizz)
        console.log(response)
        return response.data
    }

    return { createQuizz }
}


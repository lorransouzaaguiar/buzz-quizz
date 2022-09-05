const URLBASE = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes'

export const QuizzApi = () => {

    const getAllQuizzes = async () => {
        const response = await axios.get(URLBASE)
        return response.data
    }

    const getOneQuizz = async (id) => {
        const response = await axios.get(`${URLBASE}/${id}`)
        return response.data
    }

    const createQuizz = async (quizz) => {
        const response = await axios.post(URLBASE, quizz)
        return response.data
    }

    return { createQuizz, getAllQuizzes, getOneQuizz }
}


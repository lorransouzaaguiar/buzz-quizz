const URLBASE = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes'

export const QuizzApi = () => {

    const getAllQuizzes = async () => {
        const response = await axios.get(URLBASE)
        /* console.log(response) */
        return response.data
    }

    const getOneQuizz = async (id) => {
        const response = await axios.get(`${URLBASE}/${id}`)
        /* console.log(response) */
        return response.data
    }

    const createQuizz = async (quizz) => {
        const response = await axios.post(URLBASE, quizz)
        /* console.log(response) */
        return response.data
    }

    return { createQuizz, getAllQuizzes, getOneQuizz }
}


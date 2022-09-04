export const storageUserData = () => {

    const setId = (id) => {
        const userQuizzesStorage = localStorage.getItem('id')

        if (userQuizzesStorage) {
            const userQuizzes = JSON.parse(userQuizzesStorage)
            userQuizzes.push(id)
            localStorage.setItem('id', JSON.stringify(userQuizzes))
        } else {
            localStorage.setItem('id', JSON.stringify([id]))
        }
    }

    const getIds = () => {
        const userQuizzesStorage = localStorage.getItem('id')

        if (userQuizzesStorage) {
            const userQuizzes = JSON.parse(userQuizzesStorage)
            return userQuizzes
        }

        return userQuizzesStorage
    }

    return { setId, getIds }

}

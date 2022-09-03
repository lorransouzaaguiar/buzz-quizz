export const validations = () => {

    const number = () => {
        const isGreaterThen = (data, num) => {
            if (data > num) return true
            return false
        }

        const isBetweenArangeOf = (data, number1, number2) => {
            if (data >= number1 && data <= number2) return true
            return false
        }

        return { isGreaterThen, isBetweenArangeOf }

    }

    const string = () => {

        const isEmpty = (data = '') => {
            if (data.length === 0) return true
            return false
        }

        const isHexaDecimalColor = (data) => {
            if (data.match('#([a-fA-F0-9]){3}$|[a-fA-F0-9]{6}$')) return true
            return false
        }

        const isGreaterOrEqualThen = (data, num) => {
            if (data.length >= num) return true
            return false
        }

        const isUrlImage = (data) => {
            if (data.match('https?:\/\/.*\.(?:png|jpg)')) return true
            return false
        }

        return { isEmpty, isUrlImage, isGreaterOrEqualThen, isHexaDecimalColor }

    }


    return { number, string }

}
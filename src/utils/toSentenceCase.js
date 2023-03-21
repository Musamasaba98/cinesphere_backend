export const toSentenceCase = (word) => {
    return word.charAt(0).toUpperCase() + word.splice(1).toLowerCase()
}
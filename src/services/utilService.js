export const utilService = {
    addZero,
    convertTime
}



function addZero(number) {
    return (number < 10) ? `0${number}` : number

}
function convertTime(time) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    const convertedTime = addZero(minutes) + ':' + addZero(seconds)
    return convertedTime
}
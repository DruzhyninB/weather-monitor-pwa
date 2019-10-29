export const formatData = (array) => {
    return array.map(element => {
        return {
            date: new Date(element.dt_txt),
            value: element.main.temp,
            clouds: element.clouds.all
        }
    })
}
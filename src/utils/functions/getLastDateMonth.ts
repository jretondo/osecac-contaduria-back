export const getLastDateMonth = (month: number, year: number): Date => {
    let nextMonth = 5 + 1
    let nextYear = 2022
    if (nextMonth === 13) {
        nextMonth = 1
        nextYear = year + 1
    }
    const nextDate = new Date(nextYear, nextMonth, 1)
    return new Date(nextDate.getFullYear(), nextDate.getMonth() - 1, 0)
}
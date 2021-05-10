
// normalize array values between 0 and 1
export const getNormalizedRowValues = (row) => {
    const unsorted = Array.from(row)
    const sorted = row.sort()
    const min = sorted[0]
    const max = sorted[row.length-1]

    const normalized = unsorted.map((i)=>{
        // fix divide by zero 
        return (i - min) / (max - min)
    })

    return normalized
}


// normalize array values between 0 and 1
export const getNormalizedRowValues = (row, scalarKey) => {
    const rowData = row.map((item)=>{return item[scalarKey]})
    const unsorted = Array.from(rowData)

    const sorted = rowData.sort((a, b)=>{return a - b})
    const min = sorted[0]
    const max = sorted[row.length-1]

    const normalized = unsorted.map((i)=>{
        if ((max-min) === 0) {return 0}

        return (i - min) / (max - min)
    })

    return normalized
}

export const setColorByScalar = (row, scalarKey) => {
    const normalizedScalarValues = getNormalizedRowValues(row, scalarKey)

    for (let i=0; i <= row.length-1; i++) {
        const scalarByIndex = normalizedScalarValues[i]
        row[i].color = getRgbByScalar(scalarByIndex)
    }

    return row 
}

const getRgbByScalar = (normScalar) => {
    if (normScalar === 0) {return 0x49ef4}

    const a = (1 - normScalar);
    const Y = Math.floor(255 * a);
    let r=255 
    let g=Y 
    let b=0
    return "rgb("+r+","+g+","+b+")";
}

import unityLevels from './levels.json'

const stockLevels = [
    {
        width: 21,
        height: 12,
        playerStart: { x: 10, y: 6 },
        blocks: [
            { x: 10, y: 1, code: 'j' },
            { x: 10, y: 7, code: 'a' }
        ]
    },
    {
        width: 21,
        height: 12,
        playerStart: { x: 10, y: 6 },
        blocks: [
            { x: 10, y: 2, code: 'a' },
            { x: 6, y: 1, code: 'a' },
            { x: 14, y: 1, code: 'a' },
            { x: 15, y: 6, code: 'a' },
            { x: 5, y: 6, code: 'a' },
            { x: 11, y: 4, code: 'g' },
            { x: 10, y: 7, code: 'a' },
            { x: 10, y: 9, code: 'j' },
            { x: 11, y: 10, code: 'a' },
            { x: 9, y: 10, code: 'a' }
        ]
    },
    {
        width: 21,
        height: 12,
        playerStart: { x: 10, y: 6 },
        blocks: [
            { x: 10, y: 1, code: 'a' },
            { x: 7, y: 2, code: 'a' },
            { x: 5, y: 1, code: 'a' },
            { x: 4, y: 2, code: 'a' },
            { x: 10, y: 7, code: 'a' },
            { x: 11, y: 9, code: 'a' },
            { x: 17, y: 2, code: 'a' },
            { x: 16, y: 8, code: 'a' },
            { x: 4, y: 8, code: 'a' },
            { x: 6, y: 11, code: 'a' },
            { x: 11, y: 10, code: 'j' }
        ]
    },
    {
        width: 21,
        height: 12,
        playerStart: { x: 10, y: 6 },
        blocks: [
            { x: 10, y: 7, code: 'a' },
            { x: 10, y: 3, code: 'a' },
            { x: 14, y: 2, code: 'a' },
            { x: 13, y: 6, code: 'a' },
            { x: 12, y: 8, code: 'a' },
            { x: 11, y: 10, code: 'a' },
            { x: 10, y: 11, code: 'a' },
            { x: 9, y: 9, code: 'a' },
            { x: 6, y: 1, code: 'a' },
            { x: 4, y: 2, code: 'a' },
            { x: 3, y: 6, code: 'a' },
            { x: 5, y: 10, code: 'a' },
            { x: 11, y: 7, code: 'g' },
            { x: 10, y: 4, code: 'g' },
            { x: 15, y: 1, code: 'j' },
            { x: 16, y: 5, code: 'a' }
        ]
    },
    {
        width: 21,
        height: 12,
        playerStart: { x: 10, y: 6 },
        blocks: [
            { x: 10, y: 7, code: 'a' },
            { x: 10, y: 1, code: 'a' },
            { x: 6, y: 2, code: 'a' },
            { x: 7, y: 7, code: 'a' },
            { x: 14, y: 6, code: 'g' },
            { x: 15, y: 7, code: 'j' },
            { x: 16, y: 4, code: 'a' },
            { x: 15, y: 2, code: 'a' },
            { x: 10, y: 3, code: 'f' }
        ]
    },
    {
        width: 21,
        height: 12,
        playerStart: { x: 10, y: 6 },
        blocks: [
            { x: 10, y: 7, code: 'a' },
            { x: 12, y: 10, code: 'a' },
            { x: 14, y: 6, code: 'a' },
            { x: 14, y: 5, code: 'a' },
            { x: 15, y: 2, code: 'a' },
            { x: 11, y: 1, code: 'j' },
            { x: 10, y: 1, code: 'f' },
            { x: 9, y: 2, code: 'c' },
            { x: 6, y: 6, code: 'c' },
            { x: 3, y: 6, code: 'f' },
            { x: 5, y: 4, code: 'c' },
            { x: 5, y: 1, code: 'a' },
            { x: 17, y: 6, code: 'f' },
            { x: 6, y: 11, code: 'a' }
        ]
    },
    {
        width: 21,
        height: 12,
        playerStart: { x: 10, y: 6 },
        blocks: [
            { x: 10, y: 7, code: 'a' },
            { x: 8, y: 6, code: 'a' },
            { x: 7, y: 6, code: 'j' },
            { x: 5, y: 6, code: 'b', linkCode: 0 },
            { x: 3, y: 6, code: 'g' },
            { x: 12, y: 10, code: 'a' },
            { x: 13, y: 6, code: 'f' },
            { x: 15, y: 6, code: 'b', linkCode: 0 },
            { x: 16, y: 5, code: 'a' },
            { x: 17, y: 9, code: 'a' }
        ]
    },
    {
        width: 21,
        height: 12,
        playerStart: { x: 10, y: 6 },
        blocks: [
            { x: 10, y: 3, code: 'b', linkCode: 0 },
            { x: 11, y: 1, code: 'a' },
            { x: 14, y: 2, code: 'a' },
            { x: 10, y: 7, code: 'a' },
            { x: 7, y: 4, code: 'a' },
            { x: 6, y: 4, code: 'a' },
            { x: 6, y: 2, code: 'a' },
            { x: 5, y: 7, code: 'b', linkCode: 0 },
            { x: 4, y: 11, code: 'j' },
            { x: 15, y: 6, code: 'a' }
        ]
    },
    {
        width: 21,
        height: 12,
        playerStart: { x: 10, y: 6 },
        blocks: [
            { x: 10, y: 7, code: 'a' },
            { x: 9, y: 7, code: 'a' },
            { x: 11, y: 7, code: 'a' },
            { x: 10, y: 3, code: 'c' },
            { x: 14, y: 6, code: 'a' },
            { x: 6, y: 6, code: 'a' },
            { x: 14, y: 4, code: 'c' },
            { x: 16, y: 5, code: 'c' },
            { x: 6, y: 4, code: 'c' },
            { x: 4, y: 5, code: 'c' },
            { x: 15, y: 8, code: 'c' },
            { x: 15, y: 10, code: 'c' },
            { x: 5, y: 8, code: 'c' },
            { x: 5, y: 10, code: 'c' },
            { x: 16, y: 9, code: 'a' },
            { x: 4, y: 9, code: 'a' },
            { x: 17, y: 11, code: 'a' },
            { x: 3, y: 11, code: 'a' },
            { x: 10, y: 10, code: 'a' },
            { x: 15, y: 2, code: 'a' },
            { x: 17, y: 2, code: 'a' },
            { x: 5, y: 2, code: 'a' },
            { x: 3, y: 2, code: 'a' },
            { x: 16, y: 2, code: 'j' },
            { x: 4, y: 2, code: 'j' }
        ]
    },
    {
        width: 21,
        height: 12,
        playerStart: { x: 10, y: 6 },
        blocks: [
            { x: 13, y: 5, code: 'a' },
            { x: 10, y: 7, code: 'a' },
            { x: 13, y: 7, code: 'i', linkCode: 1 },
            { x: 14, y: 6, code: 'c' },
            { x: 16, y: 6, code: 'h', linkCode: 1 },
            { x: 17, y: 6, code: 'b', linkCode: 0 },
            { x: 17, y: 5, code: 'j' },
            { x: 15, y: 2, code: 'b', linkCode: 0 },
            { x: 13, y: 9, code: 'a' }
        ]
    },
    {
        width: 21,
        height: 12,
        playerStart: { x: 10, y: 6 },
        blocks: [
            { x: 10, y: 7, code: 'a' },
            { x: 10, y: 3, code: 'd' },
            { x: 9, y: 4, code: 'g' },
            { x: 8, y: 3, code: 'g' },
            { x: 9, y: 2, code: 'g' },
            { x: 10, y: 1, code: 'g' },
            { x: 11, y: 2, code: 'g' },
            { x: 14, y: 3, code: 'j' }
        ]
    },
    {
        width: 21,
        height: 12,
        playerStart: { x: 10, y: 6 },
        blocks: [
            { x: 10, y: 3, code: 'c' },
            { x: 10, y: 7, code: 'a' },
            { x: 11, y: 10, code: 'j' },
            { x: 9, y: 10, code: 'j' },
            { x: 17, y: 4, code: 'c' },
            { x: 3, y: 4, code: 'c' },
            { x: 18, y: 2, code: 'e' },
            { x: 2, y: 2, code: 'e' },
            { x: 17, y: 11, code: 'g' },
            { x: 3, y: 11, code: 'g' }
        ]
    },
    {
        width: 21,
        height: 12,
        playerStart: { x: 10, y: 6 },
        blocks: [
            { x: 13, y: 5, code: 'c' },
            { x: 10, y: 7, code: 'a' },
            { x: 13, y: 7, code: 'a' },
            { x: 14, y: 2, code: 'c' },
            { x: 11, y: 1, code: 'j' },
            { x: 10, y: 1, code: 'e' },
            { x: 17, y: 3, code: 'a' },
            { x: 6, y: 4, code: 'a' },
            { x: 3, y: 2, code: 'a' },
            { x: 6, y: 11, code: 'a' },
            { x: 15, y: 11, code: 'a' },
            { x: 16, y: 10, code: 'a' },
            { x: 5, y: 9, code: 'e' },
            { x: 4, y: 10, code: 'c' }
        ]
    },
    {
        width: 21,
        height: 12,
        playerStart: { x: 10, y: 6 },
        blocks: [
            { x: 11, y: 5, code: 'a' },
            { x: 10, y: 7, code: 'a' },
            { x: 8, y: 6, code: 'a' },
            { x: 7, y: 4, code: 'a' },
            { x: 5, y: 7, code: 'a' },
            { x: 3, y: 5, code: 'a' },
            { x: 4, y: 2, code: 'a' },
            { x: 5, y: 1, code: 'a' },
            { x: 4, y: 11, code: 'a' },
            { x: 12, y: 8, code: 'a' },
            { x: 13, y: 9, code: 'h', linkCode: 0 },
            { x: 13, y: 10, code: 'j' },
            { x: 15, y: 10, code: 'a' },
            { x: 15, y: 6, code: 'i', linkCode: 0 },
            { x: 14, y: 6, code: 'f' },
            { x: 16, y: 6, code: 'a' },
            { x: 13, y: 1, code: 'a' },
            { x: 17, y: 2, code: 'a' }
        ]
    },
    {
        width: 21,
        height: 12,
        playerStart: { x: 10, y: 6 },
        blocks: [
            { x: 10, y: 7, code: 'a' },
            { x: 13, y: 8, code: 'a' },
            { x: 7, y: 8, code: 'a' },
            { x: 14, y: 10, code: 'a' },
            { x: 15, y: 11, code: 'a' },
            { x: 16, y: 11, code: 'a' },
            { x: 17, y: 10, code: 'a' },
            { x: 17, y: 9, code: 'a' },
            { x: 16, y: 8, code: 'a' },
            { x: 16, y: 6, code: 'a' },
            { x: 6, y: 10, code: 'a' },
            { x: 5, y: 11, code: 'a' },
            { x: 4, y: 11, code: 'a' },
            { x: 3, y: 10, code: 'a' },
            { x: 3, y: 9, code: 'a' },
            { x: 4, y: 8, code: 'a' },
            { x: 3, y: 7, code: 'a' },
            { x: 10, y: 3, code: 'f' },
            { x: 11, y: 1, code: 'a' },
            { x: 9, y: 1, code: 'a' },
            { x: 13, y: 1, code: 'a' },
            { x: 14, y: 2, code: 'a' },
            { x: 15, y: 1, code: 'a' },
            { x: 16, y: 1, code: 'a' },
            { x: 17, y: 2, code: 'a' },
            { x: 16, y: 4, code: 'a' },
            { x: 15, y: 3, code: 'd' },
            { x: 16, y: 2, code: 'i', linkCode: 0 },
            { x: 6, y: 2, code: 'a' },
            { x: 5, y: 1, code: 'a' },
            { x: 4, y: 1, code: 'a' },
            { x: 3, y: 2, code: 'a' },
            { x: 3, y: 3, code: 'a' },
            { x: 5, y: 3, code: 'a' },
            { x: 4, y: 3, code: 'h', linkCode: 0 },
            { x: 4, y: 2, code: 'j' },
            { x: 17, y: 3, code: 'a' }
        ]
    },
    {
        width: 21,
        height: 12,
        playerStart: { x: 10, y: 6 },
        blocks: [
            { x: 10, y: 7, code: 'a' },
            { x: 10, y: 8, code: 'a' },
            { x: 9, y: 9, code: 'a' },
            { x: 11, y: 10, code: 'a' },
            { x: 6, y: 10, code: 'a' },
            { x: 5, y: 8, code: 'a' },
            { x: 4, y: 6, code: 'a' },
            { x: 3, y: 5, code: 'a' },
            { x: 5, y: 5, code: 'a' },
            { x: 6, y: 5, code: 'a' },
            { x: 3, y: 2, code: 'a' },
            { x: 11, y: 4, code: 'a' },
            { x: 15, y: 5, code: 'a' },
            { x: 17, y: 7, code: 'a' },
            { x: 14, y: 3, code: 'c' },
            { x: 12, y: 6, code: 'c' },
            { x: 8, y: 6, code: 'c' },
            { x: 6, y: 3, code: 'c' },
            { x: 12, y: 7, code: 'g' },
            { x: 7, y: 11, code: 'e' },
            { x: 17, y: 9, code: 'e' },
            { x: 16, y: 3, code: 'b', linkCode: 1 },
            { x: 3, y: 7, code: 'b', linkCode: 1 },
            { x: 4, y: 2, code: 'f' },
            { x: 10, y: 3, code: 'd' },
            { x: 10, y: 4, code: 'h', linkCode: 0 },
            { x: 16, y: 4, code: 'i', linkCode: 0 },
            { x: 10, y: 1, code: 'j' },
            { x: 16, y: 10, code: 'a' }
        ]
    }
].concat(unityLevels)

export const getStockLevel = async (i: number) => {
    if (i > stockLevels.length) {
        return null
    }
    return stockLevels[i]
}

export const getNextLevel = async (series: string, index: number) => {
    return getLevel(series, index + 1)
}

export const getLevel = async (series: string, index: number) => {
    if (series === 'stock') {
        return getStockLevel(index)
    } else {
        throw Error(`Invalid series: ${series}`)
    }
}

export const getAllLevels = async (series: string) => {
    if (series === 'stock') {
        return stockLevels
    } else {
        throw Error(`Invalid series: ${series}`)
    }
}

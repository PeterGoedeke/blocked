interface Level {
    width: number
    height: number
    playerStart: {
        x: number
        y: number
    }
    blocks: {
        x: number
        y: number
        code: string
        linkCode?: number
    }[]
}

interface GameLevel {
    level: Level
    series: string
    index: number
}

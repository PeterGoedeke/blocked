type Folder = {
    folderName: string
    levels: Level[]
}

interface GameLevel {
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

interface LevelInDTO {
    gameLevel: GameLevel
    name: string
    folderName: string
    isPublic: boolean
    index: number
}

interface User {
    username: string
    password: string
}

interface Level {
    /**
     * The id of the level
     * example:
     * 10
     */
    id: number
    gameLevel: GameLevel
    /**
     * The username of the user who authored the level
     * example:
     * 5
     */
    authorName: string
    /**
     * The timestamp the level was created as a unix timestamp in milliseconds
     * example:
     * 4350934534
     */
    timeCreated: number
    /**
     * The timestamp the level was edited as a unix timestamp in milliseconds
     * example:
     * 3245235464
     */
    timeEdited: number
    /**
     * The name of the level
     * example:
     * Level 1
     */
    name: string
    /**
     * The name of the folder the level is within
     * example:
     * Stage 1
     */
    folderName: string
    /**
     * Whether the level should be viewable by other users or not
     * example:
     * false
     */
    isPublic: boolean
    /**
     * The sort index of the level. Levels are shown in folders sorted first by index (asc) and then secondly by name (asc alphabetical order)
     * example:
     * 2
     */
    index: number
    /**
     * The number of times the level has been completed
     * example:
     * 25
     */
    completions: number
}

declare const process: {
    env: {
        serverURL: string | undefined
    }
}

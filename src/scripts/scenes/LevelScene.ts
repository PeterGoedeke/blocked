import Block from '../objects/Block'
import BlockFactory, { isPickup } from '../objects/BlockFactory'
import GridManager from '../objects/GridManager'
import Player from '../objects/Player'
import BlockStrategy from '../objects/strategies/BlockStrategy'
import Solver from '../Solver'

interface Links {
    [key: string]: BlockStrategy[]
}

interface Bounds {
    width: number
    height: number
}

export default class LevelScene extends Phaser.Scene {
    active: boolean
    player!: Player
    blocks!: Phaser.Physics.Arcade.StaticGroup
    pickups!: Phaser.Physics.Arcade.Group
    entities!: Phaser.Physics.Arcade.Group

    level!: GameLevel

    blockFactory: BlockFactory
    links: Links
    isLevelEditor!: boolean
    fromLink!: boolean
    killBlock?: { x: number; y: number }

    gridManager!: GridManager
    resizeables: Block[]

    timeout: number | undefined

    constructor() {
        super({ key: 'LevelScene' })

        this.blockFactory = BlockFactory.getInstance()
        this.links = {}

        this.active = true
        this.resizeables = []
    }

    async init(data: { gameLevel: GameLevel; isLevelEditor?: boolean; fromLink?: boolean }) {
        this.level = data.gameLevel
        this.active = true
        this.isLevelEditor = data.isLevelEditor || false
        this.fromLink = data.fromLink || false

        this.gridManager = new GridManager(
            this.cameras.main.width,
            this.cameras.main.height,
            this.level
        )
    }

    placeBlock(blockData: BlockData) {
        const c = this.gridManager.gridToPhaser(new Phaser.Math.Vector2(blockData.x, blockData.y))
        const block = this.blockFactory.createBlockFromCode(blockData.code, this, c.x, c.y)
        block.setDisplaySize(this.gridManager.cellSize, this.gridManager.cellSize)

        if (isPickup(blockData.code)) {
            this.pickups.add(block)
        } else {
            this.blocks.add(block)
        }
        block.body.setSize(this.gridManager.cellSize, this.gridManager.cellSize)

        // console.log(blockData.x, blockData.y, block.gridCoordinates)
        this.ensureBlockLinked(block, blockData)
        return block
    }

    ensureBlockLinked(block: Block, blockData: BlockData) {
        if (blockData.linkCode !== undefined) {
            if (!this.links[blockData.linkCode]) {
                this.links[blockData.linkCode] = []
            }

            this.links[blockData.linkCode].forEach(strategy => {
                strategy.link(block.strategy)
                block.strategy.link(strategy)
            })

            this.links[blockData.linkCode].push(block.strategy)
        }
    }

    setKiller(x: number, y: number) {
        this.killBlock = { x, y }
    }

    checkFallOutOfWorld() {
        let falling = true
        const p = this.gridManager.phaserToGrid(this.player.body.position)
        // const playerPosition = new Phaser.Math.Vector2(
        //     Math.round(this.player.x - cellSize / 2),
        //     Math.round(this.player.y - cellSize / 2)
        // )
        this.blocks.children.iterate(block => {
            const b = this.gridManager.phaserToGrid(block.body.position as Phaser.Math.Vector2)
            const v = new Phaser.Math.Vector2(b.x - p.x, b.y - p.y).normalize()
            if (this.player.body.velocity.clone().normalize().fuzzyEquals(v)) {
                falling = false
                console.log('not falling')
            }
        })
        // let falling = true
        // // const playerPosition = this.gridManager.phaserToGrid(new Phaser.Math.Vector2(this.player.x, this.player.y))
        // // const playerPosition = new Phaser.Math.Vector2(
        // //     Math.round(this.player.x - cellSize / 2),
        // //     Math.round(this.player.y - cellSize / 2)
        // // )
        // this.blocks.children.iterate(block => {
        //     console.log(this.player.x, this.player.y, block.body.position.x, block.body.position.y)
        //     const v = new Phaser.Math.Vector2(
        //         block.body.position.x - this.player.body.position.x,
        //         block.body.position.y - this.player.body.position.y
        //     ).normalize()
        //     if (this.player.body.velocity.clone().normalize().fuzzyEquals(v)) {
        //         falling = false
        //     }
        // })
        if (falling) {
            this.tweens.add({
                targets: this.player,
                alpha: 0,
                duration: 400,
                ease: 'Power2',
                onComplete: () => {
                    this.scene.restart()
                }
            })
        }
    }

    setPlayer(gridX: number, gridY: number) {
        const c = this.gridManager.gridToPhaser(new Phaser.Math.Vector2(gridX, gridY))
        this.player = new Player(this, c.x, c.y)
        this.entities.add(this.player)
        this.player.setDisplaySize(this.gridManager.cellSize, this.gridManager.cellSize)
    }

    create() {
        this.blocks = this.physics.add.staticGroup()
        this.pickups = this.physics.add.group()
        this.entities = this.physics.add.group({
            collideWorldBounds: false
        })

        this.resizeables = []
        this.level.blocks.forEach(blockRaw => {
            const block = this.placeBlock(blockRaw)
            if (blockRaw.x === this.killBlock?.x && blockRaw.y === this.killBlock.y) {
                if (!block.hasTween) {
                    block.scene.tweens.add({
                        targets: block,
                        scaleX: '*=0.5',
                        scaleY: '*=0.5',
                        alpha: 0.5,
                        duration: 100,
                        ease: 'Power2',
                        yoyo: true
                    })
                    block.scene.tweens.add({
                        targets: block,
                        duration: 200,
                        angle: 180,
                        ease: Phaser.Math.Easing.Linear
                    })
                }
                this.killBlock = undefined
            }
            this.resizeables.push(block)
        })

        this.setPlayer(this.level.playerStart.x, this.level.playerStart.y)

        this.physics.add.collider(this.player, this.blocks, (p, b) => {
            const block = b as Block
            const player = p as Player

            // console.log(player.width, player.height, player.displayWidth, player.displayHeight)

            block.collide(player)
        })

        this.physics.add.overlap(this.player, this.pickups, (p, b) => {
            const key = b as Block
            const player = p as Player

            key.collide(player)
        })

        const cursors = this.input.keyboard.createCursorKeys()

        const model = {
            left: () => {
                if (this.player.resting && this.active) {
                    this.player.setGridDirection(new Phaser.Math.Vector2(-1, 0))
                    this.checkFallOutOfWorld()
                }
            },
            right: () => {
                if (this.player.resting && this.active) {
                    this.player.setGridDirection(new Phaser.Math.Vector2(1, 0))
                    this.checkFallOutOfWorld()
                }
            },
            up: () => {
                if (this.player.resting && this.active) {
                    this.player.setGridDirection(new Phaser.Math.Vector2(0, -1))
                    this.checkFallOutOfWorld()
                }
            },
            down: () => {
                if (this.player.resting && this.active) {
                    this.player.setGridDirection(new Phaser.Math.Vector2(0, 1))
                    this.checkFallOutOfWorld()
                }
            }
        }

        this.game.events.removeAllListeners('swipe')
        this.game.events.on('swipe', (dir: 'up' | 'left' | 'right' | 'down') => {
            model[dir]()
        })

        cursors.left.addListener('down', model.left)
        cursors.right.addListener('down', model.right)
        cursors.up.addListener('down', model.up)
        cursors.down.addListener('down', model.down)

        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                this.onMenu()
            }
        })

        this.scale.removeListener('resize', this.onResize, this)
        this.scale.on('resize', this.onResize, this)
    }

    onResize(gameSize: Bounds, baseSize: Bounds, displaySize: Bounds) {
        // console.log('yeeeeup')
        // // if (this.timeout) {
        // //     clearTimeout(this.timeout)
        // // }
        // // this.timeout = setTimeout(() => {
        // // console.log('resizing')
        // // console.log(gameSize, baseSize, displaySize)
        // // console.log(this.cameras.main.width, this.cameras.main.height)
        // const playerPos = this.player.gridCoordinates
        // // console.log(playerPos)
        // const blocksAndCoords = this.resizeables
        //     .filter(block => block.active)
        //     .map(block => ({
        //         block,
        //         coords: block.gridCoordinates
        //     }))
        // this.gridManager.setDimensions(this.cameras.main.width, this.cameras.main.height)

        // blocksAndCoords.forEach(({ block, coords }) => {
        //     this.gridManager.resize(block)
        //     this.gridManager.reposition(block, coords)
        // })
        // this.gridManager.resize(this.player)
        // this.gridManager.reposition(this.player, playerPos)
        // this.player.speed = this.gridManager.cellSize * 10
        // // console.log(playerPos)
        // // console.log(
        // //     this.player.displayWidth,
        // //     this.player.displayHeight,
        // //     blocksAndCoords[0].block.displayWidth,
        // //     blocksAndCoords[0].block.displayHeight
        // // )
        // this.redraw()
        // // }, 500)
        this.scene.restart()
    }

    redraw() {
        // set the size and the position of each block based on its raw data, making sure that we only set those which still exist
        // set the size and the position of the player based on the grid area that they are in
    }

    onMenu(wonLevel = false) {
        if (this.isLevelEditor) {
            this.scene.start('LevelEditorScene')
        } else if (this.fromLink) {
            this.scene.start('MainMenuScene')
            history.pushState('', document.title, window.location.pathname + window.location.search)
        } else {
            if (!this.isLevelEditor) {
                this.scene.launch('MenuOverlayScene', {
                    wonLevel,
                    levelScene: this.scene
                })
                if (!wonLevel) {
                    this.scene.pause()
                }
            }
        }
    }

    update() {
        if (
            !this.physics.world.bounds.contains(
                this.player.x - this.player.displayWidth / 2,
                this.player.y - this.player.displayHeight / 2
            ) ||
            !this.physics.world.bounds.contains(
                this.player.x + this.player.displayWidth / 2,
                this.player.y + this.player.displayHeight / 2
            )
        ) {
            this.scene.restart()
        }
    }

    resume() {
        this.active = true
    }
}

import Block from '../objects/Block'
import BlockFactory, { isPickup } from '../objects/BlockFactory'
import { cellSize } from '../objects/GridManager'
import Player from '../objects/Player'
import '../objects/LevelManager'
import BlockStrategy from '../objects/strategies/BlockStrategy'

interface Links {
    [key: string]: BlockStrategy[]
}

export default class LevelScene extends Phaser.Scene {
    active: boolean
    player!: Player
    blocks!: Phaser.Physics.Arcade.StaticGroup
    pickups!: Phaser.Physics.Arcade.Group
    entities!: Phaser.Physics.Arcade.Group

    level!: Level
    series!: string
    index!: number

    blockFactory: BlockFactory
    links: Links

    constructor() {
        super({ key: 'LevelScene' })

        this.blockFactory = BlockFactory.getInstance()
        this.links = {}

        this.active = true
    }

    async init(data: GameLevel) {
        this.level = data.level
        this.series = data.series
        this.index = data.index
        this.active = true
    }

    addBlock(type: string, gridX: number, gridY: number) {
        const block = this.blockFactory.createBlockFromCode(
            type,
            this,
            cellSize * gridX + cellSize / 2,
            cellSize * gridY + cellSize / 2
        )

        if (isPickup(type)) {
            this.pickups.add(block)
        } else {
            this.blocks.add(block)
        }

        return block
    }

    checkFallOutOfWorld() {
        let falling = true
        const playerPosition = new Phaser.Math.Vector2(
            Math.round(this.player.x - cellSize / 2),
            Math.round(this.player.y - cellSize / 2)
        )
        this.blocks.children.iterate(block => {
            const v = new Phaser.Math.Vector2(
                block.body.position.x - playerPosition.x,
                block.body.position.y - playerPosition.y
            ).normalize()
            if (this.player.body.velocity.clone().normalize().fuzzyEquals(v)) {
                falling = false
            }
        })
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
        this.player = new Player(
            this,
            gridX * cellSize + cellSize / 2,
            gridY * cellSize + cellSize / 2
        )
        this.entities.add(this.player)
    }

    create() {
        this.blocks = this.physics.add.staticGroup()
        this.pickups = this.physics.add.group()
        this.entities = this.physics.add.group({
            collideWorldBounds: false
        })

        this.level.blocks.forEach(blockRaw => {
            const block = this.addBlock(blockRaw.code, blockRaw.x, blockRaw.y)

            if (blockRaw.linkCode !== undefined) {
                if (!this.links[blockRaw.linkCode]) {
                    this.links[blockRaw.linkCode] = []
                }

                this.links[blockRaw.linkCode].forEach(strategy => {
                    strategy.link(block.strategy)
                    block.strategy.link(strategy)
                })

                this.links[blockRaw.linkCode].push(block.strategy)
            }
        })

        this.setPlayer(this.level.playerStart.x, this.level.playerStart.y)

        this.physics.add.collider(this.player, this.blocks, (p, b) => {
            const block = b as Block
            const player = p as Player

            block.collide(player)
        })

        this.physics.add.overlap(this.player, this.pickups, (p, b) => {
            const key = b as Block
            const player = p as Player

            key.collide(player)
        })

        const cursors = this.input.keyboard.createCursorKeys()

        cursors.left.addListener('down', () => {
            if (this.player.resting && this.active) {
                this.player.setGridDirection(new Phaser.Math.Vector2(-1, 0))
                this.checkFallOutOfWorld()
            }
        })
        cursors.right.addListener('down', () => {
            if (this.player.resting && this.active) {
                this.player.setGridDirection(new Phaser.Math.Vector2(1, 0))
                this.checkFallOutOfWorld()
            }
        })
        cursors.up.addListener('down', () => {
            if (this.player.resting && this.active) {
                this.player.setGridDirection(new Phaser.Math.Vector2(0, -1))
                this.checkFallOutOfWorld()
            }
        })
        cursors.down.addListener('down', () => {
            if (this.player.resting && this.active) {
                this.player.setGridDirection(new Phaser.Math.Vector2(0, 1))
                this.checkFallOutOfWorld()
            }
        })

        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                this.scene.launch('MenuOverlayScene', {
                    wonLevel: false,
                    levelScene: this.scene,
                    series: this.series,
                    index: this.index
                })
                this.scene.pause()
            }
        })
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

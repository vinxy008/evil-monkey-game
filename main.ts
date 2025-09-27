namespace SpriteKind {
    export const enemy2 = SpriteKind.create()
    export const boss = SpriteKind.create()
    export const firestar = SpriteKind.create()
}
function createEnemies2 (harder: string) {
    spritecount += 20
    for (let index = 0; index < 20; index++) {
        enemies = sprites.create(img`
            . . . . f f f f f . . . . . . . 
            . . . f 4 4 4 4 4 f . . . . . . 
            . . f d d d d 4 4 4 f . . . . . 
            . c d f d d f d 4 4 f f . . . . 
            . c d f d d f d 4 4 d d f . . . 
            c d 4 4 d d d d 4 4 b d c . . . 
            c d d d d c d d 4 4 b d c . f f 
            c c c c c d d d 4 4 f c . f 4 f 
            . f d d d d d 4 4 f f . . f 4 f 
            . . f f f f f 4 4 4 4 f . f 4 f 
            . . . . f 4 4 4 4 4 4 4 f f 4 f 
            . . . f 4 f f 4 f 4 4 4 4 f f . 
            . . . f 4 f f 4 f 4 4 4 4 f . . 
            . . . f d b f d b f f 4 f . . . 
            . . . f d d c d d b b d f . . . 
            . . . . f f f f f f f f f . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(enemies, tiles.getTileLocation(randint(0, 16), randint(0, 16)))
        enemies.follow(mySprite, 40)
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    facing = "up"
})
/**
 * projectile
 */
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    fireProjectile(3)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile12`, function (sprite, location) {
    game.setGameOverMessage(true, "credits me, you won")
    game.gameOver(true)
})
function fireAttackRing () {
    pause(100)
    for (let index = 0; index < 200; index++) {
        projectile3 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . 2 . . . . . 
            . . . . 4 . . . . 2 2 . . . . . 
            . . . . 4 2 . . 2 5 2 . . . . . 
            . . . . . 4 2 4 5 5 2 . . . . . 
            . . . . . 4 5 5 5 5 2 . . . . . 
            . . . . . . 4 5 5 5 5 2 . . . . 
            . . . . . . 4 5 2 4 2 2 . . . . 
            . . . . . . 2 2 . . 4 2 2 . . . 
            . . . . . 2 2 . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Player)
        projectile3.setPosition(boss.x, boss.y)
        projectile3.setVelocity(randint(-100, 100), randint(-100, 100))
        projectile3.setFlag(SpriteFlag.DestroyOnWall, true)
    }
}
info.onCountdownEnd(function () {
    if (spawnenemies == true) {
        createEnemies(1)
        info.startCountdown(10)
        if (hardEnemiesCreate == true) {
            createEnemies2("harder")
            info.startCountdown(10)
        }
    }
})
info.onScore(100, function () {
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    tiles.setCurrentTilemap(tilemap`level3`)
    hardEnemiesCreate = true
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    info.changeScoreBy(10)
    timer.debounce("action", 5000, function () {
        pause(5000)
        pause(5000)
        pause(5000)
    })
})
info.onScore(300, function () {
    info.setScore(1000)
    bossdead = false
    tiles.setCurrentTilemap(tilemap`level3`)
    spawnenemies = false
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    boss = sprites.create(img`
        . . . . c c c c c c . . . . . . 
        . . . c 4 4 4 4 4 4 c . . . . . 
        . . c 4 4 4 4 4 4 4 4 c . . . . 
        . c 4 4 4 4 4 4 4 4 4 4 c . . . 
        . c 4 c 4 4 4 4 c 4 4 4 c . . . 
        . f 4 4 f 4 4 f 4 4 4 4 f . . . 
        . f 4 4 4 4 4 4 4 4 4 4 f . . . 
        . . f 4 4 4 4 4 c 4 4 4 f c . . 
        . . . f c c c c 4 4 4 f 4 4 c . 
        . . c 4 2 4 4 4 4 c f 4 4 4 4 c 
        . c 4 4 2 4 4 c f c 4 4 4 4 c c 
        c 1 1 1 1 4 4 f c c 4 4 4 c . . 
        f 1 1 1 1 1 4 4 c 4 4 4 4 f . . 
        f 4 1 1 1 1 1 4 4 4 4 4 c f . . 
        . f 4 1 1 1 1 1 1 4 4 4 f . . . 
        . . c c c c c c c c c f . . . . 
        `, SpriteKind.boss)
    bossspawn = true
    tiles.placeOnTile(boss, tiles.getTileLocation(10, 10))
    boss.changeScale(5, ScaleAnchor.Middle)
    boss.follow(mySprite, 10)
})
function fireAttackStar () {
    pause(100)
    for (let index = 0; index < 20; index++) {
        projectile3 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . 2 . . . . . 
            . . . . 4 . . . . 2 2 . . . . . 
            . . . . 4 2 . . 2 5 2 . . . . . 
            . . . . . 4 2 4 5 5 2 . . . . . 
            . . . . . 4 5 5 5 5 2 . . . . . 
            . . . . . . 4 5 5 5 5 2 . . . . 
            . . . . . . 4 5 2 4 2 2 . . . . 
            . . . . . . 2 2 . . 4 2 2 . . . 
            . . . . . 2 2 . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.firestar)
        projectile3.setPosition(boss.x, boss.y)
        projectile3.setVelocity(randint(-100, 100), randint(-100, 100))
        projectile3.setFlag(SpriteFlag.DestroyOnWall, true)
    }
}
function createEnemies (num: number) {
    spritecount += 10
    for (let index = 0; index < 10; index++) {
        enemies = sprites.create(img`
            . . . . f f f f f . . . . . . . 
            . . . f 4 4 4 4 4 f . . . . . . 
            . . f d d d d 4 4 4 f . . . . . 
            . c d f d d f d 4 4 f f . . . . 
            . c d f d d f d 4 4 d d f . . . 
            c d 4 4 d d d d 4 4 b d c . . . 
            c d d d d c d d 4 4 b d c . f f 
            c c c c c d d d 4 4 f c . f 4 f 
            . f d d d d d 4 4 f f . . f 4 f 
            . . f f f f f 4 4 4 4 f . f 4 f 
            . . . . f 4 4 4 4 4 4 4 f f 4 f 
            . . . f 4 f f 4 f 4 4 4 4 f f . 
            . . . f 4 f f 4 f 4 4 4 4 f . . 
            . . . f d b f d b f f 4 f . . . 
            . . . f d d c d d b b d f . . . 
            . . . . f f f f f f f f f . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(enemies, tiles.getTileLocation(randint(0, 16), randint(0, 16)))
        enemies.follow(mySprite, 40)
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    facing = "down"
})
sprites.onOverlap(SpriteKind.enemy2, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.UntilDone)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    facing = "right"
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.enemy2, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprites.destroy(sprite)
    info.changeLifeBy(1)
    spritecount += -1
    music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.firestar, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeLifeBy(-1)
})
function fireProjectile (num: number) {
    if (facing == "up") {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . b b b . . . . . . . . 
            . . . . . b b b . . . . . . . . 
            . . . . . b b b . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 0, -150)
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
    } else if (facing == "left") {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . b b b . . . . . . . . 
            . . . . . b b b . . . . . . . . 
            . . . . . b b b . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, -150, 0)
    } else if (facing == "down") {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . b b b . . . . . . . . 
            . . . . . b b b . . . . . . . . 
            . . . . . b b b . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 0, 150)
    } else if (facing == "right") {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . b b b . . . . . . . . 
            . . . . . b b b . . . . . . . . 
            . . . . . b b b . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 150, 0)
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.boss, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    bossHP += -1
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    facing = "left"
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprites.destroy(sprite)
    info.changeLifeBy(1)
    info.changeScoreBy(10)
    spritecount += -1
    music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.UntilDone)
})
/**
 * overlaps and score changes
 */
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeLifeBy(-1)
    info.changeScoreBy(-10)
    music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.UntilDone)
})
let fireboy: Sprite = null
let projectile: Sprite = null
let bossdead = false
let boss: Sprite = null
let projectile3: Sprite = null
let facing = ""
let enemies: Sprite = null
let mySprite: Sprite = null
let spawnenemies = false
let bossspawn = false
let hardEnemiesCreate = false
hardEnemiesCreate = false
let bossHP = 100
bossspawn = false
spawnenemies = true
mySprite = sprites.create(img`
    . . . . . f f f f f . . . 
    . . . f f f f f f f f f . 
    . . f f f c f f f f f f . 
    . . f f c f f f c f f f f 
    f f c c f f f c c f f c f 
    f f f f f e f f f f c c f 
    . f f f e e f f f f f f f 
    . . f f e e f b f e e f f 
    . . . f 4 4 f 1 e 4 e f . 
    . . . f 4 4 4 4 e f f f . 
    . . . f f e e e e e f . . 
    . . . f 7 7 7 e 4 4 e . . 
    . . . f 7 7 7 e 4 4 e . . 
    . . . f 6 6 6 f e e f . . 
    . . . . f f f f f f . . . 
    . . . . . . f f f . . . . 
    `, SpriteKind.Player)
info.startCountdown(10)
info.setScore(0)
controller.moveSprite(mySprite, 100, 100)
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(mySprite)
createEnemies(2)
let spritecount = 0
game.showLongText("press b for ability 20 second cooldown", DialogLayout.Bottom)
forever(function () {
    if (bossspawn == true && Math.percentChance(50)) {
        if (true) {
            boss.setImage(img`
                . . . . c c c c c c . . . . . . 
                . . . c 4 4 4 4 4 4 c . . . . . 
                . . c 4 4 4 4 4 4 4 4 c . . . . 
                . c 4 4 4 4 4 4 4 4 4 4 c . . . 
                . c 4 c 4 4 4 4 c 4 4 4 c . . . 
                . f 4 4 f 4 4 f 4 4 4 4 f . . . 
                . f 4 4 4 4 4 4 4 4 4 4 f . . . 
                . . f 4 4 4 4 4 c 4 4 4 f c . . 
                . . . f c c c c 4 4 4 f 4 4 c . 
                . . c 4 2 4 4 4 4 c f 4 4 4 4 c 
                . c 4 4 2 4 4 c f c 4 4 4 4 c c 
                c 5 5 5 5 4 4 f c c 4 4 4 c . . 
                f 5 5 5 5 5 4 4 c 4 4 4 4 f . . 
                f 4 5 5 5 5 5 4 4 4 4 4 c f . . 
                . f 4 5 5 5 5 5 5 4 4 4 f . . . 
                . . c c c c c c c c c f . . . . 
                `)
            pause(2000)
            boss.setImage(img`
                . . . . c c c c c c . . . . . . 
                . . . c 4 4 4 4 4 4 c . . . . . 
                . . c 4 4 4 4 4 4 4 4 c . . . . 
                . c 4 4 4 4 4 4 4 4 4 4 c . . . 
                . c 4 c 4 4 4 4 c 4 4 4 c . . . 
                . f 4 4 f 4 4 f 4 4 4 4 f . . . 
                . f 4 4 4 4 4 4 4 4 4 4 f . . . 
                . . f 4 4 4 4 4 c 4 4 4 f c . . 
                . . . f c c c c 4 4 4 f 4 4 c . 
                . . c 4 2 4 4 4 4 c f 4 4 4 4 c 
                . c 4 4 2 4 4 c f c 4 4 4 4 c c 
                c 1 1 1 1 4 4 f c c 4 4 4 c . . 
                f 1 1 1 1 1 4 4 c 4 4 4 4 f . . 
                f 4 1 1 1 1 1 4 4 4 4 4 c f . . 
                . f 4 1 1 1 1 1 1 4 4 4 f . . . 
                . . c c c c c c c c c f . . . . 
                `)
            fireAttackStar()
            pause(2000)
        }
    } else if (bossspawn == true && Math.percentChance(10)) {
        boss.setImage(img`
            . . . . c c c c c c . . . . . . 
            . . . c 4 4 4 4 4 4 c . . . . . 
            . . c 4 4 4 4 4 4 4 4 c . . . . 
            . c 4 4 4 4 4 4 4 4 4 4 c . . . 
            . c 4 c 4 4 4 4 c 4 4 4 c . . . 
            . f 4 4 f 4 4 f 4 4 4 4 f . . . 
            . f 4 4 4 4 4 4 4 4 4 4 f . . . 
            . . f 4 4 4 4 4 c 4 4 4 f c . . 
            . . . f c c c c 4 4 4 f 4 4 c . 
            . . c 4 2 4 4 4 4 c f 4 4 4 4 c 
            . c 4 4 2 4 4 c f c 4 4 4 4 c c 
            c 7 7 7 7 4 4 f c c 4 4 4 c . . 
            f 7 7 7 7 7 4 4 c 4 4 4 4 f . . 
            f 4 7 7 7 7 7 4 4 4 4 4 c f . . 
            . f 4 7 7 7 7 7 7 4 4 4 f . . . 
            . . c c c c c c c c c f . . . . 
            `)
        pause(2000)
        for (let index = 0; index < 20; index++) {
            fireboy = sprites.create(img`
                ........................
                ........................
                ........................
                ........................
                ..........ffff..........
                ........ff2222ff........
                .......fb222222bf.......
                .......f22222222f.......
                ......f2222222222f......
                ......f2222222222f......
                ......f2222222222f......
                ......fb2bf22fb2bf......
                ......fc2cf22fc2cf......
                .......fb222222bf.......
                ......fffc2b2b2ffff.....
                ....fc222cbfbfc222cf....
                ....f2b2b2ffff2b2b2f....
                ....fbfbffffffbfbfbf....
                .........ffffff.........
                ...........fff..........
                ........................
                ........................
                ........................
                ........................
                `, SpriteKind.enemy2)
            tiles.placeOnTile(fireboy, tiles.getTileLocation(randint(0, 20), randint(0, 20)))
            fireboy.follow(mySprite, 40)
        }
        boss.setImage(img`
            . . . . c c c c c c . . . . . . 
            . . . c 4 4 4 4 4 4 c . . . . . 
            . . c 4 4 4 4 4 4 4 4 c . . . . 
            . c 4 4 4 4 4 4 4 4 4 4 c . . . 
            . c 4 c 4 4 4 4 c 4 4 4 c . . . 
            . f 4 4 f 4 4 f 4 4 4 4 f . . . 
            . f 4 4 4 4 4 4 4 4 4 4 f . . . 
            . . f 4 4 4 4 4 c 4 4 4 f c . . 
            . . . f c c c c 4 4 4 f 4 4 c . 
            . . c 4 2 4 4 4 4 c f 4 4 4 4 c 
            . c 4 4 2 4 4 c f c 4 4 4 4 c c 
            c 1 1 1 1 4 4 f c c 4 4 4 c . . 
            f 1 1 1 1 1 4 4 c 4 4 4 4 f . . 
            f 4 1 1 1 1 1 4 4 4 4 4 c f . . 
            . f 4 1 1 1 1 1 1 4 4 4 f . . . 
            . . c c c c c c c c c f . . . . 
            `)
        pause(2000)
    } else if (bossspawn == true && Math.percentChance(20)) {
        boss.setImage(img`
            . . . . c c c c c c . . . . . . 
            . . . c 4 4 4 4 4 4 c . . . . . 
            . . c 4 4 4 4 4 4 4 4 c . . . . 
            . c 4 4 4 4 4 4 4 4 4 4 c . . . 
            . c 4 c 4 4 4 4 c 4 4 4 c . . . 
            . f 4 4 f 4 4 f 4 4 4 4 f . . . 
            . f 4 4 4 4 4 4 4 4 4 4 f . . . 
            . . f 4 4 4 4 4 c 4 4 4 f c . . 
            . . . f c c c c 4 4 4 f 4 4 c . 
            . . c 4 2 4 4 4 4 c f 4 4 4 4 c 
            . c 4 4 2 4 4 c f c 4 4 4 4 c c 
            c 6 6 6 6 4 4 f c c 4 4 4 c . . 
            f 6 6 6 6 6 4 4 c 4 4 4 4 f . . 
            f 4 6 6 6 6 6 4 4 4 4 4 c f . . 
            . f 4 6 6 6 6 6 6 4 4 4 f . . . 
            . . c c c c c c c c c f . . . . 
            `)
        pause(2000)
        fireAttackRing()
        boss.setImage(img`
            . . . . c c c c c c . . . . . . 
            . . . c 4 4 4 4 4 4 c . . . . . 
            . . c 4 4 4 4 4 4 4 4 c . . . . 
            . c 4 4 4 4 4 4 4 4 4 4 c . . . 
            . c 4 c 4 4 4 4 c 4 4 4 c . . . 
            . f 4 4 f 4 4 f 4 4 4 4 f . . . 
            . f 4 4 4 4 4 4 4 4 4 4 f . . . 
            . . f 4 4 4 4 4 c 4 4 4 f c . . 
            . . . f c c c c 4 4 4 f 4 4 c . 
            . . c 4 2 4 4 4 4 c f 4 4 4 4 c 
            . c 4 4 2 4 4 c f c 4 4 4 4 c c 
            c 1 1 1 1 4 4 f c c 4 4 4 c . . 
            f 1 1 1 1 1 4 4 c 4 4 4 4 f . . 
            f 4 1 1 1 1 1 4 4 4 4 4 c f . . 
            . f 4 1 1 1 1 1 1 4 4 4 f . . . 
            . . c c c c c c c c c f . . . . 
            `)
        pause(2000)
    }
})
game.onUpdateInterval(2000, function () {
    info.changeScoreBy(-5)
})
forever(function () {
	
})
/**
 * enemy creation
 */
forever(function () {
    if (spritecount == 30) {
        info.stopCountdown()
    }
    if (spritecount > 30) {
        info.startCountdown(10)
    }
})
forever(function () {
    if (bossHP <= 50) {
        bossspawn = false
        if (Math.percentChance(75)) {
            boss.setImage(img`
                . . . . c c c c c c . . . . . . 
                . . . c 4 4 4 4 4 4 c . . . . . 
                . . c 4 4 4 4 4 4 4 4 c . . . . 
                . c 4 4 4 4 4 4 4 4 4 4 c . . . 
                . c 4 c 4 4 4 4 c 4 4 4 c . . . 
                . f 4 4 f 4 4 f 4 4 4 4 f . . . 
                . f 4 4 4 4 4 4 4 4 4 4 f . . . 
                . . f 4 4 4 4 4 c 4 4 4 f c . . 
                . . . f c c c c 4 4 4 f 4 4 c . 
                . . c 4 2 4 4 4 4 c f 4 4 4 4 c 
                . c 4 4 2 4 4 c f c 4 4 4 4 c c 
                c 5 5 5 5 4 4 f c c 4 4 4 c . . 
                f 5 5 5 5 5 4 4 c 4 4 4 4 f . . 
                f 4 5 5 5 5 5 4 4 4 4 4 c f . . 
                . f 4 5 5 5 5 5 5 4 4 4 f . . . 
                . . c c c c c c c c c f . . . . 
                `)
            pause(2000)
            boss.setImage(img`
                . . . . c c c c c c . . . . . . 
                . . . c 4 4 4 4 4 4 c . . . . . 
                . . c 4 4 4 4 4 4 4 4 c . . . . 
                . c 4 4 4 4 4 4 4 4 4 4 c . . . 
                . c 4 c 4 4 4 4 c 4 4 4 c . . . 
                . f 4 4 f 4 4 f 4 4 4 4 f . . . 
                . f 4 4 4 4 4 4 4 4 4 4 f . . . 
                . . f 4 4 4 4 4 c 4 4 4 f c . . 
                . . . f c c c c 4 4 4 f 4 4 c . 
                . . c 4 2 4 4 4 4 c f 4 4 4 4 c 
                . c 4 4 2 4 4 c f c 4 4 4 4 c c 
                c 1 1 1 1 4 4 f c c 4 4 4 c . . 
                f 1 1 1 1 1 4 4 c 4 4 4 4 f . . 
                f 4 1 1 1 1 1 4 4 4 4 4 c f . . 
                . f 4 1 1 1 1 1 1 4 4 4 f . . . 
                . . c c c c c c c c c f . . . . 
                `)
            fireAttackStar()
            pause(2000)
        } else if (Math.percentChance(30)) {
            boss.setImage(img`
                . . . . c c c c c c . . . . . . 
                . . . c 4 4 4 4 4 4 c . . . . . 
                . . c 4 4 4 4 4 4 4 4 c . . . . 
                . c 4 4 4 4 4 4 4 4 4 4 c . . . 
                . c 4 c 4 4 4 4 c 4 4 4 c . . . 
                . f 4 4 f 4 4 f 4 4 4 4 f . . . 
                . f 4 4 4 4 4 4 4 4 4 4 f . . . 
                . . f 4 4 4 4 4 c 4 4 4 f c . . 
                . . . f c c c c 4 4 4 f 4 4 c . 
                . . c 4 2 4 4 4 4 c f 4 4 4 4 c 
                . c 4 4 2 4 4 c f c 4 4 4 4 c c 
                c 7 7 7 7 4 4 f c c 4 4 4 c . . 
                f 7 7 7 7 7 4 4 c 4 4 4 4 f . . 
                f 4 7 7 7 7 7 4 4 4 4 4 c f . . 
                . f 4 7 7 7 7 7 7 4 4 4 f . . . 
                . . c c c c c c c c c f . . . . 
                `)
            pause(2000)
            for (let index = 0; index < 20; index++) {
                fireboy = sprites.create(img`
                    ........................
                    ........................
                    ........................
                    ........................
                    ..........ffff..........
                    ........ff2222ff........
                    .......fb222222bf.......
                    .......f22222222f.......
                    ......f2222222222f......
                    ......f2222222222f......
                    ......f2222222222f......
                    ......fb2bf22fb2bf......
                    ......fc2cf22fc2cf......
                    .......fb222222bf.......
                    ......fffc2b2b2ffff.....
                    ....fc222cbfbfc222cf....
                    ....f2b2b2ffff2b2b2f....
                    ....fbfbffffffbfbfbf....
                    .........ffffff.........
                    ...........fff..........
                    ........................
                    ........................
                    ........................
                    ........................
                    `, SpriteKind.enemy2)
                tiles.placeOnTile(fireboy, tiles.getTileLocation(randint(0, 20), randint(0, 20)))
                fireboy.follow(mySprite, 40)
            }
            boss.setImage(img`
                . . . . c c c c c c . . . . . . 
                . . . c 4 4 4 4 4 4 c . . . . . 
                . . c 4 4 4 4 4 4 4 4 c . . . . 
                . c 4 4 4 4 4 4 4 4 4 4 c . . . 
                . c 4 c 4 4 4 4 c 4 4 4 c . . . 
                . f 4 4 f 4 4 f 4 4 4 4 f . . . 
                . f 4 4 4 4 4 4 4 4 4 4 f . . . 
                . . f 4 4 4 4 4 c 4 4 4 f c . . 
                . . . f c c c c 4 4 4 f 4 4 c . 
                . . c 4 2 4 4 4 4 c f 4 4 4 4 c 
                . c 4 4 2 4 4 c f c 4 4 4 4 c c 
                c 1 1 1 1 4 4 f c c 4 4 4 c . . 
                f 1 1 1 1 1 4 4 c 4 4 4 4 f . . 
                f 4 1 1 1 1 1 4 4 4 4 4 c f . . 
                . f 4 1 1 1 1 1 1 4 4 4 f . . . 
                . . c c c c c c c c c f . . . . 
                `)
            pause(2000)
        } else if (Math.percentChance(45)) {
            boss.setImage(img`
                . . . . c c c c c c . . . . . . 
                . . . c 4 4 4 4 4 4 c . . . . . 
                . . c 4 4 4 4 4 4 4 4 c . . . . 
                . c 4 4 4 4 4 4 4 4 4 4 c . . . 
                . c 4 c 4 4 4 4 c 4 4 4 c . . . 
                . f 4 4 f 4 4 f 4 4 4 4 f . . . 
                . f 4 4 4 4 4 4 4 4 4 4 f . . . 
                . . f 4 4 4 4 4 c 4 4 4 f c . . 
                . . . f c c c c 4 4 4 f 4 4 c . 
                . . c 4 2 4 4 4 4 c f 4 4 4 4 c 
                . c 4 4 2 4 4 c f c 4 4 4 4 c c 
                c 6 6 6 6 4 4 f c c 4 4 4 c . . 
                f 6 6 6 6 6 4 4 c 4 4 4 4 f . . 
                f 4 6 6 6 6 6 4 4 4 4 4 c f . . 
                . f 4 6 6 6 6 6 6 4 4 4 f . . . 
                . . c c c c c c c c c f . . . . 
                `)
            pause(2000)
            fireAttackRing()
            boss.setImage(img`
                . . . . c c c c c c . . . . . . 
                . . . c 4 4 4 4 4 4 c . . . . . 
                . . c 4 4 4 4 4 4 4 4 c . . . . 
                . c 4 4 4 4 4 4 4 4 4 4 c . . . 
                . c 4 c 4 4 4 4 c 4 4 4 c . . . 
                . f 4 4 f 4 4 f 4 4 4 4 f . . . 
                . f 4 4 4 4 4 4 4 4 4 4 f . . . 
                . . f 4 4 4 4 4 c 4 4 4 f c . . 
                . . . f c c c c 4 4 4 f 4 4 c . 
                . . c 4 2 4 4 4 4 c f 4 4 4 4 c 
                . c 4 4 2 4 4 c f c 4 4 4 4 c c 
                c 1 1 1 1 4 4 f c c 4 4 4 c . . 
                f 1 1 1 1 1 4 4 c 4 4 4 4 f . . 
                f 4 1 1 1 1 1 4 4 4 4 4 c f . . 
                . f 4 1 1 1 1 1 1 4 4 4 f . . . 
                . . c c c c c c c c c f . . . . 
                `)
            pause(2000)
        }
    }
})
forever(function () {
    if (bossHP == 0) {
        sprites.destroyAllSpritesOfKind(SpriteKind.boss)
        tiles.setTileAt(tiles.getTileLocation(9, 8), assets.tile`myTile12`)
    }
    if (bossdead == true) {
        info.changeLifeBy(100)
    }
})
/**
 * controls directions of characters
 */
forever(function () {
    if (facing == "up") {
        animation.runImageAnimation(
        mySprite,
        [img`
            . . . . f f f f . . . . . 
            . . f f c c c c f f . . . 
            . f f c c c c c c f f . . 
            f f c c c c c c c c f f . 
            f f c c f c c c c c c f . 
            f f f f f c c c f c c f . 
            f f f f c c c f c c f f . 
            f f f f f f f f f f f f . 
            f f f f f f f f f f f f . 
            . f f f f f f f f f f . . 
            . f f f f f f f f f f . . 
            f e f f f f f f f f e f . 
            e 4 f 7 7 7 7 7 7 c 4 e . 
            e e f 6 6 6 6 6 6 f e e . 
            . . . f f f f f f . . . . 
            . . . f f . . f f . . . . 
            `,img`
            . . . . . . . . . . . . . 
            . . . . . f f f f . . . . 
            . . . f f c c c c f f . . 
            . f f f c c c c c c f f . 
            f f c c c c c c c c c f f 
            f c c c c f c c c c c c f 
            . f f f f c c c c f c c f 
            . f f f f c c f c c c f f 
            . f f f f f f f f f f f f 
            . f f f f f f f f f f f f 
            . . f f f f f f f f f f . 
            . . e f f f f f f f f f . 
            . . e f f f f f f f f e f 
            . . 4 c 7 7 7 7 7 e 4 4 e 
            . . e f f f f f f f e e . 
            . . . f f f . . . . . . . 
            `,img`
            . . . . . . . . . . . . . 
            . . . . . f f f f . . . . 
            . . . f f c c c c f f . . 
            . . f f c c c c c c f f . 
            . f f f c c c c c c c f f 
            f f f c c c c c c c c c f 
            f f c c c f c c c c c c f 
            . f f f f f c c c f c f f 
            . f f f f c c f f c f f f 
            . . f f f f f f f f f f f 
            . . f f f f f f f f f f . 
            . . f f f f f f f f f e . 
            . f e f f f f f f f f e . 
            . e 4 4 e 7 7 7 7 7 c 4 . 
            . . e e f f f f f f f e . 
            . . . . . . . . f f f . . 
            `],
        500,
        false
        )
    } else if (facing == "left") {
        animation.runImageAnimation(
        mySprite,
        [img`
            . . . . . f f f f f . . . 
            . . . f f f f f f f f f . 
            . . f f f c f f f f f f . 
            . . f f c f f f c f f f f 
            f f c c f f f c c f f c f 
            f f f f f e f f f f c c f 
            . f f f e e f f f f f f f 
            . . f f e e f b f e e f f 
            . . . f 4 4 f 1 e 4 e f . 
            . . . f 4 4 4 4 e f f f . 
            . . . f f e e e e e f . . 
            . . . f 7 7 7 e 4 4 e . . 
            . . . f 7 7 7 e 4 4 e . . 
            . . . f 6 6 6 f e e f . . 
            . . . . f f f f f f . . . 
            . . . . . . f f f . . . . 
            `,img`
            . . . . . . . . . . . . . 
            . . . . f f f f f f . . . 
            . . . f f f f f f f f f . 
            . . f f f c f f f f f f . 
            . f f f c f f f c f f f f 
            f f c c f f f c c f f c f 
            f f f f f e f f f f c c f 
            . f f f e e f f f f f f f 
            . . f f e e f b f e e f f 
            . . f f 4 4 f 1 e 4 e f . 
            . . . f 4 4 4 e e f f f . 
            . . . f f e e 4 4 e f . . 
            . . . f 7 7 e 4 4 e f . . 
            . . f f 6 6 f e e f f f . 
            . . f f f f f f f f f f . 
            . . . f f f . . . f f . . 
            `,img`
            . . . . . . . . . . . . . 
            . . . . f f f f f f . . . 
            . . . f f f f f f f f f . 
            . . f f f c f f f f f f . 
            . f f f c f f f c f f f f 
            f f c c f f f c c f f c f 
            f f f f f e f f f f c c f 
            . f f f e e f f f f f f f 
            . f f f e e f b f e e f f 
            . . f f 4 4 f 1 e 4 e f f 
            . . . f 4 4 4 4 e f f f . 
            . . . f f e e e e 4 4 4 . 
            . . . f 7 7 7 7 e 4 4 e . 
            . . f f 6 6 6 6 f e e f . 
            . . f f f f f f f f f f . 
            . . . f f f . . . f f . . 
            `],
        500,
        false
        )
    } else if (facing == "down") {
        animation.runImageAnimation(
        mySprite,
        [img`
            . . . . f f f f . . . . . 
            . . f f f f f f f f . . . 
            . f f f f f f c f f f . . 
            f f f f f f c c f f f c . 
            f f f c f f f f f f f c . 
            c c c f f f e e f f c c . 
            f f f f f e e f f c c f . 
            f f f b f e e f b f f f . 
            . f 4 1 f 4 4 f 1 4 f . . 
            . f e 4 4 4 4 4 4 e f . . 
            . f f f e e e e f f f . . 
            f e f b 7 7 7 7 b f e f . 
            e 4 f 7 7 7 7 7 7 f 4 e . 
            e e f 6 6 6 6 6 6 f e e . 
            . . . f f f f f f . . . . 
            . . . f f . . f f . . . . 
            `,img`
            . . . . . . . . . . . . . 
            . . . . . f f f f . . . . 
            . . . f f f f f f f f . . 
            . . f f f f f f c f f f . 
            f f f f f f f c c f f f c 
            f f f f c f f f f f f f c 
            . c c c f f f e e f f c c 
            . f f f f f e e f f c c f 
            . f f f b f e e f b f f f 
            . f f 4 1 f 4 4 f 1 4 f f 
            . . f e 4 4 4 4 4 e e f e 
            . f e f b 7 7 7 e 4 4 4 e 
            . e 4 f 7 7 7 7 e 4 4 e . 
            . . . f 6 6 6 6 6 e e . . 
            . . . f f f f f f f . . . 
            . . . f f f . . . . . . . 
            `,img`
            . . . . . . . . . . . . . 
            . . . . f f f f . . . . . 
            . . f f f f f f f f . . . 
            . f f f c f f f f f f . . 
            c f f f c c f f f f f f f 
            c f f f f f f f c f f f f 
            c c f f e e f f f c c c . 
            f c c f f e e f f f f f . 
            f f f b f e e f b f f f . 
            f f 4 1 f 4 4 f 1 4 f f . 
            e f e e 4 4 4 4 4 e f . . 
            e 4 4 4 e 7 7 7 b f e f . 
            . e 4 4 e 7 7 7 7 f 4 e . 
            . . e e 6 6 6 6 6 f . . . 
            . . . f f f f f f f . . . 
            . . . . . . . f f f . . . 
            `],
        500,
        false
        )
    } else if (facing == "right") {
        animation.runImageAnimation(
        mySprite,
        [img`
            . . . . . . . . . . . . . 
            . . . f f f f f f . . . . 
            . f f f f f f f f f . . . 
            . f f f f f f c f f f . . 
            f f f f c f f f c f f f . 
            f c f f c c f f f c c f f 
            f c c f f f f e f f f f f 
            f f f f f f f e e f f f . 
            f f e e f b f e e f f f . 
            f f e 4 e 1 f 4 4 f f . . 
            . f f f e 4 4 4 4 f . . . 
            . 4 4 4 e e e e f f . . . 
            . e 4 4 e 7 7 7 7 f . . . 
            . f e e f 6 6 6 6 f f . . 
            . f f f f f f f f f f . . 
            . . f f . . . f f f . . . 
            `,img`
            . . . . . . . . . . . . . 
            . . . f f f f f f . . . . 
            . f f f f f f f f f . . . 
            . f f f f f f c f f f . . 
            f f f f c f f f c f f f . 
            f c f f c c f f f c c f f 
            f c c f f f f e f f f f f 
            f f f f f f f e e f f f . 
            f f e e f b f e e f f . . 
            . f e 4 e 1 f 4 4 f f . . 
            . f f f e e 4 4 4 f . . . 
            . . f e 4 4 e e f f . . . 
            . . f e 4 4 e 7 7 f . . . 
            . f f f e e f 6 6 f f . . 
            . f f f f f f f f f f . . 
            . . f f . . . f f f . . . 
            `,img`
            . . . f f f f f . . . . . 
            . f f f f f f f f f . . . 
            . f f f f f f c f f f . . 
            f f f f c f f f c f f . . 
            f c f f c c f f f c c f f 
            f c c f f f f e f f f f f 
            f f f f f f f e e f f f . 
            f f e e f b f e e f f . . 
            . f e 4 e 1 f 4 4 f . . . 
            . f f f e 4 4 4 4 f . . . 
            . . f e e e e e f f . . . 
            . . e 4 4 e 7 7 7 f . . . 
            . . e 4 4 e 7 7 7 f . . . 
            . . f e e f 6 6 6 f . . . 
            . . . f f f f f f . . . . 
            . . . . f f f . . . . . . 
            `],
        500,
        false
        )
    }
})

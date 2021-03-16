 let spacePlane = sprites.create(img`
     . . . . . . . . . . . . . . . .
     . . . . . e e . e d . . . . . .
     . . . . e . . e . . d . . . . .
     . . . . . b b b b . . . . . . .
     . . . b b b b b b b . . . . . .
     . . b b b b b 3 b b 1 . . . . .
     d b b b b b b 3 b b 9 . . . . .
     . . b c b b b b b b b . . . . .
     . . . . c c b b b b . . . . . .
     . . . . . c c c b . . . . . . .
     . . . . . . . . . . . . . . . .
     . . . . . . . . . . . . . . . .
     . . . . . . . . . . . . . . . .
     . . . . . . . . . . . . . . . .
     . . . . . . . . . . . . . . . .
     . . . . . . . . . . . . . . . .
 `, SpriteKind.Player)
spacePlane.setStayInScreen(true)
info.setLife(3)
controller.moveSprite(spacePlane, 200, 200)
let spacePlane: Sprite = null 
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let dart = sprites.createProjectileFromSprite(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . 2 2
    . . . . . . 1 2 1 2 1 . . 1 . .
    . . . 2 2 1 2 1 2 1 2 1 2 . . .
    1 2 2 2 2 1 2 1 2 1 2 1 2 . . .
    . . . 2 2 1 2 1 2 1 2 1 2 2 . .
    . . . . . . 1 2 1 2 1 . . 1 . .
    . . . . . . . . . . . . . . 2 2
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, spacePlane, 200, 0)
})
game.onUpdateInterval(500, function () {
    let bogey = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . 7 7 7 . .
        . . . . . . . . . . 7 7 . . . .
        . . . . . . . . 7 7 7 . . . . .
        . . . . . . 7 7 7 7 9 . . . . .
        . . . 6 7 7 7 7 9 9 6 6 . 6 6 6
        9 7 7 7 7 7 7 6 6 6 6 6 6 6 . .
        . . . 7 7 7 7 7 6 6 6 6 . 6 6 6
        . . . . . . 7 7 7 7 6 . . . . .
        . . . . . . . . 7 7 7 . . . . .
        . . . . . . . . . . 7 7 . . . .
        . . . . . . . . . . . 7 7 7 . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Enemy)
    bogey.setVelocity(-100, 0)
    bogey.left = scene.screenWidth()
    bogey.y = randint(0, scene.screenHeight())
    bogey.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
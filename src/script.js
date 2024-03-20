// Dependencies
import * as THREE from 'three'

// Canvas, target the canvas element to the webgl class
const canvas = document.querySelector('canvas.webgl')

console.log('JavaScript is working!')
console.log('Hello Three.js')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 * @type {Group}
 */
const group = new THREE.Group()
scene.add(group)



const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xffff, wireframe:true})
)
group.add(cube3)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xeeff11, wireframe:true})
)
group.add(cube2)


// Cube 1
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff}),
)
group.add(cube)


//Positional

cube3.position.set(0,0,4)
cube3.rotation.reorder('YXZ')

cube.position.set(2,0,2)
cube.rotation.reorder('YXZ')

cube2.position.set(2,0,0)
cube2.rotation.reorder('YXZ')


// cube3.position.normalize() //reduce vector until length is 1

/**
 * Sizes
  */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 * @type {PerspectiveCamera}
 */
const camera = new THREE.PerspectiveCamera(150, sizes.width / sizes.height)
//  We need to move the camera BACKWARDS, so we can see the object render
camera.position.x = -1 // POV
camera.position.z = -1 // POV
scene.add(camera)


// console.log(cube3.position.distanceTo(camera.position))


/**
 * Renderer
 * @type {WebGLRenderer}
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})


/**
 * Animate / On Tick Update
 */

const clock = new THREE.Clock()
// const clock = new THREE.Clock()
const tick = () => {

    // Clock
    // const currentTime = Date.now()

    //Seconds is the left-most number
    const elapsedTime = clock.getElapsedTime()

    console.log("Elapsed time: ", elapsedTime)
    console.log()

    // Update Objects
    cube3.rotation.x = Math.sin(elapsedTime) * 0.35
    cube3.rotation.z = Math.sin(elapsedTime) * 0.64

    //1 revolution per second
    cube.rotation.y = elapsedTime * Math.PI * 2
    //cube3 move in a circle
    cube3.position.y = Math.sin(elapsedTime)
    cube3.position.x = Math.cos(elapsedTime)
    cube3.position.z = Math.cos(elapsedTime)

    cube2.rotation.x = elapsedTime

    camera.position.z += Math.cos(elapsedTime) * 0.1

    camera.lookAt(cube.position)


    // Keep updating render every tick
    renderer.render(scene,camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

renderer.setSize(sizes.width, sizes.height)

tick()
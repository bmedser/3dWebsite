// Dependencies
import * as THREE from 'three'
import gsap from 'gsap'
import './style.css'
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import webGL from "three/addons/capabilities/WebGL.js";

/**
 * Cursor
 *
 */
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width -0.5
    cursor.y = -(event.clientY / sizes.height -0.5)

    console.log("X: ", cursor.x, "Y: ", cursor.y)
})



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
 *
 */
const camera = new THREE.PerspectiveCamera(150, sizes.width / sizes.height, 0.1, 10000)
/*const aspectRatio = (sizes.width / sizes.height)
const camera = new THREE.OrthographicCamera(
    -4 * aspectRatio,
    4 * aspectRatio,
    4,
    -4,
    0.1, 100)*/


//  We need to move the camera BACKWARDS, so we can see the object render
camera.position.x = 0 // POV
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
 * Controls
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

controls.update()

/**
 * Animate / On Tick Update
 */
const clock = new THREE.Clock()

gsap.to(cube.position, { duration: 5, delay: 2, x:-1 })
gsap.to(cube.position, { duration: 10, delay: 6, x:2 })

// const clock = new THREE.Clock()
const tick = () => {

    // Clock
    // const currentTime = Date.now()

    //Seconds is the left-most number
    const elapsedTime = clock.getElapsedTime()
    // console.log("Elapsed time: ", elapsedTime)

    // Make Camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 1.5
    camera.lookAt(cube.position)

    controls.update()


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

    // camera.position.z += Math.cos(elapsedTime) * 0.1


    // Keep updating render every tick
    renderer.render(scene,camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

renderer.setSize(sizes.width, sizes.height)

tick()
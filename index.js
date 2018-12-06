const Point2 = function(x, y) {
  this.x = x
  this.y = y
}
const Point3 = function(x, y, z) {
  this.x = x
  this.y = y
  this.z = z
}
const Cube = function(x, y, z, size) {
  size *= 0.5
  this.x = x
  this.y = y
  this.z = z
  this.size = size
  this.vertices = [
    new Point3(x - size, y - size, z - size), // 0
    new Point3(x + size, y - size, z - size), // 1
    new Point3(x + size, y + size, z - size), // 2
    new Point3(x - size, y + size, z - size), // 3
    new Point3(x - size, y - size, z + size), // 4
    new Point3(x + size, y - size, z + size), // 5
    new Point3(x + size, y + size, z + size), // 6
    new Point3(x - size, y + size, z + size), // 7
  ]
  this.faces = [
    {points: [0, 1, 2, 3], color: '#c9ddff', shipbobPoints: [4,5,6,7]},         // Purple '#5300ef'
    {points: [0, 4, 5, 1], color: '#9dc0f9', shipbobPoints: [0,1,2,3,4]},       // Green  '#15ff00'
    {points: [0, 3, 7, 4], color: '#82b1ff', shipbobPoints: [7,8,9]},           // Yellow '#e8bd00'
    {points: [1, 5, 6, 2], color: '#c9ddff', shipbobPoints: [14,15,16,17]},     // Blue   '#09285b'
    {points: [3, 2, 6, 7], color: '#9dc0f9', shipbobPoints: [10,11,12,13,14]},  // Red    '#e8003d'
    {points: [4, 7, 6, 5], color: '#82b1ff', shipbobPoints: [17,18,19]}         // Pink   '#ff4ced'
  ]
  const OFFSET = 100
  const INSET = 30
  const INSET2 = 40
  this.lineTime = 0
  this.shipbobLogoPoints = [
    new Point3(x + size - INSET, y - size, z - size + OFFSET),  // 1
    new Point3(x + size - INSET, y - size, z + size - INSET),   // 5
    new Point3(x - size + INSET, y - size, z + size - INSET),   // 4
    new Point3(x - size + INSET, y - size, z - size + INSET),   // 0
    new Point3(x + size - INSET, y - size, z - size + INSET),   // 1
    new Point3(x + size - INSET, y - size, z - size),           // 1
    new Point3(x + size - INSET, y + size - INSET2, z - size),   // 2
    new Point3(x - size, y + size - INSET2, z - size),           // 3
    new Point3(x - size, y + size - INSET2, z + size - INSET),   // 7
    new Point3(x - size, y - size + OFFSET, z + size - INSET),  // 4

    new Point3(x + size - OFFSET, y + size, z - size + INSET),  // 2
    new Point3(x - size + INSET, y + size, z - size + INSET),   // 3
    new Point3(x - size + INSET, y + size, z + size - INSET),   // 7
    new Point3(x + size - INSET, y + size, z + size - INSET),   // 6
    new Point3(x + size - INSET, y + size, z - size + INSET),   // 2
    new Point3(x + size, y + size, z - size + INSET),           // 2
    new Point3(x + size, y - size + INSET2, z - size + INSET),   // 1
    new Point3(x + size, y - size + INSET2, z + size),           // 5
    new Point3(x - size + INSET, y - size + INSET2, z + size),   // 4
    new Point3(x - size + INSET, y + size - OFFSET, z + size),  // 7
    
  ]
  // this.shipbobLogoPoints = [1,5,4,0,1,2,3,7,4]

}
Cube.prototype = {
  drawShipbob: function(shipbobPoints) {
    // CODE TO ANIMATE LINE - WAYPOINT CODE
    // http://mathcentral.uregina.ca/QQ/database/QQ.09.01/murray2.html
    // var directionVector = (a, b) => ({x: b.x-a.x, y: b.y-a.y, z: b.z-a.z})
    // var pointOnLine = (a, b) => (t) => ({x: a.x + b.x * t, y: a.y + b.y * t, z: a.z + b.z * t})

    // var pointOnLineEq = pointOnLine(a, directionVector(a, b))

    // var divideLine = (a, b) => (divisions) => {
    //   var points = []
    //     for (var i = 0; i <= divisions; i++) {
    //         var t = i/divisions
    //         points.push(pointOnLineEq(t))
    //     }
    //   return points
    // }
    if (shipbobPoints) {
      let shipbobVertices = projectPoints(FOCAL_LENGTH)(cube.shipbobLogoPoints, width, height)
      context.lineWidth = 5
      context.lineCap = 'round'
      context.lineJoin = 'round'
      context.strokeStyle = '#3f89ff'
      context.lineCap = 'round'
      context.lineJoin = 'round'
      context.beginPath()
      context.lineWidth = 30
      context.moveTo(shipbobVertices[shipbobPoints[0]].x, shipbobVertices[shipbobPoints[0]].y)
      for (let logoIndex = 1; logoIndex < shipbobPoints.length; logoIndex++) {
        context.lineTo(shipbobVertices[shipbobPoints[logoIndex]].x, shipbobVertices[shipbobPoints[logoIndex]].y)
      }
      context.stroke()
    }

  },
  draw: function() {
    let vertices = projectPoints(FOCAL_LENGTH)(cube.vertices, width, height)

    for (let index = cube.faces.length - 1; index > -1; -- index) {
      let face = cube.faces[index]
      let facePoints = face.points
      let faceColor = face.color
      let p1 = cube.vertices[facePoints[0]]
      let p2 = cube.vertices[facePoints[1]]
      let p3 = cube.vertices[facePoints[2]]
      let v1 = new Point3(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z)
      let v2 = new Point3(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z)
      let n  = new Point3(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x)
      // if (false) {

      let normal = -p1.x * n.x + -p1.y * n.y + -p1.z * n.z
      let ISOOFFSET = 4000000 // when projecting to iso the cube is still rendering when in real life you wouldnt see it. this seems to be the magic number...
      if (normal - ISOOFFSET <= 0) {
        context.strokeStyle = '#ffff'
        context.lineWidth = 5
        context.lineCap = 'round'
        context.lineJoin = 'round'
        context.fillStyle = faceColor
        context.beginPath()
        context.moveTo(vertices[facePoints[0]].x, vertices[facePoints[0]].y)
        context.lineTo(vertices[facePoints[1]].x, vertices[facePoints[1]].y)
        context.lineTo(vertices[facePoints[2]].x, vertices[facePoints[2]].y)
        context.lineTo(vertices[facePoints[3]].x, vertices[facePoints[3]].y)
        context.closePath()
        context.fill()
        context.stroke()
        this.drawShipbob(face.shipbobPoints)
      }
    }
  },
  rotX: function(degree) {
    const radian = degree * Math.PI/180
    this.XRot = degree
    var cosine = Math.cos(radian)
    var sine   = Math.sin(radian)
    for (let index = this.vertices.length - 1; index > -1; -- index) {
      let p = this.vertices[index]
      let y = (p.y - this.y) * cosine - (p.z - this.z) * sine
      let z = (p.y - this.y) * sine + (p.z - this.z) * cosine
      p.y = y + this.y
      p.z = z + this.z
    }
    for (let index = this.shipbobLogoPoints.length - 1; index > -1; -- index) {
      let p = this.shipbobLogoPoints[index]
      let y = (p.y - this.y) * cosine - (p.z - this.z) * sine
      let z = (p.y - this.y) * sine + (p.z - this.z) * cosine
      p.y = y + this.y
      p.z = z + this.z
    }
  },
  rotY: function(degree) {
    const radian = degree * Math.PI/180
    this.YRot = degree
    var cosine = Math.cos(radian)
    var sine   = Math.sin(radian)
    for (let index = this.vertices.length - 1; index > -1; -- index) {
      let p = this.vertices[index]
      let x = (p.z - this.z) * sine + (p.x - this.x) * cosine
      let z = (p.z - this.z) * cosine - (p.x - this.x) * sine
      p.x = x + this.x
      p.z = z + this.z
    }
    for (let index = this.shipbobLogoPoints.length - 1; index > -1; -- index) {
      let p = this.shipbobLogoPoints[index]
      let x = (p.z - this.z) * sine + (p.x - this.x) * cosine
      let z = (p.z - this.z) * cosine - (p.x - this.x) * sine
      p.x = x + this.x
      p.z = z + this.z
    }
  }
}

const elasticInOut = (k) => {
  if (k === 0) {
    return 0;
  }
  if (k === 1) {
    return 1;
  }
  k *= 2;
  if (k < 1) {
    return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
  }
  return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
}

function normalize (max1,min1) {
  return (max2,min2) => {
    return (val) => {
      return (max1-min1)/(max2-min2)*(val-min2)+min1
    }
  }
}

const projectPoints = (fl) => (points3, width, height) => {
  const points2 = []
  // debugger
  for (let index = points3.length - 1; index > -1; -- index) {
    let p = points3[index]
    // let x = p.x * (fl / p.z) + width * 0.5
    // let y = p.y * (fl / p.z) + height * 0.5
    // ISO??? -- ignore the z coords and project directly?
    let x = p.x + width * 0.5
    let y = p.y + height * 0.5
    points2[index] = new Point2(x, y)
  }
  return points2
}

const docWidth = () => document.documentElement.clientWidth
const docHeight = () => document.documentElement.clientHeight

const drawLoop = () => {
  window.requestAnimationFrame(drawLoop)
  height = docHeight()
  width = docWidth()
  context.canvas.height = height
  context.canvas.width  = width
  context.fillStyle = "#ffffff"
  context.fillRect(0, 0, width, height)
  context.strokeStyle = "#ffffff"
  cube.rotX(pointer.y * 0.05)
  cube.rotY(-pointer.x * 0.05)
  cube.draw()

  flip()
}

let context = document.querySelector('canvas').getContext('2d')
let pointer = new Point2(0, 0)
let cube = new Cube(0, 0, 500, 200)
let FOCAL_LENGTH = 500
cube.rotY(-45)
// cube.rotX(225)
cube.rotX(45)
let height = docHeight()
let width = docWidth()

let COUNTER = 0
let SIGN = 2
let UPPER = 180
const flip = (v) => {
  // console.log(COUNTER+=SIGN)
  let val = COUNTER+=SIGN
  let n = normalize(0,1)(0,UPPER)(val)
  let e = elasticInOut(n)
  // console.log(e)
  cube.rotX(e*10)
  if (COUNTER >= UPPER) {
    SIGN *= -1
  } else if (COUNTER <= 0) {
    SIGN *= -1
  }
  // pointer.y+=v
}

drawLoop()
// let time = 0
window.addEventListener('keypress', (event) => {
  switch(event.key) {
    case 'w':
      pointer.x += 1
      break
    case 's':
      pointer.x -= 1
      break
    case 'a':
      pointer.y += 1
      // setInterval(() => {
      //   console.log(time+=100)
      // }, 100)
      break
    case 'd':
      pointer.y -= 1
      break
    case ' ':
      pointer.x = 0
      pointer.y = 0
      break
    case 'f':
      // flip(10)
      break
  }
})

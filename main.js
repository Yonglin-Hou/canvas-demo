var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var lineWidth = 5
listenToUser(canvas)
pageSize()

window.onresize = function () {
    pageSize()
}

function pageSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
}

function listenToUser(canvas) {
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    //特性检测
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            if (eraserEnabled) {
                using = true
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                using = true
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.ontouchmove = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            if (!using) {
                return
            }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint

            }
        }
        canvas.ontouchend = function (a) {
            using = false
        }
    } else {
        //非触屏设备
        var using = false
        canvas.onmousedown = function (a) {
            var x = a.clientX
            var y = a.clientY
            if (eraserEnabled) {
                using = true
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                using = true
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }

        }
        canvas.onmousemove = function (a) {
            var x = a.clientX
            var y = a.clientY
            if (!using) {
                return
            }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }


    }

    canvas.onmouseup = function (a) {
        using = false
    }
}


function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = lineWidth
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}
eraserEnabled = false
brush.onclick = function () {
    eraserEnabled = false
    brush.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    brush.classList.remove('active')
}
clear.onclick = function(){
    context.clearRect(0,0,canvas.width,canvas.height)
}
save.onclick = function(){
    var url = canvas.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画儿'
    a.target = '_blank'
    a.click()
}
red.onclick = function () {
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    blue.classList.remove('active')
    green.classList.remove('active')
}
blue.onclick = function () {
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    
}
green.onclick = function () {
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}
thin.onclick = function(){
    lineWidth = 5

}
thick.onclick = function(){
    lineWidth = 10
}
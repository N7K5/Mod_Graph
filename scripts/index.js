

var canvas_size= 0
var ctx= null
var n= 0, k= 0

var center=0, radius= 0
var arc_interval= null


function make_canvas() {
    let canvas = document.createElement('canvas');
    canvas.id     = "canvas";
    let w_wid= window.innerWidth*0.85
    let w_hei= window.innerHeight*0.85
    canvas_size= Math.min(w_wid, w_hei)
    canvas.width  = canvas_size;
    canvas.height = canvas_size;
    canvas.style.border   = "1px solid";

    document.getElementById("canvas_container").innerHTML=""
    document.getElementById("canvas_container").appendChild(canvas)

    ctx= canvas.getContext("2d")

}

function update_input() {
    let v= document.getElementById("n").value
    n= parseInt(v)
    v= document.getElementById("k").value
    k= parseInt(v)
    if(n<1 || k<1 || n>2000 || k>2000) {
        alert("Invalid input range... values should be between 1 and 2000")
        n=0
        k=0
    }
}

function draw_circle() {
    ctx.fillStyle= "#000000"
    ctx.fillRect(0,0,canvas_size, canvas_size)
    center= canvas_size/2
    radius= center-10
    ctx.strokeStyle="#ffffff"
    ctx.lineWidth= 3
    ctx.beginPath()
    ctx.arc(center, center, radius, 0, Math.PI*2)
    ctx.stroke()
}

function get_pos_from_point_id(point_id) {
    point_id= point_id%n
    pos_x= center + radius*Math.cos(2 * Math.PI * point_id / n)
    pos_y= center - radius*Math.sin(2 * Math.PI * point_id / n)
    return {
        "x": pos_x,
        "y": pos_y
    }
}

function choose_color(arc_id) {
    hue= (0+arc_id)%360
    ctx.strokeStyle = "HSL("+ hue +",100%,90%)";
}

function draw_arc(arc_id) {
    start= get_pos_from_point_id(arc_id)
    end= get_pos_from_point_id(arc_id*k)
    ctx.beginPath()
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.stroke()
}

function animate_arc() {
    let current_arc= 0
    ctx.lineWidth= 1
    clearInterval(arc_interval)
    arc_interval= setInterval(() => {
        choose_color(current_arc)
        draw_arc(current_arc)
        current_arc+=1
        if(current_arc%n == 0) {
            clearInterval(arc_interval)
        } 
    }, 20)
}


function draw_everything() {
    draw_circle()
    animate_arc()
}










window.addEventListener("load", () => {
    make_canvas()
}, false)
window.addEventListener("resize", () => {
    make_canvas()
    if(n==0) return
    draw_everything()
}, false)
document.getElementById("draw_btn").addEventListener("click", () => {
    update_input()
    draw_everything()
}, false)
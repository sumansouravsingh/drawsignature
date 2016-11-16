var cx=0,height,width;
var mouseX=0,mouseY=0,mouseXinit=0,mouseYinit=0;
var reg= new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");

function drawSignature(w,h,clr,isBorder){
    var mousedown=false;
    height=h;width=w;
    if(!reg.test(clr))
        clr="#000000";
    var cElem = document.createElement("canvas");
    setCanvasProperties(cElem,h,w,isBorder);
    var ctx = cElem.getContext("2d");
    ctx.fillStyle="#ffffff";
    handleMouseFunctions(cElem,ctx,mousedown,clr);
}

function setCanvasProperties(cElem,h,w,isBorder)
{
    cElem.setAttribute("id","signature-canvas");
    cElem.setAttribute("height",h);
    cElem.setAttribute("width",w);
    if(isBorder)cElem.setAttribute("style","border :1px solid black");
    document.getElementById('mycanvas').appendChild(cElem);
}

function handleMouseFunctions(cElem,ctx,mousedown,clr)
{
    cElem.addEventListener( 'mousemove', function( event ) {
        mouseX = event.offsetX;
        mouseY = event.offsetY;
        if(cx==0&&mousedown)
        {
            mouseXinit=mouseX;
            mouseYinit=mouseY;
            console.log
            cx++;
        }
        sign(ctx,mousedown,clr);
    });
    cElem.addEventListener( 'mouseout', function( event ) {
        mousedown=false;
        cx=0;
    });
    cElem.addEventListener( 'mousedown', function( event ) {
        mousedown = true;
    });
    cElem.addEventListener( 'mouseup', function( event ) {
        mousedown = false;
        cx=0;
    });
}

function sign(ctx,mousedown,clr) {
  ctx.strokeStyle = clr;
  if (mousedown) {
    ctx.beginPath();
    ctx.moveTo(mouseXinit,mouseYinit);
    ctx.lineTo(mouseX,mouseY);  
    mouseXinit=mouseX;
    mouseYinit=mouseY;   
    ctx.closePath();
    ctx.stroke();
  }
}

function reset()
{
    var cElem=document.getElementById('signature-canvas');
    var c=cElem.getContext('2d');
    c.fillStyle = "#ffffff";
    c.fillRect(0,0,height,width);   
}
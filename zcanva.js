canvas=document.querySelector('canvas')
canvas.height=innerHeight
canvas.width=innerWidth
c=canvas.getContext('2d')
ball=[];
mouse={
   x:50,
   y:60
}
    addEventListener('mousemove',function(event){
        mouse.x=event.clientX
        mouse.y=event.clientY
    })
    colorarr=['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

    function calculate(ax,ay,bx,by){
        return Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by))
    }
    function rotate(dx,dy,angle){
        return {
            x:dx*Math.cos(angle)-dy*Math.sin(angle),
            y:dx*Math.sin(angle)+dy*Math.cos(angle)
        }
    }

    function repel(partical,otherpartical){
      if( ((partical.dx-otherpartical.dx)*(otherpartical.x-partical.x)+
        (partical.dy-otherpartical.dy)*(otherpartical.y-partical.y))>=0){
              angle=-Math.atan2(partical.y-otherpartical.y,partical.x-otherpartical.x)
            console.log(angle)
        u1=rotate(partical.dx,partical.dy,angle)
        u2=rotate(otherpartical.dx,otherpartical.dy,angle)
        
        v1={x:u2.x,y:u1.y}
        v2={x:u1.x,y:u2.y} 
        v1=rotate(v1.x,v1.y,-angle)
        v2=rotate(v2.x,v2.y,-angle)
        partical.dx=v1.x;
        partical.dy=v1.y;
        otherpartical.dx=v2.x;
        otherpartical.dy=v2.y;
  
        }

    
    }







    function circle(x,y,radius,color){
        this.x=x;
        this.y=y;
        this.dy=(Math.random()-0.5)*3
        this.dx=(Math.random()-0.5)*3
        this.color=color
        this.radius=radius
        this.opacity=0;
        this.make=function (){
         c.beginPath();
         c.arc(this.x,this.y,this.radius,0,6.282);
         c.save()
         c.globalAlpha=this.opacity
         c.fillStyle=this.color;
         c.fill()
         c.restore()
         c.strokeStyle = this.color;
         c.stroke();


            if(this.x-this.radius<0 || this.x+this.radius>innerWidth ){
                this.dx=-this.dx
            }
            if(this.y-this.radius<0 || this.y+this.radius>innerHeight){
                this.dy=-this.dy
            }

         this.x+=this.dx
         this.y+=this.dy

         if(calculate(mouse.x,mouse.y,this.x,this.y)<180 && this.opacity<=0.5){
            this.opacity+=0.1
        } else if(this.opacity<=0.5 || this.opacity>0){
            this.opacity-=0.1
            this.opacity=Math.max(0,this.opacity)
        }
            for(let i=0;i<ball.length;i++){
                if(this.x==ball[i].x)continue;
                diff=calculate(this.x,this.y,ball[i].x,ball[i].y)
                if(diff-(this.radius+ball[i].radius)<=0){
                    repel(this,ball[i])
                    
                }
            }


        }
    }






    for(let i=0;i<200;i++){
        
        radius=Math.ceil((Math.random()*15)+15)
        x=Math.random() * (innerWidth-radius*2) + radius;
        y=Math.random() * (innerHeight-radius*2) + radius;
        for(j=0;j<ball.length;j++){
           if (calculate(x,y,ball[j].x,ball[j].y)-(radius+ball[j].radius)<3){
                x=Math.random() * (innerWidth-radius*2) + radius;
                y=Math.random() * (innerHeight-radius*2) + radius;
                j=-1
            }
        }

        ball.push(new circle(x,y,radius,colorarr[Math.floor(Math.random()*(colorarr.length-1))]))
    }
   
    function animation(){
        requestAnimationFrame(animation)
        c.clearRect(0,0,window.innerWidth,window.innerHeight);
        for(i=0;i<ball.length;i++){
            ball[i].make()
        }


    }
    animation()
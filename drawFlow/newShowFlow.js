/*2个类型，形状类和活动类和连线类型，活动类继承自形状类
形状类包括：宽、高、范围、背景颜色、位置等属性，形状画法等方法
活动类型新增：活动信息对象的属性，判断颜色、判断形状，创建活动的方法
*/
function inheritPrototype(subType, superType){
var prototype = Object.create(superType.prototype); //创建对象
prototype.constructor = subType; //增强对象
subType.prototype = prototype; //指定对象
}
var com;     
if(!com) com = {}; //第一级域名
com.UNITWIDTH = 10;
com.Shape=function(cxt,x,y){
  this.cxt = cxt;
  this.w = com.UNITWIDTH * 5;
  this.h = com.UNITWIDTH * 2; //固定
   //活动中心点
  this.x=x;
  this.y=y;
   //活动范围
  this.bounds = {x1:this.x-this.w/2,y1:this.y-this.h/2,x2:this.x+this.w/2,y2:this.y+this.h/2};
}
com.Shape.prototype={
	constructor：com.Shape;
	bezierEllipse: function (cxt, x, y, a, b) { //画椭圆
     //关键是bezierCurveTo中两个控制点的设置
     //0.5和0.6是两个关键系数（在本函数中为试验而得）
     var ox = 0.5 * a,
         oy = 0.6 * b;
     cxt.save();
     cxt.translate(x, y);
     cxt.beginPath();
     //从椭圆纵轴下端开始逆时针方向绘制
     cxt.moveTo (0, b);
     cxt.bezierCurveTo(ox, b, a, oy, a, 0);
     cxt.bezierCurveTo(a, -oy, ox, -b, 0, -b);
     cxt.bezierCurveTo(-ox, -b, -a, -oy, -a, 0);
     cxt.bezierCurveTo(-a, oy, -ox, b, 0, b);
     cxt.closePath();
     //cxt.stroke();
     cxt.fill();
     cxt.restore();
   },
   rhombus: function (cxt, x, y, a, b) { //画菱形
     cxt.beginPath();
     cxt.moveTo(x, y);
     cxt.lineTo(x + a / 2, y - b / 2);
     cxt.lineTo(x + a, y);
     cxt.lineTo(x + a / 2, y + b / 2);
     cxt.closePath();
     //cxt.stroke();
     cxt.fill();
   }
}
com.Activity = function(x,y,actInfo){
	com.Shape.call(this,x,y); //继承shape
	this.color=this.judgeBgcolor(this.actInfo.status);
	this.createActivity(this.cxt,x,y);	
}
inheritPrototype(com.Activity, com.Shape);//继承shape


com.Activity.prototype = {
	constructor:com.Activity;
	judgeBgcolor:function(status){
    switch(status){
      case "":
          return "#C8D1DC";
      break;
      case "开始":
          return "#FAFF7E";
      break;
      case "结束":
          return "#7EFF9A";
      break;
      default:
          return "#fff";
      break;
    }
   },
   createActivity: function (cxt,sx,sy) {//中心点和信息
     cxt.font = 0.8*unitWidth+"px Arial bold";
     cxt.textAlign = "center";
     cxt.textBaseline = "middle";
    
     /*活动类型：----------------------------------------------------------------
    0常规活动CommonActivity，
    1条件活动ConditionsActivity,
    2结束活动EndActivity，
    3开始活动BeginActivity，
    4CC活动CCActivity,
    5调查活动SurveyActivity-----------------------------------------------------*/
   
     switch (this.actInfo.type) {
       case 0: //常规活动
         cxt.fillStyle = this.color;
         cxt.fillRect(sx - this.w/2, sy - this.h / 2, this.w , this.h);
         cxt.fillStyle = "#000";
         cxt.fillText(this.actInfo.name, sx, sy ,this.w);
         //positions.push({id:this.id,nextId:this.nextId,step:this.step,x:sx,y:sy,});
         break;

       case 1: //条件活动
         cxt.fillStyle = this.color;
         this.rhombus(cxt,sx - this.w/2,sy,this.w,this.h);
         cxt.fillStyle = "#000";
         cxt.fillText(this.actInfo.name, sx, sy ,this.w);
         // positions.push({id:this.id,nextId:this.nextId,step:this.step,x:sx,y:sy,});
         break;

       case 2: //结束活动
         //cxt.strokeStyle="#DC3C00";
         cxt.fillStyle = this.color;
         this.bezierEllipse(cxt, sx, sy, this.w/ 2, this.h / 2);
         cxt.fillStyle = "#000";
         cxt.fillText(this.actInfo.name, sx, sy ,this.w);
         // positions.push({id:this.id,nextId:this.nextId,step:this.step,x:sx,y:sy,});
         break;

       case 3: //开始活动
         //cxt.strokeStyle="#79C900";
         cxt.fillStyle = this.color
         this.bezierEllipse(cxt, sx, sy, this.w/ 2, this.h/2);
         cxt.fillStyle = "#000";
         cxt.fillText(this.actInfo.name, sx, sy ,this.w);
         // positions.push({id:this.id,nextId:this.nextId,step:this.step,x:sx,y:sy,});
         break;

       case 4: //cc活动
         cxt.fillStyle = this.color;
         cxt.fillRect(sx - this.w/2, sy - this.h/2, this.w,this.h);
         cxt.fillStyle = "#000";
         cxt.fillText(this.actInfo.name, sx, sy ,this.w);
         // positions.push({id:this.id,nextId:this.nextId,step:this.step,x:sx,y:sy,});
         break;

       case 5: //调查活动
         cxt.fillStyle = this.color;
         cxt.fillRect(sx - this.w  / 2, sy - this.h / 2, this.w , this.h);
         cxt.fillStyle = "#000";
         cxt.fillText(this.actInfo.name, sx, sy ,this.w);
         // positions.push({id:this.id,nextId:this.nextId,step:this.step,x:sx,y:sy,});
         break;
     }

   }
}

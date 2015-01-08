 var chatCa = document.getElementById("flowchart");
 var context = document.getElementById("flowchart").getContext("2d");
 var unitWidth = 10;

 var Activity = function (data, x, y, Mesg) {
  this.id = data.ID;
  this.nextId = data.NextFlowActivityID;
  this.name = data.CActivityName;
  this.eName = data.EActivityName;
  this.type = data.ActivityType;
  this.no = data.OrderBy;
  this.branch = data.Branch;
  this.status = data.WorkListStatus;
  this.audit = data.WorkListAuditUserName;
  this.apply = data.WorkListOrgUserName;
  this.startTime = data.WorkListStartTime;
  this.endTime = data.WorkListFinishTime;

   //活动宽高
  // this.w = this.textAdaptedWidth(this.name);
  this.w = unitWidth * 5;
  this.h = unitWidth * 2; //固定
   //活动中心点
   this.x=x;
   this.y=y;
   //活动范围
   this.bounds = {x1:this.x-this.w/2,y1:this.y-this.h/2,x2:this.x+this.w/2,y2:this.y+this.h/2};
   this.createActivity(x,y,Mesg);
 }
 Activity.prototype = {
   bgcolor:function(workStatus){
    switch(workStatus){
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
   },
   // textAdaptedWidth: function(txt) { //形状适应文字
   //   context.font = 0.8*unitWidth+"px Arial bold";
   //   context.textAlign = "center";
   //   context.textBaseline = "middle";
   //   context.fillStyle = "#fff";
   //   context.fillText(txt, -1000, -1000);
   //   return txtWidth = context.measureText(txt).width + 20;
   // },
   createActivity: function (sx, sy, Mesg) {//中心点和信息
     context.font = 0.8*unitWidth+"px Arial bold";
     context.textAlign = "center";
     context.textBaseline = "middle";
    
     /*活动类型：----------------------------------------------------------------
    0常规活动CommonActivity，
    1条件活动ConditionsActivity,
    2结束活动EndActivity，
    3开始活动BeginActivity，
    4CC活动CCActivity,
    5调查活动SurveyActivity-----------------------------------------------------*/
   
     switch (this.type) {
       case 0: //常规活动
         context.fillStyle = this.bgcolor(this.status);
         context.fillRect(sx - this.w/2, sy - this.h / 2, this.w , this.h);
         context.fillStyle = "#000";
         context.fillText(this.name, sx, sy ,this.w);
         //positions.push({id:this.id,nextId:this.nextId,step:this.step,x:sx,y:sy,});
         break;

       case 1: //条件活动
         context.fillStyle = '#7EB0FF';
         this.rhombus(context,sx - this.w/2,sy,this.w,this.h);
         context.fillStyle = "#000";
         context.fillText(this.name, sx, sy ,this.w);
         // positions.push({id:this.id,nextId:this.nextId,step:this.step,x:sx,y:sy,});
         break;

       case 2: //结束活动
         //context.strokeStyle="#DC3C00";
         context.fillStyle = this.bgcolor(this.status);
         this.bezierEllipse(context, sx, sy, this.w/ 2, this.h / 2);
         context.fillStyle = "#000";
         context.fillText(this.name, sx, sy ,this.w);
         // positions.push({id:this.id,nextId:this.nextId,step:this.step,x:sx,y:sy,});
         break;

       case 3: //开始活动
         //context.strokeStyle="#79C900";
         context.fillStyle = "#7EFF9A";
         this.bezierEllipse(context, sx, sy, this.w/ 2, this.h/2);
         context.fillStyle = "#000";
         context.fillText(this.name, sx, sy ,this.w);
         // positions.push({id:this.id,nextId:this.nextId,step:this.step,x:sx,y:sy,});
         break;

       case 4: //cc活动
         context.fillStyle = this.bgcolor(this.status);
         context.fillRect(sx - this.w/2, sy - this.h/2, this.w,this.h);
         context.fillStyle = "#000";
         context.fillText(this.name, sx, sy ,this.w);
         // positions.push({id:this.id,nextId:this.nextId,step:this.step,x:sx,y:sy,});
         break;

       case 5: //调查活动
         context.fillStyle = this.bgcolor(this.status);
         context.fillRect(sx - this.w  / 2, sy - this.h / 2, this.w , this.h);
         context.fillStyle = "#000";
         context.fillText(this.name, sx, sy ,this.w);
         // positions.push({id:this.id,nextId:this.nextId,step:this.step,x:sx,y:sy,});
         break;
     }

   }

 }
/*
*ID--id
*NextFlowActivityID--nextId
*CActivityName--name
*ActivityType--type
*OrderBy--no
*Branch--branch
*/
var endCount;
var positions = [];
function main () {
var jsonObj=getJsonObj();
context.clearRect(0,0,chatCa.width,chatCa.height);
init(jsonObj);
redrawAct(jsonObj);
}

function getJsonObj() {
  var jsonString = document.getElementById("jsonString");
  return  eval(jsonString.value);
  // var jsonString = $("textarea[id$='jsonString']").val();
  // return eval(jsonString);
}

function init(jsonObj) {
  var startX = 10 * unitWidth;
  var startY = 3 * unitWidth;
  endCount = 0;
  positions.length = 0;
  var starAct = new Activity(jsonObj[0], startX, startY); //画
  positions.push(starAct);
  nextNode(jsonObj[0], startX, startY);

  function nextNode(root, x, y) { //根据当前节点root和坐标x、y，画下一个节点
    var xgap = 8 * unitWidth;
    var ygap = 3 * unitWidth;
    var nID = root.NextFlowActivityID;

    if (root.Branch == null && nID >= 0) { //有一个下一步
      var oSub = findOid(jsonObj, nID); //得到o对应的下标
      ligature(x, y, x, y + ygap);
      var nextAct = new Activity(jsonObj[oSub], x, y + ygap); //画
      positions.push(nextAct); //记录位置信息到positions
      if (jsonObj[oSub].ActivityType == 2) endCount++; //end活动计数
      nextNode(jsonObj[oSub], x, y + ygap);
    } else if (root.Branch != null && nID == -2) { //有多个下一步

      var pcSub = findPtype(1);
      for (var i = 0; i < root.Branch.length; i++) {
        ligature(x, y, positions[pcSub].x + endCount * xgap, y + ygap)
        var branchAct = new Activity(root.Branch[i], positions[pcSub].x + endCount * xgap, y + ygap); //画      
        positions.push(branchAct); //记录位置信息到positions
        if (root.Branch[i].ActivityType == 2) endCount++;
        nextNode(root.Branch[i], positions[pcSub].x + endCount * xgap, y + ygap);
      }
    }
  }
}

function redrawAct(jsonObj) {
  startX = 10 * unitWidth;
  startY = 3 * unitWidth;
  var lastY = arrayY();
  if (positions[positions.length - 1].x > (8192 - startX)) chatCa.width = 8192;
  else chatCa.width = positions[positions.length - 1].x + startX;
  chatCa.height = lastY.max + startY;
  context.clearRect(0,0,chatCa.width,chatCa.height);
  init(jsonObj);
}

function findOid(o,ID) {
  for (var k = 0; k < o.length; k++) {
    if (o[k].ID == ID) {
      return k;
    }
  }
}

function findPtype(type) {
  for (var j = 0; j < positions.length; j++) {
    if (positions[j].type == type) {
      return j;
    }
  }
}

function ligature(x1, y1, x2, y2) { //画线
  context.beginPath();
  context.moveTo(x1, y1 + unitWidth);
  context.lineTo(x2, y1 + unitWidth);
  context.lineTo(x2, y2 - unitWidth);
  context.stroke();
}

function arrayX() {
  var positionsX = [];
  for (var i = 0; i < positions.length; i++) {
    positionsX.push(positions[i].x);
  }
  return {
    max: Math.max.apply(null, positionsX),
    min: Math.min.apply(null, positionsX)
  };
}

function arrayY() {
  var positionsY = [];
  for (var i = 0; i < positions.length; i++) {
    positionsY.push(positions[i].y);
  }
  return {
    max: Math.max.apply(null, positionsY),
    min: Math.min.apply(null, positionsY)
  };
}

//获取点击位置
function show_coords(e) {
  var x = e.clientX;
  var y = e.clientY;
  var cl = isNaN(parseInt(chatCa.style.left)) ? 0 : parseInt(chatCa.style.left);
  var ct = isNaN(parseInt(chatCa.style.top)) ? 0 : parseInt(chatCa.style.top);
  var renderer = document.getElementById("renderer");
  var cx = x - cl;
  var cy = y - ct;
  for (i = 0; i < positions.length; i++) {

    var bound = positions[i].bounds
    if (cx > bound.x1 && cx < bound.x2 && cy > bound.y1 && cy < bound.y2) {
      alert(showObject(positions[i]));
    }
  }
}

//点击获取信息
function showObject(obj) {
  var i;
  var properties = [
    'id',
    'name',
    'eName',
    'apply',
    'audit',
    'startTime',
    'endTime',
    'nextId',
    'status'
  ];
    var propChinese = [
    'ID',
    '中文名',
    '英文名',
    '申请人',
    '审批人',
    '开始时间',
    '结束时间',
    '下一步活动ID',
    '状态'
  ];
  var attrString = "";
  for (i = 0; i < properties.length; i += 1) {
    attrString += propChinese[i] + ': ' + obj[properties[i]] + '\n';
  }
  return attrString;
}

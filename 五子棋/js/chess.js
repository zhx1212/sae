/**
 * Created by hxsd on 2016/8/17.
 */
    window.onload=function(){
        var oChess=document.getElementById('chess');
        var Context=oChess.getContext('2d');
        Context.strokeStyle="#BFBFBF";

        var me=true;
        var over=false;
        var chessBoard=[];

        //控制黑白棋不能互相点击切换
        for (var i=0;i<15;i++){
            chessBoard[i]=[];
            for (var j=0;j<15;j++){
                chessBoard[i][j]=0;
            }
        }

        //赢法数组
        var wins=[];
        //赢法统计数组
        var myWin=[];
        var computerWin=[];

        //赢法数组初始化
        for(var i=0;i<15;i++){
            wins[i]=[];
            for(var j=0;j<15;j++){
                wins[i][j]=[];
            }
        }

        //横线赢法
        var count=0;
        for(var i=0;i<15;i++){
            for(var j=0;j<11;j++){
                //wins[0][0][0]=true;
                //wins[0][1][0]=true;
                //wins[0][2][0]=true;
                //wins[0][3][0]=true;
                //wins[0][4][0]=true;

                //wins[0][1][1]=true;
                //wins[0][2][1]=true;
                //wins[0][3][1]=true;
                //wins[0][4][1]=true;
                //wins[0][5][1]=true;

                for(var k=0;k<5;k++){
                    wins[i][j+k][count]=true;
                }
                count++;
            }
        }
        //竖线赢法
        for(var i=0;i<15;i++){
            for(var j=0;j<11;j++){
                for(var k=0;k<5;k++){
                    wins[j+k][i][count]=true;
                }
                count++;
            }
        }
        //斜线赢法
        for(var i=0;i<11;i++){
            for(var j=0;j<11;j++){
                for(var k=0;k<5;k++){
                    wins[i+k][j+k][count]=true;
                }
                count++;
            }
        }
        //反斜线赢法
        for(var i=0;i<11;i++){
            for(var j=14;j>3;j--){
                for(var k=0;k<5;k++){
                    wins[i+k][j-k][count]=true;
                }
                count++;
            }
        }
     //   console.log(count);

        //赢法统计数组初始化
        for(var i=0;i<count;i++){
            myWin[i]=0;
            computerWin[i]=0;
        }

        drawChessBoard();

        function drawChessBoard(){
            for (var i=0;i<15;i++){
                Context.moveTo(15+i*30,15);
                Context.lineTo(15+i*30,435);
                Context.stroke();
                Context.moveTo(15,15+i*30);
                Context.lineTo(435,15+i*30);
                Context.stroke();
            }
        }

        function step(i,j,me){
            Context.beginPath();
            Context.arc(15+i*30,15+j*30,13,0,2*Mat         h.PI);
            Context.closePath();
            var gradient=Context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30,15+j*30,0);
            if (me){
                gradient.addColorStop(0,"#333");
                gradient.addColorStop(1,"#636766");
            }else {
                gradient.addColorStop(0,"#D1D1D1");
                gradient.addColorStop(1,"#F9F9F9");
            }

            Context.fillStyle=gradient;
            Context.fill();
        }

        oChess.onclick=function(e){
            var oEv=e||window.event;

            if (over){
                return;
            }
            if (!me){
                return;
            }
            var x=oEv.offsetX;
            var y=oEv.offsetY;
            var i=Math.floor(x/30);
            var j=Math.floor(y/30);
            if (chessBoard[i][j]==0){
                step(i,j,me);
                chessBoard[i][j]=1;
               /* if (me){
                    chessBoard[i][j]=1;
                }else {
                    chessBoard[i][j]=2;
                }*/
              // me=!me;
                for(var k=0;k<count;k++){
                    if (wins[i][j][k]){
                        myWin[k]++;
                        computerWin[k]=6;
                        if(myWin[k]==5){
                            window.alert("你赢了");
                            over=true;
                        }
                    }
                }
                if (!over){
                    me=!me;
                    computerAI();
                }
            }
        };
    function computerAI() {
        var myScore=[];
        var computerScore=[];
        var Max=0;
        var u=0,v=0; //最高分数点的坐标

        for(var i=0;i<15;i++){
            myScore[i]=[];
            computerScore[i]=[];
            for(var j=0;j<15;j++) {
                myScore[i][j] = 0;
                computerScore[i][j] = 0;
            }
        }
        for(var i=0;i<15;i++){
            for(var j=0;j<15;j++){
                if (chessBoard[i][j]==0){
                    for(var k=0;k<count;k++){
                        if(wins[i][j][k]){
                            if (myWin[k]==1){
                                myScore[i][j]+=200;
                            }else if(myWin[k]==2){
                                myScore[i][j]+=400;
                            }else if(myWin[k]==3){
                                myScore[i][j]+=2000;
                            }else if(myWin[k]==4){
                                myScore[i][j]+=10000;
                            }
                            if (computerWin[k]==1){
                                computerScore[i][j]+=220;
                            }else if(computerWin[k]==2){
                                computerScore[i][j]+=420;
                            }else if(computerWin[k]==3){
                                computerScore[i][j]+=2100;
                            }else if(computerWin[k]==4){
                                computerScore[i][j]+=20000;
                            }
                        }

                    }
                if (myScore[i][j]>Max){
                    Max=myScore[i][j];
                    u=i;
                    v=j;
                }else if(myScore[i][j]==Max){
                    if (computerScore[i][j]>computerScore[u][v]){
                        u=i;
                        v=j;
                    }
                }
                if (computerScore[i][j]>Max){
                    Max=computerScore[i][j];
                    u=i;
                    v=j;
                }else if(computerScore[i][j]==Max){
                    if (myScore[i][j]>myScore[u][v]){
                        u=i;
                        v=j;
                    }
                }
            }
        }
       }
      step(u,v,false);
      chessBoard[u][v]=2;
      for(var k=0;k<count;k++){
        if (wins[u][v][k]){
          computerWin[k]++;
          myWin[k]=6;
        if(computerWin[k]==5){
          window.alert("计算机赢了");
          over=true;
          }
        }
      }
      if (!over){
        me=!me;
      }
    }







    };


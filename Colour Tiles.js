<!-------------------------------------------------------->
<!-- Global variables includes games settings           -->
<!-------------------------------------------------------->

var clrs=["DarkRed","Crimson","DarkOrange","DarkSalmon","HotPink","Blue","IndianRed","Indigo","GoldenRod","DarkCyan","DarkSlateBlue","Green","MidnightBlue","Purple","Yellow","MediumVioletRed"];
var SETTING_R=5;
var SETTING_C=5;
var SETTING_PR=3;
var SETTING_PC=3;
var totalmoves=0;
var sec,min;
var totalSeconds=0;
var clock;
var crntmode="easy";
var sound_bgm;
var allowplay=0;


<!-------------------------------------------------------->
<!-- Startup screen                                     -->
<!-------------------------------------------------------->

function startup()
{
 //localStorage.clear();   // uncomment this to clear local storage
 drawtiles();
 showresult();
 controlInterface(1);
}


<!-------------------------------------------------------->
<!-- Setting game to different modes -->
<!-------------------------------------------------------->

function setmode(modename)
{
 crntmode=modename;
 if(modename=="easy")
 {
  SETTING_R=5;
  SETTING_C=5;
  SETTING_PR=3;
  SETTING_PC=3;
  }
 if(modename=="medium")
 {
  SETTING_R=6;
  SETTING_C=6;
  SETTING_PR=4;
  SETTING_PC=4;
  }
 if(modename=="hard")
 {
  SETTING_R=7;
  SETTING_C=7;
  SETTING_PR=5;
  SETTING_PC=5;
  }
  drawtiles();
}

<!-------------------------------------------------------->
<!-- Controlling user interface                         -->
<!-------------------------------------------------------->

function controlInterface(flag)
{
 switch(flag)
 {
  case 1:
         allowplay=0;
         document.getElementById("btnshuffle").disabled=false;
         document.getElementById("m1").disabled=false;
         document.getElementById("m2").disabled=false;
         document.getElementById("m3").disabled=false;
         document.getElementById("username").disabled=false;
	 break;
  case 2:
         allowplay=1;
         document.getElementById("btnshuffle").disabled=true;
         document.getElementById("m1").disabled=true;
         document.getElementById("m2").disabled=true;
         document.getElementById("m3").disabled=true;
         document.getElementById("username").disabled=true;
	 break;
  }
}

<!-------------------------------------------------------->
<!-- Game Start/Stop                                    -->
<!-------------------------------------------------------->

function start()
{
  var btn=document.getElementById("btnstart");
  if(btn.value.trim()=="Start Game")
  {
    if(document.getElementById("username").value.trim()=="")
      alert("Please enter the user name before start the game.!");
    else
    {
      controlInterface(2);
      sound_bgm=new Audio('bgm.wav');  
      sound_bgm.loop=true;
      sound_bgm.play();
      btn.value="Stop Game";
      totalSeconds=0;
      clock=setInterval(setTime,1000);
    }
  }
  else
  {
   controlInterface(1);
   sound_bgm.pause();
   var sound_stp=new Audio('stopped.wav');  
   btn.value="Start Game";
   sound_stp.play();
   clearInterval(clock);
   document.getElementById("timetaken").value="00:00";
   drawtiles();
  }
 
}

<!-------------------------------------------------------->
<!-- Game Running clock                                 -->
<!-------------------------------------------------------->

function setTime() 
{
  ++totalSeconds;
  sec = pad(totalSeconds % 60);
  min= pad(parseInt(totalSeconds/60));
  document.getElementById("timetaken").value=min+":"+sec;
}

function pad(val)
 {
  var valString = val + "";
  if (valString.length < 2) 
  {
    return "0" + valString;
  }
  else 
    {
    return valString;
  }
}

<!-------------------------------------------------------->
<!-- Draw Prview and Game tiles                         -->
<!-------------------------------------------------------->

function drawtiles()
{
  totalmoves=0;
  var obj=document.getElementById("moves");
  obj.value=totalmoves;

  <!--                 Draw preview table                -->
  <!-------------------------------------------------------->
  var table=document.getElementById("tblpreview")
  var j=0;
  while(table.hasChildNodes())
  {
   table.removeChild(table.firstChild);
  }
   for (var rw=0;rw<SETTING_PR;rw++)
  {
    var tr = document.createElement('tr');
    for (var col=0;col<SETTING_PC;col++)
    {    
     var td = document.createElement('td');
     td.className="box"; 
     tr.appendChild(td);
    }
    table.appendChild(tr);
   }
  document.getElementById("tdgpreview").appendChild(table);

  <!--                 Draw Game table                    -->
  <!-------------------------------------------------------->

  var table1=document.getElementById("tblgame");
  while(table1.hasChildNodes())
  {
   table1.removeChild(table1.firstChild);
  }
  for (var rw=0;rw<SETTING_R;rw++)
   {
    var trp = document.createElement('tr');   
    for (var col=0;col<SETTING_C;col++)
    {
     var tdp = document.createElement('td');
     
     tdp.className="box";
     tdp.style.cursor="hand";
     tdp.onclick=function() { playgame(this); };

     trp.appendChild(tdp);
    }
    table1.appendChild(trp);
  }
  document.getElementById("tdgame").appendChild(table1);


  <!-- Choose 6 unique random colors from 15 colors array -->
  <!-------------------------------------------------------->

  var crntcolors=["","","","","",""];
  var selectioncompleted=false;
  var selcolor="";
  var i;
  while(!selectioncompleted)
  {
      while(crntcolors.includes(selcolor))
         selcolor=clrs[Math.floor(Math.random()*15)];

      for(i=0;i<6;++i)
      {
        if(crntcolors[i]=="")
        {
           crntcolors[i]=selcolor;
           break;
        }
      }
      selectioncompleted = !crntcolors.includes("");
  }

  <!-- Fill 6 colors for both Preview and Game table -->
  <!-------------------------------------------------------->
    var completeflg_game=SETTING_R*SETTING_R;
    var completeflg_prw=SETTING_PR*SETTING_PR;
 
         i=0;
         while(completeflg_prw!=0)
         {
            r=Math.floor(Math.random()*SETTING_PR);
            c=Math.floor(Math.random()*SETTING_PC);
     	    if(table.rows[r].cells[c].style.backgroundColor=="")
     		{
       			table.rows[r].cells[c].style.backgroundColor=crntcolors[i];
       			completeflg_prw--;
                        i++;
                        if(i>=6)
                           i=0;
                }
         }
       
        
        i=0;
        while(completeflg_game!=0)
	{
            r=Math.floor(Math.random()*SETTING_R);
            c=Math.floor(Math.random()*SETTING_C);
     	    if(table1.rows[r].cells[c].style.backgroundColor=="")
     		{
       			table1.rows[r].cells[c].style.backgroundColor=crntcolors[i];
       			completeflg_game--;
 			i++;
                        if(i>=6)
                          i=0; 
                }
          }
     r=Math.floor(Math.random()*SETTING_R);
     c=Math.floor(Math.random()*SETTING_C);
     table1.rows[r].cells[c].style.backgroundColor="";
}

<!-------------------------------------------------------->
<!-- Play game                                          -->
<!-------------------------------------------------------->
function playgame(clickedcell)
{
 if(allowplay==1)
{
 var r,c,tmpclr;
 var tbl=document.getElementById("tblgame");
 r=clickedcell.parentNode.rowIndex;
 c=clickedcell.cellIndex;
 var check=[[r-1,c],[r,c+1],[r+1,c],[r,c-1]];
 for(var i=0;i<4;++i)
  {
   if((check[i][0]>=0 && check[i][1]>=0) && (check[i][0]<=(SETTING_R-1) && check[i][1]<=(SETTING_C-1)))
   {
     if(tbl.rows[check[i][0]].cells[check[i][1]].style.backgroundColor=="")
      {
        tmpclr=clickedcell.style.backgroundColor;
        clickedcell.style.backgroundColor="";
        tbl.rows[check[i][0]].cells[check[i][1]].style.backgroundColor=tmpclr;
        totalmoves++;
        var obj=document.getElementById("moves");
        obj.value=totalmoves;
        break;
      } 
   }
  }
 comparepattern();
 } 
else
 alert("Please click <Start Game> button to play");
}

<!-------------------------------------------------------->
<!-- Compare tiles to check winning game                 -->
<!-------------------------------------------------------->

function comparepattern()
{
 var prvtbl=document.getElementById("tblpreview");
 var gametbl=document.getElementById("tblgame");
 var issame=1;
 var extrpos=SETTING_R-SETTING_PR-1;
 for( var i=0;i<SETTING_PR;++i)
  for( var j=0;j<SETTING_PC;++j)
    {
       if(prvtbl.rows[i].cells[j].style.backgroundColor!=gametbl.rows[i+extrpos].cells[j+extrpos].style.backgroundColor)
         {
            issame=0;
            break;
         }
    }
 if(issame==1)
  {
   clearInterval(clock);
   sound_bgm.pause(); 
   var sound_win=new Audio('wingame.wav');  
   sound_win.play();
   document.getElementById("btnstart").disabled=true;
   allowplay=0;
   var btn=document.getElementById("btnstart");
   btn.value="Start Game";
   var m=document.getElementById("popmsg");
   m.innerHTML="congrats you won the game";
   savescore();
   document.getElementById("timetaken").value="00:00";
   showresult();
   var p=document.getElementById("popup");
   p.style.visibility="visible";
  }
}

<!-------------------------------------------------------->
<!-- Save the scores                                    -->
<!-------------------------------------------------------->

function savescore()
{
 var name1=document.getElementById("username").value;
 var tt,tm,ts;
 var t=document.getElementById("timetaken").value;
 tm=parseInt(t.substring(0,2))*60;
 ts=parseInt(t.substring(3,5));
 tt=tm+ts;
 var move=document.getElementById("moves").value;
 var score=Math.round((1/Math.sqrt(tt)+2/(move^2))*1000);
 var m=document.getElementById("popmsg");
   
 switch(crntmode)
 {
   case "easy":
		if(localStorage.getItem("ehsscore")<=score || localStorage.getItem("ehsscore")==null)
 		{
                        localStorage.setItem("ehsname",name1);
  			localStorage.setItem("ehsmove",move);
  			localStorage.setItem("ehstime",t);
  			localStorage.setItem("ehsscore",score);
                        m.innerHTML="congrats you are a topscorer";
 		}
		break;
   case "medium":
		if(localStorage.getItem("mhsscore")<=score || localStorage.getItem("mhsscore")==null)
 		{
  			localStorage.setItem("mhsname",name1);
  			localStorage.setItem("mhsmove",move);
  			localStorage.setItem("mhstime",t);
  			localStorage.setItem("mhsscore",score);
 			m.innerHTML="congrats you are a topscorer";
 		}
		break;
   case "hard":
		if(localStorage.getItem("hhsscore")<=score || localStorage.getItem("hhsscore")==null)
 		{
  			localStorage.setItem("hhsname",name1);
  			localStorage.setItem("hhsmove",move);
  			localStorage.setItem("hhstime",t);
  			localStorage.setItem("hhsscore",score);
			m.innerHTML="congrats you are a topscorer";
 		}
		break;
 }

}

<!-------------------------------------------------------->
<!-- Display high score board                           -->
<!-------------------------------------------------------->

function showresult()
{
 document.getElementById("etpname").innerHTML=localStorage.getItem("ehsname");
 document.getElementById("etpmove").innerHTML=localStorage.getItem("ehsmove");
 document.getElementById("etptime").innerHTML=localStorage.getItem("ehstime");
 document.getElementById("etpscore").innerHTML=localStorage.getItem("ehsscore");
 
 document.getElementById("mtpname").innerHTML=localStorage.getItem("mhsname");
 document.getElementById("mtpmove").innerHTML=localStorage.getItem("mhsmove");
 document.getElementById("mtptime").innerHTML=localStorage.getItem("mhstime");
 document.getElementById("mtpscore").innerHTML=localStorage.getItem("mhsscore");

 document.getElementById("htpname").innerHTML=localStorage.getItem("hhsname");
 document.getElementById("htpmove").innerHTML=localStorage.getItem("hhsmove");
 document.getElementById("htptime").innerHTML=localStorage.getItem("hhstime");
 document.getElementById("htpscore").innerHTML=localStorage.getItem("hhsscore");
  
}

function hidediv()
{
   var z=document.getElementById("popup");
   z.style.visibility="hidden";
   drawtiles();
   controlInterface(1);
   document.getElementById("btnstart").disabled=false;
   allowplay=1;  
}

 

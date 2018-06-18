//default count to 30 minutes
var count=1800;
//make sript run every second
var counter=setInterval(timer, 1000); //1000 will  run it every 1 second

function timer(){
	//the global variabke is decremented by 1 each time the script runs
  count=count-1;
  if (count <= 0)
  	//if the counter is 0, stop running the script
  {
     clearInterval(counter);
     return;
  }
  //convertt the seconds into seconds and minutes
	var minutes = Math.floor(count / 60);
	var seconds =  Math.floor(count-minutes*60);
	//pad the seconds with a leading 0
	var fseconds = seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
	//write the count into the into the html
 	document.getElementById("timer").innerHTML=minutes +":"+fseconds;
}
//get the number of friends and their names off of the web page's query string

var qString = location.search;
//split the friend count and the list at the &
var qArray=qString.split("&");
//pull out the friend count from the first dimension
var fCount=qArray[0].substr(qArray[0].indexOf("=")+1);
//pull out the friend's names from the second dimension
var fList=qArray[1].substr(qArray[1].indexOf("=")+1);
//use the # of friends and create an img for each, placing it in the friend staging area of the html
function placeFriends(){
	for (i=0;i<fCount;i++){
	$("#friendStaging").append('<img src="images/icons/friend-map.png" id="f'+ i +'" alt="'+ 
fList.split(";")[i] +'" onclick="showFriendDetail(this)" />');
	$("#friendStaging").append('<div class="fDetail" id="f' + i + 'Detail" onclick=hideThis(this)>' + fList.split(";")[i] +'</div>'); 
	}
}
function showFriendDetail(e){
	var clickedImg = e.id + "Detail";
	document.getElementById(clickedImg).style.display="block";
	return false;
}
function hideThis(e){
	e.style.display="none";
}
//this is the drag scriupt written by ___, from ___
function moveMeeting(e){
	// determine event object
	if (!e) {
		var e = window.event;
	}
    if(e.preventDefault) e.preventDefault();

	// IE uses srcElement, others use target
	targ = e.target ? e.target : e.srcElement;

	if (targ.id != 'meeting') {return};
	// calculate event X, Y coordinates
		/*offsetX = e.touches[0].clientX;
		offsetY = e.touches[0].clientY;*/
		offsetX = e.clientX;
		offsetY = e.clientY;


	// assign default values for top and left properties
	if(!targ.style.left) { targ.style.left='340px'};
	if (!targ.style.top) { targ.style.top='389px'};

	// calculate integer values for top and left 
	// properties
	coordX = parseInt(targ.style.left);
	coordY = parseInt(targ.style.top);
	drag = true;

	// move element
	document.onmousemove=dragImg;
    return false;
	
}
function dragImg(e) {
	if (!drag) {return};
	if (!e) { var e= window.event};
	// var targ=e.target?e.target:e.srcElement;
	// move div element
	targ.style.left=coordX+e.clientX-offsetX+'px';
	targ.style.top=coordY+e.clientY-offsetY+'px';
	return false;
}
function stopDrag() {
	drag=false;
	$("#newMeeting")[0].style.height="110px";//animates the appearance of the confirmation
}

function no2MeetingMoveConf(){
	$("#newMeeting")[0].style.height="0";
	$("#meeting")[0].style.top="389px"
	$("#meeting")[0].style.left="340px"
}
function yes2MeetingMoveConf(){
	$("#newMeeting")[0].style.height="0";
	$("#meeting")[0].src="images/icons/meeting-proposed.png";
}
function showTimerUpdate(){
	$("#proposeTime").css("display", "block");
}
function changeTimerValue(i){
	count=i*60;
	timer();
	$("#proposeTime").css("display","none");
}


window.addEventListener("load", function(event) {
	var ta = document.getElementById("edit_profile");
	ta.style.lineHeight = "20px";//init
	ta.style.height = "30px";//init

	ta.addEventListener("input",function(evt){
	    if(evt.target.scrollHeight > evt.target.offsetHeight){   
	        evt.target.style.height = evt.target.scrollHeight + "px";
	    }else{
	        var height,lineHeight;
	        while (true){
	            height = Number(evt.target.style.height.split("px")[0]);
	            lineHeight = Number(evt.target.style.lineHeight.split("px")[0]);
	            evt.target.style.height = height - lineHeight + "px"; 
	            if(evt.target.scrollHeight > evt.target.offsetHeight){
	                evt.target.style.height = evt.target.scrollHeight + "px";
	                break;
	            }
	        }
	    }
	});
});

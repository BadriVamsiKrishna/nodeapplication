document.addEventListener("DOMContentLoaded", function(event) { 
    var names=document.getElementById("one");
    if(names!=null){
        var names=document.getElementById("one").innerHTML.split(",");
	    var ages=document.getElementById("two").innerHTML.split(",");
	    var bloodgroups=document.getElementById("three").innerHTML.split(",");
	    var phones=document.getElementById("four").innerHTML.split(",");
	    var places=document.getElementById("five").innerHTML.split(",");
	    var i;
	    speak1(bloodgroups[0]);
        var tablearea=document.getElementById("tablearea");
        var table=document.createElement("table");
        table.style.marginTop="10px";
        table.setAttribute("align","center");
        var tr=document.createElement("tr");
        var th1=document.createElement("th");
        th1.appendChild(document.createTextNode("NAME"));
        tr.appendChild(th1);
        var th2=document.createElement("th");
        th2.appendChild(document.createTextNode("AGE"));
        tr.appendChild(th2);
        var th3=document.createElement("th");
        th3.appendChild(document.createTextNode("BLOODGROUP"));
        tr.appendChild(th3);
        var th4=document.createElement("th");
        th4.appendChild(document.createTextNode("PHONE"));
        tr.appendChild(th4);
        var th5=document.createElement("th");
        th5.appendChild(document.createTextNode("PLACE"));
        tr.appendChild(th5);
        //tr.style.border = "2px solid #000000";
        table.appendChild(tr);
        console.log(names.length);
        for (var i=1;i<=names.length;i++){
        	console.log("tr");
            var tr=document.createElement("tr");
            var td1=document.createElement("td");
            td1.appendChild(document.createTextNode(names[i-1]));
            td1.style.fontWeight="bold";
            tr.appendChild(td1);
            var td2=document.createElement("td");
            td2.appendChild(document.createTextNode(ages[i-1]));
            td2.style.fontWeight="bold";
            tr.appendChild(td2);
            var td3=document.createElement("td");
            td3.appendChild(document.createTextNode(bloodgroups[i-1]));
            td3.style.fontWeight="bold";
            tr.appendChild(td3);
            var td4=document.createElement("td");
            td4.appendChild(document.createTextNode(phones[i-1]));
            td4.style.fontWeight="bold";
            tr.appendChild(td4);
            var td5=document.createElement("td");
            td5.appendChild(document.createTextNode(places[i-1]));
            td5.style.fontWeight="bold";
            tr.appendChild(td5);
            tr.style.border = "2px solid #000000";
            table.appendChild(tr);
        }
        //table.style.border = "2px solid #000000";
        tablearea.appendChild(table);
	    function speak1(a){
		    AWS.config.accessKeyId="AKIAIS7DYQRWKYKS3COA";
	    	AWS.config.secretAccessKey="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";
		    AWS.config.region="ap-south-1";
	    	var polly=new AWS.Polly();
		    var params={
		    	OutputFormat:"mp3",
		    	Text:"These are the donors list of your required blood group",
		    	TextType:"text",
		    	VoiceId:"Joanna"
		    };
		    polly.synthesizeSpeech(params,function(err,data){
		    	if(err){
		    		console.log(err,err.stack);
		    	}
		    	else{
			    	var uInt8Array=new Uint8Array(data.AudioStream);
				    var arrayBuffer=uInt8Array.buffer;
			    	var blob=new Blob([arrayBuffer]);
			    	var audio=document.getElementsByTagName("audio");
				    var url=URL.createObjectURL(blob);
			    	audio[0].src=url;
			    	audio[0].play();
			    }
		    });
	    }
    }
    else{
        var s=document.getElementById("clickpolly");
        s.addEventListener("click",speak2);
        function speak2(){
            AWS.config.accessKeyId="AKIAIS7DYQRWKYKS3COA";
            AWS.config.secretAccessKey="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";
            AWS.config.region="ap-south-1";
            var polly=new AWS.Polly();
            var params={
                OutputFormat:"mp3",
                Text:"Online Blood Bank WELCOMES YOU. If you are a donor,We appreciate you for your helping nature. If you need blood we are happy to serve you",
                TextType:"text",
                VoiceId:"Joanna"
            };
            polly.synthesizeSpeech(params,function(err,data){
                if(err){
                    console.log(err,err.stack);
                }
                else{
                    var uInt8Array=new Uint8Array(data.AudioStream);
                    var arrayBuffer=uInt8Array.buffer;
                    var blob=new Blob([arrayBuffer]);
                    var audio=document.getElementsByTagName("audio");
                    var url=URL.createObjectURL(blob);
                    audio[0].src=url;
                    audio[0].play();
                }
            });
            //console.log("ghcvcbc");
        }
    }    
});
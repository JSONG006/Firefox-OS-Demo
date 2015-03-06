window.addEventListener("load", function() 
{
	var messageBox = document.getElementById('message_box');
	var messageInput = document.getElementById('message_input');
	var messages = getMessage();
	var btnSnd = document.getElementById('btn_snd');
	var create = document.getElementById('create');
	var inner = document.getElementById('inner');
	 
/************************sign_in.function*********************************************************/
	var login = document.getElementById('login'); 
	login.addEventListener('click', function(){
		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;
		if(username == localStorage.username && password == localStorage.password)
		{
			alert("success !");
			inner.style.transform = "translateY(-920px)";
		}
		else
		{
			alert("check your username or password !");
		}
	}
	,false);
	
/************************register.function*****************************************************/
    var register = document.getElementById('register');
	var btn_return = document.getElementById('btn_return');
	
	create.addEventListener('click',function(){
		inner.style.transform = "translateY(-460px)";
		},false);
		
	register.addEventListener('click',function(){
		var username = document.getElementById('user').value;
		var password = document.getElementById('psw').value;
		var email = document.getElementById('email').value;
		var number = document.getElementById('num').value;
		if(username != localStorage.username)
		{
			localStorage.username = username;
		}
		else
		{
			alert("Change another name");
		}
		if(email != localStorage.email)
		{
			localStorage.email = email;
		}
		else
		{
			alert("Change another email");
		}
		if(number != localStorage.number)
		{
			localStorage.number = number;
		}
		else
		{
			alert("Change another email");
		}			
		localStorage.password = password;
		
		if(username && email && password)
		{
			inner.style.transform = "translateY(-920px)";
		}
		
		},false);
		
		btn_return.addEventListener('click',function(){
			inner.style.transform = "translateY(0px)";
		},false);
/************************************items.function******************************************/
		var product1 = document.getElementById('product1');
		var search_input = document.getElementById('search_input');
		var search_btn = document.getElementById('search_btn');
		var btn_add = document.getElementById('add');
		
		btn_add.addEventListener('click',function(){
				inner.style.transform = "translateY(-1380px)";
			},false);
		
		product1.addEventListener('click',function(){
				inner.style.transform = "translateY(-1850px)";
			},false);
		var content = search_input.value;
		var aLi = document.getElementsByTagName('li');
		
		search_btn.addEventListener('click',function(){
				if(content == "#43902012")
				{
					for(var i=1;i<aLi.length;i++)
					{
						aLi[i].style.display ="none";
					}
					var footer = document.getElementById('footer');
					footer.style.marginTop = "230px";
				}
			},false);
		
		
/************************************details.function***************************************/
		var btn_back2 = document.getElementById('btn_back2');
		btn_back2.addEventListener('click',function()
		{
			inner.style.transform = "translateY(-920px)";
		});
		
/************************************cart.function**********************************************************/
		var btn_cart = document.getElementById('btn_cart');
		btn_cart.addEventListener('click',function(){
			inner.style.transform = "translateY(-1380px)";
			},false);
			
		var btn_back1 = document.getElementById('btn_back1');
		btn_back1.addEventListener('click',function()
		{
			inner.style.transform = "translateY(-920px)";
		});
/**********************************************************************************************/
		function getMessage()
		{
			if(localStorage.messages)
			{
				return JSON.parse(localStorage.messages);
			}
			else
			{
				return [];
			}
		}
		
		function addToMessageBox(msg)
		{
			var p = document.createElement('p');
			p.textContent = msg;
			messageBox.appendChild(p);
			messageInput.value ='';
			messageInput.focus();
			
			var messages = getMessage();
			messages.push(msg);
			console.log("saving message",messages);
			localStorage.setItem("message",JSON.stringify(messages));
		}
	
		messages.forEach( function (msg) {
        var p = document.createElement('p');
        p.textContent = msg;
        messageBox.appendChild(p);
    	});
	
		btnSnd.addEventListener('click',function()
		{
			sendMesgToServer();
			addToMessageBox(localStorage.username +':'+ messageInput.value);
			setTimeout(addToMessageBox("shop: Welcome to our WebShop"),3000);
		},false);
	
	/*****************************webSocket==QQ******************************************************/
		var socket = new WebSocket('ws://127.0.0.1:3001');
		
		socket.addEventListener('open',function()//连接成功
		{
			console.log("connected->success");
		});
		socket.addEventListener('close',function()//连接失败
		{
			console.warn("disconnected->fail!");
		});
		socket.addEventListener('message',function(event)
		{
			console.log('receive:',event.data);
			
			var data= JSON.parse(event.data);//将event.data转换成JSON对象,event.data ={"from":"xxx", "type":"xxx", "content":"xxx"}
			switch (data.type)
			{
				case 'userlist':
				showUserList(data.content);
				break;
				case 'msg':
				showReceivedMessage(data.from,data.content);
				break;
			}
		});
	
		function showReceivedMessage(from, content){
			var receivedMsgBox = document.getElementById('message_box');
			var htmlCode = '';
	
			if(content.match(/\.png$/)) {
				htmlCode = '<img class="msgImage" src="' + content + '">';
			}
			else if(content.indexOf('http://') == 0){
				htmlCode = '<a href="' + content + '" target="_blank">link</a>';
			}
			else {
				htmlCode = content;
			}
			var messageItem = document.createElement('div');
			messageItem.innerHTML = '<b>' + from + '</b> : ' + htmlCode;
			receivedMsgBox.appendChild(messageItem);
		}

		
		function getUserName()
		{
			if(localStorage.username)
			{
				var username = localStorage.username;
				return username;
			}
			else
			{
				var username = ghost;
				return username;
			}
		}
	
		function sendMesgToServer()
		{
			var receiverInput = document.getElementById('receiver_input');
			var receiver = localStorage.username;
			var messageContent = messageInput.value;
			if(receiver && messageContent)
			{
				var msg={ from: getUserName(),
						  type: 'msg',
						  to: receiver,
						  content: messageContent
						};
				socket.send(JSON.stringify(msg));
			}
			else
			{
				alert("please fill the message!");
			}
		}
});



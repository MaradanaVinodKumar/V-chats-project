function displays(){
    document.getElementById('dotbar').style.display='none';
    document.getElementById('dotbarcancil').style.display='none';
    
}

function bar(){
    var x=document.getElementById('dotbar');
    var y=document.getElementById('dotbarcancil');
    if(x.style.display=="none")
    {
        x.style.display="block";
        y.style.display='block'
    }
    else{
        x.style.display="none";
        y.style.display='none'
    }

}


function barAdd(){
    bar();
    document.getElementById('add-person').style.display='block';
    document.getElementById('name').style.borderColor="#31313a";
    document.getElementById('name').value='';
    document.getElementById('description').value='';
}

function Add(){
    x=document.getElementById('name');
    
    if(x.value!="")
    {
        closes();
        AddPerson();
    }
    else{
       x.style.borderColor="red"
    }

}

function closes(){
    document.getElementById('add-person').style.display='none';
}

var count=1;
function AddPerson(){
    var persons=document.getElementById('persons');
    if(document.getElementById('description').value=='')
    {
        document.getElementById('description').value='i am using S-chart';
    }
    else{
        document.getElementById('description').value="+91"+document.getElementById('description').value;
    }

    persons.innerHTML+=`<div onclick="chats('${document.getElementById('name').value}','${document.getElementById('description').value}')"><div id='pers+${count}' class='person'  > <div></div><div><span class="name">${document.getElementById('name').value}</span><br><span class="description">${document.getElementById('description').value}</span></div></div></div>`
    count++;
}   

function chats(name,value){ 
     
    
    document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('link').click();
    });
    document.getElementById('chats').style.display='block';
    document.getElementById('body').style.display='none';
    document.getElementById('chat-name').innerText=name;
    
    document.getElementById('chat-description').innerText=value;
}

function backs(){
    document.getElementById('chats').style.display='none';
    document.getElementById('body').style.display='block';
}
var cou=1;

function sends(){
    var x=document.getElementById('messages');
    
    if(x.value!=""){
        document.getElementById('msg').innerHTML+=`<div id="send-msg${cou}" class="send-msg"><div id="send-anim" class="send-msg-len ">${x.value}</div></div>`;
        //document.getElementById('send-msg'+cou).style.display='none';
        send_msg_anim('send-msg',cou);
        cou++;
    }
    x.value='';
}

function send_msg_anim(id,cou){
    //document.getElementById('send-msg'+cou).style.display='block';
    document.getElementById(id+cou).firstChild.classList.add("send-msg-anim");
    //document.getElementById(id+cou).style.backgroundColor="red";
    setTimeout(()=>{document.getElementById(id+cou).firstChild.classList.remove("send-msg-anim")},600);
}
function locater(){
    x=document.getElementById('locater-body');
    
    if(x.scrollTop < x.scrollHeight-655)
    {
        document.getElementById('down').style.display='block';
    }
    else
    {
        document.getElementById('down').style.display='none';
    }
   // document.getElementById('scroll').innerText=x.scrollTop+"  "+(x.scrollHeight-655);
}

function displays() {
    document.getElementById('dotbar').style.display = 'none';
    document.getElementById('dotbarcancil').style.display = 'none';

}

function bar() {
    var x = document.getElementById('dotbar');
    var y = document.getElementById('dotbarcancil');
    if (x.style.display == "none") {
        x.style.display = "block";
        y.style.display = 'block'
    }
    else {
        x.style.display = "none";
        y.style.display = 'none'
    }

}


function barAdd() {
    bar();
    document.getElementById('add-person').style.display = 'block';
    document.getElementById('name').style.borderColor = "#31313a";
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
}

function Add() {
    x = document.getElementById('name');

    if (x.value != "") {
        closes();
        AddPerson('manual',localStorage['user'],localStorage['id']);
    }
    else {
        x.style.borderColor = "red"
    }

}

function closes() {
    document.getElementById('add-person').style.display = 'none';
}

var count = 1;
function AddPerson(method,name,user_id) {
    var persons = document.getElementById('persons');
    if(method=='load')
    {
        data_base('http://localhost:3000/each_person','get')
        .then((data)=>{
            for(each in data){
                if((data[each].person==name)&&(data[each].user_id==user_id))
                {
                    for(friend of data[each].friends)
                    {
                        persons.innerHTML += `<div onclick="chats('${friend.name}','${friend.user_id}')"><div id='pers+${count}' class='person'  > <div></div><div><span class="name">${friend.name}</span><br><span class="description">${friend.user_id}</span></div></div></div>`
                        count++;
                    }
                    break;
                }
                
            }
        })
    }
    else if(method=='manual')
    {
        data_base("http://localhost:3000/each_person", 'get', {})
        .then(
            (data) => {
                console.log("validation in then", data)
                var user = document.getElementById('name')
                var add_user_id = document.getElementById('description');
                var bool = false;
                for (var each in data) {
                    if ((data[each].person == user.value) && (data[each].user_id == add_user_id.value)) {
                        bool = true;
                        
                           // arr.push({name:user.value,user_id:user_id.value});{"person":dat.name,"friends":arr,"user_id":dat.user_id}
                           // console.log(arr);
                            data_base(`http://localhost:3000/each_person?person=${name}&user_id=${user_id}`,'get',{})
                            .then((dat)=>{
                                dat[0].friends.push({name:user.value,user_id:add_user_id.value});
                                data_base(`http://localhost:3000/each_person/${dat[0].id}`,'put',dat[0])
                                console.log("this the get specific id ",dat[0],dat[0].person,dat[0].user_id);
                               
                            })
                            
                      
                        
                        break;
                    }
                    //console.log("data[" + each + "].name=" + data[each].name, pass, user);
                }
                
                if (bool == false) {
                    alert("the user have no account please register!");
                }
            }
        )
    }
}

function chats(name, value) {


    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('link').click();
    });
    document.getElementById('chats').style.display = 'block';
    document.getElementById('body').style.display = 'none';
    document.getElementById('chat-name').innerText = name;

    document.getElementById('chat-description').innerText = value;
}

function backs() {
    document.getElementById('chats').style.display = 'none';
    document.getElementById('body').style.display = 'block';
}
var cou = 1;

function sends() {
    var x = document.getElementById('messages');

    if (x.value != "") {
        document.getElementById('msg').innerHTML += `<div id="send-msg${cou}" class="send-msg"><div id="send-anim" class="send-msg-len ">${x.value}</div></div>`;
        //document.getElementById('send-msg'+cou).style.display='none';
        send_msg_anim('send-msg', cou);
        cou++;
    }
    x.value = '';
}

function send_msg_anim(id, cou) {
    //document.getElementById('send-msg'+cou).style.display='block';
    document.getElementById(id + cou).firstChild.classList.add("send-msg-anim");
    //document.getElementById(id+cou).style.backgroundColor="red";
    setTimeout(() => { document.getElementById(id + cou).firstChild.classList.remove("send-msg-anim") }, 600);
}
function locater() {
    x = document.getElementById('locater-body');

    if (x.scrollTop < x.scrollHeight - 655) {
        document.getElementById('down').style.display = 'block';
    }
    else {
        document.getElementById('down').style.display = 'none';
    }
    // document.getElementById('scroll').innerText=x.scrollTop+"  "+(x.scrollHeight-655);
}

function data_base(url, method, obj) {
    method = method.toLowerCase();

    if (method == 'post' || method == 'put') {
        fetch(url, {
            method: method,
            body: JSON.stringify(obj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })

    }
    else if (method == 'get') {
        let data = fetch(url)
        return data.then((res) => {
            return res.json()
                .then((data) => {
                   // console.log("get data from " + url);
                   // console.log(data);
                    return data;
                })
                .catch((err) => { console.log("error json"); })
        })
        data.catch((err) => { console.log("error in fetch and url is " + url); })
    }
    else {
        console.log(method + "is not a currect method");
    }
}



/*login form js */

function validate() {

    data_base("http://localhost:3000/users", 'get', {})
        .then(
            (data) => {
                console.log("validation in then", data)
                var user = document.getElementById('us-email');
                var pass = document.getElementById('us-pass');
                var bool = false;
                for (each in data) {
                    if ((data[each].name == user.value) && (data[each].pass == pass.value)) {
                        bool = true;
                       // console.log("data[" + each + "].name=" + data[each].name);
                        document.getElementById('main').style.display = 'block';
                        document.getElementById('login').style.display = 'none';
                        AddPerson('load',data[each].name,data[each].user_id);
                        localStorage.setItem("user",data[each].name);
                        localStorage.setItem("id",data[each].user_id);
                        break;
                    }
                    //console.log("data[" + each + "].name=" + data[each].name, pass, user);
                }
                if (bool == false) {
                    alert("you have no account please register!");
                }
            }
        )
    return false;

}

function registration() {
    document.getElementById('form-main').style.display = 'none';
    document.getElementById('registration').style.display = 'block';


}
function L_closes() {
    document.getElementById('form-main').style.display = 'block';
    document.getElementById('registration').style.display = 'none';
}

function reg_submit() {

    if (conf_validate()) {
        ////registration  data validation and updation

        data_base("http://localhost:3000/users", 'get', {})
            .then(
                (data) => {
                    console.log("validation in then", data)
                    var user = document.getElementById('us-email');
                    var pass = document.getElementById('us-pass');
                    var reg_pass = document.getElementById('reg-password');
                    var reg_id = document.getElementById('email');
                    var reg_name=document.getElementById('reg_name');
                    var bool = false;
                    for (each in data) {
                        if ((data[each].name == user.value) && (data[each].pass == pass.value)) {
                            bool = true;
                            alert('the user name and password is already excised');
                            break;
                        }
                    }
                    if (bool == false) {
                        var user_obj={"name":reg_name.value,"user_id":reg_id.value,"pass":reg_pass.value}
                        data_base('http://localhost:3000/users','post',user_obj);
                        var each_person_obj={"person":reg_name.value,"friends":[]}
                        data_base('http://localhost:3000/each_person','post',each_person_obj);
                    }
                }
            )
            return false;
    }
    else {
        return false;
    }
}

function conf_validate() {
    pass = document.getElementById('reg-password');
    cof = document.getElementById('conf');
    err = document.getElementById('error');
    if ((cof.value != '') && (pass.value != '')) {
        if (pass.value != cof.value) {
            err.style.color = 'rgb(145, 7, 7)';
            err.innerText = 'Conformation password was wrong !';
            return false;
        }
        else {
            err.style.color = 'rgb(23, 121, 23)';
            err.innerText = 'Conformation password and password is currect!';
            return true;
        }
    }
    else {
        err.innerText = '';
        return false;
    }
}
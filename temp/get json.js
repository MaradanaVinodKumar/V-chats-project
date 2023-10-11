//let fs=require('fs');
//const { fs} = require('fs');
var xml=new XMLHttpRequest();

/*xml.onload=function(){
    console.log(xml.responseText);
}
xml.open('POST','json.js');
xml.send('{"message":"haiaaa"}');
*/



let JSON_OBJECT ='{"name": "ABC", "class": 10, "roll": 12, "subject": "Computer"}';
      //Showing JSON_OBJECT in the webpage
      
         //AJAX Call
         let http = new XMLHttpRequest()
         http.open('POST', 'json.js')
         http.onload = function () {
            document.write('JSON data send successfully!');
            
         }
         http.send(JSON_OBJECT)

/*fs.readFile("./temp/json.js",(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            obj=JSON.parse(data.toString());
            console.log('completed read');
            writs(obj)
            
        }
});

function writs(objs){

    objs.vinodUday.push({"message":"hello","send":"vinod","recv":"uday"});
    console.log(typeof objs,objs.vinodUday[1].message);

    
    fs.writeFile("./temp/json.js",JSON.stringify(objs),(err)=>{if(err)console.log(err)});  

}
*/

//


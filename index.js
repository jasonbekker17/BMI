const express= require('express')
const app=express();
const port=3000;
const bodyParser =require('body-parser')
const urlEncodedParser=bodyParser.urlencoded({extended:false})


const fs = require('fs');
const jsonParser = bodyParser.json();
const fileBmi = 'bmi.json';

let rawBmi = fs.readFileSync(fileBmi);
let data = JSON.parse(rawBmi);


app.set('views','views');
app.set('view engine','hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))






app.get('/', function(request,response){
    response.render('home',{name:'Jason Bekker'});
});
app.get('/group', function(request,response){
    response.render('group');
});
app.get('/individual', function(request,response){
    response.render('individual');
});


app.post('/process-bmi',jsonParser,urlEncodedParser,function(req,res){
    heigh = parseFloat(req.body.Height);
    weigh = parseFloat(req.body.Weight);
    bmi = weigh / (heigh * heigh);
    

    const bmi_info ={
        
        bmi:bmi,
        
        
    }
    data.push(bmi_info);
    fs.writeFileSync(fileBmi, JSON.stringify(data, null, 2));
    
    res.redirect('/individual')
 
    //number to string format
    bmi = bmi.toFixed();
 

 

});



    





app.listen(port);
console.log('server is listening on port 3000');
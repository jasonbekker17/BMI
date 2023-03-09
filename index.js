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

async function addBmi() {
    const url = server + '/bmi';
    const bmi = { id: bmiId, height: bmiHeight, weight: bmiWeight, calculateBmi: bmi  };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
    }
    const response = await fetch(url, options);
}


app.post('/bmi',jsonParser,(req,res)=>{
    data.push(req.body);
    fs.writeFileSync(fileBmi, JSON.stringify(data, null, 2));
    res.end();
});

app.get('/', function(request,response){
    response.render('home',{name:'Jason Bekker'});
});


app.post('/process-bmi',urlEncodedParser,function(req,res){
    heigh = parseFloat(req.body.Height);
    weigh = parseFloat(req.body.Weight);
    bmi = weigh / (heigh * heigh);
 
    //number to string format
    bmi = bmi.toFixed();
 
    req_name = req.body.Name;
 
    // CONDITION FOR BMI
    if (bmi < 19) {
        res.send("<h3>hey! " + req_name +
                 " your BMI is around: " + bmi +
                 "<centre><h1>You are Underweight!");
    } else if (19 <= bmi && bmi < 25) {
        res.send("<h3>hey! " + req_name +
                 " your BMI is around: " + bmi +
                 "<centre><h1>You are Normalweight!");
    } else if (25 <= bmi && bmi < 30) {
        res.send("<h3>hey! " + req_name +
                 " your BMI is around: " + bmi +
                 "<centre><h1>You are Overweight!");
    } else {
        res.send("<h3>hey! " + req_name +
                 " your BMI is around: " + bmi +
                 "<centre><h1>You are Obese!");
    }
});

const server = 'http://localhost:3000';
    var bmiId;
    var bmiHeight;
    var bmiWeight;
    var bmi;

    async function fetchBmi() {
        const url = server + '/bmi';
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }
        const response = await fetch(url, options);
        const bmi = await response.json();
        populateContent(bmi);
    }

    function populateContent(bmi) {
        var table = document.getElementById('content');
        table.innerHTML = "<tr><th>Name</th><th>Height</th>Weight</th>BMI</th></tr>";
        bmi.forEach(bmis => {
            var row = document.createElement('tr');
            var dataId = document.createElement('td');
            var textId = document.createTextNode(bmis.id);
            dataId.appendChild(textId);
            var dataName = document.createElement('td');
            var textName = document.createTextNode(bmis.Height);
            dataName.appendChild(textName);
            var dataName = document.createElement('td');
            var textName = document.createTextNode(bmis.Weight);
            dataName.appendChild(textName);
            var dataName = document.createElement('td');
            var textName = document.createTextNode(bmis.Totals);
            dataName.appendChild(textName);
            row.appendChild(dataId);
            row.appendChild(dataName);
            table.appendChild(row);
        });
    }

    





app.listen(port);
console.log('server is listening on port 3000');
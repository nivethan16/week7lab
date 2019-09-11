let express = require('express');
let app = express();
//let mongodb=require('mongodb')
//const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/week5';
//let db=null;
//let col=null

let mongoose=require('mongoose')
let Developer=require('./models/developer')
let Task =require('./models/task')

mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true }, function (err, client) {
    if (err) {
        console.log('Err  ', err);
    } else {
        console.log("Connected successfully to server");
        //db = client.db('week5');
        //col=db.collection('todo')
    }
})


//let bodyParser = require('body-parser');

let viewsPath = __dirname + "/views/";
app.use(express.static('views/image'))
app.use(express.static('views/css'));


app.engine("html", require('ejs').renderFile);
app.set("view engine", "html");

app.get('/', function(req,res){
    res.sendFile(viewsPath + "index.html");
});

app.use(express.urlencoded({extended: false}));

app.get('/adddeveloper',function(req,res){
    res.sendFile(viewsPath+"adddeveloper.html")
})

app.post('/appendDeveloper',function(req,res){
    let developer = new Developer({
        name: {
            firstName: req.body.firstname,
            lastName: req.body.lastname
        },
        Level:req.body.level,
        Address:{
            State:req.body.state,
            Suburb:req.body.suburb,
            Street:req.body.street,
            Unit:req.body.unit
        }
})
    developer.save(function (err) {
        if (err) throw err;
        console.log('developer1 successfully Added to DB');
    });

    res.redirect('/showDeveloper')
})

app.get('/addtask', function(req,res){
    res.sendFile(__dirname+"/views/addtask.html");
});

app.post('/appendTask', function(req,res){

    let task = new Task({
        taskName:req.body.taskname,
        assignto:mongoose.Types.ObjectId(req.body.assignto),
        dueDate:req.body.duedate,
        status:req.body.status,
        description:req.body.description
    })
    
    task.save(function (err) {
        if (err) throw err;
        console.log('developer1 successfully Added to DB');
    });

    res.redirect('/listAll')
    
});
app.get('/showDeveloper',function(req,res){
    Developer.find().exec(function(err,data){
        res.render(__dirname+"/views/showDeveloper.html",{task:data})
    })
    //res.render(__dirname+"/views/showDeveloper.html",{task:Developer})
})
app.get('/listAll', function(req,res){

    Task.find().exec(function(err,data){
        res.render(__dirname+"/views/listtask.html",{task:data})
    })
})
app.get('/deletetaskid',function(req,res){
    res.sendFile(viewsPath+'deletetask.html')
    
})

app.get('/updatetask',function(req,res){
    res.sendFile(viewsPath+'updatetask.html')
    
})
app.post('/deletetask',function(req,res){
    let id = req.body.id;
    let filter ={_id: mongoose.Types.ObjectId(id)};
    Task.deleteOne(filter,function(err,obj){
        console.log(obj.result)
    })
    res.redirect('/listAll')

})
app.post('/updatestatus',function(req,res){
    let id = req.body.id;
    let filter ={_id: mongoose.Types.ObjectId(id)};
    let set={$set: { status : req.body.status}};
    Task.updateOne(filter,set,function(err,obj){
        console.log(obj.result)
    })
    res.redirect('/listAll')

})
app.get('/deleteCompleted',function(req,res){
    let filter = {status:'Completed'}
    Task.deleteMany(filter,function(err,obj){
        console.log(obj.result)
    })
    res.redirect('/listAll')
})

app.get('/labTask',function(req,res){
    let filter = {status:'Completed'}
    Task.find(filter).sort({taskName:-1}).limit(3).exec(function(err,data){
        res.render(__dirname+"/views/listtask.html",{task:data})
    })
})




app.listen(8080);
const express=require('express');
const mongoose=require('mongoose');
const app=express();
const port=5000;
app.use(express.json());

// Connecting to the database, copy link from mongoose (connect w driver)
// mongoose.connect("mongodb+srv://maliawan0:Hashir0856@cluster-1.gad4ulw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1")
mongoose.connect("mongodb+srv://maliawan0:Hashir0856@cluster-1.gad4ulw.mongodb.net/myClone?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  
.then(() => console.log('Connected Successfully to DB'))
.catch((err) => { console.error(err); })

require('./models/user');
require('./models/post');
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

app.listen(port,()=>
{
    console.log(`Server is running on ${port}`);
})

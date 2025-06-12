import e from "express";

const port = 3000;
const app = e();

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port,()=>{
    console.log('Your app server is running on http://localhost/3000');
})
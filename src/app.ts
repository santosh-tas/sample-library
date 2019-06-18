import  app from './index';

const port : string = process.env.port ? process.env.port: '8081';

app.listen(port, function(){
    console.log("Server started at port", port);
})
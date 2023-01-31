// Configuration
//Admin user : administrator
//Admin password : 1q2w3e4r

//3100
class Config { 
    public port = 3001; 
    // mysql database
    public mySQLhost = "localhost";
    public mySQLUser = "root";
    public mySQLPassword = "12345678";
    public mySQLdb = "vacations_db";
    //another database
    //public mySQLport = 3316;
}

const config = new Config();
export default config
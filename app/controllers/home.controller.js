let showHomePage = (req , res)=>{
   // res.send("<h1> Hello From Home Controller </h1>");
   res.render('pages/home.ejs' , {
       title : "Home Page"
   });
}

module.exports = {
    showHomePage : showHomePage
}

/*
module.exports = {
    showHomePage : (req , res)=>{
    }
}
*/
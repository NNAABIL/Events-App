const Event = require('../models/event');
module.exports = {
    // Show All Events
    showEvents : (req , res)=>{
        // Dummy Data
        /*
        const events = [
            {name : 'Html5 Course' , slug : "html5-course" , price : 500 , description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit."},
            {name : 'Css3 Course' , slug : "css3-course" , price : 800 , description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit."},
            {name : "Javascript Course" , slug : "javascript-course" , price : 1000 , description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit."}
        ];
        */
        Event.find({} , (err , events)=>{
            if(err){
                res.status(404);
                res.send('<h1>Error 404 Events Not Found !!</h1>');
            }
            res.render('pages/events' , {
                title : "Events Page" , 
                events : events ,
                success : req.flash('success')
            });
        });
    },
    // Show Single Event 
    showSingleEvent : (req , res)=>{
        Event.findOne({slug : req.params.slug} , (err , event)=>{
            if (err) throw err;
            res.render('pages/single' , {
                title : "Read More" , 
                event : event
            });
        })
    },
    // Render Create Page 
    createEvent : (req , res)=>{
        res.render("pages/create" , {
            title : "Create Events"
        });
    },
    // Process Create Page
    processCreate : (req , res)=>{
        const event = new Event({
            name : req.body.name , 
            price : req.body.price,
            description : req.body.description
        });
        event.save((err)=>{
            if (err) throw err;
             // send successfull message
             req.flash('success' , 'Event Created Successfully');
            // Redirect To Events Page If Event Saved Successfully
            res.redirect('/events');
        });
    },
    // Show Update Page
    updateEvent : (req , res)=>{
        Event.findOne({slug : req.params.slug} , (err , event)=>{
            res.render('pages/update' , {
                title : "Update Event",
                event : event
            });
        })
    },
    processUpdate : (req , res)=>{
        Event.findOne({slug : req.params.slug} , (err , event)=>{
            // Update Current Event
            event.name = req.body.name ,
            event.price = req.body.price ,
            event.description = req.body.description

            // Save Event
            event.save((err)=>{
                if (err) throw err;
                res.redirect('/events');
            });
        })
    },
    // Delete Event
    deleteEvent : (req , res)=>{
        Event.deleteOne({slug : req.params.slug} , (err)=>{
            if(err) throw err;
            res.redirect('/events');
        });
    }
}

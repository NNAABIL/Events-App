const mongoose = require('mongoose') , 
      Schema   = mongoose.Schema;

// Create Event Schema 
const eventSchema = new Schema({
    name : String , 
    slug : {
        type : String , 
        unique : true
    },
    price : Number , 
    description : String
});
// Middleware Check If Slug Created Successfully From Name
eventSchema.pre('save' , function(next){
    this.slug = slugify(this.name);
    next();
});
// Create Model 
const eventModel = mongoose.model('Event' , eventSchema);

// Export Event Model
module.exports = eventModel;

// Slugify Function 
function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
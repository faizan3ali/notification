const Notifications = require("../models/notifications");
const mongoose = require("mongoose");

exports.addTaskNotifications=(data)=>{
  console.log("req",data)
    try{
    //   {
    //     id         : '493190c9-5b61-4912-afe5-78c21f1044d7',
    //     icon       : 'heroicons_solid:star',
    //     title      : 'Daily challenges',
    //     description: 'Your submission has been accepted',
    //     time       : moment().subtract(25, 'minutes').toISOString(), // 25 minutes ago
    //     read       : false
    // }

    const notifications = new Notifications({
        _id: new mongoose.Types.ObjectId(),
        title : data.Task.title,
        description:"New "+data.category+" Assign to you ",
        icon : 'heroicons_outline:check-circle',
        read:false,
        user_id:data.Task.assignedTo[0],
        link:data.category+'s/'+data.Task._id,
        category:data.Task.category,
        categoryid:data.Task.id,
        createdAt:new Date(),
        createdby:data.Task.createdBy
      });
      notifications
        .save()
        .then((result) => {
          process.emit('notification', {user:data.Task.assignedTo[0],notification:result});
          //io.to(data.Task.assignedTo[0]).emit('notification', { message: 'You have a new notification!' });
          console.log(result);
        })
        .catch((error) => {
          console.log(error,"error")
        })
    }
    catch(error){
        console.log(error);

    }
}


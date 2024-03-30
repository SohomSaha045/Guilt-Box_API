const { default: mongoose } = require("mongoose");

const { CollegeRoomSchema } = require("./../models/CollegeRoom");

const postComments = async (roomId, messageId, comment, name) => {
  const messageSchema = await mongoose.model(roomId, CollegeRoomSchema);
//     const comments= await messageSchema.find({
//       _id:messageId
//     });
  const obj={
      name:name,
      message:comment
    }
//   const newComment = { name: "John Doe", message: "This is a new comment!" };
    const comments = await messageSchema.findByIdAndUpdate(messageId ,{ $push: { comments: obj } });
//   const comments = await messageSchema.findByIdAndUpdate(messageId, {
//     $push: { comments: newComment },
//   });
  return comments;
    // return obj;
};
module.exports = {
  postComments
};

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to mongodb"))
  .catch((error) => console.error("Could not connect to mongodb", error));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  //eq (equal)
  //ne (not equal)
  //gt (greater than)
  //gte(greater than or equal to)
  //lt(less than)
  //lte(less than or equal to)
  //in
  //nin (not in )

  //or
  //and

  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({
    isPublished: true,
  })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .select({ name: 1, author: 1 });
  console.log(courses);
}

async function updateCourse(id) {
  //query first
  //modify properties
  //save
  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        isPublished: true,
        author: "Another author",
      },
    }
  );

  console.log(result);
}
updateCourse("5a68fdd7bee8ea64649c2777");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to mongodb"))
  .catch((error) => console.error("Could not connect to mongodb", error));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);
async function createCourse() {
  const course = new Course({
    name: "Angular course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });
  const result = await course.save();
  console.log("result", result);
}

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

  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
getCourses();

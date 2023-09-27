const data = require('../testData');
let courses;
let activities;
let volunteers;
let projects;

const getTypes = () => {
  const allTypes = data
    .map((item) => item.allPosts.map((post) => post.type))
    .flat();

  courses = allTypes.filter((item) => item === 'course');
  activities = allTypes.filter((item) => item === 'activity');
  volunteers = allTypes.filter((item) => item === 'volunteer');
  projects = allTypes.filter((item) => item === 'project');
};

const getHome = (req, res) => {
  getTypes();
  res.status(200).json({
    success: true,
    data: {
      activeCourses: courses.length,
      activeActivities: activities.length,
      activeVolunteers: volunteers.length,
      activeProjects: projects.length,
    },
  });
};

module.exports = getHome;

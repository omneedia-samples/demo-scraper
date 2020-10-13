global.jobs = {
  completed: function (job, result) {
    console.log(job);
    console.log(`Job completed with result ${result}`);
  },
  failed: function (job, err) {
    console.log(job);
    console.log(err);
  },
};

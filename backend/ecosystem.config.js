module.exports = {
    apps : [{
      name: "backend-antiassedio",
      script: "./server.js",
      instances  : 2,
      exec_mode  : "cluster"
    }]
  }
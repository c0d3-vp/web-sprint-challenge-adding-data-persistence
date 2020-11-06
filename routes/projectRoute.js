const express = require("express");
const { findTasks } = require("../data/projectshelper");
const db = require("../data/projectshelper");

const projectRoute = express.Router();

projectRoute.get("/", (req, res) => {
  db.find()
    .then((projects) => {
      if (projects.length) {
        res.status(200).json(projects).end();
      } else {
        res
          .status(404)
          .json({ message: "There are no projects on the server" })
          .end();
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "The server exploded" }).end();
    });
});

projectRoute.get("/:id", (req, res) => {
  db.findById(req.params.id)
    .then((project) => {
      if (project) {
        res.status(200).json(project).end();
      } else {
        res.status(404).json({ message: "Project not found" }).end();
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "The server exploded" }).end();
    });
});

projectRoute.get("/:id/tasks", (req, res) => {
  db.findTasks(req.params.id)
    .then((tasks) => {
      if (tasks.length) {
        res.status(200).json(tasks).end();
      } else {
        res.status(404).json({ message: "Project file not found" }).end();
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Oops" }).end();
    });
});

projectRoute.get('/:id/resources', (req, res)=>{
  db.getResources(req.params.id)
  then(resource => {
    if(resource){
      res.status(200).json(resource).end()
    }else{
      res.status(404).json({message:"Nope"}).end()
    }
  })
  .catch(err => res.status(500).json({message:"Nope"}).end())
})

projectRoute.post("/", (req, res) => {
  db.add(req.body)
    .then((project) => {
      if (project) {
        db.findById(project[0])
          .then((project) => res.status(201).json(project).end())
          .catch((err) => res.status(500).json({ message: "bigger error" }));
      } else {
        res
          .status(400)
          .json({ message: "Bad Request - please fill all required fields" })
          .end();
      }
    })
    .catch((err) => {
      res.status(500).json(err).end();
    });
});

projectRoute.post("/:id/tasks", (req, res) => {
  const data = req.body;
  data["project_id"] = Number(req.params.id);

  db.addTask(data, req.params.id)
    .then((project) => {
      if (project) {
          findTasks(req.params.id)
          .then(project => {
            res.status(201).json(project).end();
          })
        .catch(err=>{
            res.status(400).json(err).end();
        })
      } else {
        res
          .status(400)
          .json({ message: "Bad Request - please fill all required fields" })
          .end();
      }
    })
    .catch((err) => {
      res.status(500).json(err).end();
    });
});

module.exports = projectRoute;
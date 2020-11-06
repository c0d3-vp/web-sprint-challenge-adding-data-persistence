const express = require("express");
const db = require("../data/resourcehelper");
const resourceRoute = express.Router();

resourceRoute.get("/", (req, res) => {
  db.find()
    .then((resource) => {
      if (resource.length) {
        res.status(200).json(resource).end();
      } else {
        res.status(404).json({ message: "There are no resources" }).end();
      }
    })
    .catch((err) => res.status(500).json({ message: "Nope nope nope" }).end());
});

resourceRoute.get("/:id", (req, res) => {
  db.findById(req.params.id)
    .then((resource) => {
      if (resource) {
        res.status(200).json(resource).end();
      } else {
        res.status(404).json({ message: "resource not found" }).end();
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "nope" }).end();
    });
});

resourceRoute.get('/:id/projects', (req, res)=>{
    db.getProjects(req.params.id)
    then(resource => {
        if(resource){
          res.status(200).json(resource).end()
        }else{
          res.status(404).json({message:"Nope"}).end()
        }
      })
      .catch(err => res.status(500).json({message:"Nope"}).end())
    })

resourceRoute.post("/", (req, res) => {
  db.add(req.body)
  .then((resource) => {
    if (resource) {
      db.findById(resource[0])
        .then((resource) => res.status(201).json(resource).end())
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

module.exports = resourceRoute;
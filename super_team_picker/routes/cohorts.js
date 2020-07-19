  
const express = require('express');
const router = express.Router();
const knex = require("../db/client");
const teamList = require("../super_team_picker");

router.get('/', (req, res) => {
    knex("cohorts")
        .orderBy("createdAt", "DESC")
        .then(data => {
            res.render("cohorts/index", {
                cohorts: data
            });
        });
});

router.get('/new', (req, res) => {  
    res.render("cohorts/new") 
});

router.post("/", (req, res) => {
    knex() 
      .insert({
        name: req.body.name,
        members: req.body.members,
        logoUrl: req.body.logoUrl 
      })
      .into("cohorts")
      .returning("*")
      .then(data => {
          console.log(data);
        res.redirect(`/cohorts/${data[0].id}`);
      });
  });

router.get("/:id", (req, res) => {
    knex("cohorts")
        .where("id", req.params.id)
        .first() 
        .then(data => {
        if (data) {
            res.render("cohorts/show", { 
                cohort: data,
                options: req.query,
                teamList: teamList(data.members, req.query.method, req.query.quantity)
            });
        } else {
            res.send(`Cannot find team with id: ${id}`);
        }
    });
});

router.get("/:id/edit", (req, res) => {
        knex("cohorts")
            .where("id", req.params.id)
            .first() 
            .then(data => {
                res.render("cohorts/edit", { 
                    cohort: data
                });
        });
    });

router.delete("/:id", (req, res) => {
    knex("cohorts")
      .where("id", req.params.id)
      .del()
      .then(() => {
        res.redirect("/cohorts");
    });
});

router.put("/:id", (req, res) => {
    knex("cohorts")
      .where("id", req.params.id)
      .update({
        name: req.body.name,    
        members: req.body.members,
        logoUrl: req.body.logoUrl 
      })
      .then(() => {
        res.redirect("/cohorts");
    });
});

module.exports = router;
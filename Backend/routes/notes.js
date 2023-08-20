const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note")
const { body, validationResult } = require("express-validator");


//ROUTE 1:create all the notes using : GET"/api/auth/fetchallnotes". does not require authentification .login required

router.get('/fetchallnotes',fetchuser,async (req,res)=>{

    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
        
    } catch (error) {
         //catch errors
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
})

//ROUTE 2:adding the notes using : POST"/api/auth/addnotes". does not require authentification .login required

router.post('/addnotes',fetchuser,[
    
    body("title", "Enter a Valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5})    
],async (req,res)=>{
    try {
        const {title, description, tag} =await req.body;
    
        //if there are error returns bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        const note  = new Note({
            title, description, tag ,user: req.user.id
        })
    
        const savedNote = await note.save();
        res.json(savedNote);
        
    } catch (error) {
         //catch errors
      console.error(error.message);
      res.status(500).send("Some error occured");
    }

})

//ROUTE 3:Update the existing  note using : POST"/api/note/updatenote". does not require authentification .login required

router.put('/updatenote/:id',fetchuser,async (req, res) => {
    const {title , description, tag} = req.body;
    try {
        
        //create a newNote Object
    
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
    
        //find the note to be updated and update it
        //no other user can update the note of the other user 
        let note =await Note.findById(req.params.id);
        // if the id of the both the requested and given user id does not match the show the error
        if(!note){return res.status(404).send("Not Found")};
        
    
        // matching the two ids
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
    
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note})
    } catch (error) {
        //catch errors
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
})


//ROUTE 4:delete the particular note using : POST"/api/note/deletenote". does not require authentification .login required

router.delete('/deletenote/:id',fetchuser,async (req, res) => {
    const {title , description, tag} = req.body;

    try {
        //no other user can delete the note of the other user 
        let note =await Note.findById(req.params.id);
        // if the id of the both the requested and given user id does not match the show the error
        if(!note){return res.status(404).send("Not Found")};
        
        // Allow deletion only if the user owns the note
        //find the note to be delete and delete it
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
    
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been deleted", note:note})
        
    } catch (error) {
        //catch errors
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
})


module.exports = router
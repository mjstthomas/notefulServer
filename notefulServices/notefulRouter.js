const express = require('express')
const xss = require('xss')
const path = require('path')
const folderServices = require('./folderServices')
const noteServices = require('./noteServices')

const notefulRouter = express.Router()
const jsonParser = express.json()


notefulRouter
    .route('/api/folders')
    .get((req, res, next)=>{
        folderServices.getAllFolders(req.app.get('db'))
            .then(folders =>{
                const cleanFolders = folders.map(folder =>{
                    return {
                        id: folder.id,
                        folderName: xss(folder.folder_name)
                    }
                })
                return res.json(cleanFolders)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next)=>{
        const {id, folderName} = req.body
        const newFolder = { 
            id: id,
            folder_name: folderName
        }
        folderServices.insertFolder(req.app.get('db'), newFolder)
        .then(result =>{
            folderServices.getAllFolders(req.app.get('db'))
                .then(folders =>{
                    const cleanFolders = folders.map(folder =>{
                        return {
                            id: folder.id,
                            folderName: xss(folder.folder_name)
                        }
                    })
                    return res.json(cleanFolders)
                })
        })
        .catch(next)
    })

notefulRouter
    .route('/api/folders/:folderId')
    .delete((req, res, next) =>{
        folderServices.deleteFolder(
            req.app.get('db'),
            req.params.folderId
        )
        .then(()=>{
           return res.status(204).end()
        })
        .catch(next)
    })


notefulRouter
    .route('/api/notes')
    .get((req, res, next)=>{
        noteServices.getAllNotes(req.app.get('db'))
        .then(notes =>{
            const cleanNotes = notes.map(note => {
                return {
                    id: note.id,
                    noteName: xss(note.note_name),
                    modified: note.modified,
                    folderId: note.folderid,
                    content: xss(note.content)
                }
            })
            res.json(cleanNotes)
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next)=>{
        console.log(req.body)
        const {folderid, content, noteName } = req.body
        const newNote = { 
            folderid: folderid,
            note_name: noteName,
            content: content
        }
        noteServices.addNote(req.app.get('db'), newNote)
        .catch(next)
    })

notefulRouter
    .route('/api/notes/:noteId')
    .delete((req, res, next)=>{
        noteServices.deleteNote(
            req.app.get('db'),
            req.params.noteId
        )
        .then(()=>{
            return res.status(204).end()
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next)=>{
        const {note_name, content} = req.body
        const updatedNote = {note_name, content}

        const numberOfValues = Object.values(updatedNote).filter(Boolean).length
            if(numberOfValues === 0){
                return res.status(404).json({
                    error: {
                        message: "Request body must contain either 'note_name' or 'content'"
                    }
                })
            }

        noteServices.updateNote(
            req.app.get('db'),
            req.params.noteId,
            updatedNote
        )
        .then(result =>{
            return res.status(204).end()
        })
    })


module.exports = notefulRouter
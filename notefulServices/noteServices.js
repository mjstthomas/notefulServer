

const noteServices = {
    getAllNotes(knex){
        return knex
        .select('*')
        .from('notes')
    },
    addNote(knex, newNote){
        return knex
        .insert(newNote)
        .into('notes')
    },
    deleteNote(knex, id){
        return knex('notes')
            .where({id})
            .delete()
    },
    updateNote(knex, id, newNote){
        return knex('notes')
        .where({id})
        .update(newNote)
    }
}

module.exports = noteServices
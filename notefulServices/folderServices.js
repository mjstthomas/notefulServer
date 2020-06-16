const folderServices = {
    getAllFolders(knex){
        return knex
        .select('*')
        .from('folders')
    },
    insertFolder(knex, folder){
        return knex
        .insert(folder)
        .into('folders')
    },
    deleteFolder(knex, id){
        return knex('folders')
        .where({id})
        .delete()
    }
}

module.exports = folderServices;
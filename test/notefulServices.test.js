const noteServices = require('../notefulServices/noteServices')
const knex = require('knex')
const { expect } = require('chai')

describe('noteServices object', ()=>{
    let db

    const testNotes = [
    {
        note_name:'dogs',
        folderId: 1,
        content: 'Corporis accusamus placeat quas non voluptas. Harum fugit molestias qui. Velit ex animi reiciendis quasi. Suscipit totam delectus ut voluptas aut qui rerum. Non veniam eius molestiae rerum quam.\n \rUnde qui aperiam praesentium alias. Aut temporibus id quidem recusandae voluptatem ut eum. Consequatur asperiores et in quisquam corporis maxime dolorem soluta. Et officiis id est quia sunt qui iste reiciendis saepe. Ut aut doloribus minus non nisi vel corporis. Veritatis mollitia et molestias voluptas neque aspernatur reprehenderit.\n \rMaxime aut reprehenderit mollitia quia eos sit fugiat exercitationem. Minima dolore soluta. Quidem fuga ut sit voluptas nihil sunt aliquam dignissimos. Ex autem nemo quisquam voluptas consequuntur et necessitatibus minima velit. Consequatur quia quis tempora minima. Aut qui dolor et dignissimos ut repellat quas ad.'
    },
    {
        note_name:'cats',
        folderId: 2, 
        content:'Eos laudantium quia ab blanditiis temporibus necessitatibus. Culpa et voluptas ut sed commodi. Est qui ducimus id. Beatae sint aspernatur error ullam quae illum sint eum. Voluptas corrupti praesentium soluta cumque illo impedit vero omnis nisi.\n \rNam sunt reprehenderit soluta quis explicabo impedit id. Repudiandae eligendi libero ad ut dolores. Laborum nihil sint et labore iusto reiciendis cum. Repellat quos recusandae natus nobis ullam autem veniam id.\n \rEsse blanditiis neque tempore ex voluptate commodi nemo. Velit sapiente at placeat eveniet ut rem. Quidem harum ut dignissimos. Omnis pariatur quas aperiam. Quasi voluptas qui nulla. Iure quas veniam aut quia et.'
    },
    {
        note_name: 'pigs',
        folderId: 2, 
        content: 'Occaecati dignissimos quam qui facere deserunt quia. Quaerat aut eos laudantium dolor odio officiis illum. Velit vel qui dolorem et.\n \rQui ut vel excepturi in at. Ut accusamus cumque quia sapiente ut ipsa nesciunt. Dolorum quod eligendi qui aliquid sint.\n \rAt id deserunt voluptatem et rerum. Voluptatem fuga tempora aut dignissimos est odio maiores illo. Fugiat in ad expedita voluptas voluptatum nihil.'}
    ]

    before(()=>{
        db = knex({
            client: 'pg',
            connection: process.env.DB_URL_TEST
        })
    })


    afterEach(()=> db('notes').truncate())

    after(()=> db.destroy())

    describe('getAllNotes()', ()=>{
        beforeEach(()=>{
            return db
                .into('notes')
                .insert(testNotes)
        })
        it('resolves all folders', ()=>{
            return noteServices.getAllNotes(db)
                .then(result =>{
                    expect(result).to.eql(testNotes)
                })
        })
    })
})
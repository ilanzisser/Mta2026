import express from 'express';

import {User, load_users, get_user_by_id, delete_user_by_id, save_users, get_next_id} from './user-db'
const app = express();
const port = 3000;


// Middleware for Express
const set_content_type = function (req : express.Request, 
            res : express.Response, next : express.NextFunction) 
{
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    next()
}

app.use( set_content_type );
app.use(express.json());  // to support JSON-encoded bodies
app.use(express.urlencoded( // to support URL-encoded bodies
{  
	extended: true
}));

const FILE_PATH = "c:\\temp\\users.json"; // Modify to your system

let users_map = null as Map<number, User>;

async function init( file_path : string  ) : Promise< Map<number, User>>
{
    const ret = await load_users( file_path );
    return ret;
}

app.get('/', (req : express.Request, res : express.Response ) => {
  res.send('Hello World!');
});


function get_user( req : express.Request, res : express.Response ) : void
{
    const id = req.params.id;
    const ret = get_user_by_id( Number( id  ) , users_map );
    // Ignore errors for now
    res.send( JSON.stringify( ret) );
}   
app.get('/user/:id', get_user );

async function delete_user( req : express.Request, res : express.Response ) : Promise<void>
{
    const id = req.params.id;
    const ret = delete_user_by_id( Number(id), users_map  )
    await save_users(  FILE_PATH, users_map )
    res.send( JSON.stringify( ret) );
}  

app.delete('/user/:id', delete_user );

async function post_user( req : express.Request, res : express.Response ) : Promise<void>
{
    const new_user = req.body;
    const id = get_next_id( users_map );

    // REALLY need to check the values here
    const user_to_add = { id : id,  name : new_user.name, 
        birth_year : new_user.birth_year, gender : new_user.gender}
    users_map.set( id, user_to_add );

    await save_users(  FILE_PATH, users_map )
    res.send( JSON.stringify( user_to_add) );
}  


app.post('/user/', post_user );

async function put_user( req : express.Request, res : express.Response ) : Promise<void>
{
    const user = req.body;
    const id = Number(req.params.id );

    const ret = get_user_by_id( Number( id  ) , users_map );
    if ( !ret ) 
    {
        res.status( 404);
        res.send( 'No such user');
        return;
    }
    
    const user_to_change = { id : id,  name : user.name, birth_year : user.birth_year, gender : user.gender}
    users_map.set( id, user_to_change );

    await save_users(  FILE_PATH, users_map )
    res.send( JSON.stringify( user_to_change) );
}  

app.put('/user/:id', put_user );

function get_users( req : express.Request, res : express.Response ) : void
{
    const all_users = Array.from( users_map.values() );
    res.send( JSON.stringify( all_users) );
}   
app.get('/users/', get_users );

init( FILE_PATH ).then(

    (result) => {
        users_map = result;
        app.listen(port, () => { return console.log(`Express is listening at http://localhost:${port}`)})},
    () => console.log( 'Failed to init system')
)






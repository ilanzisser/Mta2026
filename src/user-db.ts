

import fs_base from 'fs';
const fs = fs_base.promises;


export enum Gender {
    Unknown = 0,
    Male = 1,
    Female = 2
}


export type User = {
    id : number,
    name : string,
    birth_year : number,
    gender : Gender 
}



export async function load_users( file_path :  string  ) : Promise< Map<number, User> >
{
    try {
        const data = await fs.readFile( file_path, { encoding: 'utf8' });
        const users_json = JSON.parse( data );
        const ret = new Map<number, User>();
        users_json.forEach(element => {
            ret.set( element.id, element );
        });
        return ret;
    } catch (err) {
        console.error(err);
        return new Map<number, User>();
    }
}

export async function save_users(  file_path : string,  users :  Map<number, User>  ) : Promise<void>
{
    const all_users = Array.from( users.values());
    await fs.writeFile( file_path, JSON.stringify( all_users ) );
}

export function get_next_id( users :  Map<number, User> ) : number
{
    if ( !users || users.size == 0) return 1;
    const arr = Array.from(  users.keys( ) );
    return 1 + Math.max( ...arr );
}

export function add_user( name : string, birth_year : number, gender : Gender, users :  Map<number, User>  ) : number
{
    const id = get_next_id( users);

    const new_user = {
        id : id,
        name : name,
        birth_year : birth_year,
        gender : gender
    }

    users.set( id, new_user );
    return id;
}

export function get_user_by_id( id : number, users :  Map<number, User>  ) : User
{
    if ( users.has( id))
        return users.get(id);
    return null;
}

export function delete_user_by_id( id : number, users :  Map<number, User>  ) : Boolean
{
    return users.delete( id);
}

const FILE_PATH = "c:\\temp\\users.json"; // Modify to your system

 export async function test_users()
{
    const users = await load_users( FILE_PATH );
    add_user( 'סתם אחד', 1999, Gender.Male, users );
    add_user( 'סתם אחת', 2002, Gender.Female, users );
    await save_users( FILE_PATH,  users );

}


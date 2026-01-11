const fs = require('node:fs/promises');


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


const FILE_PATH = "users.json"

export async function load_users() : Promise< Map<number, User> >
{
    try {
        const data = await fs.readFile( FILE_PATH, { encoding: 'utf8' });
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

export async function save_users( users :  Map<number, User>  ) : Promise<void>
{
    await fs.writeFile( FILE_PATH, JSON.stringify( users ) );
}


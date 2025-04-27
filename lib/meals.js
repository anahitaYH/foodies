import sql from 'better-sqlite3'
import slugify from 'slugify';
import xss from 'xss';
// to write to a file in the public folder. this allows us to work with the filesystem
import fs from 'node:fs';

const db = sql('meals.db');

export async function getMeals(){
    await new Promise((resolve) => setTimeout(resolve,2000));
    // throw new Error('there was an error loading the meals')

    return db.prepare('SELECT * FROM meals').all();
}


export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}



export async function saveMeal(meal){
    meal.slug = slugify(meal.title, {lower: true})
    meal.instructions = xss(meal.instructions)
    const extension = meal.image.name.split('.').pop()
    const fileName = `${meal.slug}.${extension}`
    // createWriteStream creates a stream that allows us to write data to a certain file. createWriteStream needs a path to the file which you wanna write and then it will return a stream object which you can then use to write to that path
    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage),(error) => {
        throw new Error('Saving image failed!')
    })
    meal.image = `/images/${fileName}`
    db.prepare(`
        INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug) 
        VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
        )
    `).run(meal);

}
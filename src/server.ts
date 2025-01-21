import express, { request, Request, response, Response } from "express"
//Conexão com o banco de dados
import { knex } from "./database/knex"

const app = express()
app.use(express.json())

app.post("/courses", async (request: Request, response: Response) => {
  const { name } = request.body

  await knex("courses").insert({ name })
//  await knex.raw("INSERT INTO courses (name) VALUES (?)", [name])

  return response.status(201).json()
})

app.get("/courses", async (request: Request, response: Response) => {
//  const courses = await knex.raw("SELECT * FROM courses")
const courses = await knex("courses").select().orderBy("name")

  return response.json(courses)
})

app.put("/courses/:id", async (request: Request, response: Response) => {
  const { id } = request.params
  const { name } = request.body

  await knex("courses").update({ name }).where({ id })

  return response.json()
})

app.delete("/courses/:id", async (request: Request, response: Response) => {
  const { id } = request.params

  await knex("courses").delete().where({ id })
  
  return response.json()
})

app.post("/modules", async (request: Request, response: Response) => {
  const { name, course_id } = request.body

  await knex("courses_modules").insert({ name, course_id })

  return response.status(201).json()
})


app.get("/modules", async (request: Request, response: Response) => {
  const modules = await knex("courses_modules").select()

  return response.json(modules)
})

app.get("/courses/:id/modules", async (request: Request, response: Response) => {
  const courses = await knex("courses")
  .select(
    "courses.id AS course_id",
    "courses_modules.id AS module_id", 
    "courses_modules.name AS module", 
    "courses.name AS course"
  )
  .join("courses_modules", "courses.id", "courses_modules.course_id")

  return response.json(courses)
})


app.listen(3333, () => console.log(`Server is running on port 3333`))

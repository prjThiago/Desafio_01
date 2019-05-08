const express = require('express')
const app = express()
const nunjucks = require('nunjucks')

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

app.get('/', (req, res) => {
  res.render('index')
})

const checkAgeExists = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    res.redirect('/')
  }

  next()
}

app.post('/check', (req, res) => {
  const { age } = req.body

  if (age >= 18) {
    res.redirect(`major?age=${age}`)
  } else {
    res.redirect(`minor?age=${age}`)
  }
})

app.get('/major', checkAgeExists, (req, res) => {
  const { age } = req.query

  res.render('major', { age })
})

app.get('/minor', checkAgeExists, (req, res) => {
  const { age } = req.query

  res.render('minor', { age })
})

app.listen(3000, () => {
  console.log('Servidor rodando')
})

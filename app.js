const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const messages = require('./Messages')

//static
app.use(express.static('public'))

//Handler bar
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false}))

//Home page
app.get('/', (req, res) => {
    res.render('index', {
        title: "Message App",
         messages
    })
})
app.get('/new', (req, res) => {
    res.render('form', {
        title: "Message App"
    })
})

//Route
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

//Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`Server is running at port ${PORT}`)
})
const { connect, connection } = require('mongoose');

connect('mongodb+srv://lauraC:Laura123@cluster0.wnxdact.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;
//'mongodb://localhost/socialMedia'
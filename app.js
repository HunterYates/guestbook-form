import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

app.set('view engine', 'ejs');

const PORT = 3000;

app.get('/', (req, res) => {
     res.render('home');
});

const guests = [];

app.post('/submit-guest', (req, res) => {
     if (req.body.first_name.trim() === "") res.send("Invalid input: Must include a first name.");
     if (req.body.last_name.trim() === "") res.send("Invalid input: Must include a last name.");
     if (req.body.email.trim() === "") res.send("Invalid input: Must include an email address.");

     const guest = {
          fname: req.body.first_name,
          lname: req.body.last_name,
          jtitle: req.body.job_title,
          company: req.body.company,
          linkedin: req.body.linkedin,
          email: req.body.email,
          howmeet: req.body.how_met,
          other: req.body.other,
          message: req.body.message,
          mlist: req.body.mailing_list,
          eformat: req.body.email_format,
          timestamp: new Date()
     };

     guests.push(guest);

     console.log(guests);

     res.render('confirmation', {guest});
});

app.get('/admin', (req, res) => {
     res.render('admin', { guests });
});

app.listen(PORT, () => {
     console.log(`Server is running at http://localhost:${PORT}`);
});
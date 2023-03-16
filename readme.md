## **Everyday Thoughts**

<br/>

### **App Description**

<br/>

#### **Record everything about your favorite book, all in one place.**

<br/>

Everyday Thoughts is an app that demonstrates 2 data entities including the user, book and embedded data: thoughts.
<br/>
<br/>
To securely store the book information, authorisation and authentication are implemented throughout the app.
<br/>

### **User Stories**

As a user, I get to access my book records by logging in the Everyday Thoughts App.<br/>
As a user, I get to also record my favorite quote, rating and genre and thought about the book. <br/>
As a user, I get to manage (update and delete) the information that I have recorded.<br/>

### **Wireframe**

<br/>

![login page](/public/images/signin.png "Login Page")</br>
![initial plan](/public/images/initialplan.png "Initial Plan")</br>
![thought form](/public/images/thought.png "Thought Form")</br>

### **Model**

<br/>

![model](/public/images/model.png "Model")

### **CRUD**</br></br>

![crud](/public/images/crud_1.png "CRUD")
![crud](/public/images/crud_2.png "CRUD")
![crud](/public/images/crud_3.png "CRUD")

### **Daily Plan**</br></br>

![daily plan](/public/images/dailyplan.png "Daily Plan")

---

## **Screenshots**

### **Books**</br></br>

![book index](/public/images/books.png "Book Index")

### **Update View**</br></br>

![update view](/public/images/updatebook.png "Update Book")

### **Technologies & Tools Used**

1. Node JS
2. Express
3. MongoDB & Mongoose
4. JavaScript
5. EJS
6. bcrypt, Validator
7. Others (nodemon, dotenv, gitignore, method-override, cyclic deployment)
8. Git & GitHub

## **Getting Started**

[Record your Everyday Thoughts Here](https://plain-cuff-links-fly.cyclic.app/)

## **Next Steps**

</br>

### **Future Plan**

1. Additional model entities such as thoughts for journaling purposes.
2. Admin role to manage user database.
   </br>
   </br>

## **Biggest Challenge**

- To manipulate the EJS view between Login & Logout (Favorite EJS View)

```ejs
<% if (isLoggedIn) { %>
<li><a href="/users/logout">LOGOUT</a></li>
<%} else { %>
<li><a href="/users/newaccount">CREATE ACCOUNT</a></li>
<li><a href="/users/login">LOGIN</a></li>
<% } %>
```

```ejs
<%if(quote.author === "Anonymous"){ %>
<p class="dailyquote">"<%=quote.quote%>"</p>%>
<% } else { %>
<p class="dailyquote"><%=quote.author%>: "<%=quote.quote%>"</p>
<%};%>
```

![homepage](/public/images/welcome.png "Homepage")

- Account Creation

```javascript
async function create(req, res, next) {
  try {
    const password = await bcrypt.hash(req.body.password, saltRounds);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password,
    });
    context = {
      isLoggedIn: false,
      msg: "Account Succesfully Created! Login to Begin your Everyday Thoughts!",
    };
    res.status(201).render("users/login", context);
  } catch (error) {
    if (error.code === 11000) {
      context = {
        errormsg: "There's a duplicate, try again?",
        isLoggedIn: false,
      };
      res.render("users/newaccount", context);
    }
    if (error.name === "ValidationError") {
      context = {
        errormsg: "Invalid Details. Try Again?",
        isLoggedIn: false,
      };
      res.render("users/newaccount", context);
    } else {
      return next(error);
    }
  }
}
```

- Sign In

```javascript
async function signIn(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const quote = {
    author: "Eleanor Roosevelt",
    quote: "You must do the thing you think you cannot do.",
  };
  const user = await User.findOne({ email }).exec();
  if (!user) {
    const context = { msg: "User does not exist", isLoggedIn: false };
    res.render("users/login", context);
    return;
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      req.session.userId = user._id;
      req.session.isLoggedIn = true;
      req.session.quote = quote;
      res.render("index", req.session);
    } else {
      const context = { msg: "Incorrect Password", isLoggedIn: false };
      res.render("users/login", context);
    }
  });
}
```

- Authorisation

```javascript
const isAuth = async (req, res, next) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId).exec();
    res.locals.user = user;
    isLoggedIn = true;
    next();
  } else {
    res.status(403).redirect("/users/newaccount");
  }
};
```

- Delete an embedded data

```javascript
async function deleteThought(req, res) {
  try {
    const bookId = req.params.bookId;
    const thoughtId = req.params.thoughtId;
    const book = await Book.findById(bookId);
    const foundThought = book.thoughts.find(
      (thought) => thought._id.toString() === thoughtId
    );
    foundThought.deleteOne(thoughtId);
    await book.save();
    res.redirect(`/books/${bookId}/edit/#thoughts`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}
```
- API

```javascript
function fetchData() {
  return fetch("https://api.goprogram.ai/inspiration").then((res) =>
    res.json()
  );
}

async function homePage(req, res) {
  const quote = await fetchData();
  if (req.session.isLoggedIn) {
    const isLoggedIn = true;
    res.render("index", { quote, isLoggedIn });
  } else {
    const isLoggedIn = false;
    res.render("index", { quote, isLoggedIn });
  }
}
```

## **Key Learnings**

</br>

- Initial planning on CRUD and Model Entity
- Different way of validation: Regex, Schema Validation
- Naming (singular, plural) matters A LOT
- Opening and closing tags, to "/" or not to "/"
- Debugging
- Manipulate data using EJS
- req.params/sessions/body & res.redirect/render/send
- Understanding Documentation on Packages
- The Importance of Authorisation
- Password Hashing
- Error Handling
- MongoDB & Mongoose Synthax
- Async & Await promises
- Managing embedded data as an array: push, deleteOne and save.
- Practice, practice, practice

</br>

## **Q&A**

</br>

---

## **Resources**

</br>

Case studies: <a href="https://journey.cloud">Journey</a> | <a href="https://penzu.com/">Penzu</a><br/>
Wireframe: <a href="https://www.canva.com/templates/EAEe_RcBaOI-soft-and-grey-login-page-wireframe-website-ui-prototype/">Canva</a><br/>
Header and Footer Template: <a href="https://www.w3schools.com/">W3Schools</a><br/>
Social Icons: <a href="https://fontawesome.com/">Font Awesome</a></br>
Quote API: <a href="https://api.goprogram.ai/inspiration/docs/">Inspiration</a>

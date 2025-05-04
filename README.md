# 📸 Instagram Clone (MERN Stack)

A full-stack Instagram-style application built using the **MERN stack**: MongoDB, Express.js, React.js, and Node.js. This project supports features like user authentication, posting images, viewing galleries, and following/unfollowing other users.

---

## 🛠 Tech Stack

| Layer    | Tech Stack                                        |
| -------- | ------------------------------------------------- |
| Frontend | ReactJS, React Router DOM, Materialize CSS, Axios |
| Backend  | Node.js, Express.js                               |
| Database | MongoDB Atlas (via Mongoose)                      |
| Optional | Gradio client (AI chat support), CSS Modules      |

---

## 🗂 Folder Structure

```
Instagram-main/
│
├── Back-End/               # Node + Express API
│   ├── models/             # Mongoose models (User, Post)
│   ├── routes/             # API routes (auth, post, user)
│   ├── app.js              # Main backend entry
│
├── Front-End/              # React frontend
│   ├── src/
│   │   ├── pages/          # All main pages (Profile.js etc.)
│   │   ├── components/     # Reusable UI components
│   │   ├── Profile.css     # Profile page styling
│   └── package.json        # Frontend dependencies
```

---

## ✅ Prerequisites

* Node.js & npm installed
* MongoDB Atlas account
* Internet connection

---

## ⚙️ Backend Setup (Express + MongoDB)

1. Navigate to the backend folder:

```bash
cd Instagram-main/Back-End
```

2. Install backend dependencies:

```bash
npm install
```

3. Update your MongoDB URI in `app.js`:

```js
mongoose.connect("mongodb+srv://<username>:<password>@cluster.mongodb.net/<db-name>?retryWrites=true&w=majority")
```

4. Run the server:

```bash
node app.js
```

You should see:

```
Connected Successfully to DB
Server is running on 5000
```

---

## 🎨 Frontend Setup (React)

1. Navigate to the frontend folder:

```bash
cd ../Front-End
```

2. Install frontend dependencies:

```bash
npm install
```

3. Start the frontend React app:

```bash
npm start
```

The app will run at: `http://localhost:3000`

---

## 🔑 Features

* ✅ User Sign Up / Login (JWT-based authentication)
* 🖼️ Upload and View Posts
* ❤️ Like & 💬 Comment support (optional)
* 👥 Follow/Unfollow users
* 👤 Profile page with gallery view
* 🔍 Modal image zoom when post is clicked
* 🎨 Beautiful responsive UI with Materialize + Custom CSS
* 🤖 Optional Chat Support using Gradio client API

---

## 🧪 Troubleshooting & Common Fixes

| Problem                         | Solution                                                                  |
| ------------------------------- | ------------------------------------------------------------------------- |
| `react-scripts not found`       | Run `npm install` in the `Front-End` folder                               |
| CSS not applying                | Ensure `Profile.css` is in the correct folder and properly imported       |
| MongoDB not connecting          | Double-check your Atlas URI and IP whitelist settings                     |
| Images not clickable            | Ensure `selectedImg` and modal logic is present and working               |
| `Can't resolve './Profile.css'` | Fix the import path: `import '../Profile.css'` if CSS is outside `/pages` |


## 📌 Deployment (Optional)

You can deploy using:

* **Frontend**: [Vercel](https://vercel.com), [Netlify](https://netlify.com)
* **Backend**: [Render](https://render.com), [Railway](https://railway.app), or VPS
* **MongoDB**: Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 🙌 Author & License

Created by **M Ali Awan** for educational purposes.

This project is free to use and modify.

---

## 🚀 Future Enhancements

* [ ] Mobile Responsive Design (Media Queries)
* [ ] Edit Profile / Avatar Upload
* [ ] Notifications / Real-time Updates
* [ ] Dark Mode Toggle

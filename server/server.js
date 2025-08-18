// server/server.js
import app from "./app.js";

// const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, process.env.HOST, () => console.log(`🚀 Server running on http://${process.env.HOST}:${process.env.PORT}/`));


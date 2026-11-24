import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Project from "./models/Project.js";
import Contact from "./models/Contact.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const sampleProjects = [
  { title: "Personal Portfolio", description: "A responsive website to introduce myself and show my work.", tech: ["React", "CSS"] },
  { title: "E-Commerce Catalog", description: "A product catalog with search and category filtering.", tech: ["React", "Node.js", "MongoDB"] },
  { title: "Legal Metrology Checker", description: "A concept for checking packaged-product label compliance.", tech: ["JavaScript", "OCR", "AI"] }
];

app.get("/api/projects", async (_req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects.length ? projects : sampleProjects);
  } catch {
    res.json(sampleProjects);
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ message: "Please complete all fields." });
    }
    const saved = await Contact.create({ name, email, message });
    res.status(201).json({ message: "Message saved successfully.", id: saved._id });
  } catch {
    res.status(500).json({ message: "Could not save message. Check MongoDB connection." });
  }
});

const PORT = process.env.PORT || 5000;
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err.message));
}
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));

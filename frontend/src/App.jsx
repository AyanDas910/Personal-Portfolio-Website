import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios.get(`${API}/projects`)
      .then(res => setProjects(res.data))
      .catch(() => setProjects([
        { title: "Personal Portfolio", description: "A responsive website to introduce myself and show my work.", tech: ["React", "CSS"] },
        { title: "E-Commerce Catalog", description: "A product catalog with search and category filtering.", tech: ["React", "Node.js", "MongoDB"] },
        { title: "Legal Metrology Checker", description: "A concept for checking packaged-product label compliance.", tech: ["JavaScript", "OCR", "AI"] }
      ]));
  }, []);

  const update = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async e => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await axios.post(`${API}/contact`, form);
      setStatus(res.data.message);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("Unable to send. Make sure backend and MongoDB are running.");
    }
  };

  return <div>
    <header className="nav"><a className="logo" href="#home">AD.</a><nav><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav></header>
    <main>
      <section className="hero" id="home">
        <div><p className="eyebrow">HELLO, I'M</p><h1>Ayan Das<span>.</span></h1><h2>Beginner MERN Stack Developer</h2>
          <p className="intro">I build clean, responsive web experiences and enjoy turning ideas into useful applications.</p>
          <a className="primary" href="#projects">Explore my work</a>
        </div><div className="hero-card"><div className="avatar">AD</div><p>React · Node.js · Express · MongoDB</p></div>
      </section>
      <section id="about"><p className="eyebrow">GET TO KNOW ME</p><h2>About Me</h2><p className="section-copy">I am a BCA student learning full-stack web development. I enjoy building practical projects, improving my problem-solving skills, and learning modern technologies.</p></section>
      <section id="skills"><p className="eyebrow">WHAT I WORK WITH</p><h2>My Skills</h2><div className="skills">{["HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js", "MongoDB", "Git & GitHub"].map(skill => <span key={skill}>{skill}</span>)}</div></section>
      <section id="projects"><p className="eyebrow">SOME OF MY WORK</p><h2>Featured Projects</h2><div className="project-grid">{projects.map((p, i) => <article className="project" key={p._id || p.title}><div className="project-number">0{i + 1}</div><h3>{p.title}</h3><p>{p.description}</p><div className="tags">{(p.tech || []).map(t => <span key={t}>{t}</span>)}</div></article>)}</div></section>
      <section id="contact"><p className="eyebrow">LET'S CONNECT</p><h2>Contact Me</h2><div className="contact-layout"><p className="section-copy">Have a project idea or opportunity? Send me a message.</p><form onSubmit={submit}><input name="name" placeholder="Your name" value={form.name} onChange={update} required /><input name="email" type="email" placeholder="Your email" value={form.email} onChange={update} required /><textarea name="message" placeholder="Your message" rows="5" value={form.message} onChange={update} required /><button className="primary">Send message</button>{status && <small>{status}</small>}</form></div></section>
    </main>
    <footer>© {new Date().getFullYear()} Ayan Das. Built with the MERN stack.</footer>
  </div>;
}

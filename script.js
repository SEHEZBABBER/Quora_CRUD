const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
let posts = [
    {
      id: uuidv4(),
      title: "What are some must-know DSA concepts for coding interviews?",
      content: "I have an upcoming coding interview and want to focus on the most important DSA topics. Any recommendations?",
      author: "John Doe",
      upvotes: 120,
      tags: ["DSA", "Coding Interviews", "Algorithms"],
      comments: 15,
    },
    {
      id: uuidv4(),
      title: "How does WebRTC work for building a video calling app?",
      content: "I'm trying to build a Zoom-like app using WebRTC. Can someone explain how it works?",
      author: "Alice Smith",
      upvotes: 95,
      tags: ["WebRTC", "Video Call", "SFU"],
      comments: 8,
    },
    {
      id: uuidv4(),
      title: "What are the best AI-powered tools for meeting summarization?",
      content: "Looking for AI-based tools that can generate meeting summaries and action items automatically.",
      author: "Michael Brown",
      upvotes: 110,
      tags: ["AI", "Meeting Summarization", "Productivity"],
      comments: 12,
    },
    {
      id: uuidv4(),
      title: "Which MERN stack project is best for showcasing AI integration?",
      content: "I want to build a MERN project that integrates AI in a unique way. Any ideas?",
      author: "Emily White",
      upvotes: 75,
      tags: ["MERN Stack", "AI", "Projects"],
      comments: 6,
    },
    {
      id: uuidv4(),
      title: "What are the most effective workout splits for muscle gain?",
      content: "I'm confused between Push-Pull-Legs and Bro Split. Which one is more effective for hypertrophy?",
      author: "David Johnson",
      upvotes: 130,
      tags: ["Fitness", "Workout Plans", "Bodybuilding"],
      comments: 20,
    },
    {
      id: uuidv4(),
      title: "What are the key differences between SFU and MCU in WebRTC?",
      content: "Which one is better for scalability when building a video conferencing app?",
      author: "Sophia Lee",
      upvotes: 85,
      tags: ["WebRTC", "SFU", "MCU"],
      comments: 10,
    },
    {
      id: uuidv4(),
      title: "How does OpenAI Whisper perform compared to other speech recognition models?",
      content: "I'm considering using OpenAI Whisper for transcription. How does it compare to other models?",
      author: "Chris Evans",
      upvotes: 92,
      tags: ["AI", "Speech Recognition", "OpenAI Whisper"],
      comments: 14,
    },
    {
      id: uuidv4(),
      title: "What is the best way to structure a dataset for workout plans?",
      content: "I want to create a static dataset for different workout splits. How should I structure it?",
      author: "Anna Kim",
      upvotes: 77,
      tags: ["Fitness", "Data Structures", "Workout Plans"],
      comments: 9,
    },
    {
      id: uuidv4(),
      title: "How to optimize JavaScript code for better performance?",
      content: "Are there any key techniques or patterns to optimize JavaScript execution?",
      author: "Robert Wilson",
      upvotes: 88,
      tags: ["JavaScript", "Performance", "Web Development"],
      comments: 7,
    },
    {
      id: uuidv4(),
      title: "What are the best resources to learn Striver’s A-Z DSA sheet?",
      content: "I've started studying Striver’s DSA sheet. What are the best ways to go through it efficiently?",
      author: "Olivia Martinez",
      upvotes: 102,
      tags: ["DSA", "Striver’s Sheet", "Coding"],
      comments: 18,
    }
  ];
  app.use(express.urlencoded(true));
  app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride('_method'));
app.listen(8080,()=>{
    console.log("Listening through port 8080");
});
app.get('/posts',(req,res)=>{
    res.render('index',{posts});
});
app.get('/create',(req,res)=>{
    res.render('create');
});
app.post('/posts',(req,res)=>{
    let obj = req.body;
    obj.id = uuidv4();
    obj.upvotes = 0;
    let arr = [];
    let str = "";
    for(let i = 0;i<obj.tags.length;i++){
        if(obj.tags[i] == ','){
            arr.push(str);
            str = "";
        }
        else{
            str+=obj.tags[i];
        }
    }
    obj.tags = arr;
    obj.comments = 0;
    posts.push(obj);
    res.render('index',{posts});
});
app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;
    console.log(id);
    
    posts = posts.filter(post => post.id != id);

    res.redirect('/posts');
});
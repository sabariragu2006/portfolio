import { useState, useEffect } from "react";

/*
  Single source of truth for ProjectsShowcase and IndividualProjectPage.

  category : "live" | "desktop" | "github"
  link     : live website (or download page)
  repo     : GitHub repository
  images   : screenshots, files in /public/projects/  e.g. "/projects/billing-1.png"
  videos   : { title, youtube: "VIDEO_ID" }  or  { title, src: "/projects/demo.mp4", poster?: "/projects/poster.png" }
  overview : paragraphs for the detailed explanation
  learnings: { title, text } key takeaways
  The text below is a starting draft. Edit it so it matches what you actually built.
*/
// Screenshots live in /public/<folder>/screenshot-1.png ... screenshot-N.png
const shots = (folder, n) => Array.from({ length: n }, (_, i) => `/${folder}/screenshot-${i + 1}.png`);

export const PROJECTS = [
  {
    id: "maadala",
    title: "Maadala",
    category: "live",
    tag: "Live Web App",
    role: "Design and development",
    summary:
      "A portfolio tracking website where you record your assets and liabilities and watch how they grow over time.",
    overview: [
      "Maadala helps a person see their whole financial picture in one place. You add what you own (assets) and what you owe (liabilities), and the site turns those entries into charts that show where you stand today and how that has changed.",
      "The main idea is history. Instead of showing only today's totals, Maadala keeps snapshots so you can see your net worth rising or falling over time, and how your mix of assets shifts as you invest in different things.",
    ],
    features: [
      "Track assets and liabilities in one place",
      "Asset allocation as a pie chart",
      "Net worth history over time",
      "Allocation changes over time",
    ],
    tech: [], // add your stack, e.g. ["React", "Vite", "Charts"]
    link: "https://maadalla.netlify.app/",
    repo: "",
    images: [],
    videos: [],
    learnings: [
      { title: "Designing data for charts", text: "Storing dated snapshots instead of only current values is what makes history charts possible. The data shape has to be planned before the charts." },
      { title: "Making numbers readable", text: "Finance data gets confusing fast. Clear labels, sensible colours and a few focused charts work better than showing everything." },
      { title: "Shipping early on Netlify", text: "Deploying from the start made it easy to share the site and test it on real devices." },
    ],
  },
  {
    id: "baby-tech",
    title: "Baby Tech",
    category: "live",
    tag: "Live Landing Page",
    role: "Design and development",
    summary: "The download landing page for Vidhagam, my desktop application.",
    overview: [
      "Baby Tech is the public face of my desktop software. Its main job is simple: explain what Vidhagam does and let visitors download it quickly.",
      "The page is kept light and fast so the download button is the first thing people reach, on any device.",
    ],
    features: ["Download page for Vidhagam", "Clear call to action", "Fast static hosting on Netlify"],
    tech: [], // add your stack
    link: "https://baby-tech.netlify.app/",
    repo: "",
    images: [],
    videos: [],
    learnings: [
      { title: "A landing page has one job", text: "Every section should push the visitor toward the download. Extra content only gets in the way." },
      { title: "Distribution matters", text: "Good software still needs a trustworthy place to download it from. Building the page taught me how users judge an installer before they run it." },
    ],
  },
  {
    id: "rs",
    title: "RS Infotech",
    category: "live",
    tag: "Live Website",
    role: "Design, development and local SEO",
    summary:
      "A business website for a security systems company, built with local SEO in mind and live on its own domain.",
    overview: [
      "RS Infotech is a security systems business in Kanchipuram. The website presents their services clearly and makes it easy for local customers to find and contact them.",
      "Beyond the design, I worked on local SEO so the business shows up when nearby people search for security services.",
    ],
    features: ["Services and contact pages", "Local SEO setup", "Responsive on every device", "Hosted on a custom domain"],
    tech: ["React", "Bootstrap", "Netlify"],
    link: "https://rsinfotech.in/",
    repo: "",
    images: [],
    videos: [],
    learnings: [
      { title: "Client work is about their customers", text: "The site has to answer what a nervous first-time buyer wants to know, not what the developer finds interesting." },
      { title: "Local SEO basics", text: "Consistent business details, proper page titles and descriptions, and a clear service area make a real difference for small local businesses." },
      { title: "Working with a real domain", text: "Connecting a custom domain, HTTPS and redirects on Netlify is a practical skill that every client project needs." },
    ],
  },
  {
    id: "vidhagam",
    title: "Vidhagam",
    category: "desktop",
    tag: "Desktop App",
    role: "Design and development",
    summary:
      "A Windows desktop SQLite manager built with WPF and .NET 8, with Gemini AI built in. Download it from the Baby Tech landing page.",
    overview: [
      "Vidhagam is a desktop tool for working with SQLite databases. It lets you open a database, browse its tables and manage data through a native Windows interface instead of command-line tools.",
      "It also includes Gemini AI integration, so you can get help with your data and queries from inside the app. The app is packaged with an installer so anyone can set it up in a few clicks.",
    ],
    features: [
      "Native WPF desktop interface",
      "Browse and manage SQLite databases",
      "Gemini AI integration",
      "Windows installer for easy setup",
    ],
    tech: ["C#", ".NET 8", "WPF", "SQLite", "Gemini AI", "Inno Setup"],
    link: "https://baby-tech.netlify.app/",
    linkLabel: "Download page",
    repo: "",
    images: shots("vidhagam", 9),
    videos: [], // e.g. [{ title: "Quick tour", youtube: "VIDEO_ID" }]
    learnings: [
      { title: "Shipping a real desktop installer", text: "Packaging with Inno Setup taught me about install paths, shortcuts, upgrades and what users expect from Windows software." },
      { title: "Integrating an AI API", text: "Calling an external AI service means handling keys, slow responses and errors gracefully so the app never feels stuck." },
      { title: "WPF structure at scale", text: "Keeping UI, data access and logic separate makes a growing WPF app much easier to change." },
    ],
  },
  {
    id: "thugil",
    title: "Thugil",
    category: "desktop",
    tag: "Billing System",
    role: "Design and development",
    summary:
      "Thugil is a standalone billing and shop management system, first built for Sairam Sweets textile shop. It runs fully offline and produces professional PDF bills.",
    overview: [
      "Thugil is a complete billing system for a shop counter. Staff can create bills, manage items and keep records, all without needing an internet connection.",
      "Bills are generated as clean, professional PDFs that can be printed or shared. The software is private, so there is no public link, but the screenshots show how it looks and works.",
    ],
    features: ["Billing and invoicing", "Shop and stock management", "Professional PDF generation", "Works offline"],
    tech: ["C#", "WPF", "QuestPDF", "SkiaSharp"],
    link: "",
    repo: "",
    images: shots("thugil", 9),
    videos: [],
    learnings: [
      { title: "Software for non-technical users", text: "Shop staff need big, obvious buttons and fewer steps. Watching real people use the app changed many of my design choices." },
      { title: "PDF generation", text: "Laying out bills with QuestPDF and SkiaSharp showed me how much detail goes into a print-ready document." },
      { title: "Reliability first", text: "A billing tool cannot lose data. Offline storage and careful saving mattered more than extra features." },
    ],
  },
  {
    id: "pugali",
    title: "Pugali",
    category: "github",
    tag: "Open Source",
    role: "Full-stack development",
    summary:
      "A hostel management system for handling rooms, residents and records, built on the classic PHP and MySQL stack and run locally with XAMPP.",
    overview: [
      "Pugali is a web-based hostel management system. It keeps hostel information such as rooms and residents in a MySQL database and presents it through simple PHP pages.",
      "It runs locally on XAMPP, which makes it easy to set up on a normal computer. The full source code is on GitHub.",
    ],
    features: ["Hostel and resident management", "PHP backend with MySQL database", "Runs locally on XAMPP"],
    tech: ["PHP", "HTML", "MySQL", "XAMPP"],
    link: "",
    repo: "https://github.com/112334051/php-hostel",
    images: [],
    videos: [],
    learnings: [
      { title: "Relational database design", text: "Planning tables and relationships for rooms and residents up front avoided messy data later." },
      { title: "How PHP and MySQL work together", text: "Building forms, queries and sessions by hand gave me a clear view of what frameworks do for you." },
      { title: "Local server setup", text: "Using XAMPP showed me how Apache, PHP and MySQL fit together on one machine." },
    ],
  },
  {
    id: "meipaadu",
    title: "Meipaadu",
    category: "github",
    tag: "Open Source",
    role: "Full-stack development",
    summary:
      "A face recognition application built with Python and Flask. Faces are encoded and stored with pickle, and recognition runs through prebuilt wheels.",
    overview: [
      "Meipaadu recognises people from their faces. It encodes each known face into numbers, saves those encodings with pickle, and compares new faces against them.",
      "A Flask web interface wraps the recognition code, and prebuilt wheels make the heavy dependencies easy to install. The code is open on GitHub.",
    ],
    features: ["Face detection and recognition", "Flask web interface", "Encodings saved with pickle"],
    tech: ["Python", "Flask", "Wheels", "Pickle"],
    link: "",
    repo: "https://github.com/sabariragu2006/Face-recognition",
    images: [],
    videos: [],
    learnings: [
      { title: "Machine learning in a real app", text: "Turning a recognition library into a usable web tool means handling uploads, lighting and bad inputs." },
      { title: "Dependency pain and wheels", text: "Face recognition libraries are hard to build. Using prebuilt wheels made setup reliable on different machines." },
      { title: "Storing and loading models", text: "Pickle is quick for saving encodings, but I learned its limits around security and compatibility." },
    ],
  },
];

export const getProject = (id) => PROJECTS.find((p) => p.id === id);

// Returns only the images that actually load, so missing screenshot files never show as broken images.
export function useLoadedImages(list) {
  const key = list.join("|");
  const [ok, setOk] = useState([]);
  useEffect(() => {
    let alive = true;
    setOk([]);
    Promise.all(
      list.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = () => resolve(null);
            img.src = src;
          })
      )
    ).then((r) => alive && setOk(r.filter(Boolean)));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return ok;
}
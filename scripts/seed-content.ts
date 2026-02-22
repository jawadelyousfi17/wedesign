import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userId = '7e596165-914f-4075-9739-a7580a32455a' // The specific user ID provided

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface Problem {
  title: string;
  objective: string;
  duration: number; // minutes
  rewardXP: number;
  // Legacy combined fields (kept for backwards-compat)
  starterCode: string;
  solution: string;
  // Split fields (mirrors Prisma schema)
  starterCodeHtml: string | null;
  starterCodeCss:  string | null;
  starterCodeJs:   string | null;
  solutionHtml:    string | null;
  solutionCss:     string | null;
  solutionJs:      string | null;
  testCases: string;
}

export interface Challenge {
  title: string;
  description: string;
  order: number;
  problem: Problem;
  skills: string[];
}

export interface Module {
  moduleNumber: number;
  title: string;
  description: string;
  order: number;
  challenges: Challenge[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

export const modulesData: Module[] = [

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE 1 — HTML Fundamentals
  // ══════════════════════════════════════════════════════════════════════════
  {
    moduleNumber: 1,
    title: "HTML Fundamentals",
    description: "Learn the basics of HTML5 structure, semantic tags, and document organisation.",
    order: 1,
    challenges: [
      {
        title: "Building Your First Page",
        description: "Create a simple webpage structure with a heading and paragraph.",
        order: 1,
        problem: {
          title: "HTML Structure",
          objective: "Create a valid HTML5 document with an h1 and a p tag.",
          duration: 15,
          rewardXP: 50,
          starterCode: `<!DOCTYPE html>\n<html>\n<body>\n\n</body>\n</html>`,
          solution: `<!DOCTYPE html>\n<html>\n<body>\n<h1>Hello World</h1>\n<p>This is a paragraph.</p>\n</body>\n</html>`,
          starterCodeHtml: `<!DOCTYPE html>\n<html>\n<body>\n  <!-- Write your content here -->\n</body>\n</html>`,
          starterCodeCss:  null,
          starterCodeJs:   null,
          solutionHtml: `<!DOCTYPE html>\n<html>\n<body>\n  <h1>Hello World</h1>\n  <p>This is a paragraph.</p>\n</body>\n</html>`,
          solutionCss:  null,
          solutionJs:   null,
          testCases: `assert(document.querySelector("h1"), "Must have an h1 tag");\nassert(document.querySelector("p"), "Must have a p tag");`,
        },
        skills: ["HTML5", "Semantic HTML"],
      },
      {
        title: "Headings Hierarchy",
        description: "Use h1–h3 to create a proper document outline.",
        order: 2,
        problem: {
          title: "Headings",
          objective: "Create a page with h1, h2, and h3 tags in hierarchical order.",
          duration: 15,
          rewardXP: 60,
          starterCode: `<!-- Add your headings here -->`,
          solution: `<h1>Main Title</h1>\n<h2>Section Title</h2>\n<h3>Sub-section Title</h3>`,
          starterCodeHtml: `<!-- Add your h1, h2, and h3 here -->`,
          starterCodeCss:  null,
          starterCodeJs:   null,
          solutionHtml: `<h1>Main Title</h1>\n<h2>Section Title</h2>\n<h3>Sub-section Title</h3>`,
          solutionCss:  null,
          solutionJs:   null,
          testCases: `assert(document.querySelector("h1"), "Must have an h1 tag");\nassert(document.querySelector("h2"), "Must have an h2 tag");\nassert(document.querySelector("h3"), "Must have an h3 tag");`,
        },
        skills: ["HTML5", "Semantic HTML", "Accessibility"],
      },
      {
        title: "Links and Images",
        description: "Add anchor tags and images with proper attributes.",
        order: 3,
        problem: {
          title: "Adding Assets",
          objective: "Add an anchor tag with href and an image tag with src and alt attributes.",
          duration: 20,
          rewardXP: 75,
          starterCode: `<!-- Add your link and image here -->`,
          solution: `<a href="https://example.com">Visit Example</a>\n<img src="image.jpg" alt="A descriptive alt text" />`,
          starterCodeHtml: `<!-- Add an <a> and an <img> here -->`,
          starterCodeCss:  null,
          starterCodeJs:   null,
          solutionHtml: `<a href="https://example.com">Visit Example</a>\n<img src="image.jpg" alt="A descriptive alt text" />`,
          solutionCss:  null,
          solutionJs:   null,
          testCases: `assert(document.querySelector("a"), "Must have an <a> tag");\nassert(document.querySelector("a").href, "Anchor must have an href attribute");\nassert(document.querySelector("img"), "Must have an <img> tag");\nassert(document.querySelector("img").alt, "Image must have an alt attribute");`,
        },
        skills: ["HTML5", "Links", "Images"],
      },
      {
        title: "Ordered and Unordered Lists",
        description: "Display collections of items with list elements.",
        order: 4,
        problem: {
          title: "Lists",
          objective: "Create a ul with 3 items and an ol with 3 items.",
          duration: 20,
          rewardXP: 70,
          starterCode: `<!-- Add your lists here -->`,
          solution: `<ul>\n  <li>Apple</li>\n  <li>Banana</li>\n  <li>Cherry</li>\n</ul>\n<ol>\n  <li>First step</li>\n  <li>Second step</li>\n  <li>Third step</li>\n</ol>`,
          starterCodeHtml: `<!-- Add a <ul> and an <ol> each with 3 <li> items -->`,
          starterCodeCss:  null,
          starterCodeJs:   null,
          solutionHtml: `<ul>\n  <li>Apple</li>\n  <li>Banana</li>\n  <li>Cherry</li>\n</ul>\n<ol>\n  <li>First step</li>\n  <li>Second step</li>\n  <li>Third step</li>\n</ol>`,
          solutionCss:  null,
          solutionJs:   null,
          testCases: `assert(document.querySelector("ul"), "Must have a <ul> tag");\nassert(document.querySelector("ol"), "Must have an <ol> tag");\nassert(document.querySelectorAll("ul li").length >= 3, "ul must have at least 3 items");\nassert(document.querySelectorAll("ol li").length >= 3, "ol must have at least 3 items");`,
        },
        skills: ["HTML5", "Lists"],
      },
      {
        title: "Forms and Inputs",
        description: "Build interactive forms using HTML form elements.",
        order: 5,
        problem: {
          title: "Contact Form",
          objective: "Create a form with a text input, email input, textarea, and a submit button.",
          duration: 25,
          rewardXP: 100,
          starterCode: `<form>\n  <!-- Add your inputs here -->\n</form>`,
          solution: `<form>\n  <input type="text" name="name" placeholder="Your name" />\n  <input type="email" name="email" placeholder="Your email" />\n  <textarea name="message" placeholder="Your message"></textarea>\n  <button type="submit">Send</button>\n</form>`,
          starterCodeHtml: `<form>\n  <!-- Add text input, email input, textarea, and submit button -->\n</form>`,
          starterCodeCss:  null,
          starterCodeJs:   null,
          solutionHtml: `<form>\n  <input type="text" name="name" placeholder="Your name" />\n  <input type="email" name="email" placeholder="Your email" />\n  <textarea name="message" placeholder="Your message"></textarea>\n  <button type="submit">Send</button>\n</form>`,
          solutionCss:  null,
          solutionJs:   null,
          testCases: `assert(document.querySelector('input[type="text"]'), "Must have a text input");\nassert(document.querySelector('input[type="email"]'), "Must have an email input");\nassert(document.querySelector("textarea"), "Must have a textarea");\nassert(document.querySelector('button[type="submit"]'), "Must have a submit button");`,
        },
        skills: ["HTML5", "Forms", "Inputs"],
      },
      {
        title: "Tables",
        description: "Display tabular data using thead, tbody, and td elements.",
        order: 6,
        problem: {
          title: "Data Table",
          objective: "Create a table with a thead header row and at least two tbody data rows.",
          duration: 20,
          rewardXP: 90,
          starterCode: `<table>\n  <!-- Add your rows here -->\n</table>`,
          solution: `<table>\n  <thead>\n    <tr><th>Name</th><th>Age</th><th>City</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Alice</td><td>30</td><td>New York</td></tr>\n    <tr><td>Bob</td><td>25</td><td>London</td></tr>\n  </tbody>\n</table>`,
          starterCodeHtml: `<table>\n  <thead>\n    <!-- Add header row here -->\n  </thead>\n  <tbody>\n    <!-- Add at least 2 data rows here -->\n  </tbody>\n</table>`,
          starterCodeCss:  null,
          starterCodeJs:   null,
          solutionHtml: `<table>\n  <thead>\n    <tr><th>Name</th><th>Age</th><th>City</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Alice</td><td>30</td><td>New York</td></tr>\n    <tr><td>Bob</td><td>25</td><td>London</td></tr>\n  </tbody>\n</table>`,
          solutionCss:  null,
          solutionJs:   null,
          testCases: `assert(document.querySelector("table"), "Must have a <table>");\nassert(document.querySelector("thead"), "Must have a <thead>");\nassert(document.querySelector("tbody"), "Must have a <tbody>");\nassert(document.querySelectorAll("th").length >= 2, "Must have at least 2 th elements");\nassert(document.querySelectorAll("tbody tr").length >= 2, "Must have at least 2 data rows");`,
        },
        skills: ["HTML5", "Tables"],
      },
      {
        title: "Semantic Layout",
        description: "Structure a webpage using semantic HTML5 sectioning elements.",
        order: 7,
        problem: {
          title: "Semantic Page",
          objective: "Build a page using header, nav, main, article, aside, and footer.",
          duration: 30,
          rewardXP: 120,
          starterCode: `<!-- Build your semantic layout here -->`,
          solution: `<header><h1>My Site</h1></header>\n<nav><a href="#">Home</a> <a href="#">About</a></nav>\n<main>\n  <article><h2>Post Title</h2><p>Article content.</p></article>\n  <aside><p>Related links</p></aside>\n</main>\n<footer><p>&copy; 2024 My Site</p></footer>`,
          starterCodeHtml: `<!-- Use <header>, <nav>, <main>, <article>, <aside>, <footer> -->`,
          starterCodeCss:  null,
          starterCodeJs:   null,
          solutionHtml: `<header><h1>My Site</h1></header>\n<nav><a href="#">Home</a> <a href="#">About</a></nav>\n<main>\n  <article><h2>Post Title</h2><p>Article content.</p></article>\n  <aside><p>Related links</p></aside>\n</main>\n<footer><p>&copy; 2024 My Site</p></footer>`,
          solutionCss:  null,
          solutionJs:   null,
          testCases: `assert(document.querySelector("header"), "Must have a <header>");\nassert(document.querySelector("nav"), "Must have a <nav>");\nassert(document.querySelector("main"), "Must have a <main>");\nassert(document.querySelector("article"), "Must have an <article>");\nassert(document.querySelector("aside"), "Must have an <aside>");\nassert(document.querySelector("footer"), "Must have a <footer>");`,
        },
        skills: ["HTML5", "Semantic HTML", "Layout"],
      },
      {
        title: "Meta Tags and Head",
        description: "Configure your document head with charset, viewport, and description meta tags.",
        order: 8,
        problem: {
          title: "Document Head",
          objective: "Add a title, charset meta, viewport meta, and description meta inside the head.",
          duration: 20,
          rewardXP: 80,
          starterCode: `<!DOCTYPE html>\n<html>\n<head>\n  <!-- Add your meta tags here -->\n</head>\n<body></body>\n</html>`,
          solution: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <meta name="description" content="A sample webpage." />\n  <title>My Page</title>\n</head>\n<body></body>\n</html>`,
          starterCodeHtml: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <!-- Add charset, viewport, description meta tags and a <title> -->\n</head>\n<body></body>\n</html>`,
          starterCodeCss:  null,
          starterCodeJs:   null,
          solutionHtml: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <meta name="description" content="A sample webpage." />\n  <title>My Page</title>\n</head>\n<body></body>\n</html>`,
          solutionCss:  null,
          solutionJs:   null,
          testCases: `assert(document.querySelector('meta[charset]'), "Must have a charset meta tag");\nassert(document.querySelector('meta[name="viewport"]'), "Must have a viewport meta tag");\nassert(document.querySelector('meta[name="description"]'), "Must have a description meta tag");\nassert(document.title, "Must have a non-empty title");`,
        },
        skills: ["HTML5", "SEO", "Meta Tags"],
      },
      {
        title: "Div and Span",
        description: "Use generic container elements to group and inline-style content.",
        order: 9,
        problem: {
          title: "Containers",
          objective: "Wrap a heading and paragraph inside a div, and highlight a single word using span.",
          duration: 15,
          rewardXP: 65,
          starterCode: `<!-- Use div and span here -->`,
          solution: `<div class="card">\n  <h2>Card Title</h2>\n  <p>This is a <span class="highlight">highlighted</span> word.</p>\n</div>`,
          starterCodeHtml: `<!-- Wrap content in a <div> and use a <span> inside a paragraph -->`,
          starterCodeCss:  null,
          starterCodeJs:   null,
          solutionHtml: `<div class="card">\n  <h2>Card Title</h2>\n  <p>This is a <span class="highlight">highlighted</span> word.</p>\n</div>`,
          solutionCss:  null,
          solutionJs:   null,
          testCases: `assert(document.querySelector("div"), "Must have a <div>");\nassert(document.querySelector("span"), "Must have a <span>");\nassert(document.querySelector("div h2") || document.querySelector("div h1"), "div must contain a heading");\nassert(document.querySelector("div p"), "div must contain a paragraph");`,
        },
        skills: ["HTML5", "Layout", "Grouping"],
      },
      {
        title: "Audio and Video",
        description: "Embed media elements directly into your webpage.",
        order: 10,
        problem: {
          title: "Embedded Media",
          objective: "Embed an audio element with controls and a video element with controls and a poster attribute.",
          duration: 25,
          rewardXP: 110,
          starterCode: `<!-- Add media elements here -->`,
          solution: `<audio controls>\n  <source src="audio.mp3" type="audio/mpeg" />\n  Your browser does not support audio.\n</audio>\n<video controls poster="thumbnail.jpg" width="640">\n  <source src="video.mp4" type="video/mp4" />\n  Your browser does not support video.\n</video>`,
          starterCodeHtml: `<!-- Add an <audio controls> and a <video controls poster="..."> element here -->`,
          starterCodeCss:  null,
          starterCodeJs:   null,
          solutionHtml: `<audio controls>\n  <source src="audio.mp3" type="audio/mpeg" />\n  Your browser does not support audio.\n</audio>\n<video controls poster="thumbnail.jpg" width="640">\n  <source src="video.mp4" type="video/mp4" />\n  Your browser does not support video.\n</video>`,
          solutionCss:  null,
          solutionJs:   null,
          testCases: `assert(document.querySelector("audio"), "Must have an <audio> element");\nassert(document.querySelector("audio[controls]"), "Audio must have controls");\nassert(document.querySelector("video"), "Must have a <video> element");\nassert(document.querySelector("video[controls]"), "Video must have controls");\nassert(document.querySelector("video[poster]"), "Video must have a poster attribute");`,
        },
        skills: ["HTML5", "Media", "Audio", "Video"],
      },
      {
        title: "Input Types",
        description: "Explore different HTML input types for richer forms.",
        order: 11,
        problem: {
          title: "Diverse Inputs",
          objective: "Create a form containing number, date, checkbox, radio, and range inputs.",
          duration: 25,
          rewardXP: 105,
          starterCode: `<form>\n  <!-- Add your varied inputs here -->\n</form>`,
          solution: `<form>\n  <input type="number" name="qty" min="1" max="100" />\n  <input type="date" name="dob" />\n  <input type="checkbox" name="agree" id="agree" />\n  <label for="agree">I agree</label>\n  <input type="radio" name="gender" value="male" /> Male\n  <input type="radio" name="gender" value="female" /> Female\n  <input type="range" name="volume" min="0" max="100" />\n</form>`,
          starterCodeHtml: `<form>\n  <!-- Add number, date, checkbox, radio, and range inputs -->\n</form>`,
          starterCodeCss:  null,
          starterCodeJs:   null,
          solutionHtml: `<form>\n  <input type="number" name="qty" min="1" max="100" />\n  <input type="date" name="dob" />\n  <input type="checkbox" name="agree" id="agree" />\n  <label for="agree">I agree</label>\n  <input type="radio" name="gender" value="male" /> Male\n  <input type="radio" name="gender" value="female" /> Female\n  <input type="range" name="volume" min="0" max="100" />\n</form>`,
          solutionCss:  null,
          solutionJs:   null,
          testCases: `assert(document.querySelector('input[type="number"]'), "Must have a number input");\nassert(document.querySelector('input[type="date"]'), "Must have a date input");\nassert(document.querySelector('input[type="checkbox"]'), "Must have a checkbox");\nassert(document.querySelector('input[type="radio"]'), "Must have a radio input");\nassert(document.querySelector('input[type="range"]'), "Must have a range input");`,
        },
        skills: ["HTML5", "Forms", "Input Types"],
      },
      {
        title: "Accessibility Basics",
        description: "Make your HTML accessible with labels, alt text, and ARIA roles.",
        order: 12,
        problem: {
          title: "ARIA and Labels",
          objective: "Add a label linked to an input, an alt attribute to an image, and role='navigation' to a nav.",
          duration: 25,
          rewardXP: 115,
          starterCode: `<!-- Add accessible markup here -->`,
          solution: `<label for="username">Username</label>\n<input type="text" id="username" name="username" />\n<img src="logo.png" alt="Company logo" />\n<nav role="navigation">\n  <a href="#">Home</a>\n</nav>`,
          starterCodeHtml: `<!-- Add a <label for="...">, an <img alt="...">, and a <nav role="navigation"> -->`,
          starterCodeCss:  null,
          starterCodeJs:   null,
          solutionHtml: `<label for="username">Username</label>\n<input type="text" id="username" name="username" />\n<img src="logo.png" alt="Company logo" />\n<nav role="navigation">\n  <a href="#">Home</a>\n</nav>`,
          solutionCss:  null,
          solutionJs:   null,
          testCases: `assert(document.querySelector("label[for]"), "Must have a label with a for attribute");\nassert(document.querySelector("img[alt]"), "Image must have an alt attribute");\nassert(document.querySelector('[role="navigation"]'), "Must have role=navigation");`,
        },
        skills: ["HTML5", "Accessibility", "ARIA"],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE 2 — CSS Styling
  // ══════════════════════════════════════════════════════════════════════════
  {
    moduleNumber: 2,
    title: "CSS Styling",
    description: "Style your HTML with CSS — from fundamentals to modern layout techniques.",
    order: 2,
    challenges: [
      {
        title: "Colors and Fonts",
        description: "Change text color and font family using CSS.",
        order: 1,
        problem: {
          title: "Basic Styling",
          objective: "Make the h1 red and set its font-family to sans-serif.",
          duration: 20,
          rewardXP: 60,
          starterCode: `h1 {\n  /* Your CSS here */\n}`,
          solution: `h1 {\n  color: red;\n  font-family: sans-serif;\n}`,
          starterCodeHtml: `<h1>Hello World</h1>`,
          starterCodeCss:  `h1 {\n  /* Add color and font-family */\n}`,
          starterCodeJs:   null,
          solutionHtml: `<h1>Hello World</h1>`,
          solutionCss:  `h1 {\n  color: red;\n  font-family: sans-serif;\n}`,
          solutionJs:   null,
          testCases: `const s = window.getComputedStyle(document.querySelector("h1"));\nassert(s.color === "rgb(255, 0, 0)", "h1 must be red");\nassert(s.fontFamily.toLowerCase().includes("sans-serif"), "h1 must use sans-serif");`,
        },
        skills: ["CSS", "Colors", "Typography"],
      },
      {
        title: "The Box Model",
        description: "Understand and apply margin, border, and padding.",
        order: 2,
        problem: {
          title: "Box Model",
          objective: "Give .box a 2px solid border, 20px padding, and 30px margin.",
          duration: 20,
          rewardXP: 80,
          starterCode: `.box {\n  /* Your CSS here */\n}`,
          solution: `.box {\n  border: 2px solid #333;\n  padding: 20px;\n  margin: 30px;\n}`,
          starterCodeHtml: `<div class="box">I am a box</div>`,
          starterCodeCss:  `.box {\n  /* Add border, padding, and margin */\n}`,
          starterCodeJs:   null,
          solutionHtml: `<div class="box">I am a box</div>`,
          solutionCss:  `.box {\n  border: 2px solid #333;\n  padding: 20px;\n  margin: 30px;\n}`,
          solutionJs:   null,
          testCases: `const s = window.getComputedStyle(document.querySelector(".box"));\nassert(s.paddingTop === "20px", "Must have 20px padding");\nassert(s.marginTop === "30px", "Must have 30px margin");\nassert(s.borderTopWidth === "2px", "Must have 2px border");`,
        },
        skills: ["CSS", "Box Model"],
      },
      {
        title: "Selectors",
        description: "Target elements with class, ID, and attribute selectors.",
        order: 3,
        problem: {
          title: "CSS Selectors",
          objective: "Write rules for .highlight, #title, and input[type='text'].",
          duration: 25,
          rewardXP: 90,
          starterCode: `/* Write your selectors here */`,
          solution: `.highlight { background-color: yellow; }\n#title { font-size: 2rem; }\ninput[type="text"] { border: 1px solid #ccc; padding: 8px; }`,
          starterCodeHtml: `<h1 id="title">Title</h1>\n<p class="highlight">Highlighted text</p>\n<input type="text" placeholder="Type here" />`,
          starterCodeCss:  `/* Style .highlight, #title, and input[type="text"] */`,
          starterCodeJs:   null,
          solutionHtml: `<h1 id="title">Title</h1>\n<p class="highlight">Highlighted text</p>\n<input type="text" placeholder="Type here" />`,
          solutionCss:  `.highlight { background-color: yellow; }\n#title { font-size: 2rem; }\ninput[type="text"] { border: 1px solid #ccc; padding: 8px; }`,
          solutionJs:   null,
          testCases: `const rules = Array.from(document.styleSheets[0].cssRules).map(r => r.selectorText);\nassert(rules.some(r => r === ".highlight"), "Must have .highlight selector");\nassert(rules.some(r => r === "#title"), "Must have #title selector");\nassert(rules.some(r => r && r.includes("input")), "Must have an input attribute selector");`,
        },
        skills: ["CSS", "Selectors"],
      },
      {
        title: "Pseudo-classes",
        description: "Apply styles based on element state.",
        order: 4,
        problem: {
          title: "Hover and Focus",
          objective: "Change button background on :hover and add a blue outline to input on :focus.",
          duration: 20,
          rewardXP: 85,
          starterCode: `button { background-color: steelblue; color: white; }\n/* Add :hover and :focus rules */`,
          solution: `button { background-color: steelblue; color: white; }\nbutton:hover { background-color: darkblue; }\ninput:focus { outline: 2px solid steelblue; }`,
          starterCodeHtml: `<button>Click me</button>\n<input type="text" placeholder="Focus me" />`,
          starterCodeCss:  `button { background-color: steelblue; color: white; }\n/* Add button:hover and input:focus rules */`,
          starterCodeJs:   null,
          solutionHtml: `<button>Click me</button>\n<input type="text" placeholder="Focus me" />`,
          solutionCss:  `button { background-color: steelblue; color: white; }\nbutton:hover { background-color: darkblue; }\ninput:focus { outline: 2px solid steelblue; }`,
          solutionJs:   null,
          testCases: `const rules = Array.from(document.styleSheets[0].cssRules).map(r => r.selectorText);\nassert(rules.some(r => r === "button:hover"), "Must have button:hover rule");\nassert(rules.some(r => r === "input:focus"), "Must have input:focus rule");`,
        },
        skills: ["CSS", "Pseudo-classes", "Interactivity"],
      },
      {
        title: "Typography",
        description: "Control font size, weight, line-height, and text alignment.",
        order: 5,
        problem: {
          title: "Text Styling",
          objective: "Style .prose with font-size 18px, line-height 1.6, font-weight 400, and text-align justify.",
          duration: 20,
          rewardXP: 75,
          starterCode: `.prose {\n  /* Your CSS here */\n}`,
          solution: `.prose {\n  font-size: 18px;\n  line-height: 1.6;\n  font-weight: 400;\n  text-align: justify;\n}`,
          starterCodeHtml: `<p class="prose">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`,
          starterCodeCss:  `.prose {\n  /* Add font-size, line-height, font-weight, text-align */\n}`,
          starterCodeJs:   null,
          solutionHtml: `<p class="prose">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`,
          solutionCss:  `.prose {\n  font-size: 18px;\n  line-height: 1.6;\n  font-weight: 400;\n  text-align: justify;\n}`,
          solutionJs:   null,
          testCases: `const s = window.getComputedStyle(document.querySelector(".prose"));\nassert(s.fontSize === "18px", "font-size must be 18px");\nassert(parseFloat(s.lineHeight) / 18 >= 1.5, "line-height must be ~1.6");\nassert(s.textAlign === "justify", "text-align must be justify");`,
        },
        skills: ["CSS", "Typography"],
      },
      {
        title: "Flexbox Layout",
        description: "Align and distribute elements with Flexbox.",
        order: 6,
        problem: {
          title: "Flexbox",
          objective: "Make .container a flex row with space-between justify and center align-items.",
          duration: 25,
          rewardXP: 100,
          starterCode: `.container {\n  height: 200px;\n  /* Your CSS here */\n}`,
          solution: `.container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  height: 200px;\n}`,
          starterCodeHtml: `<div class="container">\n  <div>Item 1</div>\n  <div>Item 2</div>\n  <div>Item 3</div>\n</div>`,
          starterCodeCss:  `.container {\n  height: 200px;\n  /* Add display, flex-direction, justify-content, align-items */\n}`,
          starterCodeJs:   null,
          solutionHtml: `<div class="container">\n  <div>Item 1</div>\n  <div>Item 2</div>\n  <div>Item 3</div>\n</div>`,
          solutionCss:  `.container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  height: 200px;\n}`,
          solutionJs:   null,
          testCases: `const s = window.getComputedStyle(document.querySelector(".container"));\nassert(s.display === "flex", "Must use display: flex");\nassert(s.justifyContent === "space-between", "Must use justify-content: space-between");\nassert(s.alignItems === "center", "Must use align-items: center");`,
        },
        skills: ["CSS", "Flexbox", "Layout"],
      },
      {
        title: "CSS Grid",
        description: "Build two-dimensional layouts with CSS Grid.",
        order: 7,
        problem: {
          title: "Grid Layout",
          objective: "Give .grid display:grid with 3 equal columns and a 16px gap.",
          duration: 25,
          rewardXP: 110,
          starterCode: `.grid {\n  /* Your CSS here */\n}`,
          solution: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}`,
          starterCodeHtml: `<div class="grid">\n  <div>1</div><div>2</div><div>3</div>\n  <div>4</div><div>5</div><div>6</div>\n</div>`,
          starterCodeCss:  `.grid {\n  /* Add display: grid, grid-template-columns, and gap */\n}`,
          starterCodeJs:   null,
          solutionHtml: `<div class="grid">\n  <div>1</div><div>2</div><div>3</div>\n  <div>4</div><div>5</div><div>6</div>\n</div>`,
          solutionCss:  `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}`,
          solutionJs:   null,
          testCases: `const s = window.getComputedStyle(document.querySelector(".grid"));\nassert(s.display === "grid", "Must use display: grid");\nassert(s.gap === "16px" || s.columnGap === "16px", "Gap must be 16px");`,
        },
        skills: ["CSS", "Grid", "Layout"],
      },
      {
        title: "Positioning",
        description: "Control element placement with position properties.",
        order: 8,
        problem: {
          title: "CSS Positioning",
          objective: "Make .card position:relative and .badge position:absolute in its top-right corner.",
          duration: 25,
          rewardXP: 105,
          starterCode: `.card { /* positioning context */ }\n.badge { /* top-right corner */ }`,
          solution: `.card {\n  position: relative;\n  padding: 20px;\n}\n.badge {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n}`,
          starterCodeHtml: `<div class="card">\n  <span class="badge">NEW</span>\n  <p>Card content</p>\n</div>`,
          starterCodeCss:  `.card {\n  /* Make this a positioning context */\n  padding: 20px;\n}\n.badge {\n  /* Position me top-right */\n}`,
          starterCodeJs:   null,
          solutionHtml: `<div class="card">\n  <span class="badge">NEW</span>\n  <p>Card content</p>\n</div>`,
          solutionCss:  `.card {\n  position: relative;\n  padding: 20px;\n}\n.badge {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n}`,
          solutionJs:   null,
          testCases: `const card = window.getComputedStyle(document.querySelector(".card"));\nconst badge = window.getComputedStyle(document.querySelector(".badge"));\nassert(card.position === "relative", ".card must be position:relative");\nassert(badge.position === "absolute", ".badge must be position:absolute");`,
        },
        skills: ["CSS", "Positioning", "Layout"],
      },
      {
        title: "Responsive Design with Media Queries",
        description: "Adapt layouts to different screen sizes.",
        order: 9,
        problem: {
          title: "Media Queries",
          objective: "Add a @media (max-width: 600px) rule that collapses .grid to a single column.",
          duration: 30,
          rewardXP: 120,
          starterCode: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n/* Add media query */`,
          solution: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n@media (max-width: 600px) {\n  .grid {\n    grid-template-columns: 1fr;\n  }\n}`,
          starterCodeHtml: `<div class="grid">\n  <div>1</div><div>2</div><div>3</div>\n</div>`,
          starterCodeCss:  `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n/* Add @media (max-width: 600px) here */`,
          starterCodeJs:   null,
          solutionHtml: `<div class="grid">\n  <div>1</div><div>2</div><div>3</div>\n</div>`,
          solutionCss:  `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}\n@media (max-width: 600px) {\n  .grid {\n    grid-template-columns: 1fr;\n  }\n}`,
          solutionJs:   null,
          testCases: `const rules = Array.from(document.styleSheets[0].cssRules);\nassert(rules.some(r => r instanceof CSSMediaRule), "Must include at least one @media rule");`,
        },
        skills: ["CSS", "Responsive Design", "Media Queries"],
      },
      {
        title: "CSS Transitions",
        description: "Add smooth style changes with the transition property.",
        order: 10,
        problem: {
          title: "Transitions",
          objective: "Give .button a 0.3s ease background-color transition and a :hover state with a darker colour.",
          duration: 20,
          rewardXP: 95,
          starterCode: `.button {\n  background-color: steelblue;\n  color: white;\n  /* Add transition */\n}\n.button:hover { /* Darker colour */ }`,
          solution: `.button {\n  background-color: steelblue;\n  color: white;\n  padding: 10px 20px;\n  transition: background-color 0.3s ease;\n}\n.button:hover {\n  background-color: navy;\n}`,
          starterCodeHtml: `<button class="button">Hover me</button>`,
          starterCodeCss:  `.button {\n  background-color: steelblue;\n  color: white;\n  padding: 10px 20px;\n  /* Add transition property */\n}\n.button:hover {\n  /* Change background-color */\n}`,
          starterCodeJs:   null,
          solutionHtml: `<button class="button">Hover me</button>`,
          solutionCss:  `.button {\n  background-color: steelblue;\n  color: white;\n  padding: 10px 20px;\n  transition: background-color 0.3s ease;\n}\n.button:hover {\n  background-color: navy;\n}`,
          solutionJs:   null,
          testCases: `const s = window.getComputedStyle(document.querySelector(".button"));\nassert(s.transition.includes("background-color"), "Must transition background-color");\nassert(s.transition.includes("0.3s"), "Duration must be 0.3s");`,
        },
        skills: ["CSS", "Transitions", "Animation"],
      },
      {
        title: "CSS Custom Properties",
        description: "Use CSS variables for reusable design tokens.",
        order: 11,
        problem: {
          title: "CSS Variables",
          objective: "Define --primary-color and --base-font-size on :root, then apply them to h1 and body.",
          duration: 25,
          rewardXP: 115,
          starterCode: `:root {\n  /* Define variables */\n}\nh1 { /* Use --primary-color */ }\nbody { /* Use --base-font-size */ }`,
          solution: `:root {\n  --primary-color: #3b82f6;\n  --base-font-size: 16px;\n}\nh1 { color: var(--primary-color); }\nbody { font-size: var(--base-font-size); }`,
          starterCodeHtml: `<body>\n  <h1>Styled with variables</h1>\n</body>`,
          starterCodeCss:  `:root {\n  /* Define --primary-color and --base-font-size here */\n}\nh1 {\n  /* Apply var(--primary-color) */\n}\nbody {\n  /* Apply var(--base-font-size) */\n}`,
          starterCodeJs:   null,
          solutionHtml: `<body>\n  <h1>Styled with variables</h1>\n</body>`,
          solutionCss:  `:root {\n  --primary-color: #3b82f6;\n  --base-font-size: 16px;\n}\nh1 { color: var(--primary-color); }\nbody { font-size: var(--base-font-size); }`,
          solutionJs:   null,
          testCases: `const root = getComputedStyle(document.documentElement);\nassert(root.getPropertyValue("--primary-color").trim(), "Must define --primary-color");\nassert(root.getPropertyValue("--base-font-size").trim(), "Must define --base-font-size");`,
        },
        skills: ["CSS", "Custom Properties", "Design Tokens"],
      },
      {
        title: "CSS Animations",
        description: "Build keyframe-based animations with @keyframes.",
        order: 12,
        problem: {
          title: "Keyframe Animation",
          objective: "Define a @keyframes fadeIn from opacity 0 to 1 and apply it to .hero over 1s.",
          duration: 30,
          rewardXP: 130,
          starterCode: `/* Define @keyframes and apply to .hero */\n.hero {}`,
          solution: `@keyframes fadeIn {\n  from { opacity: 0; }\n  to   { opacity: 1; }\n}\n.hero {\n  animation: fadeIn 1s ease forwards;\n}`,
          starterCodeHtml: `<section class="hero"><h1>Welcome</h1></section>`,
          starterCodeCss:  `/* 1. Define @keyframes fadeIn (opacity 0 → 1)\n   2. Apply it to .hero with 1s duration */\n.hero {\n  /* animation: ... */\n}`,
          starterCodeJs:   null,
          solutionHtml: `<section class="hero"><h1>Welcome</h1></section>`,
          solutionCss:  `@keyframes fadeIn {\n  from { opacity: 0; }\n  to   { opacity: 1; }\n}\n.hero {\n  animation: fadeIn 1s ease forwards;\n}`,
          solutionJs:   null,
          testCases: `const rules = Array.from(document.styleSheets[0].cssRules);\nassert(rules.some(r => r instanceof CSSKeyframesRule && r.name === "fadeIn"), "Must define @keyframes fadeIn");\nconst s = window.getComputedStyle(document.querySelector(".hero"));\nassert(s.animationName === "fadeIn", ".hero must use fadeIn");\nassert(s.animationDuration === "1s", "Duration must be 1s");`,
        },
        skills: ["CSS", "Animations", "Keyframes"],
      },
      {
        title: "CSS Specificity and Cascade",
        description: "Understand how the browser resolves conflicting CSS rules.",
        order: 13,
        problem: {
          title: "Specificity",
          objective: "Without using !important, make #hero.card h2 display in gold, overriding h2 { color: gray }.",
          duration: 30,
          rewardXP: 135,
          starterCode: `h2 { color: gray; }\n/* Add higher-specificity rule */`,
          solution: `h2 { color: gray; }\n#hero.card h2 { color: gold; }`,
          starterCodeHtml: `<div id="hero" class="card">\n  <h2>This should be gold</h2>\n</div>\n<h2>This should be gray</h2>`,
          starterCodeCss:  `h2 { color: gray; }\n/* Write a rule that targets #hero.card h2 and makes it gold */`,
          starterCodeJs:   null,
          solutionHtml: `<div id="hero" class="card">\n  <h2>This should be gold</h2>\n</div>\n<h2>This should be gray</h2>`,
          solutionCss:  `h2 { color: gray; }\n#hero.card h2 { color: gold; }`,
          solutionJs:   null,
          testCases: `const el = document.querySelector("#hero.card h2");\nassert(el, "Must have #hero.card h2 in the DOM");\nconst s = window.getComputedStyle(el);\nassert(s.color === "rgb(255, 215, 0)", "#hero.card h2 must be gold");`,
        },
        skills: ["CSS", "Specificity", "Cascade"],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE 3 — JavaScript Basics
  // ══════════════════════════════════════════════════════════════════════════
  {
    moduleNumber: 3,
    title: "JavaScript Basics",
    description: "Introduction to JavaScript programming — from variables to async patterns.",
    order: 3,
    challenges: [
      {
        title: "Variables and Types",
        description: "Declare variables and understand JavaScript data types.",
        order: 1,
        problem: {
          title: "Declaring Variables",
          objective: "Declare a const 'greeting' = 'Hello', a let 'count' = 0, and a boolean 'isActive' = true.",
          duration: 25,
          rewardXP: 100,
          starterCode: `// Write your code here`,
          solution: `const greeting = "Hello";\nlet count = 0;\nlet isActive = true;`,
          starterCodeHtml: null,
          starterCodeCss:  null,
          starterCodeJs:   `// Declare greeting (const), count (let), and isActive (let) here`,
          solutionHtml: null,
          solutionCss:  null,
          solutionJs:   `const greeting = "Hello";\nlet count = 0;\nlet isActive = true;`,
          testCases: `assert(greeting === "Hello", "greeting must equal 'Hello'");\nassert(count === 0, "count must equal 0");\nassert(isActive === true, "isActive must be true");`,
        },
        skills: ["JavaScript", "Variables", "Data Types"],
      },
      {
        title: "Operators and Expressions",
        description: "Perform arithmetic and logical operations.",
        order: 2,
        problem: {
          title: "Operators",
          objective: "Compute sum, difference, product, and remainder of 17 and 5.",
          duration: 20,
          rewardXP: 90,
          starterCode: `// Write your code here`,
          solution: `const sum = 17 + 5;\nconst difference = 17 - 5;\nconst product = 17 * 5;\nconst remainder = 17 % 5;`,
          starterCodeHtml: null,
          starterCodeCss:  null,
          starterCodeJs:   `// Compute sum, difference, product, and remainder of 17 and 5`,
          solutionHtml: null,
          solutionCss:  null,
          solutionJs:   `const sum = 17 + 5;\nconst difference = 17 - 5;\nconst product = 17 * 5;\nconst remainder = 17 % 5;`,
          testCases: `assert(sum === 22, "sum must be 22");\nassert(difference === 12, "difference must be 12");\nassert(product === 85, "product must be 85");\nassert(remainder === 2, "remainder must be 2");`,
        },
        skills: ["JavaScript", "Operators"],
      },
      {
        title: "String Methods",
        description: "Manipulate text using built-in string methods.",
        order: 3,
        problem: {
          title: "String Manipulation",
          objective: "Given 'Hello, World!', store its uppercase version, its length, and replace 'World' with 'JavaScript'.",
          duration: 25,
          rewardXP: 100,
          starterCode: `const str = "Hello, World!";\n// Write your code here`,
          solution: `const str = "Hello, World!";\nconst upperStr = str.toUpperCase();\nconst strLength = str.length;\nconst replaced = str.replace("World", "JavaScript");`,
          starterCodeHtml: null,
          starterCodeCss:  null,
          starterCodeJs:   `const str = "Hello, World!";\nconst upperStr = /* toUpperCase */;\nconst strLength = /* length */;\nconst replaced = /* replace */;`,
          solutionHtml: null,
          solutionCss:  null,
          solutionJs:   `const str = "Hello, World!";\nconst upperStr = str.toUpperCase();\nconst strLength = str.length;\nconst replaced = str.replace("World", "JavaScript");`,
          testCases: `assert(upperStr === "HELLO, WORLD!", "upperStr must be uppercase");\nassert(strLength === 13, "strLength must be 13");\nassert(replaced === "Hello, JavaScript!", "replaced must swap World for JavaScript");`,
        },
        skills: ["JavaScript", "Strings"],
      },
      {
        title: "Conditionals",
        description: "Control program flow with if/else and ternary expressions.",
        order: 4,
        problem: {
          title: "If/Else and Ternary",
          objective: "Write a 'grade' function (A/B/C/F) and a one-liner 'isEven' arrow using a ternary.",
          duration: 25,
          rewardXP: 110,
          starterCode: `function grade(score) {\n  // Your logic here\n}\nconst isEven = (n) => /* ternary */;`,
          solution: `function grade(score) {\n  if (score >= 90) return "A";\n  else if (score >= 80) return "B";\n  else if (score >= 70) return "C";\n  else return "F";\n}\nconst isEven = (n) => n % 2 === 0 ? "even" : "odd";`,
          starterCodeHtml: null,
          starterCodeCss:  null,
          starterCodeJs:   `function grade(score) {\n  // Return "A", "B", "C", or "F" based on score\n}\nconst isEven = (n) => /* return "even" or "odd" using a ternary */;`,
          solutionHtml: null,
          solutionCss:  null,
          solutionJs:   `function grade(score) {\n  if (score >= 90) return "A";\n  else if (score >= 80) return "B";\n  else if (score >= 70) return "C";\n  else return "F";\n}\nconst isEven = (n) => n % 2 === 0 ? "even" : "odd";`,
          testCases: `assert(grade(95) === "A", "95 → A");\nassert(grade(82) === "B", "82 → B");\nassert(grade(71) === "C", "71 → C");\nassert(grade(50) === "F", "50 → F");\nassert(isEven(4) === "even", "4 is even");\nassert(isEven(7) === "odd", "7 is odd");`,
        },
        skills: ["JavaScript", "Conditionals", "Ternary"],
      },
      {
        title: "Loops",
        description: "Repeat code using for loops.",
        order: 5,
        problem: {
          title: "For Loop",
          objective: "Write a function 'sumTo' that uses a for loop to return the sum of all integers from 1 to n.",
          duration: 25,
          rewardXP: 110,
          starterCode: `function sumTo(n) {\n  // Your loop here\n}`,
          solution: `function sumTo(n) {\n  let total = 0;\n  for (let i = 1; i <= n; i++) {\n    total += i;\n  }\n  return total;\n}`,
          starterCodeHtml: null,
          starterCodeCss:  null,
          starterCodeJs:   `function sumTo(n) {\n  let total = 0;\n  // Use a for loop from 1 to n\n  return total;\n}`,
          solutionHtml: null,
          solutionCss:  null,
          solutionJs:   `function sumTo(n) {\n  let total = 0;\n  for (let i = 1; i <= n; i++) {\n    total += i;\n  }\n  return total;\n}`,
          testCases: `assert(sumTo(5) === 15, "sumTo(5) must be 15");\nassert(sumTo(10) === 55, "sumTo(10) must be 55");\nassert(sumTo(1) === 1, "sumTo(1) must be 1");`,
        },
        skills: ["JavaScript", "Loops"],
      },
      {
        title: "Functions and Scope",
        description: "Define named functions, arrow functions, and understand scope.",
        order: 6,
        problem: {
          title: "Arrow Functions",
          objective: "Convert 'function double(x) { return x * 2; }' to an arrow function and write an 'add(a, b)' arrow function.",
          duration: 20,
          rewardXP: 95,
          starterCode: `// Write your arrow functions here`,
          solution: `const double = (x) => x * 2;\nconst add = (a, b) => a + b;`,
          starterCodeHtml: null,
          starterCodeCss:  null,
          starterCodeJs:   `// Convert to arrow function:\n// function double(x) { return x * 2; }\nconst double = /* ... */;\n\n// Write an arrow function add(a, b)\nconst add = /* ... */;`,
          solutionHtml: null,
          solutionCss:  null,
          solutionJs:   `const double = (x) => x * 2;\nconst add = (a, b) => a + b;`,
          testCases: `assert(typeof double === "function", "double must be a function");\nassert(double(3) === 6, "double(3) must be 6");\nassert(typeof add === "function", "add must be a function");\nassert(add(3, 4) === 7, "add(3, 4) must be 7");`,
        },
        skills: ["JavaScript", "Functions", "Arrow Functions"],
      },
      {
        title: "Arrays",
        description: "Store and manipulate ordered collections of values.",
        order: 7,
        problem: {
          title: "Array Methods",
          objective: "Filter numbers > 10, double each with map, and sum them with reduce.",
          duration: 30,
          rewardXP: 130,
          starterCode: `const numbers = [3, 8, 12, 5, 20, 1, 15];\n// Write your code here`,
          solution: `const numbers = [3, 8, 12, 5, 20, 1, 15];\nconst filtered = numbers.filter(n => n > 10);\nconst doubled = filtered.map(n => n * 2);\nconst total = doubled.reduce((acc, n) => acc + n, 0);`,
          starterCodeHtml: null,
          starterCodeCss:  null,
          starterCodeJs:   `const numbers = [3, 8, 12, 5, 20, 1, 15];\nconst filtered = numbers.filter(/* n > 10 */);\nconst doubled = filtered.map(/* double each */);\nconst total = doubled.reduce(/* sum */, 0);`,
          solutionHtml: null,
          solutionCss:  null,
          solutionJs:   `const numbers = [3, 8, 12, 5, 20, 1, 15];\nconst filtered = numbers.filter(n => n > 10);\nconst doubled = filtered.map(n => n * 2);\nconst total = doubled.reduce((acc, n) => acc + n, 0);`,
          testCases: `assert(JSON.stringify(filtered) === JSON.stringify([12, 20, 15]), "filtered must be [12,20,15]");\nassert(JSON.stringify(doubled) === JSON.stringify([24, 40, 30]), "doubled must be [24,40,30]");\nassert(total === 94, "total must be 94");`,
        },
        skills: ["JavaScript", "Arrays", "Functional Programming"],
      },
      {
        title: "Objects",
        description: "Create and destructure JavaScript objects.",
        order: 8,
        problem: {
          title: "Objects and Destructuring",
          objective: "Create a 'person' object with name, age, and greet(). Then destructure name and age.",
          duration: 25,
          rewardXP: 115,
          starterCode: `// Write your person object and destructuring here`,
          solution: `const person = {\n  name: "Alice",\n  age: 30,\n  greet() {\n    return \`Hi, I am \${this.name}\`;\n  }\n};\nconst { name, age } = person;`,
          starterCodeHtml: null,
          starterCodeCss:  null,
          starterCodeJs:   `const person = {\n  name: /* string */,\n  age: /* number */,\n  greet() {\n    // return "Hi, I am <name>"\n  }\n};\n\n// Destructure name and age from person\nconst { /* ... */ } = person;`,
          solutionHtml: null,
          solutionCss:  null,
          solutionJs:   `const person = {\n  name: "Alice",\n  age: 30,\n  greet() {\n    return \`Hi, I am \${this.name}\`;\n  }\n};\nconst { name, age } = person;`,
          testCases: `assert(typeof person.greet === "function", "person.greet must be a function");\nassert(person.greet() === \`Hi, I am \${person.name}\`, "greet() must return correct string");\nassert(name === person.name, "name must be destructured");\nassert(age === person.age, "age must be destructured");`,
        },
        skills: ["JavaScript", "Objects", "Destructuring"],
      },
      {
        title: "Spread and Rest",
        description: "Use spread and rest operators with arrays and objects.",
        order: 9,
        problem: {
          title: "Spread / Rest",
          objective: "Merge two arrays, merge two objects with spread, and write a rest-param 'sum' function.",
          duration: 25,
          rewardXP: 120,
          starterCode: `const a = [1, 2, 3];\nconst b = [4, 5, 6];\nconst obj1 = { x: 1 };\nconst obj2 = { y: 2 };\n// Write your code here`,
          solution: `const a = [1, 2, 3];\nconst b = [4, 5, 6];\nconst obj1 = { x: 1 };\nconst obj2 = { y: 2 };\nconst merged = [...a, ...b];\nconst mergedObj = { ...obj1, ...obj2 };\nconst sum = (...nums) => nums.reduce((acc, n) => acc + n, 0);`,
          starterCodeHtml: null,
          starterCodeCss:  null,
          starterCodeJs:   `const a = [1, 2, 3];\nconst b = [4, 5, 6];\nconst obj1 = { x: 1 };\nconst obj2 = { y: 2 };\n\nconst merged = /* spread a and b into one array */;\nconst mergedObj = /* spread obj1 and obj2 into one object */;\nconst sum = (/* rest params */) => /* reduce to total */;`,
          solutionHtml: null,
          solutionCss:  null,
          solutionJs:   `const a = [1, 2, 3];\nconst b = [4, 5, 6];\nconst obj1 = { x: 1 };\nconst obj2 = { y: 2 };\nconst merged = [...a, ...b];\nconst mergedObj = { ...obj1, ...obj2 };\nconst sum = (...nums) => nums.reduce((acc, n) => acc + n, 0);`,
          testCases: `assert(JSON.stringify(merged) === JSON.stringify([1,2,3,4,5,6]), "merged must be [1..6]");\nassert(mergedObj.x === 1 && mergedObj.y === 2, "mergedObj must have x and y");\nassert(sum(1, 2, 3, 4) === 10, "sum(1,2,3,4) must be 10");`,
        },
        skills: ["JavaScript", "Spread", "Rest", "ES6+"],
      },
      {
        title: "DOM Manipulation",
        description: "Select and modify HTML elements with JavaScript.",
        order: 10,
        problem: {
          title: "DOM Basics",
          objective: "Select #message, set its textContent to 'Hello DOM!', and add class 'active'.",
          duration: 25,
          rewardXP: 120,
          starterCode: `// Assume <p id="message">Original</p> exists\n// Write your DOM code here`,
          solution: `const el = document.getElementById("message");\nel.textContent = "Hello DOM!";\nel.classList.add("active");`,
          starterCodeHtml: `<p id="message">Original text</p>`,
          starterCodeCss:  `.active { font-weight: bold; color: green; }`,
          starterCodeJs:   `// 1. Select the element with id "message"\n// 2. Change its textContent to "Hello DOM!"\n// 3. Add the class "active" to it`,
          solutionHtml: `<p id="message">Original text</p>`,
          solutionCss:  `.active { font-weight: bold; color: green; }`,
          solutionJs:   `const el = document.getElementById("message");\nel.textContent = "Hello DOM!";\nel.classList.add("active");`,
          testCases: `const el = document.getElementById("message");\nassert(el, "Element #message must exist");\nassert(el.textContent === "Hello DOM!", "textContent must be 'Hello DOM!'");\nassert(el.classList.contains("active"), "Must have class 'active'");`,
        },
        skills: ["JavaScript", "DOM", "Manipulation"],
      },
      {
        title: "Events",
        description: "Respond to user interactions with event listeners.",
        order: 11,
        problem: {
          title: "Event Listeners",
          objective: "Add a click listener to #btn that increments a counter and updates #count's text.",
          duration: 30,
          rewardXP: 130,
          starterCode: `let counter = 0;\n// Assume <button id="btn"> and <span id="count"> exist\n// Write your code here`,
          solution: `let counter = 0;\nconst btn = document.getElementById("btn");\nconst countEl = document.getElementById("count");\nbtn.addEventListener("click", () => {\n  counter++;\n  countEl.textContent = String(counter);\n});`,
          starterCodeHtml: `<button id="btn">Click me</button>\n<p>Count: <span id="count">0</span></p>`,
          starterCodeCss:  `button { padding: 8px 16px; cursor: pointer; }`,
          starterCodeJs:   `let counter = 0;\n// Add a click event listener to #btn\n// Increment counter and update #count's textContent`,
          solutionHtml: `<button id="btn">Click me</button>\n<p>Count: <span id="count">0</span></p>`,
          solutionCss:  `button { padding: 8px 16px; cursor: pointer; }`,
          solutionJs:   `let counter = 0;\nconst btn = document.getElementById("btn");\nconst countEl = document.getElementById("count");\nbtn.addEventListener("click", () => {\n  counter++;\n  countEl.textContent = String(counter);\n});`,
          testCases: `assert(document.getElementById("btn"), "Button #btn must exist");\nassert(document.getElementById("count"), "Span #count must exist");\ndocument.getElementById("btn").click();\nassert(parseInt(document.getElementById("count").textContent) === 1, "Counter must be 1 after click");`,
        },
        skills: ["JavaScript", "Events", "DOM"],
      },
      {
        title: "Promises and Fetch",
        description: "Handle asynchronous operations with async/await and the Fetch API.",
        order: 12,
        problem: {
          title: "Async / Await",
          objective: "Write an async function 'getUser' that fetches 'https://jsonplaceholder.typicode.com/users/1' and returns the parsed JSON.",
          duration: 35,
          rewardXP: 150,
          starterCode: `// Write your async function here`,
          solution: `async function getUser() {\n  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");\n  const data = await response.json();\n  return data;\n}`,
          starterCodeHtml: null,
          starterCodeCss:  null,
          starterCodeJs:   `async function getUser() {\n  // 1. fetch the URL\n  // 2. parse the JSON\n  // 3. return the data\n}`,
          solutionHtml: null,
          solutionCss:  null,
          solutionJs:   `async function getUser() {\n  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");\n  const data = await response.json();\n  return data;\n}`,
          testCases: `assert(typeof getUser === "function", "getUser must be a function");\ngetUser().then(data => {\n  assert(data.id === 1, "User id must be 1");\n  assert(typeof data.name === "string", "User must have a name");\n});`,
        },
        skills: ["JavaScript", "Async/Await", "Fetch", "Promises"],
      },
      {
        title: "Error Handling",
        description: "Gracefully handle runtime errors with try/catch.",
        order: 13,
        problem: {
          title: "Try/Catch",
          objective: "Write a 'parseJSON' function that returns parsed JSON or null on failure.",
          duration: 25,
          rewardXP: 120,
          starterCode: `function parseJSON(str) {\n  // try/catch here\n}`,
          solution: `function parseJSON(str) {\n  try {\n    return JSON.parse(str);\n  } catch {\n    return null;\n  }\n}`,
          starterCodeHtml: null,
          starterCodeCss:  null,
          starterCodeJs:   `function parseJSON(str) {\n  try {\n    // attempt to parse str\n  } catch {\n    // return null on failure\n  }\n}`,
          solutionHtml: null,
          solutionCss:  null,
          solutionJs:   `function parseJSON(str) {\n  try {\n    return JSON.parse(str);\n  } catch {\n    return null;\n  }\n}`,
          testCases: `assert(parseJSON('{"name":"Alice"}') !== null, "Valid JSON must parse");\nassert(parseJSON('{"name":"Alice"}').name === "Alice", "Must return parsed object");\nassert(parseJSON("bad json") === null, "Invalid JSON must return null");`,
        },
        skills: ["JavaScript", "Error Handling", "try/catch"],
      },
      {
        title: "Modules and Imports",
        description: "Organise code using ES Modules with import and export.",
        order: 14,
        problem: {
          title: "ES Modules",
          objective: "Export a named 'multiply' function and a default 'PI' constant, then import and use both.",
          duration: 30,
          rewardXP: 140,
          starterCode: `// math.js\n// export multiply and PI\n\n// main.js\n// import and use them`,
          solution: `// math.js\nexport const multiply = (a, b) => a * b;\nexport default 3.14159;\n\n// main.js\nimport PI, { multiply } from "./math.js";\nconst area = multiply(PI, 4 * 4);`,
          starterCodeHtml: null,
          starterCodeCss:  null,
          starterCodeJs:   `// math.js\nexport const multiply = /* arrow function */;\nexport default /* PI value */;\n\n// main.js\nimport PI, { multiply } from "./math.js";\nconst area = /* use multiply and PI */;`,
          solutionHtml: null,
          solutionCss:  null,
          solutionJs:   `// math.js\nexport const multiply = (a, b) => a * b;\nexport default 3.14159;\n\n// main.js\nimport PI, { multiply } from "./math.js";\nconst area = multiply(PI, 4 * 4);`,
          testCases: `assert(typeof multiply === "function", "multiply must be a function");\nassert(multiply(3, 4) === 12, "multiply(3,4) must be 12");\nassert(typeof PI === "number", "PI must be a number");\nassert(Math.abs(PI - 3.14159) < 0.001, "PI must be ~3.14159");`,
        },
        skills: ["JavaScript", "ES Modules", "import/export"],
      },
    ],
  },
];


export default modulesData;

async function main() {
  console.log(`Start seeding content for user: ${userId}...`)

  for (const moduleData of modulesData) {
    // Upsert Module
    const module = await prisma.module.upsert({
      where: { moduleNumber: moduleData.moduleNumber },
      update: {
        title: moduleData.title,
        description: moduleData.description,
        order: moduleData.order,
      },
      create: {
        moduleNumber: moduleData.moduleNumber,
        title: moduleData.title,
        description: moduleData.description,
        order: moduleData.order,
      },
    })
    
    console.log(`Processed Module: ${module.title} (ID: ${module.id})`)

    // Create Challenges for Module
    for (const challengeData of moduleData.challenges) {
      // Check if challenge exists
      const existingChallenge = await prisma.challenge.findFirst({
          where: {
              moduleId: module.id,
              title: challengeData.title
          }
      })

      let challenge;
      
      if (existingChallenge) {
          console.log(` - Challenge already exists: ${challengeData.title}`)
          challenge = existingChallenge
      } else {
          challenge = await prisma.challenge.create({
            data: {
              title: challengeData.title,
              description: challengeData.description,
              order: challengeData.order,
              moduleId: module.id,
              // Create nested Problem
              problem: {
                create: {
                  title: challengeData.problem.title,
                  objective: challengeData.problem.objective,
                  duration: challengeData.problem.duration,
                  rewardXP: challengeData.problem.rewardXP,
                  starterCodeHtml: challengeData.problem.starterCodeHtml,
                    starterCodeCss: challengeData.problem.starterCodeCss,
                    starterCodeJs: challengeData.problem.starterCodeJs,     
                    solutionHtml: challengeData.problem.solutionHtml,
                    solutionCss: challengeData.problem.solutionCss,
                    solutionJs: challengeData.problem.solutionJs,
                  testCases: challengeData.problem.testCases,
                }
              }
            }
          })
          console.log(` - Created Challenge: ${challenge.title}`)
      }

      // Handle Skills
      for (const skillName of challengeData.skills) {
        const skill = await prisma.skill.upsert({
            where: { name: skillName },
            update: {},
            create: { name: skillName }
        })
        
        // Link skill to challenge if not already linked
        const existingLink = await prisma.challengeSkill.findUnique({
            where: {
                challengeId_skillId: {
                    challengeId: challenge.id,
                    skillId: skill.id
                }
            }
        })
        
        if (!existingLink) {
             await prisma.challengeSkill.create({
                data: {
                    challengeId: challenge.id,
                    skillId: skill.id
                }
            })
        }
      }
    }
  }

  // Assign Progress to Specific User
  const user = await prisma.user.findUnique({
      where: { id: userId }
  })

  if (user) {
    console.log(`Found user: ${userId}. Setting up specific progress: Module 1 Completed, Module 2 In Progress...`)

    const allModules = await prisma.module.findMany({
      include: { challenges: true }
    });

    for (const mod of allModules) {
      // Determine status based on module order
      let moduleStatus: 'LOCKED' | 'IN_PROGRESS' | 'COMPLETED' = 'LOCKED';
      let completedCount = 0;

      if (mod.order === 1) {
        moduleStatus = 'COMPLETED';
        completedCount = mod.challenges.length;
      } else if (mod.order === 2) {
        moduleStatus = 'IN_PROGRESS';
        completedCount = 0; // Just started
      }

      // Upsert Module Progress
      await prisma.moduleProgress.upsert({
        where: {
          userId_moduleId: {
            userId: user.id,
            moduleId: mod.id
          }
        },
        update: {
          status: moduleStatus,
          completedChallenges: completedCount,
          totalChallenges: mod.challenges.length
        },
        create: {
          userId: user.id,
          moduleId: mod.id,
          status: moduleStatus,
          completedChallenges: completedCount,
          totalChallenges: mod.challenges.length
        }
      });

      // Handle Challenge Progress
      if (mod.order === 1) {
        // Mark all challenges in Module 1 as COMPLETED
        for (const challenge of mod.challenges) {
          await prisma.challengeProgress.upsert({
            where: {
              userId_challengeId: {
                userId: user.id,
                challengeId: challenge.id
              }
            },
            update: { status: 'COMPLETED', completedAt: new Date() },
            create: {
              userId: user.id,
              challengeId: challenge.id,
              status: 'COMPLETED',
              completedAt: new Date()
            }
          });
        }
      } else if (mod.order === 2) {
        // Mark first challenge of Module 2 as CURRENT
        if (mod.challenges.length > 0) {
          const firstChallenge = mod.challenges.sort((a, b) => a.order - b.order)[0];
          await prisma.challengeProgress.upsert({
            where: {
              userId_challengeId: {
                userId: user.id,
                challengeId: firstChallenge.id
              }
            },
            update: { status: 'CURRENT' },
            create: {
              userId: user.id,
              challengeId: firstChallenge.id,
              status: 'CURRENT'
            }
          });
        }
      }
    }
    console.log(`Progress initialized for user ${userId}`)
  } else {
      console.log(`User ${userId} not found. Skipping progress initialization.`)
  }

  console.log('Seeding completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

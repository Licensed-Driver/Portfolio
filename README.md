# Layneroot: My PortfolioOS

Welcome to one of the coolest web dev things I think I have ever and will ever do.

I built this fully custom, interactive, web desktop portfolio from scratch using **React, TypeScript, Tailwind CSS, and Framer Motion**. I wanted to make a portfolio that wasn't just a regular boring static page and oh boy did I do the opposite. My main goal was building something that immediately catches interest and is kinda fun to stay on. To do this, I made a fake desktop with draggable windows, a real terminal that runs a whole linux kernel right in the browser, working window management (minimize, maximize, close), a physics engine for the background skills, and a pretty solid macOS vibe (if I do say so myself).

**It also just so happens that it is super modular, meaning I can just keep adding to it! (possibly intentional)**

Check it out live [here](https://layne-pitman.com) (or build it yourself)!

## 🛠️ The Tech Stack

I tried to keep things clean and strictly typed so the state management doesn't completely fall apart when you click around too fast.
* **Frontend**: React + TypeScript
* **Styling**: Tailwind CSS for almost everything plus some regular CSS for the crazy custom gradients
* **Animations / Physics**: Framer Motion (handles the draggable windows and the floating skill bubbles)
* **Icons**: Lucide React
* **Build Tool**: Vite
* **Hosting**: Firebase Hosting
* **Linux**: Custom buildroot kernel, v86 by Fabian Hemmer (A living legend for this)

## 💻 Features

* **Interactive Desktop GUI**: Basically a macOS inspired window system. You can click, drag, maximize, and close windows or open them back up from the dock. The active window always jumps to the front of the screen.
* **The Terminal**: A working pseudo-terminal built in React using v86 to translate raw x86 machine code into web assembly to run completely isolated in the browser.
* **Physics Background**: The background uses a physics spring animation engine from Framer Motion to float 21 of my technical skills in a ring around the center. **To prioritize performance, they aren't kept as active physics objects, but I might play around with that in the future**
* **File Explorer**: A custom folder structure that dynamically renders markdown files (which are portfolio-adapted versions of my real project READMEs) when you click on them.
* **Custom Global State**: I used a pretty heavy `React.useReducer` setup to handle all the opening, closing, focusing and positioning for an arbitrary number of windows.

## 🚀 Running it Locally

If you want to spin this up on your own machine:

1. Clone the repo:
   ```bash
   git clone https://github.com/Licensed-Driver/Portfolio.git
   ```
2. Install dependencies:
   ```bash
   cd Portfolio
   npm install
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```

## 📜 Usage & Open Source

I mostly built this to show off what I can do with React but I really love open source and honestly I learned most of what I know by picking apart other peoples code. 

**Feel completely free to fork this, use it, break it, and adapt it for your own portfolio!**

All I ask is:
1. Please dont just clone it and swap my name for yours. Make it your own! Change the styles, add some new apps, whatever.
2. If you do use the code or take heavy inspiration from the windowing and state management, please just credit the repo or my name (Layne Pitman) somewhere in your project (preferably just a lil shoutout in your README). 

---

*Love y'all and have an amazing rest of your day/night!!*

***Also if anyone ever has any questions or would like to work together on a project, I am always happy to connect and make new freinds!!!***

**Email**: [lpitman@ualberta.ca](mailto:lpitman@ualberta.ca)  
**GitHub**: [github.com/Licensed-Driver](https://github.com/Licensed-Driver)
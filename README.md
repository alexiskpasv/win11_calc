# Win11-Calc-Replica 🧮

A high-fidelity, high-precision web reconstruction of the **Windows 11 Calculator**. Built with a focus on system modularity, fluent design aesthetics, and arbitrary-precision arithmetic.

![Project Status](https://img.shields.io/badge/Status-Development-orange)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Tailwind%20%7C%20Big.js-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Overview
This project is a professional-grade web application that mirrors the behavior and design language of the Windows 11 Calculator. Unlike basic web calculators, this system uses a decoupled architecture to separate user input, UI state, and the mathematical engine, ensuring a "pro" feel and mathematical accuracy.

### Key Engineering Goals:
* **Precision:** Elimination of binary floating-point errors (e.g., $0.1 + 0.2$ correctly equals $0.3$) using a decimal math library.
* **Fidelity:** Implementation of the Windows 11 "Mica" effect, acrylic textures, and Segoe UI variable typography.
* **Modularity:** A plugin-style architecture allowing for easy switching between Standard, Scientific, and Programmer modes.

---

## 🏗️ System Architecture

The project follows the **MVVM (Model-View-ViewModel)** pattern adapted for the modern web stack:

* **View (React + Tailwind):** Manages the responsive grid, Fluent Design transitions, and button hover "reveal" effects.
* **ViewModel (Zustand/Hooks):** Acts as the State Machine, handling input validation (e.g., preventing multiple decimals) and history stacks.
* **Model (Big.js Engine):** The pure mathematical core that performs calculations without rounding errors.

### 📂 Project Structure

```text
/win11-calc
├── /public              # Static assets (favicon, manifest for PWA)
├── /src
│   ├── /assets          # Icons (Segoe MDL2 Assets), fonts, and sounds
│   ├── /components      # Reusable UI "bricks"
│   │   ├── Button.jsx   # Generic button with Windows hover effects
│   │   ├── Display.jsx  # The main output screen
│   │   └── Keypad.jsx   # Grid container for buttons
│   ├── /features        # The "Brains" of each mode
│   │   ├── /standard    # Standard calc logic
│   │   ├── /scientific  # Scientific logic & advanced functions
│   │   └── /programmer  # Binary/Hex/Bitwise logic
│   ├── /hooks           # Custom logic (e.g., useKeyboardInput.js)
│   ├── /services        # External API calls (e.g., Currency rates)
│   ├── /store           # State management (Redux, Zustand, or Context)
│   ├── /styles          # Global CSS & Fluent Design tokens
│   │   ├── variables.css
│   │   └── fluent-glass.css
│   ├── /utils           # Math helpers (Decimal.js wrappers)
│   ├── App.jsx          # Root component (Main Window)
│   └── main.jsx         # Entry point
├── tailwind.config.js   # Style configurations
└── package.json

## ⚙️ Development & Deployment

### Local Setup
1. **Clone the repo:**
   ```bash
   git clone [https://github.com/alexiskpasv/win11_calc.git](https://github.com/alexiskpasv/win11_calc.git)

2. **Install dependencies:**

3.  ```bash
    npm install
    Run in dev mode:

4 . ```bash
    npm run dev
    
5.  **CI/CD Pipeline**
    This project uses GitHub Actions for automated deployment.

Trigger: Any push to the main branch.

Process: Installs dependencies, runs a production build, and deploys the dist folder to the gh-pages branch.

Configuration: The vite.config.js is set with base: '/win11_calc/' to ensure asset paths resolve correctly on GitHub's servers.

##📝 License
This project is open-source and available under the MIT License.

Developed with ❤️ by alexiskpasv


**Would you like me to help you generate a `LICENSE` file text or perhaps a `preview.png` mockup for the README?**
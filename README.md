# Aravindh MS — Personal Portfolio & SRE Profile

[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue?style=flat-square&logo=github)](https://aravindhms.github.io/profile/)
[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg?style=flat-square)](LICENSE)
[![Status: Active](https://img.shields.io/badge/Status-Active-emerald?style=flat-square)](#)

Personal portfolio and technical profile of **Aravindh MS** — Site Reliability Engineering (SRE) & Production Support Technical Lead with 10+ years of experience managing, automating, and driving resilience for mission-critical enterprise systems across FinTech, Healthcare, and IT.

🌐 **Live Website**: [https://aravindhms.github.io/profile/](https://aravindhms.github.io/profile/)

---

## ✨ Features

- **Interactive Cursor-Tracking Character**: A custom 60 FPS HTML5 Canvas component that smoothly tracks cursor movement in real time across 64 pre-rendered directional WebP frames using shortest-path angular lerping, complete with direct eye-contact deadzone detection when the cursor hovers near the face.
- **Production-Ready & Lightweight**: Zero frontend frameworks or build dependencies — built with pure semantic HTML5, CSS3, and vanilla JavaScript for sub-second load times.
- **Comprehensive SRE Experience**: Detailed timeline of roles and quantified impact spanning **TAO Digital Solutions**, **Citicorp Services India**, **PagoNxt Merchant Solutions**, and **Cognizant**.
- **Structured Skills Matrix**: Categorized competencies across:
  - *Automation & Scripting*: Python, UNIX Shell, crontab, Rundeck, Control-M
  - *Monitoring & Logging*: Datadog, Kibana (ELK), Splunk
  - *Platforms & Tools*: ServiceNow, BMC Remedy, JIRA, KNIME, Appian, Tableau, Power BI
  - *Cloud & DevOps*: Azure Migration, Terraform, Jenkins, CI/CD, Confluence
  - *Standards & OS*: ITIL Practices, Linux/Unix, Windows, SQL / Informix
- **Key Projects & Open-Source Tools**: Direct access to open-source utilities including Support Automation Pack, Unix Sandbox & Toolkit, SRE Dashboard, Terminal Decoder, and PhotoSort.
- **Embedded Resume Download**: Direct one-click access to download or inspect the latest resume PDF.
- **Responsive & Accessible**: High-DPI canvas scaling, touch support for mobile/tablet, and battery-friendly `IntersectionObserver` pause/resume logic.

---

## 📁 Project Structure

```text
profile/
├── assets/
│   ├── frames/                 # 64 circular directional WebP frames + center frame
│   │   ├── center.webp         # Direct eye-contact reference frame
│   │   ├── frame_00.webp ..    # 360-degree rotational frames
│   │   └── metadata.json       # Rotational angles & bounding metadata
│   ├── Aravindh_MS_Resume.pdf  # Latest PDF resume
│   ├── profile.png             # Profile fallback and social preview image
│   └── *.png                   # Project and hobby media assets
├── css/
│   └── style.css               # Styling, animations, glowing avatar, and media queries
├── js/
│   ├── character.js            # 60fps cursor-tracking canvas engine & math
│   └── script.js               # Smooth scrolling, typewriter effect & particle network
├── index.html                  # Main portfolio entry point
└── README.md                   # Project documentation
```

---

## 🚀 Running Locally

Because this project is built entirely on vanilla web standards, it requires no package manager or build pipeline:

### Option 1: Python HTTP Server (Recommended)
```bash
# Clone the repository
git clone https://github.com/aravindhms/profile.git
cd profile

# Start a local static server
python -m http.server 8000
```
Open **`http://localhost:8000`** in any web browser.

### Option 2: Node.js (npx serve)
```bash
npx serve .
```

---

## 📬 Let's Connect

- **Email**: [aravindhms1@gmail.com](mailto:aravindhms1@gmail.com)
- **LinkedIn**: [linkedin.com/in/aravindhms](https://www.linkedin.com/in/aravindhms)
- **GitHub**: [github.com/aravindhms](https://github.com/aravindhms)
- **Instagram**: [instagram.com/aravindhms](https://www.instagram.com/aravindhms/)
- **Location**: Gowrivakkam, Chennai, India

---

## 📄 License

This repository is maintained by [Aravindh MS](https://github.com/aravindhms). Licensed under the MIT License.

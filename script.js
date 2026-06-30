/*
  Lightweight JavaScript for:
  - mobile navigation
  - dark/light theme toggle with localStorage
  - English/Vietnamese language toggle with localStorage
  - reveal effects
  - active navigation links
  - terminal text rotation
*/

const root = document.documentElement;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const typingText = document.getElementById("typing-text");
const currentYear = document.getElementById("current-year");
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const themeText = document.querySelector(".theme-text");
const langToggle = document.querySelector(".lang-toggle");
const langCurrent = document.querySelector(".lang-current");

const STORAGE_KEYS = {
  theme: "hqt-portfolio-theme",
  language: "hqt-portfolio-language",
};

const translations = {
  en: {
    "control.themeDark": "Dark",
    "control.themeLight": "Light",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.writeups": "Write-ups",
    "nav.notes": "Notes",
    "nav.roadmap": "Roadmap",
    "nav.contact": "Contact",
    "hero.eyebrow": "Cybersecurity Portfolio",
    "hero.title": "Hi, I'm <span>Ho Quoc Thai</span>",
    "hero.role": "Network Security Student | SOC Analyst in Training | CTF Player",
    "hero.description": "I am a cybersecurity learner focusing on SOC analysis, log investigation, threat detection, and hands-on security labs.",
    "hero.viewProjects": "View Projects",
    "hero.readWriteups": "Read Write-ups",
    "hero.metric1": "Alert triage",
    "hero.metric2": "Wazuh labs",
    "hero.metric3": "Write-ups",
    "terminal.line1": "Analyzing logs...",
    "terminal.line2": "Mapping alerts to MITRE ATT&CK...",
    "terminal.line3": "Investigating suspicious PowerShell activity...",
    "terminal.line4": "Building detection rules...",
    "terminal.messages": [
      "Monitoring suspicious events",
      "Reviewing authentication logs",
      "Checking IOCs and context",
      "Documenting investigation notes",
      "Improving detection logic",
    ],
    "about.eyebrow": "About",
    "about.title": "Focused on practical security investigation",
    "about.p1": "I am a network security student currently training to become a SOC Analyst. My learning path focuses on analyzing security events, investigating logs, understanding attacker techniques, and building practical detection skills through labs, CTFs, and real-world security scenarios.",
    "about.p2": "I enjoy learning by doing: building labs, solving CTF challenges, writing reports, documenting findings, and improving my ability to investigate security incidents.",
    "about.tag1": "Threat Detection",
    "about.tag2": "Log Investigation",
    "about.tag3": "Digital Forensics",
    "about.tag4": "Security Labs",
    "skills.eyebrow": "Skills",
    "skills.title": "Technical skill areas",
    "skills.subtitle": "Organized around SOC work, operating system fundamentals, security practice, and tools.",
    "skills.socTitle": "SOC & Blue Team",
    "skills.soc1": "Log analysis",
    "skills.soc2": "Alert triage",
    "skills.soc3": "Incident investigation",
    "skills.soc7": "Detection logic",
    "skills.osTitle": "Operating Systems",
    "skills.os1": "Windows logs",
    "skills.os2": "Linux logs",
    "skills.os3": "PowerShell basics",
    "skills.os4": "Bash basics",
    "skills.practiceTitle": "Security Practice",
    "skills.practice2": "Digital forensics",
    "skills.practice3": "Web security testing",
    "skills.practice4": "Basic malware analysis",
    "skills.practice5": "CTF problem solving",
    "skills.toolsTitle": "Tools",
    "projects.eyebrow": "Projects",
    "projects.title": "Hands-on cybersecurity projects",
    "projects.subtitle": "Practical labs and documentation focused on investigation, detection, and evidence-based analysis.",
    "projects.p1Type": "Blue Team Lab",
    "projects.p1Title": "SOC Alert Investigation Lab",
    "projects.p1Desc": "A hands-on lab focused on analyzing security alerts, reviewing logs, identifying suspicious behavior, and classifying alerts as false positive or true positive.",
    "projects.p2Type": "Windows Security",
    "projects.p2Title": "Windows Log Analysis with Sysmon",
    "projects.p2Desc": "A practical project for collecting and analyzing Windows event logs using Sysmon to detect suspicious PowerShell execution, process creation, and file activity.",
    "projects.p3Type": "Documentation",
    "projects.p3Title": "CTF Write-ups Collection",
    "projects.p3Desc": "A collection of CTF write-ups covering web exploitation, forensics, OSINT, reversing basics, and security problem-solving methodology.",
    "projects.p4Type": "Malware Basics",
    "projects.p4Title": "Malware Behavior Analysis Notes",
    "projects.p4Desc": "Basic malware analysis notes documenting suspicious behaviors such as persistence, registry modification, command execution, and network indicators.",
    "writeups.eyebrow": "CTF Write-ups",
    "writeups.title": "Challenge notes and solving methodology",
    "writeups.subtitle": "Blog-style cards for documenting the problem, evidence, exploitation path, and lessons learned.",
    "writeups.c1Cat": "Web Exploitation",
    "writeups.c1Title": "File Upload Vulnerability Lab",
    "writeups.easy": "Difficulty: Easy",
    "writeups.medium": "Difficulty: Medium",
    "writeups.c1Desc": "Analyzing weak upload validation, identifying execution paths, and documenting controlled exploitation steps.",
    "writeups.c2Cat": "Digital Forensics",
    "writeups.c2Title": "Windows Registry Investigation",
    "writeups.c2Desc": "Reviewing registry artifacts, deleted traces, persistence indicators, and evidence extraction workflow.",
    "writeups.c3Title": "Public Source Investigation",
    "writeups.c3Desc": "Using public metadata, visible clues, and structured search methods without crossing privacy boundaries.",
    "writeups.c4Cat": "Reverse Engineering",
    "writeups.c4Title": "Basic Binary Analysis",
    "writeups.c4Desc": "Reading program behavior, identifying strings, checking file formats, and building a repeatable analysis process.",
    "writeups.readMore": "Read more",
    "notes.eyebrow": "Security Notes",
    "notes.title": "Short technical references",
    "notes.subtitle": "Concise notes for concepts, commands, detection logic, and investigation workflows.",
    "notes.n1": "PowerShell suspicious behavior",
    "notes.n2": "WMI Event Subscription",
    "notes.n3": "PsExec-like remote execution",
    "notes.n4": "Registry persistence",
    "notes.n5": "Wazuh decoder and rule writing",
    "notes.n6": "MITRE ATT&CK mapping",
    "notes.n7": "IOC investigation workflow",
    "roadmap.eyebrow": "Learning Roadmap",
    "roadmap.title": "Cybersecurity learning path",
    "roadmap.subtitle": "A practical path toward SOC analysis, detection engineering fundamentals, and stronger portfolio documentation.",
    "roadmap.s1": "Networking fundamentals",
    "roadmap.s2": "Linux and Windows fundamentals",
    "roadmap.s3": "Log analysis and SIEM basics",
    "roadmap.s4": "SOC alert triage",
    "roadmap.s5": "MITRE ATT&CK and threat detection",
    "roadmap.s6": "Digital forensics and malware basics",
    "roadmap.s7": "CTF practice and project documentation",
    "roadmap.s8": "Build a strong SOC Analyst portfolio",
    "contact.eyebrow": "Contact",
    "contact.title": "Connect and collaborate",
    "contact.subtitle": "For projects, write-ups, labs, and cybersecurity learning documentation.",
    "contact.closing": "Always learning. Always investigating. Always improving.",
    "footer.rights": "Cybersecurity portfolio.",
    "footer.backTop": "Back to top",
  },
  vi: {
    "control.themeDark": "Tối",
    "control.themeLight": "Sáng",
    "nav.about": "Giới thiệu",
    "nav.skills": "Kỹ năng",
    "nav.projects": "Dự án",
    "nav.writeups": "Write-up",
    "nav.notes": "Ghi chú",
    "nav.roadmap": "Lộ trình",
    "nav.contact": "Liên hệ",
    "hero.eyebrow": "Hồ sơ an toàn thông tin",
    "hero.title": "Xin chào, tôi là <span>Ho Quoc Thai</span>",
    "hero.role": "Sinh viên An ninh mạng | Định hướng SOC Analyst | CTF Player",
    "hero.description": "Tôi đang học an toàn thông tin, tập trung vào phân tích SOC, điều tra log, phát hiện mối đe dọa và thực hành qua các lab bảo mật.",
    "hero.viewProjects": "Xem dự án",
    "hero.readWriteups": "Đọc write-up",
    "hero.metric1": "Triage alert",
    "hero.metric2": "Lab Wazuh",
    "hero.metric3": "Write-up",
    "terminal.line1": "Đang phân tích log...",
    "terminal.line2": "Đang ánh xạ alert với MITRE ATT&CK...",
    "terminal.line3": "Đang điều tra PowerShell đáng ngờ...",
    "terminal.line4": "Đang xây dựng rule phát hiện...",
    "terminal.messages": [
      "Giám sát sự kiện đáng ngờ",
      "Rà soát log xác thực",
      "Kiểm tra IOC và ngữ cảnh",
      "Ghi chú kết quả điều tra",
      "Cải thiện logic phát hiện",
    ],
    "about.eyebrow": "Giới thiệu",
    "about.title": "Tập trung vào điều tra bảo mật thực tế",
    "about.p1": "Tôi là sinh viên ngành mạng và an toàn thông tin, hiện đang rèn luyện để trở thành SOC Analyst. Lộ trình học của tôi tập trung vào phân tích sự kiện bảo mật, điều tra log, hiểu kỹ thuật tấn công và xây dựng kỹ năng phát hiện thông qua lab, CTF và tình huống thực tế.",
    "about.p2": "Tôi thích học bằng cách thực hành: xây dựng lab, giải CTF, viết báo cáo, ghi chép phát hiện và cải thiện khả năng điều tra sự cố bảo mật.",
    "about.tag1": "Threat Detection",
    "about.tag2": "Điều tra log",
    "about.tag3": "Điều tra số",
    "about.tag4": "Security Lab",
    "skills.eyebrow": "Kỹ năng",
    "skills.title": "Nhóm kỹ năng kỹ thuật",
    "skills.subtitle": "Được tổ chức theo công việc SOC, nền tảng hệ điều hành, thực hành bảo mật và công cụ.",
    "skills.socTitle": "SOC & Blue Team",
    "skills.soc1": "Phân tích log",
    "skills.soc2": "Phân loại alert",
    "skills.soc3": "Điều tra sự cố",
    "skills.soc7": "Logic phát hiện",
    "skills.osTitle": "Hệ điều hành",
    "skills.os1": "Log Windows",
    "skills.os2": "Log Linux",
    "skills.os3": "PowerShell cơ bản",
    "skills.os4": "Bash cơ bản",
    "skills.practiceTitle": "Thực hành bảo mật",
    "skills.practice2": "Điều tra số",
    "skills.practice3": "Kiểm thử bảo mật web",
    "skills.practice4": "Phân tích malware cơ bản",
    "skills.practice5": "Giải quyết bài CTF",
    "skills.toolsTitle": "Công cụ",
    "projects.eyebrow": "Dự án",
    "projects.title": "Dự án an toàn thông tin thực hành",
    "projects.subtitle": "Các lab và tài liệu tập trung vào điều tra, phát hiện và phân tích dựa trên bằng chứng.",
    "projects.p1Type": "Blue Team Lab",
    "projects.p1Title": "SOC Alert Investigation Lab",
    "projects.p1Desc": "Lab thực hành phân tích alert bảo mật, rà soát log, nhận diện hành vi đáng ngờ và phân loại alert thành false positive hoặc true positive.",
    "projects.p2Type": "Windows Security",
    "projects.p2Title": "Phân tích Windows Log với Sysmon",
    "projects.p2Desc": "Dự án thực hành thu thập và phân tích Windows event log bằng Sysmon để phát hiện PowerShell đáng ngờ, process creation và hoạt động tạo file.",
    "projects.p3Type": "Tài liệu hóa",
    "projects.p3Title": "Bộ sưu tập CTF Write-up",
    "projects.p3Desc": "Tập hợp write-up CTF về web exploitation, forensics, OSINT, reversing cơ bản và phương pháp giải quyết vấn đề bảo mật.",
    "projects.p4Type": "Malware cơ bản",
    "projects.p4Title": "Ghi chú phân tích hành vi malware",
    "projects.p4Desc": "Ghi chú phân tích malware cơ bản, ghi lại các hành vi đáng ngờ như persistence, sửa registry, thực thi lệnh và dấu hiệu mạng.",
    "writeups.eyebrow": "CTF Write-up",
    "writeups.title": "Ghi chú challenge và phương pháp giải",
    "writeups.subtitle": "Các thẻ dạng blog để ghi lại đề bài, bằng chứng, hướng khai thác và bài học rút ra.",
    "writeups.c1Cat": "Web Exploitation",
    "writeups.c1Title": "File Upload Vulnerability Lab",
    "writeups.easy": "Độ khó: Dễ",
    "writeups.medium": "Độ khó: Trung bình",
    "writeups.c1Desc": "Phân tích kiểm tra upload yếu, xác định đường dẫn thực thi và ghi lại các bước khai thác có kiểm soát.",
    "writeups.c2Cat": "Digital Forensics",
    "writeups.c2Title": "Điều tra Windows Registry",
    "writeups.c2Desc": "Rà soát artifact trong registry, dấu vết bị xóa, chỉ dấu persistence và quy trình trích xuất bằng chứng.",
    "writeups.c3Title": "Điều tra nguồn công khai",
    "writeups.c3Desc": "Sử dụng metadata công khai, manh mối nhìn thấy được và phương pháp tìm kiếm có cấu trúc, không vượt ranh giới riêng tư.",
    "writeups.c4Cat": "Reverse Engineering",
    "writeups.c4Title": "Phân tích binary cơ bản",
    "writeups.c4Desc": "Đọc hành vi chương trình, xác định strings, kiểm tra định dạng file và xây dựng quy trình phân tích lặp lại được.",
    "writeups.readMore": "Đọc thêm",
    "notes.eyebrow": "Ghi chú bảo mật",
    "notes.title": "Tài liệu kỹ thuật ngắn",
    "notes.subtitle": "Ghi chú ngắn gọn về khái niệm, câu lệnh, logic phát hiện và quy trình điều tra.",
    "notes.n1": "Hành vi PowerShell đáng ngờ",
    "notes.n2": "WMI Event Subscription",
    "notes.n3": "Thực thi từ xa kiểu PsExec",
    "notes.n4": "Persistence qua Registry",
    "notes.n5": "Viết decoder và rule Wazuh",
    "notes.n6": "Ánh xạ MITRE ATT&CK",
    "notes.n7": "Quy trình điều tra IOC",
    "roadmap.eyebrow": "Lộ trình học",
    "roadmap.title": "Lộ trình học an toàn thông tin",
    "roadmap.subtitle": "Lộ trình thực hành hướng đến SOC analysis, nền tảng detection engineering và tài liệu hóa portfolio tốt hơn.",
    "roadmap.s1": "Nền tảng mạng máy tính",
    "roadmap.s2": "Nền tảng Linux và Windows",
    "roadmap.s3": "Phân tích log và SIEM cơ bản",
    "roadmap.s4": "Triage alert SOC",
    "roadmap.s5": "MITRE ATT&CK và threat detection",
    "roadmap.s6": "Điều tra số và malware cơ bản",
    "roadmap.s7": "Luyện CTF và tài liệu hóa dự án",
    "roadmap.s8": "Xây dựng portfolio SOC Analyst mạnh",
    "contact.eyebrow": "Liên hệ",
    "contact.title": "Kết nối và hợp tác",
    "contact.subtitle": "Dành cho dự án, write-up, lab và tài liệu học an toàn thông tin.",
    "contact.closing": "Luôn học hỏi. Luôn điều tra. Luôn cải thiện.",
    "footer.rights": "Cybersecurity portfolio.",
    "footer.backTop": "Lên đầu trang",
  },
};

let currentLanguage = localStorage.getItem(STORAGE_KEYS.language) || "en";
let currentTheme = localStorage.getItem(STORAGE_KEYS.theme) || "dark";
let messageIndex = 0;

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

function translate(key) {
  return translations[currentLanguage][key] ?? translations.en[key] ?? key;
}

function applyLanguage(language) {
  currentLanguage = language === "vi" ? "vi" : "en";
  localStorage.setItem(STORAGE_KEYS.language, currentLanguage);
  root.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = translate(element.dataset.i18n);
    if (typeof value === "string") element.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const value = translate(element.dataset.i18nHtml);
    if (typeof value === "string") element.innerHTML = value;
  });

  if (langCurrent) langCurrent.textContent = currentLanguage.toUpperCase();
  if (langToggle) langToggle.setAttribute("aria-pressed", String(currentLanguage === "vi"));

  messageIndex = 0;
  const messages = translate("terminal.messages");
  if (typingText && Array.isArray(messages)) typingText.textContent = messages[0];

  updateThemeButton();
}

function getPreferredTheme() {
  const stored = localStorage.getItem(STORAGE_KEYS.theme);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme) {
  currentTheme = theme === "light" ? "light" : "dark";
  root.dataset.theme = currentTheme;
  localStorage.setItem(STORAGE_KEYS.theme, currentTheme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", currentTheme === "dark" ? "#071018" : "#f5f8fb");
  updateThemeButton();
}

function updateThemeButton() {
  if (!themeToggle || !themeIcon || !themeText) return;
  const isLight = currentTheme === "light";
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  themeIcon.textContent = isLight ? "☀" : "☾";
  themeText.textContent = isLight ? translate("control.themeLight") : translate("control.themeDark");
}

applyTheme(getPreferredTheme());
applyLanguage(currentLanguage);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    applyLanguage(currentLanguage === "en" ? "vi" : "en");
  });
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", (event) => {
  if (!navLinks || !navToggle || !navLinks.classList.contains("open")) return;
  const clickedInsideNav = navLinks.contains(event.target) || navToggle.contains(event.target);
  if (!clickedInsideNav) {
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const activeLinkObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navItems.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add("active");
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((section) => activeLinkObserver.observe(section));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

function rotateTerminalText() {
  const messages = translate("terminal.messages");
  if (!typingText || !Array.isArray(messages)) return;
  messageIndex = (messageIndex + 1) % messages.length;
  typingText.textContent = messages[messageIndex];
}

setInterval(rotateTerminalText, 2800);

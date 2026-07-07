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
const langFlag = document.querySelector(".lang-flag");

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
    "hero.eyebrow": "Hi, this is",
    "hero.name": "Quoc Thai",
    "hero.role": "Network Security Student | CTF Player",
    "hero.description": "I am a cybersecurity learner focusing on SOC analysis, log investigation, and hands-on security labs.",
    "hero.description2": "I like to document what I learn along the way: small experiments, CTF write-ups, and the occasional late-night debugging session.",
    "hero.quote": "No system is unbreakable — only unexplored.",
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
    "projects.title": "Academic and hands-on security projects",
    "projects.subtitle": "Selected projects focused on infrastructure, monitoring, system security, and intrusion detection.",

    "projects.p1Type": "Infrastructure Project",
    "projects.p1Title": "Designing and Implementing High Availability (HA) Solutions for Network Services on Windows Server 2019",
    "projects.p1Desc": "Designed and implemented a high availability solution for Windows Server 2019 network services, focusing on redundancy, continuity, and resilient service deployment.",

    "projects.p2Type": "System Security",
    "projects.p2Title": "Deploying and Evaluating the Security of a Linux System Using Lynis",
    "projects.p2Desc": "Deployed a Linux environment and used Lynis to audit, assess, and improve system security through hardening and configuration review.",

    "projects.p3Type": "Monitoring Project",
    "projects.p3Title": "Designing and Implementing a Network Monitoring System with LibreNMS",
    "projects.p3Desc": "Built a network monitoring system using LibreNMS to observe device health, network availability, and operational status in a centralized dashboard.",

    "projects.p4Type": "Detection Project",
    "projects.p4Title": "Design and Implementation of an AI-Based Network Intrusion Detection System Using pfSense Firewall and ELK Stack",
    "projects.p4Desc": "Designed an intrusion detection workflow combining pfSense and the ELK Stack to collect, analyze, and visualize network security events for anomaly detection.",
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
    "notes.legendActive": "Active alert node",
    "notes.legendHover": "Hover to inspect incident",
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
    "roadmap.s1Desc": "TCP/IP, routing, switching, DNS, HTTP, ports and basic network troubleshooting.",
    "roadmap.s2Desc": "Operating system basics, users, services, permissions, logs and command-line workflow.",
    "roadmap.s3Desc": "Collecting, reading and correlating security logs through SIEM investigation workflows.",
    "roadmap.s4Desc": "Classifying alerts, reviewing context, reducing false positives and escalating real incidents.",
    "roadmap.s5Desc": "Mapping behavior to tactics and techniques, then improving detection coverage.",
    "roadmap.s6Desc": "Reviewing artifacts, persistence traces, file behavior, suspicious commands and IOCs.",
    "roadmap.s7Desc": "Solving challenges, writing reports, documenting evidence and building repeatable notes.",
    "roadmap.s8Desc": "Publishing labs, write-ups, detection notes and practical investigation projects.",
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
    "hero.eyebrow": "Xin chào, mình là",
    "hero.name": "Quốc Thái",
    "hero.role": "Sinh viên An ninh mạng | Định hướng SOC Analyst | CTF Player",
    "hero.description": "Tôi đang học an toàn thông tin, tập trung vào phân tích SOC, điều tra log, phát hiện mối đe dọa và thực hành qua các lab bảo mật.",
    "hero.description2": "Mình thích ghi lại những gì đã học được: các thử nghiệm nhỏ, write-up CTF, và cả những đêm ngồi debug đến khuya.",
    "hero.quote": "Không có hệ thống nào bất khả xâm phạm — chỉ là chưa ai khám phá ra.",
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
    "projects.title": "Các dự án học thuật và thực hành bảo mật",
    "projects.subtitle": "Một số dự án tiêu biểu tập trung vào hạ tầng, giám sát mạng, bảo mật hệ thống và phát hiện xâm nhập.",
    "projects.p1Type": "Dự án hạ tầng",
    "projects.p1Title": "Thiết kế và triển khai giải pháp High Availability (HA) cho các dịch vụ mạng trên Windows Server 2019",
    "projects.p1Desc": "Thiết kế và triển khai giải pháp HA cho các dịch vụ mạng trên Windows Server 2019, tập trung vào tính dự phòng, tính liên tục và khả năng vận hành ổn định của hệ thống.",
    "projects.p2Type": "Bảo mật hệ thống",
    "projects.p2Title": "Triển khai và đánh giá bảo mật hệ thống Linux bằng Lynis",
    "projects.p2Desc": "Triển khai môi trường Linux và sử dụng Lynis để kiểm tra, đánh giá và cải thiện mức độ an toàn của hệ thống thông qua hardening và rà soát cấu hình.",
    "projects.p3Type": "Dự án giám sát",
    "projects.p3Title": "Thiết kế và triển khai hệ thống giám sát mạng với LibreNMS",
    "projects.p3Desc": "Xây dựng hệ thống giám sát mạng bằng LibreNMS để theo dõi trạng thái thiết bị, khả năng sẵn sàng của mạng và hoạt động hệ thống trên một dashboard tập trung.",
    "projects.p4Type": "Dự án phát hiện",
    "projects.p4Title": "Thiết kế và triển khai hệ thống phát hiện xâm nhập mạng dựa trên AI sử dụng pfSense Firewall và ELK Stack",
    "projects.p4Desc": "Thiết kế quy trình phát hiện xâm nhập kết hợp pfSense và ELK Stack để thu thập, phân tích và trực quan hóa các sự kiện an ninh mạng phục vụ phát hiện bất thường.",
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
    "notes.legendActive": "Điểm cảnh báo đang hoạt động",
    "notes.legendHover": "Rê chuột để xem sự kiện",
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
    "roadmap.s1Desc": "TCP/IP, routing, switching, DNS, HTTP, port và xử lý sự cố mạng cơ bản.",
    "roadmap.s2Desc": "Nền tảng hệ điều hành, user, service, permission, log và thao tác dòng lệnh.",
    "roadmap.s3Desc": "Thu thập, đọc và liên kết log bảo mật thông qua quy trình điều tra trên SIEM.",
    "roadmap.s4Desc": "Phân loại alert, rà soát ngữ cảnh, giảm false positive và escalation sự cố thật.",
    "roadmap.s5Desc": "Ánh xạ hành vi vào tactic và technique, sau đó cải thiện độ phủ phát hiện.",
    "roadmap.s6Desc": "Rà soát artifact, dấu vết persistence, hành vi file, lệnh đáng ngờ và IOC.",
    "roadmap.s7Desc": "Giải challenge, viết báo cáo, ghi lại bằng chứng và xây dựng ghi chú lặp lại được.",
    "roadmap.s8Desc": "Công bố lab, write-up, ghi chú detection và các dự án điều tra thực hành.",
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

  if (langFlag) {
    langFlag.src = currentLanguage === "vi" ? "assets/flags/vn.svg" : "assets/flags/gb.svg";
    langFlag.alt = currentLanguage === "vi" ? "Vietnamese flag" : "UK flag";
  }
  if (langToggle) {
    langToggle.setAttribute("aria-pressed", String(currentLanguage === "vi"));
    langToggle.setAttribute(
      "aria-label",
      currentLanguage === "vi" ? "Switch to English" : "Switch to Vietnamese"
    );
  }

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
// Hacker-style floating background symbols
(() => {
  const securityBgLayer = document.querySelector(".security-bg-icons");

  if (!securityBgLayer) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) return;

  const hackerSymbols = [
    "</>",
    "<script>",
    "</script>",
    "{ }",
    "[ ]",
    "( )",
    ">_",
    "$ sudo",
    "root@kali",
    "whoami",
    "nmap -sV",
    "tcpdump",
    "grep",
    "chmod +x",
    "0x00",
    "0x1F",
    "0xDEAD",
    "CVE",
    "IOC",
    "SOC",
    "SIEM",
    "WAZUH",
    "MITRE",
    "ATT&CK",
    "YARA",
    "PCAP",
    "HASH",
    "DNS",
    "TLS",
    "HTTP",
    "403",
    "404",
    "500",
    "ALERT",
    "RULE",
    "LOG",
    "SHA256",
    "PowerShell",
    "Sysmon",
    "EventID",
    "cmd.exe",
    "payload",
    "reverse shell",
    "priv_esc",
    "detect()",
    "scan()",
    "analyze()",
    "triage()"
  ];

  const colorClasses = ["cyan", "blue", "green", "muted", "strong"];

  function getSymbolCount() {
    if (window.innerWidth <= 480) return 12;
    if (window.innerWidth <= 768) return 18;
    if (window.innerWidth <= 1024) return 24;
    return 34;
  }

  function createHackerSymbol() {
    const symbol = document.createElement("span");
    const text = hackerSymbols[Math.floor(Math.random() * hackerSymbols.length)];
    const color = colorClasses[Math.floor(Math.random() * colorClasses.length)];

    symbol.className = `security-float-icon ${color}`;
    symbol.textContent = text;

    const x = Math.random() * 100;
    const y = 65 + Math.random() * 45;
    const drift = Math.round((Math.random() - 0.5) * 260);
    const rotate = Math.round((Math.random() - 0.5) * 42);
    const duration = 24 + Math.random() * 32;
    const delay = Math.random() * -duration;
    const blinkDuration = 2.4 + Math.random() * 3.2;
    const blinkDelay = Math.random() * -blinkDuration;
    const size = text.length > 10
      ? 10 + Math.random() * 5
      : 12 + Math.random() * 10;
    const isLightTheme = document.documentElement.dataset.theme === "light";
    const opacity = isLightTheme
      ? 0.22 + Math.random() * 0.16
      : 0.08 + Math.random() * 0.12;

    symbol.style.setProperty("--x", `${x.toFixed(2)}vw`);
    symbol.style.setProperty("--y", `${y.toFixed(2)}vh`);
    symbol.style.setProperty("--drift", `${drift}px`);
    symbol.style.setProperty("--rotate", `${rotate}deg`);
    symbol.style.setProperty("--duration", `${duration.toFixed(2)}s`);
    symbol.style.setProperty("--delay", `${delay.toFixed(2)}s`);
    symbol.style.setProperty("--blink-duration", `${blinkDuration.toFixed(2)}s`);
    symbol.style.setProperty("--blink-delay", `${blinkDelay.toFixed(2)}s`);
    symbol.style.setProperty("--size", `${size.toFixed(0)}px`);
    symbol.style.setProperty("--opacity", opacity.toFixed(2));

    return symbol;
  }

  function renderHackerSymbols() {
    securityBgLayer.innerHTML = "";

    const count = getSymbolCount();

    for (let i = 0; i < count; i += 1) {
      securityBgLayer.appendChild(createHackerSymbol());
    }
  }

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        renderHackerSymbols();
      }, 300);
    },
    { passive: true }
  );

  renderHackerSymbols();
})();
// Link YAML skill lines with technology cards
(() => {
  const techLines = document.querySelectorAll(".code-line[data-tech]");
  const techCards = document.querySelectorAll(".tech-item[data-tech-card]");

  if (!techLines.length || !techCards.length) return;

  function clearTechHighlights() {
    techLines.forEach((line) => line.classList.remove("is-linked"));
    techCards.forEach((card) => card.classList.remove("is-linked"));
  }

  function highlightTech(tech) {
    clearTechHighlights();

    document
      .querySelectorAll(`.code-line[data-tech="${tech}"]`)
      .forEach((line) => line.classList.add("is-linked"));

    document
      .querySelectorAll(`.tech-item[data-tech-card="${tech}"]`)
      .forEach((card) => card.classList.add("is-linked"));
  }

  techLines.forEach((line) => {
    line.addEventListener("mouseenter", () => {
      highlightTech(line.dataset.tech);
    });

    line.addEventListener("mouseleave", clearTechHighlights);
  });

  techCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      highlightTech(card.dataset.techCard);
    });

    card.addEventListener("mouseleave", clearTechHighlights);
  });
})();
// Skills console panel switch + linked technology highlights
(() => {
  const navButtons = document.querySelectorAll(".console-nav-item[data-skill-panel]");
  const panels = document.querySelectorAll(".skills-panel[data-panel]");
  const skillCards = document.querySelectorAll(".skill-detail-card");
  const techSources = document.querySelectorAll("[data-tech]");
  const techCards = document.querySelectorAll(".tech-item[data-tech-card]");

  if (!navButtons.length || !panels.length) return;

  function clearTechHighlights() {
    techCards.forEach((card) => card.classList.remove("is-linked"));
    techSources.forEach((item) => item.classList.remove("is-linked"));
  }

  function highlightTech(tech) {
    clearTechHighlights();

    document.querySelectorAll(`[data-tech="${tech}"]`).forEach((item) => {
      item.classList.add("is-linked");
    });

    document.querySelectorAll(`.tech-item[data-tech-card="${tech}"]`).forEach((card) => {
      card.classList.add("is-linked");
    });
  }

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const panelName = button.dataset.skillPanel;

      navButtons.forEach((item) => item.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("active"));

      button.classList.add("active");
      document.querySelector(`.skills-panel[data-panel="${panelName}"]`)?.classList.add("active");
      clearTechHighlights();
    });
  });

  skillCards.forEach((card) => {
    card.addEventListener("click", () => {
      skillCards.forEach((item) => {
        if (item !== card) item.classList.remove("open");
      });

      card.classList.toggle("open");
    });
  });

  techSources.forEach((source) => {
    source.addEventListener("mouseenter", () => highlightTech(source.dataset.tech));
    source.addEventListener("mouseleave", clearTechHighlights);
  });

  techCards.forEach((card) => {
    card.addEventListener("mouseenter", () => highlightTech(card.dataset.techCard));
    card.addEventListener("mouseleave", clearTechHighlights);
  });
})();

// Final Skills dashboard interaction: tabs + technology highlighting
(() => {
  const tabs = document.querySelectorAll('.skill-mode-tab[data-skill-mode]');
  const panels = document.querySelectorAll('.skill-mode-panel[data-skill-panel]');
  const highlightSources = document.querySelectorAll('.capability-unit[data-tech-targets], .tool-tile-pro[data-tech-targets]');
  const techCards = document.querySelectorAll('.tech-orb[data-tech-card]');

  if (!tabs.length || !panels.length) return;

  function clearHighlights() {
    highlightSources.forEach((item) => item.classList.remove('is-linked'));
    techCards.forEach((card) => card.classList.remove('is-linked'));
  }

  function highlightTargets(targetString, source) {
    clearHighlights();
    if (source) source.classList.add('is-linked');
    const targets = (targetString || '').split(/\s+/).filter(Boolean);
    targets.forEach((target) => {
      document.querySelectorAll(`.tech-orb[data-tech-card="${target}"]`).forEach((card) => {
        card.classList.add('is-linked');
      });
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const mode = tab.dataset.skillMode;
      tabs.forEach((item) => item.classList.remove('active'));
      panels.forEach((panel) => panel.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`.skill-mode-panel[data-skill-panel="${mode}"]`)?.classList.add('active');
      clearHighlights();
    });
  });

  highlightSources.forEach((source) => {
    source.addEventListener('mouseenter', () => highlightTargets(source.dataset.techTargets, source));
    source.addEventListener('mouseleave', clearHighlights);
    source.addEventListener('focusin', () => highlightTargets(source.dataset.techTargets, source));
    source.addEventListener('focusout', clearHighlights);
  });

  techCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      const tech = card.dataset.techCard;
      clearHighlights();
      card.classList.add('is-linked');
      highlightSources.forEach((source) => {
        if ((source.dataset.techTargets || '').split(/\s+/).includes(tech)) {
          source.classList.add('is-linked');
        }
      });
    });
    card.addEventListener('mouseleave', clearHighlights);
  });
})();
/* =========================================================
   Threat map hover popup with EN / VI support
   ========================================================= */

(() => {
  const threatData = {
    en: [
      {
        category: "Web Exploitation",
        severity: "Critical",
        region: "United States",
        title: "Critical file transfer vulnerability exploitation",
        summary:
          "Large-scale exploitation of a file transfer platform vulnerability led to widespread incident response and urgent containment.",
        date: "May 2023",
        cve: "CVE-2023-34362"
      },
      {
        category: "Ransomware Activity",
        severity: "High",
        region: "Brazil",
        title: "Regional ransomware deployment campaign",
        summary:
          "Coordinated ransomware activity disrupted operations and forced rapid containment, isolation, and recovery planning.",
        date: "Jul 2021",
        cve: "Multi-stage intrusion"
      },
      {
        category: "Threat Intelligence",
        severity: "Medium",
        region: "Germany",
        title: "Campaign mapped to MITRE ATT&CK techniques",
        summary:
          "Observed intrusion activity was mapped to ATT&CK tactics and techniques to improve detection coverage and analyst reporting.",
        date: "Oct 2022",
        cve: "ATT&CK mapping"
      },
      {
        category: "Persistence Investigation",
        severity: "High",
        region: "Kenya",
        title: "Suspicious persistence execution chain detected",
        summary:
          "Investigation identified repeated execution behavior tied to stealthy persistence and suspicious task configuration.",
        date: "Mar 2024",
        cve: "Persistence pattern"
      },
      {
        category: "Supply Chain Security",
        severity: "Critical",
        region: "Japan",
        title: "High-impact enterprise software vulnerability",
        summary:
          "A severe vulnerability triggered urgent patching, exposure review, and threat hunting across enterprise environments.",
        date: "Dec 2021",
        cve: "CVE-2021-44228"
      },
      {
        category: "Recon Monitoring",
        severity: "Medium",
        region: "Australia",
        title: "Suspicious internet-facing reconnaissance activity",
        summary:
          "Repeated scanning and service probing activity was observed and escalated for monitoring, tuning, and IOC validation.",
        date: "Jun 2024",
        cve: "Recon activity"
      }
    ],

    vi: [
      {
        category: "Khai thác web",
        severity: "Nghiêm trọng",
        region: "Hoa Kỳ",
        title: "Khai thác lỗ hổng nghiêm trọng trên nền tảng truyền tệp",
        summary:
          "Hoạt động khai thác quy mô lớn nhắm vào một nền tảng truyền tệp đã dẫn đến rò rỉ dữ liệu và yêu cầu phản ứng sự cố khẩn cấp.",
        date: "05/2023",
        cve: "CVE-2023-34362"
      },
      {
        category: "Hoạt động ransomware",
        severity: "Cao",
        region: "Brazil",
        title: "Chiến dịch triển khai ransomware theo khu vực",
        summary:
          "Một chiến dịch ransomware có tổ chức đã làm gián đoạn hoạt động hệ thống, buộc đội ngũ phải nhanh chóng cô lập, khoanh vùng và khôi phục.",
        date: "07/2021",
        cve: "Xâm nhập nhiều giai đoạn"
      },
      {
        category: "Tình báo mối đe dọa",
        severity: "Trung bình",
        region: "Đức",
        title: "Chiến dịch được ánh xạ theo MITRE ATT&CK",
        summary:
          "Hoạt động xâm nhập được ánh xạ với các tactic và technique trong MITRE ATT&CK nhằm cải thiện khả năng phát hiện và báo cáo phân tích.",
        date: "10/2022",
        cve: "Ánh xạ ATT&CK"
      },
      {
        category: "Điều tra persistence",
        severity: "Cao",
        region: "Kenya",
        title: "Phát hiện chuỗi thực thi persistence đáng ngờ",
        summary:
          "Quá trình điều tra ghi nhận hành vi thực thi lặp lại liên quan đến persistence ẩn và cấu hình tác vụ đáng ngờ.",
        date: "03/2024",
        cve: "Mẫu hành vi persistence"
      },
      {
        category: "Bảo mật chuỗi cung ứng",
        severity: "Nghiêm trọng",
        region: "Nhật Bản",
        title: "Lỗ hổng nghiêm trọng ảnh hưởng phần mềm doanh nghiệp",
        summary:
          "Một lỗ hổng nghiêm trọng buộc các hệ thống phải ưu tiên vá lỗi, rà soát bề mặt tấn công và săn tìm dấu hiệu khai thác.",
        date: "12/2021",
        cve: "CVE-2021-44228"
      },
      {
        category: "Giám sát trinh sát",
        severity: "Trung bình",
        region: "Úc",
        title: "Phát hiện hoạt động dò quét hạ tầng public-facing",
        summary:
          "Nhiều hành vi quét dịch vụ và thăm dò hệ thống public-facing được ghi nhận, sau đó được đưa vào quy trình giám sát và xác minh IOC.",
        date: "06/2024",
        cve: "Hoạt động reconnaissance"
      }
    ]
  };

  const mapStage = document.querySelector(".threat-map-stage");
  const pins = document.querySelectorAll(".map-pin");
  const card = document.getElementById("threatHoverCard");
  const connector = document.getElementById("threatConnector");

  const hoverSeverity = document.getElementById("hoverSeverity");
  const hoverRegion = document.getElementById("hoverRegion");
  const hoverCategory = document.getElementById("hoverCategory");
  const hoverTitle = document.getElementById("hoverTitle");
  const hoverSummary = document.getElementById("hoverSummary");
  const hoverDate = document.getElementById("hoverDate");
  const hoverCVE = document.getElementById("hoverCVE");

  if (!mapStage || !pins.length || !card || !connector) return;

  let activeThreatIndex = 0;

  function getCurrentThreatLanguage() {
    return currentLanguage === "vi" ? "vi" : "en";
  }

  function setCardContent(index) {
    const lang = getCurrentThreatLanguage();
    const item = threatData[lang][index];

    if (!item) return;

    activeThreatIndex = index;

    hoverSeverity.textContent = item.severity;
    hoverRegion.textContent = item.region;
    hoverCategory.textContent = item.category;
    hoverTitle.textContent = item.title;
    hoverSummary.textContent = item.summary;
    hoverDate.textContent = item.date;
    hoverCVE.textContent = item.cve;
  }

  function placePopup(pin) {
    const mapRect = mapStage.getBoundingClientRect();
    const pinRect = pin.getBoundingClientRect();

    const pinCenterX = pinRect.left - mapRect.left + pinRect.width / 2;
    const pinCenterY = pinRect.top - mapRect.top + pinRect.height / 2;

    const cardWidth = Math.min(360, mapRect.width - 40);
    const cardHeight = Math.min(220, mapRect.height - 40);

    let cardLeft = pinCenterX + 42;
    let cardTop = pinCenterY - cardHeight / 2;

    if (cardLeft + cardWidth > mapRect.width - 20) {
      cardLeft = pinCenterX - cardWidth - 42;
    }

    if (cardLeft < 20) cardLeft = 20;
    if (cardTop < 20) cardTop = 20;

    if (cardTop + cardHeight > mapRect.height - 20) {
      cardTop = mapRect.height - cardHeight - 20;
    }

    card.style.left = `${cardLeft}px`;
    card.style.top = `${cardTop}px`;

    const cardAnchorX = cardLeft > pinCenterX ? cardLeft : cardLeft + cardWidth;
    const cardAnchorY = cardTop + cardHeight / 2;

    const dx = cardAnchorX - pinCenterX;
    const dy = cardAnchorY - pinCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    connector.style.left = `${pinCenterX}px`;
    connector.style.top = `${pinCenterY}px`;
    connector.style.width = `${distance}px`;
    connector.style.transform = `rotate(${angle}deg)`;
    connector.style.opacity = "1";

    card.classList.add("show");
  }

  function showPopup(pin) {
    const idx = Number(pin.dataset.threat);

    setCardContent(idx);

    pins.forEach((item) => item.classList.remove("active"));
    pin.classList.add("active");

    placePopup(pin);
  }

  function hidePopup() {
    card.classList.remove("show");
    connector.style.opacity = "0";
    pins.forEach((pin) => pin.classList.remove("active"));
  }

  pins.forEach((pin) => {
    pin.addEventListener("mouseenter", () => showPopup(pin));
    pin.addEventListener("click", () => showPopup(pin));

    pin.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (!card.matches(":hover")) hidePopup();
      }, 120);
    });
  });

  card.addEventListener("mouseleave", hidePopup);

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      setTimeout(() => {
        setCardContent(activeThreatIndex);
      }, 80);
    });
  }

  setCardContent(0);
})();
// ==========================================================================
// Netify Computer Lab - Course Enquiry Portal (MVP Script)
// ==========================================================================

// Placeholder WhatsApp Business Number (International format: digits only, no '+' or spaces)
const LAB_WHATSAPP_NUMBER = "15550192834";

// Strictly Placeholder Course Data (MVP Scope)
const coursesData = [
  {
    id: "web-dev",
    title: "Web Development",
    duration: "8 Weeks (Placeholder) • Mon/Wed/Fri",
    shortSummary:
      "Learn to build responsive, modern websites from scratch using HTML5, CSS3, Tailwind, and JavaScript.",
    fullSummary:
      "A practical foundation in front-end web engineering. Students build real mobile-friendly interfaces inside Netify Computer Lab with guided code reviews.",
    topics: [
      "Semantic HTML5 structure & web accessibility",
      "Responsive layouts with CSS Grid, Flexbox & Tailwind CSS",
      "Interactive DOM manipulation using JavaScript (ES6+)",
      "Deploying static websites to live cloud hosts",
    ],
    whatsappMessage:
      "Hello Netify Computer Lab! I would like to enquire about the Web Development course (Duration: 8 Weeks placeholder). Please share upcoming batch details.",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    duration: "6 Weeks (Placeholder) • Tue/Thu",
    shortSummary:
      "Master search engine optimization (SEO), social media campaigns, content strategy, and analytics.",
    fullSummary:
      "Designed for aspiring marketers and business owners looking to drive measurable online traffic and understand digital customer acquisition funnels.",
    topics: [
      "Search Engine Optimization (On-page & Keyword Research)",
      "Social Media Marketing & Content Calendar Planning",
      "Introduction to Paid Search & Social Ad Campaigns",
      "Traffic measurement with Google Analytics fundamentals",
    ],
    whatsappMessage:
      "Hello Netify Computer Lab! I would like to enquire about the Digital Marketing course (Duration: 6 Weeks placeholder). Please share upcoming batch details.",
  },
  {
    id: "ai-basics",
    title: "AI Basics",
    duration: "4 Weeks (Placeholder) • Weekend Lab",
    shortSummary:
      "Understand core Artificial Intelligence concepts, prompt engineering, and everyday productivity workflows.",
    fullSummary:
      "A non-intimidating introduction to generative AI, large language models, and ethical AI usage for students and working professionals.",
    topics: [
      "How Large Language Models (LLMs) and AI tools work",
      "Structured Prompt Engineering for research & writing",
      "AI-assisted workflows for office & study productivity",
      "Data privacy, bias awareness, and responsible AI use",
    ],
    whatsappMessage:
      "Hello Netify Computer Lab! I would like to enquire about the AI Basics course (Duration: 4 Weeks placeholder). Please share upcoming batch details.",
  },
];

// ==========================================================================
// 1. WhatsApp Deep-Link Generator
// ==========================================================================
function buildWhatsAppUrl(message) {
  const cleanNumber = LAB_WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

// ==========================================================================
// 2. Render Course Cards
// ==========================================================================
function renderCourses() {
  const grid = document.getElementById("courses-grid");
  if (!grid) return;

  grid.innerHTML = coursesData
    .map(
      (course) => `
    <article class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between p-6">
      <div>
        <span class="inline-block bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          ${course.duration}
        </span>
        <h3 class="text-xl font-bold text-slate-900 mb-2">${course.title}</h3>
        <p class="text-slate-600 text-sm mb-6 leading-relaxed">
          ${course.shortSummary}
        </p>
      </div>
      
      <div class="space-y-2.5 pt-4 border-t border-slate-100">
        <!-- Step 2: Inspect Course Details -->
        <button type="button" data-course-id="${course.id}"
          class="view-details-btn w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500">
          View Syllabus &amp; Details
        </button>
        
        <!-- Direct Step 3 Shortcut: Immediate WhatsApp Enquiry -->
        <a href="${buildWhatsAppUrl(course.whatsappMessage)}" target="_blank" rel="noopener noreferrer"
          class="w-full block text-center bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold py-2.5 px-4 rounded-lg text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500">
          Quick WhatsApp Enquiry &rarr;
        </a>
      </div>
    </article>
  `
    )
    .join("");

  // Attach click listeners cleanly via event delegation
  grid.querySelectorAll(".view-details-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const courseId = button.getAttribute("data-course-id");
      openCourseModal(courseId);
    });
  });
}

// ==========================================================================
// 3. Course Details Modal Logic
// ==========================================================================
let lastFocusedElement = null;

function openCourseModal(courseId) {
  const modal = document.getElementById("course-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const course = coursesData.find((c) => c.id === courseId);

  if (!modal || !course) return;

  lastFocusedElement = document.activeElement;

  document.getElementById("modal-duration").textContent = course.duration;
  document.getElementById("modal-title").textContent = course.title;
  document.getElementById("modal-description").textContent = course.fullSummary;

  const topicsList = document.getElementById("modal-topics");
  topicsList.innerHTML = course.topics
    .map((topic) => `<li>${topic}</li>`)
    .join("");

  const whatsappLink = document.getElementById("modal-whatsapp-link");
  whatsappLink.href = buildWhatsAppUrl(course.whatsappMessage);

  // Show modal & lock background scrolling
  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");

  if (closeModalBtn) {
    closeModalBtn.focus();
  }
}

function closeCourseModal() {
  const modal = document.getElementById("course-modal");
  if (!modal || modal.classList.contains("hidden")) return;

  modal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");

  // Restore keyboard focus to the button that opened the modal
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

function setupModalControls() {
  const modal = document.getElementById("course-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");

  if (!modal) return;

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeCourseModal);
  }

  // Close when clicking the dark backdrop outside the modal card
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeCourseModal();
    }
  });

  // Close when pressing the Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeCourseModal();
    }
  });
}

// ==========================================================================
// 4. Mobile Navigation Menu Toggle
// ==========================================================================
function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener("click", () => {
    const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
    mobileMenuBtn.setAttribute("aria-expanded", String(!isExpanded));
    mobileMenu.classList.toggle("hidden");
  });

  // Automatically close drawer when a navigation link is tapped
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// ==========================================================================
// 5. FAQ Accordion Logic
// ==========================================================================
function setupFaqAccordion() {
  const faqButtons = document.querySelectorAll(".faq-toggle");

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector(".faq-icon");
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!isExpanded));
      if (content) content.classList.toggle("hidden");
      if (icon) icon.textContent = isExpanded ? "+" : "−";
    });
  });
}

// ==========================================================================
// 6. Initialize All Features Safely on DOM Ready
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderCourses();
  setupModalControls();
  setupMobileMenu();
  setupFaqAccordion();
});
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Observe all cards
document.querySelectorAll('.stat-card, .venture-card, .research-card, .publication-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Active nav link on scroll
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        }
    });
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
};

// Observe stats and animate when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumber = entry.target.querySelector('.stat-number');
            const targetValue = parseInt(statNumber.textContent);
            const hasPlus = statNumber.textContent.includes('+');
            animateCounter(statNumber, targetValue, 2000);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// Typing effect for hero title (optional, commented out by default)
// const heroTitle = document.querySelector('.hero-title');
// const text = heroTitle.textContent;
// heroTitle.textContent = '';
// let i = 0;
// const typeWriter = () => {
//     if (i < text.length) {
//         heroTitle.textContent += text.charAt(i);
//         i++;
//         setTimeout(typeWriter, 100);
//     }
// };
// setTimeout(typeWriter, 500);

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add cursor trail effect (optional, subtle)
const createTrail = (e) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.position = 'fixed';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.width = '4px';
    trail.style.height = '4px';
    trail.style.borderRadius = '50%';
    trail.style.background = 'var(--primary-color)';
    trail.style.pointerEvents = 'none';
    trail.style.opacity = '0.6';
    trail.style.transition = 'all 0.5s ease';
    document.body.appendChild(trail);

    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(3)';
    }, 10);

    setTimeout(() => {
        trail.remove();
    }, 500);
};

// Uncomment to enable cursor trail
// document.addEventListener('mousemove', (e) => {
//     if (Math.random() > 0.9) createTrail(e);
// });

// Add ripple effect to buttons
document.querySelectorAll('.btn, .social-link').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add tilt effect to cards on mouse move
document.querySelectorAll('.venture-card, .stat-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Language Toggle Functionality
const translations = {
    en: {
        nav: {
            about: 'About',
            ventures: 'Ventures',
            research: 'Research',
            publications: 'Publications',
            contact: 'Contact'
        },
        hero: {
            greeting: "Hi, I'm",
            name: 'Chase (Xi) Jiang',
            subtitle: 'CS Ph.D. and Founder of MindFlow',
            description: 'Synthetic data generation, ML-driven network systems, and building next-gen startups',
            contact: 'Get in Touch',
            cv: 'View CV'
        },
        about: {
            title: 'About Me',
            p1: 'I received my Ph.D. in Computer Science at the <strong>University of Chicago</strong>, advised by Prof. Nick Feamster. I also received my B.S. in both Computer Science and Economics from <strong>Colgate University</strong>, advised by Prof. Aaron Gember Jacobson.',
            p2: 'My research focuses on <strong>synthetic data generation</strong>, <strong>ML-driven network traffic modeling</strong>, and <strong>real-time data systems</strong>. I have published in top-tier venues including <span class="highlight">SIGMETRICS</span>, <span class="highlight">KDD</span>, <span class="highlight">WWW</span>, and <span class="highlight">CoNEXT</span>.',
            p3: 'Beyond research, I am invovled in multiple startups pushing the boundaries of brain-machine interfaces and AI-driven social applications.',
            stats: {
                publications: 'Publications',
                patents: 'Patents',
                startups: 'Startups',
                awards: 'Awards'
            }
        },
        ventures: {
            title: 'Current Ventures',
            mindflow: {
                role: 'Co-Founder | July 2025 - Present',
                description: 'Next-generation brain-machine interface startup developing wearables to track and optimize focus, energy, and cognitive performance.',
                h1: 'Backed by leading investors in AI, neurotech, and consumer hardware',
                h2: 'First consumer-friendly cognitive optimization wearable'
            },
            some: {
                role: 'Co-Founder | July 2024 - Present',
                description: 'AI-driven social application revolutionizing how people connect and interact.',
                h1: '2nd round TechStars evaluation',
                h2: '1st place in WeShine Pitch competition',
                h3: 'AI-enhanced matchmaking and user retention'
            },
            visitWebsite: 'Visit Website'
        },
        research: {
            title: 'Research Interests',
            item1: 'Synthetic Data Generation',
            item2: 'ML-Driven Network Traffic Modeling',
            item3: 'Real-Time Data Systems',
            item4: 'State Space Models',
            item5: 'Network Analysis & Security',
            item6: 'Protocol-Constrained Generation'
        },
        publications: {
            title: 'Selected Publications',
            pub1: {
                title: 'JITI: Dynamic Model Serving for Just-in-Time Traffic Inference',
                authors: 'Xi Jiang, Shinan Liu, Saloua Naama, et al.'
            },
            pub2: {
                title: 'NetDiffusion: Network Data Augmentation Through Protocol-Constrained Traffic Generation',
                authors: 'Xi Jiang, Shinan Liu, Aaron Gember-Jacobson, et al.'
            },
            pub3: {
                title: 'Augmenting Rule-based DNS Censorship Detection at Scale with Machine Learning',
                authors: 'Xi Jiang*, Jacob Brown*, Van Tran*, et al.'
            },
            pub4: {
                title: "Measuring and Evading Turkmenistan's Internet Censorship",
                authors: 'Sadia Nourin, Van Tran, Xi Jiang, et al.'
            },
            viewAll: 'View All Publications'
        },
        contact: {
            title: 'Get In Touch',
            text: "I'm always open to discussing research collaborations, startup opportunities, or just having a chat about technology and innovation.",
            location: 'Chicago, IL'
        },
        footer: {
            copyright: '© 2025 Xi (Chase) Jiang. Last updated: November 2025'
        }
    },
    zh: {
        nav: {
            about: '关于我',
            ventures: '创业项目',
            research: '研究方向',
            publications: '学术成果',
            contact: '联系方式'
        },
        hero: {
            greeting: '你好，我是',
            name: '江西',
            subtitle: '芝加哥大学计算机科学博士研究生',
            description: '致力于合成数据生成、机器学习驱动的网络系统研究，以及创建下一代创业公司',
            contact: '联系我',
            cv: '查看简历'
        },
        about: {
            title: '关于我',
            p1: '我是<strong>芝加哥大学</strong>计算机科学博士研究生，导师是 Nick Feamster 教授。我在<strong>科尔盖特大学</strong>获得计算机科学和经济学双学士学位，导师是 Aaron Gember Jacobson 教授。',
            p2: '我的研究方向包括<strong>合成数据生成</strong>、<strong>机器学习驱动的网络流量建模</strong>和<strong>实时数据系统</strong>。我在顶级学术会议上发表过论文，包括<span class="highlight">SIGMETRICS</span>、<span class="highlight">KDD</span>、<span class="highlight">WWW</span> 和 <span class="highlight">CoNEXT</span>。',
            p3: '除了学术研究，我还是一名创业者，共同创立了多家创业公司，致力于推动脑机接口和人工智能驱动的社交应用的发展。',
            stats: {
                publications: '论文发表',
                patents: '专利',
                startups: '创业公司',
                awards: '获奖'
            }
        },
        ventures: {
            title: '当前创业项目',
            mindflow: {
                role: '联合创始人 | 2025年7月 - 至今',
                description: '下一代脑机接口初创公司，开发可穿戴设备来追踪和优化专注力、精力和认知表现。',
                h1: '获得人工智能、神经技术和消费硬件领域领先投资者的支持',
                h2: '首个消费级认知优化可穿戴设备'
            },
            some: {
                role: '联合创始人 | 2024年7月 - 至今',
                description: '人工智能驱动的社交应用，革新人们连接和互动的方式。',
                h1: 'TechStars 第二轮评估',
                h2: 'WeShine 创业比赛第一名',
                h3: '人工智能增强的匹配和用户留存'
            },
            visitWebsite: '访问网站'
        },
        research: {
            title: '研究方向',
            item1: '合成数据生成',
            item2: '机器学习驱动的网络流量建模',
            item3: '实时数据系统',
            item4: '状态空间模型',
            item5: '网络分析与安全',
            item6: '协议约束生成'
        },
        publications: {
            title: '精选论文',
            pub1: {
                title: 'JITI: 用于即时流量推理的动态模型服务',
                authors: '江西, 刘世楠, Saloua Naama 等'
            },
            pub2: {
                title: 'NetDiffusion: 通过协议约束流量生成进行网络数据增强',
                authors: '江西, 刘世楠, Aaron Gember-Jacobson 等'
            },
            pub3: {
                title: '使用机器学习大规模增强基于规则的DNS审查检测',
                authors: '江西*, Jacob Brown*, Van Tran* 等'
            },
            pub4: {
                title: '测量和规避土库曼斯坦的互联网审查',
                authors: 'Sadia Nourin, Van Tran, 江西 等'
            },
            viewAll: '查看所有论文'
        },
        contact: {
            title: '联系方式',
            text: '我非常乐意讨论研究合作、创业机会，或者只是聊聊技术和创新。',
            location: '芝加哥, 伊利诺伊州'
        },
        footer: {
            copyright: '© 2025 江西. 最后更新：2025年11月'
        }
    }
};

let currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keys = element.getAttribute('data-i18n').split('.');
        let translation = translations[lang];

        for (const key of keys) {
            translation = translation[key];
        }

        element.innerHTML = translation;
    });

    // Update active state of language toggle
    document.querySelectorAll('.lang-option').forEach(option => {
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Language toggle button click handler
document.getElementById('lang-toggle').addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'zh' : 'en';
    setLanguage(newLang);
});

// Initialize language on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLang);
});

// Console Easter egg
console.log('%c👋 Hello there!', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%c🚀 Interested in the code? Check out the repo!', 'color: #7c3aed; font-size: 14px;');
console.log('%c📧 Feel free to reach out: xijiang9@uchicago.edu', 'color: #06b6d4; font-size: 14px;');

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { vschatMarkup } from './vschatMarkup'
import './App.css'

function App() {
  const renderedMarkup = vschatMarkup.replace(
    `<li><a href="#about">About</a></li>
      <li><a href="#screenshots">Screenshots</a></li>`,
    `<li><a href="#screenshots">Screenshots</a></li>
      <li><a href="#about">About</a></li>`,
  ).replace(
    `<li><a href="#company">Company</a></li>
      <li><a href="#contact">Contact</a></li>`,
    `<li><a href="#contact">Contact</a></li>`,
  ).replace(
    `<button class="btn btn-primary magnetic">Download App <span class="icon"><svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></span></button>`,
    ``,
  ).replace(
    `<button class="btn btn-primary magnetic">Get Started <span class="icon icon-arrow"><svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></button>`,
    `<button type="button" class="btn btn-primary magnetic" data-cta="get-started" aria-haspopup="dialog" aria-controls="product-tour">Get Started <span class="icon icon-arrow"><svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span></button>`,
  ).replace(
    `<button class="btn btn-ghost magnetic"><span class="icon icon-play"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg></span> Explore Features</button>`,
    `<button type="button" class="btn btn-ghost magnetic" data-cta="explore-features"><span class="icon icon-play"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg></span> Explore Features</button>`,
  ).replace(
    `<div><h5>Product</h5><ul><li><a href="#">Features</a></li><li><a href="#">Screenshots</a></li><li><a href="#">Download</a></li></ul></div>`,
    ``,
  ).replace(
    `<div><h5>Company</h5><ul><li><a href="#">About Us</a></li><li><a href="#">Company</a></li><li><a href="#">Contact</a></li></ul></div>`,
    `<div><h5>Quick Links</h5><ul><li><a href="#home">Home</a></li><li><a href="#features">Features</a></li><li><a href="#screenshots">Screenshots</a></li><li><a href="#about">About</a></li><li><a href="#contact">Contact</a></li></ul></div>`,
  ).replace(
    `<div><h5>Legal</h5><ul><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms &amp; Conditions</a></li></ul></div>`,
    ``,
  ).replace(
    `<p>Connect. Chat. Communicate.</p>`,
    `<p>Connect, chat, and communicate with ease using VSChat, a simple and secure platform built to keep people closer every day.</p>`,
  )

  useEffect(() => {
    document.title = 'VSChat - Connect. Chat. Communicate.'
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const storageKey = 'vschat-theme'
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const savedTheme = window.localStorage.getItem(storageKey)
    const initialTheme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : (prefersDark ? 'dark' : 'light')

    const applyTheme = (theme) => {
      root.dataset.theme = theme
      root.style.colorScheme = theme
      window.localStorage.setItem(storageKey, theme)
    }

    applyTheme(initialTheme)

    const nav = document.querySelector('nav.wrap')
    const navAnchor = nav?.querySelector('.nav-links') ?? nav?.querySelector('.logo')

    if (!nav || !navAnchor) {
      return undefined
    }

    const themeToggle = document.createElement('button')
    themeToggle.type = 'button'
    themeToggle.className = 'btn theme-toggle magnetic'

    const renderToggle = (theme) => {
      const isDark = theme === 'dark'
      themeToggle.innerHTML = isDark
        ? `
          <span class="theme-toggle-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 12.7A8.6 8.6 0 1 1 11.3 3 7 7 0 0 0 21 12.7Z"/>
            </svg>
          </span>
          <span class="theme-toggle-label">Light Mode</span>
        `
        : `
          <span class="theme-toggle-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
            </svg>
          </span>
          <span class="theme-toggle-label">Dark Mode</span>
        `
      themeToggle.setAttribute('aria-pressed', String(isDark))
    }

    let currentTheme = initialTheme
    renderToggle(currentTheme)
    navAnchor.insertAdjacentElement('afterend', themeToggle)

    const handleToggle = () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark'
      applyTheme(currentTheme)
      renderToggle(currentTheme)
    }

    themeToggle.addEventListener('click', handleToggle)

    return () => {
      themeToggle.removeEventListener('click', handleToggle)
      themeToggle.remove()
    }
  }, [])

  useEffect(() => {
    const getStartedButton = document.querySelector('[data-cta="get-started"]')
    const exploreButton = document.querySelector('[data-cta="explore-features"]')
    const featuresSection = document.getElementById('features')
    const screenshotsSection = document.getElementById('screenshots')

    if (!getStartedButton || !exploreButton || !featuresSection || !screenshotsSection) {
      return undefined
    }

    const demoSteps = {
      chat: {
        kicker: 'Step 01 · Chat',
        title: 'Real-time conversations that feel alive',
        body: 'Open with the heart of the product: chats, live previews, and the small motion details that make VSChat feel responsive.',
        chips: ['Instant replies', 'Typing cues', 'Smart search'],
      },
      calls: {
        kicker: 'Step 02 · Calls',
        title: 'Clear voice and video, right inside the flow',
        body: 'Switch into voice or video without breaking the experience. The tour highlights how calling stays quick, direct, and easy to reach.',
        chips: ['Voice call', 'Video call', 'Group ready'],
      },
      media: {
        kicker: 'Step 03 · Media',
        title: 'Share photos, video, and documents naturally',
        body: 'Finish with the parts that make VSChat feel complete: media sharing, notifications, and secure cross-device communication.',
        chips: ['Photos', 'Videos', 'Documents'],
      },
    }

    const scrollToSection = (sectionId) => {
      const target = document.getElementById(sectionId)

      if (!target) {
        return
      }

      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth',
      })
    }

    const tourUrl = '/get-started-tour.html'
    const currentTheme = document.documentElement.dataset.theme || 'light'

    let highlightTimer = null
    let tourOverlay = null

    const closeTour = () => {
      if (!tourOverlay) {
        return
      }

      tourOverlay.classList.remove('is-open')
      tourOverlay.setAttribute('aria-hidden', 'true')
      document.body.classList.remove('no-scroll')
    }

    const handleGetStarted = (event) => {
      event.preventDefault()

      if (!tourOverlay) {
        tourOverlay = document.createElement('div')
        tourOverlay.className = 'demo-overlay'
        tourOverlay.id = 'product-tour'
        tourOverlay.setAttribute('aria-hidden', 'true')
        tourOverlay.innerHTML = `
          <div class="demo-backdrop" data-demo-close></div>
          <div class="demo-frame-shell" role="dialog" aria-modal="true" aria-label="Get Started tour">
            <button type="button" class="demo-close demo-frame-close" aria-label="Close guided demo" data-demo-close>×</button>
            <iframe class="demo-frame" title="VSChat interactive tour"></iframe>
          </div>
        `
        document.body.appendChild(tourOverlay)

        tourOverlay.addEventListener('click', (overlayEvent) => {
          const target = overlayEvent.target

          if (!(target instanceof Element)) {
            return
          }

          if (target.closest('[data-demo-close]')) {
            overlayEvent.preventDefault()
            closeTour()
          }
        })
      }

      const demoFrame = tourOverlay.querySelector('.demo-frame')
      if (demoFrame instanceof HTMLIFrameElement) {
        demoFrame.src = `${tourUrl}?theme=${encodeURIComponent(currentTheme)}`
      }

      tourOverlay.classList.add('is-open')
      tourOverlay.setAttribute('aria-hidden', 'false')
      document.body.classList.add('no-scroll')
    }

    const handleExplore = (event) => {
      event.preventDefault()

      scrollToSection('features')
      featuresSection.classList.add('demo-highlight')

      if (highlightTimer) {
        window.clearTimeout(highlightTimer)
      }

      highlightTimer = window.setTimeout(() => {
        featuresSection.classList.remove('demo-highlight')
      }, 1600)
    }

    const handleTourMessage = (event) => {
      const data = event.data

      if (!data || typeof data !== 'object') {
        return
      }

      if (data.type === 'tour-close') {
        closeTour()
        return
      }

      if (data.type === 'tour-jump' && typeof data.target === 'string') {
        closeTour()
        scrollToSection(data.target)
      }
    }

    getStartedButton.addEventListener('click', handleGetStarted)
    exploreButton.addEventListener('click', handleExplore)
    window.addEventListener('message', handleTourMessage)

    const cleanupDemo = () => {
      getStartedButton.removeEventListener('click', handleGetStarted)
      exploreButton.removeEventListener('click', handleExplore)
      window.removeEventListener('message', handleTourMessage)
      if (highlightTimer) {
        window.clearTimeout(highlightTimer)
      }
      tourOverlay?.remove()
      featuresSection.classList.remove('demo-highlight')
    }

    return cleanupDemo
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const root = document.documentElement
    const progressBar = document.getElementById('progressBar')
    const header = document.getElementById('siteHeader')
    const getSections = () => document.querySelectorAll('section[id]')
    const navLinks = document.querySelectorAll('.nav-links a')
    const hero = document.querySelector('.hero')
    const stage = document.getElementById('stage')
    const phone = document.getElementById('phone')
    const spotlight = document.getElementById('spotlight')
    const gallery = document.querySelector('.gallery-scroll')
    const footer = document.querySelector('footer')
    const cleanupFns = []

    const syncProgress = () => {
      if (!progressBar) {
        return
      }

      const pct = (window.scrollY / Math.max(root.scrollHeight - window.innerHeight, 1)) * 100

      progressBar.style.width = `${pct}%`
    }

    const syncHeader = () => {
      if (!header) {
        return
      }

      header.classList.toggle('scrolled', window.scrollY > 10)
    }

    const syncActiveLink = () => {
      let current = ''

      getSections().forEach((section) => {
        const top = section.offsetTop - 120
        if (window.scrollY >= top) {
          current = section.id
        }
      })

      navLinks.forEach((link) => {
        const href = link.getAttribute('href')
        link.classList.toggle('active', href === `#${current}`)
      })
    }

    const onScroll = () => {
      syncProgress()
      syncHeader()
      syncActiveLink()
    }

    syncProgress()
    syncHeader()
    syncActiveLink()

    window.addEventListener('scroll', onScroll, { passive: true })

    gsap.fromTo(
      '.hero h1 .word span',
      { y: '110%' },
      { y: '0%', duration: 0.9, stagger: 0.12, ease: 'power4.out', delay: 0.2 },
    )
    gsap.fromTo(
      ['.eyebrow', '.hero p', '.hero-cta', '.avail'],
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.5,
      },
    )

    gsap.utils.toArray('.reveal').forEach((element, index) => {
      if (element.closest('.hero')) {
        return
      }

      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
        },
        delay: (index % 4) * 0.06,
      })
    })

    const featureGrid = document.querySelector('.feat-grid')
    const featureCards = Array.from(document.querySelectorAll('.feat-card'))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    featureCards.forEach((card, index) => {
      card.style.setProperty('--feat-delay', `${80 + index * 100}ms`)
    })

    if (featureGrid) {
      if (reduceMotion) {
        featureGrid.classList.add('is-visible')
      } else {
        const featureObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                featureGrid.classList.add('is-visible')
                observer.disconnect()
              }
            })
          },
          {
            threshold: 0.22,
            rootMargin: '0px 0px -10% 0px',
          },
        )

        featureObserver.observe(featureGrid)
        cleanupFns.push(() => featureObserver.disconnect())
      }
    }

    const originalPhoneMarkup = gallery
      ? Array.from(gallery.querySelectorAll(':scope > .mini-phone')).map((node) => node.outerHTML)
      : []
    let marqueeBuildId = 0

    const buildMarquee = () => {
      if (!gallery || originalPhoneMarkup.length === 0) {
        return
      }

      marqueeBuildId += 1
      const buildVersion = marqueeBuildId

      delete gallery.dataset.marqueeReady
      gallery.innerHTML = ''

      const track = document.createElement('div')
      track.className = 'gallery-track'

      const sequence = document.createElement('div')
      sequence.className = 'gallery-seq'
      sequence.innerHTML = originalPhoneMarkup.join('')
      track.appendChild(sequence)
      gallery.appendChild(track)

      const sequenceWidth = sequence.scrollWidth
      if (sequenceWidth > 0) {
        const sequenceGap = 20
        const marqueeDistance = sequenceWidth + sequenceGap
        const copiesNeeded = Math.max(
          3,
          Math.ceil((gallery.clientWidth + marqueeDistance) / marqueeDistance),
        )

        for (let i = 1; i < copiesNeeded; i += 1) {
          track.appendChild(sequence.cloneNode(true))
        }

        track.style.setProperty('--marquee-distance', `${marqueeDistance}px`)
      }

      gallery.dataset.marqueeReady = 'true'
      track.dataset.buildVersion = String(buildVersion)
    }

    buildMarquee()

    if (footer) {
      const originalFooterId = footer.id
      footer.id = 'footer'

      const contactSection = document.createElement('section')
      contactSection.className = 'section contact-section'
      contactSection.id = 'contact'
      contactSection.innerHTML = `
        <div class="wrap contact-layout">
          <div class="contact-copy reveal">
            <span class="eyebrow"><span class="dot"></span> Contact VSChat</span>
            <h2>Leave a<br><span class="contact-accent">message here</span></h2>
            <p>Tell us what you need, and our team will reply with a thoughtful, quick response.</p>
            <div class="contact-points">
              <div class="contact-point">
                <span class="contact-point-icon"><svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9"/></svg></span>
                <div>
                  <strong>Friendly support when you need it</strong>
                  <span>We’re here to help with a human touch.</span>
                </div>
              </div>
              <div class="contact-point">
                <span class="contact-point-icon"><svg viewBox="0 0 24 24"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg></span>
                <div>
                  <strong>Fast replies across chat and email</strong>
                  <span>Get quick answers, wherever you reach us.</span>
                </div>
              </div>
              <div class="contact-point">
                <span class="contact-point-icon"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
                <div>
                  <strong>Built to feel native on mobile</strong>
                  <span>A seamless experience, just like the app.</span>
                </div>
              </div>
            </div>
            <div class="contact-privacy">
              <div class="contact-privacy-badge">
                <span class="contact-privacy-shield"><svg viewBox="0 0 24 24"><path d="M12 2 4 5v6c0 5.5 3.7 10.5 8 11 4.3-.5 8-5.5 8-11V5l-8-3z"/><path d="m9.5 12.5 2 2 3.8-4"/></svg></span>
              </div>
              <div class="contact-privacy-copy">
                <strong>Your privacy is important</strong>
                <p>Your information is safe and never shared.</p>
              </div>
            </div>
          </div>
          <div class="contact-mobile reveal">
            <div class="contact-orbit orbit-a"></div>
            <div class="contact-orbit orbit-b"></div>
            <div class="contact-glow"></div>
            <div class="contact-float chip-left">
              <span class="mini-pill"><span class="mini-dot"></span></span>
            </div>
            <div class="contact-float chip-right">
              <span class="mini-pill alt"><span class="mini-dot"></span></span>
            </div>
            <div class="contact-float chip-topright">
              <span class="mini-pill arrow"><span class="mini-send"></span></span>
            </div>
            <div class="contact-phone">
              <div class="contact-phone-shell">
                <div class="contact-phone-screen">
                  <div class="contact-statusbar">
                    <span>9:41</span>
                    <span class="contact-status-icons">
                      <span class="contact-signal"></span>
                      <span class="contact-wifi"></span>
                      <span class="contact-battery"></span>
                    </span>
                  </div>
                  <div class="contact-top">
                    <button type="button" class="contact-back" aria-label="Back">
                      <span class="icon"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></span>
                    </button>
                    <div class="contact-brand"><span>VS</span>Chat</div>
                    <div class="contact-spacer"></div>
                  </div>
                  <div class="contact-hero-mobile">
                    <h3>Contact Us</h3>
                    <p>We’d love to hear from you.</p>
                  </div>
                  <div class="contact-art">
                    <div class="contact-art-ring"></div>
                    <div class="contact-art-ring contact-art-ring-outer"></div>
                    <div class="contact-art-icon">
                      <span class="contact-art-bubble"></span>
                      <span class="contact-art-headset"></span>
                    </div>
                  </div>
                  <form class="contact-form contact-form-mobile">
                    <label class="contact-field-wrap">
                      <span>Your Name</span>
                      <div class="contact-field contact-input contact-field-row">
                        <span class="contact-field-icon"><svg viewBox="0 0 24 24"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/></svg></span>
                        <input type="text" placeholder="Your Name" />
                      </div>
                    </label>
                    <label class="contact-field-wrap">
                      <span>Your Email</span>
                      <div class="contact-field contact-input contact-field-row">
                        <span class="contact-field-icon"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></span>
                        <input type="email" placeholder="Your Email" />
                      </div>
                    </label>
                    <label class="contact-field-wrap">
                      <span>Your Message</span>
                      <div class="contact-field contact-field-lg contact-textarea contact-message-row">
                        <span class="contact-field-icon contact-field-icon-top"><svg viewBox="0 0 24 24"><path d="M13.5 6.5 5 15l-1 5 5-1 8.5-8.5z"/><path d="m12 8 4 4"/></svg></span>
                        <textarea rows="5" placeholder="Your Message"></textarea>
                      </div>
                    </label>
                    <button type="button" class="contact-send contact-send-large">
                      <span class="contact-send-icon"><svg viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg></span>
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
      const companySection = document.querySelector('#company')
      if (companySection?.parentElement) {
        companySection.parentElement.insertBefore(contactSection, companySection)
      } else {
        footer.parentElement.insertBefore(contactSection, footer)
      }

      const contactForm = contactSection.querySelector('.contact-form')
      const contactPhone = contactSection.querySelector('.contact-phone')
      const contactSuccess = contactSection.querySelector('.contact-success')
      const contactSend = contactSection.querySelector('.contact-send')
      const contactFields = Array.from(contactSection.querySelectorAll('.contact-field-wrap'))
      let contactSuccessTimer = null

      const syncContactFields = () => {
        contactFields.forEach((field) => {
          const input = field.querySelector('input, textarea')
          field.classList.toggle('filled', Boolean(input?.value.trim()))
        })
      }

      const handleContactInput = () => {
        syncContactFields()
      }

      const handleContactFocusIn = () => {
        contactPhone?.classList.add('is-active')
      }

      const handleContactFocusOut = (event) => {
        const nextTarget = event.relatedTarget
        if (!contactForm?.contains(nextTarget)) {
          contactPhone?.classList.remove('is-active')
        }
      }

      const handleContactSend = () => {
        if (!contactSuccess) {
          return
        }

        contactSuccess.classList.add('is-flash')
        gsap.fromTo(
          contactSuccess,
          { opacity: 0.6, y: 10, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' },
        )

        if (contactSuccessTimer) {
          window.clearTimeout(contactSuccessTimer)
        }

        contactSuccessTimer = window.setTimeout(() => {
          contactSuccess.classList.remove('is-flash')
        }, 1200)
      }

      contactForm?.addEventListener('input', handleContactInput)
      contactForm?.addEventListener('focusin', handleContactFocusIn)
      contactForm?.addEventListener('focusout', handleContactFocusOut)
      contactSend?.addEventListener('click', handleContactSend)
      syncContactFields()

      const contactRevealItems = contactSection.querySelectorAll('.reveal')
      gsap.fromTo(
        contactRevealItems,
        { opacity: 0, y: 42 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.05,
        },
      )

      cleanupFns.push(() => {
        contactForm?.removeEventListener('input', handleContactInput)
        contactForm?.removeEventListener('focusin', handleContactFocusIn)
        contactForm?.removeEventListener('focusout', handleContactFocusOut)
        contactSend?.removeEventListener('click', handleContactSend)
        if (contactSuccessTimer) {
          window.clearTimeout(contactSuccessTimer)
        }
        contactSection.remove()
        footer.id = originalFooterId
      })
    }
    const handleMarqueeResize = () => {
      buildMarquee()
    }

    window.addEventListener('resize', handleMarqueeResize)
    cleanupFns.push(() => {
      window.removeEventListener('resize', handleMarqueeResize)
    })

    gsap.utils.toArray('.mini-phone').forEach((element, index) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'back.out(1.4)',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
          },
        },
      )
    })

    cleanupFns.push(() => {
      if (gallery) {
        delete gallery.dataset.marqueeReady
        gallery.innerHTML = originalPhoneMarkup.join('')
      }
    })

    document.querySelectorAll('.num').forEach((num) => {
      const target = Number(num.dataset.target || 0)

      ScrollTrigger.create({
        trigger: num,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          const counter = { val: 0 }
          gsap.to(counter, {
            val: target,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              let suffix = 'K+'
              if (target === 1) suffix = 'M+'
              if (target === 24) suffix = '/7'
              num.textContent = `${Math.floor(counter.val)}${suffix}`
            },
          })
        },
      })
    })

    gsap.to('#stage', {
      y: -60,
      rotateY: 4,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    gsap.to('.blob-a', {
      y: 80,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    gsap.to('.blob-b', {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    const handleHeroMove = (event) => {
      if (!hero || !spotlight) {
        return
      }

      const heroRect = hero.getBoundingClientRect()
      gsap.to(spotlight, {
        left: event.clientX - heroRect.left,
        top: event.clientY - heroRect.top,
        opacity: 1,
        duration: 0.3,
      })
    }

    const handleHeroLeave = () => {
      if (!spotlight) {
        return
      }

      gsap.to(spotlight, { opacity: 0, duration: 0.4 })
    }

    const handleStageMove = (event) => {
      if (!stage || !phone) {
        return
      }

      const rect = stage.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5

      gsap.to(phone, {
        rotateY: -8 + x * 14,
        rotateX: 4 - y * 14,
        duration: 0.6,
        ease: 'power2.out',
      })

      gsap.to('.floaty', { x: x * 20, y: y * 20, duration: 0.8, ease: 'power2.out' })
    }

    const handleStageLeave = () => {
      if (!phone) {
        return
      }

      gsap.to(phone, { rotateY: -8, rotateX: 4, duration: 0.8, ease: 'power3.out' })
    }

    hero?.addEventListener('mousemove', handleHeroMove)
    hero?.addEventListener('mouseleave', handleHeroLeave)
    stage?.addEventListener('mousemove', handleStageMove)
    stage?.addEventListener('mouseleave', handleStageLeave)

    document.querySelectorAll('.magnetic').forEach((button) => {
      const handleMove = (event) => {
        const rect = button.getBoundingClientRect()
        const x = event.clientX - rect.left - rect.width / 2
        const y = event.clientY - rect.top - rect.height / 2

        gsap.to(button, { x: x * 0.3, y: y * 0.4, duration: 0.3, ease: 'power2.out' })
      }

      const handleLeave = () => {
        gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' })
      }

      button.addEventListener('mousemove', handleMove)
      button.addEventListener('mouseleave', handleLeave)
      cleanupFns.push(() => {
        button.removeEventListener('mousemove', handleMove)
        button.removeEventListener('mouseleave', handleLeave)
      })
    })

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      const handleClick = (event) => {
        const href = anchor.getAttribute('href')
        if (!href || href === '#') {
          return
        }

        const target = document.querySelector(href)
        if (!target) {
          return
        }

        event.preventDefault()
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' })
      }

      anchor.addEventListener('click', handleClick)
      cleanupFns.push(() => {
        anchor.removeEventListener('click', handleClick)
      })
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      hero?.removeEventListener('mousemove', handleHeroMove)
      hero?.removeEventListener('mouseleave', handleHeroLeave)
      stage?.removeEventListener('mousemove', handleStageMove)
      stage?.removeEventListener('mouseleave', handleStageLeave)
      cleanupFns.forEach((cleanup) => cleanup())
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  useEffect(() => {
    const featuresSection = document.getElementById('features')
    const sectionHead = featuresSection?.querySelector('.section-head')
    const featGrid = featuresSection?.querySelector('.feat-grid')

    if (!featuresSection || !sectionHead || !featGrid) {
      return undefined
    }

    const originalParent = featGrid.parentElement
    const originalNextSibling = featGrid.nextSibling
    const createdNodes = []

    featuresSection.classList.add('features-section')
    sectionHead.classList.add('features-head')

    let layout = featuresSection.querySelector('.features-layout')
    if (!layout) {
      layout = document.createElement('div')
      layout.className = 'features-layout'
      sectionHead.insertAdjacentElement('afterend', layout)
      createdNodes.push(layout)
    }

    let spotlight = featuresSection.querySelector('.feature-spotlight')
    if (!spotlight) {
      spotlight = document.createElement('div')
      spotlight.className = 'feature-spotlight reveal'
      spotlight.innerHTML = `
        <div class="feature-spotlight-orbit orbit-one" aria-hidden="true"></div>
        <div class="feature-spotlight-orbit orbit-two" aria-hidden="true"></div>
        <div class="feature-spotlight-stage">
          <div class="feature-spotlight-copy">
            <span class="feature-kicker"><span class="feature-kicker-dot"></span> Live Conversation</span>
            <h3>Messages that feel alive, not static</h3>
            <p>Messages drift out of the interface with subtle motion, while call and media cues glow around the conversation.</p>
            <div class="feature-mini-row">
              <span class="feature-mini-chip"><span></span>Instant</span>
              <span class="feature-mini-chip"><span></span>Secure</span>
              <span class="feature-mini-chip"><span></span>Cross-device</span>
            </div>
          </div>
          <div class="feature-spotlight-visual">
            <span class="feature-flow flow-a" aria-hidden="true"></span>
            <span class="feature-flow flow-b" aria-hidden="true"></span>
            <span class="feature-flow flow-c" aria-hidden="true"></span>
            <span class="feature-bubble bubble-chat" aria-hidden="true">Instant messaging</span>
            <span class="feature-bubble bubble-call" aria-hidden="true">Crystal clear calls</span>
            <span class="feature-bubble bubble-video" aria-hidden="true">HD video</span>
            <span class="feature-bubble bubble-secure" aria-hidden="true">End-to-end secure</span>
            <span class="feature-bubble bubble-media" aria-hidden="true">Media sharing</span>
            <div class="feature-phone" aria-hidden="true">
              <div class="feature-phone-shell">
                <div class="feature-phone-screen">
                  <div class="feature-statusbar">
                    <span>10:37</span>
                    <span class="feature-status-icons">
                      <span class="feature-signal"></span>
                      <span class="feature-wifi"></span>
                      <span class="feature-battery"></span>
                    </span>
                  </div>
                  <div class="feature-chat-title">
                    <span class="feature-chat-dot"></span>
                    VSChat
                  </div>
                  <div class="feature-chat-stack">
                    <div class="feature-message in">Emma: Hey! How are you? <span>💬</span></div>
                    <div class="feature-message out">You: Doing great! <span>🚀</span></div>
                    <div class="feature-message in">Emma: Want to jump on a call? <span>📞</span></div>
                    <div class="feature-message out">You: Sure, let me get ready. <span>✨</span></div>
                    <div class="feature-message in">Emma: I can share the photo too. <span>📷</span></div>
                    <div class="feature-message out feature-call-row">
                      <span>Voice Call</span>
                      <span>Video Call</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
      createdNodes.push(spotlight)
    }

    if (spotlight.parentElement !== layout) {
      layout.appendChild(spotlight)
    }

    if (featGrid.parentElement !== layout) {
      layout.appendChild(featGrid)
    } else if (spotlight.nextSibling !== featGrid) {
      layout.insertBefore(featGrid, spotlight.nextSibling)
    }

    layout.classList.add('is-ready')

    const featureCards = Array.from(featGrid.querySelectorAll('.feat-card'))
    const featureSectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: featuresSection,
        start: 'top 78%',
      },
    })

    featureSectionTl.fromTo(
      spotlight,
      { opacity: 0, y: 36, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power3.out' },
      0,
    )
    featureSectionTl.fromTo(
      featureCards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
      0.06,
    )

    featureSectionTl.fromTo(
      spotlight.querySelectorAll('.feature-spotlight-copy > *, .feature-bubble, .feature-flow, .feature-phone'),
      { opacity: 0, y: 20, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      },
      0.16,
    )

    featureSectionTl.fromTo(
      spotlight.querySelectorAll('.feature-message'),
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.28,
        ease: 'power2.out',
      },
      0.5,
    )

    const driftTargets = featuresSection.querySelectorAll('.features-glow, .feature-spotlight-orbit')
    driftTargets.forEach((node, index) => {
      gsap.to(node, {
        y: index % 2 === 0 ? 18 : -18,
        x: index % 2 === 0 ? -8 : 8,
        duration: 5 + index,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })

    return () => {
      featureSectionTl.scrollTrigger?.kill()
      featureSectionTl.kill()
      driftTargets.forEach((node) => gsap.killTweensOf(node))

      if (spotlight?.parentElement === layout) {
        layout.removeChild(spotlight)
      }

      if (layout?.parentElement === featuresSection) {
        featuresSection.insertBefore(featGrid, originalNextSibling)
        layout.remove()
      } else if (originalParent && featGrid.parentElement !== originalParent) {
        originalParent.insertBefore(featGrid, originalNextSibling)
      }

      createdNodes.forEach((node) => {
        if (node.parentElement) {
          node.remove()
        }
      })

      featuresSection.classList.remove('features-section')
      sectionHead.classList.remove('features-head')
    }
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: renderedMarkup }} />
}

export default App


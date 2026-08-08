import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { vschatMarkup } from './vschatMarkup'
import './App.css'

function App() {
  useEffect(() => {
    document.title = 'VSChat - Connect. Chat. Communicate.'
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const root = document.documentElement
    const progressBar = document.getElementById('progressBar')
    const header = document.getElementById('siteHeader')
    const sections = document.querySelectorAll('section[id]')
    const navLinks = document.querySelectorAll('.nav-links a')
    const hero = document.querySelector('.hero')
    const stage = document.getElementById('stage')
    const phone = document.getElementById('phone')
    const spotlight = document.getElementById('spotlight')
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

      sections.forEach((section) => {
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

    gsap.utils.toArray('.feat-card').forEach((element, index) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: (index % 4) * 0.08,
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
          },
        },
      )
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

    document.querySelectorAll('.feat-card').forEach((card) => {
      const handleMove = (event) => {
        const rect = card.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5

        gsap.to(card, {
          rotateY: x * 10,
          rotateX: -y * 10,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 600,
        })
      }

      const handleLeave = () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' })
      }

      card.addEventListener('mousemove', handleMove)
      card.addEventListener('mouseleave', handleLeave)
      cleanupFns.push(() => {
        card.removeEventListener('mousemove', handleMove)
        card.removeEventListener('mouseleave', handleLeave)
      })
    })

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

  return <div dangerouslySetInnerHTML={{ __html: vschatMarkup }} />
}

export default App

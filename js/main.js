(() => {

  /* ======================
     CACHE ELEMENTS
  ====================== */

  const year = document.getElementById("year");

  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".topbar");

  const hero = document.querySelector(".hero");
  const heroBg = document.querySelector(".hero-bg");

  const back = document.querySelector(".layer-back");
  const mid = document.querySelector(".layer-mid");
  const front = document.querySelector(".layer-front");

  const cinema = document.querySelector(".cinema");
  const cinemaText = document.querySelectorAll(".cinema-text");

  const navLinks = document.querySelectorAll(".nav a");
  const indicator = document.querySelector(".nav-indicator");
  const sections = document.querySelectorAll("section[id]");

  const revealElements = document.querySelectorAll(".reveal");
  const cursor = document.querySelector(".cursor");

  /* ======================
     YEAR
  ====================== */

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* ======================
     MENU TOGGLE
  ====================== */

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.addEventListener("click", e => {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
      }
    });
  }

  /* ======================
     NAV INDICATOR (ACTIVE SECTION)
  ====================== */

  function moveIndicator(link){
    if(!indicator || !link) return;

    const rect = link.getBoundingClientRect();
    const parentRect = link.parentElement.getBoundingClientRect();

    indicator.style.width = rect.width + "px";
    indicator.style.left = (rect.left - parentRect.left) + "px";
  }

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const activeLink = document.querySelector(`.nav a[href="#${id}"]`);
          moveIndicator(activeLink);
        }
      });
    }, { threshold: 0.6 });

    sections.forEach(section => sectionObserver.observe(section));
  }

  /* ======================
     SCROLL REVEAL
  ====================== */

  if ("IntersectionObserver" in window && revealElements.length) {

    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    revealElements.forEach(el => revealObserver.observe(el));

  } else {
    revealElements.forEach(el => el.classList.add("visible"));
  }

  /* ======================
     CURSOR HALO
  ====================== */

  if (cursor && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", e => {
      cursor.style.transform =
        `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
    });
  } else if (cursor) {
    cursor.style.display = "none";
  }

  /* ======================
     PARALLAX + HEADER LOGIC
  ====================== */

  let lastScroll = 0;
  let ticking = false;

  function handleScroll(){

    const scroll = window.scrollY;

    /* Hero darken */
    if(hero){
      if(scroll > 40){
        hero.classList.add("dark");
      } else {
        hero.classList.remove("dark");
      }
    }

    /* Header hide/show */
    if(header){
      if(scroll > lastScroll && scroll > 120){
        header.classList.add("hidden");
      } else {
        header.classList.remove("hidden");
      }
    }

    /* Multi-layer parallax */
    if(back) back.style.transform = `translateY(${scroll * 0.15}px)`;
    if(mid) mid.style.transform = `translateY(${scroll * 0.25}px)`;
    if(front) front.style.transform = `translateY(${scroll * 0.35}px)`;

    /* Hero background parallax */
    if(heroBg){
      heroBg.style.transform =
        `translateY(${scroll * 0.2}px) scale(1.05)`;
    }

    /* Cinema depth */
    if(cinema){
      const rect = cinema.getBoundingClientRect();
      if(rect.top < window.innerHeight && rect.bottom > 0){
        const progress = rect.top / window.innerHeight;
        cinemaText.forEach((text, i) => {
          text.style.transform =
            `translateY(${progress * (i + 1) * -40}px)`;
        });
      }
    }

    lastScroll = scroll;
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if(!ticking){
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });

  const wrapper = document.querySelector(".teaser-wrapper");
  const steps = document.querySelectorAll(".teaser-step");

  if(wrapper && steps.length){
    window.addEventListener("scroll", () => {
      const rect = wrapper.getBoundingClientRect();
      const total = wrapper.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / total, 0), 1);
      const index = Math.min(
        steps.length - 1,
        Math.floor(progress * steps.length)
      );
      steps.forEach((step, i) => {
        step.classList.toggle("active", i === index);
      });
    });
  }
})();
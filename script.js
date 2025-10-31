document.addEventListener("DOMContentLoaded", () => {
  // 3. Background Music Handler
  // Ambil elemen audio yang kita buat di HTML
  const audio = document.getElementById("background-music");

  // Fungsi untuk memainkan musik
  function playMusic() {
    // .play() mengembalikan "promise", kita tangani jika ada error
    audio.play().catch((error) => {
      // Ini akan muncul di console jika browser memblokir autoplay
      console.warn("Musik gagal diputar:", error);
    });
  }

  // Opsi agar listener hanya berjalan satu kali
  const listenerOptions = {
    once: true, // Hapus listener setelah dijalankan
    passive: true,
  };

  // PENTING:
  // Coba putar musik saat pengguna PERTAMA KALI berinteraksi
  document.addEventListener("scroll", playMusic, listenerOptions);
  document.addEventListener("touchmove", playMusic, listenerOptions);
  document.addEventListener("wheel", playMusic, listenerOptions);
  document.addEventListener("click", playMusic, listenerOptions);

  // 1. Reveal Animations on Scroll (Intersection Observer)
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Stop observing after it's visible if you want the animation to play only once
          // observer.unobserve(entry.target);
        } else {
          // Optional: remove 'visible' class if element scrolls out of view
          // entry.target.classList.remove('visible');
        }
      });
    },
    {
      threshold: 0.2, // Trigger when 20% of the element is visible
    }
  );

  revealElements.forEach((el) => {
    observer.observe(el);
  });

  // 2. Particle Animation (Hearts & Flowers) on Touch/Scroll
  const particleContainer = document.getElementById("particle-container");
  const icons = ["❤️", "🌸", "💖", "🌼", "✨", "🥰"]; // More sophisticated icons

  function createParticle(x, y) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Offset to center the particle on the touch/mouse point
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    particle.innerHTML = icons[Math.floor(Math.random() * icons.length)];

    // Add more random variations
    const randomSize = Math.random() * 0.7 + 1; // 1rem - 1.7rem
    particle.style.fontSize = `${randomSize}rem`;
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;

    // Random initial opacity
    particle.style.opacity = Math.random() * 0.5 + 0.5;

    particleContainer.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 2000); // Matches animation duration
  }

  // Function to handle various events (touch, wheel)
  function handleParticleEvent(e) {
    // Only trigger for touchmove and wheel, to avoid excessive particles on mousemove
    if (e.type === "mousemove" && e.buttons === 0) return; // Don't create particles if mouse is just moving without click

    let x, y;

    if (e.touches && e.touches.length > 0) {
      // Touch events
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      // Mouse events (wheel, mousemove with button)
      x = e.clientX;
      y = e.clientY;
    }

    // Create particle at a slightly randomized position around the cursor/touch point
    const offsetX = (Math.random() - 0.5) * 60; // Larger spread
    const offsetY = (Math.random() - 0.5) * 60;
    createParticle(x + offsetX, y + offsetY);
  }

  // Add event listeners
  document.addEventListener("touchmove", handleParticleEvent, { passive: true });
  // Use 'wheel' for scroll, and 'mousemove' but only when a button is pressed (e.g. click+drag)
  document.addEventListener("wheel", handleParticleEvent, { passive: true });
  // document.addEventListener('mousemove', handleParticleEvent); // Uncomment if you want particles on all mouse movements
});

document.addEventListener("DOMContentLoaded", () => {
  // 3. Background Music Handler (VERSI BARU DENGAN MODAL)
  const audio = document.getElementById("background-music");
  const musicModal = document.getElementById("music-modal");
  const playButton = document.getElementById("play-music-button");

  // Fungsi untuk memainkan musik dan menutup modal
  function playMusicAndStart() {
    // Mainkan musik
    audio.play().catch((error) => {
      // Ini akan muncul jika ada masalah, tapi seharusnya tidak
      console.warn("Musik gagal diputar:", error);
    });

    // Sembunyikan modal dengan animasi fade-out
    musicModal.style.opacity = "0";

    // Hapus modal setelah animasi selesai agar tidak menghalangi scroll
    setTimeout(() => {
      musicModal.style.display = "none";
    }, 700); // 700ms = durasi transisi 0.7s di CSS
  }

  // Dengarkan klik HANYA pada tombol di modal
  playButton.addEventListener("click", playMusicAndStart);

  // -----------------------------------------------------------------
  // SISA KODE (TIDAK BERUBAH)
  // -----------------------------------------------------------------

  // 1. Reveal Animations on Scroll (Intersection Observer)
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
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
  const icons = ["❤️", "🌸", "💖", "🌼", "✨", "🥰"];

  function createParticle(x, y) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.innerHTML = icons[Math.floor(Math.random() * icons.length)];

    const randomSize = Math.random() * 0.7 + 1; // 1rem - 1.7rem
    particle.style.fontSize = `${randomSize}rem`;
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;
    particle.style.opacity = Math.random() * 0.5 + 0.5;

    particleContainer.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 2000);
  }

  function handleParticleEvent(e) {
    if (e.type === "mousemove" && e.buttons === 0) return;

    let x, y;

    if (e.touches && e.touches.length > 0) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }

    const offsetX = (Math.random() - 0.5) * 60;
    const offsetY = (Math.random() - 0.5) * 60;
    createParticle(x + offsetX, y + offsetY);
  }

  document.addEventListener("touchmove", handleParticleEvent, { passive: true });
  document.addEventListener("wheel", handleParticleEvent, { passive: true });
});

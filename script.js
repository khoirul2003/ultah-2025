document.addEventListener("DOMContentLoaded", () => {
  // 3. Background Music Handler (VERSI BARU DENGAN MODAL)
  const audio = document.getElementById("background-music");
  const musicModal = document.getElementById("music-modal");
  const playButton = document.getElementById("play-music-button");

  function playMusicAndStart() {
    audio.play().catch((error) => {
      console.warn("Musik gagal diputar:", error);
    });

    musicModal.style.opacity = "0";

    setTimeout(() => {
      musicModal.style.display = "none";
    }, 700);
  }

  playButton.addEventListener("click", playMusicAndStart);

  // -----------------------------------------------------------------
  // SISA KODE (REVEAL ANIMATION TIDAK BERUBAH)
  // -----------------------------------------------------------------

  // 1. Reveal Animations on Scroll (Intersection Observer)
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Opsi: Berhenti mengamati setelah terlihat
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // Sedikit lebih cepat ter-trigger
    }
  );

  revealElements.forEach((el) => {
    observer.observe(el);
  });

  // -----------------------------------------------------------------
  // PERUBAHAN BESAR 6: Partikel yang Lebih Modern
  // -----------------------------------------------------------------

  const particleContainer = document.getElementById("particle-container");
  // Mengganti emoji bunga/hati dengan 'sparks' dan 'dots' yang lebih abstrak
  const icons = ["•", "·", "✶", "✨"];

  function createParticle(x, y) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.innerHTML = icons[Math.floor(Math.random() * icons.length)];

    // Ukuran partikel dibuat lebih kecil dan random
    const randomSize = Math.random() * 0.5 + 0.5; // 0.5rem - 1.0rem
    particle.style.fontSize = `${randomSize}rem`;

    // Warna partikel dibuat random (abu-abu, pink, atau putih)
    const randomColor = ["#C06C84", "#FBFBFB", "#999"][Math.floor(Math.random() * 3)];
    particle.style.color = randomColor;

    // Durasi animasi partikel dibuat random agar lebih natural
    const randomDuration = Math.random() * 1.5 + 1; // 1 detik - 2.5 detik
    particle.style.animationDuration = `${randomDuration}s`;

    particle.style.opacity = Math.random() * 0.5 + 0.5;

    particleContainer.appendChild(particle);

    // Hapus partikel setelah animasinya selesai
    setTimeout(() => {
      particle.remove();
    }, randomDuration * 1000); // Sesuaikan dengan durasi animasi
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

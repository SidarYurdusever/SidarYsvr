document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('nav ul li a');
    let currentIndex = 0;
    let isTransitioning = false;
    const transitionDuration = 600; // milisaniye
  
    // Sayfa geçiş fonksiyonu (dikey swipe/scroll)
    function goToPage(newIndex) {
      if (isTransitioning || newIndex === currentIndex || newIndex < 0 || newIndex >= pages.length) return;
      isTransitioning = true;
  
      // Navigasyon linklerinin aktif durumunu güncelle
      navLinks.forEach(link => link.classList.remove('active'));
      const targetId = pages[newIndex].id;
      document.querySelector(`nav ul li a[data-page="${targetId}"]`).classList.add('active');
  
      const currentPage = pages[currentIndex];
      const targetPage = pages[newIndex];
  
      // Geçiş yönüne göre mevcut sayfayı yukarı veya aşağı kaydır
      currentPage.classList.remove('active');
      currentPage.style.top = newIndex > currentIndex ? '-100%' : '100%';
      currentPage.style.opacity = '0';
  
      // Hedef sayfayı hazırlayıp ekrana getir
      targetPage.classList.add('active');
      targetPage.style.top = newIndex > currentIndex ? '100%' : '-100%';
      void targetPage.offsetWidth; // Reflow tetikleme
      targetPage.style.top = '0';
      targetPage.style.opacity = '1';
  
      setTimeout(() => {
        currentIndex = newIndex;
        isTransitioning = false;
      }, transitionDuration);
    }
  
    // Fare tekerleği ile sayfa geçişi
    window.addEventListener('wheel', (e) => {
      if (isTransitioning) return;
      if (e.deltaY > 0 && currentIndex < pages.length - 1) {
        goToPage(currentIndex + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        goToPage(currentIndex - 1);
      }
    });
  
    // Navigasyon linklerine tıklayınca geçiş
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-page');
        const newIndex = Array.from(pages).findIndex(page => page.id === targetId);
        goToPage(newIndex);
      });
    });
  
    // Mobil dokunmatik hareketleri için swipe algılama
    let touchStartY = null;
    window.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    });
    window.addEventListener('touchmove', (e) => {
      if (!touchStartY) return;
      let touchCurrentY = e.touches[0].clientY;
      let diffY = touchStartY - touchCurrentY;
      if (Math.abs(diffY) > 50) { // Eşik değeri
        if (diffY > 0 && currentIndex < pages.length - 1) {
          goToPage(currentIndex + 1);
        } else if (diffY < 0 && currentIndex > 0) {
          goToPage(currentIndex - 1);
        }
        touchStartY = null;
      }
    });
    window.addEventListener('touchend', () => {
      touchStartY = null;
    });
  
    // Tema Toggle İşlevselliği
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
      themeToggle.checked = true;
    }
    themeToggle.addEventListener('change', () => {
      const theme = themeToggle.checked ? 'dark' : 'light';
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  
    // İletişim Formu İşlemi
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Mesajınız gönderildi!');
      contactForm.reset();
    });
  });
  

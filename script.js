document.addEventListener('DOMContentLoaded', () => {
  // Tüm sayfaları ve footer'ı seç
  const pages = document.querySelectorAll('.page');
  const footer = document.querySelector('footer');
  const navLinks = document.querySelectorAll('nav ul li a');
  let currentIndex = 0;
  let isTransitioning = false;
  const transitionDuration = 600; // Animasyon süresi (ms)

  // Footer'ı yalnızca son sayfada gösteren fonksiyon
  function showFooterOnlyOnLastPage() {
    if (currentIndex === pages.length - 1) {
      footer.style.display = 'block';
    } else {
      footer.style.display = 'none';
    }
  }

  // Sayfa geçişi fonksiyonu
  function goToPage(newIndex) {
    if (isTransitioning || newIndex === currentIndex || newIndex < 0 || newIndex >= pages.length) return;
    isTransitioning = true;
  
    // 1) Tüm nav linklerin .active sınıfını kaldır
    navLinks.forEach(link => link.classList.remove('active'));
  
    // 2) Yeni sayfanın ID'siyle eşleşen linke .active ekle
    const targetId = pages[newIndex].id; 
    const newLink = document.querySelector(`nav ul li a[data-page="${targetId}"]`);
    if (newLink) {
      newLink.classList.add('active');
    }
  
    // Mevcut sayfayı animasyonla kapat
    const currentPage = pages[currentIndex];
    currentPage.classList.remove('active');
    currentPage.style.top = newIndex > currentIndex ? '-100%' : '100%';
    currentPage.style.opacity = '0';
  
    // Hedef sayfayı animasyonla aç
    const targetPage = pages[newIndex];
    targetPage.classList.add('active');
    targetPage.style.top = newIndex > currentIndex ? '100%' : '-100%';
    void targetPage.offsetWidth; // Reflow tetikle
    targetPage.style.top = '0';
    targetPage.style.opacity = '1';
  
    // Geçiş tamamlandığında
    setTimeout(() => {
      currentIndex = newIndex;
      isTransitioning = false;
      showFooterOnlyOnLastPage();
    }, transitionDuration);
  }
  

  // Başlangıçta footer durumunu ayarla
  showFooterOnlyOnLastPage();

  // Navigasyon linkleri ile sayfa geçişi
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-page');
      const newIndex = Array.from(pages).findIndex(page => page.id === targetId);
      goToPage(newIndex);
    });
  });

  // Fare tekerleği (wheel) ile sayfa geçişi
  window.addEventListener('wheel', (e) => {
    if (isTransitioning) return;
    
    // Mevcut sayfanın .page-container'ının kaydırma durumunu kontrol et
    const currentContainer = pages[currentIndex].querySelector('.page-container');
    if (currentContainer) {
      if (e.deltaY < 0 && currentContainer.scrollTop > 0) return;
      if (e.deltaY > 0 && (currentContainer.scrollTop + currentContainer.clientHeight < currentContainer.scrollHeight)) return;
    }
    
    if (e.deltaY > 0 && currentIndex < pages.length - 1) {
      goToPage(currentIndex + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      goToPage(currentIndex - 1);
    }
  });

  // Dokunmatik cihazlar için swipe (touch) olayları
  let touchStartY = null;
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  });
  window.addEventListener('touchmove', (e) => {
    if (!touchStartY) return;
    const touchCurrentY = e.touches[0].clientY;
    const diffY = touchStartY - touchCurrentY;
    
    // Mevcut sayfanın .page-container'ının kaydırma durumunu kontrol et
    const currentContainer = pages[currentIndex].querySelector('.page-container');
    if (currentContainer) {
      if (diffY < 0 && currentContainer.scrollTop > 0) return;
      if (diffY > 0 && (currentContainer.scrollTop + currentContainer.clientHeight < currentContainer.scrollHeight)) return;
    }
    
    if (Math.abs(diffY) > 50) {
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
  themeToggle.checked = savedTheme === 'dark';
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

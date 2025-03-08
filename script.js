document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('nav ul li a');
    let currentIndex = 0;
    let isTransitioning = false;
    const transitionDuration = 600; // milisaniye
  
    function goToPage(newIndex) {
      if (isTransitioning || newIndex === currentIndex || newIndex < 0 || newIndex >= pages.length) return;
      isTransitioning = true;
  
      // Navigasyon linklerini güncelle
      navLinks.forEach(link => link.classList.remove('active'));
      const targetId = pages[newIndex].id;
      document.querySelector(`nav ul li a[data-page="${targetId}"]`).classList.add('active');
  
      const currentPage = pages[currentIndex];
      const targetPage = pages[newIndex];
  
      // Mevcut sayfayı animasyonla yukarıya ya da aşağıya taşı
      currentPage.classList.remove('active');
      currentPage.style.top = newIndex > currentIndex ? '-100%' : '100%';
      currentPage.style.opacity = '0';
  
      // Hedef sayfayı animasyonla ekrana getir
      targetPage.classList.add('active');
      targetPage.style.top = newIndex > currentIndex ? '100%' : '-100%';
      void targetPage.offsetWidth; // reflow tetikleme
      targetPage.style.top = '0';
      targetPage.style.opacity = '1';
  
      setTimeout(() => {
        currentIndex = newIndex;
        isTransitioning = false;
      }, transitionDuration);
    }
  
    // Fare tekerleği (wheel) ile sayfa geçişi
    window.addEventListener('wheel', (e) => {
      if (isTransitioning) return;
      if (e.deltaY > 0 && currentIndex < pages.length - 1) {
        goToPage(currentIndex + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        goToPage(currentIndex - 1);
      }
    });
  
    // Navigasyon linklerine tıklanınca sayfa geçişi
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-page');
        const newIndex = Array.from(pages).findIndex(page => page.id === targetId);
        goToPage(newIndex);
      });
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
  });
  
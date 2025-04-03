document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfolyo script'i başlatılıyor...");

    // --- 1. Tema Değiştirme ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle?.querySelector('i'); // Buton yoksa hata vermemesi için ?.

    // Sayfa yüklendiğinde kayıtlı temayı uygula
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'dark-theme' && themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        console.log(`Kaydedilmiş tema yüklendi: ${savedTheme}`);
    } else {
        console.log("Kaydedilmiş tema bulunamadı, varsayılan (açık) tema kullanılıyor.");
    }

    // Tema değiştirme butonuna tıklama olayı
    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            let currentTheme = '';
            // Temayı ve ikonu güncelle & kaydet
            if (body.classList.contains('dark-theme')) {
                currentTheme = 'dark-theme';
                localStorage.setItem('theme', currentTheme);
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun'); // Güneş ikonu
            } else {
                currentTheme = 'light-theme';
                localStorage.removeItem('theme'); // veya localStorage.setItem('theme', 'light-theme');
                 themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon'); // Ay ikonu
            }
            console.log(`Tema değiştirildi: ${currentTheme}`);
        });
    } else {
         console.warn("Tema değiştirme butonu veya ikonu bulunamadı.");
    }


     // --- 2. Mobil Menü Açma/Kapama ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-navigation');
    const header = document.querySelector('header'); // Header elementine referans

    if (menuToggle && mainNav && header) {
        console.log("Mobil menü toggle bulundu.");
        menuToggle.addEventListener('click', () => {
            header.classList.toggle('nav-open'); // Header'a class ekle/kaldır
            const isExpanded = header.classList.contains('nav-open');
            menuToggle.setAttribute('aria-expanded', isExpanded); // Erişilebilirlik

            // İkonu değiştir (isteğe bağlı)
            const icon = menuToggle.querySelector('i');
            if (icon) { // İkon varsa işlem yap
                 if (isExpanded) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times'); // Kapatma ikonu
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars'); // Hamburger ikonu
                }
            }
            console.log(`Mobil menü ${isExpanded ? 'açıldı' : 'kapatıldı'}.`);
        });

        // Menü linklerine tıklandığında menüyü kapat (Smooth scroll'dan ÖNCE çalışmalı)
        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (header.classList.contains('nav-open')) {
                    header.classList.remove('nav-open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    const icon = menuToggle.querySelector('i');
                     if(icon){
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                     }
                    console.log("Nav linkine tıklandı, mobil menü kapatıldı.");
                }
            }, { capture: false }); // Smooth scroll'dan önce kapanması için capture false (varsayılan)
        });

    } else {
         console.warn("Mobil menü için gerekli elementler (toggle, nav, header) bulunamadı.");
    }


    // --- 3. Hero Alanı Arka Plan Değiştirici ---
    console.log("Hero BG Değiştirici Başlatılıyor...");
    const heroSection = document.getElementById('hero');
    const bgImageElement = heroSection?.querySelector('.hero-bg-image');
    const bgVideoElement = heroSection?.querySelector('.hero-bg-video');
    const heroMediaContainer = heroSection?.querySelector('.hero-background-media');

    // Arka plan medya listesi (kendi dosyalarınızla güncelleyin)
    const heroBackgrounds = [
        'images/hero-bg1.jpg',    // Index 0 (Başlangıç - Resim önerilir)
        'videos/hero-video1.mp4', // Index 1
        'images/hero-bg2.jpg',    // Index 2
        'videos/hero-video2.mp4', // Index 3
        'images/hero-bg3.jpg',
        'videos/hero-video3.mp4'
    ];
    let currentBgIndex = 0; // Başlangıç index'i
    const imageChangeInterval = 7000; // Resimlerin ekranda kalma süresi (ms)
    let backgroundTimeoutId = null; // setTimeout ID'sini saklamak için

    // Başlangıç index'ini HTML'deki aktif elemente göre belirle
    if (heroMediaContainer) {
        const activeElement = heroMediaContainer.querySelector('.active');
        if (activeElement) {
             const activeSrc = activeElement.src || activeElement.currentSrc;
             currentBgIndex = heroBackgrounds.findIndex(src => activeSrc && activeSrc.includes(src.split('/').pop()));
             if (currentBgIndex === -1) currentBgIndex = 0;
             console.log(`Başlangıç Medya Index (HTML'den): ${currentBgIndex}`);
        } else {
             console.warn("Hero'da başlangıçta 'active' sınıfına sahip medya bulunamadı. Index 0 varsayıldı.");
             currentBgIndex = 0;
             // İlk elemanı manuel olarak aktif yap (HTML'de yoksa)
             const firstSrc = heroBackgrounds[0];
             if(firstSrc.endsWith('.mp4') || firstSrc.endsWith('.webm')) {
                 if(bgVideoElement) bgVideoElement.classList.add('active');
             } else {
                 if(bgImageElement) bgImageElement.classList.add('active');
             }
        }
    }

    // Video bittiğinde çağrılacak fonksiyon
    const handleVideoEnd = (event) => {
        console.log(`>>> Video 'ended' olayı alındı: ${event.target.src}`);
        playNextBackground(); // Bir sonrakine geç
    };

    // Bir sonraki arka planı oynatma/gösterme fonksiyonu
    const playNextBackground = () => {
        if (!heroMediaContainer || !bgImageElement || !bgVideoElement) return;
        // console.log("--- playNextBackground çağrıldı ---");

        clearTimeout(backgroundTimeoutId);
        bgVideoElement.removeEventListener('ended', handleVideoEnd);

        const currentActive = heroMediaContainer.querySelector('.active');
        if (currentActive) {
            currentActive.classList.remove('active');
            if (currentActive.tagName === 'VIDEO') {
                 currentActive.pause();
                 currentActive.currentTime = 0;
            }
        }

        currentBgIndex = (currentBgIndex + 1) % heroBackgrounds.length;
        const nextSource = heroBackgrounds[currentBgIndex];
        console.log(`Sıradaki hero medya index: ${currentBgIndex}, kaynak: ${nextSource}`);

        if (nextSource.endsWith('.mp4') || nextSource.endsWith('.webm')) {
            // --- VİDEO ---
            bgVideoElement.src = nextSource;
            bgVideoElement.addEventListener('canplay', () => {
                // console.log(`Video yüklendi (canplay): ${nextSource}`);
                bgVideoElement.removeEventListener('ended', handleVideoEnd);
                bgVideoElement.addEventListener('ended', handleVideoEnd, { once: true });
                // console.log(`'ended' listener eklendi: ${nextSource}`);

                bgVideoElement.play().then(() => {
                    // console.log(`Video oynatılıyor: ${nextSource}`);
                }).catch(e => {
                    console.error(`Hero video oynatılamadı (${nextSource}):`, e);
                    bgVideoElement.removeEventListener('ended', handleVideoEnd);
                    backgroundTimeoutId = setTimeout(playNextBackground, 500);
                });
            }, { once: true });
             bgVideoElement.load();
            bgVideoElement.classList.add('active');

        } else {
            // --- RESİM ---
            bgImageElement.src = nextSource;
            bgImageElement.onload = () => { console.log(`Resim yüklendi: ${nextSource}`); };
            bgImageElement.onerror = () => {
                 console.error(`Hero resmi yüklenemedi: ${nextSource}`);
                 clearTimeout(backgroundTimeoutId);
                 playNextBackground(); // Hata durumunda sonrakine geç
            }
            bgImageElement.classList.add('active');
            // console.log(`Resim için ${imageChangeInterval}ms sonra geçiş planlandı.`);
            backgroundTimeoutId = setTimeout(playNextBackground, imageChangeInterval);
        }
    };

    // Hero döngüsünü başlat
    if (heroBackgrounds.length > 1 && heroMediaContainer) {
        console.log("Hero döngüsü başlatılıyor...");
        const firstSource = heroBackgrounds[currentBgIndex];
        if (firstSource.endsWith('.mp4') || firstSource.endsWith('.webm')) {
            // console.log("İlk medya video.");
            bgVideoElement.removeEventListener('ended', handleVideoEnd);
            bgVideoElement.addEventListener('ended', handleVideoEnd, { once: true });
            // Fallback timeout
            const firstVideoDuration = bgVideoElement.duration;
            let fallbackTime = isNaN(firstVideoDuration) || firstVideoDuration === Infinity ? imageChangeInterval * 1.5 : (firstVideoDuration * 1000) + 1000;
            // console.log(`İlk video için fallback timeout (${fallbackTime}ms) planlandı.`);
             backgroundTimeoutId = setTimeout(() => {
                   if(body.contains(bgVideoElement) && bgVideoElement.classList.contains('active')) {
                       console.warn("İlk video 'ended' olayı gelmedi, fallback timeout tetiklendi.");
                       playNextBackground();
                   }
            }, fallbackTime);
             // Gerekirse ilk videoyu oynatmayı dene (eğer HTML'de autoplay yoksa)
             // bgVideoElement.play().catch(e => console.error("İlk video otomatik oynatılamadı.", e));
        } else {
            // console.log("İlk medya resim.");
            backgroundTimeoutId = setTimeout(playNextBackground, imageChangeInterval);
        }
    } else if (heroBackgrounds.length <= 1) {
        console.log("Hero için yeterli medya yok, döngü başlatılmadı.");
    } else {
        console.warn("Hero elementleri bulunamadı, döngü başlatılamadı.");
    }


    // --- 4. Proje Kartı Video Oynatma ---
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        console.log(`${projectCards.length} proje kartı bulundu.`);
        projectCards.forEach((card, index) => {
            const video = card.querySelector('.project-video');
            if (video && video.src && !video.src.endsWith('#')) {
                card.addEventListener('mouseenter', () => {
                    video.play().catch(error => {});
                });
                card.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0;
                });
            }
        });
    } else {
        console.warn("Proje kartı (.project-card) bulunamadı.");
    }


    // --- 5. Etkileşimli Yetenekler Bölümü (Intersection Observer) ---
    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer) {
        console.log("Yetenekler konteyneri bulundu, Intersection Observer ayarlanıyor.");
        const skillItems = skillsContainer.querySelectorAll('.skill-item');
        let skillsAnimated = false; // Animasyonun sadece bir kere çalışmasını sağlamak için flag

        const animateSkills = (entries, observer) => {
            entries.forEach(entry => {
                // Eğer konteyner ekrana girdiyse ve animasyon daha önce çalışmadıysa
                if (entry.isIntersecting && !skillsAnimated) {
                    console.log("Yetenekler bölümü göründü, animasyon başlıyor.");
                    skillsAnimated = true; // Flag'i set et
                    skillItems.forEach((item, index) => {
                        const progressBar = item.querySelector('.progress-bar');
                        const level = item.dataset.level;
                        if (progressBar && level) {
                             setTimeout(() => {
                                 progressBar.style.width = level + '%';
                             }, index * 100); // Gecikmeli başlatma
                        }
                    });
                    observer.unobserve(skillsContainer); // Observer'ı durdur
                    console.log("Yetenekler observer durduruldu.");
                }
            });
        };

        const skillsObserver = new IntersectionObserver(animateSkills, {
            root: null,
            threshold: 0.1 // %10 görünürlük
        });
        skillsObserver.observe(skillsContainer);
        console.log("Yetenekler observer başlatıldı.");
    } else {
        console.warn("Yetenekler konteyneri (.skills-container) bulunamadı.");
    }


    // --- 6. Yumuşak Kaydırma (Smooth Scroll) ---
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]'); // Tüm # ile başlayan linkler
    if (smoothScrollLinks.length > 0) {
        console.log(`${smoothScrollLinks.length} smooth scroll linki bulundu.`);
        const headerElementForScroll = document.querySelector('header'); // Header'ı al

        smoothScrollLinks.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return; // Sadece # ise veya link değilse çık

                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault(); // Varsayılan atlamayı engelle

                    // Güncel header yüksekliğini al (menü açık/kapalı durumuna göre değişebilir)
                    const headerHeight = headerElementForScroll ? headerElementForScroll.offsetHeight : 70;
                    console.log(`Kaydırma hedefi: ${href}, Header Yüksekliği: ${headerHeight}`);

                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = window.pageYOffset + elementPosition - headerHeight - 10; // Header ve boşluk payı

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // NOT: Mobil menüyü kapatma işlevi zaten yukarıdaki mobil menü kısmında handle ediliyor.
                    // Burada tekrar kapatmaya gerek yok.
                } else {
                     console.warn(`Kaydırma hedefi bulunamadı: ${href}`);
                }
            });
        });
    } else {
         console.warn("Smooth scroll için link bulunamadı.");
    }


    console.log("Portfolyo script'i tamamen yüklendi ve çalışmaya hazır.");
}); // DOMContentLoaded Sonu
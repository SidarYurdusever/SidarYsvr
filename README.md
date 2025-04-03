# Sidar Yurdusever - Kişisel Portfolyo Websitesi

Bu repo, Sidar Yurdusever'in kişisel portfolyo web sitesinin kodlarını içermektedir. Site, Tarsus Üniversitesi Bilgisayar Mühendisliği öğrencisi olan Sidar'ın yeteneklerini, tamamladığı projeleri sergilemek ve potansiyel işverenler veya işbirlikçileri için bir iletişim noktası sağlamak amacıyla oluşturulmuştur.

Websitesi, modern web teknolojileri kullanılarak geliştirilmiş olup, dinamik ve kullanıcı dostu bir deneyim sunmayı hedefler. Açık ve koyu tema desteği, duyarlı tasarım ve çeşitli animasyonlar gibi özellikler içerir.

<!-- Opsiyonel: Buraya sitenin bir ekran görüntüsünü ekleyebilirsiniz -->
<!-- ![Portfolyo Ekran Görüntüsü](images/screenshot.png) -->

<!-- Opsiyonel: Canlı demo linkini buraya ekleyebilirsiniz -->
**Canlı Demo:** [https://sidaryurdusever.github.io/](https://sidaryurdusever.github.io/) <!-- Kendi GitHub Pages linkinizle değiştirin -->

---

## Özellikler

*   **Açık/Koyu Tema Desteği:** Kullanıcı tercihine göre arayüz temasını değiştirme ve bu tercihi tarayıcıda (`localStorage`) saklama.
*   **Duyarlı Tasarım (Responsive):** Farklı ekran boyutlarına (masaüstü, tablet, mobil) uyum sağlayan yapı. Mobil cihazlar için hamburger menü.
*   **Dinamik Hero Alanı:** Sayfa açılışında dikkat çekici, otomatik değişen resim ve video arka planları.
*   **Etkileşimli Yetenekler Bölümü:** Yeteneklerin seviyesini gösteren ilerleme çubukları (sayfa kaydırıldığında animasyonla dolar) ve her yetenek için açıklayıcı bilgi kutucukları (tooltip).
*   **Proje Kartları:** Projeleri listeleyen kartlar. Fare üzerine gelindiğinde proje ile ilgili kısa bir videonun (varsa) oynatılması.
*   **CV İndirme:** Kullanıcının güncel CV'sini kolayca indirebilmesi için buton.
*   **İletişim Bölümü:** E-posta adresi ve sosyal medya profillerine (GitHub, LinkedIn vb.) bağlantılar.
*   **Yumuşak Kaydırma (Smooth Scroll):** Sayfa içi navigasyon linklerine tıklandığında ilgili bölüme akıcı bir geçiş.
*   **Modern Arayüz:** CSS Değişkenleri, Flexbox ve Grid gibi modern CSS teknikleri ile oluşturulmuş temiz ve estetik tasarım.

---

## Kullanılan Teknolojiler

*   **Frontend:**
    *   HTML5 (Semantik etiketler)
    *   CSS3 (CSS Değişkenleri, Flexbox, Grid, Animasyonlar, Geçişler, Duyarlı Tasarım)
    *   JavaScript (DOM Manipülasyonu, Olay Dinleyiciler, `localStorage`, `IntersectionObserver` API, `setTimeout`)
*   **İkonlar:**
    *   Font Awesome

---

## Proje Yapısı

/
|-- index.html # Ana HTML dosyası
|-- style.css # Ana stil dosyası
|-- script.js # Ana JavaScript dosyası
|-- images/ # Resim dosyalarının bulunduğu klasör
| |-- hero-bg1.jpg
| |-- hero-bg2.jpg
| |-- hero-bg3.jpg
| |-- profil.jpg
| |-- proje1.jpg
| |-- proje2.jpg
| |-- ... (diğer gerekli resimler)
|-- videos/ # Video dosyalarının bulunduğu klasör (Opsiyonel)
| |-- hero-video1.mp4
| |-- hero-video2.mp4
| |-- hero-video3.mp4
| |-- proje1.mp4
| |-- proje2.mp4
| |-- ... (diğer gerekli videolar)
|-- files/ # İndirilebilir dosyaların bulunduğu klasör
| |-- cv.pdf
|-- README.md # Bu dosya


**Not:** `videos` klasörü ve içindeki dosyalar, eğer projelerinizde veya hero alanında video kullanıyorsanız gereklidir. Kullanmıyorsanız bu klasöre ihtiyaç yoktur.

---

## Kurulum ve Çalıştırma

Bu proje tamamen frontend tabanlı olduğu için özel bir kurulum gerektirmez.

1.  **Depoyu Klonlayın:**
    ```bash
    git clone https://github.com/SidarYurdusever/PORTFOLYO-REPO-ADINIZ.git
    ```
    *(`SidarYurdusever/PORTFOLYO-REPO-ADINIZ` kısmını kendi GitHub kullanıcı adınız ve repo adınızla değiştirin)*

2.  **Klasöre Gidin:**
    ```bash
    cd PORTFOLYO-REPO-ADINIZ
    ```

3.  **Tarayıcıda Açın:**
    `index.html` dosyasına çift tıklayarak veya dosya yolunu kopyalayıp web tarayıcınızın adres çubuğuna yapıştırarak siteyi yerel makinenizde görüntüleyebilirsiniz.

---

## Özelleştirme

Siteyi kendi bilgilerinizle güncellemek için aşağıdaki adımları takip edebilirsiniz:

1.  **`index.html`:**
    *   Metin içeriklerini (Hakkımda, Proje açıklamaları, İletişim metni vb.) güncelleyin.
    *   Kendi projelerinizi ve detaylarını (`.project-card` bölümleri) ekleyin/düzenleyin.
    *   Yeteneklerinizi (`.skill-item` bölümleri), seviyelerini (`data-level`) ve açıklamalarını (`data-tooltip`) güncelleyin.
    *   İletişim bilgilerinizi (e-posta, sosyal medya linkleri) değiştirin.
    *   CV indirme linkini (`files/cv.pdf`) kendi dosyanızla güncelleyin. Dosya adını da (`download` özelliği) değiştirmeyi unutmayın.
2.  **`style.css`:**
    *   Renk paletini değiştirmek isterseniz `:root` ve `body.dark-theme` içindeki CSS değişkenlerini düzenleyebilirsiniz.
    *   Fontları veya genel yerleşimi değiştirmek için ilgili CSS kurallarını güncelleyin.
3.  **`script.js`:**
    *   Hero alanında kullanılacak resim ve video listesini `heroBackgrounds` dizisinde güncelleyin.
    *   Animasyon sürelerini veya tema değiştirici davranışını (gerekirse) ayarlayın.
4.  **Klasörler:**
    *   `images/` klasörüne kendi profil fotoğrafınızı (`profil.jpg`), proje görsellerinizi ve hero arka plan resimlerinizi ekleyin. HTML'deki dosya yollarını kontrol edin.
    *   `videos/` klasörüne (kullanıyorsanız) kendi hero ve proje videolarınızı ekleyin. HTML ve JS'deki dosya yollarını kontrol edin.
    *   `files/` klasörüne kendi CV dosyanızı (`cv.pdf` veya farklı bir isimle) yükleyin ve HTML'deki linki güncelleyin.

---

## İletişim

Sidar Yurdusever – [@SidarYurdusever](https://github.com/SidarYurdusever) – sidaryurdusever@gmail.com

Proje Linki: [https://github.com/SidarYurdusever/PORTFOLYO-REPO-ADINIZ](https://github.com/SidarYurdusever/PORTFOLYO-REPO-ADINIZ) <!-- Repo linkini güncelleyin -->

---


# Randevu Sistemi Tasarımı

**Tarih:** 27 Temmuz 2026

**Durum:** Tasarım bölümleri kullanıcı tarafından onaylandı. Belge, uygulama
planına geçilmeden önce kullanıcı incelemesine sunulacaktır.

## 1. Amaç

Google Apps Script ile çalışan mevcut seans takvimi; daha güvenilir kayıt
yapan, iPhone ana ekranına kurulabilen, uygulama kapalıyken bildirim
gönderebilen ve ayrıntılı rapor üreten yeni bir sisteme dönüştürülecektir.

Sistem şu süreci düzenler:

1. Vatandaş çağrı merkezini arar.
2. Talep Bridge sistemi üzerinden birime iletilir.
3. Tıbbi sekreter Bridge'deki bilgiyi görüp randevuyu yeni sisteme manuel girer.
4. Psikolog seans sonrasında randevu durumunu kaydeder.
5. Sekreter gün sonu işlemlerini takip eder.
6. Psikolog, yetkili rapor ekranından aylık sonuçları inceler ve dışa aktarır.

Bridge ile yazılımsal entegrasyon yapılmayacaktır.

## 2. Kapsam

- İlk sürüm tek psikoloğun takvimi için hazırlanır.
- İleride ikinci psikolog eklenirse uygulama ve veriler ayrı bir örnek olarak
  çoğaltılabilir.
- Başlangıçta dört kullanıcı vardır: Psikolog/Yönetici, Dilara, Medine ve Ecem.
- Danışan için yalnızca ad ve soyad saklanır.
- Telefon ve adres ilk sürümde saklanmaz.
- Uygulama Türkçe ve öncelikle iPhone kullanımına uygun olacaktır.

### Kapsam dışı

- Bridge entegrasyonu
- WhatsApp, SMS veya e-posta bildirimi
- App Store üzerinden yerel iPhone uygulaması
- Telefon ve adres kaydı
- Aynı veritabanını paylaşan çok psikologlu yapı
- Herkese açık tanıtım sitesi

## 3. Mevcut sistemde belirlenen sorunlar

Mevcut Google Apps Script projesi:

`https://script.google.com/home/projects/12TStIAo0z18lKv2miPG1CARRwmrNZdx4tQ8RpXgQuLDKZyd7GwvdAjLx/edit?hl=tr`

İncelemede görülen temel riskler:

- Randevular tek bir JSON dizisi olarak User Properties alanında tutulmaktadır.
- Her değişiklikte bütün dizi yeniden kaydedilmektedir.
- Eşzamanlı kayıtlar birbirini ezebilir.
- Asenkron kayıtların başarı ve hata geri bildirimi yetersizdir.
- Birden fazla dağıtım bağlantısı eski sürümün kullanılmasına yol açabilir.
- Büyük tek HTML dosyası bakım ve sürüm yönetimini zorlaştırmaktadır.
- İki habersiz iptal uyarısı, kısıtlama bitişini tarihe göre kontrol etmediği
  için aylar sonra da görünebilmektedir.
- Mevcut rapor çift seansı iki işlem saymaktadır.

Yeni sistem, mevcut projeyi büyütmek yerine ayrı bir uygulama olarak kurulacaktır.

## 4. Teknik mimari

Yeni sistem Cloudflare üzerinde çalışan bir PWA olacaktır.

### Bileşenler

- **Cloudflare Worker:** Arayüzü, güvenli API'yi ve bütün iş kurallarını çalıştırır.
- **Cloudflare D1:** Kullanıcıları, danışanları, randevuları ve işlem geçmişini
  ilişkisel veritabanında saklar.
- **Cloudflare Cron:** Hatırlatma zamanlarını Türkiye saatine göre kontrol eder.
- **Web Push:** Her kayıtlı iPhone için kapalı uygulama bildirimi gönderir.
- **Cloudflare R2:** Şifreli uzun süreli yedekleri saklar.
- **PWA servis çalışanı:** Yalnızca sürümlenmiş uygulama ekran dosyalarını
  önbelleğe alır.

Arayüz ve API aynı Worker alanından sunulur. Böylece ayrı sunucu, ücretli mesaj
servisi veya App Store üyeliği gerekmez.

### Temel veri akışı

1. Kullanıcı PWA'yı açar ve geçerli cihaz oturumuyla kimliği doğrulanır.
2. Takvim verisi D1'den güncel olarak alınır.
3. Kullanıcı bir işlem gönderir.
4. Worker yetkiyi, tarih kurallarını ve saat çakışmasını doğrular.
5. D1 işlemi tek parça halinde kaydeder.
6. Aynı işlem içinde değiştirilemeyen hareket kaydı oluşturulur.
7. Veritabanı başarı vermeden arayüz işlemi tamamlanmış göstermez.

## 5. Kalıcı adres ve indekslenmeme

Uygulama ücretsiz `workers.dev` adresinde çalışacaktır. Adres şu yapıda olacaktır:

`seans-takvimi-ozelkod.hesapadi.workers.dev`

Uygulama teknik olarak internetten erişilebilen bir adrese sahip olsa da arama
motoru sonuçlarına girmemesi için:

- Bütün HTML cevaplarında `meta robots` değeri `noindex, nofollow, noarchive` olur.
- Bütün cevaplarda eşdeğer `X-Robots-Tag` başlığı gönderilir.
- Herkese açık site haritası veya içerik sayfası oluşturulmaz.
- Giriş yapılmadan hiçbir danışan, takvim, rapor veya işlem verisi döndürülmez.

Adresin bilinmemesi bir güvenlik yöntemi sayılmaz. Asıl güvenlik giriş, oturum ve
sunucu tarafı yetki kontrolleriyle sağlanır.

## 6. Kullanıcılar, roller ve oturumlar

### Kullanıcılar

- **Psikolog/Yönetici**
- **Dilara**
- **Medine**
- **Ecem**

Tüm kullanıcılar:

- Randevu ekleyebilir.
- Randevu taşıyabilir.
- Randevu durumunu değiştirebilir.
- Randevu silebilir.
- Danışan arayabilir.
- Takvimi ve geçmiş randevuları görebilir.

Yalnızca Psikolog/Yönetici:

- Rapor bölümünü açabilir.
- Kullanıcı ekleyebilir veya devre dışı bırakabilir.
- PIN sıfırlayabilir.
- Kayıp cihaz oturumunu iptal edebilir.
- Aktif sorumlu sekreteri değiştirebilir.
- Yedek indirebilir ve geri yükleme başlatabilir.
- Değiştirilemeyen işlem geçmişini görebilir.

Yetkiler yalnızca ekranda düğme gizleyerek değil, her API çağrısında sunucu
tarafında denetlenir.

### Giriş

- Sekreter kullanıcı adları `dilara`, `medine` ve `ecem` olacaktır.
- Yönetici kullanıcı adı ilk kurulumda psikolog tarafından seçilecektir.
- Her kullanıcıya ayrı, altı haneli PIN verilir.
- PIN açık metin olarak saklanmaz veya günlük kayıtlarına yazılmaz.
- PIN, kullanıcıya özel tuz ve yalnızca sunucuda bulunan gizli anahtarla
  yavaşlatılmış biçimde doğrulanır.
- Aynı hesapta beş yanlış deneme sonrası 15 dakika giriş kilidi uygulanır.
- Deneme sınırı hem hesap hem bağlantı kaynağı için kontrol edilir.

### Kalıcı cihaz oturumu

- İlk başarılı girişte telefona rastgele ve iptal edilebilir bir oturum verilir.
- Oturum bilgisi `Secure`, `HttpOnly` ve `SameSite=Strict` çerezinde tutulur.
- Düzenli kullanılan cihazın oturumu otomatik yenilenir; her açılışta PIN sorulmaz.
- Çıkış, tarayıcı verilerinin silinmesi, telefon değişimi veya yöneticinin
  oturumu iptal etmesi yeniden giriş gerektirir.
- Her cihaz ayrı kaydedilir ve yönetici tarafından tek tek kapatılabilir.

## 7. Veri modeli

Veriler tek bir büyük JSON alanında değil, ayrı tablolarda tutulur:

- `users`: kullanıcı, rol, PIN doğrulama bilgisi ve aktiflik
- `sessions`: cihaz oturumları, son kullanım ve iptal durumu
- `push_subscriptions`: cihaz bildirim abonelikleri
- `clients`: danışan kimliği, görüntülenen ad ve normalize arama adı
- `appointments`: tarih, saat, durum ve danışan bağlantısı
- `availability_blocks`: izin, süpervizyon ve elle kapatılan zamanlar
- `holidays`: tam ve yarım günlük resmî tatiller
- `duty_delegations`: sorumlu sekreter ve tarih aralığı
- `reminder_tasks`: günlük çağrı merkezi sorusu ve cevabı
- `notification_deliveries`: bildirim gönderim ve teslim denemeleri
- `audit_log`: ekleme, değiştirme, silme, görev devri ve yönetim işlemleri
- `backup_registry`: oluşturulan yedekler, tarih, boyut ve doğrulama sonucu

Silinen randevular fiziksel olarak hemen yok edilmez; silinmiş olarak işaretlenir
ve normal takvim ile raporlardan çıkarılır. Hareket geçmişi değiştirilemez.

Aktif randevular için tarih ve saat birleşimi veritabanı düzeyinde benzersizdir.
İki telefon aynı anda aynı kutuyu doldurmaya çalışsa bile yalnızca biri başarılı olur.

## 8. Takvim ve mobil arayüz

Çalışma günleri hafta içidir. Randevu saatleri:

- 09.00
- 10.00
- 11.00
- 14.00
- 15.00
- 16.00

Uygulama haftalık tabloyla açılır:

- Pazartesi–Cuma sütunlarda yer alır.
- Altı seans saati satırlarda yer alır.
- Üstte önceki ve sonraki haftaya geçiş okları bulunur.
- Dolu, boş, çift seans ve kapalı saatler hem renk hem metinle ayrılır.

Bir günün başlığına, örneğin `SALI 28` üzerine dokunulduğunda günlük görünüm
açılır. Günlük ekranda altı saat büyük ve rahat dokunulabilir kutulardır.
`Haftalık görünüme geç` düğmesi tabloya döndürür.

Boş saate dokunulduğunda ek bir seçim menüsü göstermeden doğrudan
`Randevu ekle` penceresi açılır.

Onaylanan görsel taslaklar geçici tasarım klasöründe saklanmıştır:

`.superpowers/brainstorm/visual-20260727-1/content/`

## 9. Danışan ve randevu kuralları

### Danışan adı

- Kullanıcının yazdığı ad ve soyad Türkçe büyük harfe dönüştürülür.
- Gereksiz baş ve son boşluklar temizlenir; birden fazla boşluk teke indirilir.
- Arama büyük/küçük harf ve Türkçe `i/İ` farkından etkilenmez.
- Yeni randevu sırasında mevcut danışanlar önerilir.
- Kullanıcı mevcut kişiyi seçebilir veya yeni danışan oluşturabilir.
- Randevu yazılı isim metnine değil, kalıcı danışan kimliğine bağlanır.

### Randevu durumları

- Planlanmış
- Geldi
- Çift Seans
- Haberli İptal
- Habersiz İptal

Çift seans tek randevu kaydı ve tek takvim kutusudur. Takvimde açıkça
`Çift Seans` görünür; gerçekleştirilen işlem sayısında bir sayılır.

Randevu uygun başka bir boş saate taşınabilir. Eski ve yeni tarih ile saat
hareket geçmişine yazılır. Düzeltme amacıyla geçmiş kayıt değiştirildiğinde de
eski değer korunur.

## 10. İki habersiz iptal kuralı

Planlanmış gelecek randevular dikkate alınmadan danışanın sonuçlandırılmış son
iki randevusu incelenir.

Son iki sonuç da Habersiz İptal ise:

- İkinci habersiz iptal tarihinden itibaren bir takvim aylık kısıtlama başlar.
- Sekreter bu süre içinde yeni randevu kaydı oluşturabilir.
- Seçilen randevu tarihi kısıtlama bitişinden önce olamaz.
- Örneğin ikinci iptal 5 Ağustos ise en erken 5 Eylül tarihine randevu verilebilir.
- Süre dolduğunda uyarı otomatik kalkar.
- Önceki durum daha sonra düzeltilirse kısıtlama yeniden hesaplanır.

Kontrol danışan kimliği üzerinden yapılır; adı farklı ya da eksik yazarak
kısıtlamanın aşılması engellenir.

## 11. Resmî tatil ve uygun olmama kayıtları

### Resmî tatiller

- Sisteme doğrulanmış 2026–2035 Türkiye resmî tatil takvimi yerleştirilir.
- Sabit tarihli tatiller yıllık kurallarla oluşturulur.
- Ramazan ve Kurban Bayramı gibi değişken tarihler doğrulanmış yıllık tabloda tutulur.
- Tam günlük tatiller bütün randevu saatlerini kapatır.
- Arefe günleri ve 28 Ekim gibi yarım günlerde öğleden sonraki saatler kapanır.
- Takvimde tatilin adı gösterilir.
- Tatil verisinin son yılı yaklaşırken yöneticiye güncelleme uyarısı verilir.
- Yönetici sonradan ilan edilen tam veya yarım günlük kapanış ekleyebilir.

Sonradan kapatılan bir saatte mevcut randevu varsa randevu silinmez. Sistem
çakışan kayıtları yöneticiye gösterir ve taşınmasını ister.

### Psikolog izni ve süpervizyon

- Psikolog tarih aralığıyla izin girebilir.
- İzinli günlerde kutularda `İzinli` görünür ve randevu verilemez.
- Bir saat için `SÜPERVİZYON` girilirse saat kapalı kabul edilir.
- Yalnızca çizgi işaretlerinden oluşan girişler de kapalı saat kabul edilir.
- İzin, tatil, süpervizyon ve çizgi kayıtları hiçbir işlem raporuna girmez.

## 12. Sekreter görevi ve izin devri

- Varsayılan sorumlu sekreter Dilara'dır.
- Dilara izin veya geçici görevlendirme tarih aralığı girerken Medine ya da
  Ecem'i seçmek zorundadır.
- İzin aralığında iş hatırlatmaları yalnızca seçilen kişiye gider.
- Psikoloğa izin tarihleri ve görevi devralan kişi bildirilir.
- Dilara erken dönerse `Görevi geri al` işlemiyle sorumluluğu yeniden üstlenir.
- Bu değişiklik psikoloğa bildirilir.
- Psikolog/Yönetici gerektiğinde aktif sorumluyu değiştirebilir.
- İzinli kullanıcı uygulamayı açabilir ve randevu işlemlerini yapabilir; yalnızca
  iş hatırlatmalarını almaz.

## 13. Günlük bildirim akışı

Bildirim zamanları Europe/Istanbul saat dilimine göre değerlendirilir.
Yeni günlük görev yalnızca hafta içi ve tam günlük resmî tatil olmayan çalışma
günlerinde oluşturulur.

| Zaman | Davranış |
|---|---|
| 16.45 | Aktif sorumluya “Bugünkü talepleri çağrı merkezine gönderdin mi?” bildirimi gider. |
| 17.00 | Henüz Evet denmediyse yeniden hatırlatılır. |
| 17.15 | Hâlâ tamamlanmadıysa son hatırlatma gönderilir. |
| Sonraki iş günü 08.45 | Önceki tarih belirtilerek yeniden sorulur. |

Bildirim açıldığında uygulamada `Evet` ve `Hayır` düğmeleri gösterilir.

- **Evet:** Günlük görevi kapatır; sonraki hatırlatmaları iptal eder ve
  psikoloğa tarih, cevaplayan kişi ve tamamlanma bilgisini gönderir.
- **Hayır:** Görevi açık bırakır.
- **Cevapsız:** Görevi açık bırakır.
- 17.15 sonrasında fakat 08.45'ten önce Evet verilirse sabah bildirimi gönderilmez.
- Hafta sonları ve tam günlük resmî tatiller sonraki iş günü hesabına girmez.
- Ertesi gün sorusu ilgili eski tarihi açıkça içerir.
- Görev devri sırasında açık görevler de yeni sorumluya geçer.

Her tarih için yalnızca bir günlük görev vardır. Zamanlanmış kontrol tekrar
çalışsa bile aynı bildirim aynı aşama için iki kez oluşturulmaz. Gönderim
denemesi, cevap, cevaplayan kişi ve zaman kayıt altına alınır.

Bildirim kapalı veya telefon çevrimdışıysa teslim garantisi yoktur. Açık görev
uygulamada görünmeye devam eder ve bildirim izni kapalıysa kullanıcı uyarılır.

## 14. Danışan araması

Arama bütün kullanıcılara açıktır. Danışan seçildiğinde:

- Yaklaşan randevular en yakın tarihten başlayarak gösterilir.
- Geçmiş randevular en yeniden eskiye doğru gösterilir.
- Her satırda tarih, saat ve durum bulunur.
- Aktif habersiz iptal kısıtlamasının bitiş tarihi gösterilir.

## 15. Raporlama

Rapor ekranı ve rapor API'leri yalnızca Psikolog/Yönetici rolüne açıktır.
Ay veya özel tarih aralığı seçilebilir. Filtre, kaydın oluşturulduğu tarihe
değil seans tarihine uygulanır.

Ayrı sayımlar:

- Geldi
- Çift Seans
- Haberli İptal
- Habersiz İptal
- Planlanmış
- Gerçekleştirilen İşlem

Gerçekleştirilen İşlem hesabı:

- Geldi = 1
- Çift Seans = 1
- Haberli İptal = 0
- Habersiz İptal = 0
- Planlanmış = 0

İzin, tatil, süpervizyon, çizgiyle kapatılan saatler ve silinen randevular
rapora girmez.

### Dışa aktarma

- **PDF:** Yazdırılabilir özet ve ayrıntılı randevu listesi
- **Excel:** Ayrı özet ve ayrıntı sayfaları

Ayrıntıda danışan adı soyadı, seans tarihi, saati ve durumu bulunur. Türkçe
karakterlerin PDF ve Excel'de bozulmaması doğrulanır.

## 16. Hareket geçmişi

Değiştirilemeyen hareket kaydı en az şu olayları tutar:

- Randevu oluşturma
- Randevu taşıma
- Durum değiştirme
- Randevu silme
- Danışan oluşturma veya birleştirme
- İzin ve uygun olmama kaydı
- Görev devri ve erken dönüş
- Kullanıcı ve PIN yönetimi
- Cihaz oturumu iptali
- Yedek oluşturma ve geri yükleme

Her kayıtta işlemi yapan kullanıcı, zaman, işlem türü, önceki değer ve yeni değer
bulunur. Hareket geçmişi yalnızca yönetici tarafından görüntülenebilir.

## 17. Önbellek, çevrimdışı kullanım ve hatalar

- PWA yalnızca sürümlenmiş ekran ve simge dosyalarını önbelleğe alır.
- Danışan, randevu ve rapor API cevapları `no-store` olarak gönderilir.
- Kişisel veriler cihazda kalıcı çevrimdışı veri olarak saklanmaz.
- Uygulama kabuğu çevrimdışı açılabilir fakat veri göstermez ve işlem yaptırmaz.
- Çevrimdışıyken yazma işlemi sıraya alınmaz.
- Kullanıcıya `İnternet bağlantısı yok; hiçbir değişiklik kaydedilmedi` mesajı verilir.
- Başarısız işlem, veritabanı onayı gelmeden takvimde başarılı gösterilmez.
- Sunucu hatası anlaşılır açıklama ve kişisel veri içermeyen takip numarası üretir.
- Oturum geçersizse veri göstermeden giriş ekranına döner.
- Saat başka kullanıcı tarafından doldurulmuşsa takvim yenilenir ve yeni saat istenir.
- Yeni uygulama sürümü çıktığında eski statik önbellek değiştirilir ve gerekirse
  `Yeni sürüm hazır` bildirimi gösterilir.

## 18. Yedekleme ve geri yükleme

### Kısa dönem

Cloudflare D1'in ücretsiz planda otomatik çalışan yedi günlük noktasal geri
dönüş özelliği kullanılır.

### Uzun dönem

- Her gece D1 verisinin şifreli yedeği R2'ye yazılır.
- Yedek şifreleme kurtarma anahtarı Cloudflare uygulama sırlarından ayrı,
  çevrimdışı bir kurtarma kaydı olarak yöneticiye teslim edilir.
- Günlük yedekler 90 gün saklanır.
- Her ayın son yedeği 12 ay saklanır.
- Canlı randevu geçmişi kullanıcı silmediği sürece süresizdir.
- Süresi dolan yedekler otomatik temizlenir.
- Yedek oluşturulduktan sonra bütünlük kontrolü yapılır.
- Başarısız yedek yöneticiye uygulama içi uyarı ve push bildirimi üretir.

Yönetici yedek tarihini, boyutunu ve doğrulama durumunu görebilir. Yedek indirme
işleminde yönetici PIN'i yeniden sorulur ve indirme hareket geçmişine yazılır.

Geri yükleme:

1. Yalnızca yönetici başlatabilir.
2. Yönetici PIN'i yeniden sorulur.
3. İkinci ve açık bir onay gösterilir.
4. Uygulama kısa süreli bakım moduna alınarak yeni yazma işlemleri durdurulur.
5. Mevcut durumun güvenlik yedeği alınır.
6. Seçilen yedek geri yüklenir.
7. Sonuç doğrulanır, bakım modu kapatılır ve işlem hareket geçmişine yazılır.

## 19. Mevcut verilerin taşınması

1. Mevcut Google Apps Script verisi salt okunur bir dışa aktarımla yedeklenir.
2. Geçmiş ve gelecek bütün randevular dönüştürme aracına alınır.
3. Adlar Türkçe normalizasyon kurallarına göre hazırlanır.
4. Aynı normalize tam ada sahip kayıtlar bir danışan adayı altında gruplanır.
5. Benzer fakat kesin olmayan isimler kullanıcı inceleme listesine alınır.
6. Kullanıcı gerekirse aynı adlı kişileri ayrı bırakabilir veya kayıtları birleştirebilir.
7. Geçersiz tarih, bilinmeyen durum ve aynı saat çakışmaları ayrı listelenir.
8. Hiçbir sorunlu kayıt sessizce silinmez.
9. Yeni sistemde toplam randevu sayısı ve durum dağılımı eski yedekle karşılaştırılır.
10. Kullanıcı örnek geçmiş ve gelecek randevuları kontrol eder.
11. Kullanıcı doğrulamasından sonra yeni sistem kullanıma açılır.

Geçiş sırasında eski sistem yeni kayıt girişine kısa süreli kapatılır. Son yedek
ve aktarım tamamlandıktan sonra eski uygulama en az 30 gün salt okunur kontrol
amacıyla korunur.

## 20. Test yaklaşımı

İş kuralları otomatik testlerle; bildirim ve iPhone davranışı gerçek cihaz
testleriyle doğrulanır.

### Otomatik testler

- Türkçe ad normalizasyonu ve arama
- Randevu ekleme, taşıma, silme ve durum değişimi
- Eşzamanlı aynı saat kaydı
- İki habersiz iptal ve bir aylık tarih hesabı
- Durum düzeltildiğinde kısıtlamanın yeniden hesaplanması
- Tam ve yarım gün tatiller
- İzin, süpervizyon ve çizgi girişleri
- Görev devri ve erken dönüş
- 16.45, 17.00, 17.15 ve 08.45 zaman akışı
- Aynı bildirimin iki kez üretilmemesi
- Rapor yetkisi ve bütün sayım kuralları
- Çift seansın bir işlem sayılması
- PDF ve Excel içeriği
- Yedek bütünlüğü ve deneme geri yüklemesi
- Yetkisiz API erişimlerinin reddedilmesi
- Önbellek ve sürüm yenileme davranışı

### Gerçek cihaz kabul testleri

- Dört ayrı kullanıcı hesabıyla giriş
- Aynı telefonda kalıcı oturum
- Yönetici tarafından cihaz oturumu iptali
- iPhone ana ekranına ekleme
- Uygulama kapalıyken push bildirimi
- Bildirim açıldığında doğru tarihli görev ekranı
- Bildirim izni kapalı uyarısı
- İki telefondan eşzamanlı randevu denemesi
- PDF ve Excel dosyalarının telefondan indirilmesi

## 21. Kullanıma geçiş

1. Sistem deneme verileriyle Cloudflare üzerinde yayımlanır.
2. Önce Psikolog/Yönetici hesabı ve telefonu kurulur.
3. Dilara, Medine ve Ecem hesapları ile cihazları kurulur.
4. Bildirim izinleri ve test bildirimleri doğrulanır.
5. Bütün otomatik ve gerçek cihaz testleri tamamlanır.
6. Eski veri yedeklenir ve yeni sisteme aktarılır.
7. Sayımlar ve örnek danışan geçmişleri kullanıcı tarafından doğrulanır.
8. Yeni sistem üretim kullanımına açılır.
9. Eski sistem en az 30 gün salt okunur tutulur.

## 22. Başarı ölçütleri

Sistem ancak aşağıdakilerin tamamı doğrulandığında hazır kabul edilir:

- Randevu değişiklikleri kaybolmaz ve eşzamanlı işlemler birbirini ezmez.
- Kullanıcılar aynı iPhone'da tekrar tekrar giriş yapmak zorunda kalmaz.
- Yetkisiz kullanıcı rapor ve yönetim verilerine erişemez.
- İzinli sekretere iş bildirimi gitmez.
- Bildirimler doğru kişiye ve doğru zamanda gider.
- Uygulama kapalıyken iPhone bildirimi alınır.
- Habersiz iptal kısıtlaması doğru tarihte başlar ve biter.
- Tatil, izin ve kapalı saatlere randevu verilemez.
- Danışan araması geçmiş ve gelecek kayıtları doğru gösterir.
- Çift seans raporda bir gerçekleştirilen işlem sayılır.
- PDF ve Excel sonuçları ekrandaki sayımlarla eşleşir.
- Eski verilerin toplamı ve durum dağılımı yeni sistemle eşleşir.
- Yedek alınabilir ve deneme ortamında başarıyla geri yüklenebilir.

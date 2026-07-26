# Randevu Sistemi Tasarım Kaydı

**Tarih:** 27 Temmuz 2026
**Durum:** Tasarım görüşmesi devam ediyor; uygulama kodlaması henüz başlamadı.

Bu belge, Google Apps Script ile çalışan mevcut seans takviminin daha güvenli,
güvenilir ve iPhone bildirimlerini destekleyen yeni bir sisteme dönüştürülmesi
için şimdiye kadar alınan kararları kaydeder.

## Görüşmenin kaldığı yer

Kullanıcı aşağıdaki bölümleri onayladı:

1. Cloudflare tabanlı temel altyapı
2. Kullanıcılar, giriş ve görev devri
3. Takvim ve randevu akışı
4. Günlük bildirim akışı
5. Danışan arama ve raporlama
6. Birleşik haftalık/günlük takvim arayüzü

Son sunulan **veri taşıma, önbellek ve hata güvenliği** bölümü henüz kullanıcı
tarafından onaylanmadı. Bir sonraki görüşme bu bölümün onayı veya revizyonuyla
başlamalıdır.

## Mevcut sistem

Mevcut uygulama Google Apps Script projesidir:

`https://script.google.com/home/projects/12TStIAo0z18lKv2miPG1CARRwmrNZdx4tQ8RpXgQuLDKZyd7GwvdAjLx/edit?hl=tr`

İnceleme sırasında görülen temel yapı:

- Tek bir Apps Script sunucu dosyası ve tek, büyük bir HTML arayüz dosyası vardır.
- Randevular tek bir JSON dizisi olarak User Properties alanında tutulmaktadır.
- Her değişiklikte bütün randevu dizisi yeniden kaydedilmektedir.
- Kayıt çağrıları asenkron çalışmakta; başarı ve hata geri bildirimi yetersizdir.
- Birden fazla sürüm bağlantısı bulunduğu için eski bağlantının kullanılma riski vardır.
- İki habersiz iptal uyarısı, kısıtlama süresinin dolup dolmadığını kontrol etmediği
  için aylar sonra da devam edebilmektedir.
- Mevcut rapor çift seansı iki işlem saymaktadır; yeni sistemde bu davranış
  değiştirilecektir.

Yeni sistem eski Apps Script uygulamasını genişletmek yerine ayrı ve kalıcı bir
uygulama olarak kurulacaktır.

## Kullanım amacı ve kapsam

- Sistem Manisa Yunusemre Belediyesi bünyesinde çalışan bir psikoloğun seans
  randevularını düzenlemek için kullanılacaktır.
- Vatandaş talebi Bridge sistemi üzerinden gelir; Bridge ile yazılımsal
  entegrasyon yapılmayacaktır.
- Tıbbi sekreter talebi Bridge üzerinden görüp randevuyu yeni sisteme manuel girer.
- İlk sürümde yalnızca danışanın ad ve soyadı saklanır.
- Telefon ve adres ilk sürüm kapsamına alınmaz.
- Sistem tek psikolog için hazırlanır. İleride ikinci psikolog eklenirse aynı
  sistem ayrı verilerle çoğaltılabilir.

## Onaylanan altyapı

Yeni uygulama Cloudflare üzerinde çalışan bir PWA olacaktır:

- Cloudflare Worker: güvenli uygulama hizmetleri ve iş kuralları
- Cloudflare D1: kalıcı ilişkisel veritabanı
- Zamanlanmış Cloudflare görevi: hatırlatma kontrolleri
- Standart Web Push: iPhone kapalıyken bildirim
- PWA: iPhone ana ekranına eklenen tam ekran web uygulaması
- PDF ve Excel: talep anında oluşturulan rapor çıktıları

Uygulama dört kullanıcı ve mevcut randevu hacmiyle Cloudflare ücretsiz plan
sınırları içinde çalışacak şekilde tasarlanacaktır. Ücretli WhatsApp, SMS,
Apple Developer üyeliği veya App Store yayını gerekmeyecektir.

## Kullanıcılar ve yetkiler

Sistemde başlangıçta dört kişisel hesap olacaktır:

- Psikolog/Yönetici
- Dilara
- Medine
- Ecem

Tüm kullanıcılar randevu ekleyebilir, taşıyabilir, durumunu değiştirebilir,
silebilir ve danışan araması yapabilir.

Yalnızca Psikolog/Yönetici:

- Rapor bölümünü görür.
- Kullanıcı ekler veya devre dışı bırakır.
- PIN sıfırlar.
- Kayıp ya da kullanılmayan cihaz oturumunu kapatır.
- Gerekirse aktif sorumlu sekreteri değiştirir.
- Değiştirilemeyen işlem geçmişini görür.

## Giriş ve oturum

- Her kullanıcının adıyla ilişkili kişisel bir kullanıcı hesabı vardır.
- Her kullanıcıya ayrı, altı haneli PIN verilir.
- PIN açık metin olarak saklanmaz.
- Beş yanlış denemeden sonra geçici giriş kilidi uygulanır.
- Aynı iPhone kullanılmaya devam edildiği sürece tekrar tekrar giriş istenmez.
- Yeniden giriş; kullanıcı çıkış yaptığında, telefon verileri silindiğinde,
  telefon değiştiğinde veya yönetici oturumu iptal ettiğinde gerekir.
- Her telefon için ayrı ve iptal edilebilir oturum tutulur.

## Görev devri

- Normal durumda aktif sorumlu tıbbi sekreter Dilara'dır.
- Dilara izin veya geçici görevlendirme tarih aralığı girerken Medine ya da
  Ecem'i seçmek zorundadır.
- İzin aralığında iş hatırlatmaları yalnızca seçilen kişiye gider.
- Psikoloğa izin tarihleri ve görevi devralan kişi bildirilir.
- Dilara erken dönerse “Görevi geri al” işlemiyle sorumluluğu yeniden üstlenir.
- Psikolog/Yönetici gerekirse aktif sorumluyu değiştirebilir.
- İzinli kullanıcı sisteme girebilir ve bütün randevu işlemlerini yapabilir;
  yalnızca iş bildirimlerini almaz.

## Takvim ve randevular

Çalışma günleri hafta içidir. Randevu saatleri:

- 09.00
- 10.00
- 11.00
- 14.00
- 15.00
- 16.00

Boş saate dokunulduğunda doğrudan “Randevu ekle” penceresi açılır.

Randevu durumları:

- Planlanmış
- Geldi
- Çift Seans
- Haberli İptal
- Habersiz İptal

Randevular uygun başka bir saate taşınabilir. Her ekleme, taşıma, durum değişimi
ve silme işlemi kullanıcı, tarih ve saat bilgisiyle işlem geçmişine yazılır.
Veritabanı aynı tarih ve saate iki randevu kaydedilmesini engeller.

## Danışan kimliği ve isimler

- Ad ve soyad Türkçe büyük harfe dönüştürülür.
- Arama büyük/küçük harf ve Türkçe `i/İ` farkından etkilenmez.
- Yeni randevuda mevcut danışanlar önerilir.
- Kullanıcı mevcut kişiyi seçebilir veya yeni danışan oluşturabilir.
- Randevular yazılı isim metnine değil, kalıcı danışan kaydına bağlanır.
- Bu yapı farklı yazımlar yüzünden aynı danışanın birden fazla geçmişe
  ayrılmasını önler.

## İki habersiz iptal kuralı

Danışanın sonuçlandırılmış son iki randevusu da habersiz iptalse:

- İkinci habersiz iptal tarihinden itibaren bir aylık kısıtlama başlar.
- Sekreter kısıtlama sürerken randevuyu sisteme girebilir.
- Seçilen randevu tarihi kısıtlama bitişinden önce olamaz.
- Bitiş tarihi geçtiğinde uyarı kendiliğinden kalkar.
- Kontrol danışan kimliği üzerinden yapılır; soyadı eksik yazarak aşılması
  mümkün olmaz.

## Kapalı saatler ve tatiller

- Tam günlük resmî tatiller bütün randevu saatlerini kapatır.
- Yarım günlük resmî tatiller öğleden sonraki saatleri kapatır.
- Psikoloğun izin aralığında kutularda “İzinli” görünür ve randevu verilemez.
- Bir saate `SÜPERVİZYON` veya yalnızca çizgi işaretleri girilirse saat kapalı
  ve rapor dışı kabul edilir.
- İzin, tatil, süpervizyon ve çizgi kayıtları işlem sayılmaz.

Resmî tatillerin yıllık veri kaynağı ve olağanüstü günler için yönetici düzeltme
yöntemi nihai tasarım tamamlanırken kesinleştirilecektir.

## Günlük bildirim akışı

Bildirimler Europe/Istanbul saat diliminde ve yalnızca aktif sorumlu sekretere gider.

| Zaman | Davranış |
|---|---|
| 16.45 | “Bugünkü talepleri çağrı merkezine gönderdin mi?” |
| 17.00 | Henüz Evet denmediyse yeniden hatırlatır. |
| 17.15 | Hâlâ tamamlanmadıysa son hatırlatmayı gönderir. |
| Sonraki iş günü 08.45 | Önceki tarih belirtilerek yeniden sorar. |

- Evet: Görevi kapatır ve psikoloğa tarih, cevaplayan kişi ve tamamlanma
  bilgisi gönderir.
- Hayır: Görevi açık bırakır.
- Cevapsız: Görevi açık bırakır.
- Hafta sonları ve tam günlük resmî tatiller iş günü sayılmaz.
- Görev devri yapılırsa açık hatırlatmalar yeni sorumluya geçer.
- Bildirim gönderimi, açılması, cevap ve cevap zamanı kaydedilir.
- Aynı zamanlanmış kontrol tekrar çalışsa bile aynı bildirim iki kez oluşturulmaz.
- Telefon bildirimi kapalı veya internet bağlantısı yoksa bekleyen görev uygulama
  içinde görünür.

## Arama

Arama bütün kullanıcılara açıktır. Danışan ekranında:

- Yaklaşan randevular en yakın tarihten başlayarak,
- Geçmiş randevular en yeniden eskiye doğru,
- Tarih, saat ve durum bilgileriyle

gösterilir. Aktif habersiz iptal kısıtlamasının bitiş tarihi de gösterilir.

## Rapor

Rapor yalnızca Psikolog/Yönetici hesabında görünür. Ay veya özel tarih aralığı
seçilebilir.

Ayrı sayımlar:

- Geldi
- Çift Seans
- Haberli İptal
- Habersiz İptal
- Planlanmış
- Gerçekleştirilen İşlem

Gerçekleştirilen işlem hesabı:

- Geldi = 1
- Çift Seans = 1
- Haberli İptal = 0
- Habersiz İptal = 0
- Planlanmış = 0

Süpervizyon, izin, tatil ve çizgiyle kapatılan saatler hiçbir işlem sayımına
girmez. Tarih filtresi kaydın oluşturulma tarihine değil, seans tarihine göre
çalışır.

PDF ve Excel çıktılarında danışan adı soyadı, seans tarihi, saati ve durumu
bulunur. Excel dosyasında özet ve ayrıntı ayrı sayfalarda yer alır.

## Onaylanan mobil takvim arayüzü

Uygulama açıldığında varsayılan görünüm haftalık tablodur:

- Beş hafta içi günü sütunlarda
- Altı seans saati satırlarda
- Önceki ve sonraki haftaya geçiş okları üst bölümde
- Dolu, boş, çift seans ve kapalı saatler renk ve metinle ayırt edilir

Gün başlığına, örneğin “SALI 28” üzerine dokunulduğunda günlük görünüm açılır.
Günlük görünümde altı saat büyük ve rahat dokunulabilir kutular olarak yer alır.
Üstteki “Haftalık görünüme geç” düğmesi kullanıcıyı haftalık tabloya geri götürür.

Görsel taslaklar geçici çalışma alanında korunmaktadır:

`.superpowers/brainstorm/visual-20260727-1/content/`

## Onay bekleyen veri taşıma ve güvenilirlik tasarımı

Kullanıcıya son olarak şu yaklaşım sunuldu:

1. Eski sistemin geçmiş ve gelecek bütün randevuları yedeklenir.
2. İsim, tarih, saat ve durumlar D1 veritabanına dönüştürülür.
3. Aynı danışan yazımları birleştirilir.
4. Şüpheli tekrarlar ve saat çakışmaları inceleme listesine alınır; kayıt silinmez.
5. Eski ve yeni sistemin toplamları ile durum dağılımları karşılaştırılır.
6. Kullanıcı doğrulamasından sonra yeni uygulama açılır.
7. Eski uygulama bir süre kontrol amacıyla korunur.

Önerilen güvenilirlik kuralları:

- Yalnızca uygulama ekranı önbelleğe alınır; randevular güncel veritabanından okunur.
- Yeni sürüm eski ekran önbelleğini otomatik değiştirir.
- Başarı gösterilmeden önce veritabanı kaydı doğrulanır.
- İnternet yokken randevu işlemi sıraya alınmış gibi gösterilmez.
- Çakışan saat ve kapalı gün hataları kullanıcıya açıkça anlatılır.
- Düzenli geri dönüş noktaları ve indirilebilir tam yedek bulunur.
- Eşzamanlı işlemler, tarih geçişleri, bildirim zinciri, rapor sayımları,
  iPhone bildirimi ve veri taşıma ayrı ayrı sınanır.

Bu bölüm yarın onaylanmalı veya kullanıcının isteğine göre değiştirilmelidir.

## Nihai tasarımdan önce kalan kararlar

1. Veri taşıma ve hata güvenliği bölümünün onayı
2. Kalıcı uygulama adresi: ücretsiz `workers.dev` adresi veya mevcut bir alan
   adından özel alt alan adı
3. Resmî tatil verisinin güncellenme ve yönetici düzeltme yöntemi
4. Yedek saklama süresi ve geri yükleme işleminin kesin biçimi
5. Son hata durumları ve kabul testlerinin nihai onayı

Bu kararların ardından belge nihai tasarım olarak düzenlenecek, tutarlılık
kontrolünden geçirilecek ve uygulama planı hazırlanacaktır.

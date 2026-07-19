export type LinkItem = {
  href: string;
  label: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServicePageData = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sectors: string[];
  scenarios: string[];
  checks: string[];
  process: string[];
  faqs: FaqItem[];
  related: LinkItem[];
};

export type LocalPageData = {
  slug: string;
  city: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  localContext: string;
  prioritySectors: string[];
  services: string[];
  related: LinkItem[];
};

const defaultScenarios = [
  "Denetimden kaldıysanız eksikleri rapor, proje ve uygulama sırasıyla kapatırız.",
  "Yeni açılış, ruhsat, turizm belgesi veya fabrika kuruluş sürecinde dosyanızı en baştan doğru kurarız.",
  "Denetim öncesi ön kontrol ile yangın yönetmeliğine aykırı yapısal riskleri sahada tespit ederiz.",
];

const defaultProcess = [
  "Mimari proje, mevcut yapı ve kullanım sınıfı incelenir.",
  "Yangın yönetmeliğine göre eksik ve riskli noktalar yazılı hale getirilir.",
  "Gerekli yangın kapısı, kaçış yolu, merdiven, yönlendirme ve yapısal revizyonlar projelendirilir.",
  "Uygulama ekibi sahada anahtar teslim imalat ve montajı tamamlar.",
  "İşletme resmi denetim ve uygunluk sürecine hazır hale getirilir.",
];

const reportFaqs: FaqItem[] = [
  {
    question: "Denetimden kaldıktan sonra süreç nasıl başlar?",
    answer:
      "Önce denetim tutanağı, mimari proje ve mevcut saha birlikte incelenir. Ardından eksikler yönetmelik maddelerine göre sınıflandırılır ve uygulama sırası belirlenir.",
  },
  {
    question: "Sadece danışmanlık mı veriyorsunuz, uygulama da yapıyor musunuz?",
    answer:
      "Gen Yangın hem yangın danışmanlığı hem de yangın kapısı, kaçış yolu, yangın merdiveni ve yapısal tadilat gibi anahtar teslim uygulama süreçlerini birlikte yürütür.",
  },
  {
    question: "Otel ve fabrikalarda ön keşif neden önemlidir?",
    answer:
      "Otel ve fabrikalarda kullanım sınıfı, kişi yoğunluğu, üretim riski ve kaçış mesafeleri farklıdır. Ön keşif yapılmadan verilen çözüm çoğu zaman ya eksik kalır ya da gereksiz maliyet üretir.",
  },
];

export const servicePages: Record<string, ServicePageData> = {
  "otel-yangin-yonetmeligi": {
    slug: "otel-yangin-yonetmeligi",
    title: "Otel Yangın Yönetmeliği Danışmanlığı | Gen Yangın",
    description:
      "Oteller, pansiyonlar ve konaklama tesisleri için yangın yönetmeliği analizi, turizm belgesi hazırlığı, kaçış yolları ve anahtar teslim yangın güvenliği revizyonları.",
    eyebrow: "Otel ve konaklama tesisleri",
    h1: "Otel Yangın Yönetmeliği İçin Danışmanlık ve Anahtar Teslim Revizyon",
    intro:
      "Konaklama tesislerinde yangın güvenliği yalnızca ekipman listesi değildir; kaçış yolları, oda-koridor algılama sistemi, yangın kapıları, merdivenler ve resmi dosya birlikte doğru kurulmalıdır.",
    sectors: ["Otel", "Pansiyon", "Butik otel", "Yurt ve konaklama tesisi"],
    scenarios: defaultScenarios,
    checks: [
      "Oda, koridor ve ortak alanlarda algılama gereklilikleri",
      "Kaçış mesafesi, çıkış sayısı ve merdiven uygunluğu",
      "Panik barlı ve duman sızdırmaz yangın kapısı kontrolleri",
      "Acil yönlendirme, aydınlatma ve tahliye planı eksikleri",
      "Turizm belgesi ve belediye ruhsatı öncesi itfaiye hazırlığı",
    ],
    process: defaultProcess,
    faqs: reportFaqs,
    related: [
      { href: "/otel-itfaiye-uygunluk-raporu", label: "Otel itfaiye uygunluk raporu" },
      { href: "/yangin-denetimi-revizyonu", label: "Denetim revizyonu" },
      { href: "/yangin-danismanligi", label: "Yangın danışmanlığı" },
    ],
  },
  "otel-itfaiye-uygunluk-raporu": {
    slug: "otel-itfaiye-uygunluk-raporu",
    title: "Otel İtfaiye Uygunluk Raporu Hazırlığı | Gen Yangın",
    description:
      "Oteller için itfaiye uygunluk raporu, yangın denetimi eksiklerinin kapatılması, turizm belgesi ve ruhsat sürecine hazırlık hizmeti.",
    eyebrow: "Ruhsat ve turizm belgesi hazırlığı",
    h1: "Otel İtfaiye Uygunluk Raporu İçin Eksik Tespit ve Uygulama",
    intro:
      "Otel işletmelerinde itfaiye raporu süreci, misafir güvenliği ve resmi belge süreçleri açısından kritik bir eşiktir. Gen Yangın sahayı inceler, eksikleri listeler ve uygulamayı tek elden tamamlar.",
    sectors: ["Otel", "Butik otel", "Pansiyon", "Turizm işletmesi"],
    scenarios: defaultScenarios,
    checks: [
      "İtfaiye denetim tutanağındaki eksiklerin teknik karşılığı",
      "Oda ve koridor yangın algılama sistemi kontrolleri",
      "Kaçış kapıları, yangın merdiveni ve acil çıkış düzeni",
      "Acil aydınlatma ve yönlendirme levhaları",
      "Resmi başvuru öncesi saha uygunluğu",
    ],
    process: defaultProcess,
    faqs: reportFaqs,
    related: [
      { href: "/otel-yangin-yonetmeligi", label: "Otel yangın yönetmeliği" },
      { href: "/itfaiye-uygunluk-raporu", label: "İtfaiye uygunluk raporu" },
      { href: "/ege-bolgesi-yangin-danismanligi", label: "Ege Bölgesi hizmet alanı" },
    ],
  },
  "fabrika-yangin-yonetmeligi": {
    slug: "fabrika-yangin-yonetmeligi",
    title: "Fabrika Yangın Yönetmeliği Danışmanlığı | Gen Yangın",
    description:
      "Fabrikalar ve sanayi tesisleri için yangın yönetmeliği analizi, kaçış yolları, yangın kapısı, üretim alanı riskleri ve anahtar teslim yapısal revizyon.",
    eyebrow: "Fabrika ve sanayi tesisleri",
    h1: "Fabrika Yangın Yönetmeliği İçin Risk Analizi ve Yapısal Revizyon",
    intro:
      "Fabrikalarda yangın güvenliği üretim akışı, hammadde riski, kapalı alan büyüklüğü ve kaçış organizasyonu ile birlikte değerlendirilmelidir. Amaç üretimi aksatmadan mevzuata uygun hale gelmektir.",
    sectors: ["Fabrika", "OSB tesisi", "İmalathane", "Endüstriyel depo"],
    scenarios: defaultScenarios,
    checks: [
      "Üretim alanı ve depo yangın yükü analizi",
      "Kaçış yolları, acil çıkışlar ve yangın kapısı uygunluğu",
      "Yangın dolabı, algılama, yönlendirme ve tahliye gereklilikleri",
      "OSB, belediye ve itfaiye denetimi öncesi eksik kontrolü",
      "Yapısal tadilatların üretim sürekliliğine göre planlanması",
    ],
    process: defaultProcess,
    faqs: reportFaqs,
    related: [
      { href: "/fabrika-itfaiye-uygunluk-raporu", label: "Fabrika itfaiye uygunluk raporu" },
      { href: "/yangin-denetimi-revizyonu", label: "Yangın denetimi revizyonu" },
      { href: "/manisa-yangin-danismanligi", label: "Manisa yangın danışmanlığı" },
    ],
  },
  "fabrika-itfaiye-uygunluk-raporu": {
    slug: "fabrika-itfaiye-uygunluk-raporu",
    title: "Fabrika İtfaiye Uygunluk Raporu | Gen Yangın",
    description:
      "Sanayi tesisleri ve fabrikalar için itfaiye uygunluk raporu hazırlığı, denetim eksikleri, yangın kapısı, kaçış yolu ve anahtar teslim revizyon.",
    eyebrow: "Sanayi denetimi ve ruhsat hazırlığı",
    h1: "Fabrika İtfaiye Uygunluk Raporu İçin Eksik Kapatma Süreci",
    intro:
      "Fabrika denetimlerinde küçük görünen yangın kapısı, yönlendirme, kaçış mesafesi veya tahliye planı eksikleri ruhsat ve çalışma süreçlerini durdurabilir.",
    sectors: ["Fabrika", "Sanayi tesisi", "Depo", "Üretim alanı"],
    scenarios: defaultScenarios,
    checks: [
      "Denetim tutanağı ve saha gerçekliğinin karşılaştırılması",
      "Yangın merdiveni ve kaçış yolu kapasitesi",
      "Acil çıkış kapısı, panik bar ve yangın dayanımı",
      "Yangın dolabı, hidrant, algılama ve yönlendirme eksikleri",
      "Üretim durmadan uygulanabilecek yapısal çözüm sırası",
    ],
    process: defaultProcess,
    faqs: reportFaqs,
    related: [
      { href: "/fabrika-yangin-yonetmeligi", label: "Fabrika yangın yönetmeliği" },
      { href: "/itfaiye-uygunluk-raporu", label: "İtfaiye uygunluk raporu" },
      { href: "/yangin-danismanligi", label: "Yangın danışmanlığı" },
    ],
  },
  "yangin-denetimi-revizyonu": {
    slug: "yangin-denetimi-revizyonu",
    title: "Yangın Denetimi Revizyonu | Denetimden Kalan İşletmeler | Gen Yangın",
    description:
      "Yangın denetiminden kalan otel ve fabrikalar için eksik tespiti, yangın yönetmeliğine uygun revizyon, yapısal uygulama ve yeniden denetime hazırlık.",
    eyebrow: "Denetimden kalan işletmeler",
    h1: "Yangın Denetiminden Kalan İşletmeler İçin Revizyon ve Uygulama",
    intro:
      "Denetimden kalmak çoğu zaman çözülmez bir kriz değil, doğru sıraya konmamış eksikler listesidir. Gen Yangın eksikleri teknik dile çevirir ve sahada uygulanabilir çözüme dönüştürür.",
    sectors: ["Otel", "Fabrika", "Depo", "İşletme ruhsatı bekleyen yapılar"],
    scenarios: defaultScenarios,
    checks: [
      "Denetim tutanağının madde madde okunması",
      "Acil kapatılması gereken can güvenliği riskleri",
      "Yapısal tadilat ve ekipman eksiklerinin ayrılması",
      "Resmi denetime yeniden girilebilir hale getirme planı",
      "Otel ve fabrikalara göre farklı revizyon öncelikleri",
    ],
    process: defaultProcess,
    faqs: reportFaqs,
    related: [
      { href: "/itfaiye-uygunluk-raporu", label: "İtfaiye uygunluk raporu" },
      { href: "/otel-itfaiye-uygunluk-raporu", label: "Otel rapor hazırlığı" },
      { href: "/fabrika-itfaiye-uygunluk-raporu", label: "Fabrika rapor hazırlığı" },
    ],
  },
  "itfaiye-uygunluk-raporu": {
    slug: "itfaiye-uygunluk-raporu",
    title: "İtfaiye Uygunluk Raporu Hazırlığı | Gen Yangın",
    description:
      "İtfaiye uygunluk raporu almak isteyen otel, fabrika ve işletmeler için yangın yönetmeliği analizi, eksik kapatma ve anahtar teslim saha uygulaması.",
    eyebrow: "Ruhsat ve resmi denetim hazırlığı",
    h1: "İtfaiye Uygunluk Raporu İçin Yangın Yönetmeliği Hazırlığı",
    intro:
      "İtfaiye uygunluk raporu, yalnızca başvuru dosyası değil, binanın yangın yönetmeliğine uygun hale getirilmiş olmasıdır. Gen Yangın dosya ve sahayı birlikte ele alır.",
    sectors: ["Otel", "Fabrika", "Depo", "Ticari işletme"],
    scenarios: defaultScenarios,
    checks: [
      "Başvuru öncesi yangın güvenliği eksik analizi",
      "Kaçış yolu, yangın kapısı ve merdiven uygunluğu",
      "Algılama, yönlendirme, acil aydınlatma ve tahliye planı",
      "Saha uygulaması gereken yapısal eksikler",
      "Denetime hazır kontrol listesi",
    ],
    process: defaultProcess,
    faqs: reportFaqs,
    related: [
      { href: "/yangin-denetimi-revizyonu", label: "Denetim revizyonu" },
      { href: "/otel-itfaiye-uygunluk-raporu", label: "Otel uygunluk raporu" },
      { href: "/fabrika-itfaiye-uygunluk-raporu", label: "Fabrika uygunluk raporu" },
    ],
  },
  "yangin-danismanligi": {
    slug: "yangin-danismanligi",
    title: "Yangın Danışmanlığı | Otel ve Fabrika Odaklı Çözümler | Gen Yangın",
    description:
      "Türkiye genelinde yangın danışmanlığı; Manisa ve Ege Bölgesi'nde otel ve fabrikalar için anahtar teslim yangın yönetmeliği ve yapısal uygulama çözümleri.",
    eyebrow: "Ulusal danışmanlık, yerel uygulama gücü",
    h1: "Yangın Danışmanlığı ve Anahtar Teslim Uygulama Hizmeti",
    intro:
      "Yangın danışmanlığı, mevzuatı yorumlamakla sınırlı kalmamalıdır. Gen Yangın, otel ve fabrikalarda eksikleri tespit eder, çözüm yolunu kurar ve gerekli yapısal uygulamayı sahada tamamlar.",
    sectors: ["Otel", "Fabrika", "Sanayi tesisi", "Konaklama tesisi"],
    scenarios: defaultScenarios,
    checks: [
      "Yangın yönetmeliği uygunluk analizi",
      "Denetim öncesi risk ve eksik raporu",
      "Anahtar teslim yapısal yangın güvenliği revizyonu",
      "Otel ve fabrikalara özel kontrol listesi",
      "Türkiye genelinde danışmanlık, Ege'de saha uygulama organizasyonu",
    ],
    process: defaultProcess,
    faqs: reportFaqs,
    related: [
      { href: "/otel-yangin-yonetmeligi", label: "Otel yangın yönetmeliği" },
      { href: "/fabrika-yangin-yonetmeligi", label: "Fabrika yangın yönetmeliği" },
      { href: "/ege-bolgesi-yangin-danismanligi", label: "Ege Bölgesi yangın danışmanlığı" },
    ],
  },
};

export const localPages: Record<string, LocalPageData> = {
  "ege-bolgesi-yangin-danismanligi": {
    slug: "ege-bolgesi-yangin-danismanligi",
    city: "Ege Bölgesi",
    title: "Ege Bölgesi Yangın Danışmanlığı | Otel ve Fabrika | Gen Yangın",
    description:
      "Manisa merkezli Gen Yangın, Ege Bölgesi'nde otel ve fabrikalar için yangın danışmanlığı, itfaiye uygunluk raporu hazırlığı ve anahtar teslim yapısal revizyon sunar.",
    h1: "Ege Bölgesi'nde Otel ve Fabrikalar İçin Yangın Danışmanlığı",
    intro:
      "Gen Yangın, Manisa merkezli saha tecrübesiyle Ege Bölgesi'ndeki otel ve fabrikaların yangın yönetmeliği, denetim ve ruhsat süreçlerini yönetir.",
    localContext:
      "Ege Bölgesi'nde sanayi tesisleri, OSB alanları, turizm bölgeleri ve konaklama yapıları yangın güvenliği açısından farklı riskler taşır. Bu nedenle her şehirde aynı metinle değil, tesisin kullanımına ve denetim ihtiyacına göre çalışma yapılır.",
    prioritySectors: ["Oteller ve konaklama tesisleri", "Fabrikalar ve sanayi tesisleri"],
    services: [
      "Yangın yönetmeliği uygunluk analizi",
      "İtfaiye uygunluk raporu hazırlığı",
      "Denetimden kalan işletmeler için revizyon",
      "Anahtar teslim yangın kapısı, kaçış yolu ve yapısal tadilat",
    ],
    related: [
      { href: "/manisa-yangin-danismanligi", label: "Manisa" },
      { href: "/izmir-yangin-danismanligi", label: "İzmir" },
      { href: "/mugla-yangin-danismanligi", label: "Muğla" },
      { href: "/otel-yangin-yonetmeligi", label: "Otel yangın yönetmeliği" },
      { href: "/fabrika-yangin-yonetmeligi", label: "Fabrika yangın yönetmeliği" },
    ],
  },
  "manisa-yangin-danismanligi": {
    slug: "manisa-yangin-danismanligi",
    city: "Manisa",
    title: "Manisa Yangın Danışmanlığı | Fabrika ve Otel | Gen Yangın",
    description:
      "Manisa'da fabrika, OSB ve oteller için yangın danışmanlığı, itfaiye uygunluk raporu hazırlığı, denetim revizyonu ve anahtar teslim yapısal çözümler.",
    h1: "Manisa Yangın Danışmanlığı ve Anahtar Teslim Yangın Projeleri",
    intro:
      "Manisa'daki sanayi tesisleri, fabrikalar ve konaklama yapıları için yangın yönetmeliği danışmanlığı ile saha uygulamasını tek elden yürütüyoruz.",
    localContext:
      "Manisa'da OSB, imalat, depo ve üretim tesisleri yangın denetimlerinde kaçış yolu, yangın kapısı, acil yönlendirme ve yapısal revizyon konularında sık eksik verir. Gen Yangın bu eksikleri yerinde tespit edip uygulanabilir sıraya koyar.",
    prioritySectors: ["OSB ve fabrika yapıları", "Otel ve konaklama tesisleri"],
    services: [
      "Fabrika yangın yönetmeliği analizi",
      "Otel itfaiye uygunluk raporu hazırlığı",
      "Denetim tutanağına göre eksik kapatma",
      "Yangın kapısı, kaçış yolu ve merdiven revizyonu",
    ],
    related: [
      { href: "/fabrika-itfaiye-uygunluk-raporu", label: "Fabrika itfaiye uygunluk raporu" },
      { href: "/yangin-denetimi-revizyonu", label: "Denetim revizyonu" },
      { href: "/ege-bolgesi-yangin-danismanligi", label: "Ege Bölgesi" },
    ],
  },
  "izmir-yangin-danismanligi": {
    slug: "izmir-yangin-danismanligi",
    city: "İzmir",
    title: "İzmir Yangın Danışmanlığı | Otel, Fabrika ve Sanayi | Gen Yangın",
    description:
      "İzmir'de otel, fabrika, depo ve sanayi tesisleri için yangın yönetmeliği danışmanlığı, itfaiye raporu hazırlığı ve yapısal revizyon.",
    h1: "İzmir Yangın Danışmanlığı: Otel, Fabrika ve Ticari Yapılar",
    intro:
      "İzmir'deki sanayi, liman, depo, otel ve karma ticari yapılarda yangın güvenliği sürecini denetim ve ruhsat hedefiyle planlıyoruz.",
    localContext:
      "İzmir'de hem sanayi hem turizm hem de büyük ticari yapılar yoğun olduğu için yangın güvenliği çözümleri kullanım sınıfına göre ayrılmalıdır. Fabrika ve otellerde aynı kontrol listesi kullanılmaz.",
    prioritySectors: ["Sanayi ve depo tesisleri", "Otel ve turizm işletmeleri"],
    services: [
      "Yangın yönetmeliği ön incelemesi",
      "İtfaiye uygunluk raporu hazırlığı",
      "Otel ve fabrika denetim revizyonu",
      "Kaçış yolları ve yangın kapısı uygulamaları",
    ],
    related: [
      { href: "/otel-itfaiye-uygunluk-raporu", label: "Otel itfaiye raporu" },
      { href: "/fabrika-yangin-yonetmeligi", label: "Fabrika yangın yönetmeliği" },
      { href: "/ege-bolgesi-yangin-danismanligi", label: "Ege Bölgesi" },
    ],
  },
  "aydin-yangin-danismanligi": {
    slug: "aydin-yangin-danismanligi",
    city: "Aydın",
    title: "Aydın Yangın Danışmanlığı | Otel ve Üretim Tesisleri | Gen Yangın",
    description:
      "Aydın'da otel, turizm tesisi, fabrika ve üretim alanları için yangın danışmanlığı, itfaiye uygunluk raporu ve denetim revizyonu.",
    h1: "Aydın'da Otel ve Üretim Tesisleri İçin Yangın Danışmanlığı",
    intro:
      "Aydın'daki konaklama tesisleri ve üretim yapıları için yangın yönetmeliği, ruhsat ve denetim hazırlığı süreçlerini planlıyoruz.",
    localContext:
      "Aydın'da turizm işletmeleri ile tarım ve üretim tesisleri yangın güvenliği açısından farklı ihtiyaçlara sahiptir. Otellerde misafir tahliyesi, üretim alanlarında ise yangın yükü ve kaçış organizasyonu öne çıkar.",
    prioritySectors: ["Otel ve turizm tesisleri", "Üretim ve depo alanları"],
    services: [
      "Otel yangın yönetmeliği kontrolü",
      "Fabrika ve depo risk analizi",
      "İtfaiye raporu hazırlığı",
      "Denetimden kalan işletmeler için uygulama",
    ],
    related: [
      { href: "/otel-yangin-yonetmeligi", label: "Otel yangın yönetmeliği" },
      { href: "/yangin-denetimi-revizyonu", label: "Denetim revizyonu" },
      { href: "/ege-bolgesi-yangin-danismanligi", label: "Ege Bölgesi" },
    ],
  },
  "denizli-yangin-danismanligi": {
    slug: "denizli-yangin-danismanligi",
    city: "Denizli",
    title: "Denizli Yangın Danışmanlığı | Tekstil, Fabrika ve Otel | Gen Yangın",
    description:
      "Denizli'de tekstil, fabrika, sanayi tesisi ve oteller için yangın danışmanlığı, itfaiye uygunluk raporu ve yapısal yangın revizyonları.",
    h1: "Denizli Yangın Danışmanlığı: Tekstil, Fabrika ve Oteller",
    intro:
      "Denizli'deki tekstil, üretim ve konaklama yapılarında yangın güvenliği sürecini denetim öncesi netleştiriyoruz.",
    localContext:
      "Denizli'de tekstil ve üretim tesislerinde yangın yükü, depo düzeni ve kaçış yolları kritik başlıklardır. Konaklama yapılarında ise oda-koridor algılama ve tahliye güvenliği öne çıkar.",
    prioritySectors: ["Tekstil ve üretim tesisleri", "Otel ve konaklama yapıları"],
    services: [
      "Fabrika yangın yönetmeliği kontrolü",
      "Tekstil tesisi yangın risk analizi",
      "İtfaiye uygunluk raporu hazırlığı",
      "Yapısal yangın güvenliği revizyonu",
    ],
    related: [
      { href: "/fabrika-yangin-yonetmeligi", label: "Fabrika yangın yönetmeliği" },
      { href: "/itfaiye-uygunluk-raporu", label: "İtfaiye uygunluk raporu" },
      { href: "/ege-bolgesi-yangin-danismanligi", label: "Ege Bölgesi" },
    ],
  },
  "mugla-yangin-danismanligi": {
    slug: "mugla-yangin-danismanligi",
    city: "Muğla",
    title: "Muğla Yangın Danışmanlığı | Otel ve Turizm Tesisleri | Gen Yangın",
    description:
      "Muğla'da otel, butik otel ve turizm tesisleri için yangın yönetmeliği danışmanlığı, itfaiye uygunluk raporu ve denetim revizyonu.",
    h1: "Muğla'da Otel ve Turizm Tesisleri İçin Yangın Danışmanlığı",
    intro:
      "Muğla'daki konaklama tesislerinde yangın yönetmeliği, turizm belgesi ve itfaiye uygunluk sürecini birlikte ele alıyoruz.",
    localContext:
      "Muğla'da otel ve turizm tesislerinde yangın güvenliği misafir tahliyesi, oda algılama sistemleri, acil yönlendirme ve yangın kapısı standartları üzerinden değerlendirilmelidir.",
    prioritySectors: ["Otel ve butik oteller", "Turizm ve konaklama tesisleri"],
    services: [
      "Otel itfaiye uygunluk raporu hazırlığı",
      "Turizm tesisi yangın yönetmeliği kontrolü",
      "Denetimden kalan oteller için revizyon",
      "Kaçış yolu, yangın kapısı ve acil yönlendirme uygulaması",
    ],
    related: [
      { href: "/otel-itfaiye-uygunluk-raporu", label: "Otel itfaiye uygunluk raporu" },
      { href: "/otel-yangin-yonetmeligi", label: "Otel yangın yönetmeliği" },
      { href: "/ege-bolgesi-yangin-danismanligi", label: "Ege Bölgesi" },
    ],
  },
  "balikesir-yangin-danismanligi": {
    slug: "balikesir-yangin-danismanligi",
    city: "Balıkesir",
    title: "Balıkesir Yangın Danışmanlığı | Fabrika, Depo ve Otel | Gen Yangın",
    description:
      "Balıkesir'de fabrika, depo, sanayi ve otel yapıları için yangın danışmanlığı, itfaiye uygunluk raporu ve anahtar teslim revizyon.",
    h1: "Balıkesir'de Fabrika, Depo ve Oteller İçin Yangın Danışmanlığı",
    intro:
      "Balıkesir'deki sanayi, depo ve konaklama yapılarında yangın yönetmeliği uygunluğunu sahadaki uygulanabilir çözümlerle birlikte planlıyoruz.",
    localContext:
      "Balıkesir'de fabrika ve depo alanlarında yangın yükü, kapalı alan büyüklüğü ve kaçış organizasyonu öne çıkar. Otel tarafında ise itfaiye raporu ve konaklama güvenliği kritik hale gelir.",
    prioritySectors: ["Fabrika ve depo yapıları", "Otel ve ticari tesisler"],
    services: [
      "Fabrika ve depo yangın güvenliği analizi",
      "İtfaiye uygunluk raporu hazırlığı",
      "Yangın denetimi revizyonu",
      "Anahtar teslim yapısal yangın çözümleri",
    ],
    related: [
      { href: "/fabrika-itfaiye-uygunluk-raporu", label: "Fabrika itfaiye raporu" },
      { href: "/yangin-danismanligi", label: "Yangın danışmanlığı" },
      { href: "/ege-bolgesi-yangin-danismanligi", label: "Ege Bölgesi" },
    ],
  },
};

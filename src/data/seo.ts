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

export type GuidePageData = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  regulationContext: string;
  keyPoints: string[];
  inspectionRisks: string[];
  genYanginApproach: string[];
  faqs: FaqItem[];
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

const guideFaqs: FaqItem[] = [
  {
    question: "Bu bilgiler tek başına resmi uygunluk için yeterli mi?",
    answer:
      "Hayır. Yangın yönetmeliği değerlendirmesi yapı türü, kullanım sınıfı, kat sayısı, kullanıcı yükü, mevcut proje ve sahadaki uygulamaya göre yapılır. Bu rehberler ön bilgi verir; kesin değerlendirme için saha ve proje incelemesi gerekir.",
  },
  {
    question: "Denetimden kalan işletmeler bu rehberleri nasıl kullanmalı?",
    answer:
      "Denetim tutanağındaki eksikleri rehberlerdeki başlıklarla eşleştirebilirler. Gen Yangın, tutanağı ve sahayı birlikte inceleyerek hangi eksiklerin danışmanlık, hangilerinin yapısal uygulama gerektirdiğini netleştirir.",
  },
];

export const guidePages: Record<string, GuidePageData> = {
  "yangin-merdiveni-zorunlulugu": {
    slug: "yangin-merdiveni-zorunlulugu",
    title: "Yangın Merdiveni Zorunluluğu | Yangın Yönetmeliği Rehberi | Gen Yangın",
    description:
      "Yangın merdiveni zorunluluğu, kaçış yolu sayısı, merdiven yeri ve denetim eksikleri hakkında otel ve fabrikalar için pratik yangın yönetmeliği rehberi.",
    h1: "Yangın Merdiveni Zorunluluğu Nasıl Değerlendirilir?",
    intro:
      "Yangın merdiveni zorunluluğu tek bir metrekare veya kat sayısı cevabıyla geçiştirilemez. Yapının kullanım sınıfı, kullanıcı yükü, kaçış yolu sayısı ve mevcut merdivenlerin korunumu birlikte değerlendirilir.",
    regulationContext:
      "Binaların Yangından Korunması Hakkında Yönetmelik'te kaçış yolları, çıkış kapasitesi ve kaçış merdivenleri ayrı başlıklar halinde düzenlenir. Özellikle Madde 32, 33 ve kaçış merdivenlerine ilişkin hükümler, yapı özelinde birlikte okunmalıdır.",
    keyPoints: [
      "Mevcut merdivenin yangın kaçışı sayılıp sayılamayacağı incelenir.",
      "Kaçış yolu sayısı ve genişliği kullanıcı yüküne göre değerlendirilir.",
      "Merdiven yuvası, kapı yönü, duman sızdırmazlık ve yangın dayanımı birlikte kontrol edilir.",
      "Otel ve fabrikalarda kişi yoğunluğu ve kullanım saati farklı riskler doğurur.",
    ],
    inspectionRisks: [
      "Tek çıkışla yetinilen katlar",
      "Kaçış merdivenine açılan uygunsuz kapılar",
      "Merdiven önünde depo, eşya veya üretim malzemesi bulunması",
      "Yangın merdiveni imalatında statik ve ölçü eksikleri",
    ],
    genYanginApproach: [
      "Mimari projeyi ve mevcut merdivenleri birlikte inceleriz.",
      "Eksik kaçış yolu veya merdiven ihtiyacını uygulanabilir alternatiflerle çözeriz.",
      "Gerekirse çelik yangın merdiveni ve kapı uygulamasını anahtar teslim yaparız.",
    ],
    faqs: guideFaqs,
    related: [
      { href: "/kacis-mesafesi-hesaplama", label: "Kaçış mesafesi" },
      { href: "/yangin-kapisi-standartlari", label: "Yangın kapısı standartları" },
      { href: "/yangin-denetimi-revizyonu", label: "Denetim revizyonu" },
    ],
  },
  "kacis-mesafesi-hesaplama": {
    slug: "kacis-mesafesi-hesaplama",
    title: "Kaçış Mesafesi Hesaplama | Yangın Yönetmeliği Rehberi | Gen Yangın",
    description:
      "Kaçış mesafesi, çıkış kapasitesi ve kaçış yolu genişliği hakkında otel, fabrika ve ticari yapılar için yangın yönetmeliği rehberi.",
    h1: "Kaçış Mesafesi Hesaplama Denetimlerde Neden Kritik?",
    intro:
      "Kaçış mesafesi, yangın anında en uzak noktadaki kişinin güvenli çıkışa ulaşabilmesi için temel hesaplardan biridir. Yanlış hesap, ruhsat ve itfaiye denetiminde doğrudan sorun çıkarabilir.",
    regulationContext:
      "Yönetmelikte çıkış kapasitesi ve kaçış uzaklığı Madde 32'de, kaçış yolu sayısı ve genişliği ise Madde 33'te ele alınır. Kaçış uzaklığı için kullanım sınıfına göre ek tablolardaki değerler dikkate alınır.",
    keyPoints: [
      "En uzak noktanın doğru belirlenmesi gerekir.",
      "Koridor, oda bölümlenmesi ve üretim yerleşimi hesabı etkiler.",
      "Çıkış genişliği ve çıkış sayısı kullanıcı yükünden ayrı düşünülemez.",
      "Otel katları ve fabrika üretim alanları farklı senaryolarla incelenir.",
    ],
    inspectionRisks: [
      "Alternatif çıkış olmadan uzun koridor bırakılması",
      "Üretim ekipmanlarının kaçış yolunu daraltması",
      "Acil çıkış kapısına erişimin engellenmesi",
      "Mimari projede görünen kaçış yolunun sahada kapanmış olması",
    ],
    genYanginApproach: [
      "Saha yerleşimini proje ile karşılaştırırız.",
      "Kaçış mesafesi ve çıkış genişliği risklerini raporlarız.",
      "Gereken kapı, koridor veya yönlendirme revizyonlarını uygularız.",
    ],
    faqs: guideFaqs,
    related: [
      { href: "/yangin-merdiveni-zorunlulugu", label: "Yangın merdiveni" },
      { href: "/tahliye-projesi", label: "Tahliye projesi" },
      { href: "/fabrika-yangin-yonetmeligi", label: "Fabrika yangın yönetmeliği" },
    ],
  },
  "sprinkler-zorunlulugu": {
    slug: "sprinkler-zorunlulugu",
    title: "Sprinkler Zorunluluğu | Yangın Yönetmeliği Rehberi | Gen Yangın",
    description:
      "Sprinkler sistemi zorunluluğu, otel ve fabrikalarda otomatik söndürme ihtiyacı ve denetim hazırlığı için yangın yönetmeliği rehberi.",
    h1: "Sprinkler Sistemi Ne Zaman Zorunlu Olur?",
    intro:
      "Sprinkler zorunluluğu yapının kullanım sınıfı, büyüklüğü, risk seviyesi ve mevcut yangın güvenliği kurgusuyla birlikte değerlendirilir.",
    regulationContext:
      "Yönetmelikte otomatik söndürme sistemleri ayrı bölümde ele alınır. Sprinkler değerlendirmesi yapılırken yapı kullanım sınıfı, kat/alan bilgisi, yangın yükü ve ilgili teknik standartlar birlikte incelenir.",
    keyPoints: [
      "Otel, yurt, fabrika, depo ve otopark gibi yapılarda farklı kriterler doğabilir.",
      "Sadece sprinkler başlığı değil, su kaynağı, pompa, borulama ve alarm ilişkisi de incelenir.",
      "Mevcut binalarda uygulama zorluğu ve denetim önceliği birlikte planlanır.",
      "Yanlış sistem seçimi hem maliyet hem denetim riski üretir.",
    ],
    inspectionRisks: [
      "Yetersiz su deposu veya pompa kapasitesi",
      "Projesiz veya eksik zonlanmış sprinkler hattı",
      "Depo raf düzeniyle uyumsuz başlık yerleşimi",
      "Sistemin algılama ve alarm kurgusundan kopuk kurulması",
    ],
    genYanginApproach: [
      "Yapının sprinkler gereksinimini proje ve saha üzerinden değerlendiririz.",
      "Gereken mekanik ve yapısal koordinasyonu netleştiririz.",
      "Otel ve fabrika kullanımına göre uygulanabilir çözüm sırası çıkarırız.",
    ],
    faqs: guideFaqs,
    related: [
      { href: "/fabrika-yangin-risk-analizi", label: "Fabrika risk analizi" },
      { href: "/otel-yangin-guvenligi-kontrol-listesi", label: "Otel kontrol listesi" },
      { href: "/yangin-algilama-sistemi", label: "Yangın algılama sistemi" },
    ],
  },
  "yangin-kapisi-standartlari": {
    slug: "yangin-kapisi-standartlari",
    title: "Yangın Kapısı Standartları | Yangın Yönetmeliği Rehberi | Gen Yangın",
    description:
      "Yangın kapısı standartları, duman sızdırmazlık, panik bar, dayanım süresi ve denetim eksikleri hakkında pratik rehber.",
    h1: "Yangın Kapısı Standartları Denetimde Nasıl Kontrol Edilir?",
    intro:
      "Yangın kapısı yalnızca metal bir kapı değildir. Dayanım belgesi, duman sızdırmazlık, kendiliğinden kapanma, panik bar ve doğru açılış yönü birlikte değerlendirilir.",
    regulationContext:
      "Yönetmelikte kaçış yolu kapıları ve yangına dayanımlı geçişler, kaçış güvenliğinin temel parçası olarak ele alınır. Kapı seçimi ilgili standart, belge ve saha montajıyla birlikte değerlendirilmelidir.",
    keyPoints: [
      "Kapının yangına dayanım belgesi kontrol edilir.",
      "Duman sızdırmaz fitil ve kendiliğinden kapanma mekanizması incelenir.",
      "Panik bar ve açılış yönü tahliye senaryosuna göre değerlendirilir.",
      "Kapı montajı duvar ve kasa detayıyla birlikte düşünülür.",
    ],
    inspectionRisks: [
      "Belgesiz veya yanlış sınıfta kapı kullanılması",
      "Kapının kaçış yönünün tersine açılması",
      "Panik bar olmaması veya çalışmaması",
      "Kapı çevresindeki boşluklardan duman geçişi oluşması",
    ],
    genYanginApproach: [
      "Mevcut kapıları belge ve saha performansı açısından kontrol ederiz.",
      "Eksik kapıları doğru sınıf ve donanımla yenileriz.",
      "Yangın kapısı montajını kaçış yolu ve merdiven kurgusuyla birlikte çözeriz.",
    ],
    faqs: guideFaqs,
    related: [
      { href: "/panik-bar-zorunlulugu", label: "Panik bar" },
      { href: "/yangin-merdiveni-zorunlulugu", label: "Yangın merdiveni" },
      { href: "/otel-itfaiye-uygunluk-raporu", label: "Otel itfaiye raporu" },
    ],
  },
  "panik-bar-zorunlulugu": {
    slug: "panik-bar-zorunlulugu",
    title: "Panik Bar Zorunluluğu | Yangın Yönetmeliği Rehberi | Gen Yangın",
    description:
      "Panik bar zorunluluğu, acil çıkış kapıları, otel ve fabrika denetim eksikleri için yangın yönetmeliği rehberi.",
    h1: "Panik Bar Zorunluluğu Hangi Kapılarda Gündeme Gelir?",
    intro:
      "Panik bar, acil durumda kapının hızlı ve tereddütsüz açılmasını sağlayan hayati bir donanımdır. Özellikle yoğun kullanıcı bulunan alanlarda denetimlerin sık baktığı başlıklardan biridir.",
    regulationContext:
      "Kaçış yolu kapıları, tahliye güvenliğinin parçası olarak değerlendirilir. Panik bar ihtiyacı kapının konumu, kullanıcı yoğunluğu ve tahliye senaryosuyla birlikte incelenir.",
    keyPoints: [
      "Acil çıkış kapılarında hızlı açılma gerekliliği kontrol edilir.",
      "Kapı yönü ve panik bar çalışma durumu birlikte incelenir.",
      "Otel koridorları ve fabrika çıkışları farklı kullanım yoğunluğuna sahiptir.",
      "Panik bar tek başına yeterli değildir; kapı sınıfı ve montajı da doğru olmalıdır.",
    ],
    inspectionRisks: [
      "Kilitli veya zor açılan acil çıkış kapıları",
      "Panik barın kapı kanadıyla uyumsuz olması",
      "Kapı önünde eşya veya üretim malzemesi bulunması",
      "Panik barın bakımının yapılmaması",
    ],
    genYanginApproach: [
      "Acil çıkış kapılarını tahliye senaryosuna göre inceleriz.",
      "Eksik panik bar ve kapı donanımlarını uygun ürünlerle yenileriz.",
      "Kapı, yönlendirme ve kaçış yolunu birlikte teslim ederiz.",
    ],
    faqs: guideFaqs,
    related: [
      { href: "/yangin-kapisi-standartlari", label: "Yangın kapısı" },
      { href: "/acil-yonlendirme-ve-aydinlatma", label: "Acil yönlendirme" },
      { href: "/yangin-denetimi-revizyonu", label: "Denetim revizyonu" },
    ],
  },
  "duman-tahliye-sistemi": {
    slug: "duman-tahliye-sistemi",
    title: "Duman Tahliye Sistemi | Yangın Yönetmeliği Rehberi | Gen Yangın",
    description:
      "Duman tahliye sistemi, merdiven basınçlandırma, otel ve fabrika duman kontrol riskleri için yangın yönetmeliği rehberi.",
    h1: "Duman Tahliye Sistemi Neden Yangın Güvenliğinin Merkezindedir?",
    intro:
      "Yangınlarda can güvenliği açısından duman kontrolü en az alev kontrolü kadar önemlidir. Kaçış yollarının dumandan korunması, tahliyenin sürdürülebilmesini sağlar.",
    regulationContext:
      "Yönetmelikte duman kontrolü ve kaçış yollarının korunumu ayrı başlıklarla ele alınır. Duman tahliye ihtiyacı yapı yüksekliği, kullanım sınıfı, merdiven yuvası ve kapalı alan düzeniyle birlikte değerlendirilir.",
    keyPoints: [
      "Kaçış merdiveni ve koridorların duman kontrolü incelenir.",
      "Doğal veya mekanik tahliye ihtiyacı yapı özelinde belirlenir.",
      "Basınçlandırma, damper ve fan senaryoları birlikte düşünülür.",
      "Otel ve fabrikalarda duman yayılım yolları farklıdır.",
    ],
    inspectionRisks: [
      "Merdiven yuvasına duman sızması",
      "Çalışmayan veya projeye uygun olmayan fanlar",
      "Duman tahliye açıklıklarının kapatılması",
      "Yangın algılama sistemiyle ilişkilendirilmemiş duman kontrolü",
    ],
    genYanginApproach: [
      "Duman yayılımını mimari ve mekanik açıdan değerlendiririz.",
      "Kaçış yollarını koruyacak uygulanabilir revizyonları belirleriz.",
      "Kapı, yönlendirme, algılama ve duman kontrolünü birlikte ele alırız.",
    ],
    faqs: guideFaqs,
    related: [
      { href: "/yangin-algilama-sistemi", label: "Yangın algılama" },
      { href: "/kacis-mesafesi-hesaplama", label: "Kaçış mesafesi" },
      { href: "/fabrika-itfaiye-uygunluk-raporu", label: "Fabrika raporu" },
    ],
  },
  "acil-yonlendirme-ve-aydinlatma": {
    slug: "acil-yonlendirme-ve-aydinlatma",
    title: "Acil Yönlendirme ve Aydınlatma | Yangın Yönetmeliği Rehberi | Gen Yangın",
    description:
      "Acil yönlendirme levhaları, acil aydınlatma, tahliye güzergahı ve yangın denetimi eksikleri için rehber.",
    h1: "Acil Yönlendirme ve Aydınlatma Denetimde Nasıl Değerlendirilir?",
    intro:
      "Acil yönlendirme ve aydınlatma, yangın anında insanların güvenli çıkışı bulmasını sağlar. Levhanın varlığı kadar doğru konumu, görünürlüğü ve enerji sürekliliği de önemlidir.",
    regulationContext:
      "Yönetmelikte kaçış yollarının erişilebilir ve kullanılabilir olması temel ilkedir. Acil yönlendirme ve aydınlatma bu ilkenin sahadaki görünür parçasıdır.",
    keyPoints: [
      "Acil çıkış yönleri açık ve anlaşılır olmalıdır.",
      "Aydınlatma kesintiye karşı destekli olmalıdır.",
      "Levhalar kapı, koridor ve merdiven karar noktalarına göre yerleştirilmelidir.",
      "Fabrikalarda üretim yerleşimi, otellerde misafir yönlendirmesi ayrıca değerlendirilir.",
    ],
    inspectionRisks: [
      "Eksik veya yanlış yön gösteren levhalar",
      "Enerji kesildiğinde çalışmayan acil aydınlatmalar",
      "Görüşü kapanmış yönlendirme armatürleri",
      "Saha değiştiği halde güncellenmeyen tahliye yönleri",
    ],
    genYanginApproach: [
      "Tahliye güzergahını yerinde yürüyerek kontrol ederiz.",
      "Eksik yönlendirme ve acil aydınlatma noktalarını belirleriz.",
      "Montaj ve revizyonu kaçış planıyla uyumlu hale getiririz.",
    ],
    faqs: guideFaqs,
    related: [
      { href: "/tahliye-projesi", label: "Tahliye projesi" },
      { href: "/panik-bar-zorunlulugu", label: "Panik bar" },
      { href: "/otel-yangin-guvenligi-kontrol-listesi", label: "Otel kontrol listesi" },
    ],
  },
  "tahliye-projesi": {
    slug: "tahliye-projesi",
    title: "Tahliye Projesi | Yangın Yönetmeliği Rehberi | Gen Yangın",
    description:
      "Tahliye projesi, kaçış yolları, yangın merdiveni, acil yönlendirme ve itfaiye denetimi hazırlığı için pratik rehber.",
    h1: "Tahliye Projesi Hangi İşletmeler İçin Kritik Hale Gelir?",
    intro:
      "Tahliye projesi, binadaki insanların yangın anında hangi yoldan ve hangi kapasiteyle güvenli alana ulaşacağını gösteren planlı güvenlik kurgusudur.",
    regulationContext:
      "Yönetmelikte tahliye projeleri ve kaçış düzenlemeleri yapı kullanımına göre ele alınır. Büyük ve karmaşık yapılarda tahliye projesinin mimari projeden ayrı değerlendirilmesi gerekebilir.",
    keyPoints: [
      "Kaçış rotaları ve alternatif çıkışlar gösterilmelidir.",
      "Yangın merdiveni, yangın kapısı ve acil yönlendirme projeyle uyumlu olmalıdır.",
      "Otel, fabrika ve depo gibi yapılarda kullanıcı davranışı farklıdır.",
      "Sahadaki gerçek kullanım proje ile karşılaştırılmalıdır.",
    ],
    inspectionRisks: [
      "Eski mimari projeye göre hazırlanmış tahliye planı",
      "Sahada kapatılmış veya daraltılmış kaçış yolu",
      "Yönlendirme ile tahliye planının çelişmesi",
      "İtfaiyenin ulaşması gereken planların sahada bulunmaması",
    ],
    genYanginApproach: [
      "Mevcut proje ve saha kullanımını karşılaştırırız.",
      "Tahliye kurgusunu kaçış mesafesi ve çıkış kapasitesiyle birlikte değerlendiririz.",
      "Gerekli yapısal ve yönlendirme revizyonlarını uygularız.",
    ],
    faqs: guideFaqs,
    related: [
      { href: "/kacis-mesafesi-hesaplama", label: "Kaçış mesafesi" },
      { href: "/acil-yonlendirme-ve-aydinlatma", label: "Acil yönlendirme" },
      { href: "/itfaiye-uygunluk-raporu", label: "İtfaiye uygunluk raporu" },
    ],
  },
  "yangin-algilama-sistemi": {
    slug: "yangin-algilama-sistemi",
    title: "Yangın Algılama Sistemi | Yangın Yönetmeliği Rehberi | Gen Yangın",
    description:
      "Yangın algılama sistemi, adresli algılama, duman dedektörü, otel ve fabrika denetim eksikleri için pratik rehber.",
    h1: "Yangın Algılama Sistemi Denetimlerde Nasıl İncelenir?",
    intro:
      "Yangın algılama sistemi, yangının erken fark edilmesini ve tahliye sürecinin zamanında başlamasını sağlar. Dedektör sayısı kadar zonlama, panel, alarm ve saha yerleşimi de önemlidir.",
    regulationContext:
      "Yönetmelikte algılama ve uyarı sistemleri, yapının kullanım sınıfı ve risklerine göre değerlendirilir. Otel odaları, koridorlar, üretim alanları ve depolar aynı algılama mantığıyla ele alınmaz.",
    keyPoints: [
      "Dedektör tipi ve yerleşimi kullanım alanına göre seçilmelidir.",
      "Adresli sistemlerde zonlama ve panel organizasyonu kontrol edilir.",
      "Alarm, acil anons ve duman kontrol ilişkisi birlikte düşünülür.",
      "Bakım ve test kayıtları denetim güveni açısından önemlidir.",
    ],
    inspectionRisks: [
      "Eksik dedektör yerleşimi",
      "Kör nokta oluşturan tavan veya bölme değişiklikleri",
      "Devre dışı bırakılmış algılama bölgeleri",
      "Alarm senaryosuyla uyumsuz panel ayarları",
    ],
    genYanginApproach: [
      "Algılama ihtiyacını oda, koridor, üretim ve depo bazında inceleriz.",
      "Sistem eksiklerini yangın senaryosuyla birlikte raporlarız.",
      "Algılama, yönlendirme ve tahliye kurgusunu birlikte optimize ederiz.",
    ],
    faqs: guideFaqs,
    related: [
      { href: "/duman-tahliye-sistemi", label: "Duman tahliye" },
      { href: "/sprinkler-zorunlulugu", label: "Sprinkler" },
      { href: "/otel-yangin-yonetmeligi", label: "Otel yangın yönetmeliği" },
    ],
  },
  "otel-yangin-guvenligi-kontrol-listesi": {
    slug: "otel-yangin-guvenligi-kontrol-listesi",
    title: "Otel Yangın Güvenliği Kontrol Listesi | Gen Yangın",
    description:
      "Oteller için yangın güvenliği kontrol listesi: itfaiye raporu, yangın kapısı, algılama, kaçış yolları, acil yönlendirme ve turizm belgesi hazırlığı.",
    h1: "Otel Yangın Güvenliği Kontrol Listesi",
    intro:
      "Otellerde yangın güvenliği misafirlerin binayı tanımaması nedeniyle hassas bir konudur. Oda, koridor, merdiven, algılama ve yönlendirme bütün olarak kontrol edilmelidir.",
    regulationContext:
      "Konaklama amaçlı binalar yönetmelikte ayrı kullanım sınıfı olarak değerlendirilir. Otellerde gece kullanımı, oda bölümlenmesi ve misafir tahliyesi nedeniyle yangın güvenliği başlıkları daha sıkı ele alınır.",
    keyPoints: [
      "Oda ve koridorlarda algılama sistemi kontrol edilir.",
      "Yangın kapıları, panik barlar ve kaçış yönleri incelenir.",
      "Acil yönlendirme ve aydınlatma misafir gözüyle test edilir.",
      "Turizm belgesi ve itfaiye uygunluk süreci birlikte planlanır.",
    ],
    inspectionRisks: [
      "Oda koridorlarında eksik dedektör",
      "Yangın kapılarının açık tutulması veya duman sızdırması",
      "Gizlenmiş ya da yanlış konumlanmış acil yönlendirme",
      "Eski binada yeni kullanım şartlarına göre revizyon yapılmaması",
    ],
    genYanginApproach: [
      "Otelin misafir tahliye senaryosunu sahada test ederiz.",
      "Turizm ve itfaiye denetimi için eksik listesini önceliklendiririz.",
      "Yangın kapısı, yönlendirme ve yapısal revizyonları anahtar teslim tamamlarız.",
    ],
    faqs: guideFaqs,
    related: [
      { href: "/otel-yangin-yonetmeligi", label: "Otel yangın yönetmeliği" },
      { href: "/otel-itfaiye-uygunluk-raporu", label: "Otel itfaiye raporu" },
      { href: "/mugla-yangin-danismanligi", label: "Muğla otel danışmanlığı" },
    ],
  },
  "fabrika-yangin-risk-analizi": {
    slug: "fabrika-yangin-risk-analizi",
    title: "Fabrika Yangın Risk Analizi | Gen Yangın",
    description:
      "Fabrikalar için yangın risk analizi: üretim alanı, depo, kaçış yolları, yangın kapısı, algılama, söndürme ve itfaiye denetimi hazırlığı.",
    h1: "Fabrika Yangın Risk Analizi Nasıl Yapılır?",
    intro:
      "Fabrikalarda yangın riski üretim prosesi, hammadde, elektrik panoları, depo düzeni ve insan yoğunluğu ile birlikte değerlendirilmelidir.",
    regulationContext:
      "Endüstriyel yapılar ve depolama amaçlı tesisler yönetmelikte kullanım sınıflarına göre değerlendirilir. Yangın yükü, kaçış yolları, söndürme ve algılama sistemleri birlikte ele alınmalıdır.",
    keyPoints: [
      "Üretim ve depo alanları ayrı risk başlığı olarak incelenir.",
      "Kaçış yolları üretim yerleşimiyle birlikte kontrol edilir.",
      "Yangın dolabı, algılama, söndürme ve yönlendirme bütün halinde değerlendirilir.",
      "OSB veya belediye denetimi öncesi eksikler uygulanabilir sıraya konur.",
    ],
    inspectionRisks: [
      "Depolama düzeninin kaçış yolunu daraltması",
      "Elektrik panosu ve yanıcı malzeme yakınlığı",
      "Yangın kapılarının üretim akışı nedeniyle açık bırakılması",
      "Eski yerleşim planına göre kalmış tahliye kurgusu",
    ],
    genYanginApproach: [
      "Üretimi durdurmadan uygulanabilecek revizyon sırası çıkarırız.",
      "Denetim eksiklerini yapısal ve sistemsel başlıklara ayırırız.",
      "Yangın kapısı, kaçış yolu ve yönlendirme uygulamasını sahada tamamlarız.",
    ],
    faqs: guideFaqs,
    related: [
      { href: "/fabrika-yangin-yonetmeligi", label: "Fabrika yangın yönetmeliği" },
      { href: "/fabrika-itfaiye-uygunluk-raporu", label: "Fabrika itfaiye raporu" },
      { href: "/manisa-yangin-danismanligi", label: "Manisa fabrika danışmanlığı" },
    ],
  },
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: number;
  role: string;
  cover: string;
  description: string;
  content: string[];
  tags: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "klinik-randevu-platformu",
    title: "Klinik Randevu Platformu",
    category: "Sağlık & Web",
    year: 2025,
    role: "Tasarım & Geliştirme",
    cover: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    description: "Hastalar için sade, hızlı ve KVKK uyumlu online randevu deneyimi.",
    content: [
      "Polikliniklerin en büyük problemi olan telefonla randevu sistemini, Next.js tabanlı modern bir web arayüzüyle yeniden tasarladık.",
      "Sayfa açılma süresi 1.2 sn altına düşürüldü, mobil dönüşüm oranı %47 arttı.",
      "Tüm kişisel veriler KVKK uyumlu olarak şifrelendi ve hasta tarafında şeffaf bir bildirim akışı kuruldu.",
    ],
    tags: ["Next.js", "Sağlık", "UX"],
    featured: true,
  },
  {
    slug: "hemsire-blog-magazin",
    title: "Hemşire Blog & Mağaza",
    category: "İçerik & E-Ticaret",
    year: 2024,
    role: "Marka & Geliştirme",
    cover: "https://images.unsplash.com/photo-1551192144-1c95c8e9b95b?auto=format&fit=crop&w=1600&q=80",
    description: "Hemşirelere özel premium blog ve dijital ürün mağazası.",
    content: [
      "Türkiye&apos;deki hemşirelerin mesleki gelişimine katkı sağlayan içerik platformu.",
      "Tasarımda sıcak, profesyonel ve güven veren bir dil kuruldu.",
      "Stripe entegrasyonlu dijital ürün satışı ve abonelik altyapısı eklendi.",
    ],
    tags: ["Brand", "E-Commerce", "Blog"],
    featured: true,
  },
  {
    slug: "kurumsal-marka-sitesi",
    title: "Kurumsal Marka Sitesi",
    category: "Marka & Web",
    year: 2024,
    role: "Tasarım & SEO",
    cover: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1600&q=80",
    description: "Premium hisli, animasyon zengini, dönüşüm odaklı kurumsal site.",
    content: [
      "Mevcut müşteri sitesi yeniden tasarlanarak Lighthouse skoru 96+&apos;ya çıkarıldı.",
      "İçerik mimarisi sade, çağrı butonları net ve dönüşüm odaklı kuruldu.",
      "Lansman sonrası 90 gün içinde organik trafikte %62 artış sağlandı.",
    ],
    tags: ["Next.js", "SEO", "Animasyon"],
    featured: true,
  },
  {
    slug: "doktor-portfolyo",
    title: "Doktor Portfolyosu",
    category: "Sağlık",
    year: 2023,
    role: "Tasarım & Geliştirme",
    cover: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80",
    description: "Cerrah için referans odaklı premium portfolyo deneyimi.",
    content: [
      "Profesyonel referansları ve yayınları öne çıkaran tek sayfalık deneyim.",
      "Türkçe ve İngilizce dil desteği ile kuruldu.",
      "Ay başında ortalama 38 yeni hasta talebi alınmaya başlandı.",
    ],
    tags: ["Portfolyo", "Sağlık"],
  },
  {
    slug: "egitim-kursu-sayfasi",
    title: "Eğitim Kursu Sayfası",
    category: "Pazarlama",
    year: 2024,
    role: "CRO & Geliştirme",
    cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
    description: "Online kurs satışını 3 ayda 4 katına çıkaran satış sayfası.",
    content: [
      "A/B testlerle başlık, görsel ve fiyatlama optimizasyonu yapıldı.",
      "Sayfa yüklenme süresi 1 saniyenin altına çekildi.",
      "Dönüşüm oranı %1.4&apos;ten %5.1&apos;e yükseldi.",
    ],
    tags: ["CRO", "Pazarlama"],
  },
  {
    slug: "saglik-icerik-stratejisi",
    title: "Sağlık İçerik Stratejisi",
    category: "Pazarlama",
    year: 2025,
    role: "Strateji & SEO",
    cover: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80",
    description: "Klinik için 6 aylık içerik takvimi ve teknik SEO çalışması.",
    content: [
      "200+ anahtar kelime için içerik kümeleri oluşturuldu.",
      "Sitenin tüm teknik SEO sorunları temizlendi.",
      "İlk 3 ayda organik trafik %120 arttı.",
    ],
    tags: ["SEO", "İçerik"],
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string;
  readingMinutes: number;
  body: string[];
  tags: string[];
};

export const posts: Post[] = [
  {
    slug: "hemsirelikte-dijital-donusum",
    title: "Hemşirelikte Dijital Dönüşümün Sessiz Devrimi",
    excerpt:
      "Sağlık hizmetlerinin dijitalleşmesi yalnızca yazılım değil, aynı zamanda insan deneyimini yeniden tasarlamaktır.",
    cover: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1600&q=80",
    date: "2026-04-15",
    readingMinutes: 6,
    tags: ["Sağlık", "Dijital"],
    body: [
      "Hemşirelik mesleği son 10 yılda büyük bir dönüşüm geçirdi. Bilgisayar başında geçirilen süre arttı, ancak hasta başında geçirilen kaliteli zaman da paralel olarak artırılabilir hale geldi.",
      "Sağlık alanındaki dijital ürünleri tasarlarken her zaman tek bir soruyu öne alıyorum: Bu özellik, hasta ile hemşire arasındaki güvene değer katıyor mu?",
      "Cevap evetse devam ediyoruz. Hayırsa, ne kadar şık bir teknoloji olursa olsun yapmıyoruz. Çünkü güven, hiçbir arayüz tarafından telafi edilemez.",
    ],
  },
  {
    slug: "nextjs-ile-kisisel-marka",
    title: "Next.js ile Premium Kişisel Marka Sitesi Kurmak",
    excerpt:
      "Hızlı, akıcı ve canlı hissi veren bir site, sadece tasarımla değil; mimari kararlarla başlar.",
    cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    date: "2026-03-22",
    readingMinutes: 8,
    tags: ["Next.js", "Tasarım"],
    body: [
      "Premium hissi veren bir site iki temel üzerine kurulur: kararlı performans ve duygusal detay.",
      "Next.js 14 App Router ile sayfa geçişlerini akıcı, server bileşenlerini hafif tutuyorum. Tailwind ile tasarım sisteminin kararlı kalmasını sağlıyorum.",
      "Framer Motion ile küçük dokunuşlar ekliyorum: kelimelerin yumuşakça açılması, butonların manyetik tepki vermesi, scroll&apos;a duyarlı reveal animasyonları.",
    ],
  },
  {
    slug: "saglik-markalari-icin-icerik",
    title: "Sağlık Markaları İçin Güven Veren İçerik Stratejisi",
    excerpt: "Klinik markaların dijitalde fark yaratmasını sağlayan içerik prensipleri.",
    cover: "https://images.unsplash.com/photo-1583912267550-d44c9c2d56e1?auto=format&fit=crop&w=1600&q=80",
    date: "2026-02-08",
    readingMinutes: 5,
    tags: ["İçerik", "Sağlık"],
    body: [
      "Sağlık alanındaki içerik, doğru kaynak ve sade dil ister.",
      "Ben bir hemşire olarak içerik üretirken her zaman önce soru bekleyen hastayı düşünürüm: Bu paragrafı okuduğunda rahatlıyor mu?",
      "Bu zihniyetle yazılan içerik, hem SEO hem de marka güveninde başarıyı getiriyor.",
    ],
  },
];

export const testimonials = [
  {
    name: "Dr. Ayşe Kaya",
    role: "Estetik Hekim, İstanbul",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
    content:
      "Sade, premium ve sıcak bir marka kimliği istiyorduk. Muhammed Emin Bey&apos;in disiplinli ve estetik yaklaşımı tam aradığımızı verdi. Hastalarımızdan gelen ilk geri bildirim: ‘Sitenize bayıldım&apos;.",
    rating: 5,
  },
  {
    name: "Burak Demir",
    role: "Kurucu, NovaMed",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
    content:
      "Sadece bir site değil, bir dijital strateji teslim aldık. Lansmandan iki ay sonra organik trafik iki katına çıktı.",
    rating: 5,
  },
  {
    name: "Selin Aydın",
    role: "Pazarlama Direktörü",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    content:
      "Çok sayıda ajansla çalıştım. Bu kadar zamanında, bu kadar şık ve bu kadar dürüst bir süreç görmedim.",
    rating: 5,
  },
  {
    name: "Op. Dr. Mehmet Aksoy",
    role: "Genel Cerrah",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80",
    content:
      "Sağlık geçmişi olan biriyle çalışmak, terminolojiye hâkim olması, süreci çok hızlandırdı. Premium hissi de tam beklediğim gibi.",
    rating: 5,
  },
  {
    name: "Ece Yıldız",
    role: "İçerik Editörü",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    content:
      "Tasarım kadar yazılı dile de hâkim. SEO ile estetiğin bu kadar dengeli buluştuğu bir proje yaşamamıştım.",
    rating: 5,
  },
];

export const faq = [
  {
    q: "Sağlık alanında çalışmaya devam ederken nasıl proje yapıyorsunuz?",
    a: "Hastane mesai saatlerim dışında, akşam ve hafta sonları stüdyo gibi çalışıyorum. Aynı anda 1-2 projeye odaklanarak kaliteyi koruyorum.",
  },
  {
    q: "Bir proje ne kadar sürede tamamlanır?",
    a: "Tek sayfalık premium bir site 2-3 hafta, çok sayfalı kurumsal site 4-6 hafta sürüyor. Tüm aşamaları şeffaf paylaşıyorum.",
  },
  {
    q: "Ödeme nasıl ilerliyor?",
    a: "Genelde %50 başlangıç + %50 teslim modeliyle çalışıyorum. Büyük projelerde 3 aşamalı ödeme planı sunuyorum.",
  },
  {
    q: "Yayın sonrası destek veriyor musunuz?",
    a: "Evet. Her projenin ardından 30 gün ücretsiz bakım desteği sunuyorum. Sonrasında aylık bakım paketleri mevcut.",
  },
  {
    q: "Yurt dışından çalışmak mümkün mü?",
    a: "Tabii ki. Tüm görüşmeler Google Meet üzerinden yapılır, sözleşme dijital olarak imzalanır.",
  },
  {
    q: "Mevcut sitemi yenileyebilir misiniz?",
    a: "Evet. Önce mevcut yapıyı inceliyor, performansı, SEO ve UX&apos;i değerlendirip yol haritası çıkarıyorum.",
  },
];

export const trustLogos = [
  "ClinicaPlus",
  "NovaMed",
  "Ayhan Estetik",
  "Bursa Polikliniği",
  "Dr. Aksoy",
  "Mavi Şifa",
  "Sağlık 360",
  "Vita Wellness",
];

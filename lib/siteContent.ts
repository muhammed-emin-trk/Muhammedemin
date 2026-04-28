export type GalleryItem = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
};

export const ADMIN_STORAGE_KEY = "met-studio-gallery-items";

export const defaultGalleryItems: GalleryItem[] = [
  {
    id: "landing",
    title: "Kurumsal Landing",
    subtitle: "Yüksek güven hissi ve güçlü teklif butonlarıyla dönüşüm odaklı ana sayfa",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "catalog",
    title: "Hizmet Kataloğu",
    subtitle: "Ziyaretçinin hızlı karar vermesi için sade, anlaşılır ve premium hizmet modülleri",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "references",
    title: "Referans Blokları",
    subtitle: "Sosyal kanıt ve müşteri yorumlarıyla marka güvenini güçlendiren yapı",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "panel",
    title: "Süreç Yönetimi Paneli",
    subtitle: "Müşteri tarafında şeffaf ilerleme takibi sağlayan proje aşama ekranları",
    imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "mobile",
    title: "Mobil Öncelikli Tasarım",
    subtitle: "Telefon ekranlarında hızlı açılan, akıcı ve satış odaklı kullanıcı deneyimi",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "form",
    title: "Teklif Toplama Formu",
    subtitle: "Doğru sorularla kaliteli lead toplayan yapılandırılmış iletişim akışı",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  },
];

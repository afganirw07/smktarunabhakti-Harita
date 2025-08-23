import Testi from "components/magicui/testimonial";

export function AnimatedTesti() {
  const testimonials = [
    {
      quote:
        "Sejak menggunakan layanan pengangkutan sampah ini, rumah kami jadi lebih bersih dan tertata. Jadwal pickup selalu tepat waktu dan tim sangat profesional.",
      name: "Sari Indrawati",
      designation: "Ibu Rumah Tangga",
      src: "https://www.nowspeakenglishonline.com/wp-content/uploads/2018/08/Mom-Profile-Picture-Website-768x1022.jpg",
    },
    {
      quote:
        "Pelayanan yang sangat membantu keluarga besar kami. Sampah organik dijadikan kompos gratis dan sistem pemilahan sampahnya mudah dipahami.",
      name: "Budi Hartono",
      designation: "Kepala Keluarga",
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      quote:
        "Aplikasinya user-friendly dan customer service 24/7 sangat responsif. Tidak perlu repot lagi buang sampah sendiri ke TPS.",
      name: "Maya Kusuma",
      designation: "Pekerja Profesional",
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=3461&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      quote:
        "Layanan pickup harian premium family sangat cocok untuk keluarga besar kami. Tidak ada lagi tumpukan sampah di rumah dan lingkungan jadi lebih sehat.",
      name: "Rizki Ramadhan",
      designation: "Ayah 3 Anak",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      quote:
        "Tim sangat membantu dalam edukasi pemilahan sampah. Sekarang keluarga kami lebih peduli lingkungan dan sampah B3 ditangani dengan benar.",
      name: "Dewi Anggraini",
      designation: "Aktivis Lingkungan",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ];
  return <Testi testimonials={testimonials} />;
}
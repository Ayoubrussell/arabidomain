import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966500000000";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("مرحباً، أود الاستفسار عن نطاق...")}`;

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-navy py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <span className="mb-2 block text-xs font-bold tracking-widest text-accent uppercase">
              Get in touch
            </span>
            <h1 className="mb-4 text-4xl font-black text-white">تواصل معنا</h1>
            <p className="text-sm text-gray-400">
              سواء كنت مهتماً بشراء نطاق، أو تبحث عن استشارة لاختيار الاسم
              المناسب لعلامتك التجارية، فريقنا في خدمتك.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto grid max-w-4xl gap-8 px-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <h3 className="mb-2 text-lg font-bold text-navy">واتساب</h3>
              <p className="mb-4 text-sm text-gray-500">
                رد سريع خلال ساعات العمل.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-accent transition-colors hover:text-accent-dark"
              >
                ابدأ المحادثة &larr;
              </a>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <h3 className="mb-2 text-lg font-bold text-navy">
                بريد إلكتروني
              </h3>
              <p className="mb-4 text-sm text-gray-500">
                لاستفسارات الشركات والصفقات الخاصة.
              </p>
              <a
                href="mailto:sales@nitaqat.boutique"
                className="text-sm font-bold text-accent transition-colors hover:text-accent-dark"
              >
                sales@nitaqat.boutique
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const values = [
  {
    num: "01",
    title: "تنسيق فاخر",
    desc: "كل نطاق يخضع لمراجعة لغوية وتسويقية قبل عرضه.",
  },
  {
    num: "02",
    title: "ضمان كامل",
    desc: "كل صفقة تتم عبر منصة Escrow.com لحماية الطرفين.",
  },
  {
    num: "03",
    title: "خبرة عربية",
    desc: "فريق يفهم اللغة والثقافة وأسواق المنطقة.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-navy py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <span className="mb-2 block text-xs font-bold tracking-widest text-accent uppercase">
              Our Story
            </span>
            <h1 className="mb-6 text-4xl font-black text-white">من نحن</h1>
            <p className="mx-auto max-w-2xl text-base leading-loose text-gray-400">
              نِطاقات هو بوتيك متخصص في تنسيق وبيع نطاقات إنترنت مشتقّة من
              اللغة العربية الفصحى — مُختارة بعناية لتمنح علامتك التجارية حضوراً
              عالمياً يحمل في طيّاته أصالة الكلمة العربية.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6">
            <p className="mb-12 text-center text-sm leading-loose text-gray-600">
              نؤمن بأن النطاق ليس مجرد عنوان رقمي، بل هو الواجهة الأولى
              لهويّتك، وأول انطباع يبقى في ذهن عملائك. لذلك نعمل مع شركات
              متعددة الجنسيات ومستثمرين وعلامات تجارية ناشئة لمساعدتها على
              امتلاك أسماء فاخرة من كلمة واحدة، نادرة، وذات معنى.
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              {values.map((v) => (
                <div
                  key={v.num}
                  className="rounded-2xl border border-gray-200 bg-white p-8 text-center"
                >
                  <div className="mb-3 text-3xl font-black text-accent">
                    {v.num}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-navy">
                    {v.title}
                  </h3>
                  <p className="text-sm text-gray-500">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Heart, Zap, Shield } from "lucide-react";
import { teamMembers } from "@/lib/data";
import Footer from "@/components/layout/Footer";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À Propos — DreamRest" },
      { name: "description", content: "Découvrez l'histoire et la mission de DreamRest." },
      { property: "og:title", content: "À Propos — DreamRest" },
      { property: "og:description", content: "Notre mission : votre sommeil." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=630&fit=crop" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, lang } = useLang();
  const values = [
    { icon: Target, title: t("about.val.innovation"), desc: t("about.val.innovationDesc") },
    { icon: Heart,  title: t("about.val.wellness"),   desc: t("about.val.wellnessDesc") },
    { icon: Zap,    title: t("about.val.quality"),    desc: t("about.val.qualityDesc") },
    { icon: Shield, title: t("about.val.warranty"),   desc: t("about.val.warrantyDesc") },
  ];

  return (
    <>
      <div className="pt-24 pb-16">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              {t("about.title.1")} <span className="text-gradient">{t("about.title.2")}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t("about.intro")}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="mt-12 overflow-hidden rounded-3xl shadow-2xl">
            <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&h=800&fit=crop" alt="Atelier DreamRest" className="w-full object-cover" />
          </motion.div>
        </section>

        <section className="mt-20 bg-secondary py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-foreground">{t("about.mission")}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("about.missionText")}</p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-foreground">{t("about.values")}</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-blue/10">
                    <v.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-foreground">{t("about.team")}</h2>
            <p className="mt-2 text-center text-muted-foreground">{t("about.teamSubtitle")}</p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                >
                  <div className="aspect-square overflow-hidden">
                    <img src={member.photo} alt={member.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm font-medium text-primary">{lang === "fr" ? member.role : member.roleEn}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{lang === "fr" ? member.description : member.descriptionEn}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

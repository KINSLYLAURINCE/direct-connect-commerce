import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Heart, Zap, Shield } from "lucide-react";
import { teamMembers } from "@/lib/data";
import teamImage from "@/assets/team.jpg";
import Footer from "@/components/layout/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — NexScale" },
      { name: "description", content: "Learn about NexScale's mission to deliver enterprise-grade cloud and DevOps solutions." },
      { property: "og:title", content: "About Us — NexScale" },
      { property: "og:description", content: "Learn about NexScale's mission to deliver enterprise-grade cloud and DevOps solutions." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Target, title: "Innovation First", desc: "We push boundaries with cutting-edge technology." },
  { icon: Heart, title: "Client Focused", desc: "Your success is our mission. Period." },
  { icon: Zap, title: "Speed & Scale", desc: "Built for performance at any scale." },
  { icon: Shield, title: "Security Native", desc: "Security is not an add-on, it's foundational." },
];

function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <div className="pt-24 pb-16">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Building the Future of <span className="text-gradient">Enterprise Tech</span></h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Founded in 2019, NexScale was born from a simple belief: enterprise technology should be accessible, scalable, and secure. We partner with businesses worldwide to deliver cloud infrastructure and DevOps solutions that drive real growth.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-12 overflow-hidden rounded-2xl">
            <img src={teamImage} alt="NexScale team" className="w-full object-cover" width={1200} height={800} />
          </motion.div>
        </section>

        {/* Mission */}
        <section className="mt-20 bg-secondary py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                To democratize enterprise-grade technology by making it accessible to organizations of every size, enabling them to compete in an increasingly digital world with the same tools used by industry leaders.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section ref={ref} className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-foreground">Our Values</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="card-hover rounded-xl border border-border bg-card p-6 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <v.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-secondary py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-foreground">Meet Our Team</h2>
            <p className="mt-2 text-center text-muted-foreground">The people behind NexScale</p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-hover overflow-hidden rounded-xl border border-border bg-card"
                >
                  <div className="flex h-48 items-center justify-center bg-accent text-5xl">
                    {member.name.charAt(0)}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm font-medium text-primary">{member.role}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{member.description}</p>
                    <a href={member.linkedin} className="mt-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> LinkedIn
                    </a>
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

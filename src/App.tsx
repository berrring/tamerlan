import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "./components/Scene";
import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";
import Media from "./components/Media";
import { timurContent } from "./data/timurContent";
import { smoothScrollTo, usePrefersReducedMotion, useScrollState } from "./utils/scroll";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const reducedMotion = usePrefersReducedMotion();

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroPinRef = useRef<HTMLDivElement | null>(null);
  const heroOverlayRef = useRef<HTMLDivElement | null>(null);
  const heroMediaRef = useRef<HTMLDivElement | null>(null);
  const heroEyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement | null>(null);
  const heroCtaRef = useRef<HTMLButtonElement | null>(null);

  const chapterNavItems = useMemo(
    () => timurContent.chapters.map((chapter) => ({ id: chapter.id, label: chapter.navLabel })),
    [],
  );

  const sideNavItems = useMemo(
    () => [{ id: "hero", label: "Обложка" }, ...chapterNavItems],
    [chapterNavItems],
  );

  const trackedSections = useMemo(
    () => ["hero", ...timurContent.chapters.map((chapter) => chapter.id)],
    [],
  );

  const { activeId, progress } = useScrollState(trackedSections);

  const handleNavigate = (id: string) => smoothScrollTo(id);

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const heroSection = heroSectionRef.current;
    const heroPin = heroPinRef.current;
    if (!heroSection || !heroPin) return;

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro.fromTo(
        [heroEyebrowRef.current, heroTitleRef.current, heroSubtitleRef.current, heroCtaRef.current],
        { autoAlpha: 0, y: 48, filter: "blur(10px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.75, stagger: 0.08 },
      );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: heroPin,
          anticipatePin: 1,
        },
      });

      if (heroMediaRef.current) {
        scrollTl.fromTo(
          heroMediaRef.current,
          { scale: 1.14, yPercent: -8 },
          { scale: 1, yPercent: 9, ease: "none", duration: 3 },
          0,
        );
      }

      if (heroOverlayRef.current) {
        scrollTl.fromTo(
          heroOverlayRef.current,
          { opacity: 0.82 },
          { opacity: 0.5, ease: "none", duration: 3 },
          0,
        );
      }

      scrollTl.to(
        [heroEyebrowRef.current, heroTitleRef.current, heroSubtitleRef.current, heroCtaRef.current],
        { yPercent: -14, opacity: 0.82, ease: "none", duration: 3 },
        0,
      );
    }, heroSection);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div className="app-shell">
      <TopNav
        brand={timurContent.brand}
        items={chapterNavItems}
        activeId={activeId}
        onNavigate={handleNavigate}
      />

      <SideNav items={sideNavItems} activeId={activeId} progress={progress} onNavigate={handleNavigate} />

      <main>
        <section
          id={timurContent.hero.id}
          ref={heroSectionRef}
          className={`hero ${reducedMotion ? "hero--reduced" : ""}`}
        >
          <div className="hero__pin" ref={heroPinRef}>
            <div className="hero__media" ref={heroMediaRef}>
              <Media
                media={timurContent.hero.media}
                className="hero__media-element"
                priority
                caption={timurContent.hero.mediaCaption}
                disclaimer={timurContent.hero.mediaDisclaimer}
                credit={timurContent.hero.mediaCredit}
              />
            </div>
            <div className="hero__overlay" ref={heroOverlayRef} />

            <div className="hero__content">
              <p className="hero__eyebrow" ref={heroEyebrowRef}>
                {timurContent.hero.eyebrow}
              </p>
              <h1 ref={heroTitleRef}>{timurContent.hero.title}</h1>
              <p className="hero__subtitle" ref={heroSubtitleRef}>
                {timurContent.hero.subtitle}
              </p>
              <button
                ref={heroCtaRef}
                type="button"
                className="hero__cta"
                onClick={() => handleNavigate(timurContent.chapters[0].id)}
              >
                {timurContent.hero.cta}
              </button>
            </div>
          </div>
        </section>

        {timurContent.chapters.map((chapter) => (
          <Scene key={chapter.id} chapter={chapter} reducedMotion={reducedMotion} />
        ))}
      </main>

      <footer className="footer">
        <p>
          Авторы исходного материала: <span>{timurContent.authors}</span>
        </p>
        <div className="footer__links">
          {timurContent.sources.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer noopener">
              {source.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

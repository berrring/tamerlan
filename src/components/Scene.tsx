import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Chapter } from "../data/timurContent";
import Media from "./Media";

gsap.registerPlugin(ScrollTrigger);

type SceneProps = {
  chapter: Chapter;
  reducedMotion: boolean;
};

export default function Scene({ chapter, reducedMotion }: SceneProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const mediaColRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const frameRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      const frames = frameRefs.current.filter(Boolean) as HTMLDivElement[];
      if (frames.length === 0) return;
      const heading = headingRef.current;

      gsap.set(frames, { autoAlpha: 0, y: 52, filter: "blur(10px)" });
      gsap.set(frames[0], { autoAlpha: 1, y: 0, filter: "blur(0px)" });
      if (heading) {
        gsap.set(heading, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin,
          anticipatePin: 1,
        },
      });

      if (backdropRef.current) {
        timeline.fromTo(
          backdropRef.current,
          { scale: 1.12, yPercent: -6 },
          { scale: 1, yPercent: 7, ease: "none", duration: frames.length * 1.25 },
          0,
        );
      }

      if (overlayRef.current) {
        timeline.fromTo(
          overlayRef.current,
          { opacity: 0.8 },
          { opacity: 0.48, ease: "none", duration: frames.length * 1.25 },
          0,
        );
      }

      if (mediaColRef.current) {
        timeline.fromTo(
          mediaColRef.current,
          { yPercent: 4, scale: 1.04 },
          { yPercent: -4, scale: 1, ease: "none", duration: frames.length * 1.25 },
          0,
        );
      }

      if (heading) {
        timeline.to(
          heading,
          {
            autoAlpha: 0,
            y: -40,
            filter: "blur(8px)",
            duration: 0.34,
            ease: "power2.in",
          },
          0.2,
        );
      }

      frames.forEach((frame, index) => {
        const at = index * 1.25;
        timeline.to(
          frame,
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power2.out",
          },
          at,
        );

        if (index !== frames.length - 1) {
          timeline.to(
            frame,
            {
              autoAlpha: 0,
              y: -42,
              filter: "blur(10px)",
              duration: 0.45,
              ease: "power2.in",
            },
            at + 0.88,
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [chapter, reducedMotion]);

  return (
    <section
      id={chapter.id}
      ref={sectionRef}
      className={`scene ${reducedMotion ? "scene--reduced" : ""}`}
      style={{ minHeight: `${chapter.heightVh}vh` }}
    >
      <div ref={pinRef} className={`scene__pin ${chapter.layout}`}>
        <div className="scene__backdrop" ref={backdropRef}>
          <Media media={chapter.backdrop} className="scene__backdrop-media" />
        </div>
        <div className="scene__overlay" ref={overlayRef} />

        <div className={`scene__stage ${chapter.layout}`}>
          <div className="scene__frames">
            <div className="scene__heading" ref={headingRef}>
              <p className="scene__chapter-title">{chapter.title}</p>
              {chapter.subtitle ? <p className="scene__subtitle">{chapter.subtitle}</p> : null}
            </div>
            {chapter.frames.map((frame, index) => (
              <div
                key={`${chapter.id}-${frame.title}`}
                ref={(element) => {
                  frameRefs.current[index] = element;
                }}
                className="scene__frame"
              >
                <h2>{frame.title}</h2>
                {frame.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {frame.quote ? <blockquote>{frame.quote}</blockquote> : null}
              </div>
            ))}
          </div>

          <div className="scene__media-col" ref={mediaColRef}>
            <Media
              media={chapter.sideMedia}
              className="scene__media"
              caption={chapter.mediaCaption}
              disclaimer={chapter.mediaDisclaimer}
              credit={chapter.mediaCredit}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

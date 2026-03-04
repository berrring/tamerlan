import { useEffect, useRef, useState } from "react";
import type { MediaAsset } from "../data/timurContent";

type MediaProps = {
  media: MediaAsset;
  className?: string;
  priority?: boolean;
  caption?: string;
  disclaimer?: string;
  credit?: string;
};

export default function Media({
  media,
  className = "",
  priority = false,
  caption,
  disclaimer,
  credit,
}: MediaProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(priority);
  const [loaded, setLoaded] = useState(false);
  const hasMeta = Boolean(caption || disclaimer || credit);
  const isCreditUrl = Boolean(credit && /^https?:\/\//i.test(credit));

  useEffect(() => {
    if (priority) return;
    const element = wrapperRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      ref={wrapperRef}
      className={`media ${loaded ? "is-loaded" : ""} ${hasMeta ? "media--with-meta" : ""} ${className}`}
      aria-label={media.alt}
      role="img"
    >
      <div className="media__skeleton" aria-hidden="true" />

      {inView && media.type === "image" ? (
        <img
          src={media.src}
          alt={media.alt}
          className="media__img"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setLoaded(true)}
        />
      ) : null}

      {inView && media.type === "video" ? (
        <video
          className="media__video"
          src={media.src}
          poster={media.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={() => setLoaded(true)}
          aria-label={media.alt}
        />
      ) : null}

      {hasMeta ? (
        <figcaption className="media__meta">
          {caption ? <p className="media__caption">{caption}</p> : null}
          {disclaimer ? <p className="media__disclaimer">{disclaimer}</p> : null}
          {credit ? (
            isCreditUrl ? (
              <a href={credit} target="_blank" rel="noreferrer noopener" className="media__credit">
                Источник
              </a>
            ) : (
              <p className="media__credit">{credit}</p>
            )
          ) : null}
        </figcaption>
      ) : null}
    </div>
  );
}


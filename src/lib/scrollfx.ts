/**
 * Scrollanimationer utan bibliotek.
 *  - sätter --sy (scrollposition) och --p (0–1 genom sidan) på <html>
 *  - [data-reveal] får klassen "in" när elementet kommer in i bild
 *  - [data-reveal="words"] delas upp i ord som glider in ett och ett
 *  - [data-stagger] ger barnen --i så att de trappas in rad för rad
 *  - [data-par] får --py (-1…1) beroende på var i fönstret elementet är
 * Körs inte alls vid reducerad rörelse, då är allt innehåll synligt direkt.
 */
export function initScrollFx(): () => void {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const root = document.documentElement;
  root.classList.add("fx");

  // Dela upp rubriker i ord
  document.querySelectorAll<HTMLElement>('[data-reveal="words"]').forEach((el) => {
    if (el.dataset.split) return;
    el.dataset.split = "1";
    const label = el.textContent ?? "";
    el.setAttribute("aria-label", label);
    const words = label.trim().split(/\s+/);
    el.textContent = "";
    words.forEach((w, i) => {
      const outer = document.createElement("span");
      outer.className = "rw";
      outer.setAttribute("aria-hidden", "true");
      const inner = document.createElement("span");
      inner.style.setProperty("--i", String(i));
      inner.textContent = w;
      outer.appendChild(inner);
      el.appendChild(outer);
      el.appendChild(document.createTextNode(" "));
    });
  });

  // Trappa in barn rad för rad
  const stagger = () => {
    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((box) => {
      let row = -1, i = 0;
      Array.from(box.children).forEach((c) => {
        const top = Math.round((c as HTMLElement).offsetTop / 40);
        if (top !== row) { row = top; i = 0; }
        (c as HTMLElement).style.setProperty("--i", String(i++));
      });
    });
  };
  stagger();
  addEventListener("resize", stagger);

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

  const pars = Array.from(document.querySelectorAll<HTMLElement>("[data-par]"));
  let raf = 0;
  const frame = () => {
    raf = 0;
    const y = scrollY, vh = innerHeight;
    const max = Math.max(1, root.scrollHeight - vh);
    root.style.setProperty("--sy", y.toFixed(1));
    root.style.setProperty("--p", Math.min(1, y / max).toFixed(4));
    for (const el of pars) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      const py = ((r.top + r.height / 2) - vh / 2) / (vh / 2 + r.height / 2);
      el.style.setProperty("--py", Math.max(-1, Math.min(1, py)).toFixed(3));
    }
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(frame); };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  frame();

  return () => {
    io.disconnect();
    removeEventListener("scroll", onScroll);
    removeEventListener("resize", onScroll);
    removeEventListener("resize", stagger);
    cancelAnimationFrame(raf);
    root.classList.remove("fx");
  };
}

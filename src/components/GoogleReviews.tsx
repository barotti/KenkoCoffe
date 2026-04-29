"use client";

import Script from "next/script";

export function GoogleReviews() {
  return (
    <section className="google-reviews">
      <div className="google-reviews__header" data-reveal>
        <p className="eyebrow">Recensioni</p>
        <h2>Cosa dicono di noi</h2>
      </div>
      <div className="google-reviews__widget" data-reveal>
        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
        <div
          className="elfsight-app-a4eda126-b1f6-43de-b125-defdf97f4cbf"
          data-elfsight-app-lazy
        />
      </div>
    </section>
  );
}

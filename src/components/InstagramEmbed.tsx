type InstagramEmbedProps = {
  permalink: string;
};

export function InstagramEmbed({ permalink }: InstagramEmbedProps) {
  const embedUrl = `${permalink.replace(/\/?$/, "/")}embed`;

  return (
    <div className="instagram-embed" data-reveal>
      <div className="instagram-embed__crop">
        <iframe
          src={embedUrl}
          title="Video Instagram Kenko Coffee"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  );
}

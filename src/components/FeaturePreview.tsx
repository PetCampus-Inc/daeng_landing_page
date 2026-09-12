import Image from 'next/image';

interface FeaturePreviewProps {
  src: string;
  alt: string;
  tag: string;
  index: number;
  total: number;
}

export function FeaturePreview({ src, alt, tag, index, total }: FeaturePreviewProps) {
  return (
    <article className="flex w-[min(90vw,110rem)] shrink-0 snap-start flex-col items-center justify-center gap-4 py-10 max-md:w-[min(86vw,38rem)] max-md:py-0">
      <p className="text-14 font-semibold tracking-wide text-foreground-muted">
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} · {tag}
      </p>
      <div className="relative aspect-[1242/2688] h-[min(76vh,76rem)] max-w-full overflow-hidden rounded-[2.8rem] border border-border-accent bg-white shadow-card max-md:h-auto max-md:w-full max-md:rounded-2xl">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 767px) 86vw, 36rem"
          className="object-contain"
        />
      </div>
    </article>
  );
}

export function GalleryIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="4.5" y="4.5" width="15" height="15" rx="1" fill="#C8A584" />
      <rect x="5.75" y="5.75" width="12.5" height="10" rx="1" fill="#E4CAB1" />
      <path
        d="M9.99418 11.5058L7.45711 14.0429C6.82714 14.6729 7.27331 15.75 8.16421 15.75H12.9212C13.7804 15.75 14.2396 14.7381 13.6738 14.0915L11.4539 11.5544C11.0729 11.1191 10.4032 11.0968 9.99418 11.5058Z"
        fill="white"
      />
      <path
        d="M14.0188 12.6855L12.5948 14.0205C11.9335 14.6405 12.3722 15.75 13.2788 15.75H15.9488C16.8232 15.75 17.2764 14.7069 16.6798 14.0677L15.4338 12.7327C15.0564 12.3283 14.4224 12.3071 14.0188 12.6855Z"
        fill="white"
      />
      <circle cx="15.75" cy="8.25" r="1.25" fill="white" />
    </svg>
  );
}

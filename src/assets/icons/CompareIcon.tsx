export function CompareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="4" y="4" width="16" height="16" rx="2" fill="#EEE3D9" />
      <rect x="6" y="12" width="3" height="6" rx="1" fill="#956F4C" />
      <rect x="10.5" y="9" width="3" height="9" rx="1" fill="#C8A584" />
      <rect x="15" y="6" width="3" height="12" rx="1" fill="#956F4C" />
      <circle cx="7.5" cy="10" r="1.5" fill="#C8A584" />
      <circle cx="12" cy="7" r="1.5" fill="#956F4C" />
      <circle cx="16.5" cy="4.5" r="1.5" fill="#C8A584" />
      <path
        d="M7.5 10L12 7L16.5 4.5"
        stroke="#525252"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

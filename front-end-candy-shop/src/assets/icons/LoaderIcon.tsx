
type Props = {
  className?: string;
}
function LoaderIcon({className}: Props) {
  return (
    <svg width="300" height="200" className={className} viewBox="0 0 187.3 93.7">
      <defs>
        <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="pink"></stop>
          <stop offset="100%" stopColor="#00f"></stop>
        </linearGradient>
      </defs>
      <path
        stroke="url(#gradient)"
        d="M93.9 46.4c9.3 9.5 13.8 17.9 23.5 17.9s17.5-7.8 17.5-17.5-7.8-17.6-17.5-17.5c-9.7.1-13.3 7.2-22.1 17.1-8.9 8.8-15.7 17.9-25.4 17.9s-17.5-7.8-17.5-17.5 7.8-17.5 17.5-17.5 16.3 9.3 24 17.1z"
      ></path>
    </svg>
  );
}

export default LoaderIcon;

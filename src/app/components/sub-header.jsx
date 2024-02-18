export default function SubHeader(params) {
  return (
    <ul className="menu lg:menu-horizontal w-full rounded-none bg-slate-900 text-white p-0 space-x-0">
      <li>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Home
          <span className="badge badge-sm">99+</span>
        </a>
      </li>
      <li>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          In-Play
        </a>
      </li>
      <li>
        <a>
          Cricket
          <span className="badge badge-xs badge-info"></span>
        </a>
      </li>
      <li>
        <a>Football</a>
      </li>
      <li>
        <a>Tennis</a>
      </li>
      <li>
        <a className="animate-ping absolute">Casino</a>
        <a>Casino</a>
      </li>
      <li>
        <a>Horse Racing</a>
      </li>
      <li>
        <a>Greyhound Racing</a>
      </li>
      <li>
        <a>Kabaddi</a>
      </li>
      <li>
        <a>Politics</a>
      </li>
      <li>
        <a>Sports Book</a>
      </li>
      <li>
        <a>Int Casino</a>
      </li>
      <li>
        <a>
          Binary
          <span className="badge badge-sm badge-warning">NEW</span>
        </a>
      </li>
    </ul>
  );
}

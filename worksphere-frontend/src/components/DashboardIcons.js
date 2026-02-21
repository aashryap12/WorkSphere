import React from 'react';

const Icon = ({ name, className }) => {
  const props = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };

  switch (name) {
    case 'overview':
      return (
        <svg {...props}>
          <path d="M3 12h8V3H3z" />
          <path d="M13 21h8v-8h-8z" />
          <path d="M13 3h8v6h-8z" />
          <path d="M3 14h8v7H3z" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 11h18" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case 'wallet':
      return (
        <svg {...props}>
          <path d="M4 7h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4z" />
          <path d="M16 7V5a2 2 0 0 0-2-2H6" />
          <path d="M20 12h-5a1.5 1.5 0 0 0 0 3h5" />
        </svg>
      );
    case 'file':
      return (
        <svg {...props}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
        </svg>
      );
    case 'user':
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );
    case 'users':
      return (
        <svg {...props}>
          <circle cx="8" cy="9" r="3" />
          <circle cx="17" cy="10" r="3" />
          <path d="M2 20a6 6 0 0 1 12 0" />
          <path d="M14 20a5 5 0 0 1 8 0" />
        </svg>
      );
    case 'check':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l2.5 2.5L16 9" />
        </svg>
      );
    case 'chart':
      return (
        <svg {...props}>
          <path d="M3 20h18" />
          <path d="M7 16V9" />
          <path d="M12 16V5" />
          <path d="M17 16v-7" />
        </svg>
      );
    case 'trend':
      return (
        <svg {...props}>
          <path d="M3 17l6-6 4 4 7-7" />
          <path d="M14 8h6v6" />
        </svg>
      );
    case 'report':
      return (
        <svg {...props}>
          <path d="M4 4h16v16H4z" />
          <path d="M8 16v-4M12 16v-7M16 16v-2" />
        </svg>
      );
    case 'eye':
      return (
        <svg {...props}>
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'close':
      return (
        <svg {...props}>
          <path d="M6 6l12 12M18 6l-12 12" />
        </svg>
      );
    case 'inbox':
      return (
        <svg {...props}>
          <path d="M4 4h16v10l-4 4H8l-4-4z" />
          <path d="M8 14h8" />
        </svg>
      );
    case 'bell':
      return (
        <svg {...props}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
          <path d="M13.7 21a2 2 0 0 1-3.4 0" />
        </svg>
      );
    case 'plus':
      return (
        <svg {...props}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'search':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      );
    case 'briefcase':
      return (
        <svg {...props}>
          <rect x="3" y="7" width="18" height="12" rx="2" />
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18" />
        </svg>
      );
    case 'spark':
      return (
        <svg {...props}>
          <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z" />
        </svg>
      );
    case 'heart':
      return (
        <svg {...props}>
          <path d="M20 8.5c0 4.2-8 9.5-8 9.5s-8-5.3-8-9.5a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 8.5z" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...props}>
          <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6z" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...props}>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      );
    case 'link':
      return (
        <svg {...props}>
          <path d="M10 13a5 5 0 0 1 0-7l2-2a5 5 0 0 1 7 7l-1 1" />
          <path d="M14 11a5 5 0 0 1 0 7l-2 2a5 5 0 0 1-7-7l1-1" />
        </svg>
      );
    case 'log':
      return (
        <svg {...props}>
          <path d="M4 4h16v16H4z" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      );
    case 'database':
      return (
        <svg {...props}>
          <ellipse cx="12" cy="5" rx="7" ry="3" />
          <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
          <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </svg>
      );
    case 'alert':
      return (
        <svg {...props}>
          <path d="M12 3l9 16H3z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      );
    case 'info':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      );
    case 'success':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l2.5 2.5L16 9" />
        </svg>
      );
    case 'lightning':
      return (
        <svg {...props}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case 'mobile':
      return (
        <svg {...props}>
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      );
    case 'handshake':
      return (
        <svg {...props}>
          <path d="M17 14a3 3 0 0 0 3-3v-4h-4a3 3 0 0 0-3 3v4" />
          <path d="M7 14a3 3 0 0 1-3-3V7h4a3 3 0 0 1 3 3v4" />
          <path d="M7 14l-2 2a1 1 0 0 1-1.4-1.4l2-2" />
          <path d="M17 14l2 2a1 1 0 0 0 1.4-1.4l-2-2" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...props}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case 'book':
      return (
        <svg {...props}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 14.5" />
          <path d="M6 5h3M6 8h3" />
        </svg>
      );
    case 'wrench':
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'rocket':
      return (
        <svg {...props}>
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          <circle cx="11" cy="11" r="1" />
        </svg>
      );
    case 'store':
      return (
        <svg {...props}>
          <path d="M3 9l1.35 16.64a2 2 0 0 0 2 1.84h12.3a2 2 0 0 0 2-1.84L21 9" />
          <path d="M2 3h20v6H2z" />
          <path d="M13 5V3M11 5V3" />
        </svg>
      );
    case 'hospital':
      return (
        <svg {...props}>
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
          <path d="M11 8h2M11 14h2M9 12h6v2h-6z" />
        </svg>
      );
    case 'pizza':
      return (
        <svg {...props}>
          <path d="M12 2L2 14c.5 2.5 2 5 5 6.5 3-1.5 4.5-4 5-6.5 1.5 1.5 3.5 3.5 7 4.5-1-3-2-6-2-8-3-3-5-8-5-8z" />
          <circle cx="12" cy="8" r="1" />
        </svg>
      );
    case 'box':
      return (
        <svg {...props}>
          <path d="M21 21H3c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h18c1.1 0 2 .9 2 2v14c0 1.1-1 2-2 2zm-3-13h-2.5l-2.54-3.2c-.3-.4-.8-.8-1.46-.8-.67 0-1.15.4-1.46.8L9.5 8H7" />
        </svg>
      );
    case 'factory':
      return (
        <svg {...props}>
          <path d="M4 21V9m7-6v18m7-18v18m7-18v12" />
          <path d="M4 9h16V3H4z" />
        </svg>
      );
    case 'theater':
      return (
        <svg {...props}>
          <circle cx="6" cy="11" r="3" />
          <circle cx="18" cy="11" r="3" />
          <path d="M2 20h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2H2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2zm6-2l4-5 4 5m-4-13l1.41 3h3.18l-2.59 1.88 1 3.08L12 12l-2.59 1.88 1-3.08L7.82 11h3.18" />
        </svg>
      );
    case 'clipboard':
      return (
        <svg {...props}>
          <path d="M16 4h-2V2h-4v2H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
          <path d="M9 9h6M9 13h6" />
        </svg>
      );
    case 'document':
      return (
        <svg {...props}>
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <path d="M13 2v7h7" />
          <path d="M8 16h8M8 12h8" />
        </svg>
      );
    case 'graduation':
      return (
        <svg {...props}>
          <path d="M22 10v6h0a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6h0V9.5a1 1 0 0 1 .33-.82l7-5.64a1 1 0 0 1 1.34 0l7 5.64A1 1 0 0 1 22 9.5" />
          <path d="M12 14v4" />
        </svg>
      );
    case 'chat':
      return (
        <svg {...props}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
};

export default Icon;

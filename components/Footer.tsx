import React from 'react';

interface FooterProps {
  route: string;
}

const Footer: React.FC<FooterProps> = ({ route }) => {
  const isPrivacyPage = route.startsWith('#/privacy-policy');
  const isFrameGenerator = route.startsWith('#/tools/frame-generator');
  
  const linkHref = isPrivacyPage ? '#/' : '#/privacy-policy';
  const linkText = isPrivacyPage ? 'Home' : 'Privacy Policy';
  const textClass = isFrameGenerator ? 'text-xs' : 'text-sm';
  const spacingClass = isFrameGenerator ? 'mt-8' : 'py-8';

  return (
    <footer className={`text-center text-slate-500 px-4 ${spacingClass}`}>
      <div className="flex justify-center items-center space-x-4">
        <p className={textClass}>BoostedIn &copy; 2025</p>
        <span aria-hidden="true">&middot;</span>
        <a href={linkHref} className={`${textClass} hover:text-indigo-400 transition-colors`}>{linkText}</a>
      </div>
    </footer>
  );
};

export default Footer;

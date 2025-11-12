import React from 'react';
import Logo from './Logo';
import Footer from './Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <a href="#/" className="flex items-center" aria-label="Back to BoostedIn Home Page">
            <Logo />
            <span className="ml-3 text-2xl font-bold text-white">
              Boosted<span className="text-indigo-400">In</span>
            </span>
          </a>
           <a href="#/" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
              Back to Home
          </a>
        </nav>
      </header>

      <main className="flex-grow w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        <div className="prose prose-invert prose-lg text-slate-300 mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy for BoostedIn</h1>
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2 className="text-2xl font-semibold text-white mt-8">Introduction</h2>
          <p>Welcome to BoostedIn ("we", "our", "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web application.</p>

          <h2 className="text-2xl font-semibold text-white mt-8">Information We Collect</h2>
          <p>When you choose to sign in with LinkedIn, we collect the following personal information from your LinkedIn account:</p>
          <ul>
            <li><strong>Full Name:</strong> To personalize your experience within the application.</li>
            <li><strong>Profile Picture URL:</strong> To display your profile picture within the application interface.</li>
            <li><strong>Email Address:</strong> To uniquely identify your account and for essential communication.</li>
          </ul>
          <p>We do not collect your password or any other personal data from your LinkedIn profile beyond what is listed above.</p>

          <h2 className="text-2xl font-semibold text-white mt-8">How We Use Your Information</h2>
          <p>We use the information we collect solely for the following purposes:</p>
          <ul>
            <li>To provide and operate the core functionalities of the BoostedIn application, such as displaying your name and profile picture after you log in.</li>
            <li>To enhance and personalize your user experience.</li>
            <li>To communicate with you regarding your account or our services, if necessary.</li>
          </ul>
          <p>We do not sell, trade, rent, or otherwise transfer your personally identifiable information to outside parties.</p>

          <h2 className="text-2xl font-semibold text-white mt-8">Data Storage and Security</h2>
          <p>Authentication is handled by Supabase, a secure third-party service. When you sign in, Supabase provides us with an access token that allows us to retrieve your name, email, and profile picture. We do not store this information on our own servers. Your session information is managed securely by Supabase.</p>
          <p>Any settings you save within the application, such as frame customizations, are stored locally in your browser's localStorage and are not transmitted to our servers.</p>
          
          <h2 className="text-2xl font-semibold text-white mt-8">Data Sharing and Disclosure</h2>
          <p>We do not share your personal information with any third parties, except as required by law.</p>

          <h2 className="text-2xl font-semibold text-white mt-8">Your Rights and Data Deletion</h2>
          <p>Since we do not store your personal data on our servers, there is no data to delete from our systems. To disconnect your LinkedIn account from our application, you can manage your permissions within your LinkedIn account settings. Logging out of our application will clear your session.</p>

          <h2 className="text-2xl font-semibold text-white mt-8">Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

          <h2 className="text-2xl font-semibold text-white mt-8">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@boostedin.pro" className="text-indigo-400 hover:underline">privacy@boostedin.pro</a>.</p>
        </div>
      </main>

      <Footer route="#/privacy-policy" />
    </div>
  );
};

export default PrivacyPolicy;
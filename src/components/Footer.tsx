import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="tracking-wide px-10 pt-12 pb-6 bg-secondary">
      <div className="flex flex-wrap justify-between gap-10">
        {/* Logo and Description */}
        <div className="max-w-md text-right">
          <Link href="/" className="inline-block">
            <h2 className="text-main text-2xl font-bold flex items-center gap-2">
              <span>أخصائي</span>
              <span>❤️</span>
            </h2>
          </Link>
          <div className="mt-6">
            <p className="text-slate-600 leading-relaxed text-sm">
              منصة أخصائي معك في كل خطوة نحو صحة أفضل، ونسعد دائمًا بتواصلك معنا
            </p>
          </div>
          {/* Social Media Links */}
          <ul className="mt-10 flex gap-4 ">
            <li>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 bg-main rounded-full flex items-center justify-center transform hover:scale-110 hover:bg-blue-600 transition-all duration-300 ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                </svg>
              </Link>
            </li>
            <li>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-main rounded-full flex items-center justify-center transform hover:scale-110 hover:bg-sky-500 transition-all duration-300 ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                </svg>
              </Link>
            </li>
            <li>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-main rounded-full flex items-center justify-center transform hover:scale-110 hover:bg-pink-600 transition-all duration-300 ease-in-out">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Navigation */}
        <div className="text-right">
          <h3 className="text-gray-900 font-semibold mb-4">القائمة الرئيسية</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-600 hover:text-main">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-600 hover:text-main">
                من نحن
              </Link>
            </li>
            <li>
              <Link href="/doctors" className="text-gray-600 hover:text-main">
                الأطباء
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="text-right">
          <h3 className="text-gray-900 font-semibold mb-4">تواصل معنا</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/contact" className="text-gray-600 hover:text-main">
                استشارة طبية
              </Link>
            </li>
            <li>
              <Link href="/help" className="text-gray-600 hover:text-main">
                مركز المساعدة
              </Link>
            </li>
          </ul>
        </div>

        {/* Important Information */}
        <div className="text-right">
          <h3 className="text-gray-900 font-semibold mb-4">معلومات تهمك</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy" className="text-gray-600 hover:text-main">
                الخصوصية والأمان
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-gray-600 hover:text-main">
                سياسة الاستخدام
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      <div className="text-center">
        <p className="text-slate-600 text-sm">
          © أخصائي 2024. جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
};

export default Footer;

'use client'
import React from "react";
import { Mail, Lock, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";

const Login = () => {
  const t = useTranslations('Login');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {t('title')}
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t('email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-main" />
              <input
                type="email"
                id="email"
                className="w-full pl-10 px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                placeholder={t('email')}
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {t('password')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-main" />
              <input
                type="password"
                id="password"
                className="w-full pl-10 px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                placeholder={t('password')}
              />
              <EyeOff className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-main rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2"
          >
            {t('btnText')}
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-main hover:underline">
            {t('forgotPassword')}
          </a>
        </div>
        <div className="mt-2 text-center">
          <a href="#" className="text-sm text-main hover:underline">
            {t('noAccount')} {t('signup')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

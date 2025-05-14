"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

// Define types for our form data and errors
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  twofa: string;
  enableTwoFa: boolean;
  agreeToTerms: boolean;
}

interface FormErrors {
  email: string;
  password: string;
  confirmPassword: string;
  twofa: string;
  agreeToTerms: string;
}

interface PasswordStrength {
  score: number;
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export default function Join() {
  const { data: session } = useSession();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    twofa: '',
    enableTwoFa: false,
    agreeToTerms: false
  });

  // Error state
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
    confirmPassword: '',
    twofa: '',
    agreeToTerms: ''
  });

  // Loading states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSendingCode, setIsSendingCode] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>('');

  // Verification code state
  const [codeStatus, setCodeStatus] = useState<'not_sent' | 'sending' | 'sent' | 'verified'>('not_sent');

  // Success state
  const [isVerified, setIsVerified] = useState<boolean>(false);

  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate password strength
  useEffect(() => {
    if (formData.password) {
      const strength = {
        score: 0,
        hasMinLength: formData.password.length >= 8,
        hasUppercase: /[A-Z]/.test(formData.password),
        hasLowercase: /[a-z]/.test(formData.password),
        hasNumber: /[0-9]/.test(formData.password),
        hasSpecialChar: /[^A-Za-z0-9]/.test(formData.password)
      };

      // Calculate score (1 point for each criteria met)
      strength.score = [
        strength.hasMinLength,
        strength.hasUppercase,
        strength.hasLowercase,
        strength.hasNumber,
        strength.hasSpecialChar
      ].filter(Boolean).length;

      setPasswordStrength(strength);
    } else {
      setPasswordStrength({
        score: 0,
        hasMinLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false
      });
    }
  }, [formData.password]);

  // Validate form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (passwordStrength.score < 3) {
      newErrors.password = 'Password is too weak';
      isValid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // 2FA validation (only if enabled)
    if (formData.enableTwoFa && !formData.twofa) {
      newErrors.twofa = '2FA code is required when 2FA is enabled';
      isValid = false;
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service and Privacy Policy';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle sending verification code
  const handleSendVerificationCode = async () => {
    // Validate email first
    if (!formData.email) {
      setErrors(prev => ({
        ...prev,
        email: 'Email is required to send verification code'
      }));
      return;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors(prev => ({
        ...prev,
        email: 'Please enter a valid email address'
      }));
      return;
    }

    setIsSendingCode(true);
    setCodeStatus('sending');

    try {
      // Call the API to send verification code
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, type: 'email' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send verification code');
      }

      setCodeStatus('sent');

      // In development, show the code (remove in production)
      if (data.code) {
        alert(`Verification code: ${data.code}\n\nIn a production environment, this would be sent via email.`);
      } else {
        alert(`Verification code sent to ${formData.email}. Please check your inbox and enter the code.`);
      }
    } catch (error: any) {
      console.error('Error sending verification code:', error);
      alert(error.message || 'Failed to send verification code. Please try again.');
      setCodeStatus('not_sent');
    } finally {
      setIsSendingCode(false);
    }
  };

  // Handle social signup
  const handleSocialSignup = async (provider: string) => {
    setIsLoading(true);
    setServerError('');
    try {
      // Using signIn with redirect: true to handle the OAuth flow
      // The callbackUrl is where the user will be redirected after successful authentication
      await signIn(provider, {
        callbackUrl: '/',
        redirect: true
      });
      // Note: The code below won't execute as the page will redirect
    } catch (error: any) {
      console.error(`${provider} signup error:`, error);
      setServerError(`Failed to sign up with ${provider}. Please try again or use email/password.`);
      setIsLoading(false);
    }
  };

  // Handle verification code submission
  const handleVerifyCode = async () => {
    if (!formData.twofa) {
      setErrors(prev => ({
        ...prev,
        twofa: 'Please enter the verification code'
      }));
      return;
    }

    try {
      // Call the API to verify the code
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          code: formData.twofa,
          type: 'email'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      setIsVerified(true);
      setCodeStatus('verified');
      alert('Email verified successfully!');
    } catch (error: any) {
      console.error('Verification error:', error);
      setErrors(prev => ({
        ...prev,
        twofa: error.message || 'Invalid verification code'
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // If 2FA is enabled but not verified, show error
    if (formData.enableTwoFa && codeStatus !== 'verified') {
      setErrors(prev => ({
        ...prev,
        twofa: 'Please verify your email with the code first'
      }));
      return;
    }

    setIsLoading(true);

    try {
      // Register the user
      const registerResponse = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.email.split('@')[0],
        }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        throw new Error(registerData.error || 'Registration failed');
      }

      // Sign in the user
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Redirect to home page or dashboard
      alert('Registration successful! Welcome to PromptCraft.');
      router.push('/');
    } catch (error: any) {
      console.error('Registration error:', error);
      alert(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Get password strength color
  const getPasswordStrengthColor = () => {
    if (passwordStrength.score === 0) return 'bg-gray-700';
    if (passwordStrength.score < 2) return 'bg-red-500';
    if (passwordStrength.score < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Get password strength text
  const getPasswordStrengthText = () => {
    if (!formData.password) return '';
    if (passwordStrength.score < 2) return 'Weak';
    if (passwordStrength.score < 4) return 'Medium';
    return 'Strong';
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Join PromptCraft</h1>
        <p className="text-lg text-gray-300 mb-8 max-w-xl text-center">Create your account to access premium prompts, save favorites, and join our creative community.</p>
        <div className="w-full max-w-md bg-gray-800/60 rounded-xl p-8 border border-gray-700 shadow-lg">
          <button
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition mb-4"
            onClick={() => handleSocialSignup('google')}
            disabled={isLoading}
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
            Join with Google
          </button>
          <button
            className="w-full flex items-center justify-center gap-3 bg-gray-900 border border-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-800 transition"
            onClick={() => handleSocialSignup('github')}
            disabled={isLoading}
          >
            <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="w-6 h-6" />
            Join with GitHub
          </button>
          <div className="my-4 border-t border-gray-700"></div>
          {serverError && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-4">
              {serverError}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg bg-gray-900 border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="you@example.com"
                disabled={isLoading}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg bg-gray-900 border ${errors.password ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Create a password"
                disabled={isLoading}
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}

              {/* Password strength indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Password strength:</span>
                    <span className="text-xs font-medium" style={{ color: getPasswordStrengthColor() }}>{getPasswordStrengthText()}</span>
                  </div>
                  <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    ></div>
                  </div>

                  {/* Password requirements */}
                  <ul className="mt-2 space-y-1 text-xs">
                    <li className={`flex items-center ${passwordStrength.hasMinLength ? 'text-green-500' : 'text-gray-400'}`}>
                      <span className="mr-1">{passwordStrength.hasMinLength ? '✓' : '○'}</span> At least 8 characters
                    </li>
                    <li className={`flex items-center ${passwordStrength.hasUppercase ? 'text-green-500' : 'text-gray-400'}`}>
                      <span className="mr-1">{passwordStrength.hasUppercase ? '✓' : '○'}</span> At least one uppercase letter
                    </li>
                    <li className={`flex items-center ${passwordStrength.hasLowercase ? 'text-green-500' : 'text-gray-400'}`}>
                      <span className="mr-1">{passwordStrength.hasLowercase ? '✓' : '○'}</span> At least one lowercase letter
                    </li>
                    <li className={`flex items-center ${passwordStrength.hasNumber ? 'text-green-500' : 'text-gray-400'}`}>
                      <span className="mr-1">{passwordStrength.hasNumber ? '✓' : '○'}</span> At least one number
                    </li>
                    <li className={`flex items-center ${passwordStrength.hasSpecialChar ? 'text-green-500' : 'text-gray-400'}`}>
                      <span className="mr-1">{passwordStrength.hasSpecialChar ? '✓' : '○'}</span> At least one special character
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg bg-gray-900 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Confirm your password"
                disabled={isLoading}
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>

            {/* 2FA Toggle */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableTwoFa"
                name="enableTwoFa"
                checked={formData.enableTwoFa}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded"
                disabled={isLoading}
              />
              <label htmlFor="enableTwoFa" className="ml-2 block text-sm text-gray-300">
                Enable Two-Factor Authentication (Recommended)
              </label>
            </div>

            {/* Conditional 2FA input */}
            {formData.enableTwoFa && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="twofa" className="block text-sm font-medium text-gray-300">2FA Code</label>
                  <div className="text-xs text-gray-400">
                    {codeStatus === 'sent' && <span className="text-green-500">✓ Code sent</span>}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <div className="flex-grow">
                    <input
                      type="text"
                      id="twofa"
                      name="twofa"
                      value={formData.twofa}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg bg-gray-900 border ${errors.twofa ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:ring-2 focus:ring-pink-500`}
                      placeholder="Enter 2FA code"
                      disabled={isLoading || codeStatus === 'not_sent' || codeStatus === 'sending'}
                    />
                  </div>
                  {codeStatus !== 'verified' ? (
                    <button
                      type="button"
                      onClick={handleSendVerificationCode}
                      disabled={isLoading || isSendingCode}
                      className={`px-4 py-2 rounded-lg text-white text-sm font-medium ${codeStatus === 'sent' ? 'bg-green-600 hover:bg-green-700' : 'bg-pink-600 hover:bg-pink-700'} transition flex items-center justify-center ${(isLoading || isSendingCode) ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSendingCode ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : codeStatus === 'sent' ? 'Resend Code' : 'Send Code'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={true}
                      className="px-4 py-2 rounded-lg text-white text-sm font-medium bg-green-600 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Verified
                    </button>
                  )}
                </div>

                {errors.twofa && <p className="mt-1 text-xs text-red-500">{errors.twofa}</p>}
                <div className="text-xs text-gray-400 mt-2">
                  {codeStatus === 'verified'
                    ? 'Email verified successfully!'
                    : codeStatus === 'sent'
                      ? 'Please enter the verification code sent to your email.'
                      : 'Click "Send Code" to receive a verification code via email.'}
                </div>

                {codeStatus === 'sent' && !isVerified && (
                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={isLoading || !formData.twofa}
                    className="mt-2 w-full px-4 py-2 rounded-lg text-white text-sm font-medium bg-purple-600 hover:bg-purple-700 transition flex items-center justify-center"
                  >
                    Verify Code
                  </button>
                )}
              </div>
            )}

            {/* Terms and Privacy Policy agreement */}
            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded"
                  disabled={isLoading}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className="text-gray-300">
                  I agree to the <Link href="/terms-of-service" className="text-purple-400 hover:text-purple-300">Terms of Service</Link> and <Link href="/privacy-policy" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link>
                </label>
                {errors.agreeToTerms && <p className="mt-1 text-xs text-red-500">{errors.agreeToTerms}</p>}
              </div>
            </div>

            <button
              type="submit"
              className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : 'Join Now'}
            </button>

            <div className="text-center mt-4 text-sm text-gray-400">
              Already have an account? <Link href="/login" className="text-purple-400 hover:text-purple-300">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
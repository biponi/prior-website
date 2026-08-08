"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, CheckCircle, XCircle } from "lucide-react";
import Swal from "sweetalert2";

import { useAuth, RegisterData } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isValidBangladeshiPhoneNumber } from "@/utils/content";

const RegisterPage = () => {
  const { register, authState } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  });

  const validatePasswordStrength = (password: string) => {
    let score = 0;
    let feedback = "";

    if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 0:
      case 1:
        feedback = "Very weak";
        break;
      case 2:
        feedback = "Weak";
        break;
      case 3:
        feedback = "Medium";
        break;
      case 4:
        feedback = "Strong";
        break;
      case 5:
        feedback = "Very strong";
        break;
    }

    return { score, feedback };
  };

  const getPasswordStrengthColor = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-blue-500";
      case 5:
        return "bg-green-500";
      default:
        return "bg-gray-200";
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!isValidBangladeshiPhoneNumber(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid Bangladeshi mobile number";
    }

    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof RegisterData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "password" && typeof value === "string") {
      setPasswordStrength(validatePasswordStrength(value));
    }

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await register(formData);

      if (response.success) {
        Swal.fire({
          title: "Registration Successful!",
          text: "Welcome to Luxury Online Mart! Your account has been created successfully.",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });

        router.push("/account");
      } else {
        Swal.fire({
          title: "Registration Failed",
          text: response.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FDF5F8] to-white py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-bold text-neutral-900 tracking-tight'>
            Create your account
          </h2>
          <p className='mt-2 text-sm text-neutral-600'>
            Or{" "}
            <Link
              href='/login'
              className='font-medium text-[#CD2A75] hover:text-[#B02462] transition-colors underline underline-offset-4'>
              sign in to your existing account
            </Link>
          </p>
        </div>

        <Card className='rounded-xl border-neutral-200 shadow-lg shadow-neutral-200/50'>
          <CardHeader className='border-b border-neutral-100 pb-5'>
            <CardTitle className='text-lg font-semibold text-neutral-900 tracking-tight'>
              Join Luxury Online Mart Today
            </CardTitle>
            <CardDescription className='text-sm text-neutral-500'>
              Create an account to start shopping and track your orders
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className='space-y-4 pt-6'>
              <div className='space-y-2'>
                <Label
                  htmlFor='name'
                  className='text-sm font-medium text-neutral-700'>
                  Full Name <span className='text-[#CD2A75]'>*</span>
                </Label>
                <Input
                  id='name'
                  type='text'
                  placeholder='Enter your full name'
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`rounded-lg border-neutral-200 focus:border-[#CD2A75] focus:ring-[#CD2A75]/20 transition-all duration-300 ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && (
                  <p className='text-sm text-red-500 flex items-center gap-1'>
                    <XCircle className='w-3.5 h-3.5' />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label
                  htmlFor='mobileNumber'
                  className='text-sm font-medium text-neutral-700'>
                  Mobile Number <span className='text-[#CD2A75]'>*</span>
                </Label>
                <Input
                  id='mobileNumber'
                  type='tel'
                  placeholder='01XXXXXXXXX'
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    handleInputChange("mobileNumber", e.target.value)
                  }
                  className={`rounded-lg border-neutral-200 focus:border-[#CD2A75] focus:ring-[#CD2A75]/20 transition-all duration-300 ${errors.mobileNumber ? "border-red-500" : ""}`}
                />
                {errors.mobileNumber && (
                  <p className='text-sm text-red-500 flex items-center gap-1'>
                    <XCircle className='w-3.5 h-3.5' />
                    {errors.mobileNumber}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label
                  htmlFor='email'
                  className='text-sm font-medium text-neutral-700'>
                  Email{" "}
                  <span className='text-neutral-400 text-xs'>(Optional)</span>
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='Enter your email address'
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`rounded-lg border-neutral-200 focus:border-[#CD2A75] focus:ring-[#CD2A75]/20 transition-all duration-300 ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className='text-sm text-red-500 flex items-center gap-1'>
                    <XCircle className='w-3.5 h-3.5' />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label
                  htmlFor='password'
                  className='text-sm font-medium text-neutral-700'>
                  Password <span className='text-[#CD2A75]'>*</span>
                </Label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Create a strong password'
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`rounded-lg border-neutral-200 focus:border-[#CD2A75] focus:ring-[#CD2A75]/20 transition-all duration-300 ${
                      errors.password ? "border-red-500 pr-10" : "pr-10"
                    }`}
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors'
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>

                {formData.password && (
                  <div className='space-y-2'>
                    <div className='flex items-center space-x-2'>
                      <div className='flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden'>
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor(
                            passwordStrength.score,
                          )}`}
                          style={{
                            width: `${(passwordStrength.score / 5) * 100}%`,
                          }}
                        />
                      </div>
                      <span className='text-xs text-neutral-500 font-medium'>
                        {passwordStrength.feedback}
                      </span>
                    </div>
                  </div>
                )}

                {errors.password && (
                  <p className='text-sm text-red-500 flex items-center gap-1'>
                    <XCircle className='w-3.5 h-3.5' />
                    {errors.password}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label
                  htmlFor='confirmPassword'
                  className='text-sm font-medium text-neutral-700'>
                  Confirm Password <span className='text-[#CD2A75]'>*</span>
                </Label>
                <div className='relative'>
                  <Input
                    id='confirmPassword'
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder='Confirm your password'
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className={`rounded-lg border-neutral-200 focus:border-[#CD2A75] focus:ring-[#CD2A75]/20 transition-all duration-300 ${
                      errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"
                    }`}
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors'
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }>
                    {showConfirmPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>

                {formData.confirmPassword && formData.password && (
                  <div className='flex items-center space-x-2'>
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <CheckCircle className='h-4 w-4 text-green-500' />
                        <span className='text-sm text-green-600 font-medium'>
                          Passwords match
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className='h-4 w-4 text-red-500' />
                        <span className='text-sm text-red-600 font-medium'>
                          {"Passwords don't match"}
                        </span>
                      </>
                    )}
                  </div>
                )}

                {errors.confirmPassword && (
                  <p className='text-sm text-red-500 flex items-center gap-1'>
                    <XCircle className='w-3.5 h-3.5' />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <div className='flex items-start space-x-2'>
                  <Checkbox
                    id='agreeToTerms'
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      handleInputChange("agreeToTerms", checked as boolean)
                    }
                    className='mt-0.5'
                  />
                  <Label
                    htmlFor='agreeToTerms'
                    className='text-sm text-neutral-600 leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    I agree to the{" "}
                    <Link
                      href='/terms-conditions'
                      className='text-[#CD2A75] hover:text-[#B02462] font-medium underline underline-offset-2'
                      target='_blank'>
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href='/privacy-policy'
                      className='text-[#CD2A75] hover:text-[#B02462] font-medium underline underline-offset-2'
                      target='_blank'>
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {errors.agreeToTerms && (
                  <p className='text-sm text-red-500 flex items-center gap-1 ml-6'>
                    <XCircle className='w-3.5 h-3.5' />
                    {errors.agreeToTerms}
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter className='px-6 pb-6'>
              <Button
                type='submit'
                className='w-full h-11 rounded-lg bg-[#CD2A75] hover:bg-[#B02462] text-white font-semibold tracking-wide transition-all duration-300 shadow-lg shadow-[#CD2A75]/20 hover:shadow-xl hover:shadow-[#CD2A75]/30'
                disabled={authState.isLoading}>
                {authState.isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className='text-center'>
          <p className='text-sm text-neutral-600'>
            Already have an account?{" "}
            <Link
              href='/login'
              className='font-medium text-[#CD2A75] hover:text-[#B02462] transition-colors underline underline-offset-4'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

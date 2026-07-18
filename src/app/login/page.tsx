"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

import { useAuth, LoginCredentials } from "@/context/AuthContext";
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

const LoginPage = () => {
  const { login, authState } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginCredentials>({
    identifier: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = "Email or mobile number is required";
    } else {
      const isEmail = formData.identifier.includes("@");
      const isPhone = /^(\+88)?01[3-9]\d{8}$/.test(formData.identifier);

      if (isEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.identifier)) {
          newErrors.identifier = "Please enter a valid email address";
        }
      } else if (
        !isPhone &&
        !isValidBangladeshiPhoneNumber(formData.identifier)
      ) {
        newErrors.identifier = "Please enter a valid email or mobile number";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof LoginCredentials,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

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
      const response = await login(formData);

      if (response.success) {
        Swal.fire({
          title: "Welcome back!",
          text: "Login successful",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        const redirectTo =
          new URLSearchParams(window.location.search).get("redirect") ||
          "/account";
        router.push(redirectTo);
      } else {
        Swal.fire({
          title: "Login Failed",
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
            Welcome back
          </h2>
          <p className='mt-2 text-sm text-neutral-600'>
            Or{" "}
            <Link
              href='/register'
              className='font-medium text-[#CD2A75] hover:text-[#B02462] transition-colors underline underline-offset-4'>
              create a new account
            </Link>
          </p>
        </div>

        <Card className='rounded-xl border-neutral-200 shadow-lg shadow-neutral-200/50'>
          <CardHeader className='border-b border-neutral-100 pb-5'>
            <CardTitle className='text-lg font-semibold text-neutral-900 tracking-tight'>
              Sign in to your account
            </CardTitle>
            <CardDescription className='text-sm text-neutral-500'>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className='space-y-4 pt-6'>
              <div className='space-y-2'>
                <Label htmlFor='identifier' className='text-sm font-medium text-neutral-700'>
                  Email or Mobile Number
                </Label>
                <Input
                  id='identifier'
                  type='text'
                  placeholder='Enter your email or mobile number'
                  value={formData.identifier}
                  onChange={(e) =>
                    handleInputChange("identifier", e.target.value)
                  }
                  className={`rounded-lg border-neutral-200 focus:border-[#CD2A75] focus:ring-[#CD2A75]/20 transition-all duration-300 ${errors.identifier ? "border-red-500" : ""}`}
                />
                {errors.identifier && (
                  <p className='text-sm text-red-500'>{errors.identifier}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password' className='text-sm font-medium text-neutral-700'>
                  Password
                </Label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter your password'
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
                {errors.password && (
                  <p className='text-sm text-red-500'>{errors.password}</p>
                )}
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='rememberMe'
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      handleInputChange("rememberMe", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor='rememberMe'
                    className='text-sm font-medium text-neutral-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    Remember me
                  </Label>
                </div>

                <Link
                  href='/forgot-password'
                  className='text-sm font-medium text-[#CD2A75] hover:text-[#B02462] transition-colors underline underline-offset-4'>
                  Forgot password?
                </Link>
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
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className='text-center'>
          <p className='text-sm text-neutral-600'>
            {"Don't have an account?"}{" "}
            <Link
              href='/register'
              className='font-medium text-[#CD2A75] hover:text-[#B02462] transition-colors underline underline-offset-4'>
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

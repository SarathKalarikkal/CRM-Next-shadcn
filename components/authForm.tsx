"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Separate schemas for sign up and sign in
const signUpSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters").max(50),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters").max(50),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters").max(50),
});

type AuthType = "signin" | "signup";
type SignUpValues = z.infer<typeof signUpSchema>;
type SignInValues = z.infer<typeof signInSchema>;

const AuthForm = ({ auth }: { auth: AuthType }) => {


  
  const router = useRouter();

  const form = useForm<SignUpValues | SignInValues>({
    resolver: zodResolver(auth === "signin" ? signInSchema : signUpSchema),
    defaultValues: auth === "signup" 
      ? { username: "", email: "", password: "" } 
      : { email: "", password: "" },
  });

  function onSubmit(values: SignUpValues | SignInValues) {
    console.log("Form submitted:", values);
    
    if (auth === "signin") {
      if(values.email === "admin@gmail.com" && values.password === "admin@123"){
        // Store user data in localStorage
        localStorage.setItem("currentUser", JSON.stringify(values));
        
        // Set authentication cookie
        document.cookie = `auth-token=true; path=/; max-age=86400`; // 24 hours
        
        toast.success("Login successful");
        router.push("/dashboard");    
      }else{
        toast.error("Invalid email or password");
      }
    } else {
      router.push("/auth/signIn");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-background to-muted p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
            <User className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {auth === "signin" ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {auth === "signin"
              ? "Sign in to your account to continue"
              : "Create an account to continue"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (errors) => {
                console.log("Validation Errors:", errors);
              })}
              className="space-y-4"
            >
              {auth === "signup" && (
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            placeholder="Enter your name"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          placeholder="name@example.com"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {auth === "signin" && (
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="rounded border-gray-300"
                    />
                    <label
                      htmlFor="remember"
                      className="text-muted-foreground"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              <Button type="submit" className="w-full">
                {auth === "signin" ? "Sign in" : "Sign up"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">
            {auth === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signUp"
                  className="text-primary font-medium hover:underline"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  href="/auth/signIn"
                  className="text-primary font-medium hover:underline"
                >
                  Sign in
                </Link>
              </>
            )}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;

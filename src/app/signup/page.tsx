"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { signup } from "@/components/lib/auth-helper";
export default function SignUpPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        // Handle signup logic here
        signup({ email, password, username })
            .then(([success, id]) => {
                if (success) {
                    router.push("/login");
                } else {
                    alert("Signup failed");
                }
            })
            .catch((error) => {
                console.error("Error during signup:", error);
                alert("An error occurred during signup");
        });
        
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            {/* Left: Login Form */}
            <div className="w-[40%] px-24 flex flex-col gap-8 z-10">
                <div className="mb-10">
                    <motion.button
                        whileHover={{
                            scale: 1.1
                        }}
                        whileTap={{
                            scale: 0.9
                        }}
                        onClick={() => router.push('/')}
                    >   
                        <Image src="/back.png" alt="Back" width={60} height={60} className="hover:cursor-pointer"/>
                    </motion.button>
                </div>
                <h1 className="text-4xl font-bold text-black mb-2">Create your account</h1>
                <p className="text-gray-400 mb-6">Join <span onClick={() => router.push('/')} className="text-green-500 font-semibold hover:cursor-pointer">ShipNoxy</span> and start shipping smarter, faster, and easier.</p>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="px-4 py-3 rounded-xl border-green-500 border-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="px-4 py-3 rounded-xl border-green-500 border-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="px-4 py-3 rounded-xl border-green-500 border-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="px-4 py-3 rounded-xl border-green-500 border-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        type="submit"
                        className="mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-2xl transition-colors"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="flex items-center gap-2 my-2">
                    <div className="flex-1 h-px bg-gray-700" />
                    <span className="text-gray-500 text-sm">or continue with</span>
                    <div className="flex-1 h-px bg-gray-700" />
                </div>
                <div className="flex justify-center gap-4">
                    <button className="bg-[#232d25] p-3 rounded-full hover:bg-green-500 transition-colors">
                        <span className="sr-only">Google</span>
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><g><circle cx="12" cy="12" r="12" fill="#fff" /><path d="M21.805 12.082c0-.638-.057-1.252-.163-1.84H12v3.481h5.502a4.71 4.71 0 0 1-2.04 3.09v2.56h3.3c1.93-1.78 3.043-4.4 3.043-7.291z" fill="#4285F4" /><path d="M12 22c2.7 0 4.97-.89 6.627-2.41l-3.3-2.56c-.92.62-2.09.99-3.327.99-2.56 0-4.73-1.73-5.51-4.06H3.09v2.56A9.997 9.997 0 0 0 12 22z" fill="#34A853" /><path d="M6.49 13.96A5.99 5.99 0 0 1 6 12c0-.68.12-1.34.34-1.96V7.48H3.09A9.997 9.997 0 0 0 2 12c0 1.64.39 3.19 1.09 4.52l3.4-2.56z" fill="#FBBC05" /><path d="M12 6.5c1.47 0 2.78.51 3.81 1.51l2.86-2.86C16.97 3.89 14.7 3 12 3A9.997 9.997 0 0 0 3.09 7.48l3.4 2.56C7.27 8.23 9.44 6.5 12 6.5z" fill="#EA4335" /></g></svg>
                    </button>
                    <button className="bg-[#232d25] p-3 rounded-full hover:bg-green-500 transition-colors">
                        <span className="sr-only">Apple</span>
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><g><circle cx="12" cy="12" r="12" fill="#fff" /><path d="M16.365 12.97c-.01-1.13.92-1.67.96-1.7-.53-.77-1.36-.88-1.65-.89-.7-.07-1.36.41-1.71.41-.35 0-.9-.4-1.48-.39-.76.01-1.47.44-1.86 1.12-.8 1.39-.2 3.45.57 4.58.38.55.83 1.16 1.42 1.14.57-.02.79-.37 1.48-.37.69 0 .89.37 1.49.36.61-.01.99-.56 1.36-1.11.43-.62.61-1.22.62-1.25-.01-.01-1.18-.45-1.19-1.77zm-1.13-3.23c.32-.39.54-.93.48-1.47-.46.02-1.02.31-1.35.7-.3.35-.56.91-.46 1.44.49.04 1.01-.28 1.33-.67z" fill="#000" /></g></svg>
                    </button>
                    <button className="bg-[#232d25] p-3 rounded-full hover:bg-green-500 transition-colors">
                        <span className="sr-only">Facebook</span>
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><g><circle cx="12" cy="12" r="12" fill="#fff" /><path d="M15.12 8.5h-1.13c-.18 0-.39.24-.39.56v1.12h1.52l-.2 1.56h-1.32V18h-1.6v-6.26h-1.1v-1.56h1.1v-1.15c0-1.1.7-1.7 1.7-1.7h1.13v1.57z" fill="#1877F3" /></g></svg>
                    </button>
                </div>
                <p className="text-center text-gray-500 mt-4 text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="text-green-400 hover:underline">Login</Link>
                </p>
            </div>
            {/* Right: Illustration */}
            <div className="hidden md:flex w-[60%] items-center justify-center flex-1 bg-white h-full min-h-screen p-20">
                <div className="">
                    <Image src="/login.png" alt="login" width={800} height={800} className="rounded-3xl h-full w-full" />
                </div>
            </div>
        </div>
    );
}

SignUpPage.getLayout = function PageLayout(page: React.ReactNode) {
    return <>{page}</>;
};

import PhoneLogin from "@/components/phone-login";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <h1 className="text-4xl font-extrabold">OTP Login</h1>
      <section className="mt-10">
        <PhoneLogin />
      </section>
    </main>
  );
}

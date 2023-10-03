import Image from "next/image";
import HeroImage from "../public/hero.webp"
import { Logo } from './../components/Logo/Logo';
import Link from 'next/link';

export default function Home() {
  return (
  <div className="relative w-screen h-screen overflow-hidden flex justify-center items-center">

    <Image src={HeroImage} alt="hero" fill className="absolute"/>
    <div className="relative z-10 text-white px-10 py-5 text-center max-w-screen-sm bg-slate-900/90 rounded-md backdrop-blur">
      <Logo/>
      <p>The Ai powered SAAS solution to generate SEO optimized content in minutes. Get high-quality content</p>
      <Link href="/post/new" className="btn">Begin</Link>
    </div>
  </div>
  )
}

"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeInUp from "@/components/animations/FadeInUp";
import HeroSlideshow from "@/components/HeroSlideshow";

const gradientPink = "linear-gradient(135deg, #f5ab9b 0%, #f96a7c 100%)";

// 브레인프렌즈 서비스(실제 앱). 홈페이지와 별도 도메인이라 next/link 가 아니라
// <a> + target="_blank" 로 새 창에 띄운다.
const brainFriendsServiceUrl = "https://brainfriends.goldenbraincare.com/";

const features = [
  { icon: "/images/icon-selftest.svg", label: "자가점검", sub: "Self Assessment" },
  { icon: "/images/icon-speech.svg", label: "언어 재활", sub: "Speech Rehab" },
  { icon: "/images/icon-song.svg", label: "노래 훈련", sub: "Song Training" },
  { icon: "/images/icon-game.svg", label: "게임 모드", sub: "Game Mode" },
];

export default function BrainFriendsPage() {
  return (
    <div className="flex flex-col items-start min-h-screen bg-[#000c26]">
      <Header />
      <main className="flex flex-col w-full pt-[72px] lg:pt-[104px] bg-[#000c26]">
        <section className="w-full bg-[#000c26]">
          <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-[80px] py-14 lg:py-[96px]">
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-x-[60px] lg:items-center mb-12 lg:mb-[72px]">
              <FadeInUp>
                <p className="font-semibold text-[13px] text-[#fed65b] uppercase tracking-[2px] mb-4">
                  Our Product
                </p>
                <p className="font-bold text-[13px] lg:text-[14px] text-[#f5ab9b] mb-3">
                  뇌질환 환자 대상 의사소통장애 재활·언어재활
                </p>
                <span
                  className="inline-block font-semibold text-[13px] lg:text-[14px] px-4 py-1.5 rounded-full mb-6"
                  style={{ color: "#fde4dd", backgroundColor: "rgba(249,106,124,0.18)" }}
                >
                  디지털의료제품(DTx)
                </span>
                <h1 className="font-bold text-[28px] sm:text-[36px] lg:text-[48px] text-white leading-[1.25] tracking-[-0.96px] mb-8">
                  일상의 대화를 되찾아주는
                  <br />
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradientPink }}>
                    브레인프렌즈
                  </span>
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={brainFriendsServiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-semibold text-[15px] lg:text-[16px] px-8 py-[18px] rounded-full inline-flex items-center justify-center border border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.06)] transition-colors hover:bg-[rgba(255,255,255,0.14)]"
                  >
                    바로가기
                  </a>
                  <Link
                    href="/inquiry"
                    className="text-white font-semibold text-[15px] lg:text-[16px] px-8 py-[18px] rounded-full shadow-[0px_20px_25px_-5px_rgba(245,171,155,0.3)] inline-flex items-center justify-center border border-transparent"
                    style={{ backgroundImage: gradientPink }}
                  >
                    도입 문의하기
                  </Link>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.2} className="w-full max-w-[520px] mx-auto lg:mx-0 lg:max-w-none">
                <HeroSlideshow />
              </FadeInUp>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {features.map((item, i) => (
                <FadeInUp key={item.label} delay={i * 0.1}>
                  <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-[16px] p-5 lg:p-[28px] flex flex-col items-center text-center gap-3">
                    <div className="relative w-8 h-8 lg:w-9 lg:h-9">
                      <Image src={item.icon} alt={item.label} fill className="object-contain brightness-0 invert" />
                    </div>
                    <div>
                      <p className="font-bold text-[15px] lg:text-[18px] text-white">{item.label}</p>
                      <p className="font-medium text-[11px] lg:text-[13px] text-[rgba(255,255,255,0.45)] mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

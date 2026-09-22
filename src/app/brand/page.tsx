"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeInUp from "@/components/animations/FadeInUp";
import LocationMap from "@/components/LocationMap";

/* Figma reference: node 3247:61733 (1920px wide).
   섹션 순서/크기/색상 모두 Figma 시안 기준. */

// geocoder 는 층·호수가 붙으면 검색에 실패할 수 있어, 지도용 주소는 도로명까지만 쓰고
// 화면에는 층·호수까지 포함한 전체 주소를 보여준다.
const CENTER_ADDRESS = "부산광역시 부산진구 동천로 116";
const CENTER_ADDRESS_FULL = "부산 부산진구 동천로 116, 한신밴빌딩 5층 501호";

const stats = [
  { value: "30,000+", label: "누적 임상 케이스" },
  { value: "1급", label: "언어재활사 직접 치료" },
  { value: "대학병원", label: "임상 실증 AI 평가" },
  { value: "20+", label: "협력 의료기관" },
];

const symptoms = [
  { title: "실어증", desc: "뇌 손상 이후 말을 이해하거나 표현하는 것이 어렵습니다." },
  { title: "마비말장애", desc: "혀 · 입술 근육의 마비로 발음이 부정확해집니다." },
  { title: "치매 · 인지저하", desc: "단어가 떠오르지 않고 같은 말을 반복하게 됩니다." },
  { title: "실독증 · 실서증", desc: "글을 읽고 쓰는 것이 어려워 일상에 불편을 겪습니다." },
  { title: "유창성장애", desc: "말이 막히거나 더듬는 증상이 반복됩니다." },
  { title: "음성장애", desc: "목소리가 갈라지고 쉰 소리가 나며 발성이 힘듭니다." },
  { title: "조음 · 음운장애", desc: "특정 발음이 자주 틀리고 말이 명료하지 않습니다." },
];

const lifeStages = [
  { img: "/images/brand/life-child.png", title: "아동", sub: "언어 · 인지 기초" },
  { img: "/images/brand/life-school.png", title: "학령기", sub: "학습 · 학교생활" },
  { img: "/images/brand/life-adult.png", title: "성인", sub: "일상 · 직업 참여" },
  { img: "/images/brand/life-elder.png", title: "노인", sub: "인지 저하 예방" },
];

const differentiators = [
  "음성 + 구강안면 멀티모달 AI 평가",
  "보호자도 함께 보는 정기 경과 리포트",
  "대학병원 임상실증을 거친 평가 기술",
];

const treatmentSteps = [
  { num: "01", title: "초기상담 · 언어검사", desc: "현재 상태와 의사소통 목표를 면밀히 파악합니다.", pill: "상태 확인" },
  { num: "02", title: "AI 정밀 평가", desc: "음성 · 구강안면 데이터를 바탕으로 상태를 객관적으로 분석합니다", pill: "데이터 확인" },
  { num: "03", title: "1:1 맞춤 치료", desc: "개인별 목표와 치료 계획을 세우고 직접 진행합니다.", pill: "맞춤 진행" },
  { num: "04", title: "정기 경과 리포트", desc: "6개월마다 평가 결과로 변화를 그래프로 확인합니다.", pill: "경과 확인" },
];

const flowSteps = [
  { title: "상담", desc: "현재 상태 확인" },
  { title: "평가", desc: "데이터 기반 분석" },
  { title: "치료", desc: "맞춤형 훈련 진행" },
  { title: "경과 확인", desc: "변화 데이터 분석" },
  { title: "다음 계획", desc: "지속적인 관리" },
];

const therapists = [
  {
    img: "/images/brand/therapist-leehyunsong.png",
    name: "이현송",
    role: "대표원장",
    cred: "1급 언어재활사 · 임상 10년+",
    intro: "말과 소통의 회복을 함께합니다.",
    quote: "“작은 변화도\n함께 기뻐하는 치료사”",
  },
  {
    img: "/images/brand/therapist-leejinseon.png",
    name: "이진선",
    role: "센터장",
    cred: "1급 언어재활사 · 경력 20년차",
    intro: "말과 소통의 회복을 함께 합니다.",
    quote: "“한 명, 한 명의 속도에 맞춰\n끝까지 함께”",
  },
];

// Figma 3255:64632 - 3개 (2025 항목 없음)
const milestones = [
  { year: "2026", label: "(주) 골든브레인케어 법인 설립" },
  { year: "", label: "GBC 기업부설연구소 설립" },
  { year: "", label: "GBC 기업부설연구소 설립" },
];

// Figma 3255:64658 - 좌우 각 4개
const partnersLeft = ["부산대학교", "건양대학교", "연세대학교", "양산부산대학교"];
const partnersRight = ["동아대학교", "고신대학교", "인제대학교", "좋은 강안 병원"];

// Figma 3255:64630 - 8개 개별 크기 유지
const partnerLogos: { src: string; width: number; height: number }[] = [
  { src: "/images/brand/partner-1.png", width: 151, height: 151 },
  { src: "/images/brand/partner-2.png", width: 151, height: 151 },
  { src: "/images/brand/partner-3.png", width: 172, height: 151 },
  { src: "/images/brand/partner-4.png", width: 151, height: 151 },
  { src: "/images/brand/partner-5.png", width: 151, height: 151 },
  { src: "/images/brand/partner-6.png", width: 151, height: 151 },
  { src: "/images/brand/partner-7.png", width: 281, height: 151 },
  { src: "/images/brand/partner-8.png", width: 157, height: 151 },
];

// 외부 예약 URL (헤더와 동일)
const RESERVATION_URL = "https://braintalktalk.goldenbraincare.com/";
const KAKAO_URL = "https://pf.kakao.com/_qpxkCn";

export default function BrandPage() {
  return (
    <div className="flex flex-col items-start min-h-screen bg-[#fff9ee]">
      <Header />
      <main className="flex flex-col w-full pt-[72px] lg:pt-[104px]">

        {/* ===== 1. Hero (Figma 3234:40510, 1920×566, bg #000c26) ===== */}
        <section className="w-full bg-[#000c26] relative overflow-clip">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div
              className="absolute rounded-full bg-[#fed65b] blur-[60px]"
              style={{ top: "-80px", right: "-80px", width: "500px", height: "500px" }}
            />
            <div
              className="absolute rounded-full bg-[#4f8ef5] blur-[50px]"
              style={{ bottom: "-180px", left: "960px", width: "360px", height: "360px" }}
            />
          </div>
          <div className="relative max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[120px] py-16 lg:py-[96px] min-h-[420px] lg:h-[566px] flex flex-col justify-center">
            <FadeInUp>
              <p className="font-semibold text-[13px] lg:text-[15px] text-[#fed65b] uppercase tracking-[2px] mb-4">
                부산 언어재활 · 1급 언어재활사 직접 치료
              </p>
              <h1 className="font-bold text-[32px] sm:text-[44px] lg:text-[64px] text-white leading-[1.15] tracking-[-0.96px] max-w-[720px] mb-6">
                2만 번을 외쳐야,
                <br />
                <span className="text-[#fed65b]">언어</span>가 됩니다.
              </h1>
              <p className="font-medium text-[15px] lg:text-[20px] text-[rgba(255,255,255,0.75)] leading-[1.8] max-w-[600px] mb-8 lg:mb-[40px]">
                뇌졸중 이후 멈춘 말은 다시 시작할 수 있습니다.
                <br />
                임상 3만 케이스의 1급 언어재활사가 정확한 평가부터 회복의 과정까지 함께합니다.
              </p>
              <div className="flex flex-wrap gap-4 lg:gap-[20px] items-center">
                <a
                  href={RESERVATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ffe088] text-[#241a00] font-bold text-[15px] lg:text-[20px] px-8 py-3.5 lg:px-[40px] lg:py-[20px] rounded-[12px] hover:bg-[#fed65b] transition-colors whitespace-nowrap"
                >
                  치료 예약하기
                </a>
                <Link
                  href="/inquiry"
                  className="border-2 border-white text-white font-bold text-[15px] lg:text-[20px] px-8 py-3.5 lg:px-[40px] lg:py-[20px] rounded-[12px] hover:bg-white hover:text-[#000c26] transition-colors whitespace-nowrap"
                >
                  도입 문의하기
                </Link>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* ===== 2. Stats (bg #faf3e5, 4 컬럼) ===== */}
        <section className="w-full bg-[#faf3e5] border-b border-[#ecdcc0]">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[120px] py-10 lg:py-[56px]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#d4c4a0]">
              {stats.map((s, i) => (
                <FadeInUp key={s.label} delay={i * 0.08} className="flex flex-col items-center text-center px-4 lg:px-6">
                  <p className="font-black text-[32px] lg:text-[40px] text-[#735c00] leading-[1.3] mb-2 lg:mb-3">
                    {s.value}
                  </p>
                  <p className="font-medium text-[13px] lg:text-[20px] text-[#44474f] leading-[1.4]">
                    {s.label}
                  </p>
                </FadeInUp>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 3. Target Symptoms (bg #fff9ee, 4×2 grid) ===== */}
        <section className="w-full bg-[#fff9ee]">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[120px] py-14 lg:py-[96px]">
            <FadeInUp className="mb-8 lg:mb-[48px]">
              <p className="font-bold text-[13px] lg:text-[16px] text-[#735c00] uppercase tracking-[0.8px] mb-3">
                대상 증상
              </p>
              <h2 className="font-bold text-[24px] lg:text-[36px] text-[#1e1b13] leading-[1.35] tracking-[-0.36px]">
                이런 어려움이 있으신가요?
              </h2>
            </FadeInUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {symptoms.map((s, i) => (
                <FadeInUp key={s.title} delay={i * 0.05}>
                  <div className="bg-white border border-[#ecdcc0] rounded-[16px] p-6 lg:p-[28px] h-full flex flex-col gap-2 lg:gap-[10px]">
                    <p className="font-bold text-[18px] lg:text-[24px] text-[#1e1b13] tracking-[-0.48px] leading-[1.3]">
                      {s.title}
                    </p>
                    <p className="font-medium text-[14px] lg:text-[16px] text-[#44474f] leading-[1.5]">
                      {s.desc}
                    </p>
                  </div>
                </FadeInUp>
              ))}
              {/* 8번째: CTA 카드 (bg rgba(143,106,31,0.1)) */}
              <FadeInUp delay={symptoms.length * 0.05}>
                <Link
                  href="/inquiry"
                  className="rounded-[16px] p-6 lg:p-[28px] h-full flex flex-col gap-2 lg:gap-[10px] transition-colors"
                  style={{ backgroundColor: "rgba(143,106,31,0.1)" }}
                >
                  <p className="font-bold text-[18px] lg:text-[24px] text-[#8f6a1f] tracking-[-0.48px] leading-[1.3]">
                    어떤 경우인지 모르겠다면
                  </p>
                  <p className="font-medium text-[14px] lg:text-[16px] text-[#8f6a1f] leading-[1.5]">
                    초기 상담에서 함께 확인해 드립니다.
                  </p>
                  <p className="mt-auto font-medium text-[14px] lg:text-[16px] text-[#8f6a1f]">
                    상담으로 확인하기 →
                  </p>
                </Link>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* ===== 4. Life Stages (bg white, 4 circles + arrows) ===== */}
        <section className="w-full bg-white">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[120px] py-14 lg:py-[80px]">
            <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-[80px]">
              {/* 좌측 헤딩 */}
              <FadeInUp className="lg:flex-shrink-0 lg:w-[420px]">
                <p className="font-bold text-[13px] lg:text-[16px] text-[#735c00] uppercase tracking-[0.8px] mb-3">
                  생애 전주기
                </p>
                <h2 className="font-semibold text-[24px] lg:text-[32px] text-[#1e1b13] leading-[1.375] tracking-[-0.32px] mb-4 lg:mb-[20px]">
                  언어와 인지는
                  <br />
                  삶의 모든 순간에 필요합니다
                </h2>
                <p className="font-medium text-[15px] lg:text-[18px] text-[#44474f] leading-[1.6]">
                  언어와 인지는 단순한 의사소통을 넘어
                  <br className="hidden lg:block" />
                  배움, 일, 관계, 그리고 일상의 모든 순간을 가능하게 합니다.
                </p>
              </FadeInUp>

              {/* 우측: 4스테이지 + 사이 3개 화살표 */}
              <div className="flex items-start justify-between flex-1 gap-2 lg:gap-[16px] overflow-x-auto lg:overflow-visible">
                {lifeStages.map((s, i) => (
                  <div key={s.title} className="flex items-start gap-2 lg:gap-[16px] flex-shrink-0">
                    <FadeInUp delay={i * 0.08}>
                      <div className="flex flex-col items-center gap-3 lg:gap-[20px] w-[110px] lg:w-[180px]">
                        {/* 180×180 원 + 인물 이미지 */}
                        <div className="relative w-[110px] h-[110px] lg:w-[180px] lg:h-[180px]">
                          <div className="absolute inset-0 rounded-full bg-[#faf3e5]" />
                          <div className="absolute inset-[13.77%] rounded-full overflow-hidden">
                            <Image src={s.img} alt={s.title} fill className="object-cover" sizes="200px" />
                          </div>
                        </div>
                        <div className="text-center flex flex-col gap-1">
                          <p className="font-bold text-[16px] lg:text-[24px] text-[#1e1b13] leading-[1.3] tracking-[-0.24px]">
                            {s.title}
                          </p>
                          <p className="font-medium text-[13px] lg:text-[20px] text-[#8f6a1f] leading-[1.4]">
                            {s.sub}
                          </p>
                        </div>
                      </div>
                    </FadeInUp>
                    {i < lifeStages.length - 1 && (
                      <div className="flex-shrink-0 self-start pt-[35px] lg:pt-[80px]" aria-hidden>
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" className="h-[16px] lg:h-[21px] w-[16px] lg:w-[21px]">
                          <path d="M21 10.5L5.25 19.5933V1.4067L21 10.5Z" fill="#8D9499" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== 5. Differentiator (bg #fff9ee) ===== */}
        <section className="w-full bg-[#fff9ee]">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[120px] py-14 lg:py-[96px]">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,646px)_minmax(0,1fr)] gap-10 lg:gap-[80px] items-center">
              {/* 좌측 텍스트 */}
              <FadeInUp>
                <p className="font-bold text-[13px] lg:text-[16px] text-[#735c00] uppercase tracking-[0.8px] mb-3">
                  다른 센터와 다른 점
                </p>
                <h2 className="font-bold text-[24px] lg:text-[36px] text-[#1e1b13] leading-[1.35] tracking-[-0.36px] mb-4 lg:mb-[20px]">
                  감이 아니라,
                  <br />
                  데이터로 확인합니다.
                </h2>
                <p className="font-medium text-[15px] lg:text-[18px] text-[#44474f] leading-[1.6] mb-6 lg:mb-[40px]">
                  골든브레인케어는 AI 기반 언어·인지 재활 솔루션을 통해 재활의 지속성과 회복 가능성을 높이는 디지털 헬스케어 기업입니다.
                  <br />
                  치료가 효과 있는지 감이 아닌, 매 평가의 데이터를 그래프로 보여드립니다.
                </p>
                <ul className="flex flex-col gap-3 lg:gap-[16px]">
                  {differentiators.map((d, i) => (
                    <motion.li
                      key={d}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                      className="flex items-center gap-3 lg:gap-[16px]"
                    >
                      {/* 얇은 회색 원 + 체크 */}
                      <svg
                        className="flex-shrink-0 w-6 h-6 lg:w-8 lg:h-8"
                        viewBox="0 0 32 32"
                        fill="none"
                        aria-hidden
                      >
                        <circle cx="16" cy="16" r="15.25" stroke="#B8B8B8" strokeWidth="1.5" />
                        <path
                          d="M10 16.5L14.5 21L22 12.5"
                          stroke="#5C5C5C"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                      <span className="font-medium text-[15px] lg:text-[20px] text-[#44474f] leading-[1.5]">
                        {d}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </FadeInUp>

              {/* 우측 이미지 */}
              <FadeInUp delay={0.15}>
                <div className="relative rounded-[40px] overflow-hidden shadow-[0px_20px_50px_-12px_rgba(0,12,38,0.15)]">
                  <div className="relative h-[240px] sm:h-[340px] lg:h-[390px] w-full">
                    <Image src="/images/brand/differentiator-hero.png" alt="치료 현장" fill className="object-cover" sizes="(min-width: 1024px) 900px, 100vw" />
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* ===== 6. Treatment Process (bg #fff9ee, 4단계 + 흐름바) ===== */}
        <section className="w-full bg-[#fff9ee]">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[120px] py-14 lg:py-[80px]">
            <FadeInUp className="mb-10 lg:mb-[56px]">
              <p className="font-bold text-[13px] lg:text-[16px] text-[#735c00] uppercase tracking-[0.8px] mb-3">
                치료 과정
              </p>
              <h2 className="font-bold text-[24px] lg:text-[36px] text-[#1e1b13] leading-[1.35] tracking-[-0.36px]">
                첫 상담부터 회복 확인까지
              </h2>
            </FadeInUp>

            {/* 4 단계 카드 + 상단 넘버 원 + 점선 연결 */}
            <div className="relative">
              <div
                className="hidden lg:block absolute top-[32px] left-[8%] right-[8%] h-0 border-t border-dashed border-[#c9b485]"
                aria-hidden
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 relative">
                {treatmentSteps.map((step, i) => (
                  <FadeInUp key={step.num} delay={i * 0.1}>
                    <div className="flex flex-col items-center">
                      {/* 상단 넘버 원 */}
                      <div
                        className="w-[56px] h-[56px] lg:w-[64px] lg:h-[64px] rounded-full flex items-center justify-center mb-4 lg:mb-[24px] relative z-10"
                        style={{ backgroundColor: "#f4e9d6" }}
                      >
                        <span className="font-bold text-[22px] lg:text-[28px] text-[#825c16] leading-none">
                          {step.num}
                        </span>
                      </div>
                      {/* 카드 */}
                      <div className="bg-white border border-[#ecdcc0] rounded-[16px] p-5 lg:p-[32px] w-full flex flex-col gap-4 lg:gap-[20px] h-full">
                        <p className="font-bold text-[18px] lg:text-[24px] text-[#1e1b13] tracking-[-0.24px] leading-[1.3]">
                          {step.title}
                        </p>
                        <p className="font-medium text-[14px] lg:text-[16px] text-[#44474f] leading-[1.6] min-h-[48px]">
                          {step.desc}
                        </p>
                        <span
                          className="self-start font-medium text-[13px] lg:text-[15px] text-[#825c16] rounded-full"
                          style={{
                            backgroundColor: "#f4e9d6",
                            padding: "6px 16px",
                          }}
                        >
                          {step.pill}
                        </span>
                      </div>
                    </div>
                  </FadeInUp>
                ))}
              </div>
            </div>

            {/* 하단 흐름바 (rounded pill) */}
            <FadeInUp delay={0.2} className="mt-10 lg:mt-[64px]">
              <div className="bg-[#f7f3ea] rounded-[100px] px-6 lg:px-[80px] py-5 lg:py-[32px] flex flex-wrap items-center justify-between gap-4">
                {flowSteps.map((step, i) => (
                  <div key={step.title} className="flex items-center gap-3 lg:gap-[24px]">
                    <div className="flex flex-col items-center text-center min-w-[72px]">
                      <p className="font-bold text-[14px] lg:text-[20px] text-[#825c16] leading-[1.3]">
                        {step.title}
                      </p>
                      <p className="font-medium text-[11px] lg:text-[16px] text-[#44474f] leading-[1.4] mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                    {i < flowSteps.length - 1 && (
                      <span className="text-[#a8935a] text-[18px] lg:text-[22px]" aria-hidden>
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* ===== 7. Therapists + Institution banner ===== */}
        <section className="w-full bg-[#fff9ee]">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[120px] py-14 lg:py-[80px]">
            {/* 상단: 좌측 타이틀(268px) + gap 80 + 우측 2 카드(각 654px) — Figma 1920px 기준 */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-[80px] mb-10 lg:mb-[56px] items-start">
              {/* 좌측 타이틀 - 268px */}
              <FadeInUp className="lg:flex-shrink-0 lg:w-[268px]">
                <p className="font-bold text-[13px] lg:text-[16px] text-[#735c00] uppercase tracking-[0.8px] mb-3">
                  치료진
                </p>
                <h2 className="font-semibold text-[24px] lg:text-[32px] text-[#1e1b13] leading-[1.35] tracking-[-0.32px] whitespace-nowrap">
                  치료를 맡는 사람들
                </h2>
              </FadeInUp>

              {/* 우측 2 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-[24px] flex-1 w-full min-w-0">
              {therapists.map((t, i) => (
                <FadeInUp key={t.name} delay={i * 0.15}>
                  <div className="bg-white border-[3px] border-[#f6f1e9] rounded-[20px] overflow-hidden">
                    {/* 상단: bg #f6efe4, 반원 SVG 뒤로, 인물 사진 우측 */}
                    <div className="relative bg-[#f6efe4] h-[240px] sm:h-[280px] lg:h-[293px] overflow-hidden">
                      {/* 반원 배경 SVG (imgFrame1948759193) */}
                      <svg
                        className="absolute pointer-events-none"
                        style={{ left: "46.6%", top: "40.6%", width: "53.4%", height: "59.4%" }}
                        viewBox="0 0 349.381 174"
                        preserveAspectRatio="none"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M349.381 174.69C349.381 128.36 330.976 83.9265 298.215 51.1657C265.455 18.4048 221.021 3.49787e-06 174.691 0C128.36 -3.49788e-06 83.9266 18.4048 51.1658 51.1656C18.4049 83.9265 0.000103877 128.36 9.68812e-05 174.69L174.691 174.69H349.381Z"
                          fill="#F3E9DA"
                        />
                      </svg>

                      {/* 인물 사진 (Figma: left 350, top 35, size 259 → 카드 상단 293의 바닥까지 닿음)
                          bottom: 0으로 두어 카드 상단 영역 하단에 딱 닿게 함 */}
                      <div
                        className="absolute overflow-hidden"
                        style={{ left: "53.5%", top: "35px", bottom: "0", width: "39.6%" }}
                      >
                        <Image
                          src={t.img}
                          alt={t.name}
                          fill
                          className="object-cover object-top"
                          sizes="300px"
                        />
                      </div>

                      {/* 좌측 텍스트 */}
                      <div
                        className="absolute flex flex-col items-start"
                        style={{ left: "40px", top: "84px", width: "260px", gap: "20px" }}
                      >
                        {/* 이름 + 직책 인라인 */}
                        <div className="flex items-baseline gap-2 lg:gap-[10px]">
                          <p className="font-bold text-[22px] lg:text-[28px] text-[#1e1b13] tracking-[-0.32px] leading-none">
                            {t.name}
                          </p>
                          <span className="font-medium text-[12px] lg:text-[14px] text-[#8f6a1f] leading-none whitespace-nowrap">
                            {t.role}
                          </span>
                        </div>
                        <p className="font-medium text-[13px] lg:text-[16px] text-[#44474f] leading-[1.5] tracking-[-0.16px]">
                          {t.cred}
                          <br />
                          {t.intro}
                        </p>
                      </div>
                    </div>

                    {/* 하단: 흰 배경 인용스트립 */}
                    <div className="bg-white px-6 lg:px-[40px] py-4 lg:py-[20px]">
                      <p className="font-medium text-[14px] lg:text-[20px] text-[#937134] leading-[1.4] tracking-[-0.4px] whitespace-pre-line">
                        {t.quote}
                      </p>
                    </div>
                  </div>
                </FadeInUp>
              ))}
              </div>
            </div>

            {/* 기관 도입 배너 (bg #2b2724) */}
            <FadeInUp delay={0.2}>
              <div className="mt-10 lg:mt-[56px] bg-[#2b2724] rounded-[20px] px-6 lg:px-[80px] py-8 lg:py-[40px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
                <div>
                  <p className="font-bold text-[20px] lg:text-[28px] text-white leading-[1.3] mb-2">
                    복지관 · 요양기관 · 병원이신가요?
                  </p>
                  <p className="font-medium text-[14px] lg:text-[18px] text-[#f0dbb6] leading-[1.6]">
                    브레인프렌즈 솔루션과 기관 도입 프로그램을 안내해 드립니다.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:gap-[16px]">
                  <Link
                    href="/inquiry"
                    className="bg-[#ffe088] text-[#241a00] font-bold text-[14px] lg:text-[18px] px-5 py-3 lg:px-[28px] lg:py-[16px] rounded-[12px] hover:bg-[#fed65b] transition-colors whitespace-nowrap"
                  >
                    도입 문의하기
                  </Link>
                  <Link
                    href={KAKAO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white text-white font-bold text-[14px] lg:text-[18px] px-5 py-3 lg:px-[28px] lg:py-[16px] rounded-[12px] hover:bg-white hover:text-[#2b2724] transition-colors whitespace-nowrap"
                  >
                    카카오톡 문의하기
                  </Link>
                </div>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* ===== 8. Milestones + Partners + Marquee ===== */}
        <section className="w-full bg-[#fff9ee]">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[120px] py-14 lg:py-[96px]">
            {/* 상단: 좌측 이미지 + 우측 텍스트 (이미지 세로가 우측 컨텐츠 세로와 맞도록 stretch) */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,563px)_minmax(0,1fr)] gap-10 lg:gap-[80px] items-stretch">
              <FadeInUp className="h-full">
                <div className="relative rounded-[22px] overflow-hidden border-4 border-white shadow-[0_27px_54px_-13px_rgba(0,0,0,0.18)] h-full">
                  <div className="relative h-[280px] sm:h-[400px] lg:h-full lg:min-h-[420px] w-full">
                    <Image src="/images/brand/center-exterior.png" alt="치료 현장" fill className="object-cover" sizes="(min-width: 1024px) 563px, 100vw" />
                  </div>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.15}>
                {/* 우측 컬럼: 연혁 + 협력 텍스트 (상단) + 로고 marquee (아래 정렬) */}
                <div className="flex flex-col gap-10 lg:gap-[56px]">
                  {/* Figma 3255:64631 - 주요 연혁과 임상·전문가 협력 좌우 배치 (좌측 정렬) */}
                  <div className="flex flex-col sm:flex-row gap-10 lg:gap-[100px] items-start justify-start">
                    {/* 주요 연혁 */}
                    <div className="flex-shrink-0 text-left">
                      <h3 className="text-left font-medium text-[22px] lg:text-[32px] text-[#735c00] leading-[1.4] tracking-[-0.64px] mb-5 lg:mb-[24px]">
                        주요 연혁
                      </h3>
                      <div className="flex flex-col gap-2.5 lg:gap-[10px]">
                        {milestones.map((m, i) => (
                          <div key={i} className="flex items-center gap-3 lg:gap-[16px]">
                            <span className={`font-bold text-[12px] lg:text-[15px] w-[36px] flex-shrink-0 ${m.year ? "text-[#735c00]" : "text-transparent"}`}>
                              {m.year || "0000"}
                            </span>
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${m.year ? "bg-[#000c26]" : "bg-[#d4c4a0]"}`} />
                            <span className="font-medium text-[13px] lg:text-[16px] text-[#44474f] leading-[1.5]">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 임상 · 전문가 협력 */}
                    <div className="flex-shrink-0 text-left">
                      <h3 className="text-left font-medium text-[22px] lg:text-[32px] text-[#735c00] leading-[1.4] tracking-[-0.64px] mb-5 lg:mb-[24px]">
                        임상 · 전문가 협력
                      </h3>
                      {/* Flex: 두 이름 컬럼이 필요한 만큼만 폭 잡도록 */}
                      <div className="flex gap-x-8 lg:gap-x-[40px]">
                        <div className="flex flex-col gap-2.5 lg:gap-[10px]">
                          {partnersLeft.map((name) => (
                            <div key={name} className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#d4c4a0] flex-shrink-0" />
                              <span className="font-medium text-[13px] lg:text-[16px] text-[#44474f] leading-[1.5] whitespace-nowrap">{name}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col gap-2.5 lg:gap-[10px]">
                          {partnersRight.map((name) => (
                            <div key={name} className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#d4c4a0] flex-shrink-0" />
                              <span className="font-medium text-[13px] lg:text-[16px] text-[#44474f] leading-[1.5] whitespace-nowrap">{name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 로고 marquee - 연혁+협력 아래, 우측 컬럼 폭 내에서 */}
                  <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
                    <motion.div
                      className="flex items-center gap-[36px] lg:gap-[72px] w-max"
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                      {[...partnerLogos, ...partnerLogos].map((logo, i) => (
                        <div
                          key={i}
                          className="relative flex-shrink-0"
                          style={{
                            width: `${logo.width * 0.7}px`,
                            height: `${logo.height * 0.7}px`,
                          }}
                        >
                          <Image
                            src={logo.src}
                            alt={`협력기관 ${(i % partnerLogos.length) + 1}`}
                            fill
                            className="object-contain"
                            sizes="250px"
                          />
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* ===== 9. Directions + Bottom CTA ===== */}
        <section className="w-full bg-[#fff9ee]">
          <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-[120px] py-14 lg:py-[96px]">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,506px)] gap-10 lg:gap-[38px] items-start">
              {/* 좌측: 오시는 길 (Figma: 지도 자리는 완전 빈 박스, 텍스트 없음) */}
              <FadeInUp>
                <h2 className="font-bold text-[28px] lg:text-[48px] text-[#1e1b13] leading-[1.2] tracking-[-0.96px] mb-6 lg:mb-[32px]">
                  오시는 길
                </h2>
                {/* Figma 의 빈 박스 자리에 네이버 지도를 넣는다(2026-09-22). 테두리·radius 는 시안 유지. */}
                <div
                  className="rounded-[20px] border overflow-hidden h-[280px] lg:h-[380px]"
                  style={{ borderColor: "rgba(147,113,52,0.35)" }}
                >
                  <LocationMap address={CENTER_ADDRESS} label="골든브레인케어" />
                </div>
                <p className="font-medium text-[15px] lg:text-[20px] text-[#44474f] leading-[1.5] mt-4 lg:mt-[20px]">
                  {CENTER_ADDRESS_FULL}
                </p>
              </FadeInUp>

              {/* 우측: 하단 CTA 카드 */}
              <FadeInUp delay={0.15}>
                <div className="bg-white border border-[#937134]/30 rounded-[20px] p-6 lg:p-[40px] flex flex-col gap-5 lg:gap-[20px]">
                  <h3 className="font-semibold text-[22px] lg:text-[32px] text-[#1e1b13] leading-[1.35] tracking-[-0.32px]">
                    회복의 시작,
                    <br />
                    이번 주에 예약하세요.
                  </h3>
                  <p className="font-medium text-[14px] lg:text-[20px] text-[#44474f] leading-[1.5]">
                    초기 상담에서 현재 상태를 확인하고
                    <br />
                    치료 방향을 함께 정합니다.
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href={RESERVATION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#a8481a] text-white font-bold text-[16px] lg:text-[24px] py-4 lg:py-[20px] rounded-[12px] text-center hover:bg-[#8b3a15] transition-colors"
                    >
                      초기 평가 예약하기
                    </a>
                    <a
                      href={KAKAO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#fbf7ef] border border-[#d9cdb6] text-[#474440] font-bold text-[16px] lg:text-[24px] py-4 lg:py-[20px] rounded-[12px] text-center hover:bg-[#f4e9d6] transition-colors"
                    >
                      카카오톡으로 상담하기
                    </a>
                  </div>
                  <p className="font-normal text-[13px] lg:text-[16px] text-[#44474f]/70 text-center mt-1">
                    카카오 상담 평일 10:00 ~ 15:00
                  </p>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

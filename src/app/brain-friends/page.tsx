"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeInUp from "@/components/animations/FadeInUp";
import FadeInScale from "@/components/animations/FadeInScale";
import FadeInSide from "@/components/animations/FadeInSide";

// Figma 3492:4381 (1920px 기준). 데스크톱은 시안 값 그대로, 모바일은 비율 축소.
const BRAIN_FRIENDS_URL = "https://brainfriends.goldenbraincare.com/";
const RESERVATION_URL = "https://braintalktalk.goldenbraincare.com/";
const CONTACT_URL = "/contact";

/* ---------- 공통 프리셋 ---------- */
const sectionContainer = "max-w-[1672px] mx-auto px-6 md:px-12 lg:px-[120px]";
const eyebrow = "font-bold text-[13px] lg:text-[16px] tracking-[0.8px] uppercase leading-[24px]";
const heading2 = "font-bold text-[24px] lg:text-[32px] text-[#1e1b13] tracking-[-0.32px] leading-[1.375] lg:leading-[44px]";
const subtitle = "font-medium text-[15px] lg:text-[20px] text-black leading-[1.5]";

/* ---------- 데이터 ---------- */
const overviewSteps = [
  { n: "01", color: "#f09b79", title: "자가 확인", lines: ["오늘의 상태를 가볍게 확인하고", "다음 활동의 시작점을 만듭니다."] },
  { n: "02", color: "#4e85f1", title: "활동 선택", lines: ["언어 연습, 일상 대화, 말 운동, 노래,", "게임 중 필요한 활동을 고릅니다."] },
  { n: "03", color: "#49c2ae", title: "반복 연습", lines: ["AI 안내와 함께 자신의 속도에", "맞춰 차분히 연습을 이어갑니다."] },
  { n: "04", color: "#f96a7c", title: "기록 확인", lines: ["회차별 참여 내용과 수행 기록을", "확인하고 이전 활동과 비교합니다."] },
  { n: "05", color: "#ad8bfc", title: "함께 관리", lines: ["담당자 피드백과 다음 활동 제안이", "다시 일상 속 활동으로 이어집니다."] },
];

const coreActivities = [
  {
    tag: "브레니",
    tagGradient: "linear-gradient(180deg,#f09b79,#fac06c)",
    bgTint: "rgba(240,155,121,0.1)",
    title: "자가 확인",
    lines: ["익숙한 생활 공간을 바탕으로 현재의", "말하기 · 언어 활동을 확인하는 시작 기능입니다."],
    img: "/images/brain-friends/core-activities/self-check.png",
  },
  {
    tag: "스피키",
    tagGradient: "linear-gradient(180deg,#4e85f1,#4db3f9)",
    bgTint: "rgba(78,133,241,0.1)",
    title: "언어 연습",
    lines: ["듣기, 따라말하기, 단어 이해, 이름 말하기,", "상황 설명, 문장 읽기를 단계별로 이어갑니다."],
    img: "/images/brain-friends/core-activities/language.png",
  },
  {
    tag: "핸디 · 해내미",
    tagGradient: "linear-gradient(0deg,#b6bbfe,#ad8bfc)",
    bgTint: "rgba(173,139,252,0.1)",
    title: "일상 대화 연습",
    lines: ["마트, 카페, 병원, 도서관처럼 실제 생활 상황을", "선택하고 AI와 대화를 연습합니다."],
    img: "/images/brain-friends/core-activities/daily-talk.png",
  },
  {
    tag: "따미",
    tagGradient: "linear-gradient(180deg,#49c2ae,#59d682)",
    bgTint: "rgba(73,194,174,0.1)",
    title: "노래 연습",
    lines: ["리듬과 멜로디를 활용해 부담 없이 참여하고", "자연스럽게 반복 활동을 이어갑니다."],
    img: "/images/brain-friends/core-activities/song.png",
  },
  {
    tag: "브레니",
    tagGradient: "linear-gradient(180deg,#f09b79,#fac06c)",
    bgTint: "rgba(240,155,121,0.1)",
    title: "말 운동 연습",
    lines: ["모음, 자음, 소리 구별, 호흡 활동을 원하는", "순서로 선택하고 반복한 기록을 확인합니다."],
    img: "/images/brain-friends/core-activities/mouth.png",
  },
  {
    tag: "핸디",
    tagGradient: "linear-gradient(180deg,#f96a7c,#f5ab9b)",
    bgTint: "rgba(249,106,124,0.1)",
    title: "게임 모드",
    lines: ["언어 게임, 손동작, 인지 활동을 게임처럼", "가볍게 반복하며 꾸준한 참여를 돕습니다."],
    img: "/images/brain-friends/core-activities/game.png",
  },
];

const lifestyleTop = [
  { img: "/images/brain-friends/lifestyle/home.png",     title: "우리 집", sub: "편안한 공간에서 시작" },
  { img: "/images/brain-friends/lifestyle/cafe.png",     title: "카페",    sub: "주문과 대화 연습" },
  { img: "/images/brain-friends/lifestyle/mart.png",     title: "마트",    sub: "계산하기와 물건 찾기" },
  { img: "/images/brain-friends/lifestyle/park.png",     title: "공원",    sub: "일상 표현 연습" },
  { img: "/images/brain-friends/lifestyle/bank.png",     title: "은행",    sub: "안내 듣기와 말하기" },
  { img: "/images/brain-friends/lifestyle/hospital.png", title: "병원",    sub: "접수와 응답 연습" },
];

const lifestyleBottom = [
  { title: "말하기 도움 (AAC)", desc: "말이 바로 나오지 않을 때 필요한 표현을 쉽게 선택해 음성으로 전달할 수 있도록 돕는 보조 기능입니다." },
  { title: "구강 운동", desc: "말하기 활동 전에 입술 · 볼 · 혀 주변을 가볍게 움직이며 준비할 수 있는 기능입니다." },
];

const keyDifferences = [
  { n: "01", color: "#ad8bfc", tint: "rgba(182,187,254,0.1)", title: "AI 멀티모달 기술", lines: ["음성과 안면 움직임을", "함께 활용합니다."] },
  { n: "02", color: "#f09b79", tint: "rgba(250,192,108,0.1)", title: "현장 기반 콘텐츠", lines: ["실제 사용 환경에 필요한", "활동을 설계합니다."] },
  { n: "03", color: "#4e85f1", tint: "rgba(77,179,249,0.1)",  title: "개인에 맞춘 반복", lines: ["필요한 활동을 선택해", "충분히 반복합니다."] },
  { n: "04", color: "#49c2ae", tint: "rgba(89,214,130,0.1)",  title: "기관 · 가정 연계", lines: ["기관에서 시작한 연습을", "일상으로 연결합니다."] },
];

const reservationSteps = [
  { img: "/images/brain-friends/reservation/step-1-reserve.png",  title: "기관 상담 예약", lines: ["연결 기관과", "가능한 일정을 확인"] },
  { img: "/images/brain-friends/reservation/step-2-visit.png",    title: "기관 방문",     lines: ["예약한 일정에 맞춰", "기관에서 시작"] },
  { img: "/images/brain-friends/reservation/step-3-activity.png", title: "기관에서 활동", lines: ["필요한 말하기 · 언어", "활동 진행"] },
  { img: "/images/brain-friends/reservation/step-4-home.png",     title: "가정에서 이어하기", lines: ["집에서도 필요한", "활동을 반복"] },
  { img: "/images/brain-friends/reservation/step-5-record.png",   title: "기록 관리",     lines: ["최근 활동과", "누적 기록을 확인"] },
  { img: "/images/brain-friends/reservation/step-6-connect.png",  title: "담당자와 연결", lines: ["필요한 안내와", "다음 활동으로 연결"] },
];

const characters = [
  { img: "/images/brain-friends/characters/breni.svg",   role: "THINK",           roleColor: "#f09b79", name: "브레니", desc: ["생각과 시작을 상징하는", "대표 캐릭터"] },
  { img: "/images/brain-friends/characters/speaky.svg",  role: "SPEAK",           roleColor: "#4e85f1", name: "스피키", desc: ["말과 소통을 상징하는", "언어 파트너"] },
  { img: "/images/brain-friends/characters/ttami.svg",   role: "TRY",             roleColor: "#49c2ae", name: "따미",   desc: ["반복과 꾸준한 시도를", "상징하는 친구"] },
  { img: "/images/brain-friends/characters/handy.svg",   role: "MOVE",            roleColor: "#f96a7c", name: "핸디",   desc: ["움직임과 참여를", "상징하는 활동 파트너"] },
  { img: "/images/brain-friends/characters/haenaemi.svg",role: "GUIDE · SUPPORT", roleColor: "#ad8bfc", name: "해내미", desc: ["AI 안내와 지원을", "상징하는 연결 파트너"] },
];

// Figma 3499:8449 - 서비스 화면 스크린샷 5장 (상단 2, 하단 3)
const inServiceShots = {
  top: [
    { img: "/images/brain-friends/character-in-service/breni.png",  name: "브레니", dot: "#f09b79" },
    { img: "/images/brain-friends/character-in-service/speaky.png", name: "스피키", dot: "#4e85f1" },
  ],
  bottom: [
    { img: "/images/brain-friends/character-in-service/ttami.png",    name: "따미",   dot: "#49c2ae" },
    { img: "/images/brain-friends/character-in-service/handy.png",    name: "핸디",   dot: "#f96a7c" },
    { img: "/images/brain-friends/character-in-service/haenaemi.png", name: "해내미", dot: "#ad8bfc" },
  ],
};

/* ---------- 예약 → 일상 흐름 (인터랙션: 큰 카드가 왼→오 순환) ---------- */
function ReservationTimeline() {
  const [active, setActive] = useState(3);
  useEffect(() => {
    const id = setInterval(() => {
      setActive((v) => (v + 1) % reservationSteps.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-6 lg:gap-[20px] w-full">
      {/* 데스크톱: Figma 프로토타입 스펙 그대로 — 작은 카드 205.6px, 큰 카드 304px, gap 20px.
          카드 폭이 고정이라 다른 카드는 활성 상태 변화에도 절대 움직이지 않음.
          컨테이너보다 넓어지면 가로 스크롤(narrow 뷰포트 대비). min-h 로 프레임 배경도 고정. */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="flex gap-[20px] items-center min-h-[380px] w-max mx-auto">
          {reservationSteps.map((s, i) => {
            const isActive = i === active;
            const smooth = "transition-all duration-[900ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]";
            return (
              <div
                key={s.title}
                className={`bg-white rounded-[20px] shadow-[0_0_20px_rgba(0,0,0,0.08)] flex flex-col items-center gap-[12px] px-[40px] py-[20px] shrink-0 ${smooth} ${
                  isActive ? "w-[304px]" : "w-[205.6px]"
                }`}
              >
              <div className={`relative shrink-0 ${smooth} ${isActive ? "size-[180px]" : "size-[120px]"}`}>
                <Image src={s.img} alt={s.title} fill className="object-contain" sizes="180px" />
              </div>
              <div className="flex flex-col gap-[4px] items-center w-full">
                <p
                  className={`font-bold text-[#000c26] tracking-[-0.48px] leading-[1.4] whitespace-nowrap ${smooth} ${
                    isActive ? "text-[32px] tracking-[-0.64px]" : "text-[24px]"
                  }`}
                >
                  {s.title}
                </p>
                <div
                  className={`font-medium text-[#44474f] text-center leading-[1.4] ${smooth} ${
                    isActive ? "text-[24px] tracking-[-0.48px]" : "text-[16px] tracking-[-0.32px]"
                  }`}
                >
                  <p>{s.lines[0]}</p>
                  <p>{s.lines[1]}</p>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* 모바일/태블릿: 가로 스크롤 */}
      <div className="lg:hidden -mx-6 md:-mx-12 px-6 md:px-12 overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-2">
          {reservationSteps.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-[20px] shadow-[0_0_20px_rgba(0,0,0,0.08)] flex flex-col items-center gap-3 px-6 py-4 w-[180px] shrink-0"
            >
              <div className="relative size-[100px] shrink-0">
                <Image src={s.img} alt={s.title} fill className="object-contain" sizes="100px" />
              </div>
              <div className="flex flex-col gap-1 items-center w-full">
                <p className="font-bold text-[#000c26] text-[18px] tracking-[-0.32px] leading-[1.4] whitespace-nowrap">{s.title}</p>
                <div className="font-medium text-[#44474f] text-center text-[13px] leading-[1.4]">
                  <p>{s.lines[0]}</p>
                  <p>{s.lines[1]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BrainFriendsPage() {
  return (
    <div className="flex flex-col items-start min-h-screen bg-white">
      <Header />
      <main className="flex flex-col w-full pt-[72px] lg:pt-[104px]">

        {/* ============ 1. HERO ============ */}
        <section className="relative w-full bg-white overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -top-[303px] -right-[281px] size-[500px] rounded-full bg-[rgba(249,106,124,0.10)] blur-[60px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-[256px] left-1/2 size-[360px] rounded-full bg-[rgba(78,133,241,0.10)] blur-[50px]" />
          <div aria-hidden className="pointer-events-none absolute -top-[250px] -right-[29px] size-[500px] rounded-full bg-[rgba(240,155,121,0.10)] blur-[60px]" />

          <div className={`${sectionContainer} relative py-14 lg:min-h-[566px] lg:py-0 lg:flex lg:items-center`}>
            <FadeInUp className="flex flex-col gap-6 lg:gap-[32px] max-w-[779px]">
              <div className="flex flex-col gap-3 lg:gap-[15px]">
                <p className="font-bold text-[13px] lg:text-[15px] tracking-[2px] uppercase text-[#f09b79] leading-[22.5px]">
                  기관에서 시작해 일상까지 이어지는 AI 말하기·언어 활동 서비스
                </p>
                <h1 className="font-bold text-[36px] md:text-[52px] lg:text-[64px] text-black leading-[1.06]">
                  <span className="block">AI와 말하고, 기억하며</span>
                  <span className="block">
                    <span>일상을 이어가는 </span>
                    <span
                      className="bg-clip-text text-transparent"
                      style={{ backgroundImage: "linear-gradient(90deg,#49c2ae 0%,#59d682 56.7%,#4db3f9 75.5%,#4e85f1 100%)" }}
                    >
                      브레인프렌즈
                    </span>
                  </span>
                </h1>
                <p className="font-medium text-[15px] lg:text-[20px] text-black leading-[1.4] pt-2 max-w-[600px]">
                  자가 확인부터 언어 · 말 운동 · 일상 대화 · 노래 · 게임까지
                  <br />
                  활동 기록과 담당자 피드백을 하나의 흐름으로 연결합니다.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-[24px]">
                <a
                  href={BRAIN_FRIENDS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-w-[220px] px-[48px] lg:px-[64px] py-[18px] lg:py-[24px] rounded-[12px] text-white font-semibold text-[16px] lg:text-[20px] tracking-[0.32px] shadow-[0_10px_24px_-8px_rgba(249,106,124,0.5)] transition-transform hover:-translate-y-0.5"
                  style={{ backgroundImage: "linear-gradient(180deg,#f5ab9b,#f96a7c)" }}
                >
                  브레인프렌즈로 이동하기
                </a>
                <a
                  href={RESERVATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-w-[220px] px-[48px] lg:px-[66px] py-[18px] lg:py-[26px] rounded-[12px] border-2 border-[#737373] text-[#737373] font-bold text-[16px] lg:text-[20px] tracking-[0.32px] transition-colors hover:bg-[#737373] hover:text-white"
                >
                  상담 예약하기
                </a>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* ============ 2. OVERVIEW ============
            Figma spec (row 1524px): 카드 폭 276/304/276/294/294, 패딩 40, pill 42×42, 카드 높이 216, gap 20.
            이 섹션만 컨테이너 좌우 padding 을 크게 줄여 카드 wrap 이 Figma(2줄) 에 최대한 가깝게 유지. */}
        <section className="w-full bg-[#f7f9fb]">
          <div className="w-full max-w-[1764px] mx-auto px-6 md:px-12 lg:px-[20px] py-14 lg:py-[96px] flex flex-col items-center gap-10 lg:gap-[56px]">
            <FadeInUp className="flex flex-col items-center gap-3 lg:gap-[12px] text-center">
              <div className="flex flex-col items-center gap-2 lg:gap-[8px]">
                <p className={`${eyebrow} text-[#f96a7c]`}>OVERVIEW</p>
                <h2 className={heading2}>브레인프렌즈 한눈에 보기</h2>
              </div>
              <p className={subtitle}>자가 확인부터 활동 기록과 피드백까지, 하나의 흐름으로 자연스럽게 이어집니다.</p>
            </FadeInUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[276fr_304fr_276fr_294fr_294fr] gap-4 lg:gap-[20px] w-full max-w-[1524px]">
              {overviewSteps.map((s, i) => (
                <FadeInSide key={s.n} from="left" delay={i * 0.1} className="w-full min-w-0">
                  <div className="bg-white rounded-[20px] p-6 lg:p-[40px] flex flex-col items-start gap-2 lg:gap-[8px] h-full lg:min-h-[216px] w-full min-w-0">
                    <div
                      className="size-[42px] rounded-full flex items-center justify-center"
                      style={{ backgroundColor: s.color }}
                    >
                      <span className="text-white text-[16px] font-medium leading-[1.4]">{s.n}</span>
                    </div>
                    <p className="font-bold text-[20px] lg:text-[24px] text-black leading-[1.4]">{s.title}</p>
                    {/* 각 라인 whitespace-nowrap 으로 Figma 처럼 2줄 유지. min-w-0 로 grid cell 폭 초과 시 살짝 넘치더라도 다른 카드는 밀지 않음. */}
                    <div className="font-medium text-[14px] lg:text-[16px] text-black leading-[1.4] tracking-[-0.32px] w-full min-w-0">
                      <p className="whitespace-nowrap">{s.lines[0]}</p>
                      <p className="whitespace-nowrap">{s.lines[1]}</p>
                    </div>
                  </div>
                </FadeInSide>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 3. 6 CORE ACTIVITIES ============ */}
        <section className="w-full bg-white">
          <div className={`${sectionContainer} py-14 lg:py-[56px] flex flex-col items-center gap-10 lg:gap-[40px]`}>
            <FadeInUp className="flex flex-col items-center gap-3 lg:gap-[12px] text-center">
              <div className="flex flex-col items-center gap-2 lg:gap-[8px]">
                <p className={`${eyebrow} text-[#49c2ae]`}>6 CORE ACTIVITIES</p>
                <h2 className={heading2}>브레인프렌즈의 6가지 주요 활동</h2>
              </div>
              <p className={subtitle}>기능을 나열하기보다 실제 사용 흐름 안에서 자연스럽게 연결되도록 설계했습니다.</p>
            </FadeInUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[20px] w-full max-w-[1432px]">
              {coreActivities.map((c, i) => (
                <FadeInScale key={c.title} delay={i * 0.08}>
                  <div
                    className="rounded-[20px] p-6 lg:p-[40px] flex flex-col gap-5 lg:gap-[20px] h-full"
                    style={{ backgroundImage: `linear-gradient(180deg, ${c.bgTint} 0%, #ffffff 100%)` }}
                  >
                    <div className="flex flex-col gap-3 lg:gap-[12px]">
                      <span
                        className="self-start inline-flex items-center px-[20px] py-[8px] rounded-full text-white font-semibold text-[14px] lg:text-[20px] tracking-[-0.4px] leading-[1.4]"
                        style={{ backgroundImage: c.tagGradient }}
                      >
                        {c.tag}
                      </span>
                      <p className="font-bold text-[20px] lg:text-[24px] text-[#000c26] tracking-[-0.48px] leading-[1.4]">{c.title}</p>
                      <div className="font-medium text-[14px] lg:text-[20px] text-[#44474f] tracking-[-0.4px] leading-[1.4]">
                        <p>{c.lines[0]}</p>
                        <p>{c.lines[1]}</p>
                      </div>
                    </div>
                    <div className="relative w-full h-[88px] rounded-[12px] overflow-hidden bg-white">
                      <Image src={c.img} alt={c.title} fill className="object-cover" sizes="(min-width:1024px) 358px, 100vw" />
                    </div>
                  </div>
                </FadeInScale>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 4. LIFESTYLE CONTEXT ============ */}
        <section className="w-full bg-[#f7f9fb]">
          <div className={`${sectionContainer} py-14 lg:py-[80px] flex flex-col items-center gap-10 lg:gap-[40px]`}>
            <FadeInUp className="flex flex-col items-center gap-3 lg:gap-[12px] text-center">
              <div className="flex flex-col items-center gap-2 lg:gap-[8px]">
                <p className={`${eyebrow} text-[#4e85f1]`}>LIFESTYLE CONTEXT</p>
                <h2 className={heading2}>익숙한 일상에서 시작하는 말하기 · 언어 활동</h2>
              </div>
              <p className={subtitle}>기능을 과제처럼 느끼지 않도록, 실제 생활과 연결된 장면에서 차분하게 시작할 수 있습니다.</p>
            </FadeInUp>

            <div className="flex flex-col gap-4 lg:gap-[20px] w-full max-w-[1432px]">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-[20px]">
                {lifestyleTop.map((p) => (
                  <div key={p.title} className="bg-white rounded-[20px] shadow-[0_0_20px_rgba(0,0,0,0.08)] flex flex-col items-center gap-3 lg:gap-[12px] px-6 lg:px-[40px] py-4 lg:py-[20px]">
                    <div className="relative size-[110px] lg:size-[140px] rounded-[12px] overflow-hidden">
                      <Image src={p.img} alt={p.title} fill className="object-cover" sizes="140px" />
                    </div>
                    <div className="flex flex-col items-center gap-1 lg:gap-[4px] w-full">
                      <p className="font-bold text-[18px] lg:text-[24px] text-[#000c26] tracking-[-0.48px] leading-[1.4] whitespace-nowrap">{p.title}</p>
                      <p className="font-medium text-[12px] lg:text-[16px] text-[#44474f] tracking-[-0.32px] leading-[1.4] whitespace-nowrap">{p.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[20px]">
                {lifestyleBottom.map((c) => (
                  <div key={c.title} className="bg-white rounded-[20px] shadow-[0_0_20px_rgba(0,0,0,0.08)] flex flex-col gap-1 lg:gap-[4px] px-6 lg:px-[40px] py-4 lg:py-[20px]">
                    <p className="font-bold text-[18px] lg:text-[24px] text-[#000c26] tracking-[-0.48px] leading-[1.4]">{c.title}</p>
                    <p className="font-medium text-[13px] lg:text-[16px] text-[#44474f] tracking-[-0.32px] leading-[1.4]">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ 5. KEY DIFFERENCE ============ */}
        <section className="w-full bg-white">
          <div className={`${sectionContainer} py-14 lg:py-[96px] flex flex-col items-center gap-10 lg:gap-[56px]`}>
            <FadeInUp className="flex flex-col items-center gap-3 lg:gap-[12px] text-center">
              <div className="flex flex-col items-center gap-2 lg:gap-[8px]">
                <p className={`${eyebrow} text-[#ad8bfc]`}>KEY DIFFERENCE</p>
                <h2 className={heading2}>브레인프렌즈의 핵심 차별성</h2>
              </div>
              <p className={subtitle}>사용자의 속도와 환경에 맞춰 단계적으로 이어갑니다.</p>
            </FadeInUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-[20px] w-full max-w-[1077px]">
              {keyDifferences.map((d, i) => (
                <FadeInSide key={d.n} from="left" delay={i * 0.1}>
                  <div
                    className="rounded-[20px] p-8 lg:p-[40px] flex flex-col items-center gap-3 lg:gap-[12px] h-full lg:h-[216px] text-center"
                    style={{ backgroundColor: d.tint }}
                  >
                    <div className="size-[42px] rounded-full flex items-center justify-center" style={{ backgroundColor: d.color }}>
                      <span className="text-white text-[16px] font-medium leading-[1.4]">{d.n}</span>
                    </div>
                    <p className="font-bold text-[20px] lg:text-[24px] text-black leading-[1.4]">{d.title}</p>
                    <div className="font-medium text-[14px] lg:text-[16px] text-black leading-[1.4]">
                      <p>{d.lines[0]}</p>
                      <p>{d.lines[1]}</p>
                    </div>
                  </div>
                </FadeInSide>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 6. RESERVATION TO DAILY PRACTICE ============ */}
        <section className="w-full bg-[#f7f9fb]">
          <div className={`${sectionContainer} py-14 lg:py-[80px] flex flex-col items-center gap-10 lg:gap-[40px]`}>
            <FadeInUp className="flex flex-col items-center gap-3 lg:gap-[12px] text-center">
              <div className="flex flex-col items-center gap-2 lg:gap-[8px]">
                <p className={`${eyebrow} text-[#f09b79]`}>RESERVATION TO DAILY PRACTICE</p>
                <h2 className={heading2}>예약부터 방문, 집에서의 연습과 기록 관리까지</h2>
              </div>
              <p className={subtitle}>기관과 사용자의 일정을 연결하고 활동의 전 과정을 하나의 흐름으로 이어갑니다.</p>
            </FadeInUp>

            <div className="w-full max-w-[1432px]">
              <ReservationTimeline />
            </div>
          </div>
        </section>

        {/* ============ 7. RECORD & FEEDBACK ============ */}
        <section className="w-full bg-white">
          <div className={`${sectionContainer} py-14 lg:py-[96px] flex flex-col items-center gap-10 lg:gap-[56px]`}>
            <FadeInUp className="flex flex-col items-center gap-3 lg:gap-[12px] text-center">
              <div className="flex flex-col items-center gap-2 lg:gap-[8px]">
                <p className={`${eyebrow} text-[#49c2ae]`}>RECORD &amp; FEEDBACK</p>
                <h2 className={heading2}>활동은 기록으로 남고, 피드백으로 이어집니다</h2>
              </div>
              <p className={subtitle}>피드백을 통해 사용자와 담당자가 어떻게 연결되는지 관계 중심으로 설명합니다.</p>
            </FadeInUp>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-[20px] items-center w-full max-w-[1200px]">
              <FadeInSide from="left" className="flex-1 w-full lg:w-auto">
              <div className="rounded-[20px] p-8 lg:p-[40px] flex flex-col gap-6 lg:gap-[24px] h-full" style={{ backgroundColor: "rgba(77,179,249,0.05)" }}>
                <div className="flex flex-col gap-3 lg:gap-[12px]">
                  <span
                    className="self-start inline-flex px-[20px] py-[10px] rounded-full text-white font-bold text-[16px] leading-[1.4]"
                    style={{ backgroundImage: "linear-gradient(180deg,#4db3f9,#4e85f1)" }}
                  >
                    사용자
                  </span>
                  <h3 className="font-bold text-[24px] lg:text-[32px] text-black leading-[1.4]">
                    활동을 이어가고
                    <br />
                    기록을 확인해요
                  </h3>
                  <p className="font-normal text-[16px] lg:text-[24px] text-black leading-[1.4]">
                    오늘 한 활동과 최근 기록을 확인하며
                    <br />
                    다음 활동을 이어갑니다.
                  </p>
                </div>
                <div className="flex flex-col gap-4 lg:gap-[20px] w-full max-w-[383px]">
                  {[
                    { t: "활동 기록", d: "회차별 참여 내용과 수행 기록 확인" },
                    { t: "최근 활동", d: "최근에 진행한 활동을 다시 확인" },
                    { t: "다음 활동", d: "이어갈 활동을 쉽게 찾고 시작" },
                  ].map((row, i, arr) => (
                    <div key={row.t} className="flex flex-col gap-2">
                      <p className="font-bold text-[18px] lg:text-[24px] text-[#3d3d3d] leading-[1.4]">{row.t}</p>
                      <p className="font-normal text-[13px] lg:text-[16px] text-[#737373] leading-[1.4]">{row.d}</p>
                      {i < arr.length - 1 && <div className="h-px w-full bg-[rgba(77,179,249,0.35)] mt-3" />}
                    </div>
                  ))}
                </div>
              </div>
              </FadeInSide>

              <FadeInUp className="shrink-0 lg:w-[203px]" delay={0.15}>
              <div className="flex flex-col items-center gap-3 lg:gap-[12px]">
                <p className="font-normal text-[13px] lg:text-[16px] text-[#737373] leading-[1.4]">RECORD TO FEEDBACK</p>
                <div className="relative w-[140px] h-[24px] lg:w-[203px] lg:h-[32px]">
                  <Image src="/images/brain-friends/record/arrow.svg" alt="" fill className="object-contain" sizes="203px" />
                </div>
                <p className="font-bold text-[18px] lg:text-[24px] text-[#3d3d3d] text-center leading-[1.4]">
                  기록이
                  <br />
                  다음 활동으로
                  <br />
                  이어집니다
                </p>
              </div>
              </FadeInUp>

              <FadeInSide from="right" className="flex-1 w-full lg:w-auto">
              <div className="rounded-[20px] p-8 lg:p-[40px] flex flex-col gap-6 lg:gap-[24px] h-full" style={{ backgroundColor: "rgba(89,214,130,0.05)" }}>
                <div className="flex flex-col gap-3 lg:gap-[12px]">
                  <span
                    className="self-start inline-flex px-[20px] py-[10px] rounded-full text-white font-bold text-[16px] leading-[1.4]"
                    style={{ backgroundImage: "linear-gradient(180deg,#59d682,#49c2ae)" }}
                  >
                    담당자
                  </span>
                  <h3 className="font-bold text-[24px] lg:text-[32px] text-black leading-[1.4]">
                    기록을 확인하고
                    <br />
                    필요한 안내를 남겨요
                  </h3>
                  <p className="font-normal text-[16px] lg:text-[24px] text-black leading-[1.4]">
                    사용자의 활동 기록을 확인하고,
                    <br />
                    간단한 피드백과 다음 활동을 연결합니다.
                  </p>
                </div>
                <div className="flex flex-col gap-4 lg:gap-[20px] w-full max-w-[383px]">
                  {[
                    { t: "활동 확인", d: "사용자의 최근 활동과 참여 흐름 확인" },
                    { t: "담당자 피드백", d: "다음 활동에 도움이 되는 짧은 안내 제공" },
                    { t: "활동 연결", d: "필요한 활동을 다음 단계로 자연스럽게 연결" },
                  ].map((row, i, arr) => (
                    <div key={row.t} className="flex flex-col gap-2">
                      <p className="font-bold text-[18px] lg:text-[24px] text-[#3d3d3d] leading-[1.4]">{row.t}</p>
                      <p className="font-normal text-[13px] lg:text-[16px] text-[#737373] leading-[1.4]">{row.d}</p>
                      {i < arr.length - 1 && <div className="h-px w-full bg-[rgba(89,214,130,0.35)] mt-3" />}
                    </div>
                  ))}
                </div>
              </div>
              </FadeInSide>
            </div>
          </div>
        </section>

        {/* ============ 8. CHARACTERS ============ */}
        <section className="w-full bg-[#f5fafe]">
          <div className={`${sectionContainer} py-14 lg:py-[80px] flex flex-col items-center gap-10 lg:gap-[80px]`}>
            <FadeInUp className="flex flex-col items-center gap-3 lg:gap-[12px] text-center">
              <div className="flex flex-col items-center gap-2 lg:gap-[8px]">
                <p className={`${eyebrow} text-[#4e85f1]`}>CHARACTERS</p>
                <h2 className={heading2}>함께하는 다섯 친구</h2>
              </div>
              <p className={subtitle}>생각하고, 말하고, 시도하고, 움직이는 모든 순간에 AI와 브레인프렌즈가 함께합니다.</p>
            </FadeInUp>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-[80px] w-full max-w-[1432px] place-items-center">
              {characters.map((c, i) => (
                <FadeInScale key={c.name} delay={i * 0.09}>
                  <div className="flex flex-col items-center gap-6 lg:gap-[32px] w-[160px] lg:w-[200px]">
                    <div className="relative w-full h-[140px] lg:h-[214px] flex items-center justify-center">
                      <Image src={c.img} alt={c.name} width={180} height={180} className="w-auto h-full object-contain" />
                    </div>
                    <div className="flex flex-col items-center gap-2 lg:gap-[8px]">
                      <div className="flex flex-col items-center gap-1 lg:gap-[8px]">
                        <p className={`${eyebrow} text-center whitespace-nowrap`} style={{ color: c.roleColor }}>
                          {c.role}
                        </p>
                        <p className="font-bold text-[22px] lg:text-[32px] text-[#1e1b13] tracking-[-0.32px] leading-[1.375] lg:leading-[44px]">{c.name}</p>
                      </div>
                      <div className="font-medium text-[13px] lg:text-[20px] text-black text-center leading-[1.4]">
                        <p>{c.desc[0]}</p>
                        <p>{c.desc[1]}</p>
                      </div>
                    </div>
                  </div>
                </FadeInScale>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 9. CHARACTER IN SERVICE (Figma 3499:8449) ============
            섹션 스펙(1920×1034): 텍스트 450×244 @ (143,183), 카드 group 1212×866 @ (565,84).
            상단 2장(495×371)은 group 우측 정렬(offset 190), 하단 3장(426/430/340×371)은 좌측 24px 넘침.
            좌측 하단 큰 핑크 원(2028×2020, 33° 회전)이 배경 장식으로 살짝 보임. */}
        <section className="relative w-full bg-white overflow-hidden">
          {/* 배경 핑크 원 데코 - Figma Ellipse 980 (fill #F5AB9B opacity 0.1) 그대로.
              원본 SVG 1477×1448 를 33.16° 회전, 센터는 (0, 1420) 위치. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              src="/images/brain-friends/character-in-service/ellipse-bg.svg"
              alt=""
              className="absolute select-none max-w-none"
              style={{
                width: "1477.13px",
                height: "1448px",
                left: "-738.565px",
                top: "calc(100% - 338px)",
                transform: "rotate(33.16deg)",
                transformOrigin: "50% 50%",
              }}
            />
          </div>

          <div className={`${sectionContainer} relative py-14 lg:py-[96px]`}>
            <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-[60px] max-w-[1432px] mx-auto">
              {/* 좌측 텍스트 - Figma spec: width 450, top offset 99px(=183-84) 으로 카드보다 살짝 내려서 정렬 */}
              <FadeInUp className="lg:w-[460px] lg:flex-shrink-0 lg:pt-[80px]">
                <div className="flex flex-col gap-3 lg:gap-[12px] items-start text-left">
                  <div className="flex flex-col gap-2 lg:gap-[8px] items-start">
                    <p className={`${eyebrow} text-[#f96a7c]`}>Character in Service</p>
                    <h2 className={`${heading2} text-left`}>
                      서비스 안에서도
                      <br />
                      이어지는 브레인프렌즈 친구들
                    </h2>
                  </div>
                  <div className="font-medium text-[14px] lg:text-[20px] text-black leading-[1.4] text-left">
                    <p>브레인프렌즈의 캐릭터는 각자의 개성과</p>
                    <p>컬러를 유지한 채 서비스 안에서도 자연스럽게 이어집니다.</p>
                    <p>실제 화면 속에서 하나의 브랜드 경험으로 연결되며,</p>
                    <p>친근하고 일관된 인상을 만듭니다.</p>
                  </div>
                </div>
              </FadeInUp>

              {/* 우측 스크린샷 - 두 row 모두 우측 정렬(items-end). 상단은 조금 좁고, 하단은 살짝 넓다. */}
              <div className="flex-1 min-w-0 flex flex-col gap-6 lg:gap-[40px] items-stretch lg:items-end w-full">
                {/* 상단 2장: Figma 1022/1236 ≈ 82.7% 폭 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-[32px] w-full lg:w-[82.7%]">
                  {inServiceShots.top.map((s, i) => (
                    <FadeInScale key={s.name} delay={i * 0.1} className="w-full">
                      <div className="flex flex-col items-center gap-4 lg:gap-[20px]">
                        <div className="relative w-full aspect-[495/371] rounded-[20px] shadow-[0_4px_80px_rgba(0,0,0,0.10)] overflow-hidden bg-white">
                          <Image src={s.img} alt={s.name} fill className="object-cover" sizes="(min-width:1024px) 495px, 100vw" />
                        </div>
                        <div className="flex items-center gap-3 lg:gap-[12px]">
                          <span className="inline-block size-[16px] lg:size-[20px] rounded-full" style={{ backgroundColor: s.dot }} />
                          <p className="font-bold text-[16px] lg:text-[20px] tracking-[-0.6px] text-[#747e94] leading-[1.1]">{s.name}</p>
                        </div>
                      </div>
                    </FadeInScale>
                  ))}
                </div>
                {/* 하단 3장: Figma 폭 비율 426:430:340 그대로 사용, gap 20 */}
                <div className="grid grid-cols-1 sm:grid-cols-[426fr_430fr_340fr] gap-6 lg:gap-[20px] w-full">
                  {inServiceShots.bottom.map((s, i) => {
                    // 각 카드의 원본 폭(가로/세로 371) - aspect ratio 유지
                    const w = i === 0 ? 426 : i === 1 ? 430 : 340;
                    return (
                      <FadeInScale key={s.name} delay={0.15 + i * 0.1} className="w-full">
                        <div className="flex flex-col items-center gap-4 lg:gap-[20px]">
                          <div
                            className="relative w-full rounded-[20px] shadow-[0_4px_80px_rgba(0,0,0,0.10)] overflow-hidden bg-white"
                            style={{ aspectRatio: `${w}/371` }}
                          >
                            <Image src={s.img} alt={s.name} fill className="object-cover" sizes="(min-width:1024px) 430px, 100vw" />
                          </div>
                          <div className="flex items-center gap-3 lg:gap-[12px]">
                            <span className="inline-block size-[16px] lg:size-[20px] rounded-full" style={{ backgroundColor: s.dot }} />
                            <p className="font-bold text-[16px] lg:text-[20px] tracking-[-0.6px] text-[#747e94] leading-[1.1]">{s.name}</p>
                          </div>
                        </div>
                      </FadeInScale>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 10. CTA ============ */}
        <section className="w-full bg-[#f7f9fb]">
          <div className={`${sectionContainer} py-14 lg:py-[80px] flex flex-col items-center`}>
            <div className="w-full max-w-[1432px] bg-white rounded-[20px] shadow-[0_0_40px_rgba(0,0,0,0.10)] px-6 md:px-12 lg:px-[80px] py-10 lg:py-[40px] flex flex-col items-center gap-6 lg:gap-[20px]">
              <div className="flex flex-col items-center gap-8 lg:gap-[32px] w-full">
                <div className="flex flex-col items-center gap-3 lg:gap-[12px] text-center">
                  <h2 className="font-bold text-[24px] lg:text-[40px] text-black leading-[1.4]">
                    브레인프렌즈와 함께
                    <br className="hidden sm:block" /> 말하기 · 언어 활동의 연결을 시작해 보세요
                  </h2>
                  <p className="font-medium text-[14px] lg:text-[20px] text-black leading-[1.4] max-w-[720px]">
                    기관 상담 예약부터 도입 문의까지, 브레인프렌즈의 연결된 이용 흐름을 안내해드립니다.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-[24px] w-full sm:w-auto">
                  <Link
                    href={CONTACT_URL}
                    className="inline-flex items-center justify-center min-w-[220px] px-[48px] lg:px-[64px] py-[18px] lg:py-[24px] rounded-[12px] text-white font-semibold text-[16px] lg:text-[20px] tracking-[0.32px] shadow-[0_10px_24px_-8px_rgba(249,106,124,0.5)] transition-transform hover:-translate-y-0.5"
                    style={{ backgroundImage: "linear-gradient(180deg,#f5ab9b,#f96a7c)" }}
                  >
                    기관 도입 문의
                  </Link>
                  <a
                    href={RESERVATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center min-w-[220px] px-[48px] lg:px-[66px] py-[18px] lg:py-[26px] rounded-[12px] border-2 border-[#737373] text-[#737373] font-bold text-[16px] lg:text-[20px] tracking-[0.32px] transition-colors hover:bg-[#737373] hover:text-white"
                  >
                    상담 예약하기
                  </a>
                </div>
              </div>
              <p className="font-medium text-[12px] lg:text-[16px] text-[#b3b3b3] text-center leading-[1.4]">
                브레인프렌즈의 활동 결과는 수행 내용을 위한 참고 정보이며 의학적 진단 처방을 대체하지 않습니다.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

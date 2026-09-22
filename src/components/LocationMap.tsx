"use client";

/* 네이버 지도 JS API 는 공식 타입 패키지를 배포하지 않아, 전역 naver 객체는
   이 파일 경계에서만 any 로 다룬다. */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useRef, useState } from "react";
import Script from "next/script";

// 네이버 클라우드 플랫폼 "Maps"(신규 상품) 방식.
// 구 AI NAVER API 의 ncpClientId / openapi.map.naver.com 조합은 인증이 통과되지 않는다.
// 신규 신청은 2025-05-22 에 종료됐고 기존 키도 이 주소로만 동작한다.
const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID ?? "";
const SCRIPT_SRC = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${CLIENT_ID}&submodules=geocoder`;

type Props = {
  /** 도로명 주소. 좌표는 geocoder 로 변환하므로 별도 위경도가 필요 없다. */
  address: string;
  /** 마커에 표시할 이름 */
  label: string;
  /** 지도 확대 수준 */
  zoom?: number;
};

export default function LocationMap({ address, label, zoom = 17 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  const initMap = useCallback(() => {
    const startedAt = Date.now();

    const run = () => {
      const naver = (window as any).naver;
      const container = containerRef.current;
      if (!container) return;

      // geocoder 는 서브모듈이라 maps.js 가 실행된 뒤에 따로 내려온다.
      // onReady 시점에는 아직 naver.maps.Service 가 없을 수 있어 붙을 때까지 기다린다.
      if (!naver?.maps?.Service) {
        if (Date.now() - startedAt > 8000) {
          setFailed(true);
          return;
        }
        window.setTimeout(run, 100);
        return;
      }

      // 주소 -> 좌표. 인증 실패(등록되지 않은 도메인)나 검색 실패면 안내 문구로 대체한다.
      naver.maps.Service.geocode({ query: address }, (status: unknown, response: any) => {
        const item = response?.v2?.addresses?.[0];
        if (status !== naver.maps.Service.Status.OK || !item) {
          setFailed(true);
          return;
        }

        const position = new naver.maps.LatLng(Number(item.y), Number(item.x));
        const map = new naver.maps.Map(container, {
          center: position,
          zoom,
          // 페이지를 스크롤하다 지도 위에서 휠이 먹히면 흐름이 끊겨서 꺼둔다.
          scrollWheel: false,
          zoomControl: true,
          zoomControlOptions: { position: naver.maps.Position.TOP_RIGHT },
        });

        new naver.maps.Marker({ position, map, title: label });
      });
    };

    run();
  }, [address, label, zoom]);

  // 키가 없으면 스크립트를 불러봐야 인증 오류만 난다. 바로 대체 화면으로 간다.
  if (!CLIENT_ID || failed) {
    return <MapFallback address={address} />;
  }

  return (
    <>
      <Script
        src={SCRIPT_SRC}
        strategy="afterInteractive"
        onReady={initMap}
        onError={() => setFailed(true)}
      />
      <div ref={containerRef} className="w-full h-full" />
    </>
  );
}

/** 지도를 못 띄우는 상황에서도 찾아오는 길이 끊기지 않도록 네이버 지도로 연결한다. */
function MapFallback({ address }: { address: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#fbf7ef] px-6 text-center">
      <p className="font-medium text-[14px] lg:text-[16px] text-[#44474f]">{address}</p>
      <a
        href={`https://map.naver.com/p/search/${encodeURIComponent(address)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-[14px] lg:text-[16px] text-[#a8481a] underline underline-offset-4"
      >
        네이버 지도에서 보기
      </a>
    </div>
  );
}

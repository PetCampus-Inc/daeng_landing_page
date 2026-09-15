'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * S-04/05/06 공통: 좌우 교차 배치 섹션에서 "탭/스텝이 스크롤 위치에 따라 순차 전환되고,
 * 클릭으로도 이동 가능"한 동작(FR-LP-013)을 구현하는 훅.
 *
 * 각 스텝을 뷰포트 중앙의 얇은 밴드(IntersectionObserver rootMargin)로 감시한다.
 * 페이지를 처음 아래로 지날 때만 더 큰 인덱스로 전환하며, 이미 지난 스텝은 위로
 * 스크롤해도 다시 활성화하지 않는다. 이 진행 기록은 새로고침 시에만 초기화된다.
 * "콘텐츠가 고정된 채 전환"되는 느낌은 sticky 패널 자체(position: sticky)가 만들어주므로,
 * 휠 이벤트를 가로채 스크롤을 강제로 잠그지 않는다 — 트랙패드 관성 스크롤은 non-cancelable
 * wheel 이벤트를 보내 preventDefault가 먹히지 않고, 자연스러운 스크롤과 충돌해 오히려
 * 콘텐츠가 밀리는 것처럼 보이는 문제만 만든다.
 * md 이상(데스크탑/태블릿)에서만 쓰고, 모바일은 클릭 전환만 쓰는 걸 전제로 한다.
 */
export function useScrollLinkedSteps(count: number) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const highestObservedStep = useRef(0);

  const setStepRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      stepRefs.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = stepRefs.current.indexOf(entry.target as HTMLElement);
          if (index <= highestObservedStep.current) return;

          highestObservedStep.current = index;
          setActive((current) => Math.max(current, index));
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [count]);

  // 클릭은 스크롤의 1회성 진행 기록과 별개다. 사용자가 원하는 항목을 직접 확인한 뒤에도
  // 위로 스크롤하는 것만으로 이전 항목이 강제로 활성화되지는 않는다.
  const goTo = useCallback((index: number) => {
    setActive(index);
  }, []);

  return { active, setStepRef, goTo };
}

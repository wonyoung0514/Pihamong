// 좌우로 등장하는 텍스트
const observedElements = document.querySelectorAll(".keyword-text, .deco");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) {
        // 뷰포트 안에 들어오면 show 클래스 추가 (애니메이션 시작)
        el.classList.add("show");
      } else {
        // 벗어나면 다시 초기화 (다음 진입 시 다시 애니메이션 재생)
        el.classList.remove("show");
      }
    });
  },
  { threshold: 0.3 }
);

observedElements.forEach((el) => observer.observe(el));





// 언제쯤 불운이 오려나?
document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector(".notification-sec");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 뷰포트에 들어오면 show 클래스 추가
          target.classList.add("show");
        } else {
          // 벗어나면 show 클래스 제거 → 다음에 다시 진입 시 재생됨
          target.classList.remove("show");
        }
      });
    },
    { threshold: 0.6 }
  );

  observer.observe(target);
});




// 막대 그래프 애니메이션
document.addEventListener("DOMContentLoaded", () => {
  const chart = document.querySelector(".survey-chart");
  const groups = chart ? chart.querySelectorAll(".bar-group") : [];
  if (!chart || groups.length === 0) return;

  // 3위 → 2위 → 1위
  const ordered = [groups[2], groups[1], groups[0]];

  const riseDur   = 0.5;   // 막대 올라오는 시간
  const stagger   = 0.15;  // 항목 간 지연
  const textGap   = 0.05;  // 막대가 다 뜬 뒤 텍스트가 따라오는 간격
  const expandDur = 0.5;   // 1위 확장 시간
  const buffer    = 0.1;   // 다음 액션 전 살짝 대기

  const resetAll = () => {
    groups.forEach((g) => {
      const bar = g.querySelector(".bar");
      const texts = g.querySelectorAll(".label, .percent");
      bar.style.animation = "none";
      texts.forEach((t) => {
        t.style.animation = "none";
        t.style.opacity = "0"; // 텍스트는 기본적으로 숨김
      });
      void bar.offsetHeight; // reflow
    });
  };

  const play = () => {
    resetAll();

    // 3위 → 2위 → 1위 순서로 막대 먼저, 텍스트는 막대 종료 후 나타남
    ordered.forEach((group, idx) => {
      const bar = group.querySelector(".bar");
      const texts = group.querySelectorAll(".label, .percent");

      const delay = idx * stagger;

      // 막대 애니메이션
      bar.style.animation = `rise ${riseDur}s ease-out ${delay}s forwards`;

      // 텍스트 애니메이션: 막대가 끝난 직후에 시작
      const textDelay = delay + riseDur + textGap;
      texts.forEach((t) => {
        t.style.animation = `riseText ${0.5}s ease-out ${textDelay}s forwards`;
      });
    });

    // 모든 막대가 올라온 뒤 1위(보라색)만 추가 확장
    const allBarsDone = (ordered.length - 1) * stagger + riseDur + buffer;
    const topGroup = groups[0]; // DOM상 1위
    const topBar = topGroup.querySelector(".bar.purple");
    if (topBar) {
      const existing = topBar.style.animation && topBar.style.animation !== "none"
        ? topBar.style.animation + ", "
        : "";
      topBar.style.animation = `${existing}expand ${expandDur}s ease-out ${allBarsDone}s forwards`;
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) play();
        else resetAll();
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(chart);
});





// 카드 촤라락!
document.addEventListener("DOMContentLoaded", () => {
  const attCards = document.querySelectorAll(".att-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  attCards.forEach((card) => observer.observe(card));
});







// 불운띠니얌 오늘의 운세는 어떠냥?
document.addEventListener("DOMContentLoaded", () => {
  function observeMockupGroup(groupSelector, itemSelector) {
    const group = document.querySelector(groupSelector);
    const items = document.querySelectorAll(itemSelector);

    if (group === null || items.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting === true) {
            items.forEach((img, index) => {
              // 브라우저가 초기 스타일 렌더링을 끝낸 뒤 다음 프레임에서 실행
              setTimeout(() => {
                requestAnimationFrame(() => {
                  img.classList.add("show");
                });
              }, index * 180);
            });
          } else {
            items.forEach((img) => {
              img.classList.remove("show");
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(group);
  }

  observeMockupGroup(".luck-group-daily", ".mockup-daily");
  observeMockupGroup(".luck-group-monthly", ".mockup-monthly");
});






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
          target.classList.add("show");
        } else {
          target.classList.remove("show");
        }
      });
    },
    {
      threshold: 0.2,        
      rootMargin: "0px 0px -10% 0px" // 아래쪽에서 10% 일찍 감지
    }
  );

  observer.observe(target);
});





// 막대 그래프 애니메이션
document.addEventListener("DOMContentLoaded", () => {
  const chart = document.querySelector(".survey-chart");
  const groups = chart ? chart.querySelectorAll(".bar-group") : [];
  if (!chart || groups.length === 0) return;

  const ordered = [groups[3], groups[2], groups[1], groups[0]];

  const riseDur   = 0.5;
  const stagger   = 0.15;
  const textGap   = 0.05;
  const expandDur = 0.5;
  const imgFadeDur = 0.5;
  const buffer    = 0.1;

  // 초기화
  const resetAll = () => {
    groups.forEach((g) => {
      const bars = g.querySelectorAll(".bar");
      const texts = g.querySelectorAll(".label, .percent");
      const icons = g.querySelectorAll(".bar-icon");

      bars.forEach((bar) => {
        bar.style.animation = "none";
        bar.style.opacity = "0";
      });
      texts.forEach((t) => {
        t.style.animation = "none";
        t.style.opacity = "0";
      });
      icons.forEach((i) => {
        i.style.opacity = "0";
        i.style.transition = "none";
      });
      void g.offsetHeight;
    });
  };

  // 메인 애니메이션
  const play = () => {
    resetAll();

    ordered.forEach((group, idx) => {
      // 퍼센트 박스 제외
      const bars = group.querySelectorAll(".bar:not(.gray-box)");
      const texts = group.querySelectorAll(".label");
      const delay = idx * stagger;

      // 막대 등장
      bars.forEach((bar) => {
        bar.style.animation = `rise ${riseDur}s ease-out ${delay}s forwards`;
      });

      // 일반 텍스트 등장
      const textDelay = delay + riseDur + textGap;
      texts.forEach((t) => {
        t.style.animation = `riseText 0.5s ease-out ${textDelay}s forwards`;
      });
    });

    // 1위 막대 관련 처리
    const allBarsDone = (ordered.length - 1) * stagger + riseDur + buffer;
    const topGroup = groups[0];
    const topBar = topGroup.querySelector(".bar.purple");
    const topIcon = topGroup.querySelector(".bar-icon");
    const percentBox = topGroup.querySelector(".bar.gray-box");
    const percentText = topGroup.querySelector(".percent");

    // 1위 막대 확장
    if (topBar) {
      const existing =
        topBar.style.animation && topBar.style.animation !== "none"
          ? topBar.style.animation + ", "
          : "";
      topBar.style.animation = `${existing}expand ${expandDur}s ease-out ${allBarsDone}s forwards`;
    }

    // 이미지 등장
    if (topIcon) {
      const imgDelay = (allBarsDone + expandDur) * 1000;
      setTimeout(() => {
        topIcon.style.opacity = "1";
        topIcon.style.transition = `opacity ${imgFadeDur}s ease-out`;
      }, imgDelay);

      // 이미지 완전히 나타난 후 퍼센트 박스, 텍스트 등장
      const percentDelay = imgDelay + imgFadeDur * 1000;
      setTimeout(() => {
        if (percentBox) {
          percentBox.style.opacity = "1";
          percentBox.style.animation = `rise ${riseDur}s ease-out forwards`;
        }
        if (percentText) {
          percentText.style.opacity = "1";
          percentText.style.animation = `riseTextPercent 0.5s ease-out forwards`;
        }
      }, percentDelay);
    }
  };

  // 스크롤 트리거
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          play();
        } else {
          resetAll();
        }
      });
    },
    { threshold: 0.4 }
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




// 구름의 이동속도 
window.addEventListener('scroll', function() {
  const insight = document.querySelector('#Insight');
  const leftCloud = insight.querySelector('.left-cloud');
  const rightCloud = insight.querySelector('.right-cloud');
  const text = insight.querySelector('.is-inner');
  const rect = insight.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 구름 애니메이션
  const triggerStart = windowHeight * 0.4; // 0.4 = 화면의 40% 지점
  const distance = windowHeight * 0.8; // 진행되는 거리
  const rawProgress = (windowHeight - rect.top - triggerStart) / distance;
  const progress = Math.min(Math.max(rawProgress, 0), 1);

  // 구름 이동 거리 — 중앙에서 조금만 퍼지게
  const maxMove = 25;

  leftCloud.style.transform = `translateX(-${progress * maxMove}%)`;
  rightCloud.style.transform = `translateX(${progress * maxMove}%)`;
  leftCloud.style.opacity = `${1 - progress * 0.2}`;
  rightCloud.style.opacity = `${1 - progress * 0.2}`;

  // 텍스트 페이드인 트리거
  if (rect.top < windowHeight * 0.3) {
    text.classList.add('visible');
  } else {
    text.classList.remove('visible');
  }
});




// 불운띠니얌 오늘의 운세는 어떠냥?
document.addEventListener("DOMContentLoaded", () => {
  function observeMockupGroup(groupSelector, itemSelector, reverse = false, delayStep = 180) {
    const group = document.querySelector(groupSelector);
    const items = document.querySelectorAll(itemSelector);
    if (!group || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const targetItems = reverse ? Array.from(items).reverse() : items;

          if (entry.isIntersecting) {
            targetItems.forEach((img, index) => {
              setTimeout(() => {
                img.style.visibility = "visible"; // 먼저 보이게
                requestAnimationFrame(() => img.classList.add("show"));
              }, index * delayStep);
            });
          } else {
            targetItems.forEach((img, index) => {
              setTimeout(() => {
                img.classList.remove("show");
                // opacity transition 후 visibility hidden 적용 (0.8s 후)
                setTimeout(() => {
                  if (!img.classList.contains("show")) {
                    img.style.visibility = "hidden";
                  }
                }, 800); // CSS transition-duration과 동일
              }, index * delayStep);
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(group);
  }

  // Daily
  observeMockupGroup(".luck-group-daily", ".mockup-daily", false, 200);
  // Monthly
  observeMockupGroup(".luck-group-monthly", ".mockup-monthly", true, 180);
});





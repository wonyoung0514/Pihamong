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
    { threshold: 0.3 }
  );

  observer.observe(target);
});




// 막대 그래프 애니메이션
document.addEventListener("DOMContentLoaded", () => {
  const groups = document.querySelectorAll(".survey-chart .bar-group");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          groups.forEach((group, i) => {
            const bar = group.querySelector(".bar");
            const texts = group.querySelectorAll(".label, .percent");

            // 애니메이션 초기화
            bar.style.animation = "none";
            texts.forEach((t) => (t.style.animation = "none"));
            bar.offsetHeight; // reflow

            // 막대 애니메이션
            if (bar.classList.contains("purple")) {
              bar.style.animation = `rise 0.8s ease-out forwards, expand 0.7s ease-out 0.8s forwards`;
            } else {
              bar.style.animation = `rise 0.8s ease-out forwards`;
            }

            // 텍스트 애니메이션 (살짝 지연)
            texts.forEach((t) => {
              t.style.animation = `riseText 0.8s ease-out ${0.2 + i * 0.1}s forwards`;
            });
          });
        } else {
          // 영역에서 벗어나면 리셋
          groups.forEach((group) => {
            const bar = group.querySelector(".bar");
            const texts = group.querySelectorAll(".label, .percent");
            bar.style.animation = "none";
            texts.forEach((t) => (t.style.animation = "none"));
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(document.querySelector(".survey-chart"));
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









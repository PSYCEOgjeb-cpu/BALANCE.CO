$(function () {
  const $form = $("#love-form");
  const $questionList = $("#love-question-list");
  const $progressCount = $("#progress-count");
  const $progressBarFill = $("#progress-bar-fill");
  const $feedback = $(".quiz__feedback");
  const $resultSection = $("#love-result");
  const $resultSummary = $("#love-summary");
  const $resultDetails = $("#love-details");
  const $btnRetake = $("#love-retake");
  const $btnShare = $("#love-share");
  const $btnDownload = $("#love-download");
  const totalQuestions = 18;
  let chartInstance = null;

  const profiles = {
    intimacy: {
      title: "친밀감",
      description:
        "정서적 교류와 취약성을 나누는 정도입니다. 점수가 높을수록 마음을 터놓고 대화하며 서로의 내면을 이해하려 노력합니다.",
      advice: [
        "하루에 한 번 '오늘의 감정'을 공유하는 루틴을 만들어보세요.",
        "상대의 이야기를 요약해 되돌려주는 리액티브 리스닝을 시도하세요.",
      ],
      note: "낮다면 감정을 숨기기보다 작은 이야기부터 나누며 안전한 대화를 연습해 보세요.",
    },
    passion: {
      title: "열정",
      description:
        "설렘, 신체적 끌림, 함께하는 활동에서 느끼는 생동감입니다. 균형 잡힌 열정은 관계에 활력을 주고, 과하거나 부족하면 온도차가 생깁니다.",
      advice: [
        "주기적으로 새로운 경험(클래스, 여행 등)을 계획하세요.",
        "스킨십이나 칭찬 표현을 구체적으로 요청하고 나누세요.",
      ],
      note: "열정이 낮다면 반복되는 패턴을 깨는 소소한 데이트를 기획해 보세요.",
    },
    commitment: {
      title: "헌신",
      description:
        "관계를 유지하려는 의지와 책임감입니다. 점수가 높을수록 장기적인 계획과 약속을 존중하며 신뢰를 구축합니다.",
      advice: [
        "중요 결정 시 서로의 목표를 함께 적어 비교해 보세요.",
        "약속 시간을 명확히 조율하고 일정 공유로 신뢰를 쌓으세요.",
      ],
      note: "헌신이 부족하면 미래에 대한 대화를 피하게 되므로, 중장기 계획을 함께 설계해 보세요.",
    },
  };

  const questions = [
    { id: "l1", text: "감정을 솔직히 표현해도 안전하다고 느낀다.", category: "intimacy" },
    { id: "l2", text: "서로의 스킨십 빈도와 방식에 만족한다.", category: "passion" },
    { id: "l3", text: "앞으로 몇 년 후의 계획을 자연스럽게 이야기한다.", category: "commitment" },
    { id: "l4", text: "힘든 일이 생기면 가장 먼저 이 관계를 떠올린다.", category: "intimacy" },
    { id: "l5", text: "함께할 때 설렘이나 생동감이 자주 느껴진다.", category: "passion" },
    { id: "l6", text: "약속 시간과 약속 내용을 서로 잘 지키는 편이다.", category: "commitment" },
    { id: "l7", text: "상대와 취약한 이야기를 나누는 데 부담이 없다.", category: "intimacy" },
    { id: "l8", text: "신체적 친밀감이나 애정 표현이 충분하다고 느낀다.", category: "passion" },
    { id: "l9", text: "이 관계를 오래 유지하기 위한 노력을 기울이고 있다.", category: "commitment" },
    { id: "l10", text: "서로의 취미와 관심사를 존중하고 공유한다.", category: "intimacy" },
    { id: "l11", text: "함께 새로운 활동을 계획하는 편이다.", category: "passion" },
    { id: "l12", text: "미래를 위한 재정/생활 계획을 함께 논의한다.", category: "commitment" },
    { id: "l13", text: "힘든 감정도 상대와 나눌 수 있어 마음이 가볍다.", category: "intimacy" },
    { id: "l14", text: "상대와 있을 때 에너지가 크게 살아난다.", category: "passion" },
    { id: "l15", text: "관계에서 생기는 갈등을 해결하려는 의지가 강하다.", category: "commitment" },
    { id: "l16", text: "하루 중 상대와 소통하는 시간이 충분하다.", category: "intimacy" },
    { id: "l17", text: "데이트나 만남이 일상의 활력소가 된다.", category: "passion" },
    { id: "l18", text: "상대를 위해 기꺼이 시간을 재조정할 수 있다.", category: "commitment" },
  ];

  const createQuestionItem = (question, index) => `
    <li class="quiz-question" data-question="${question.id}">
      <div class="quiz-question__header">
        <h3 class="quiz-question__title">${index + 1}. ${question.text}</h3>
        <span class="quiz-question__badge">${profiles[question.category].title}</span>
      </div>
      <div class="quiz-scale">
        <div class="quiz-scale__labels">
          <span>전혀 아니다</span>
          <span>매우 그렇다</span>
        </div>
        <div class="quiz-scale__options">
          ${[1, 2, 3, 4, 5]
            .map(
              (value) => `
                <label class="quiz-scale__option">
                  <input type="radio" name="${question.id}" value="${value}" aria-label="${value}점" />
                  <span>${value}</span>
                </label>
              `
            )
            .join("")}
        </div>
      </div>
    </li>
  `;

  const renderQuestions = () => {
    const markup = questions.map((question, index) => createQuestionItem(question, index));
    $questionList.html(markup.join(""));
  };

  const updateProgress = () => {
    const answered = $form.find("input[type='radio']:checked").length;
    const percent = Math.round((answered / totalQuestions) * 100);
    $progressCount.text(answered);
    $progressBarFill.css("width", `${percent}%`);
  };

  const calculateScores = () => {
    const scores = {
      intimacy: 0,
      passion: 0,
      commitment: 0,
    };
    let hasIncomplete = false;

    questions.forEach((question) => {
      const $input = $form.find(`input[name='${question.id}']:checked`);
      const value = Number($input.val());
      if (!value) {
        hasIncomplete = true;
        return;
      }
      scores[question.category] += value;
    });

    return { scores, hasIncomplete };
  };

  const renderChart = (scores) => {
    const ctx = document.getElementById("love-chart");
    const labels = Object.keys(profiles).map((key) => profiles[key].title);
    const data = Object.values(scores);

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: "radar",
      data: {
        labels,
        datasets: [
          {
            data,
            fill: true,
            backgroundColor: "rgba(255, 179, 170, 0.25)",
            borderColor: "#C1614C",
            pointBackgroundColor: "#402C1A",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#C1614C",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 30,
            ticks: {
              stepSize: 6,
              color: "#402C1A",
            },
            grid: {
              color: "rgba(64, 44, 26, 0.2)",
            },
            angleLines: {
              color: "rgba(64, 44, 26, 0.2)",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  };

  const renderDetails = (scores) => {
    const fragment = $(document.createDocumentFragment());
    Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .forEach(([key, value]) => {
        const profile = profiles[key];
        const maxScore = questions.filter((item) => item.category === key).length * 5;
        const ratio = Math.round((value / maxScore) * 100);

        const $article = $(`
          <article>
            <h3>${profile.title} (${value}점)</h3>
            <p>${profile.description}</p>
            <p><strong>관계 제안</strong></p>
            <ul>
              ${profile.advice.map((tip) => `<li>${tip}</li>`).join("")}
            </ul>
            <p class="result-ratio">적합도: ${ratio}%</p>
            <p class="result-note">${profile.note}</p>
          </article>
        `);
        fragment.append($article);
      });

    $resultDetails.empty().append(fragment);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { scores, hasIncomplete } = calculateScores();
    if (hasIncomplete) {
      $feedback.text("모든 문항에 응답해주세요.").css("color", "#ff6262");
      return;
    }
    $feedback.text("").removeAttr("style");

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [primary, secondary] = sorted;
    const primaryProfile = profiles[primary[0]];
    const secondaryProfile = profiles[secondary[0]];

    $resultSummary.text(
      `${primaryProfile.title} 요소가 가장 두드러지며, ${secondaryProfile.title} 요소가 뒤를 잇습니다. 부족한 영역의 팁을 참고해 관계 균형을 맞춰보세요.`
    );

    renderChart(scores);
    renderDetails(scores);
    $resultSection.prop("hidden", false)[0].scrollIntoView({ behavior: "smooth" });
  };

  const resetAssessment = () => {
    $form[0].reset();
    updateProgress();
    $feedback.text("").removeAttr("style");
    $resultSection.prop("hidden", true);
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      $feedback.text("페이지 주소가 복사되었습니다.").css("color", "#50c878");
    } catch (error) {
      $feedback.text("복사에 실패했습니다. 다시 시도해주세요.").css("color", "#ff6262");
    }
  };

  const handleDownload = async () => {
    try {
      const canvas = await html2canvas($resultSection[0], {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "love-triangle-result.png";
      link.click();
      $feedback.text("이미지가 저장되었습니다.").css("color", "#50c878");
    } catch (error) {
      $feedback.text("이미지 저장에 실패했습니다. 다시 시도해주세요.").css("color", "#ff6262");
    }
  };

  renderQuestions();
  updateProgress();

  $form.on("change", "input[type='radio']", updateProgress);
  $form.on("submit", handleSubmit);
  $form.on("reset", () => {
    setTimeout(resetAssessment, 0);
  });
  $btnRetake.on("click", resetAssessment);
  $btnShare.on("click", handleShare);
  $btnDownload.on("click", handleDownload);
});



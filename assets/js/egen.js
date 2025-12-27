$(function () {
  const $form = $("#egen-form");
  const $questionList = $("#egen-question-list");
  const $progressCount = $("#progress-count");
  const $progressBarFill = $("#progress-bar-fill");
  const $feedback = $(".quiz__feedback");
  const $resultSection = $("#egen-result");
  const $resultSummary = $("#egen-summary");
  const $resultDetails = $("#egen-details");
  const $btnRetake = $("#egen-retake");
  const $btnShare = $("#egen-share");
  const $btnDownload = $("#egen-download");
  const totalQuestions = 16;
  let chartInstance = null;

  const profiles = {
    thinker: {
      title: "Thinker",
      description:
        "정확한 정보와 논리를 중시하며, 계획을 세우고 구조화하는 능력이 뛰어납니다. 복잡한 문제일수록 침착하게 분석합니다.",
      advice: [
        "브레인스토밍 초반에는 판단을 잠시 미루고 아이디어 양을 늘려보세요.",
        "결정권자와 대화할 때 핵심 근거 3가지만 간결하게 정리하면 설득력이 올라갑니다.",
      ],
      note: "Thinker 점수가 낮다면 기록 습관과 결정 기준을 명확히 하는 연습이 도움이 됩니다.",
    },
    explorer: {
      title: "Explorer",
      description:
        "새로운 사람과 자극을 통해 에너지를 얻고, 다양한 가능성을 실험합니다. 관계 구축과 분위기 메이킹에 강점이 있습니다.",
      advice: [
        "아이디어를 행동으로 옮길 파트너를 미리 정해 실행력을 높이세요.",
        "관계 피로를 막기 위해 주간 일정에 '무계획 시간'을 넣어 두세요.",
      ],
      note: "Explorer 성향이 부족하면 네트워킹을 소규모로 시작해 안전한 실험을 늘려보세요.",
    },
    tactician: {
      title: "Tactician",
      description:
        "빠른 실행과 상황 적응에 능하며, 문제 해결을 위해 몸소 뛰어드는 타입입니다. 위기 상황에서도 방향을 바꿔 추진합니다.",
      advice: [
        "체크리스트를 활용해 반복 업무를 자동화하면 에너지를 절약할 수 있습니다.",
        "실행 속도를 내기 전 팀과 기대 결과를 공유해 재작업을 줄이세요.",
      ],
      note: "Tactician 점수가 낮다면 작은 실험 목표를 세우고 즉시 피드백을 받는 루틴을 추천합니다.",
    },
    oracle: {
      title: "Oracle",
      description:
        "큰 그림과 팀 감정선을 동시에 살피며 균형을 잡습니다. 통찰력과 조율 능력으로 갈등을 예방하고 회복 탄력성을 높입니다.",
      advice: [
        "회의 중 느낀 분위기를 메모해 패턴을 파악하면 리더십에 도움이 됩니다.",
        "관찰한 인사이트를 요약해 팀에 정기적으로 공유해 보세요.",
      ],
      note: "Oracle 성향이 낮다면 하루를 마무리하며 '오늘의 배운 점'을 기록해 통찰 근육을 길러보세요.",
    },
  };

  const questions = [
    { id: "e1", text: "결정을 내릴 때 충분한 데이터와 근거를 확보하려 한다.", category: "thinker" },
    { id: "e2", text: "새로운 사람을 만나거나 이벤트를 기획하는 일을 즐긴다.", category: "explorer" },
    { id: "e3", text: "예상치 못한 상황이 생겨도 즉시 방향을 바꿔 대처한다.", category: "tactician" },
    { id: "e4", text: "회의 분위기나 팀 감정을 자연스럽게 읽어낸다.", category: "oracle" },
    { id: "e5", text: "복잡한 이슈를 구조화해 설명하는 편이다.", category: "thinker" },
    { id: "e6", text: "새로운 시도나 실험을 미루기보다 바로 실행해 본다.", category: "explorer" },
    { id: "e7", text: "진행 중인 일을 빠르게 마무리하고 다음 단계로 넘어간다.", category: "tactician" },
    { id: "e8", text: "팀원 간 갈등이 생기면 중재 역할을 맡곤 한다.", category: "oracle" },
    { id: "e9", text: "논리적인 프레임으로 대화를 리드하는 것이 편하다.", category: "thinker" },
    { id: "e10", text: "새로운 네트워크나 커뮤니티에 쉽게 적응한다.", category: "explorer" },
    { id: "e11", text: "프로젝트 중 막히면 다른 방법을 시험해 돌파한다.", category: "tactician" },
    { id: "e12", text: "장기적인 흐름을 보며 지금 해야 할 선택을 판단한다.", category: "oracle" },
    { id: "e13", text: "논쟁 상황에서도 감정보다 사실을 기반으로 이야기한다.", category: "thinker" },
    { id: "e14", text: "다양한 관심사와 아이디어를 동시에 즐긴다.", category: "explorer" },
    { id: "e15", text: "마감이 촉박할 때 오히려 집중력이 높아진다.", category: "tactician" },
    { id: "e16", text: "팀의 에너지 상태를 점검하며 균형을 잡으려 한다.", category: "oracle" },
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
      thinker: 0,
      explorer: 0,
      tactician: 0,
      oracle: 0,
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
    const ctx = document.getElementById("egen-chart");
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
            backgroundColor: "rgba(140, 104, 59, 0.2)",
            borderColor: "#402C1A",
            pointBackgroundColor: "#8C683B",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#402C1A",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 20,
            ticks: {
              stepSize: 4,
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
            <p><strong>추천 전략</strong></p>
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
      `${primaryProfile.title} 축이 가장 강하게 나타나며, ${secondaryProfile.title} 축이 보조적으로 작용합니다. 두 축의 협력 전략을 참고해 일과 관계 에너지 지도를 설계해보세요.`
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
      link.download = "egen-teto-result.png";
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



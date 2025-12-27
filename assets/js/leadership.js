$(function () {
  const $questionList = $("#question-list");
  const $progressCount = $("#progress-count");
  const $progressBarFill = $("#progress-bar-fill");
  const $form = $("#leadership-form");
  const $feedback = $(".quiz__feedback");
  const $resultSection = $("#result-section");
  const $resultSummary = $("#result-summary");
  const $resultDetails = $("#result-details");
  const $btnRetake = $("#btn-retake");
  const $btnShare = $("#btn-share");
  const $btnDownload = $("#btn-download");
  const totalQuestions = 16;
  let chartInstance = null;

  const profiles = {
    visionary: {
      title: "비전형 리더",
      description:
        "변화를 주도하고 미래 방향성을 분명히 제시합니다. 도전적인 목표를 설정하고 구성원에게 영감을 제공하는 역할이 강합니다.",
      advice: [
        "말뿐 아니라 비전을 실행할 전략을 함께 제시하세요.",
        "구성원이 목표에 공감하도록 단계별 스토리를 설계하세요.",
      ],
    },
    facilitator: {
      title: "촉진형 리더",
      description:
        "사람을 중심에 두고 협업과 커뮤니케이션을 촉진합니다. 구성원의 의견을 경청하며 참여를 이끌어내는 능력이 뛰어납니다.",
      advice: [
        "중요 의사결정 시 방향성을 명확히 제시하세요.",
        "구성원 간 갈등을 예방하기 위한 규칙을 정기적으로 점검하세요.",
      ],
    },
    strategist: {
      title: "전략형 리더",
      description:
        "분석과 실행에 강하며 자료 기반의 의사결정을 선호합니다. 목표를 체계적으로 쪼개고 측정 가능한 지표로 관리합니다.",
      advice: [
        "팀의 감정 상태와 동기 요소에도 관심을 기울이세요.",
        "장기 목표뿐 아니라 단기 성과 공유로 동력을 확보하세요.",
      ],
    },
    mentor: {
      title: "돌봄형 리더",
      description:
        "구성원의 성장과 복지를 우선으로 생각합니다. 정기적인 피드백과 코칭을 통해 잠재력을 이끌어내는 데 강점을 가지고 있습니다.",
      advice: [
        "성장을 위해 도전적인 과제와 책임을 부여하세요.",
        "조직 성과 관점에서 의사결정을 명확히 설명해 신뢰를 높이세요.",
      ],
    },
  };

  const questions = [
    {
      id: "q1",
      text: "팀의 장기적인 방향성과 목표를 명확히 설명할 수 있다.",
      category: "visionary",
    },
    {
      id: "q2",
      text: "회의에서 구성원들이 고르게 의견을 낼 수 있도록 돕는다.",
      category: "facilitator",
    },
    {
      id: "q3",
      text: "프로젝트 진행 상황을 수치나 지표로 관리한다.",
      category: "strategist",
    },
    {
      id: "q4",
      text: "구성원 개개인의 성장 목표를 함께 설정하고 점검한다.",
      category: "mentor",
    },
    {
      id: "q5",
      text: "새로운 기회와 혁신 방향을 발굴하는 데 적극적이다.",
      category: "visionary",
    },
    {
      id: "q6",
      text: "팀 내 갈등이 생기면 중재자 역할을 자처한다.",
      category: "facilitator",
    },
    {
      id: "q7",
      text: "문제를 해결할 때 근거와 데이터를 우선 확인한다.",
      category: "strategist",
    },
    {
      id: "q8",
      text: "정기적으로 1:1 코칭이나 피드백 시간을 확보한다.",
      category: "mentor",
    },
    {
      id: "q9",
      text: "과감한 목표라도 팀이 도달할 수 있도록 방향을 제시한다.",
      category: "visionary",
    },
    {
      id: "q10",
      text: "구성원들의 강점을 파악하고 협업 구조를 설계한다.",
      category: "facilitator",
    },
    {
      id: "q11",
      text: "리스크를 분석하고 사전 대응 계획을 수립한다.",
      category: "strategist",
    },
    {
      id: "q12",
      text: "훈련과 교육 기회를 제공해 구성원 역량을 향상시킨다.",
      category: "mentor",
    },
    {
      id: "q13",
      text: "변화가 필요할 때 구성원을 설득해 추진한다.",
      category: "visionary",
    },
    {
      id: "q14",
      text: "회의 후 결정 사항과 실행 담당을 명확히 정리한다.",
      category: "strategist",
    },
    {
      id: "q15",
      text: "구성원 간 신뢰 형성과 심리적 안전감을 중요하게 여긴다.",
      category: "facilitator",
    },
    {
      id: "q16",
      text: "성과뿐 아니라 구성원의 컨디션과 감정에도 주의를 기울인다.",
      category: "mentor",
    },
  ];

  const renderQuestions = () => {
    const fragment = $(document.createDocumentFragment());
    questions.forEach((question, index) => {
      const $item = $(`
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
      `);

      fragment.append($item);
    });

    $questionList.append(fragment);
  };

  const updateProgress = () => {
    const answered = $form.find("input[type='radio']:checked").length;
    const percent = Math.round((answered / totalQuestions) * 100);
    $progressCount.text(answered);
    $progressBarFill.css("width", `${percent}%`);
  };

  const calculateScores = () => {
    const scores = {
      visionary: 0,
      facilitator: 0,
      strategist: 0,
      mentor: 0,
    };

    let hasIncomplete = false;

    questions.forEach((question) => {
      const value = Number($form.find(`input[name='${question.id}']:checked`).val());
      if (!value) {
        hasIncomplete = true;
        return;
      }
      scores[question.category] += value;
    });

    return { scores, hasIncomplete };
  };

  const renderChart = (scores) => {
    const ctx = document.getElementById("result-chart");
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
            label: "점수",
            data,
            fill: true,
            backgroundColor: "rgba(191, 183, 159, 0.35)",
            borderColor: "#8C683B",
            pointBackgroundColor: "#402C1A",
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
              stepSize: 5,
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
        const maxScore = questions.filter((q) => q.category === key).length * 5;
        const ratio = Math.round((value / maxScore) * 100);

        const $article = $(`
          <article>
            <h3>${profile.title} (${value}점)</h3>
            <p>${profile.description}</p>
            <p><strong>발전 팁</strong></p>
            <ul>
              ${profile.advice.map((tip) => `<li>${tip}</li>`).join("")}
            </ul>
            <p class="result-ratio">적합도: ${ratio}%</p>
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
      $feedback.text("모든 문항을 선택해주세요.").css("color", "#ff6262");
      return;
    }
    $feedback.text("").removeAttr("style");

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [primary, secondary] = sorted;
    const profilePrimary = profiles[primary[0]];

    $resultSummary.text(
      `${profilePrimary.title} 성향이 가장 높게 나타났습니다. 보조 스타일은 ${profiles[secondary[0]].title}입니다.`
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
      link.download = "leadership-result.png";
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


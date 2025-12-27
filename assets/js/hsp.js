$(function () {
  const $form = $("#hsp-form");
  const $questionList = $("#hsp-question-list");
  const $progressCount = $("#progress-count");
  const $progressBarFill = $("#progress-bar-fill");
  const $feedback = $(".quiz__feedback");
  const $resultSection = $("#hsp-result");
  const $resultSummary = $("#hsp-summary");
  const $resultDetails = $("#hsp-details");
  const $btnRetake = $("#hsp-retake");
  const $btnShare = $("#hsp-share");
  const $btnDownload = $("#hsp-download");
  const totalQuestions = 27;
  let chartInstance = null;

  const hspTypes = {
    low: {
      title: "낮은 감각 민감도",
      message:
        "일반적인 감각 민감도를 보입니다. 환경 자극에 대한 반응이 평균적이며, 대부분의 상황에서 편안하게 적응할 수 있습니다.",
      tips: [
        "현재 패턴을 유지하면서 다양한 경험을 시도해보세요.",
        "다양한 환경에서의 경험을 통해 성장 기회를 찾아보세요.",
      ],
    },
    moderate: {
      title: "보통 감각 민감도",
      message:
        "약간 높은 감각 민감도를 보입니다. 때때로 자극에 민감하게 반응할 수 있지만, 대부분의 상황에서 잘 적응합니다.",
      tips: [
        "자극이 많은 환경에서는 휴식 시간을 충분히 확보하세요.",
        "스트레스 관리 기법을 배워 적절히 활용하세요.",
      ],
    },
    high: {
      title: "높은 감각 민감도 (HSP)",
      message:
        "높은 감각 민감도를 보입니다. 환경 자극에 민감하게 반응하며, 깊이 있는 사고와 공감 능력을 가지고 있습니다. 이는 장점이 될 수 있으니 자신의 특성을 이해하고 적절히 관리하세요.",
      tips: [
        "조용하고 안전한 공간을 마련하여 충분한 휴식 시간을 확보하세요.",
        "자극이 많은 환경에서는 조기 퇴장이나 휴식 시간을 요청하는 것을 두려워하지 마세요.",
        "깊이 있는 사고와 공감 능력을 활용하여 창의적인 활동에 참여해보세요.",
        "규칙적인 수면과 건강한 식습관을 유지하여 신체적 안정을 도모하세요.",
      ],
    },
    veryHigh: {
      title: "매우 높은 감각 민감도 (강한 HSP)",
      message:
        "매우 높은 감각 민감도를 보입니다. 환경 자극에 매우 민감하게 반응하며, 깊이 있는 사고와 강한 공감 능력을 가지고 있습니다. 이는 특별한 재능이지만, 적절한 관리가 필요합니다.",
      tips: [
        "일상에서 조용하고 안전한 공간을 필수적으로 확보하세요.",
        "자극이 많은 환경에서는 반드시 휴식 시간을 가지거나 피하세요.",
        "명상, 요가, 호흡 운동 등으로 스트레스를 관리하세요.",
        "깊이 있는 사고와 공감 능력을 활용하여 예술, 상담, 교육 등에 참여해보세요.",
        "규칙적인 수면 패턴과 건강한 식습관을 철저히 유지하세요.",
        "필요시 전문가의 도움을 받아 적응 전략을 수립하세요.",
      ],
    },
  };

  const questions = [
    { id: "q1", text: "큰 소음이나 밝은 빛에 쉽게 압도당한다." },
    { id: "q2", text: "다른 사람의 기분에 민감하게 반응한다." },
    { id: "q3", text: "예술이나 음악에 깊이 감동한다." },
    { id: "q4", text: "바쁜 하루를 보낸 후에는 혼자만의 시간이 필요하다." },
    { id: "q5", text: "카페인에 민감하게 반응한다." },
    { id: "q6", text: "다른 사람이 불편해하는 것을 쉽게 알아챈다." },
    { id: "q7", text: "시끄러운 소리나 강한 냄새에 쉽게 방해받는다." },
    { id: "q8", text: "깊이 있는 대화를 선호한다." },
    { id: "q9", text: "자극이 많은 환경에서는 쉽게 피로해진다." },
    { id: "q10", text: "다른 사람의 고통을 깊이 느낀다." },
    { id: "q11", text: "변화에 쉽게 스트레스를 받는다." },
    { id: "q12", text: "아름다운 것에 깊이 감동한다." },
    { id: "q13", text: "한 번에 많은 일을 처리하기 어렵다." },
    { id: "q14", text: "다른 사람의 눈치를 많이 본다." },
    { id: "q15", text: "조용하고 평화로운 환경을 선호한다." },
    { id: "q16", text: "자극이 많은 상황에서는 쉽게 압도당한다." },
    { id: "q17", text: "세심한 관찰력을 가지고 있다." },
    { id: "q18", text: "다른 사람의 감정 상태에 쉽게 영향을 받는다." },
    { id: "q19", text: "혼자만의 시간이 없으면 쉽게 지친다." },
    { id: "q20", text: "작은 자극에도 쉽게 반응한다." },
    { id: "q21", text: "깊이 있는 사고를 즐긴다." },
    { id: "q22", text: "다른 사람의 불편함을 쉽게 알아챈다." },
    { id: "q23", text: "자극이 많은 환경에서는 집중하기 어렵다." },
    { id: "q24", text: "예술 작품이나 자연의 아름다움에 깊이 감동한다." },
    { id: "q25", text: "스트레스가 많은 상황에서는 쉽게 압도당한다." },
    { id: "q26", text: "다른 사람의 기분 변화를 쉽게 감지한다." },
    { id: "q27", text: "조용하고 안전한 공간에서 가장 편안함을 느낀다." },
  ];

  const createQuestionItem = (question, index) => `
    <li class="quiz-question" data-question="${question.id}">
      <div class="quiz-question__header">
        <h3 class="quiz-question__title">${index + 1}. ${question.text}</h3>
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
    let totalScore = 0;
    let hasIncomplete = false;

    questions.forEach((question) => {
      const $input = $form.find(`input[name='${question.id}']:checked`);
      const value = Number($input.val());
      if (!value) {
        hasIncomplete = true;
        return;
      }
      totalScore += value;
    });

    return { totalScore, hasIncomplete };
  };

  const determineHSPType = (totalScore) => {
    const avgScore = totalScore / totalQuestions;
    if (avgScore < 2.5) return "low";
    if (avgScore < 3.5) return "moderate";
    if (avgScore < 4.2) return "high";
    return "veryHigh";
  };

  const renderChart = (totalScore) => {
    const ctx = document.getElementById("hsp-chart");
    const avgScore = totalScore / totalQuestions;
    const maxScore = 5;

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["감각 민감도 점수"],
        datasets: [
          {
            label: "점수",
            data: [avgScore],
            backgroundColor: avgScore >= 3.5 ? "rgba(140, 104, 59, 0.8)" : "rgba(64, 44, 26, 0.5)",
            borderColor: "#8C683B",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: maxScore,
            ticks: {
              stepSize: 0.5,
              color: "#402C1A",
            },
            grid: {
              color: "rgba(64, 44, 26, 0.2)",
            },
          },
          x: {
            ticks: {
              color: "#402C1A",
            },
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `평균 점수: ${context.parsed.y.toFixed(2)} / ${maxScore}`;
              },
            },
          },
        },
      },
    });
  };

  const renderDetails = (totalScore, typeKey) => {
    const type = hspTypes[typeKey];
    const avgScore = totalScore / totalQuestions;
    const percentage = Math.round((avgScore / 5) * 100);

    const $article = $(`
      <article>
        <h3>${type.title}</h3>
        <p>${type.message}</p>
        <p class="result-ratio">평균 점수: ${avgScore.toFixed(2)} / 5.0 (${percentage}%)</p>
        <p><strong>적응 전략</strong></p>
        <ul>
          ${type.tips.map((tip) => `<li>${tip}</li>`).join("")}
        </ul>
      </article>
    `);

    $resultDetails.empty().append($article);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { totalScore, hasIncomplete } = calculateScores();
    if (hasIncomplete) {
      $feedback.text("모든 문항에 응답해주세요.").css("color", "#ff6262");
      return;
    }
    $feedback.text("").removeAttr("style");

    const typeKey = determineHSPType(totalScore);
    const type = hspTypes[typeKey];

    $resultSummary.text(`${type.title}: ${type.message}`);

    renderChart(totalScore);
    renderDetails(totalScore, typeKey);

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
      link.download = "hsp-sensitivity-result.png";
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


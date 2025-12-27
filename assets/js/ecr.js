$(function () {
  const $form = $("#ecr-form");
  const $questionList = $("#ecr-question-list");
  const $progressCount = $("#progress-count");
  const $progressBarFill = $("#progress-bar-fill");
  const $feedback = $(".quiz__feedback");
  const $resultSection = $("#ecr-result");
  const $resultSummary = $("#ecr-summary");
  const $resultDetails = $("#ecr-details");
  const $btnRetake = $("#ecr-retake");
  const $btnShare = $("#ecr-share");
  const $btnDownload = $("#ecr-download");
  const totalQuestions = 20;
  let chartInstance = null;

  const profiles = {
    avoidance: {
      title: "회피성",
      description: "정서적 거리를 유지하려는 기질입니다. 점수가 높을수록 독립성 욕구가 강하고 의지 받는 상황을 부담스러워합니다.",
      advice: [
        "감정을 공유할 안전한 사람 한 명을 정하고 소소한 이야기부터 나눠보세요.",
        "도움을 요청받았을 때 즉답 대신 시간을 정해두고 답하면 부담을 줄일 수 있습니다.",
      ],
    },
    anxiety: {
      title: "불안성",
      description: "관계 안정성에 대한 걱정과 확인 욕구입니다. 점수가 높을수록 거절에 민감하고 애정 표현을 자주 확인하고 싶어합니다.",
      advice: [
        "염려가 들 때 감정 기록을 남기고 10분 뒤 다시 읽어 객관성을 회복하세요.",
        "안심이 필요할 땐 '지금 걱정된다'고 구체적으로 표현하면 대화가 쉬워집니다.",
      ],
    },
  };

  const attachmentStyles = {
    secure: {
      title: "안정애착 (안심형)",
      message:
        "회피와 불안 모두 낮아 관계에서 적절한 친밀감과 독립성을 유지하고 있습니다. 현재 패턴을 유지하면서 상대의 필요에 민감하게 반응하면 더욱 단단해집니다.",
      tips: ["감정과 요구를 명확히 나누어 표현하기", "상대의 호흡을 고려한 맞춤형 지지 제공"],
    },
    anxious: {
      title: "몰두된 유형 (저항/양면형)",
      message:
        "불안 지표가 높아 애정 확인이 잦고, 혼자 남겨질까 두려운 마음이 큽니다. 자기 돌봄 루틴을 강화하고 신뢰 메시지를 구체적으로 요청해보세요.",
      tips: ["감정을 느낄 때 바로 행동하기보다 3단계 호흡 후 표현하기", "긍정적 근거를 기록해 두고 불안을 재구성하기"],
    },
    dismissive: {
      title: "거부적 회피 유형",
      message:
        "회피 지표가 높아 정서적 거리를 두는 편입니다. 독립성은 장점이지만, 지나치면 연결감을 잃을 수 있습니다. 작은 의존 연습으로 균형을 맞춰보세요.",
      tips: ["도움을 요청하는 연습을 일주일에 1회 이상 시도하기", "감정 표현을 글로 먼저 적어본 뒤 전달하기"],
    },
    fearful: {
      title: "두려운 회피 유형",
      message:
        "회피와 불안이 모두 높아 가까워지고 싶지만 동시에 상처가 두려울 수 있습니다. 안전한 관계에서 단계적으로 신뢰를 쌓는 전략이 필요합니다.",
      tips: ["경계가 필요한 순간과 괜찮은 순간을 명확히 기록하기", "치유 중심의 상담/코칭을 통해 감정을 다룰 연습하기"],
    },
  };

  const questions = [
    { id: "q1", text: "사람들에게 의지하는 것이 불편하지 않다.", dimension: "avoidance", reverse: true },
    { id: "q2", text: "상대가 나를 떠날까 걱정되어 마음이 불안할 때가 많다.", dimension: "anxiety" },
    { id: "q3", text: "누군가와 너무 가까워지는 것은 부담스럽다.", dimension: "avoidance" },
    { id: "q4", text: "내가 소중하게 여기는 사람은 나에게 충분한 관심을 주지 않는 것 같다.", dimension: "anxiety" },
    { id: "q5", text: "감정을 표현하기보다 조용히 정리하는 편이다.", dimension: "avoidance" },
    { id: "q6", text: "연락이 늦어지면 거절당한 느낌을 받는다.", dimension: "anxiety" },
    { id: "q7", text: "연애나 친밀한 관계 없이도 잘 지낼 수 있다고 느낀다.", dimension: "avoidance" },
    { id: "q8", text: "상대가 나를 떠날까봐 마음이 조급해진다.", dimension: "anxiety" },
    { id: "q9", text: "다른 사람과 감정을 공유하면 마음이 더 가벼워진다.", dimension: "avoidance", reverse: true },
    { id: "q10", text: "상대가 사랑한다고 말해도 계속 확인하고 싶어진다.", dimension: "anxiety" },
    { id: "q11", text: "중요한 문제는 혼자 해결하고 싶다.", dimension: "avoidance" },
    { id: "q12", text: "상대를 실망시킬까 두려워 필요 이상의 배려를 하게 된다.", dimension: "anxiety" },
    { id: "q13", text: "정서적 거리를 두면 마음이 편안하다.", dimension: "avoidance" },
    { id: "q14", text: "관계가 조금만 흔들려도 모든 걸 잃을까 불안하다.", dimension: "anxiety" },
    { id: "q15", text: "상대의 기대에 묶이지 않으려 거리를 둔다.", dimension: "avoidance" },
    { id: "q16", text: "사소한 무시에 크게 상처받는다.", dimension: "anxiety" },
    { id: "q17", text: "내 감정을 이야기해도 받아들여질 것이라 확신한다.", dimension: "anxiety", reverse: true },
    { id: "q18", text: "누군가에게 완전히 마음을 여는 것이 어렵다.", dimension: "avoidance" },
    { id: "q19", text: "상대의 관심이 줄어들면 곧바로 불안을 느낀다.", dimension: "anxiety" },
    { id: "q20", text: "누군가가 내 공간에 깊게 들어오는 것을 막고 싶다.", dimension: "avoidance" },
  ];

  const createQuestionItem = (question, index) => `
    <li class="quiz-question" data-question="${question.id}">
      <div class="quiz-question__header">
        <h3 class="quiz-question__title">${index + 1}. ${question.text}</h3>
        <span class="quiz-question__badge">${profiles[question.dimension].title}</span>
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
      avoidance: 0,
      anxiety: 0,
    };
    const counts = {
      avoidance: 0,
      anxiety: 0,
    };
    let hasIncomplete = false;

    questions.forEach((question) => {
      const $input = $form.find(`input[name='${question.id}']:checked`);
      const value = Number($input.val());
      if (!value) {
        hasIncomplete = true;
        return;
      }
      counts[question.dimension] += 1;
      const processedValue = question.reverse ? 6 - value : value;
      scores[question.dimension] += processedValue;
    });

    return { scores, counts, hasIncomplete };
  };

  const determineAttachment = (avgAvoidance, avgAnxiety) => {
    const highAvoidance = avgAvoidance >= 0.45;
    const highAnxiety = avgAnxiety >= 0.45;
    if (!highAvoidance && !highAnxiety) return "secure";
    if (!highAvoidance && highAnxiety) return "anxious";
    if (highAvoidance && !highAnxiety) return "dismissive";
    return "fearful";
  };

  const renderChart = (scores, counts) => {
    const ctx = document.getElementById("ecr-chart");
    const labels = Object.keys(profiles).map((key) => profiles[key].title);
    const data = Object.keys(scores).map((key) => scores[key] / counts[key]);

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
            backgroundColor: "rgba(64, 44, 26, 0.18)",
            borderColor: "#8C683B",
            pointBackgroundColor: "#402C1A",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#8C683B",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 5,
            ticks: {
              stepSize: 1,
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

  const renderDetails = (scores, counts) => {
    const fragment = $(document.createDocumentFragment());

    Object.entries(profiles).forEach(([key, profile]) => {
      const maxScore = counts[key] * 5 || 1;
      const ratio = counts[key] ? Math.round((scores[key] / maxScore) * 100) : 0;
      const $article = $(`
        <article>
          <h3>${profile.title}</h3>
          <p>${profile.description}</p>
          <p class="result-ratio">상대적 지표: ${ratio}%</p>
          <p><strong>추천 팁</strong></p>
          <ul>
            ${profile.advice.map((tip) => `<li>${tip}</li>`).join("")}
          </ul>
        </article>
      `);
      fragment.append($article);
    });

    $resultDetails.empty().append(fragment);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { scores, counts, hasIncomplete } = calculateScores();
    if (hasIncomplete) {
      $feedback.text("모든 문항에 응답해주세요.").css("color", "#ff6262");
      return;
    }
    $feedback.text("").removeAttr("style");

    const avgAvoidance = scores.avoidance / counts.avoidance / 5;
    const avgAnxiety = scores.anxiety / counts.anxiety / 5;
    const styleKey = determineAttachment(avgAvoidance, avgAnxiety);
    const style = attachmentStyles[styleKey];

    $resultSummary.text(`${style.title}: ${style.message}`);

    renderChart(scores, counts);
    renderDetails(scores, counts);

    const $tips = $(`
      <article>
        <h3>스타일별 제안</h3>
        <ul>
          ${style.tips.map((tip) => `<li>${tip}</li>`).join("")}
        </ul>
      </article>
    `);
    $resultDetails.append($tips);

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
      link.download = "ecr-attachment-result.png";
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



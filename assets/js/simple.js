$(function () {
  const $form = $("#simple-form");
  const $questionList = $("#simple-question-list");
  const $progressCount = $("#progress-count");
  const $progressBarFill = $("#progress-bar-fill");
  const $feedback = $(".quiz__feedback");
  const $resultSection = $("#simple-result");
  const $resultSummary = $("#simple-summary");
  const $resultDetails = $("#simple-details");
  const $btnRetake = $("#simple-retake");
  const $btnShare = $("#simple-share");
  const $btnDownload = $("#simple-download");
  const totalQuestions = 16;
  let chartInstance = null;

  const profiles = {
    balance: {
      title: "균형",
      description:
        "일과 휴식의 시간 블록을 얼마나 의도적으로 구성하고 있는지를 보여줍니다. 점수가 높을수록 당일 컨디션에 맞춰 우선순위를 조정할 줄 압니다.",
      advice: [
        "주요 일정 옆에 '내 시간' 블록을 함께 적어 시각화하세요.",
        "핵심 업무 3개, 회복 활동 2개로 하루 To-Do를 단순화하세요.",
      ],
      note: "낮은 점수라면 일상에서 필수/선택 활동을 구분하는 미니 체크리스트가 도움이 됩니다.",
    },
    pace: {
      title: "페이스",
      description:
        "일정을 진행하는 속도와 몰입 리듬입니다. 점수가 높으면 과도한 멀티태스킹보다 집중 구간을 확보해 효율적으로 움직입니다.",
      advice: [
        "집중 50분 + 여유 10분의 루틴을 하루 세 번 이상 시도해 보세요.",
        "중요도와 에너지 레벨을 함께 고려한 일정 표기를 사용하세요.",
      ],
      note: "낮게 나온다면 푸시 알림을 묶어서 확인하는 '집중 모드'를 도입해 속도를 조절해 보세요.",
    },
    connection: {
      title: "연결감",
      description:
        "사람들과의 정서적 교류 정도입니다. 점수가 높을수록 타인과 에너지를 건강하게 나누고, 낮으면 고립감 또는 관계 피로를 느낄 수 있습니다.",
      advice: [
        "한 주에 최소 두 번은 의도적인 스몰 토크 시간을 넣어보세요.",
        "지친 날에는 '지금은 휴식 중'이라는 말로 경계를 부드럽게 알리세요.",
      ],
      note: "연결감이 낮으면 온·오프라인 커뮤니티에서 짧은 대화를 시도하며 회복을 돕는 것이 좋습니다.",
    },
    recharge: {
      title: "리차지",
      description:
        "신체적·정서적 에너지를 회복하는 방식입니다. 점수가 높을수록 깊은 휴식과 취미 활동을 구분해 활용합니다.",
      advice: [
        "주말마다 2시간 이상 몰입 가능한 '나만의 의식'을 만들어보세요.",
        "취침 1시간 전엔 빛과 자극을 줄이고 호흡 루틴으로 마무리하세요.",
      ],
      note: "리차지가 낮으면 짧은 낮잠, 산책처럼 즉시 회복 가능한 옵션을 리스트업해두세요.",
    },
  };

  const questions = [
    { id: "s1", text: "하루 일정을 계획할 때 휴식 블록도 함께 기록한다.", category: "balance" },
    { id: "s2", text: "업무와 개인 일정을 한 번에 처리하려다 지치는 편이다.", category: "pace", reverse: true },
    { id: "s3", text: "주기적으로 친구나 동료와 느슨한 대화를 나눈다.", category: "connection" },
    { id: "s4", text: "피곤해도 휴식보다 새로운 일을 계속 만들 때가 많다.", category: "recharge", reverse: true },
    { id: "s5", text: "스스로 설정한 우선순위를 꽤 잘 지킨다고 느낀다.", category: "balance" },
    { id: "s6", text: "하루에 해야 할 일을 몰아서 끝내다가 저녁엔 에너지가 바닥난다.", category: "pace", reverse: true },
    { id: "s7", text: "감정이 힘든 날이면 누군가에게 솔직히 털어놓는다.", category: "connection" },
    { id: "s8", text: "휴식을 해도 깊게 쉬지 못한 느낌이 자주 든다.", category: "recharge", reverse: true },
    { id: "s9", text: "일정이 급해져도 최소한의 식사·수면 루틴은 지킨다.", category: "balance" },
    { id: "s10", text: "집중 구간과 여유 구간을 나눠서 일하는 편이다.", category: "pace" },
    { id: "s11", text: "혼자 있는 시간과 사람을 만나는 시간을 균형 있게 조절한다.", category: "connection" },
    { id: "s12", text: "휴식 시간에도 스마트폰이나 업무 메시지를 계속 확인한다.", category: "recharge", reverse: true },
    { id: "s13", text: "하루를 끝내기 전 나만의 마무리 의식(독서, 음악 등)이 있다.", category: "recharge" },
    { id: "s14", text: "주말에는 특별한 약속이 없어도 쉬는 방식이 정해져 있다.", category: "balance" },
    { id: "s15", text: "너무 많은 사람을 만나면 에너지가 쉽게 고갈된다.", category: "connection", reverse: true },
    { id: "s16", text: "분 단위로 빡빡한 일정보다 여유로운 페이스를 선호한다.", category: "pace" },
  ];

  const createQuestionItem = (question, index) => {
    const badge = profiles[question.category].title;
    return `
      <li class="quiz-question" data-question="${question.id}">
        <div class="quiz-question__header">
          <h3 class="quiz-question__title">${index + 1}. ${question.text}</h3>
          <span class="quiz-question__badge">${badge}</span>
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
  };

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
      balance: 0,
      pace: 0,
      connection: 0,
      recharge: 0,
    };
    let hasIncomplete = false;

    questions.forEach((question) => {
      const $input = $form.find(`input[name='${question.id}']:checked`);
      const value = Number($input.val());
      if (!value) {
        hasIncomplete = true;
        return;
      }
      const processedValue = question.reverse ? 6 - value : value;
      scores[question.category] += processedValue;
    });

    return { scores, hasIncomplete };
  };

  const renderChart = (scores) => {
    const ctx = document.getElementById("simple-chart");
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
            backgroundColor: "rgba(191, 183, 159, 0.2)",
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
            <p><strong>추천 루틴</strong></p>
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
      `${primaryProfile.title} 성향이 우세하며, ${secondaryProfile.title} 성향이 그다음을 이룹니다. 제안된 루틴으로 일상 에너지 사용을 다듬어보세요.`
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
      link.download = "simpl-chill-result.png";
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



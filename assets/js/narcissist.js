$(function () {
  const $form = $("#narcissist-form");
  const $questionList = $("#narcissist-question-list");
  const $progressCount = $("#progress-count");
  const $progressBarFill = $("#progress-bar-fill");
  const $feedback = $(".quiz__feedback");
  const $resultSection = $("#narcissist-result");
  const $resultSummary = $("#narcissist-summary");
  const $resultDetails = $("#narcissist-details");
  const $btnRetake = $("#narcissist-retake");
  const $btnShare = $("#narcissist-share");
  const $btnDownload = $("#narcissist-download");
  const totalQuestions = 18;
  let chartInstance = null;

  const profiles = {
    selfFocus: {
      title: "자기중심성",
      description:
        "상황을 주도하고 영향력을 유지하려는 경향입니다. 목표를 향한 추진력은 강하지만 타인의 의견을 놓치기 쉬울 수 있습니다.",
      advice: [
        "의사결정 전 팀의 견해를 2가지 이상 확인하세요.",
        "자신의 의도가 상대에게 어떻게 보일지 가정해 보세요.",
      ],
      note: "14~18점 이상이면 바람직한 자기 확신과 통제 의지를 균형 있게 유지하고 있는지 점검해보세요.",
    },
    validation: {
      title: "인정욕구",
      description:
        "칭찬과 주목이 동기를 부여하며, 성과에 대한 외부의 반응을 민감하게 살핍니다. 때로는 비교로 인해 피로감을 느낄 수 있습니다.",
      advice: [
        "성과 목표와 무관한 자기 만족 활동 목록을 작성하세요.",
        "칭찬이 필요할 때 구체적으로 요청해 관계를 건강하게 유지하세요.",
      ],
      note: "과도하게 높다면 타인의 시선을 별도의 지표와 분리해 생각하는 연습이 필요합니다.",
    },
    empathy: {
      title: "공감격차",
      description:
        "타인의 감정과 관점을 이해하는 능력입니다. 점수가 낮을수록 상대의 감정을 놓치고, 높을수록 상호 이해에 강점을 보입니다.",
      advice: [
        "대화 중 상대의 감정을 한 문장으로 되짚어보세요.",
        "중요 피드백 전 상대의 배경과 트리거를 기록해보세요.",
      ],
      note: "8점 이하라면 감정 리플렉션 질문을 습관화하면 도움이 됩니다.",
    },
    boundaries: {
      title: "관계경계",
      description:
        "타인과의 적절한 거리감을 유지하는 능력입니다. 점수가 낮으면 과도한 침범으로, 높으면 유연한 경계 설정을 의미합니다.",
      advice: [
        "중요한 요청을 하기 전 상대의 상황을 확인하는 질문을 추가하세요.",
        "개인 영역을 지키고 싶을 때는 사실-감정-요청 순으로 표현하세요.",
      ],
      note: "극단적으로 낮다면 타인의 공간과 시간을 존중하는 체크리스트가 필요합니다.",
    },
  };

  const questions = [
    { id: "n1", text: "회의나 모임에서 중심을 잡지 못하면 불안하다.", category: "selfFocus" },
    { id: "n2", text: "타인에게 인정받지 못하면 성취감이 반감된다.", category: "validation" },
    { id: "n3", text: "상대가 어떤 감정을 느끼는지 파악하는 데 어려움을 겪는다.", category: "empathy" },
    { id: "n4", text: "상대의 의사를 묻기 전에 내 의견부터 제안하는 편이다.", category: "boundaries" },
    { id: "n5", text: "주의를 받지 못하면 존재감이 희미해지는 느낌이 든다.", category: "validation" },
    { id: "n6", text: "팀의 방향성을 내가 주도해야 만족감을 느낀다.", category: "selfFocus" },
    { id: "n7", text: "상대의 감정에 공감한다고 표현하지만 실제로는 잘 느끼기 어렵다.", category: "empathy" },
    { id: "n8", text: "타인의 개인 영역을 잘 구분하지 못해 오해를 산 적이 있다.", category: "boundaries" },
    { id: "n9", text: "내가 가진 장점과 성과는 공개적으로 인정받아야 한다고 생각한다.", category: "validation" },
    { id: "n10", text: "스스로 결정을 내려야 마음이 편안하다.", category: "selfFocus" },
    { id: "n11", text: "타인의 감정을 듣고도 바로 해결책을 제시하고 싶어진다.", category: "empathy" },
    { id: "n12", text: "상대가 싫어할 수 있는 요구라도 필요하면 밀어붙인다.", category: "boundaries" },
    { id: "n13", text: "칭찬을 들으면 더 큰 목표에 도전하고 싶어진다.", category: "validation" },
    { id: "n14", text: "상황을 통제할 수 없으면 강한 스트레스를 느낀다.", category: "selfFocus" },
    { id: "n15", text: "상대의 반응이 둔하면 내 말이 무시당한 것 같아 불편하다.", category: "validation" },
    { id: "n16", text: "조언보다 상대의 감정에 집중하려 노력한다.", category: "empathy", reverse: true },
    { id: "n17", text: "상대의 일정을 고려하지 못하고 연락하거나 요청할 때가 있다.", category: "boundaries" },
    { id: "n18", text: "다른 사람의 성공을 보면 나도 주목받고 싶다는 생각이 든다.", category: "validation" },
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
      selfFocus: 0,
      validation: 0,
      empathy: 0,
      boundaries: 0,
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
    const ctx = document.getElementById("narcissist-chart");
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
            backgroundColor: "rgba(140, 104, 59, 0.25)",
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
            max: 25,
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
        const maxScore = questions.filter((item) => item.category === key).length * 5;
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
      `${primaryProfile.title} 성향이 가장 높고, ${secondaryProfile.title} 성향이 보조적으로 나타납니다. 상세 팁을 참고해 건강한 관계 전략을 세워보세요.`
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
      link.download = "narcissist-result.png";
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


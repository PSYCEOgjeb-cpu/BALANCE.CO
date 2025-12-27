$(function () {
  const $body = $("body");
  const $scrollTopBtn = $("#scroll-top-btn");
  const $modals = $(".modal");
  const $header = $(".site-header");
  const $mobileMenuToggle = $(".mobile-menu-toggle");
  const $mainNav = $(".main-nav");
  const $categoryButtons = $(".main-nav__category-btn");

  // Header scroll effect
  const handleScroll = () => {
    if (window.scrollY > 10) {
      $header.addClass("scrolled");
    } else {
      $header.removeClass("scrolled");
    }
  };

  $(window).on("scroll", handleScroll);
  handleScroll();

  // Mobile menu toggle
  $mobileMenuToggle.on("click", function () {
    const isExpanded = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", !isExpanded);
    $mainNav.toggleClass("is-open");
    $body.toggleClass("is-modal-open", !isExpanded);
  });

  // Category dropdown toggle (mobile)
  $categoryButtons.on("click", function (e) {
    if (window.innerWidth <= 767) {
      e.preventDefault();
      const isExpanded = $(this).attr("aria-expanded") === "true";
      // Close other dropdowns
      $categoryButtons.not(this).attr("aria-expanded", "false");
      $(this).attr("aria-expanded", !isExpanded);
    }
  });

  // Close mobile menu when clicking outside
  $(document).on("click", function (e) {
    if (
      window.innerWidth <= 767 &&
      $mainNav.hasClass("is-open") &&
      !$(e.target).closest(".main-nav, .mobile-menu-toggle").length
    ) {
      $mobileMenuToggle.attr("aria-expanded", "false");
      $mainNav.removeClass("is-open");
      $body.removeClass("is-modal-open");
    }
  });

  // Close mobile menu when clicking nav link
  $mainNav.find("a").on("click", function () {
    if (window.innerWidth <= 767) {
      $mobileMenuToggle.attr("aria-expanded", "false");
      $mainNav.removeClass("is-open");
      $body.removeClass("is-modal-open");
    }
  });

  // Dropdown menu delay handling (desktop only)
  if (window.innerWidth > 767) {
    const $categories = $(".main-nav__category");
    let currentOpen = null;
    let closeTimer = null;

    $categories.each(function() {
      const $category = $(this);
      
      $category.on("mouseenter", function () {
        clearTimeout(closeTimer);
        
        // 다른 열린 메뉴 즉시 닫기
        if (currentOpen && currentOpen[0] !== $category[0]) {
          currentOpen.removeClass("is-open");
        }
        
        // 현재 메뉴 즉시 열기
        $category.addClass("is-open");
        currentOpen = $category;
      });

      $category.on("mouseleave", function () {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(function () {
          $category.removeClass("is-open");
          if (currentOpen && currentOpen[0] === $category[0]) {
            currentOpen = null;
          }
        }, 150);
      });
    });
  }

  // Current page highlight
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const currentHash = window.location.hash;

  $(".main-nav__list > li > a").each(function () {
    const $link = $(this);
    const href = $link.attr("href");
    
    if (href) {
      if (href.includes(currentPath) && href.includes(currentHash)) {
        $link.addClass("is-active");
      } else if (href === currentPath || href.endsWith(currentHash)) {
        $link.addClass("is-active");
      }
    }
  });

  // 스크롤 탑 버튼 처리
  const toggleScrollBtn = () => {
    if (window.scrollY > 240) {
      $scrollTopBtn.addClass("is-visible");
    } else {
      $scrollTopBtn.removeClass("is-visible");
    }
  };

  $(window).on("scroll", toggleScrollBtn);
  toggleScrollBtn();

  $scrollTopBtn.on("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 스무스 스크롤 버튼
  $("[data-scroll-target]").on("click", function (e) {
    e.preventDefault();
    const target = $(this).data("scroll-target");
    const $targetEl = $(target);
    if ($targetEl.length) {
      $("html, body").animate({ scrollTop: $targetEl.offset().top - 80 }, 500);
    }
  });

  // 모달 제어
  const openModal = (selector) => {
    const $modal = $(selector);
    if (!$modal.length) return;
    $modal.attr("aria-hidden", "false");
    $body.addClass("is-modal-open");
    $modal.find(".modal__close").focus();
  };

  const closeModal = ($modal) => {
    $modal.attr("aria-hidden", "true");
    $body.removeClass("is-modal-open");
  };

  $("[data-modal-target]").on("click", function () {
    const target = $(this).data("modal-target");
    openModal(target);
  });

  $modals.each(function () {
    const $modal = $(this);
    $modal.on("click", "[data-modal-close]", function () {
      closeModal($modal);
    });
    $modal.on("click", function (event) {
      if ($(event.target).is($modal)) {
        closeModal($modal);
      }
    });
    $(document).on("keydown", function (event) {
      if (event.key === "Escape" && $modal.attr("aria-hidden") === "false") {
        closeModal($modal);
      }
    });
  });

  // FAQ 아코디언
  $(".accordion__trigger").on("click", function () {
    const $trigger = $(this);
    const isExpanded = $trigger.attr("aria-expanded") === "true";
    const $panel = $trigger.next(".accordion__panel");

    if (isExpanded) {
      collapsePanel($trigger, $panel);
    } else {
      // 하나만 펼쳐지도록 설정
      $(".accordion__trigger[aria-expanded='true']").each(function () {
        const $openTrigger = $(this);
        collapsePanel($openTrigger, $openTrigger.next(".accordion__panel"));
      });
      expandPanel($trigger, $panel);
    }
  });

  const expandPanel = ($trigger, $panel) => {
    $trigger.attr("aria-expanded", "true");
    $panel.addClass("is-open");
    $panel.css("max-height", $panel.prop("scrollHeight") + "px");
  };

  const collapsePanel = ($trigger, $panel) => {
    $trigger.attr("aria-expanded", "false");
    $panel.removeClass("is-open");
    $panel.css("max-height", 0);
  };

  // 뉴스레터 폼 가짜 검증
  $("#newsletter-form").on("submit", function (event) {
    event.preventDefault();
    const $form = $(this);
    const $input = $form.find("input[name='email']");
    const $feedback = $form.find(".newsletter-form__feedback");
    const email = $input.val().trim();

    if (!email || !validateEmail(email)) {
      $feedback.text("올바른 이메일 주소를 입력해주세요.").css("color", "#ff6262");
      return;
    }

    setTimeout(() => {
      $feedback.text("신청이 완료되었습니다. 신규 테스트 소식을 전해드릴게요!").css("color", "#b4f0c2");
      $input.val("");
    }, 400);
  });

  // 문의 폼 가짜 검증
  $("#contact-form").on("submit", function (event) {
    event.preventDefault();
    const $form = $(this);
    const $feedback = $form.find(".form-feedback");
    const requiredFilled = $form
      .find("[required]")
      .toArray()
      .every((el) => $(el).val().trim() !== "");

    if (!requiredFilled) {
      $feedback.text("필수 항목을 모두 입력해주세요.").css("color", "#ff6262");
      return;
    }

    setTimeout(() => {
      $feedback.text("문의가 접수되었습니다. 1~2 영업일 내 회신드릴게요!").css("color", "#50c878");
      $form[0].reset();
    }, 350);
  });

  // 올해 연도 업데이트
  $("#this-year").text(new Date().getFullYear());

  // 이메일 검증 유틸
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});


// Swiper 초기화
document.addEventListener('DOMContentLoaded', function() {
    const heroSwiper = new Swiper('.hero-swiper', {
        // Fade 효과
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        
        // 자동 재생 설정 (3초마다 전환)
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        
        // Pagination 설정
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: false,
        },
        
        // 루프 설정
        loop: true,
        
        // 전환 속도
        speed: 600,
    });
    
    // AOS 초기화
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // GSAP ScrollTrigger 초기화
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // 스크롤 섹션 요소들
        const scrollSection = document.querySelector('.scroll-section');
        const scrollImages = document.querySelectorAll('.scroll-image-item');
        const scrollContents = document.querySelectorAll('.scroll-content-item');
        
        if (scrollSection && scrollImages.length > 0 && scrollContents.length > 0) {
            // 현재 활성화된 인덱스
            let currentIndex = 0;
            const totalItems = scrollImages.length;
            
            // 인덱스 변경 함수
            function setActiveIndex(index) {
                if (index === currentIndex || index < 0 || index >= totalItems) return;
                
                // 이전 활성 요소 비활성화
                scrollImages[currentIndex].classList.remove('active');
                scrollContents[currentIndex].classList.remove('active');
                
                // 새 요소 활성화
                scrollImages[index].classList.add('active');
                scrollContents[index].classList.add('active');
                
                currentIndex = index;
            }
            
            // 메인 ScrollTrigger - 스크롤 진행률에 따라 콘텐츠 변경
            ScrollTrigger.create({
                trigger: '.scroll-section',
                start: 'top top',
                end: 'bottom bottom',
                pin: '.scroll-container',
                pinSpacing: false,
                onUpdate: (self) => {
                    // 스크롤 진행률 (0 ~ 1)
                    const progress = self.progress;
                    
                    // 진행률에 따라 인덱스 계산
                    let newIndex = Math.floor(progress * totalItems);
                    
                    // 마지막 인덱스 제한
                    if (newIndex >= totalItems) newIndex = totalItems - 1;
                    
                    // 인덱스 변경
                    if (newIndex !== currentIndex) {
                        setActiveIndex(newIndex);
                    }
                }
            });
        }
    }
});


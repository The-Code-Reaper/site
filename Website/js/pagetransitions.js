// ===== Page Load Animation Controller =====
document.addEventListener('DOMContentLoaded', () => {
  // Trigger the main fade-in animation
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);

  // ===== Background Parallax Effect =====
  const handleMouseMove = (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    document.body.style.backgroundPosition = `${50 + mouseX * 2}% ${50 + mouseY * 2}%`;
  };

  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', handleMouseMove);
  }

  // ===== Profile Image Interaction =====
  const profileImg = document.getElementById('profileImg');
  profileImg.addEventListener('mouseenter', () => {
    profileImg.style.transform = 'scale(1.1) rotate(5deg)';
    profileImg.style.boxShadow = '0 0 50px rgba(255, 215, 0, 0.8)';
  });
  profileImg.addEventListener('mouseleave', () => {
    profileImg.style.transform = 'scale(1) rotate(0deg)';
    profileImg.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.4)';
  });

  // ===== Back Button Enhancement =====
  const backBtn = document.getElementById('backBtn');
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.95)';
    document.body.style.transition = 'all 0.5s ease';

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 500);
  });

  // ===== Text Animation on Scroll =====
  const textParagraphs = document.querySelectorAll('.text-content p');
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  textParagraphs.forEach(paragraph => {
    textObserver.observe(paragraph);
  });

  // ===== Keyboard Navigation =====
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Backspace') {
      e.preventDefault();
      backBtn.click();
    }
  });

  // ===== Dynamic Text Highlighting =====
  const addTextHighlighting = () => {
    textParagraphs.forEach(paragraph => {
      paragraph.addEventListener('mouseenter', () => {
        paragraph.style.color = '#fff';
        paragraph.style.textShadow = '2px 2px 4px rgba(255, 215, 0, 0.3)';
      });
      paragraph.addEventListener('mouseleave', () => {
        paragraph.style.color = '#e0e0e0';
        paragraph.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.3)';
      });
    });
  };
  setTimeout(addTextHighlighting, 2000);

  // ===== Responsive Behavior =====
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.backgroundPosition = 'center';
    } else {
      document.addEventListener('mousemove', handleMouseMove);
    }
  };
  window.addEventListener('resize', handleResize);
});


// Local editing is always unlocked so you can open index.html directly while building.
// On the live site (for example GitHub Pages), the birthday lock remains active until midnight.
const localPreview = window.location.protocol === 'file:' || ['localhost', '127.0.0.1'].includes(window.location.hostname);
(() => {
  const isEntryPage = /(?:^|\/)index\.html?$/.test(window.location.pathname) || window.location.pathname.endsWith('/');
  if (isEntryPage || localPreview) return;
  const target = new Date('2026-09-16T00:00:00+05:00').getTime();
  if (Date.now() < target) window.location.replace('index.html');
})();

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const glow = $('.cursor-glow');
document.addEventListener('mousemove', (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const musicBtn = $('#musicBtn');
const backgroundMusic = $('#backgroundMusic');

function syncMusicButton(playing) {
  if (!musicBtn) return;
  musicBtn.classList.toggle('playing', playing);
  musicBtn.textContent = playing ? '♫' : '♪';
  musicBtn.setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
  musicBtn.setAttribute('title', playing ? 'Pause music' : 'Play music');
}

musicBtn?.addEventListener('click', async () => {
  if (!backgroundMusic) return;

  try {
    if (backgroundMusic.paused) {
      await backgroundMusic.play();
      syncMusicButton(true);
    } else {
      backgroundMusic.pause();
      syncMusicButton(false);
    }
  } catch (error) {
    // The click itself is the required user gesture, but keep the control stable
    // if the browser still refuses playback.
    syncMusicButton(false);
  }
});

backgroundMusic?.addEventListener('play', () => syncMusicButton(true));
backgroundMusic?.addEventListener('pause', () => syncMusicButton(false));

const musicHint = $('#musicHint');
if (musicHint) {
  const updateMusicHint = () => {
    musicHint.classList.toggle('hidden', window.scrollY > 24);
  };
  updateMusicHint();
  window.addEventListener('scroll', updateMusicHint, { passive: true });
}

// Birthday unlock: 16 Sep 2026, 12:00 AM in Karachi (PKT, UTC+5).
// The explicit offset makes the target independent of the visitor's device timezone.
const birthdayDate = new Date('2026-09-16T00:00:00+05:00').getTime();
// Local preview replaces the old ?preview=unlock method. No URL trick is needed anymore.
const previewUnlock = localPreview;
let birthdayUnlocked = false;

function showBirthdayReveal(alreadyStarted = false) {
  if (birthdayUnlocked) return;
  birthdayUnlocked = true;

  const lockScreen = $('#lockScreen');
  const reveal = $('#birthdayReveal');
  const nav = $('#siteNav');
  const revealKicker = $('#revealKicker');
  const revealMessage = $('#revealMessage');

  lockScreen?.classList.add('unlocked');
  if (lockScreen) lockScreen.style.display = 'none';
  reveal?.classList.add('visible');
  reveal?.setAttribute('aria-hidden', 'false');
  nav?.classList.remove('locked-nav');

  if (alreadyStarted) {
    if (revealKicker) revealKicker.textContent = 'you made it';
    if (revealMessage) revealMessage.textContent = 'The clock already struck midnight. I saved the important part for you anyway.';
  }
}

function updateCountdown() {
  const countdown = $('#countdown');
  if (!countdown || birthdayUnlocked) return;

  const difference = birthdayDate - Date.now();
  if (difference <= 0) {
    showBirthdayReveal(false);
    return;
  }

  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference % 86400000) / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);
  const seconds = Math.floor((difference % 60000) / 1000);

  $('#days').textContent = String(days).padStart(2, '0');
  $('#hours').textContent = String(hours).padStart(2, '0');
  $('#mins').textContent = String(minutes).padStart(2, '0');
  $('#secs').textContent = String(seconds).padStart(2, '0');
}

if ($('#countdown')) {
  if (previewUnlock || Date.now() >= birthdayDate) showBirthdayReveal(Date.now() >= birthdayDate && !previewUnlock);
  else {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
}

const entryCandle = $('#entryCandle');
const enterBirthday = $('#enterBirthday');
const candlePrompt = $('#candlePrompt');

function extinguishEntryCandle() {
  if (!entryCandle || entryCandle.classList.contains('extinguished')) return;
  entryCandle.classList.add('extinguished');
  if (candlePrompt) candlePrompt.textContent = 'Wish made. Now let me show you the rest. ✨';
  enterBirthday?.classList.add('ready');
  if (enterBirthday) enterBirthday.disabled = false;
  if (typeof confetti === 'function') confetti({ particleCount: 100, spread: 80, origin: { y: 0.55 } });
}
entryCandle?.addEventListener('click', extinguishEntryCandle);
entryCandle?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    extinguishEntryCandle();
  }
});

enterBirthday?.addEventListener('click', () => {
  window.location.href = 'cake.html';
});

const reasons = [
  "Because I'm your friend.",
  "You are shit at Roblox.",
  "You are from Pakistan.",
  "You’re someone I can actually be stupid with. Cuz you are stupider.",
  "Your borderline religious devotion to biryani.",
  "You don’t take yourself too seriously.",
  "The suspiciously coordinated feet pics that gave me great roasting material.",
  "You make way too many TikToks. That's an entertaining circus to watch.",
  "You have your own personality instead of trying to fit into a mould.",
  "The fact that Ayesha apparently likes me more than You.",
  "You’ll actually sing when challenged.",
  "You’re thoughtful when you least expect it.",
  "The fact that half our conversations probably make absolutely no sense to an outsider.",
  "You’re adventurous yourself.",
  "You’re just very, very easy to tease.",
  "You willingly make incredibly cringe TikToks.",
  "You gave me stories to remember.",
  "You can go from completely normal to absolutely unhinged in about five seconds.",
  "For reuniting me with my lost childhood bestfriend Ayesha.",
  "You do crazy things.",
  "The fact that one minor argument can become material for months of teasing.",
  "You’re someone I can joke around with without everything becoming serious.",
  "The fact that biryani can probably solve at least 80% of your problems.",
  "You send completely random voice notes.",
  "You’re not afraid to show the ridiculous side of yourself.",
  "Your engagement broke off. Yes thats another fun incident.",
  "You let people be themselves around you.",
  "Those ridiculous song challenges we make each other do.",
  "There’s never a shortage of things to talk about with you.",
  "You have a slightly unhinged side.",
  "The fact that you gives you me an unreasonable amount of material to make fun of.",
  "Finding some impossible Instagram reel and basically saying, “Your turn.” And then actually doing it ourselves.",
  "You can be quiet and chaotic at the same time.",
  "How seriously you take food.",
  "You don’t chicken out when things get embarrassing.",
  "You’re reserved, but there’s a lot going on underneath.",
  "All the inside jokes that would require a 40-minute explanation to anyone else.",
  "Your willingness to participate in completely unnecessary nonsense.",
  "You’re one of those people who becomes part of your life in ways you don’t really plan.",
  "I never really have to pretend to be someone else around you.",
  "You made the group dynamic considerably more entertaining.",
  "That screeching laugh that you can probably hear from three rooms away.",
  "You’re comfortable being cringe.",
  "We’ve accumulated some lore together. And there will be more to come.",
  "You’ll do stupid things without worrying about how you look.",
  "There are probably more inside jokes than actual normal conversations at this point.",
  "You’re fun without having to try too hard.",
  "You don’t just follow what everyone else is doing.",
  "Ridiculously weird laugh.",
  "Because somehow, “Hafsa The Great” actually feels appropriate."
];

const reasonGrid = $('#reasonGrid');
if (reasonGrid) {
  reasonGrid.innerHTML = reasons
    .map((reason, index) => `
      <article class="reason-card reveal" tabindex="0" aria-label="Reason ${index + 1}">
        <div class="reason-inner">
          <div class="reason-front">
            <h3>${index + 1}</h3>
          </div>
          <div class="reason-back">
            <p>${reason}</p>
          </div>
        </div>
      </article>`)
    .join('');
}

let reasonRevealStep = 0;
$('#randomReasonBtn')?.addEventListener('click', () => {
  const display = $('#randomReason');
  if (!display) return;

  const filledReasons = reasons.filter(Boolean);
  if (!filledReasons.length) {
    display.textContent = 'Your reasons are coming soon. ✦';
    return;
  }

  // Build a tiny three-step tease before revealing the first reason.
  if (reasonRevealStep === 0) {
    display.textContent = 'Are you actually ready?';
    reasonRevealStep = 1;
    return;
  }

  if (reasonRevealStep === 1) {
    display.textContent = "Okay, okay, don't be impatient.";
    reasonRevealStep = 2;
    return;
  }

  // The third click reveals the first card's reason. After that, mix it up.
  if (reasonRevealStep === 2) {
    display.textContent = reasons[0];
    reasonRevealStep = 3;
    return;
  }

  display.textContent = filledReasons[Math.floor(Math.random() * filledReasons.length)];
});

const envelope = $('#envelope');
const letterText = `Thank you for all the voice notes that you have sent so far. It really showed me how cringe someone can be. But it has also been very funny. You live in stupidity, and that's the beauty of it. You do things without worrying too much. I know you have a whole world inside, and you are just as thoughtful as any other person. You have been thoughtful at times. You have been stupid, and you have absolutely been cringe, always. But that's who you are, and that's a great thing. I've had an amazing time so far and it'll be even better once you treat me for biryani. That's one of the reason you're getting these compliments. I thought about how can we sum up everything in one voicenote? And I just have THE ONE.`;
let hasTypedLetter = false;

envelope?.addEventListener('click', () => {
  envelope.classList.add('open');
  $('#letterPaper')?.classList.add('opened');
  if (hasTypedLetter) return;

  hasTypedLetter = true;
  let index = 0;
  const typedLetter = $('#typedLetter');
  const typing = setInterval(() => {
    typedLetter.textContent += letterText[index] || '';
    index += 1;
    if (index > letterText.length) {
      clearInterval(typing);
      typedLetter.classList.add('typed-complete');
    }
  }, 22);
});

// Letter voice-note player. The waveform progressively darkens as the audio plays.
const voicePlayBtn = $('#voicePlayBtn');
const voiceNoteAudio = $('#voiceNoteAudio');
const voiceWave = $('#voiceWave');
const voiceCurrent = $('#voiceCurrent');
const voiceDuration = $('#voiceDuration');

if (voiceWave) {
  const bars = 54;
  for (let i = 0; i < bars; i += 1) {
    const bar = document.createElement('span');
    bar.className = 'voice-wave-bar';
    const waveShape = 4 + Math.round((Math.sin(i * 1.7) + 1) * 4 + (i % 5) * 2);
    bar.style.setProperty('--bar-height', `${Math.min(24, waveShape)}px`);
    voiceWave.appendChild(bar);
  }
}

const formatVoiceTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

const updateVoiceProgress = () => {
  if (!voiceNoteAudio || !voiceWave) return;
  const progress = voiceNoteAudio.duration ? voiceNoteAudio.currentTime / voiceNoteAudio.duration : 0;
  voiceWave.style.setProperty('--voice-progress', Math.max(0, Math.min(1, progress)));
  if (voiceCurrent) voiceCurrent.textContent = formatVoiceTime(voiceNoteAudio.currentTime);
};

voicePlayBtn?.addEventListener('click', async () => {
  if (!voiceNoteAudio) return;
  try {
    if (voiceNoteAudio.paused) {
      await voiceNoteAudio.play();
    } else {
      voiceNoteAudio.pause();
    }
  } catch {
    // Keep the player usable if the browser blocks playback.
  }
});

voiceNoteAudio?.addEventListener('loadedmetadata', () => {
  if (voiceDuration) voiceDuration.textContent = formatVoiceTime(voiceNoteAudio.duration);
  updateVoiceProgress();
});
voiceNoteAudio?.addEventListener('timeupdate', updateVoiceProgress);
voiceNoteAudio?.addEventListener('play', () => {
  voicePlayBtn?.classList.add('playing');
  if (voicePlayBtn) {
    voicePlayBtn.textContent = '❚❚';
    voicePlayBtn.setAttribute('aria-label', 'Pause voice note');
    voicePlayBtn.setAttribute('title', 'Pause voice note');
  }
});
voiceNoteAudio?.addEventListener('pause', () => {
  voicePlayBtn?.classList.remove('playing');
  if (voicePlayBtn) {
    voicePlayBtn.textContent = '▶';
    voicePlayBtn.setAttribute('aria-label', 'Play voice note');
    voicePlayBtn.setAttribute('title', 'Play voice note');
  }
});
voiceNoteAudio?.addEventListener('ended', () => {
  updateVoiceProgress();
  if (voicePlayBtn) voicePlayBtn.textContent = '▶';
});

const cake = $('#birthdayCake') || $('.cake');
const cutCakeBtn = $('.cut-cake-btn');
const cakeNextBtn = $('#cakeNextBtn');
const cakeStageText = $('#cakeStageText');
let cakeAnimationStarted = false;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

cutCakeBtn?.addEventListener('click', async () => {
  if (!cake || cakeAnimationStarted) return;

  cakeAnimationStarted = true;
  cutCakeBtn.disabled = true;

  cakeStageText.textContent = 'blowing the candles... 🌬️';
  cutCakeBtn.textContent = 'Blowing Candles...';
  cake.classList.add('blow');
  await wait(1500);

  cakeStageText.textContent = ' cake is cutting 🔪';
  cutCakeBtn.textContent = '';
  cake.classList.add('knife-in');
  await wait(1200);

  cakeStageText.textContent = ' into a slice... 🍰';
  cutCakeBtn.textContent = 'Cutting Slice...';
  cake.classList.add('sliced');
  await wait(900);

  cakeStageText.textContent = 'give first slice to Ayesha 🎉';
  cutCakeBtn.setAttribute('hidden', '');
  cakeNextBtn?.removeAttribute('hidden');

  if (typeof confetti === 'function') {
    confetti({ particleCount: 280, spread: 115, origin: { y: 0.62 } });
  }
});

cakeNextBtn?.addEventListener('click', () => {
  window.location.href = 'memories.html';
});

// ===== Quiz + one-time sketch realm =====
const quizQuestions = [
  {
    question: "Who’s the most magnificent, most majestic, awe inspiring and breath taking friend you’ve ever had?",
    options: ['Fatima', 'Omkar', 'Huda', 'Rameen'],
    correct: 1
  },
  {
    question: 'A neutron star can rotate hundreds of times every second. What is the fastest known pulsar’s approximate rotation rate?',
    options: ['7 times/ sec', '71 times/sec', '716 times/ sec', '7,160 times/ sec'],
    correct: 2
  },
  {
    question: 'Who does Ayesha loves the most?',
    options: ['Omkar', 'Hafsa'],
    correct: 0
  },
  {
    question: 'What GC were we part of?',
    options: ['The Builder courtroom', 'The Builders washroom', 'The Builders Boardroom', 'The Builders Classroom'],
    correct: 2
  },
  {
    question: 'If Someone’s car broke down and they ask for a lift and are in genuine help. What would you say?',
    options: ['Yes', 'No'],
    correct: 1
  },
  {
    question: 'Who is better at Roblox?',
    options: ['Hafsa', 'Omkar'],
    correct: 1
  },
  {
    question: 'Which element has chemical symbol W?',
    options: ['Tungsten', 'Titanium', 'Tin', 'Tantalum'],
    correct: 0
  },
  {
    question: 'What were the initials of your best clients from Marriage bureau?',
    options: ['AC', 'GA', 'PC', 'DF'],
    correct: 1
  },
  {
    question: "What is Omkar’s dog called?",
    options: ['Kick butowski', 'Simba', 'Pikachu', 'Osama Bin laden'],
    correct: 1
  },
  {
    question: 'What was the legendary rainy day photograph actually famous for?',
    options: ['The LGBTQ parade', 'The Rainbow', 'Feet pic', 'Whale dancing on the court'],
    correct: 2
  }
];

const quizForm = $('#quizForm');
const quizProgress = $('#quizProgress');
const quizResult = $('#quizResult');
const quizSubmit = $('#submitQuiz');
const enterRealm = $('#enterRealm');
const retryQuiz = $('#retryQuiz');

function renderQuiz() {
  if (!quizForm) return;

  quizForm.innerHTML = quizQuestions.map((item, index) => `
    <fieldset class="quiz-question reveal" id="question-${index + 1}">
      <legend>
        <span class="question-number">${String(index + 1).padStart(2, '0')}</span>
        <span>${item.question}</span>
      </legend>
      <div class="quiz-options">
        ${item.options.map((option, optionIndex) => `
          <label class="quiz-option">
            <input type="radio" name="question-${index}" value="${optionIndex}" />
            <span class="option-letter">${String.fromCharCode(65 + optionIndex)}</span>
            <span>${option}</span>
          </label>
        `).join('')}
      </div>
    </fieldset>
  `).join('');

  if (quizProgress) {
    quizProgress.innerHTML = quizQuestions.map((_, index) => `
      <li><a href="#question-${index + 1}" aria-label="Go to question ${index + 1}">${index + 1}</a></li>
    `).join('');
  }

  quizForm.addEventListener('change', (event) => {
    const input = event.target;
    if (!input.matches('input[type="radio"]')) return;
    const questionIndex = Number(input.name.split('-')[1]);
    quizProgress?.querySelector(`li:nth-child(${questionIndex + 1})`)?.classList.add('answered');
    input.closest('.quiz-option')?.classList.add('selected');
    input.closest('.quiz-options')?.querySelectorAll('.quiz-option').forEach((option) => {
      if (option !== input.closest('.quiz-option')) option.classList.remove('selected');
    });
  });

  quizForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(quizForm);
    let score = 0;
    let answered = 0;

    quizQuestions.forEach((item, index) => {
      const answer = formData.get(`question-${index}`);
      if (answer !== null) {
        answered += 1;
        if (Number(answer) === item.correct) score += 1;
      }
    });

    if (answered < quizQuestions.length) {
      const firstMissing = quizQuestions.findIndex((_, index) => formData.get(`question-${index}`) === null);
      const missing = $('#question-' + (firstMissing + 1));
      missing?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      missing?.classList.add('needs-answer');
      setTimeout(() => missing?.classList.remove('needs-answer'), 900);
      return;
    }

    const passed = score >= 7;
    $('#quizScore').textContent = `${score} / ${quizQuestions.length}`;
    $('#quizResultTitle').textContent = passed
      ? 'Wow, you actually passed. That’s surprising.'
      : 'No surprise there, kinda expected.';
    $('#quizResultMessage').textContent = passed
      ? 'Fine. You’ve earned access to the thing I was hiding.'
      : 'You might want to give that another shot before I trust you with the secret.';

    quizResult?.removeAttribute('hidden');
    quizSubmit?.setAttribute('hidden', '');
    enterRealm?.toggleAttribute('hidden', !passed);
    retryQuiz?.removeAttribute('hidden');
    quizResult?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (passed && typeof confetti === 'function') {
      confetti({ particleCount: 160, spread: 90, origin: { y: 0.55 } });
    }
  });
}

renderQuiz();

retryQuiz?.addEventListener('click', () => {
  quizForm?.reset();
  quizProgress?.querySelectorAll('li').forEach((item) => item.classList.remove('answered'));
  quizForm?.querySelectorAll('.quiz-option').forEach((option) => option.classList.remove('selected'));
  quizForm?.querySelectorAll('.quiz-question').forEach((question) => question.classList.remove('needs-answer'));
  quizResult?.setAttribute('hidden', '');
  quizSubmit?.removeAttribute('hidden');
  enterRealm?.setAttribute('hidden', '');
  quizForm?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

enterRealm?.addEventListener('click', () => {
  sessionStorage.setItem('hafsaSecretAccess', '1');
  window.location.href = 'secret.html';
});

function guardSecretPage() {
  if (!document.body.classList.contains('secret-page')) return;
  const allowed = sessionStorage.getItem('hafsaSecretAccess') === '1';
  if (!allowed) {
    window.location.replace('quiz.html');
    return;
  }
  // Access is intentionally one-time. Leaving the page means the quiz must be passed again.
  sessionStorage.removeItem('hafsaSecretAccess');
}

guardSecretPage();

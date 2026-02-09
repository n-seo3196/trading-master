const ITEMS = {
    emerald: { icon: '💎', name: 'エメラルド' },
    bread:   { icon: '🍞', name: 'パン' },
    apple:   { icon: '🍎', name: 'リンゴ' },
    iron:    { icon: '🧱', name: '鉄' },
    gold:    { icon: '💰', name: '金' },
    cookie:  { icon: '🍪', name: 'クッキー' },
    carrot:  { icon: '🥕', name: 'ニンジン' },
    coal:    { icon: '🪨', name: '石炭' },
    diamond: { icon: '🔷', name: 'ダイヤ' }
};

const REWARDS = ['🗡️', '👑', '📘', '🎂', '🥚', '🔱', '🛡️', '🧪', '🏹', '🌟', '🧭', '🕰️'];

const MAX_ROUNDS = 5;

let currentMode = ''; 
let round = 1;
let isPhase2 = false; 
let problems = []; 
let solvedStatus = []; 
let canSelectWinner = false;
let isChestReady = false;
let collectedItems = [];

const titleScreen = document.getElementById('title-screen');
const gameContainer = document.getElementById('game-container');
const playArea = document.getElementById('play-area');
const feedback = document.getElementById('feedback-text');
const chestDisplay = document.getElementById('chest-display');
const nextBtn = document.getElementById('next-btn');
const roundInd = document.getElementById('round-indicator');
const inventoryArea = document.getElementById('inventory-area');
const phaseOverlay = document.getElementById('phase-overlay');
const phaseText = document.getElementById('phase-text');
const summaryScreen = document.getElementById('summary-screen');
const summaryList = document.getElementById('summary-list');

function startGame(mode) {
    currentMode = mode;
    
    titleScreen.style.display = 'none';
    gameContainer.style.display = 'flex';

    round = 1;
    collectedItems = [];
    inventoryArea.innerHTML = '';
    
    initGame();
}

function initGame() {
    if (round > MAX_ROUNDS) {
        showSummary();
        return;
    }

    if (currentMode === 'apprentice') {
        isPhase2 = false;
        if (round === 1) showPhaseAnnouncement("見習いコース<br>基準(＝分母)はどっち？");
    } else {
        isPhase2 = true;
        let title = currentMode === 'master' ? "達人コース<br>暗算で勝負せよ！" : "一人前コース<br>どちらがお得でしょう？";
        if (round === 1) showPhaseAnnouncement(title);
    }

    updateHeader();

    isChestReady = false;
    playArea.innerHTML = ''; 
    problems = [];
    solvedStatus = [];
    canSelectWinner = false;
    
    if (isPhase2) {
        if (currentMode === 'master') {
            feedback.innerHTML = "カードを置いて、<br><strong>暗算でお得な方</strong>を選べ！";
        } else {
            feedback.innerHTML = "2人の取引を見て、<br><strong>お得な方</strong>を選べ！";
        }
    } else {
        feedback.innerHTML = "カードを置いて<br>1あたりを計算しよう！";
    }
    feedback.style.color = "#333";
    
    chestDisplay.textContent = '🎁';
    chestDisplay.className = 'chest-box';
    nextBtn.style.display = 'none';

    if (!isPhase2) {
        createProblemPanel(0);
    } else {
        createProblemPanel(0);
        createProblemPanel(1);
    }
}

function updateHeader() {
    let modeName = "";
    if (currentMode === 'apprentice') modeName = "見習い: 基準探し";
    else if (currentMode === 'journeyman') modeName = "一人前: お得比べ";
    else if (currentMode === 'master') modeName = "達人: 暗算勝負";

    roundInd.textContent = `${modeName} (${round}/${MAX_ROUNDS})`;
    
    if (currentMode === 'apprentice') roundInd.style.background = "#40d140";
    else if (currentMode === 'journeyman') roundInd.style.background = "#4080d1";
    else roundInd.style.background = "#d14040";
}

function showPhaseAnnouncement(text) {
    phaseText.innerHTML = text;
    phaseOverlay.classList.add('active');
    setTimeout(() => {
        phaseOverlay.classList.remove('active');
    }, 4000);
}

function createProblemPanel(index) {
    solvedStatus[index] = false;
    const itemKeys = Object.keys(ITEMS);
    let baseKey, targetKey;

    if (isPhase2 && index === 1) {
        baseKey = problems[0].base.type;
        targetKey = problems[0].target.type;
    } else {
        baseKey = itemKeys[Math.floor(Math.random() * itemKeys.length)];
        do {
            targetKey = itemKeys[Math.floor(Math.random() * itemKeys.length)];
        } while (targetKey === baseKey);
    }

    let rate;
    if (index === 1 && problems[0]) {
        do { rate = Math.floor(Math.random() * 4) + 2; } while (rate === problems[0].answer);
    } else {
        rate = Math.floor(Math.random() * 4) + 2; 
    }
    
    const baseCount = Math.floor(Math.random() * 3) + 2; 
    const targetCount = rate * baseCount; 

    const prob = {
        id: index,
        base: { type: baseKey, count: baseCount },
        target: { type: targetKey, count: targetCount },
        answer: rate
    };
    problems.push(prob);

    const panel = document.createElement('div');
    panel.className = `villager-panel`;
    panel.id = `panel-${index}`;
    panel.onclick = () => selectWinner(index);

    const tradeList = document.createElement('div');
    tradeList.className = 'trade-list';
    tradeList.innerHTML = `
        <div class="trade-row">
            <div class="trade-item">${ITEMS[baseKey].icon} ${baseCount}</div>
            <div>➡</div>
            <div class="trade-item">${ITEMS[targetKey].icon} ${targetCount}</div>
        </div>
        <div class="trade-row question">
            <div class="trade-item">${ITEMS[baseKey].icon} <strong>1</strong></div>
            <div>➡</div>
            <div class="trade-item">？？？</div>
        </div>
    `;

    const calcArea = document.createElement('div');
    calcArea.className = 'calc-area';
    const numSlot = createSlot(index, 'numerator'); 
    const denSlot = createSlot(index, 'denominator'); 
    const bar = document.createElement('div');
    bar.className = 'fraction-bar';
    calcArea.append(numSlot, bar, denSlot);

    const hand = document.createElement('div');
    hand.className = 'hand-area';
    hand.id = `hand-${index}`;
    const c1 = createCard(baseKey, baseCount, 'denominator', index);
    const c2 = createCard(targetKey, targetCount, 'numerator', index);
    
    if(Math.random() > 0.5) { hand.append(c1, c2); } else { hand.append(c2, c1); }

    panel.append(tradeList, calcArea, hand);
    playArea.appendChild(panel);

    [numSlot, denSlot, hand].forEach(zone => {
        zone.addEventListener('dragover', e => e.preventDefault());
        zone.addEventListener('drop', handleDrop);
    });
}

function createSlot(panelId, type) {
    const slot = document.createElement('div');
    slot.className = 'slot';
    slot.dataset.type = type;
    slot.dataset.panelId = panelId;
    return slot;
}

function createCard(typeKey, count, role, panelId) {
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    card.dataset.role = role;
    card.dataset.panelId = panelId; 
    card.innerHTML = `<div class="card-icon">${ITEMS[typeKey].icon}</div><div class="card-num">${count}</div>`;
    
    card.addEventListener('dragstart', function(e) {
        if(solvedStatus[panelId]) { e.preventDefault(); return; }
        e.dataTransfer.setData('text/plain', JSON.stringify({role: role, panelId: panelId}));
        setTimeout(() => card.style.display = 'none', 0);
        window.dragSrcEl = card; 
    });
    card.addEventListener('dragend', function() {
        card.style.display = 'flex';
        window.dragSrcEl = null;
    });
    return card;
}

function handleDrop(e) {
    e.preventDefault();
    const zone = this;
    const srcCard = window.dragSrcEl;
    if (!srcCard) return;

    const srcPanelId = parseInt(srcCard.dataset.panelId);
    let targetPanelId = zone.classList.contains('hand-area') ? parseInt(zone.id.split('-')[1]) : parseInt(zone.dataset.panelId);

    if (srcPanelId !== targetPanelId) return;

    if (zone.classList.contains('slot') && zone.children.length > 0) {
        document.getElementById(`hand-${srcPanelId}`).appendChild(zone.children[0]);
    }

    zone.appendChild(srcCard);
    srcCard.style.display = 'flex';
    checkPanelAnswer(srcPanelId);
}

function checkPanelAnswer(panelId) {
    const panel = document.getElementById(`panel-${panelId}`);
    const numSlot = panel.querySelector('.slot[data-type="numerator"]');
    const denSlot = panel.querySelector('.slot[data-type="denominator"]');
    const prob = problems[panelId];

    if (numSlot.children.length === 0 || denSlot.children.length === 0) return;
    const topCard = numSlot.children[0];
    const bottomCard = denSlot.children[0];

    if (topCard.dataset.role === 'numerator' && bottomCard.dataset.role === 'denominator') {
        solvedStatus[panelId] = true;
        const ans = prob.answer;
        const handArea = document.getElementById(`hand-${panelId}`);

        if (currentMode === 'master') {
            handArea.innerHTML = `
                <div class="secret-display">???</div>
            `;
        } else {
            handArea.innerHTML = `
                <div class="result-display">
                    <div class="result-formula">${prob.target.count} ÷ ${prob.base.count} = ${ans}</div>
                    <div class="result-desc">
                        1${ITEMS[prob.base.type].icon} あたり ${ans}${ITEMS[prob.target.type].icon}
                    </div>
                </div>
            `;
        }

        topCard.draggable = false;
        bottomCard.draggable = false;
        panel.style.borderColor = "#40d140"; 

        checkPhaseCompletion();
    } else {
        feedback.textContent = `パネル${panelId + 1}: 逆だよ！「基準(＝分母)」は下に置こう！`;
        feedback.style.color = "#d14040";
    }
}

function checkPhaseCompletion() {
    if (!isPhase2) {
        prepareChest("成功！ガチャを開けよう！");
    } else {
        if (solvedStatus[0] && solvedStatus[1]) {
            canSelectWinner = true;
            
            if (currentMode === 'master') {
                feedback.innerHTML = "計算完了？<br><strong>暗算で多い方</strong>を選べ！";
            } else {
                feedback.innerHTML = "<strong>数が多い(お得な)方</strong>を選べ！";
            }
            feedback.style.color = "#0000aa";
            
            document.getElementById('panel-0').classList.add('selectable');
            document.getElementById('panel-1').classList.add('selectable');
        }
    }
}

function selectWinner(selectedIndex) {
    if (!canSelectWinner) return;

    const myAns = problems[selectedIndex].answer;
    const otherIndex = selectedIndex === 0 ? 1 : 0;
    const otherAns = problems[otherIndex].answer;

    if (myAns > otherAns) {
        canSelectWinner = false; 
        document.getElementById(`panel-${selectedIndex}`).style.transform = "scale(1.05)";
        document.getElementById(`panel-${otherIndex}`).style.opacity = 0.4;
        document.getElementById('panel-0').classList.remove('selectable');
        document.getElementById('panel-1').classList.remove('selectable');
        prepareChest("大正解！ガチャを開けよう！");
    } else {
        feedback.textContent = `ざんねん… もう片方の方がお得だよ`;
        feedback.style.color = "#d14040";
    }
}

function prepareChest(msg) {
    feedback.innerHTML = `<span style="color:#00aa00; font-weight:bold;">${msg}</span>`;
    isChestReady = true;
    chestDisplay.classList.add('chest-ready');
}

function tryOpenChest() {
    if (!isChestReady) return;

    isChestReady = false;
    chestDisplay.classList.remove('chest-ready');
    chestDisplay.classList.add('shake');

    setTimeout(() => {
        chestDisplay.classList.remove('shake');
        const reward = REWARDS[Math.floor(Math.random() * REWARDS.length)];
        chestDisplay.textContent = reward;
        feedback.textContent = "アイテムゲット！";
        addToInventory(reward);
        nextBtn.style.display = 'inline-block';
    }, 500);
}

function addToInventory(itemEmoji) {
    collectedItems.push(itemEmoji);
    const div = document.createElement('div');
    div.className = 'inventory-item';
    div.textContent = itemEmoji;
    inventoryArea.appendChild(div);
    inventoryArea.scrollLeft = inventoryArea.scrollWidth;
}

function nextRound() {
    round++;
    initGame();
}

function showSummary() {
    gameContainer.style.display = 'none';
    summaryScreen.style.display = 'flex';
    summaryList.innerHTML = '';
    collectedItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'summary-item';
        div.textContent = item;
        summaryList.appendChild(div);
    });
}
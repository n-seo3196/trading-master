:root {
    --bg-color: #2e2e2e;
    --panel-bg: #c6c6c6;
    --slot-bg: #8b8b8b;
    --border-dark: #373737;
    --border-light: #ffffff;
    --accent-gold: #ffff55;
    --overlay-bg: rgba(0, 0, 0, 0.9);
}

body {
    font-family: 'Press Start 2P', sans-serif;
    background-color: var(--bg-color);
    color: #fff;
    margin: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    user-select: none;
    overflow: hidden;
}

#title-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    z-index: 10;
}
#title-screen h1 {
    font-size: 3rem;
    color: var(--accent-gold);
    text-shadow: 6px 6px 0 #000;
    margin-bottom: 20px;
}
.mode-select {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.mode-btn {
    padding: 20px 40px;
    font-size: 1.2rem;
    color: #fff;
    border: 4px solid #fff;
    cursor: pointer;
    text-align: center;
    transition: transform 0.1s;
    text-shadow: 2px 2px 0 #000;
    box-shadow: 6px 6px 0 rgba(0,0,0,0.5);
    width: 350px;
}
.mode-btn:active { transform: translate(4px, 4px); box-shadow: 2px 2px 0 rgba(0,0,0,0.5); }
.mode-btn .sub-text { display: block; font-size: 0.6rem; margin-top: 8px; opacity: 0.9; }

.apprentice { background-color: #40d140; }
.journeyman { background-color: #4080d1; }
.master { background-color: #d14040; }

#game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.mini-title {
    font-size: 1rem;
    color: #888;
    margin: 5px 0;
    text-shadow: none;
}

#round-indicator {
    background: #000;
    color: #fff;
    padding: 5px 15px;
    margin-bottom: 10px;
    font-size: 0.8rem;
    border: 2px solid #fff;
    box-shadow: 0 4px 0 rgba(0,0,0,0.5);
}

#game-board {
    background-color: var(--panel-bg);
    border: 4px solid var(--border-dark);
    box-shadow: inset 4px 4px 0 var(--border-light), inset -4px -4px 0 var(--border-dark), 0 10px 20px rgba(0,0,0,0.5);
    padding: 15px;
    width: 95%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #333;
    position: relative;
}

#play-area {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 5px;
    min-height: 380px;
}

.villager-panel {
    background: var(--panel-bg);
    border: 4px solid var(--border-dark);
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 360px;
    transition: transform 0.2s, opacity 0.3s;
}

.selectable {
    border-color: var(--accent-gold);
    box-shadow: 0 0 15px var(--accent-gold);
    cursor: pointer;
    transform: scale(1.03);
    z-index: 10;
}

.trade-list {
    width: 100%;
    margin-bottom: 10px;
    background: var(--slot-bg);
    border: 2px solid var(--border-dark);
    padding: 5px;
}
.trade-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    background: var(--panel-bg);
    margin-bottom: 4px;
    font-size: 0.9rem;
}
.trade-row.question {
    background: #e0e0e0;
    border: 2px solid var(--accent-gold);
    font-weight: bold;
}
.trade-item { display: flex; align-items: center; gap: 8px; }

.calc-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
}
.fraction-bar {
    width: 100%;
    height: 4px;
    background-color: #333;
    margin: 8px 0;
}
.slot {
    width: 80px;
    height: 90px;
    background-color: var(--slot-bg);
    border: 3px solid var(--border-dark);
    box-shadow: inset 3px 3px 0 #555;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.slot::after {
    position: absolute;
    font-size: 0.75rem;
    font-weight: bold;
    color: #fff;
    text-shadow: 2px 2px 0 #000;
    width: 200px;
    text-align: center;
    pointer-events: none;
}
.slot[data-type="numerator"]::after { content: "▼ くらべる数"; bottom: 110%; }
.slot[data-type="denominator"]::after { content: "▲ 基準(＝分母)"; top: 110%; color: var(--accent-gold); }

.card {
    width: 70px;
    height: 80px;
    background-color: var(--panel-bg);
    border: 2px solid var(--border-dark);
    box-shadow: 2px 2px 0 rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: grab;
}
.card:active { cursor: grabbing; opacity: 0.8; }
.card-icon { font-size: 2rem; margin-bottom: 5px;}
.card-num { font-size: 1rem; font-weight: bold; }

.hand-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    background: var(--slot-bg);
    border: 3px solid var(--border-dark);
    box-shadow: inset 3px 3px 0 #555;
    width: 100%;
    padding: 5px;
}
.result-display { text-align: center; width: 100%; animation: popIn 0.3s; }
.result-formula { font-size: 1rem; font-weight: bold; color: #fff; margin-bottom: 5px; }
.result-desc { font-size: 0.8rem; color: var(--accent-gold); }

.secret-display {
    color: #bbb;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 5px;
    animation: pulse 1s infinite;
}
@keyframes pulse { 0%{opacity:0.6;} 50%{opacity:1;} 100%{opacity:0.6;} }

@keyframes popIn {
    0% { transform: scale(0); }
    80% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

#result-area {
    margin-top: 10px;
    background: var(--panel-bg);
    border: 3px solid var(--border-dark);
    width: 100%;
    padding: 10px;
    text-align: center;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
#feedback-text { color: #222; font-size: 0.8rem; margin-bottom: 10px; min-height: 1.2em; }

.chest-box {
    font-size: 3.5rem;
    cursor: pointer;
    transition: transform 0.1s;
}
.chest-ready { animation: bounce 1s infinite; filter: drop-shadow(0 0 15px gold); }
.shake { animation: shake 0.4s ease-in-out infinite; }

button {
    padding: 12px 24px;
    background: #40d140;
    border: 2px solid var(--border-dark);
    color: #fff;
    font-family: inherit;
    cursor: pointer;
    box-shadow: inset 2px 2px 0 #88ff88, 4px 4px 0 rgba(0,0,0,0.5);
    font-size: 0.8rem;
    margin-top: 5px;
}
button:active { transform: translate(2px, 2px); box-shadow: inset 2px 2px 0 #88ff88; }

#inventory-label { width: 100%; text-align: left; font-size: 0.7rem; margin-top: 5px; color: #555; }

/* ★変更：インベントリのデザイン調整（5つなので中央寄せ・サイズアップ） */
#inventory-area {
    width: 100%;
    height: 70px; /* 少し高く */
    background: #8b8b8b;
    border: 3px solid var(--border-dark);
    box-shadow: inset 3px 3px 0 #555;
    display: flex;
    align-items: center;
    justify-content: center; /* 中央寄せ */
    padding: 5px;
    gap: 10px; /* 間隔広めに */
    overflow-x: auto;
}
.inventory-item {
    width: 50px; /* 少し大きく */
    height: 50px;
    background: #c6c6c6;
    border: 2px solid #333;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    flex-shrink: 0;
}

#phase-overlay {
    position: fixed;
    top: -100%;
    left: 0; width: 100%; height: 100%;
    background: var(--overlay-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    transition: top 0.5s ease-out;
}
#phase-overlay.active { top: 0; }
#phase-text {
    font-size: 2.5rem;
    color: var(--accent-gold);
    text-shadow: 4px 4px 0 #000;
    text-align: center;
    line-height: 1.6;
}

#summary-screen {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 200;
}
#summary-screen h2 { color: var(--accent-gold); font-size: 2rem; margin-bottom: 30px; }
#summary-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
    margin-bottom: 30px;
}
.summary-item {
    font-size: 2.5rem;
    background: #555;
    border: 2px solid #fff;
    padding: 10px;
    border-radius: 8px;
}

@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes shake { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-10deg); } 75% { transform: rotate(10deg); } }
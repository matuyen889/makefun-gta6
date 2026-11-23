// Caleta del Sol 3D — UI & Menus
export class UIManager {
  constructor(overlay, game) {
    this.overlay = overlay;
    this.game = game;
  }

  showTitleScreen() {
    this.overlay.innerHTML = `
      <div style="background: rgba(15, 23, 42, 0.94); border: 2px solid #38bdf8; border-radius: 12px; padding: 40px; text-align: center; max-width: 600px; color: #f8fafc;">
        <h1 style="font-size: 42px; font-weight: 900; letter-spacing: 4px; color: #facc15; margin-bottom: 8px;">CALETA DEL SOL 3D</h1>
        <p style="font-size: 14px; letter-spacing: 2px; color: #38bdf8; margin-bottom: 24px;">AN OPEN-WORLD ACTION ADVENTURE</p>
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
          <button id="btn-start" style="padding: 14px 28px; background: #2563eb; color: #fff; font-weight: bold; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;">START NEW STORY</button>
          <button id="btn-combat" style="padding: 14px 28px; background: #e11d48; color: #fff; font-weight: bold; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;">COMBAT TRIAL</button>
          <button id="btn-map" style="padding: 14px 28px; background: #0f172a; border: 1px solid #475569; color: #cbd5e1; font-weight: bold; border-radius: 6px; cursor: pointer; font-size: 16px;">DISTRICT MAP</button>
        </div>
        <div style="font-size: 12px; color: #94a3b8; text-align: left; line-height: 1.6;">
          <p><strong>Controls:</strong> W/A/S/D to drive/walk, Mouse to look/aim, Left Click to fire, Space for handbrake.</p>
        </div>
      </div>
    `;

    document.getElementById('btn-start')?.addEventListener('click', () => {
      this.overlay.classList.add('hidden');
      this.game.options.titleMode = false;
    });

    document.getElementById('btn-combat')?.addEventListener('click', () => {
      window.location.search = '?shot=combat';
    });

    document.getElementById('btn-map')?.addEventListener('click', () => {
      window.location.search = '?shot=map';
    });
  }
}

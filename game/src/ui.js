// Caleta del Sol 3D — Full Pause, World Map, Career Stats & Title UI

import { DISTRICTS, CAREER_STATS } from './config.js';

export class GameUI {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  resize() {
    const width = this.canvas.clientWidth || 1280;
    const height = this.canvas.clientHeight || 720;
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }

  drawMapAndStatsScreen(world) {
    this.resize();
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Deep slate background with semi-transparency
    ctx.fillStyle = '#0a0e17';
    ctx.fillRect(0, 0, w, h);

    // 1. TOP NAVBAR
    this.drawNavBar(ctx, w, world.player.cash);

    // 2. LEFT PANEL: 68.4% Completion Gauge & Checklist
    this.drawCompletionPanel(ctx, 35, 75, 340, h - 110);

    // 3. CENTER PANEL: 2D District World Map
    this.drawWorldMap(ctx, 400, 75, 500, h - 110, world);

    // 4. RIGHT PANEL: Career Statistics & Save Slots
    this.drawCareerAndSavePanel(ctx, 925, 75, 320, h - 110);

    // 5. FOOTER HINTS
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('ESC Resume  ·  Q / E Switch Tab  ·  Click district to set GPS Waypoint', 400, h - 16);
  }

  drawTitleScreen(world) {
    this.resize();
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Gradient background if not rendered over 3D
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(15, 23, 42, 0.4)');
    grad.addColorStop(0.7, 'rgba(15, 23, 42, 0.85)');
    grad.addColorStop(1, 'rgba(10, 14, 23, 0.98)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Big Vibrant GTA 6 Style Title Logo
    ctx.save();
    ctx.font = '900 68px "Arial Black", sans-serif';
    const logoGrad = ctx.createLinearGradient(60, 100, 60, 200);
    logoGrad.addColorStop(0, '#fef08a');
    logoGrad.addColorStop(0.4, '#f97316');
    logoGrad.addColorStop(1, '#ec4899');
    ctx.fillStyle = logoGrad;
    ctx.shadowColor = 'rgba(236, 72, 153, 0.6)';
    ctx.shadowBlur = 24;
    ctx.fillText('CALETA DEL SOL', 60, 160);

    ctx.font = 'bold 32px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#0284c7';
    ctx.shadowBlur = 12;
    ctx.fillText('VICE HORIZONS', 65, 205);
    ctx.restore();

    // Menu Options
    const menuItems = ['CONTINUE', 'NEW GAME', 'LOAD GAME', 'SETTINGS'];
    menuItems.forEach((item, idx) => {
      const isSelected = idx === 0;
      const my = 290 + idx * 52;
      ctx.font = 'bold 30px "Segoe UI", sans-serif';
      ctx.fillStyle = isSelected ? '#f59e0b' : '#cbd5e1';
      ctx.fillText(item, 65, my);
    });

    // Save Slots Cards on Right Side
    const cardX = w - 460;
    const slots = [
      {
        num: 1,
        title: 'ACT II · HIGHWAY TAKEDOWN',
        stats: '68.4% complete · 6/8 ops · Malecón del Sol',
        cash: '$24,850 · 18:45',
        active: true,
      },
      {
        num: 2,
        title: 'ACT I · BREAKOUT & SUNBREAK',
        stats: '24.0% complete · 2/8 ops · Dársena Marina',
        cash: '$6,400 · 11:20',
        active: false,
      },
      {
        num: 3,
        title: 'EMPTY SLOT',
        stats: 'Save at Sofia’s Loft or from pause menu',
        cash: '—',
        active: false,
      },
    ];

    slots.forEach((s, idx) => {
      const cy = 250 + idx * 115;
      ctx.fillStyle = s.active ? 'rgba(30, 41, 59, 0.95)' : 'rgba(15, 23, 42, 0.8)';
      ctx.beginPath();
      ctx.roundRect(cardX, cy, 400, 95, 8);
      ctx.fill();
      ctx.strokeStyle = s.active ? '#38bdf8' : '#334155';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = 'bold 14px sans-serif';
      ctx.fillStyle = s.active ? '#38bdf8' : '#94a3b8';
      ctx.fillText(`SLOT ${s.num} · ${s.title}`, cardX + 16, cy + 28);

      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(s.stats, cardX + 16, cy + 54);

      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = '#34d399';
      ctx.fillText(s.cash, cardX + 16, cy + 76);
    });

    // Footer
    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('An original open-world crime story on a coastline that never existed · Keyboard & mouse', 65, h - 30);
  }

  drawNavBar(ctx, w, cash) {
    ctx.save();
    // Brand title
    ctx.font = 'bold 22px "Arial Black", sans-serif';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('CALETA DEL SOL', 35, 42);

    // Nav tabs
    const tabs = ['MAP', 'STORY', 'STATS', 'CREW', 'SETTINGS', 'CONTROLS', 'SAVE'];
    tabs.forEach((tab, idx) => {
      const tx = 290 + idx * 82;
      const isSelected = tab === 'STATS' || tab === 'MAP';
      if (isSelected && tab === 'STATS') {
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.roundRect(tx - 10, 22, 68, 26, 4);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
      } else {
        ctx.fillStyle = isSelected ? '#ffffff' : '#94a3b8';
      }
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(tab, tx, 40);
    });

    // Cash top right
    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = '#34d399';
    ctx.textAlign = 'right';
    ctx.fillText(`$${cash.toLocaleString()}`, w - 35, 42);
    ctx.restore();
  }

  drawCompletionPanel(ctx, x, y, width, height) {
    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 10);
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.stroke();

    // 68.4% Ring Gauge
    const cx = x + 75;
    const cy = y + 70;
    const radius = 42;

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.684);
    ctx.stroke();

    ctx.font = 'bold 20px "Segoe UI", sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.textAlign = 'center';
    ctx.fillText('68.4%', cx, cy + 6);
    ctx.font = 'bold 9px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('COMPLETE', cx, cy + 20);

    // Header beside gauge
    ctx.textAlign = 'left';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.fillText('GAME PROGRESS', x + 145, y + 55);
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('Career Syndicate Rank: 6', x + 145, y + 75);

    // Checklist with progress bars
    const items = [
      { name: 'Story operations', val: '6/8', pct: 0.75 },
      { name: 'Street races won', val: '3/4', pct: 0.75 },
      { name: 'Stunt jumps', val: '7/10', pct: 0.70 },
      { name: 'Contraband caches', val: '18/25', pct: 0.72 },
      { name: 'Vehicle export list', val: '4/5', pct: 0.80 },
      { name: 'Districts FRIENDLY', val: '3/4', pct: 0.75 },
      { name: 'Crew recruited', val: '3/3', pct: 1.0 },
      { name: 'Gold operation medals', val: '4/8', pct: 0.50 },
    ];

    const startY = y + 140;
    items.forEach((item, idx) => {
      const iy = startY + idx * 36;
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(item.name, x + 20, iy);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(item.val, x + width - 20, iy);
      ctx.textAlign = 'left';

      // Bar
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x + 20, iy + 6, width - 40, 5);
      ctx.fillStyle = item.pct === 1.0 ? '#10b981' : '#f59e0b';
      ctx.fillRect(x + 20, iy + 6, (width - 40) * item.pct, 5);
    });

    // Operation Medals
    const medalY = y + height - 55;
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('OPERATION MEDALS', x + 20, medalY);

    const medals = ['G', 'S', 'G', 'B', 'S', 'G', '—', '—'];
    medals.forEach((m, idx) => {
      const mx = x + 20 + idx * 36;
      ctx.fillStyle = m === 'G' ? '#eab308' : m === 'S' ? '#94a3b8' : m === 'B' ? '#b45309' : '#334155';
      ctx.beginPath();
      ctx.arc(mx + 12, medalY + 22, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'center';
      ctx.fillText(m, mx + 12, medalY + 26);
      ctx.textAlign = 'left';
    });

    ctx.restore();
  }

  drawWorldMap(ctx, x, y, width, height, world) {
    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 10);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Map Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let gx = 0; gx < width; gx += 40) {
      ctx.beginPath();
      ctx.moveTo(x + gx, y);
      ctx.lineTo(x + gx, y + height);
      ctx.stroke();
    }
    for (let gy = 0; gy < height; gy += 40) {
      ctx.beginPath();
      ctx.moveTo(x, y + gy);
      ctx.lineTo(x + width, y + gy);
      ctx.stroke();
    }

    // Coastline Ocean (West / Left)
    ctx.fillStyle = 'rgba(2, 132, 199, 0.25)';
    ctx.fillRect(x + 4, y + 4, width * 0.28, height - 8);

    // 4 District Zones
    const zones = [
      { name: 'MALECÓN DEL SOL', sub: 'FRIENDLY · 78', rx: x + 150, ry: y + 80, rw: 160, rh: 100, col: '#f59e0b' },
      { name: 'DISTRITO NOCTURNO', sub: 'NEUTRAL · 52', rx: x + 320, ry: y + 80, rw: 160, rh: 120, col: '#ec4899' },
      { name: 'DÁRSENA MARINA', sub: 'FRIENDLY · 84', rx: x + 150, ry: y + 210, rw: 160, rh: 110, col: '#3b82f6' },
      { name: 'MUELLE PESQUERO', sub: 'HOSTILE · 24', rx: x + 320, ry: y + 220, rw: 160, rh: 120, col: '#ef4444' },
    ];

    zones.forEach(z => {
      ctx.fillStyle = 'rgba(30, 41, 59, 0.6)';
      ctx.fillRect(z.rx, z.ry, z.rw, z.rh);
      ctx.strokeStyle = z.col;
      ctx.lineWidth = 2;
      ctx.strokeRect(z.rx, z.ry, z.rw, z.rh);

      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = z.col;
      ctx.fillText(z.name, z.rx + 10, z.ry + 22);

      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(z.sub, z.rx + 10, z.ry + 38);
    });

    // Highway Arteries (Yellow & Blue lines)
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x + width * 0.32, y + height);
    ctx.lineTo(x + width * 0.35, y + 40);
    ctx.stroke();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + width * 0.32, y + 200);
    ctx.lineTo(x + width - 20, y + 200);
    ctx.stroke();

    // Map Icons: Hospital (H), Safehouse (S), Weapon (A), Tuning (T), Mission (J)
    const icons = [
      { t: 'H', x: x + 230, y: y + 140, c: '#ef4444' },
      { t: 'S', x: x + 190, y: y + 260, c: '#10b981' },
      { t: 'A', x: x + 360, y: y + 150, c: '#f59e0b' },
      { t: 'T', x: x + 400, y: y + 270, c: '#06b6d4' },
      { t: 'J', x: x + 280, y: y + 120, c: '#facc15' }, // Active mission waypoint
    ];

    icons.forEach(ic => {
      ctx.fillStyle = ic.c;
      ctx.beginPath();
      ctx.arc(ic.x, ic.y, 11, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'center';
      ctx.fillText(ic.t, ic.x, ic.y + 4);
      ctx.textAlign = 'left';
    });

    // Player marker on map
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x + 210, y + 160, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }

  drawCareerAndSavePanel(ctx, x, y, width, height) {
    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 10);
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.stroke();

    // Rank Tag
    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('RANK 6 · KINGPIN', x + 20, y + 30);

    // Career metrics grid
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('CAREER RECORD', x + 20, y + 60);

    const stats = [
      { label: 'CARS STOLEN', val: '44' },
      { label: 'COPS ESCAPED', val: '15' },
      { label: 'HIGHEST WANTED', val: '★★★★★' },
      { label: 'DISTANCE DRIVEN', val: '56.8 km' },
      { label: 'SYNDICATE RIVALS', val: '32' },
      { label: 'LONGEST JUMP', val: '52 m' },
      { label: 'CREW ABILITIES', val: '41' },
      { label: 'SAFEHOUSES', val: '4' },
    ];

    stats.forEach((s, idx) => {
      const sx = x + 20 + (idx % 2) * 140;
      const sy = y + 85 + Math.floor(idx / 2) * 44;

      ctx.font = 'bold 16px sans-serif';
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(s.val, sx, sy);

      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.fillText(s.label, sx, sy + 15);
    });

    // Save Slots (3 persistent slots)
    const slotStartY = y + 280;
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('SAVE SLOTS', x + 20, slotStartY);

    const slots = [
      { name: '1 · 68.4% · Malecón del Sol', info: '6/8 missions · 18:45' },
      { name: '2 · 68.4% · Marina Loft', info: '6/8 missions · 18:45' },
      { name: '3 · 68.4% · Port Safehouse', info: '6/8 missions · 18:45' },
    ];

    slots.forEach((sl, idx) => {
      const sy = slotStartY + 20 + idx * 58;
      ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
      ctx.beginPath();
      ctx.roundRect(x + 15, sy, width - 30, 48, 6);
      ctx.fill();

      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(sl.name, x + 25, sy + 20);

      ctx.font = '11px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(sl.info, x + 25, sy + 38);

      // Save button pill
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.roundRect(x + width - 75, sy + 12, 50, 24, 4);
      ctx.fill();
      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'center';
      ctx.fillText('SAVE', x + width - 50, sy + 28);
      ctx.textAlign = 'left';
    });

    ctx.restore();
  }
}

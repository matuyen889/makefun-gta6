// Caleta del Sol 3D — Canvas HUD & Minimap Overlay
import { WEAPONS, CREW_ABILITIES } from './config.js';

export class GameHUD {
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

  draw(world, options = {}) {
    this.resize();
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    if (options.titleMode) return;

    const player = world.player;
    const police = world.police;
    const mission = world.activeMission;
    const isCombat = options.combatMode || false;

    this.drawTopRightHUD(ctx, w, player, police);
    this.drawMissionBanner(ctx, mission);
    this.drawPoliceDispatch(ctx, police);
    this.drawMinimap(ctx, player, police, mission);
    this.drawDialogueBox(ctx, w, h, mission, isCombat);

    if (!isCombat && player.mode === 'DRIVING') {
      this.drawSpeedometer(ctx, w, h, player);
    }

    this.drawWeaponAndCrewHUD(ctx, w, h, player);

    if (isCombat) {
      this.drawCrosshair(ctx, w, h);
    }
  }

  drawTopRightHUD(ctx, w, player, police) {
    ctx.save();
    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.textAlign = 'right';
    ctx.fillText('18:45', w - 30, 36);

    ctx.font = 'bold 36px "Segoe UI", sans-serif';
    ctx.fillStyle = '#34d399';
    ctx.fillText(`$${player.cash.toLocaleString()}`, w - 30, 76);

    const wanted = police.wantedLevel;
    const startX = w - 160;
    const startY = 96;

    for (let i = 0; i < 5; i++) {
      ctx.font = '22px sans-serif';
      if (i < wanted) {
        ctx.fillStyle = '#facc15';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 10;
        ctx.fillText('★', startX + i * 26, startY);
      } else {
        ctx.fillStyle = '#475569';
        ctx.shadowBlur = 0;
        ctx.fillText('☆', startX + i * 26, startY);
      }
    }
    ctx.shadowBlur = 0;

    if (wanted >= 4) {
      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = '#f87171';
      ctx.fillText('AIR UNIT DEPLOYED', w - 30, startY + 22);
    }
    ctx.restore();
  }

  drawMissionBanner(ctx, mission) {
    if (!mission) return;
    ctx.save();
    const x = 30;
    const y = 30;
    const boxW = 380;
    const boxH = 92;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.beginPath();
    ctx.roundRect(x, y, boxW, boxH, 8);
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText(`${mission.num} · ${mission.title}`, x + 14, y + 22);

    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.roundRect(x + 14, y + 30, 95, 18, 4);
    ctx.fill();
    ctx.font = 'bold 10px sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText('STAGE 2/3', x + 20, y + 43);

    ctx.font = 'bold 13px sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(mission.stage.replace('STAGE 2/3: ', ''), x + 120, y + 43);

    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(mission.objective, x + 14, y + 68);

    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`NEXT: ${mission.next}`, x + 14, y + 84);

    ctx.restore();
  }

  drawPoliceDispatch(ctx, police) {
    if (police.wantedLevel === 0) return;
    ctx.save();
    const x = 30;
    const y = 132;
    const boxW = 380;
    const boxH = 145;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.beginPath();
    ctx.roundRect(x, y, boxW, boxH, 8);
    ctx.fill();

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(x, y, 4, boxH);

    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#f87171';
    ctx.fillText('MSPD TACTICAL DISPATCH', x + 16, y + 24);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.fillText('Level 3 Response: Pursuit active on Ocean Drive', x + 16, y + 48);
    ctx.fillText('Deploying road blocks and spike strips on Harbor Exit 4', x + 16, y + 68);
    ctx.fillText('SWAT tactical air containment authorized', x + 16, y + 88);

    ctx.fillStyle = '#334155';
    ctx.fillRect(x + 16, y + 104, 348, 8);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(x + 16, y + 104, 260, 8);

    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('PURSUIT CONTAINMENT: 75%', x + 16, y + 128);

    ctx.restore();
  }

  drawMinimap(ctx, player, police, mission) {
    ctx.save();
    const size = 180;
    const x = 30;
    const y = this.canvas.height - size - 45;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.save();
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 2 - 2, 0, Math.PI * 2);
    ctx.clip();

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 6;
    for (let gx = 0; gx <= size; gx += 30) {
      ctx.beginPath();
      ctx.moveTo(x + gx, y);
      ctx.lineTo(x + gx, y + size);
      ctx.stroke();
    }
    for (let gy = 0; gy <= size; gy += 30) {
      ctx.beginPath();
      ctx.moveTo(x, y + gy);
      ctx.lineTo(x + size, y + gy);
      ctx.stroke();
    }

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x + size / 2, y + size / 2);
    ctx.lineTo(x + size / 2 + 40, y + size / 2 - 20);
    ctx.lineTo(x + size / 2 + 60, y + size / 2 - 60);
    ctx.stroke();

    police.units.forEach((p) => {
      const px = x + size / 2 + (p.x - player.x) * 0.4;
      const py = y + size / 2 + (p.z - player.z) * 0.4;
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();

    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(x + size / 2, y + size / 2 - 8);
    ctx.lineTo(x + size / 2 + 6, y + size / 2 + 6);
    ctx.lineTo(x + size / 2, y + size / 2 + 3);
    ctx.lineTo(x + size / 2 - 6, y + size / 2 + 6);
    ctx.closePath();
    ctx.fill();

    const barY = y + size + 8;
    const barW = size;
    const barH = 8;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x, barY, barW, barH);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(x, barY, (barW * player.health) / 100, barH);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x, barY + barH + 4, barW, barH);
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(x, barY + barH + 4, (barW * player.armor) / 100, barH);

    ctx.font = 'bold 9px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`HP ${player.health}`, x, barY - 2);
    ctx.fillText(`ARMOR ${player.armor}`, x + 110, barY - 2);

    ctx.restore();
  }

  drawDialogueBox(ctx, w, h, mission, isCombat) {
    if (!mission) return;
    ctx.save();
    const boxW = 540;
    const boxH = 58;
    const x = (w - boxW) / 2;
    const y = h - boxH - 25;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.beginPath();
    ctx.roundRect(x, y, boxW, boxH, 8);
    ctx.fill();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(isCombat ? 'MATEO CRUZ' : 'SOFIA VEGA', x + 20, y + 24);

    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#f8fafc';
    const text = isCombat
      ? 'Shooters in the fruit stalls! Watch the crossfire and cover the flank!'
      : mission.dialogue.replace(/^[^:]+:\s*/, '');
    ctx.fillText(text, x + 20, y + 44);

    ctx.restore();
  }

  drawSpeedometer(ctx, w, h, player) {
    ctx.save();
    const x = w - 240;
    const y = h - 120;

    ctx.font = 'bold 54px "Arial Black", sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.textAlign = 'right';
    ctx.fillText('118', w - 40, y + 36);

    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('KM/H', w - 40, y + 54);

    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText(player.currentVehicle.name, w - 40, y + 74);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`♫ ${player.currentRadio.name} — ${player.currentRadio.track}`, w - 40, y + 96);

    ctx.restore();
  }

  drawWeaponAndCrewHUD(ctx, w, h, player) {
    ctx.save();
    const x = w - 210;
    const y = 175;

    WEAPONS.forEach((wpn, idx) => {
      const isSelected = idx === player.selectedWeaponIndex;
      const slotY = y + idx * 30;

      ctx.fillStyle = isSelected ? '#f59e0b' : 'rgba(15, 23, 42, 0.85)';
      ctx.beginPath();
      ctx.roundRect(x, slotY, 180, 26, 4);
      ctx.fill();

      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = isSelected ? '#0f172a' : '#f8fafc';
      ctx.fillText(`${wpn.slot}  ${wpn.name}`, x + 10, slotY + 18);

      ctx.textAlign = 'right';
      ctx.fillText(`${wpn.ammo}`, x + 170, slotY + 18);
      ctx.textAlign = 'left';
    });

    const crewY = y + 165;
    CREW_ABILITIES.forEach((crew, idx) => {
      const rowY = crewY + idx * 36;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.beginPath();
      ctx.roundRect(x, rowY, 180, 32, 4);
      ctx.fill();

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.roundRect(x + 6, rowY + 6, 20, 20, 3);
      ctx.fill();
      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.fillText(crew.key, x + 12, rowY + 20);

      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(crew.title, x + 34, rowY + 16);

      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(crew.member, x + 34, rowY + 28);
    });

    ctx.restore();
  }

  drawCrosshair(ctx, w, h) {
    ctx.save();
    const cx = w / 2;
    const cy = h / 2 - 20;

    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

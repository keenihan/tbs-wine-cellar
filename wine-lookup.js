<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="theme-color" content="#4A1628">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="TBS Cellar">
<meta name="description" content="TBS Wine Cellar — personal wine collection manager">
<title>TBS Wine Cellar</title>
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="icons/icon-192.png">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css">
<style>
/* ── RESET & BASE ─────────────────────────────────────────── */
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
:root{
  --wine-deep:#4A1628;--wine-mid:#7B2D42;--wine-light:#C4516A;--wine-rose:#E8A0AF;
  --wine-cream:#F9F3EE;--wine-gold:#C4943A;--wine-gold-light:#F0D98A;
  --white-wine:#E8D5A0;--text-dark:#1A0A0F;--text-mid:#5C3347;--text-light:#9B7585;
  --border:rgba(74,22,40,0.13);--card-bg:#FFFAF8;--surface:#F5ECE8;
  --success:#2D6A4F;--info:#1A4A7A;--danger:#8B1A2C;
  --safe-top:env(safe-area-inset-top,0px);
  --safe-bot:env(safe-area-inset-bottom,0px);
}
html,body{height:100%;overflow:hidden;background:var(--wine-cream)}
body{font-family:'Georgia',serif;color:var(--text-dark);max-width:430px;margin:0 auto;
  position:relative;display:flex;flex-direction:column}

/* ── STATUS BAR ───────────────────────────────────────────── */
.status-bar{
  background:var(--wine-deep);color:rgba(255,255,255,0.85);
  display:flex;justify-content:space-between;align-items:center;
  padding:calc(8px + var(--safe-top)) 20px 6px;font-size:11px;
  font-family:sans-serif;letter-spacing:.3px;flex-shrink:0;
}
.status-time{font-weight:600}
.status-icons{display:flex;gap:5px;align-items:center}
.status-icons i{font-size:14px}

/* ── APP HEADER ───────────────────────────────────────────── */
.app-header{
  background:var(--wine-deep);padding:10px 20px 16px;
  position:relative;overflow:hidden;flex-shrink:0;
}
.app-header::before{content:'';position:absolute;top:-40px;right:-20px;
  width:140px;height:140px;background:rgba(196,148,58,.12);border-radius:50%}
.app-header::after{content:'';position:absolute;bottom:-30px;left:30px;
  width:90px;height:90px;background:rgba(196,148,58,.07);border-radius:50%}
.header-top{display:flex;justify-content:space-between;align-items:flex-start}
.app-name{color:var(--wine-gold);font-size:20px;font-weight:700;letter-spacing:1px;text-transform:uppercase}
.app-subtitle{color:rgba(255,255,255,.5);font-size:10px;font-family:sans-serif;
  letter-spacing:2px;text-transform:uppercase;margin-top:1px}
.header-actions{display:flex;gap:8px}
.hdr-btn{background:rgba(255,255,255,.1);border:none;border-radius:8px;
  padding:7px 10px;color:rgba(255,255,255,.75);font-size:18px;cursor:pointer}
.header-stats{display:flex;gap:8px;margin-top:12px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}
.header-stats::-webkit-scrollbar{display:none}
.stat-pill{background:rgba(255,255,255,.08);border:.5px solid rgba(196,148,58,.25);
  border-radius:20px;padding:6px 14px;text-align:center;flex-shrink:0}
.stat-num{color:var(--wine-gold);font-size:17px;font-weight:700;display:block;line-height:1}
.stat-label{color:rgba(255,255,255,.45);font-size:9px;font-family:sans-serif;
  text-transform:uppercase;letter-spacing:1px;margin-top:2px;display:block}

/* ── NAV TABS ─────────────────────────────────────────────── */
.nav-tabs{
  background:var(--wine-deep);display:flex;
  border-top:.5px solid rgba(196,148,58,.18);flex-shrink:0;
}
.nav-tab{
  flex:1;padding:9px 4px 7px;text-align:center;cursor:pointer;
  border:none;background:none;color:rgba(255,255,255,.38);font-size:9px;
  font-family:sans-serif;text-transform:uppercase;letter-spacing:.5px;transition:color .2s;
}
.nav-tab i{display:block;font-size:17px;margin-bottom:2px}
.nav-tab.active{color:var(--wine-gold);border-bottom:2px solid var(--wine-gold)}

/* ── SCROLLABLE CONTENT ───────────────────────────────────── */
.content-area{flex:1;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;
  padding-bottom:calc(70px + var(--safe-bot))}
.tab-content{display:none;padding:14px}
.tab-content.active{display:block}

/* ── SEARCH / SORT ────────────────────────────────────────── */
.search-bar{display:flex;gap:8px;margin-bottom:12px}
.search-wrap{flex:1;position:relative}
.search-wrap i{position:absolute;left:10px;top:50%;transform:translateY(-50%);
  color:var(--text-light);font-size:16px;pointer-events:none}
.search-input{width:100%;background:white;border:.5px solid var(--border);
  border-radius:8px;padding:10px 12px 10px 34px;font-size:13px;
  color:var(--text-dark);font-family:sans-serif;outline:none}
.sort-btn{background:white;border:.5px solid var(--border);border-radius:8px;
  padding:10px 13px;color:var(--wine-mid);font-size:18px;cursor:pointer}
.filter-chips{display:flex;gap:6px;overflow-x:auto;padding-bottom:4px;
  margin-bottom:12px;scrollbar-width:none}
.filter-chips::-webkit-scrollbar{display:none}
.chip{flex-shrink:0;padding:5px 12px;border-radius:20px;font-size:11px;
  font-family:sans-serif;cursor:pointer;border:.5px solid var(--border);
  background:white;color:var(--text-mid);transition:all .2s;user-select:none}
.chip.active{background:var(--wine-mid);color:white;border-color:var(--wine-mid)}

/* ── WINE CARD ────────────────────────────────────────────── */
.wine-card{background:var(--card-bg);border:.5px solid var(--border);
  border-radius:12px;margin-bottom:10px;overflow:hidden;cursor:pointer;
  transition:transform .12s;user-select:none}
.wine-card:active{transform:scale(0.985)}
.card-inner{display:flex;align-items:stretch}
.card-accent{width:4px;flex-shrink:0}
.card-accent.red{background:linear-gradient(180deg,#8B1A2C,#C4516A)}
.card-accent.white{background:linear-gradient(180deg,#C4943A,#E8D5A0)}
.card-accent.rose{background:linear-gradient(180deg,#D4537E,#F4C0D1)}
.card-accent.sparkling{background:linear-gradient(180deg,#185FA5,#85B7EB)}
.card-accent.dessert{background:linear-gradient(180deg,#BA7517,#EF9F27)}
.card-accent.fortified{background:linear-gradient(180deg,#533AB7,#8F74E0)}
.card-body{flex:1;padding:11px 13px;min-width:0}
.card-meta{display:flex;justify-content:space-between;align-items:flex-start;gap:6px}
.wine-name{font-size:14px;font-weight:700;color:var(--text-dark);line-height:1.3;flex:1;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.vintage-badge{background:var(--wine-deep);color:var(--wine-gold);font-size:11px;
  font-weight:700;padding:2px 8px;border-radius:4px;font-family:sans-serif;flex-shrink:0}
.producer-line{font-size:12px;color:var(--text-mid);margin-top:2px;font-family:sans-serif;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.card-tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:7px}
.tag{font-size:10px;font-family:sans-serif;padding:2px 8px;border-radius:10px}
.tag-region{background:rgba(74,22,40,.07);color:var(--wine-mid)}
.tag-grape{background:rgba(196,148,58,.12);color:#7A4E0A}
.tag-type-red{background:rgba(139,26,44,.1);color:#7B1A2C}
.tag-type-white{background:rgba(196,148,58,.12);color:#7A4E0A}
.tag-type-rose{background:rgba(212,83,126,.1);color:#8B1A50}
.tag-type-sparkling{background:rgba(24,95,165,.1);color:#0C447C}
.tag-type-dessert{background:rgba(186,117,23,.1);color:#7A4E0A}
.tag-type-fortified{background:rgba(83,58,183,.1);color:#3C3489}
.card-footer{display:flex;justify-content:space-between;align-items:center;
  margin-top:8px;padding-top:7px;border-top:.5px solid var(--border)}
.bottles-info{font-size:12px;color:var(--text-mid);font-family:sans-serif}
.bottles-info b{color:var(--text-dark)}
.drink-window-tag{font-size:10px;font-family:sans-serif;color:var(--info);
  background:rgba(26,74,122,.08);padding:2px 8px;border-radius:10px}
.drink-now{background:rgba(45,106,79,.12);color:var(--success)}
.drink-past{background:rgba(139,26,44,.08);color:var(--danger)}
.rating-score{font-size:13px;font-weight:700;color:var(--wine-gold);font-family:sans-serif}
.card-thumb{width:54px;display:flex;align-items:center;justify-content:center;
  background:rgba(74,22,40,.04);border-left:.5px solid var(--border)}
.label-thumb{width:44px;height:58px;object-fit:cover;border-radius:4px}
.label-placeholder{width:44px;height:58px;border-radius:4px;
  background:rgba(74,22,40,.06);display:flex;align-items:center;justify-content:center}
.label-placeholder i{font-size:22px;color:rgba(74,22,40,.22)}
.empty-state{text-align:center;padding:48px 20px;color:var(--text-light)}
.empty-state i{font-size:48px;margin-bottom:12px;display:block;color:var(--wine-rose)}
.empty-state p{font-family:sans-serif;font-size:14px;line-height:1.6}

/* ── BOTTOM NAV ───────────────────────────────────────────── */
.bottom-nav{
  position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;
  background:white;border-top:.5px solid var(--border);display:flex;z-index:50;
  padding-bottom:var(--safe-bot);
}
.bnav-item{flex:1;display:flex;flex-direction:column;align-items:center;
  padding:9px 4px 6px;cursor:pointer;border:none;background:none;
  color:var(--text-light);font-size:9px;font-family:sans-serif;
  text-transform:uppercase;letter-spacing:.5px;gap:2px;transition:color .2s}
.bnav-item i{font-size:21px}
.bnav-item.active{color:var(--wine-mid)}
.add-bnav{flex:1;display:flex;flex-direction:column;align-items:center;
  padding:4px 4px 4px;cursor:pointer;border:none;background:none;gap:2px}
.add-circle{width:46px;height:46px;background:var(--wine-mid);border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 12px rgba(123,45,66,.35);margin-top:-14px}
.add-circle i{font-size:24px;color:white}
.add-nav-label{font-size:9px;font-family:sans-serif;color:var(--text-light);
  text-transform:uppercase;letter-spacing:.5px}

/* ── OVERLAY (full screen panels) ────────────────────────── */
.panel{
  display:none;position:fixed;top:0;left:50%;transform:translateX(-50%);
  width:100%;max-width:430px;height:100vh;background:var(--wine-cream);
  z-index:100;overflow-y:auto;-webkit-overflow-scrolling:touch;
}
.panel.open{display:block}
.panel-header{
  background:var(--wine-deep);padding:calc(14px + var(--safe-top)) 20px 20px;
  position:relative;overflow:hidden;
}
.panel-header::before{content:'';position:absolute;top:-40px;right:-20px;
  width:150px;height:150px;background:rgba(196,148,58,.1);border-radius:50%}
.back-btn{
  color:rgba(255,255,255,.7);background:none;border:none;font-size:13px;
  cursor:pointer;display:flex;align-items:center;gap:6px;font-family:sans-serif;
  margin-bottom:10px;padding:0;
}
.back-btn i{font-size:20px}
.panel-vintage{color:var(--wine-gold);font-size:11px;font-family:sans-serif;
  letter-spacing:2.5px;margin-bottom:3px;text-transform:uppercase}
.panel-title{color:white;font-size:19px;font-weight:700;line-height:1.3;margin-bottom:3px}
.panel-sub{color:rgba(255,255,255,.6);font-size:12px;font-family:sans-serif}
.panel-badges{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}
.pbadge{padding:4px 12px;border-radius:20px;font-size:11px;font-family:sans-serif;font-weight:500}
.pbadge-red{background:rgba(196,81,106,.25);color:#FFB8C6}
.pbadge-white{background:rgba(196,148,58,.25);color:var(--wine-gold-light)}
.pbadge-rose{background:rgba(212,83,126,.25);color:#F4C0D1}
.pbadge-sparkling{background:rgba(133,183,235,.25);color:#B5D4F4}
.pbadge-pts{background:rgba(196,148,58,.2);color:var(--wine-gold-light)}
.pbadge-neutral{background:rgba(255,255,255,.12);color:rgba(255,255,255,.7)}

/* ── DETAIL SECTION ───────────────────────────────────────── */
.detail-section{
  background:var(--card-bg);border:.5px solid var(--border);
  border-radius:12px;margin:10px 14px;padding:13px 15px;
}
.sec-title{
  font-size:10px;font-family:sans-serif;text-transform:uppercase;
  letter-spacing:1.5px;color:var(--text-light);margin-bottom:10px;
  display:flex;align-items:center;gap:6px;
}
.sec-title i{font-size:14px}
.detail-row{display:flex;justify-content:space-between;align-items:baseline;
  padding:5px 0;border-bottom:.5px solid var(--border)}
.detail-row:last-child{border-bottom:none}
.dl{font-size:12px;font-family:sans-serif;color:var(--text-light)}
.dv{font-size:13px;font-family:sans-serif;color:var(--text-dark);
  font-weight:500;text-align:right;max-width:210px;word-break:break-word}

/* ── DRINK WINDOW BAR ─────────────────────────────────────── */
.dw-labels{display:flex;justify-content:space-between;font-size:11px;
  font-family:sans-serif;color:var(--text-light);margin-bottom:4px}
.dw-track{height:8px;background:var(--surface);border-radius:4px;overflow:hidden}
.dw-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,#2D6A4F,#52B788,#2D6A4F)}
.dw-status{font-size:12px;font-family:sans-serif;margin-top:6px;
  display:flex;align-items:center;gap:4px}

/* ── VINTAGE RANK ─────────────────────────────────────────── */
.vrank-row{display:flex;align-items:center;gap:12px;padding:6px 0}
.vrank-bar{flex:1;height:6px;background:var(--surface);border-radius:3px;overflow:hidden}
.vrank-fill{height:100%;border-radius:3px}
.rank-great{background:linear-gradient(90deg,#2D6A4F,#52B788)}
.rank-good{background:linear-gradient(90deg,#185FA5,#378ADD)}
.rank-avg{background:linear-gradient(90deg,#BA7517,#EF9F27)}
.vrank-score{font-size:14px;font-weight:700;color:var(--text-dark);font-family:sans-serif;min-width:28px}

/* ── EXPERT REVIEWS ───────────────────────────────────────── */
.review-card{background:var(--surface);border-radius:8px;padding:10px 12px;margin-bottom:8px}
.review-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px}
.review-src{font-size:12px;font-weight:700;font-family:sans-serif;color:var(--text-dark)}
.review-pts{background:var(--wine-deep);color:var(--wine-gold);font-size:13px;
  font-weight:700;padding:2px 10px;border-radius:6px;font-family:sans-serif}
.review-body{font-size:12px;color:var(--text-mid);font-family:sans-serif;line-height:1.55}
.review-dw{font-size:11px;color:var(--info);margin-top:4px;font-family:sans-serif}

/* ── FOOD CHIPS ───────────────────────────────────────────── */
.food-grid{display:flex;flex-wrap:wrap;gap:6px}
.food-chip{background:rgba(45,106,79,.08);color:var(--success);
  border:.5px solid rgba(45,106,79,.2);border-radius:20px;
  padding:5px 12px;font-size:12px;font-family:sans-serif}

/* ── MY NOTES ─────────────────────────────────────────────── */
.star-row{display:flex;gap:2px;align-items:center}
.star-btn{font-size:24px;cursor:pointer;background:none;border:none;
  color:#DDD;transition:color .12s;line-height:1;padding:2px}
.star-btn.lit{color:var(--wine-gold)}
.notes-ta{width:100%;border:.5px solid var(--border);border-radius:8px;
  padding:10px 12px;font-size:13px;font-family:sans-serif;color:var(--text-dark);
  background:white;min-height:90px;resize:none;outline:none;line-height:1.5}

/* ── ACTION ROW ───────────────────────────────────────────── */
.action-row{display:flex;gap:8px;padding:10px 14px}
.act-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;
  padding:10px 6px;border-radius:10px;border:.5px solid var(--border);
  background:white;cursor:pointer;color:var(--text-mid);font-size:10px;
  font-family:sans-serif;text-transform:uppercase;letter-spacing:.4px;transition:all .15s}
.act-btn i{font-size:21px;color:var(--wine-mid)}
.act-btn:active{background:var(--surface)}

/* ── ADD FORM ─────────────────────────────────────────────── */
.form-section{margin:10px 14px 0}
.form-sec-label{font-size:10px;font-family:sans-serif;text-transform:uppercase;
  letter-spacing:1.5px;color:var(--text-light);margin-bottom:7px;margin-top:2px}
.form-card{background:white;border:.5px solid var(--border);border-radius:10px;
  padding:11px 13px;margin-bottom:8px}
.form-label{font-size:10px;font-family:sans-serif;text-transform:uppercase;
  letter-spacing:1px;color:var(--text-light);margin-bottom:3px}
.form-input{width:100%;border:none;outline:none;font-size:14px;
  color:var(--text-dark);background:transparent;font-family:sans-serif;padding:0}
.form-input::placeholder{color:var(--text-light)}
.form-row{display:flex;gap:8px}
.form-row .form-card{flex:1}
.form-textarea{width:100%;border:none;outline:none;font-size:13px;
  color:var(--text-dark);background:transparent;font-family:sans-serif;
  resize:none;min-height:70px;line-height:1.5}
.type-grid{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:8px}
.type-opt{padding:8px 16px;border-radius:20px;border:.5px solid var(--border);
  background:white;font-size:12px;font-family:sans-serif;color:var(--text-mid);
  cursor:pointer;transition:all .15s;user-select:none}
.type-opt.sel{background:var(--wine-mid);color:white;border-color:var(--wine-mid)}
.type-opt.sel-white{background:#C4943A}
.type-opt.sel-rose{background:#D4537E}
.type-opt.sel-sparkling{background:#185FA5}
.type-opt.sel-dessert{background:#BA7517}
.type-opt.sel-fortified{background:#534AB7}

/* ── BIG BUTTONS ──────────────────────────────────────────── */
.scan-btn-big{width:100%;padding:15px;background:var(--wine-deep);color:var(--wine-gold);
  border:none;border-radius:12px;font-size:14px;font-family:sans-serif;font-weight:700;
  display:flex;align-items:center;justify-content:center;gap:10px;cursor:pointer;
  margin-bottom:9px;letter-spacing:.5px}
.scan-btn-big i{font-size:22px}
.fetch-btn{width:100%;padding:13px;background:white;color:var(--wine-mid);
  border:1.5px solid var(--wine-mid);border-radius:12px;font-size:13px;
  font-family:sans-serif;font-weight:600;display:flex;align-items:center;
  justify-content:center;gap:9px;cursor:pointer;margin-bottom:9px}
.photo-btn{width:100%;padding:20px 14px;background:var(--surface);color:var(--text-mid);
  border:.5px dashed rgba(74,22,40,.28);border-radius:12px;font-size:13px;
  font-family:sans-serif;display:flex;flex-direction:column;align-items:center;
  justify-content:center;gap:5px;cursor:pointer;margin-bottom:10px}
.photo-btn i{font-size:30px;color:var(--wine-light)}
.photo-preview{max-width:100%;border-radius:8px;margin-top:8px;display:none}
.submit-btn{width:calc(100% - 28px);margin:14px;padding:15px;background:var(--wine-mid);
  color:white;border:none;border-radius:12px;font-size:16px;font-family:sans-serif;
  font-weight:700;cursor:pointer;letter-spacing:.4px}
.delete-btn{width:calc(100% - 28px);margin:0 14px 14px;padding:13px;
  background:rgba(139,26,44,.08);color:var(--danger);border:.5px solid rgba(139,26,44,.2);
  border-radius:12px;font-size:14px;font-family:sans-serif;cursor:pointer}

/* ── LOADING ──────────────────────────────────────────────── */
.loading-dots{display:flex;gap:5px;justify-content:center;padding:18px}
.dot{width:7px;height:7px;background:var(--wine-light);border-radius:50%;
  animation:pulse 1.2s ease-in-out infinite}
.dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}
@keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
.loading-text{text-align:center;font-family:sans-serif;font-size:12px;
  color:var(--text-light);padding-bottom:10px}
#fetchStatus{display:none}

/* ── SORT SHEET ───────────────────────────────────────────── */
.sort-sheet{
  display:none;position:fixed;bottom:0;left:50%;transform:translateX(-50%);
  width:100%;max-width:430px;background:white;border-radius:20px 20px 0 0;
  z-index:300;padding:18px 20px calc(28px + var(--safe-bot));
  box-shadow:0 -4px 30px rgba(0,0,0,.14);
}
.sort-sheet.open{display:block}
.sort-handle{width:38px;height:4px;background:var(--border);border-radius:2px;margin:0 auto 15px}
.sort-title{font-size:16px;font-weight:700;color:var(--text-dark);margin-bottom:13px}
.sort-opt{display:flex;align-items:center;gap:11px;padding:12px 0;
  border-bottom:.5px solid var(--border);cursor:pointer;color:var(--text-dark);
  font-family:sans-serif;font-size:14px;user-select:none}
.sort-opt:last-child{border-bottom:none}
.sort-opt i{font-size:18px;color:var(--wine-mid)}
.sort-opt.active-sort{color:var(--wine-mid);font-weight:600}
.sort-check{margin-left:auto;color:var(--wine-mid);font-size:18px}
.modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.38);z-index:290}
.modal-overlay.open{display:block}

/* ── SCAN OVERLAY ─────────────────────────────────────────── */
.scan-overlay{
  display:none;position:fixed;top:0;left:50%;transform:translateX(-50%);
  width:100%;max-width:430px;height:100vh;background:#000;z-index:400;
  flex-direction:column;align-items:center;justify-content:center;
}
.scan-overlay.open{display:flex}
.scan-vf{width:260px;height:160px;border:2px solid var(--wine-gold);
  border-radius:10px;position:relative;display:flex;align-items:center;justify-content:center}
.sc{position:absolute;width:22px;height:22px}
.sc.tl{top:-2px;left:-2px;border-top:3px solid var(--wine-gold);border-left:3px solid var(--wine-gold)}
.sc.tr{top:-2px;right:-2px;border-top:3px solid var(--wine-gold);border-right:3px solid var(--wine-gold)}
.sc.bl{bottom:-2px;left:-2px;border-bottom:3px solid var(--wine-gold);border-left:3px solid var(--wine-gold)}
.sc.br{bottom:-2px;right:-2px;border-bottom:3px solid var(--wine-gold);border-right:3px solid var(--wine-gold)}
.scan-line{width:220px;height:2px;background:var(--wine-gold);opacity:.75;
  animation:scanline 2s ease-in-out infinite;border-radius:1px}
@keyframes scanline{0%{transform:translateY(-58px)}50%{transform:translateY(58px)}100%{transform:translateY(-58px)}}
.scan-note{color:rgba(255,255,255,.68);font-family:sans-serif;font-size:14px;
  margin-top:22px;text-align:center}
.scan-sub{color:rgba(255,255,255,.38);font-family:sans-serif;font-size:12px;
  margin-top:5px;text-align:center;padding:0 30px}
.scan-cancel-btn{color:rgba(255,255,255,.55);background:none;
  border:1px solid rgba(255,255,255,.2);border-radius:8px;
  padding:11px 30px;font-family:sans-serif;font-size:14px;cursor:pointer;margin-top:36px}
#scanVideo{width:260px;height:160px;object-fit:cover;border-radius:8px;position:absolute;top:0;left:0}

/* ── INSIGHTS TAB ─────────────────────────────────────────── */
.ins-card{background:var(--card-bg);border:.5px solid var(--border);
  border-radius:12px;padding:14px 16px;margin-bottom:10px}
.ins-title{font-size:12px;font-family:sans-serif;font-weight:700;
  color:var(--text-dark);margin-bottom:10px}
.ins-bar-row{display:flex;align-items:center;gap:10px;margin-bottom:7px}
.ins-bar-label{font-size:12px;font-family:sans-serif;color:var(--text-mid);
  min-width:70px;text-align:right}
.ins-bar-track{flex:1;height:10px;background:var(--surface);border-radius:5px;overflow:hidden}
.ins-bar-fill{height:100%;border-radius:5px;background:linear-gradient(90deg,var(--wine-mid),var(--wine-light))}
.ins-bar-val{font-size:12px;font-family:sans-serif;color:var(--text-dark);font-weight:600;min-width:22px}
.ins-stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.ins-stat{background:var(--surface);border-radius:8px;padding:10px 12px;text-align:center}
.ins-stat-num{font-size:22px;font-weight:700;color:var(--wine-gold);display:block}
.ins-stat-label{font-size:10px;font-family:sans-serif;color:var(--text-light);
  text-transform:uppercase;letter-spacing:.8px;margin-top:2px}

/* ── SHARE TAB ────────────────────────────────────────────── */
.share-banner{background:var(--wine-deep);border-radius:12px;padding:16px;
  margin-bottom:10px;display:flex;align-items:center;gap:12px;cursor:pointer}
.share-banner i{font-size:28px;color:var(--wine-gold);flex-shrink:0}
.share-text{flex:1}
.share-title{color:white;font-size:14px;font-weight:700;font-family:sans-serif}
.share-sub{color:rgba(255,255,255,.5);font-size:11px;font-family:sans-serif;margin-top:2px}
.share-arrow{color:var(--wine-gold);font-size:18px}
.sync-input{width:100%;background:white;border:.5px solid var(--border);
  border-radius:8px;padding:11px 13px;font-size:13px;
  color:var(--text-dark);font-family:sans-serif;margin-bottom:8px;outline:none}
.sync-btn{width:100%;padding:13px;background:var(--wine-mid);color:white;
  border:none;border-radius:10px;font-size:14px;font-family:sans-serif;
  font-weight:600;cursor:pointer;margin-bottom:8px}
.share-code-box{background:var(--wine-deep);border-radius:10px;padding:14px 16px;
  text-align:center;margin-bottom:10px}
.share-code{color:var(--wine-gold);font-size:28px;font-weight:700;
  font-family:sans-serif;letter-spacing:6px}
.share-code-label{color:rgba(255,255,255,.45);font-size:11px;font-family:sans-serif;
  margin-top:4px;text-align:center}

/* ── TOAST ────────────────────────────────────────────────── */
.toast{
  position:fixed;bottom:calc(72px + var(--safe-bot));left:50%;
  transform:translateX(-50%) translateY(20px);background:var(--text-dark);
  color:white;padding:10px 20px;border-radius:20px;font-family:sans-serif;
  font-size:13px;z-index:999;opacity:0;transition:all .3s;pointer-events:none;
  white-space:nowrap;
}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}

/* ── EDIT OVERLAY ─────────────────────────────────────────── */
.spacer{height:16px}
.spacer-lg{height:80px}

/* ── DRINK SOON TAB ───────────────────────────────────────── */
.ds-section-label{font-size:11px;font-family:sans-serif;text-transform:uppercase;
  letter-spacing:1.5px;color:var(--text-light);margin:0 0 8px;display:block}
.drink-soon-card{background:var(--card-bg);border:.5px solid rgba(45,106,79,.25);
  border-radius:12px;padding:12px 14px;margin-bottom:10px;cursor:pointer;
  border-left:4px solid var(--success)}
.drink-soon-card.urgent{border-left-color:var(--danger);border-color:rgba(139,26,44,.25)}
.drink-soon-card.future{border-left-color:var(--info);border-color:rgba(26,74,122,.15)}

/* ── CONFIRM DIALOG ───────────────────────────────────────── */
.confirm-dialog{
  display:none;position:fixed;inset:0;z-index:500;
  align-items:center;justify-content:center;background:rgba(0,0,0,.45);
}
.confirm-dialog.open{display:flex}
.confirm-box{background:white;border-radius:16px;padding:24px;width:300px;text-align:center}
.confirm-title{font-size:17px;font-weight:700;color:var(--text-dark);margin-bottom:8px}
.confirm-msg{font-size:13px;color:var(--text-mid);font-family:sans-serif;line-height:1.5;margin-bottom:20px}
.confirm-btns{display:flex;gap:10px}
.confirm-cancel{flex:1;padding:11px;background:var(--surface);border:none;
  border-radius:10px;font-family:sans-serif;font-size:14px;cursor:pointer;color:var(--text-mid)}
.confirm-ok{flex:1;padding:11px;background:var(--danger);border:none;
  border-radius:10px;font-family:sans-serif;font-size:14px;cursor:pointer;color:white;font-weight:600}
</style>
</head>
<body>

<!-- STATUS BAR -->
<div class="status-bar">
  <span class="status-time" id="statusTime">9:41</span>
  <div class="status-icons">
    <i class="ti ti-wifi" aria-hidden="true"></i>
    <i class="ti ti-battery-2" aria-hidden="true"></i>
  </div>
</div>

<!-- APP HEADER -->
<div class="app-header">
  <div class="header-top">
    <div>
      <div class="app-name">TBS Wine Cellar</div>
      <div class="app-subtitle">Your personal collection</div>
    </div>
    <div class="header-actions">
      <button class="hdr-btn" onclick="openSort()" aria-label="Sort"><i class="ti ti-arrows-sort" aria-hidden="true"></i></button>
      <button class="hdr-btn" onclick="exportData()" aria-label="Export"><i class="ti ti-download" aria-hidden="true"></i></button>
    </div>
  </div>
  <div class="header-stats" id="headerStats">
    <div class="stat-pill"><span class="stat-num" id="statBottles">0</span><span class="stat-label">Bottles</span></div>
    <div class="stat-pill"><span class="stat-num" id="statWines">0</span><span class="stat-label">Wines</span></div>
    <div class="stat-pill"><span class="stat-num" id="statDrinkNow">0</span><span class="stat-label">Drink Now</span></div>
    <div class="stat-pill"><span class="stat-num" id="statAvgRating">—</span><span class="stat-label">Avg Rating</span></div>
  </div>
</div>

<!-- NAV TABS -->
<div class="nav-tabs">
  <button class="nav-tab active" onclick="switchTab('cellar',this)" aria-label="Cellar">
    <i class="ti ti-building-store" aria-hidden="true"></i>Cellar
  </button>
  <button class="nav-tab" onclick="switchTab('drinkSoon',this)" aria-label="Drink Soon">
    <i class="ti ti-calendar-check" aria-hidden="true"></i>Drink Soon
  </button>
  <button class="nav-tab" onclick="switchTab('insights',this)" aria-label="Insights">
    <i class="ti ti-chart-pie" aria-hidden="true"></i>Insights
  </button>
  <button class="nav-tab" onclick="switchTab('share',this)" aria-label="Share">
    <i class="ti ti-users" aria-hidden="true"></i>Share
  </button>
</div>

<!-- SCROLLABLE CONTENT -->
<div class="content-area">

  <!-- CELLAR TAB -->
  <div class="tab-content active" id="tab-cellar">
    <div class="search-bar">
      <div class="search-wrap">
        <i class="ti ti-search" aria-hidden="true"></i>
        <input class="search-input" id="searchInput" placeholder="Search wines, producers, grapes…" type="search" aria-label="Search wines" oninput="renderWineList()">
      </div>
      <button class="sort-btn" onclick="openSort()" aria-label="Sort wines"><i class="ti ti-adjustments-horizontal" aria-hidden="true"></i></button>
    </div>
    <div class="filter-chips" id="filterChips">
      <div class="chip active" onclick="setFilter('all',this)">All</div>
      <div class="chip" onclick="setFilter('red',this)">🔴 Red</div>
      <div class="chip" onclick="setFilter('white',this)">🟡 White</div>
      <div class="chip" onclick="setFilter('rose',this)">🌸 Rosé</div>
      <div class="chip" onclick="setFilter('sparkling',this)">🥂 Sparkling</div>
      <div class="chip" onclick="setFilter('dessert',this)">✨ Dessert</div>
      <div class="chip" onclick="setFilter('fortified',this)">🍷 Fortified</div>
    </div>
    <div id="wineList"></div>
  </div>

  <!-- DRINK SOON TAB -->
  <div class="tab-content" id="tab-drinkSoon">
    <div id="drinkSoonList"></div>
  </div>

  <!-- INSIGHTS TAB -->
  <div class="tab-content" id="tab-insights">
    <div id="insightsContent"></div>
  </div>

  <!-- SHARE TAB -->
  <div class="tab-content" id="tab-share">
    <div class="share-banner" onclick="generateShareCode()">
      <i class="ti ti-share" aria-hidden="true"></i>
      <div class="share-text">
        <div class="share-title">Share your cellar</div>
        <div class="share-sub">Generate a code to sync with another Android device</div>
      </div>
      <i class="ti ti-chevron-right share-arrow" aria-hidden="true"></i>
    </div>
    <div id="shareCodeArea" style="display:none">
      <div class="share-code-box">
        <div class="share-code" id="shareCode">——</div>
        <div class="share-code-label">Share this code with the other device</div>
      </div>
    </div>
    <div class="ins-card">
      <div class="ins-title">Join a shared cellar</div>
      <input class="sync-input" id="joinCodeInput" placeholder="Enter share code (e.g. TBS-4829)" maxlength="8" style="text-transform:uppercase">
      <button class="sync-btn" onclick="joinCellar()">Join Cellar</button>
    </div>
    <div class="ins-card">
      <div class="ins-title">Export / Backup</div>
      <button class="sync-btn" style="margin-bottom:8px" onclick="exportData()">
        <i class="ti ti-download" aria-hidden="true"></i> Export as JSON
      </button>
      <label class="sync-btn" style="display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer">
        <i class="ti ti-upload" aria-hidden="true"></i> Import JSON backup
        <input type="file" accept=".json" style="display:none" onchange="importData(event)">
      </label>
    </div>
    <div class="ins-card">
      <div class="ins-title">Install as Home Screen App</div>
      <p style="font-size:13px;font-family:sans-serif;color:var(--text-mid);line-height:1.6;margin-bottom:10px">
        On Android: tap the <b>⋮</b> menu in Chrome → <b>Add to Home screen</b> → <b>Install</b>. TBS Wine Cellar will appear on your home screen like a native app, works offline, and keeps all your data.
      </p>
      <button class="sync-btn" id="installBtn" style="display:none" onclick="triggerInstall()">
        <i class="ti ti-download" aria-hidden="true"></i> Install App Now
      </button>
    </div>
    <div class="ins-card">
      <div class="ins-title">Real Review</div>
      <p style="font-size:13px;font-family:sans-serif;color:var(--text-mid);line-height:1.6;margin-bottom:10px">
        Link your Real Review subscription to automatically pull expert scores and notes into each wine entry.
      </p>
      <button class="sync-btn" onclick="openUrl('https://www.therealreview.com')">
        <i class="ti ti-external-link" aria-hidden="true"></i> Open Real Review
      </button>
    </div>
    <div class="spacer-lg"></div>
  </div>

</div><!-- /content-area -->

<!-- BOTTOM NAV -->
<nav class="bottom-nav" role="navigation" aria-label="Main navigation">
  <button class="bnav-item active" onclick="switchTab('cellar',null,this)" aria-label="Cellar">
    <i class="ti ti-building-store" aria-hidden="true"></i>Cellar
  </button>
  <button class="bnav-item" onclick="switchTab('drinkSoon',null,this)" aria-label="Drink soon">
    <i class="ti ti-calendar-check" aria-hidden="true"></i>Drink Soon
  </button>
  <button class="add-bnav" onclick="openAddForm()" aria-label="Add wine">
    <div class="add-circle"><i class="ti ti-plus" aria-hidden="true"></i></div>
    <span class="add-nav-label">Add</span>
  </button>
  <button class="bnav-item" onclick="switchTab('insights',null,this)" aria-label="Insights">
    <i class="ti ti-chart-bar" aria-hidden="true"></i>Insights
  </button>
  <button class="bnav-item" onclick="switchTab('share',null,this)" aria-label="Share">
    <i class="ti ti-share" aria-hidden="true"></i>Share
  </button>
</nav>

<!-- ═══ DETAIL PANEL ═══════════════════════════════════════════════ -->
<div class="panel" id="detailPanel" role="dialog" aria-modal="true" aria-label="Wine detail">
  <div class="panel-header" id="detailHeader">
    <button class="back-btn" onclick="closePanel('detailPanel')"><i class="ti ti-arrow-left" aria-hidden="true"></i> My Cellar</button>
    <div class="panel-vintage" id="dVintage"></div>
    <div class="panel-title" id="dName"></div>
    <div class="panel-sub" id="dProducer"></div>
    <div class="panel-badges" id="dBadges"></div>
  </div>
  <div class="action-row">
    <button class="act-btn" onclick="openLabelCamera()" aria-label="Photo label"><i class="ti ti-camera" aria-hidden="true"></i>Label</button>
    <button class="act-btn" onclick="openBarcodeScanner()" aria-label="Scan barcode"><i class="ti ti-barcode" aria-hidden="true"></i>Barcode</button>
    <button class="act-btn" onclick="openRealReview()" aria-label="Real Review"><i class="ti ti-external-link" aria-hidden="true"></i>Real Review</button>
    <button class="act-btn" onclick="shareWine()" aria-label="Share wine"><i class="ti ti-share" aria-hidden="true"></i>Share</button>
  </div>
  <div id="detailBody"></div>
  <div class="spacer-lg"></div>
</div>

<!-- ═══ ADD / EDIT PANEL ═════════════════════════════════════════════ -->
<div class="panel" id="addPanel" role="dialog" aria-modal="true" aria-label="Add wine">
  <div class="panel-header">
    <button class="back-btn" onclick="closePanel('addPanel')"><i class="ti ti-x" aria-hidden="true"></i> Cancel</button>
    <div class="panel-title" id="addPanelTitle">Add Wine to Cellar</div>
    <div class="panel-sub">Scan barcode, photograph label, or enter manually</div>
  </div>
  <div class="form-section">
    <button class="scan-btn-big" onclick="openBarcodeScanner()">
      <i class="ti ti-barcode" aria-hidden="true"></i> Scan Bottle Barcode
    </button>
    <button class="fetch-btn" onclick="autoFetch()">
      <i class="ti ti-world-download" aria-hidden="true"></i> Auto-fetch Wine Data from Name
    </button>
    <div id="fetchStatus">
      <div class="loading-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
      <div class="loading-text">Searching wine databases…</div>
    </div>
    <div class="photo-btn" onclick="openLabelCamera()" role="button" aria-label="Photograph label">
      <i class="ti ti-camera" aria-hidden="true"></i>
      <span>Photograph Label</span>
      <span style="font-size:11px;color:var(--text-light)">Tap to open camera</span>
      <img id="labelPreview" class="photo-preview" alt="Label photo preview">
    </div>
  </div>
  <div class="form-section">
    <div class="form-sec-label">Wine Identity</div>
    <div class="form-card">
      <div class="form-label">Wine Name *</div>
      <input class="form-input" id="fName" placeholder="e.g. Penfolds Grange" type="text" autocomplete="off">
    </div>
    <div class="form-card">
      <div class="form-label">Producer / Winery *</div>
      <input class="form-input" id="fProducer" placeholder="e.g. Penfolds" type="text" autocomplete="off">
    </div>
    <div class="form-row">
      <div class="form-card">
        <div class="form-label">Vintage Year *</div>
        <input class="form-input" id="fVintage" placeholder="2018" type="number" min="1800" max="2099">
      </div>
      <div class="form-card">
        <div class="form-label">Bottles Held</div>
        <input class="form-input" id="fBottles" placeholder="6" type="number" min="0">
      </div>
    </div>
  </div>
  <div class="form-section">
    <div class="form-sec-label">Type of Wine</div>
    <div class="type-grid" id="typeGrid">
      <div class="type-opt sel" data-type="red" onclick="selectType(this)">Red</div>
      <div class="type-opt" data-type="white" onclick="selectType(this)">White</div>
      <div class="type-opt" data-type="rose" onclick="selectType(this)">Rosé</div>
      <div class="type-opt" data-type="sparkling" onclick="selectType(this)">Sparkling</div>
      <div class="type-opt" data-type="dessert" onclick="selectType(this)">Dessert</div>
      <div class="type-opt" data-type="fortified" onclick="selectType(this)">Fortified</div>
    </div>
  </div>
  <div class="form-section">
    <div class="form-sec-label">Origin</div>
    <div class="form-card">
      <div class="form-label">Region / Appellation</div>
      <input class="form-input" id="fRegion" placeholder="e.g. Barossa Valley" type="text" autocomplete="off">
    </div>
    <div class="form-row">
      <div class="form-card">
        <div class="form-label">State / Province</div>
        <input class="form-input" id="fState" placeholder="e.g. South Australia" type="text">
      </div>
      <div class="form-card">
        <div class="form-label">Country</div>
        <input class="form-input" id="fCountry" placeholder="e.g. Australia" type="text">
      </div>
    </div>
  </div>
  <div class="form-section">
    <div class="form-sec-label">Grapes & Drinking Window</div>
    <div class="form-card">
      <div class="form-label">Grape Varieties</div>
      <input class="form-input" id="fGrapes" placeholder="e.g. Shiraz 95%, Cabernet 5%" type="text" autocomplete="off">
    </div>
    <div class="form-row">
      <div class="form-card">
        <div class="form-label">Drink From</div>
        <input class="form-input" id="fDrinkFrom" placeholder="2026" type="number" min="2000" max="2099">
      </div>
      <div class="form-card">
        <div class="form-label">Drink By</div>
        <input class="form-input" id="fDrinkTo" placeholder="2040" type="number" min="2000" max="2099">
      </div>
    </div>
  </div>
  <div class="form-section">
    <div class="form-sec-label">Ratings & Notes</div>
    <div class="form-card">
      <div class="form-label">Expert Rating (out of 100)</div>
      <input class="form-input" id="fExpertRating" placeholder="e.g. 95" type="number" min="50" max="100">
    </div>
    <div class="form-card">
      <div class="form-label">My Personal Rating (out of 100)</div>
      <input class="form-input" id="fMyRating" placeholder="e.g. 93" type="number" min="50" max="100">
    </div>
    <div class="form-card">
      <div class="form-label">My Tasting Notes</div>
      <textarea class="form-textarea" id="fNotes" placeholder="Your personal tasting notes, observations, food pairings tried…"></textarea>
    </div>
  </div>
  <div class="form-section">
    <div class="form-sec-label">Extra Details</div>
    <div class="form-card">
      <div class="form-label">Vintage Quality / Ranking Notes</div>
      <textarea class="form-textarea" id="fVintageRank" placeholder="Notes on this vintage year's quality (e.g. exceptional cool season, outstanding for Barossa Shiraz)…" rows="2"></textarea>
    </div>
    <div class="form-card">
      <div class="form-label">Food Matches</div>
      <input class="form-input" id="fFoodMatches" placeholder="e.g. Wagyu beef, lamb shoulder, aged cheddar" type="text">
    </div>
    <div class="form-card">
      <div class="form-label">Purchase Price (AUD)</div>
      <input class="form-input" id="fPrice" placeholder="e.g. 850" type="number" min="0">
    </div>
    <div class="form-card">
      <div class="form-label">Purchase Date</div>
      <input class="form-input" id="fPurchaseDate" type="date">
    </div>
  </div>
  <div class="spacer"></div>
  <button class="submit-btn" id="submitBtn" onclick="saveWine()">
    <i class="ti ti-plus" aria-hidden="true"></i> Add to Cellar
  </button>
  <button class="delete-btn" id="deleteBtn" style="display:none" onclick="confirmDelete()">
    <i class="ti ti-trash" aria-hidden="true"></i> Remove from Cellar
  </button>
  <div class="spacer-lg"></div>
</div>

<!-- ═══ SCAN OVERLAY ═══════════════════════════════════════════════ -->
<div class="scan-overlay" id="scanOverlay" role="dialog" aria-modal="true" aria-label="Barcode scanner">
  <div class="scan-vf">
    <div class="sc tl"></div><div class="sc tr"></div>
    <div class="sc bl"></div><div class="sc br"></div>
    <video id="scanVideo" autoplay playsinline muted style="display:none"></video>
    <div class="scan-line" id="scanLine"></div>
  </div>
  <div class="scan-note">Point at the barcode on the bottle</div>
  <div class="scan-sub">Camera access required — tap Allow when prompted. Hold steady for best results.</div>
  <button class="scan-cancel-btn" onclick="closeScan()">Cancel</button>
</div>

<!-- ═══ SORT SHEET ════════════════════════════════════════════════ -->
<div class="modal-overlay" id="modalOverlay" onclick="closeSort()"></div>
<div class="sort-sheet" id="sortSheet" role="dialog" aria-modal="true" aria-label="Sort options">
  <div class="sort-handle"></div>
  <div class="sort-title">Sort Collection</div>
  <div class="sort-opt active-sort" data-sort="vintage" onclick="setSort(this)">
    <i class="ti ti-calendar-event" aria-hidden="true"></i> Vintage Year
    <i class="ti ti-check sort-check" aria-hidden="true"></i>
  </div>
  <div class="sort-opt" data-sort="alpha" onclick="setSort(this)">
    <i class="ti ti-sort-ascending-letters" aria-hidden="true"></i> Winery A–Z
  </div>
  <div class="sort-opt" data-sort="grape" onclick="setSort(this)">
    <i class="ti ti-plant-2" aria-hidden="true"></i> Dominant Grape
  </div>
  <div class="sort-opt" data-sort="drink" onclick="setSort(this)">
    <i class="ti ti-clock" aria-hidden="true"></i> Drink-by Date
  </div>
  <div class="sort-opt" data-sort="rating" onclick="setSort(this)">
    <i class="ti ti-star" aria-hidden="true"></i> Expert Rating
  </div>
  <div class="sort-opt" data-sort="bottles" onclick="setSort(this)">
    <i class="ti ti-bottle" aria-hidden="true"></i> Bottle Count
  </div>
</div>

<!-- ═══ CONFIRM DIALOG ═══════════════════════════════════════════ -->
<div class="confirm-dialog" id="confirmDialog" role="alertdialog">
  <div class="confirm-box">
    <div class="confirm-title">Remove Wine?</div>
    <div class="confirm-msg">This will permanently remove this wine from your cellar. This cannot be undone.</div>
    <div class="confirm-btns">
      <button class="confirm-cancel" onclick="closeConfirm()">Keep It</button>
      <button class="confirm-ok" onclick="deleteWine()">Remove</button>
    </div>
  </div>
</div>

<!-- TOAST -->
<div class="toast" id="toast" aria-live="polite"></div>

<!-- CAMERA INPUT (hidden) -->
<input type="file" id="cameraInput" accept="image/*" capture="environment" style="display:none" onchange="handleLabelPhoto(event)">

<script>
// ═══════════════════════════════════════════════════════════════════
// DATA LAYER — localStorage persistence
// ═══════════════════════════════════════════════════════════════════
const STORAGE_KEY = 'tbs_wine_cellar_v2';

let db = { wines:[], sortBy:'vintage', filterType:'all', shareCode:null };
let editingId = null;
let deferredInstall = null;

function loadDB(){
  try{ const s=localStorage.getItem(STORAGE_KEY); if(s) db=JSON.parse(s); }
  catch(e){ console.warn('DB load error',e); }
  if(!db.wines) db.wines=[];
}
function saveDB(){
  try{ localStorage.setItem(STORAGE_KEY,JSON.stringify(db)); }
  catch(e){ showToast('Storage full — export a backup'); }
}

// ═══════════════════════════════════════════════════════════════════
// SAMPLE DATA — shown on first launch
// ═══════════════════════════════════════════════════════════════════
function seedSampleData(){
  if(db.wines.length>0) return;
  db.wines=[
    {id:uid(),name:'Penfolds Grange',producer:'Penfolds',vintage:2018,type:'red',
     region:'Barossa Valley',state:'South Australia',country:'Australia',
     grapes:'Shiraz 95%, Cabernet 5%',bottles:6,drinkFrom:2026,drinkTo:2045,
     expertRating:98,myRating:97,notes:'Opened Jan 2026 — still very closed but incredible depth. Inky purple, dense dark fruits, leather emerging. Will revisit 2028.',
     vintageRank:'Outstanding vintage — cool slow-ripening season produced exceptional concentration. One of the finest Grange vintages of the decade.',
     foodMatches:'Wagyu beef, lamb shoulder, aged cheddar, venison, braised ox cheek, dark chocolate',
     price:895,purchaseDate:'2020-03-15',labelPhoto:null,added:Date.now()},
    {id:uid(),name:'Yering Station Village Chardonnay',producer:'Yering Station',vintage:2022,type:'white',
     region:'Yarra Valley',state:'Victoria',country:'Australia',
     grapes:'Chardonnay 100%',bottles:12,drinkFrom:2024,drinkTo:2030,
     expertRating:91,myRating:90,notes:'Elegant and restrained. Lovely nectarine and white peach with fine acidity.',
     vintageRank:'Good vintage for Yarra Valley whites. Balanced warm season with fresh finish.',
     foodMatches:'Grilled fish, chicken, soft cheeses, asparagus, lobster',
     price:28,purchaseDate:'2023-06-01',labelPhoto:null,added:Date.now()-1000},
    {id:uid(),name:'Château Margaux',producer:'Château Margaux',vintage:2016,type:'red',
     region:'Margaux',state:'Bordeaux',country:'France',
     grapes:'Cabernet Sauvignon 87%, Merlot 8%, Petit Verdot 3%, Cabernet Franc 2%',
     bottles:3,drinkFrom:2028,drinkTo:2060,
     expertRating:100,myRating:98,notes:'Flawless. Purchased en primeur. Do not touch before 2030.',
     vintageRank:'Exceptional — widely rated as the finest Bordeaux vintage of the decade.',
     foodMatches:'Prime rib, duck confit, truffle, aged comté, venison',
     price:1850,purchaseDate:'2019-11-20',labelPhoto:null,added:Date.now()-2000},
    {id:uid(),name:'Whispering Angel',producer:"Château d'Esclans",vintage:2023,type:'rose',
     region:'Provence',state:'',country:'France',
     grapes:'Grenache 70%, Cinsault 20%, Vermentino 10%',
     bottles:6,drinkFrom:2024,drinkTo:2026,
     expertRating:90,myRating:88,notes:'Perfect summer porch wine. Pale salmon, dry, crisp. Drink soon.',
     vintageRank:'Typical fine Provence vintage. Fresh and expressive.',
     foodMatches:'Grilled prawns, salads, light pasta, charcuterie, goat cheese',
     price:42,purchaseDate:'2024-01-10',labelPhoto:null,added:Date.now()-3000},
  ];
  saveDB();
}

function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,7); }

// ═══════════════════════════════════════════════════════════════════
// UI HELPERS
// ═══════════════════════════════════════════════════════════════════
function showToast(msg,duration=2800){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),duration);
}

function openUrl(url){
  window.open(url,'_blank','noopener');
}

function updateClock(){
  const now=new Date();
  document.getElementById('statusTime').textContent=
    now.getHours()+':'+(now.getMinutes()<10?'0':'')+now.getMinutes();
}

// ═══════════════════════════════════════════════════════════════════
// TAB SWITCHING
// ═══════════════════════════════════════════════════════════════════
function switchTab(tab, navEl, bnavEl){
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  document.getElementById('tab-'+tab).classList.add('active');
  if(navEl){ document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active')); navEl.classList.add('active'); }
  if(bnavEl){ document.querySelectorAll('.bnav-item').forEach(t=>t.classList.remove('active')); bnavEl.classList.add('active'); }
  if(tab==='insights') renderInsights();
  if(tab==='drinkSoon') renderDrinkSoon();
}

// ═══════════════════════════════════════════════════════════════════
// FILTER & SORT
// ═══════════════════════════════════════════════════════════════════
function setFilter(type, el){
  db.filterType=type;
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  renderWineList();
}

function openSort(){
  document.getElementById('sortSheet').classList.add('open');
  document.getElementById('modalOverlay').classList.add('open');
}
function closeSort(){
  document.getElementById('sortSheet').classList.remove('open');
  document.getElementById('modalOverlay').classList.remove('open');
}
function setSort(el){
  const sort=el.dataset.sort;
  db.sortBy=sort; saveDB();
  document.querySelectorAll('.sort-opt').forEach(o=>{
    o.classList.remove('active-sort');
    const c=o.querySelector('.sort-check'); if(c) c.remove();
  });
  el.classList.add('active-sort');
  const chk=document.createElement('i'); chk.className='ti ti-check sort-check'; el.appendChild(chk);
  setTimeout(()=>{ closeSort(); renderWineList(); },250);
}

function sortedFiltered(){
  let wines=[...db.wines];
  const q=(document.getElementById('searchInput')||{}).value||'';
  if(q.trim()){
    const lq=q.toLowerCase();
    wines=wines.filter(w=>
      w.name.toLowerCase().includes(lq)||
      w.producer.toLowerCase().includes(lq)||
      (w.grapes||'').toLowerCase().includes(lq)||
      (w.region||'').toLowerCase().includes(lq)||
      String(w.vintage).includes(lq)
    );
  }
  if(db.filterType!=='all'){
    wines=wines.filter(w=>w.type===db.filterType);
  }
  const yr=new Date().getFullYear();
  wines.sort((a,b)=>{
    if(db.sortBy==='vintage') return (b.vintage||0)-(a.vintage||0);
    if(db.sortBy==='alpha') return (a.producer||'').localeCompare(b.producer||'');
    if(db.sortBy==='grape') return (a.grapes||'').localeCompare(b.grapes||'');
    if(db.sortBy==='drink') return (a.drinkTo||9999)-(b.drinkTo||9999);
    if(db.sortBy==='rating') return (b.expertRating||0)-(a.expertRating||0);
    if(db.sortBy==='bottles') return (b.bottles||0)-(a.bottles||0);
    return 0;
  });
  return wines;
}

// ═══════════════════════════════════════════════════════════════════
// DRINK WINDOW HELPER
// ═══════════════════════════════════════════════════════════════════
function drinkStatus(w){
  const yr=new Date().getFullYear();
  if(!w.drinkFrom && !w.drinkTo) return {label:'No window set',cls:'',now:false};
  const from=w.drinkFrom||yr; const to=w.drinkTo||yr+10;
  if(yr<from) return {label:from+'–'+(to||'?'),cls:'',now:false};
  if(yr>to) return {label:'Past window',cls:'drink-past',now:false};
  return {label:'Now–'+to,cls:'drink-now',now:true};
}

// ═══════════════════════════════════════════════════════════════════
// RENDER WINE LIST
// ═══════════════════════════════════════════════════════════════════
function typeTag(t){
  const map={red:'tag-type-red',white:'tag-type-white',rose:'tag-type-rose',
             sparkling:'tag-type-sparkling',dessert:'tag-type-dessert',fortified:'tag-type-fortified'};
  const label={red:'Red',white:'White',rose:'Rosé',sparkling:'Sparkling',dessert:'Dessert',fortified:'Fortified'};
  return `<span class="tag ${map[t]||'tag-region'}">${label[t]||t}</span>`;
}

function renderWineList(){
  const wines=sortedFiltered();
  const el=document.getElementById('wineList');
  if(wines.length===0){
    el.innerHTML=`<div class="empty-state">
      <i class="ti ti-bottle" aria-hidden="true"></i>
      <p>No wines in your cellar yet.<br>Tap <b>+</b> below to add your first wine.</p>
    </div>`;
  } else {
    el.innerHTML=wines.map(w=>{
      const ds=drinkStatus(w);
      const grapeFirst=(w.grapes||'').split(',')[0].trim().replace(/\s*\d+%?$/,'');
      const thumbHtml=w.labelPhoto
        ?`<img class="label-thumb" src="${w.labelPhoto}" alt="Label" loading="lazy">`
        :`<div class="label-placeholder"><i class="ti ti-bottle" aria-hidden="true"></i></div>`;
      return `<div class="wine-card" onclick="openDetail('${w.id}')" role="button" aria-label="${w.name} ${w.vintage}">
        <div class="card-inner">
          <div class="card-accent ${w.type||'red'}"></div>
          <div class="card-body">
            <div class="card-meta">
              <div class="wine-name">${escHtml(w.name)}</div>
              <div class="vintage-badge">${w.vintage||'—'}</div>
            </div>
            <div class="producer-line">${escHtml(w.producer)}${w.region?' · '+escHtml(w.region):''}</div>
            <div class="card-tags">
              ${typeTag(w.type)}
              ${grapeFirst?`<span class="tag tag-grape">${escHtml(grapeFirst)}</span>`:''}
              ${w.country?`<span class="tag tag-region">${escHtml(w.country)}</span>`:''}
            </div>
            <div class="card-footer">
              <span class="bottles-info"><b>${w.bottles||0}</b> bottles</span>
              <span class="drink-window-tag ${ds.cls}">${ds.label}</span>
              ${w.expertRating?`<span class="rating-score">${w.expertRating}</span>`:''}
            </div>
          </div>
          <div class="card-thumb">${thumbHtml}</div>
        </div>
      </div>`;
    }).join('');
  }
  updateStats();
}

// ═══════════════════════════════════════════════════════════════════
// HEADER STATS
// ═══════════════════════════════════════════════════════════════════
function updateStats(){
  const yr=new Date().getFullYear();
  const wines=db.wines;
  const bottles=wines.reduce((s,w)=>s+(+w.bottles||0),0);
  const drinkNow=wines.filter(w=>w.drinkFrom&&w.drinkTo&&yr>=w.drinkFrom&&yr<=w.drinkTo).length;
  const rated=wines.filter(w=>w.expertRating);
  const avgRating=rated.length?Math.round(rated.reduce((s,w)=>s+w.expertRating,0)/rated.length):null;
  document.getElementById('statBottles').textContent=bottles;
  document.getElementById('statWines').textContent=wines.length;
  document.getElementById('statDrinkNow').textContent=drinkNow;
  document.getElementById('statAvgRating').textContent=avgRating||'—';
}

// ═══════════════════════════════════════════════════════════════════
// DRINK SOON TAB
// ═══════════════════════════════════════════════════════════════════
function renderDrinkSoon(){
  const yr=new Date().getFullYear();
  const el=document.getElementById('drinkSoonList');
  const now=db.wines.filter(w=>w.drinkFrom&&w.drinkTo&&yr>=w.drinkFrom&&yr<=w.drinkTo).sort((a,b)=>a.drinkTo-b.drinkTo);
  const soon=db.wines.filter(w=>w.drinkFrom&&yr<w.drinkFrom&&w.drinkFrom-yr<=2).sort((a,b)=>a.drinkFrom-b.drinkFrom);
  const past=db.wines.filter(w=>w.drinkTo&&yr>w.drinkTo).sort((a,b)=>b.drinkTo-a.drinkTo);
  let html='';
  if(now.length){
    html+=`<span class="ds-section-label" style="color:var(--success)"><i class="ti ti-circle-check" style="font-size:13px;margin-right:4px"></i>Drink Now (${now.length})</span>`;
    html+=now.map(w=>`<div class="drink-soon-card" onclick="openDetail('${w.id}')">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div><div style="font-size:14px;font-weight:700;color:var(--text-dark)">${escHtml(w.name)}</div>
        <div style="font-size:12px;color:var(--text-mid);font-family:sans-serif;margin-top:2px">${w.vintage} · ${escHtml(w.producer)}</div></div>
        <div style="text-align:right"><div style="font-size:13px;font-weight:700;color:var(--success);font-family:sans-serif">Drink by ${w.drinkTo}</div>
        <div style="font-size:11px;color:var(--text-light);font-family:sans-serif">${w.bottles} bottles</div></div>
      </div></div>`).join('');
  }
  if(soon.length){
    html+=`<span class="ds-section-label" style="color:var(--info);margin-top:14px;display:block"><i class="ti ti-clock" style="font-size:13px;margin-right:4px"></i>Opening Soon — within 2 years (${soon.length})</span>`;
    html+=soon.map(w=>`<div class="drink-soon-card future" onclick="openDetail('${w.id}')">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div><div style="font-size:14px;font-weight:700;color:var(--text-dark)">${escHtml(w.name)}</div>
        <div style="font-size:12px;color:var(--text-mid);font-family:sans-serif;margin-top:2px">${w.vintage} · ${escHtml(w.producer)}</div></div>
        <div style="text-align:right"><div style="font-size:13px;font-weight:700;color:var(--info);font-family:sans-serif">Opens ${w.drinkFrom}</div>
        <div style="font-size:11px;color:var(--text-light);font-family:sans-serif">${w.bottles} bottles</div></div>
      </div></div>`).join('');
  }
  if(past.length){
    html+=`<span class="ds-section-label" style="color:var(--danger);margin-top:14px;display:block"><i class="ti ti-alert-triangle" style="font-size:13px;margin-right:4px"></i>Past Drinking Window (${past.length})</span>`;
    html+=past.map(w=>`<div class="drink-soon-card urgent" onclick="openDetail('${w.id}')">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div><div style="font-size:14px;font-weight:700;color:var(--text-dark)">${escHtml(w.name)}</div>
        <div style="font-size:12px;color:var(--text-mid);font-family:sans-serif;margin-top:2px">${w.vintage} · ${escHtml(w.producer)}</div></div>
        <div style="text-align:right"><div style="font-size:13px;font-weight:700;color:var(--danger);font-family:sans-serif">Closed ${w.drinkTo}</div>
        <div style="font-size:11px;color:var(--text-light);font-family:sans-serif">${w.bottles} bottles</div></div>
      </div></div>`).join('');
  }
  if(!html) html=`<div class="empty-state"><i class="ti ti-calendar-off" aria-hidden="true"></i><p>No drinking window data yet.<br>Add drinking window dates when entering wines.</p></div>`;
  el.innerHTML=html+'<div class="spacer-lg"></div>';
}

// ═══════════════════════════════════════════════════════════════════
// INSIGHTS TAB
// ═══════════════════════════════════════════════════════════════════
function renderInsights(){
  const el=document.getElementById('insightsContent');
  const wines=db.wines;
  if(!wines.length){ el.innerHTML=`<div class="empty-state"><i class="ti ti-chart-bar" aria-hidden="true"></i><p>Add wines to see insights</p></div>`; return; }
  const bottles=wines.reduce((s,w)=>s+(+w.bottles||0),0);
  const rated=wines.filter(w=>w.expertRating);
  const avgR=rated.length?Math.round(rated.reduce((s,w)=>s+w.expertRating,0)/rated.length):0;
  const value=wines.filter(w=>w.price&&w.bottles).reduce((s,w)=>s+(w.price*w.bottles),0);
  const yr=new Date().getFullYear();
  const drinkNow=wines.filter(w=>w.drinkFrom&&w.drinkTo&&yr>=w.drinkFrom&&yr<=w.drinkTo).length;
  // type breakdown
  const types={red:0,white:0,rose:0,sparkling:0,dessert:0,fortified:0};
  wines.forEach(w=>{if(types[w.type]!==undefined) types[w.type]+=(+w.bottles||0);});
  const maxT=Math.max(...Object.values(types),1);
  const typeLabels={red:'Red',white:'White',rose:'Rosé',sparkling:'Sparkling',dessert:'Dessert',fortified:'Fortified'};
  const typeBars=Object.entries(types).filter(([,v])=>v>0).map(([k,v])=>
    `<div class="ins-bar-row">
      <span class="ins-bar-label">${typeLabels[k]}</span>
      <div class="ins-bar-track"><div class="ins-bar-fill" style="width:${Math.round(v/maxT*100)}%"></div></div>
      <span class="ins-bar-val">${v}</span>
    </div>`).join('');
  // country breakdown
  const countries={};
  wines.forEach(w=>{ if(w.country){ countries[w.country]=(countries[w.country]||0)+(+w.bottles||0); }});
  const maxC=Math.max(...Object.values(countries),1);
  const countryBars=Object.entries(countries).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([k,v])=>
    `<div class="ins-bar-row">
      <span class="ins-bar-label">${k}</span>
      <div class="ins-bar-track"><div class="ins-bar-fill" style="width:${Math.round(v/maxC*100)}%"></div></div>
      <span class="ins-bar-val">${v}</span>
    </div>`).join('');

  el.innerHTML=`
    <div class="ins-stat-grid">
      <div class="ins-stat"><span class="ins-stat-num">${bottles}</span><span class="ins-stat-label">Total Bottles</span></div>
      <div class="ins-stat"><span class="ins-stat-num">${wines.length}</span><span class="ins-stat-label">Distinct Wines</span></div>
      <div class="ins-stat"><span class="ins-stat-num">${avgR||'—'}</span><span class="ins-stat-label">Avg Expert Score</span></div>
      <div class="ins-stat"><span class="ins-stat-num">${drinkNow}</span><span class="ins-stat-label">Drink Now</span></div>
    </div>
    ${value>0?`<div class="ins-card" style="margin-top:10px"><div class="ins-title">Estimated Cellar Value</div>
      <div style="font-size:28px;font-weight:700;color:var(--wine-gold);font-family:sans-serif">A$${value.toLocaleString()}</div>
      <div style="font-size:11px;font-family:sans-serif;color:var(--text-light);margin-top:2px">Based on purchase prices × bottles held</div></div>`:''}
    <div class="ins-card" style="margin-top:10px"><div class="ins-title">Bottles by Type</div>${typeBars}</div>
    <div class="ins-card"><div class="ins-title">Bottles by Country</div>${countryBars}</div>
    <div class="spacer-lg"></div>`;
}

// ═══════════════════════════════════════════════════════════════════
// DETAIL VIEW
// ═══════════════════════════════════════════════════════════════════
function openDetail(id){
  const w=db.wines.find(x=>x.id===id); if(!w) return;
  const yr=new Date().getFullYear();
  const typeLabel={red:'Red Wine',white:'White Wine',rose:'Rosé',sparkling:'Sparkling',dessert:'Dessert',fortified:'Fortified'};
  const typeBadge={red:'pbadge-red',white:'pbadge-white',rose:'pbadge-rose',
                   sparkling:'pbadge-sparkling',dessert:'pbadge-pts',fortified:'pbadge-neutral'};
  document.getElementById('dVintage').textContent='VINTAGE '+w.vintage;
  document.getElementById('dName').textContent=w.name;
  document.getElementById('dProducer').textContent=w.producer+(w.region?' · '+w.region:'');
  document.getElementById('dBadges').innerHTML=
    `<span class="pbadge ${typeBadge[w.type]||'pbadge-neutral'}">${typeLabel[w.type]||w.type}</span>`+
    (w.expertRating?`<span class="pbadge pbadge-pts">${w.expertRating} pts</span>`:'')+
    `<span class="pbadge pbadge-neutral">${w.bottles||0} bottles</span>`;

  // Drink window
  let dwHtml='';
  if(w.drinkFrom||w.drinkTo){
    const from=w.drinkFrom||yr; const to=w.drinkTo||yr+20;
    const total=to-w.vintage; const elapsed=yr-w.vintage; const pct=Math.min(Math.max(Math.round(elapsed/total*100),0),100);
    const nowOpen=yr>=from&&yr<=to; const pastWindow=yr>to;
    dwHtml=`<div class="detail-section">
      <div class="sec-title"><i class="ti ti-calendar" aria-hidden="true"></i>Drinking Window</div>
      <div class="dw-labels"><span>${from} (open)</span><span>${to} (close)</span></div>
      <div class="dw-track"><div class="dw-fill" style="width:${pct}%"></div></div>
      <div class="dw-status" style="color:${pastWindow?'var(--danger)':nowOpen?'var(--success)':'var(--info)'}">
        <i class="ti ${pastWindow?'ti-alert-triangle':nowOpen?'ti-circle-check':'ti-clock'}" aria-hidden="true"></i>
        ${pastWindow?'Past drinking window — drink soon if still available':nowOpen?'Currently in window — enjoy now or cellar to '+to:'Not yet open — ideal from '+from}
      </div>
    </div>`;
  }

  // Vintage ranking
  let vrHtml='';
  if(w.vintageRank){
    vrHtml=`<div class="detail-section">
      <div class="sec-title"><i class="ti ti-chart-bar" aria-hidden="true"></i>Vintage Quality — ${w.vintage} ${w.region||w.country||''}</div>
      <div style="font-size:13px;color:var(--text-mid);font-family:sans-serif;line-height:1.55">${escHtml(w.vintageRank)}</div>
    </div>`;
  }

  // Food matches
  let foodHtml='';
  if(w.foodMatches){
    const foods=w.foodMatches.split(',').map(f=>f.trim()).filter(Boolean);
    foodHtml=`<div class="detail-section">
      <div class="sec-title"><i class="ti ti-meat" aria-hidden="true"></i>Food Matches</div>
      <div class="food-grid">${foods.map(f=>`<div class="food-chip">${escHtml(f)}</div>`).join('')}</div>
    </div>`;
  }

  // My notes
  const myRatingStars=Array.from({length:5},(_,i)=>{
    const pts=w.myRating||0; const filled=i<Math.round(pts/20);
    return `<i class="ti ${filled?'ti-star-filled':'ti-star'}" style="font-size:20px;color:${filled?'var(--wine-gold)':'#DDD'}" aria-hidden="true"></i>`;
  }).join('');

  const body=`
    <div class="detail-section">
      <div class="sec-title"><i class="ti ti-info-circle" aria-hidden="true"></i>Wine Details</div>
      ${row('Producer',w.producer)}${row('Type',(typeLabel[w.type]||w.type))}
      ${row('Region',w.region)}${w.state?row('State',w.state):''}
      ${row('Country',w.country)}${row('Grapes',w.grapes)}
      ${row('Vintage',String(w.vintage))}${row('Bottles Held',String(w.bottles||0))}
      ${w.price?row('Purchase Price','A$'+w.price.toLocaleString()):''}
      ${w.purchaseDate?row('Purchased',w.purchaseDate):''}
    </div>
    ${dwHtml}
    ${vrHtml}
    <div class="detail-section">
      <div class="sec-title"><i class="ti ti-star" aria-hidden="true"></i>Ratings</div>
      ${w.expertRating?row('Expert Rating',w.expertRating+' / 100'):''}
      ${w.myRating?row('My Rating',w.myRating+' / 100'):''}
      <div style="margin-top:8px;display:flex;align-items:center;gap:4px">${myRatingStars}</div>
    </div>
    ${w.notes?`<div class="detail-section">
      <div class="sec-title"><i class="ti ti-pencil" aria-hidden="true"></i>My Tasting Notes</div>
      <div style="font-size:13px;font-family:sans-serif;color:var(--text-mid);line-height:1.6">${escHtml(w.notes)}</div>
    </div>`:''}
    ${foodHtml}
    <div class="detail-section">
      <div class="sec-title"><i class="ti ti-external-link" aria-hidden="true"></i>Resources</div>
      <button style="width:100%;padding:11px;background:rgba(74,22,40,.06);border:.5px solid var(--border);border-radius:8px;color:var(--wine-mid);font-family:sans-serif;font-size:13px;cursor:pointer;margin-bottom:8px" onclick="openRealReview()">
        Open in Real Review →
      </button>
      <button style="width:100%;padding:11px;background:rgba(74,22,40,.06);border:.5px solid var(--border);border-radius:8px;color:var(--wine-mid);font-family:sans-serif;font-size:13px;cursor:pointer" onclick="searchWine('${escAttr(w.name+' '+w.vintage+' '+w.producer)}')">
        Search Wine on Web →
      </button>
    </div>
    <div style="padding:0 14px">
      <button class="submit-btn" style="width:100%;margin:0 0 8px" onclick="openEditForm('${w.id}')">
        <i class="ti ti-edit" aria-hidden="true"></i> Edit Wine
      </button>
    </div>`;

  document.getElementById('detailBody').innerHTML=body;
  openPanel('detailPanel');
  // Store current wine id for actions
  document.getElementById('detailPanel').dataset.wineId=id;
}

function row(label,val){
  if(!val) return '';
  return `<div class="detail-row"><span class="dl">${escHtml(label)}</span><span class="dv">${escHtml(val)}</span></div>`;
}

// ═══════════════════════════════════════════════════════════════════
// PANEL OPEN / CLOSE
// ═══════════════════════════════════════════════════════════════════
function openPanel(id){
  document.getElementById(id).classList.add('open');
  document.getElementById(id).scrollTop=0;
}
function closePanel(id){
  document.getElementById(id).classList.remove('open');
}

// ═══════════════════════════════════════════════════════════════════
// ADD / EDIT FORM
// ═══════════════════════════════════════════════════════════════════
function openAddForm(){
  editingId=null;
  document.getElementById('addPanelTitle').textContent='Add Wine to Cellar';
  document.getElementById('submitBtn').innerHTML='<i class="ti ti-plus" aria-hidden="true"></i> Add to Cellar';
  document.getElementById('deleteBtn').style.display='none';
  clearForm();
  openPanel('addPanel');
}

function openEditForm(id){
  const w=db.wines.find(x=>x.id===id); if(!w) return;
  editingId=id;
  document.getElementById('addPanelTitle').textContent='Edit Wine';
  document.getElementById('submitBtn').innerHTML='<i class="ti ti-device-floppy" aria-hidden="true"></i> Save Changes';
  document.getElementById('deleteBtn').style.display='block';
  // Fill fields
  document.getElementById('fName').value=w.name||'';
  document.getElementById('fProducer').value=w.producer||'';
  document.getElementById('fVintage').value=w.vintage||'';
  document.getElementById('fBottles').value=w.bottles||'';
  document.getElementById('fRegion').value=w.region||'';
  document.getElementById('fState').value=w.state||'';
  document.getElementById('fCountry').value=w.country||'';
  document.getElementById('fGrapes').value=w.grapes||'';
  document.getElementById('fDrinkFrom').value=w.drinkFrom||'';
  document.getElementById('fDrinkTo').value=w.drinkTo||'';
  document.getElementById('fExpertRating').value=w.expertRating||'';
  document.getElementById('fMyRating').value=w.myRating||'';
  document.getElementById('fNotes').value=w.notes||'';
  document.getElementById('fVintageRank').value=w.vintageRank||'';
  document.getElementById('fFoodMatches').value=w.foodMatches||'';
  document.getElementById('fPrice').value=w.price||'';
  document.getElementById('fPurchaseDate').value=w.purchaseDate||'';
  if(w.labelPhoto) { document.getElementById('labelPreview').src=w.labelPhoto; document.getElementById('labelPreview').style.display='block'; }
  // Set type
  document.querySelectorAll('.type-opt').forEach(o=>{
    o.className='type-opt'+(o.dataset.type===w.type?' sel sel-'+w.type:'');
  });
  closePanel('detailPanel');
  openPanel('addPanel');
}

function clearForm(){
  ['fName','fProducer','fVintage','fBottles','fRegion','fState','fCountry','fGrapes',
   'fDrinkFrom','fDrinkTo','fExpertRating','fMyRating','fNotes','fVintageRank','fFoodMatches','fPrice','fPurchaseDate']
    .forEach(id=>{const el=document.getElementById(id); if(el) el.value='';});
  document.querySelectorAll('.type-opt').forEach((o,i)=>{
    o.className='type-opt'+(i===0?' sel':'');
  });
  const lp=document.getElementById('labelPreview'); lp.src=''; lp.style.display='none';
  document.getElementById('fetchStatus').style.display='none';
}

function selectType(el){
  document.querySelectorAll('.type-opt').forEach(o=>o.className='type-opt');
  el.className='type-opt sel sel-'+el.dataset.type;
}

function saveWine(){
  const name=document.getElementById('fName').value.trim();
  const producer=document.getElementById('fProducer').value.trim();
  const vintage=parseInt(document.getElementById('fVintage').value)||null;
  if(!name){ showToast('Please enter a wine name'); return; }
  if(!vintage){ showToast('Please enter a vintage year'); return; }
  const selType=document.querySelector('.type-opt.sel');
  const wineData={
    name, producer,vintage,
    type:selType?selType.dataset.type:'red',
    region:document.getElementById('fRegion').value.trim(),
    state:document.getElementById('fState').value.trim(),
    country:document.getElementById('fCountry').value.trim(),
    grapes:document.getElementById('fGrapes').value.trim(),
    bottles:parseInt(document.getElementById('fBottles').value)||0,
    drinkFrom:parseInt(document.getElementById('fDrinkFrom').value)||null,
    drinkTo:parseInt(document.getElementById('fDrinkTo').value)||null,
    expertRating:parseInt(document.getElementById('fExpertRating').value)||null,
    myRating:parseInt(document.getElementById('fMyRating').value)||null,
    notes:document.getElementById('fNotes').value.trim(),
    vintageRank:document.getElementById('fVintageRank').value.trim(),
    foodMatches:document.getElementById('fFoodMatches').value.trim(),
    price:parseFloat(document.getElementById('fPrice').value)||null,
    purchaseDate:document.getElementById('fPurchaseDate').value||null,
    labelPhoto:document.getElementById('labelPreview').src||null,
  };
  if(editingId){
    const idx=db.wines.findIndex(w=>w.id===editingId);
    if(idx>=0){ db.wines[idx]={...db.wines[idx],...wineData}; }
    showToast('Wine updated ✓');
  } else {
    wineData.id=uid(); wineData.added=Date.now();
    db.wines.unshift(wineData);
    showToast('Wine added to cellar ✓');
  }
  saveDB(); renderWineList(); closePanel('addPanel');
}

function confirmDelete(){
  document.getElementById('confirmDialog').classList.add('open');
}
function closeConfirm(){
  document.getElementById('confirmDialog').classList.remove('open');
}
function deleteWine(){
  if(!editingId) return;
  db.wines=db.wines.filter(w=>w.id!==editingId);
  saveDB(); renderWineList(); closeConfirm(); closePanel('addPanel');
  showToast('Wine removed from cellar');
}

// ═══════════════════════════════════════════════════════════════════
// CAMERA — LABEL PHOTO
// ═══════════════════════════════════════════════════════════════════
function openLabelCamera(){
  const input=document.getElementById('cameraInput');
  input.click();
}
function handleLabelPhoto(e){
  const file=e.target.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=function(ev){
    const preview=document.getElementById('labelPreview');
    preview.src=ev.target.result;
    preview.style.display='block';
    // If editing in detail, also save immediately
    const panelId=document.getElementById('detailPanel').dataset.wineId;
    if(panelId && !document.getElementById('addPanel').classList.contains('open')){
      const w=db.wines.find(x=>x.id===panelId);
      if(w){ w.labelPhoto=ev.target.result; saveDB(); renderWineList(); showToast('Label photo saved ✓'); }
    }
  };
  reader.readAsDataURL(file);
  e.target.value='';
}

// ═══════════════════════════════════════════════════════════════════
// BARCODE SCANNER
// ═══════════════════════════════════════════════════════════════════
let scanStream=null;

async function openBarcodeScanner(){
  document.getElementById('scanOverlay').classList.add('open');
  // Request camera with environment facing (back camera)
  try{
    const stream=await navigator.mediaDevices.getUserMedia({
      video:{ facingMode:{ideal:'environment'}, width:{ideal:1280}, height:{ideal:720} }
    });
    scanStream=stream;
    const video=document.getElementById('scanVideo');
    video.srcObject=stream;
    video.style.display='block';
    document.getElementById('scanLine').style.display='none';
    video.play();
    // Use BarcodeDetector if available (Android Chrome 83+)
    if('BarcodeDetector' in window){
      const bd=new BarcodeDetector({formats:['ean_13','ean_8','upc_a','upc_e','code_128','code_39','qr_code']});
      const detect=async()=>{
        if(!scanStream) return;
        try{
          const barcodes=await bd.detect(video);
          if(barcodes.length>0){
            const code=barcodes[0].rawValue;
            closeScan();
            handleBarcodeResult(code);
            return;
          }
        }catch(e){}
        if(scanStream) requestAnimationFrame(detect);
      };
      video.addEventListener('loadeddata',()=>requestAnimationFrame(detect));
    } else {
      // Fallback message
      setTimeout(()=>{
        if(scanStream){
          closeScan();
          showToast('Barcode scanning not supported — enter details manually');
        }
      },4000);
    }
  }catch(err){
    document.getElementById('scanOverlay').classList.remove('open');
    if(err.name==='NotAllowedError'){
      showToast('Camera permission denied — please allow camera access in Settings');
    } else {
      showToast('Camera unavailable: '+err.message);
    }
  }
}

function closeScan(){
  if(scanStream){ scanStream.getTracks().forEach(t=>t.stop()); scanStream=null; }
  const video=document.getElementById('scanVideo');
  video.srcObject=null; video.style.display='none';
  document.getElementById('scanLine').style.display='block';
  document.getElementById('scanOverlay').classList.remove('open');
}

function handleBarcodeResult(code){
  showToast('Barcode detected: '+code+' — searching…');
  document.getElementById('addPanel').classList.add('open');
  autoFetchByBarcode(code);
}

// ═══════════════════════════════════════════════════════════════════
// AUTO-FETCH — strategy
//
// BARCODE path:
//   1. Try Open Food Facts (quick, catches supermarket wines)
//   2. Try UPC Item DB (broader coverage)
//   3. Always finish with AI + web_search tool enabled
//      → AI searches the web in real time, so even boutique AU wines
//        like Henschke, Grosset, Clonakilla etc. are found correctly
//
// NAME path (manual or post-barcode enrichment):
//   → AI + web_search directly, no barcode lookup needed
// ═══════════════════════════════════════════════════════════════════

async function autoFetch(){
  const name=document.getElementById('fName').value.trim();
  const producer=document.getElementById('fProducer').value.trim();
  const vintage=document.getElementById('fVintage').value.trim();
  if(!name && !producer){ showToast('Enter a wine name or producer first'); return; }
  const query=[vintage,producer,name].filter(Boolean).join(' ');
  setFetchStatus('Searching for wine details…');
  await aiEnrichWineWithSearch(query);
  hideFetchStatus();
}

async function autoFetchByBarcode(code){
  setFetchStatus('Looking up barcode…');

  // ── STEP 1: Open Food Facts ───────────────────────────────────────
  let foundName='', foundProducer='';
  try{
    const r=await fetchWithTimeout(
      'https://world.openfoodfacts.org/api/v0/product/'+encodeURIComponent(code)+'.json', 5000);
    if(r.ok){
      const d=await r.json();
      if(d.status===1 && d.product){
        const p=d.product;
        foundName=(p.product_name_en||p.product_name||'').trim();
        foundProducer=(p.brands||'').split(',')[0].trim();
        if(foundName) document.getElementById('fName').value=foundName;
        if(foundProducer && !document.getElementById('fProducer').value)
          document.getElementById('fProducer').value=foundProducer;
        // Hint wine type from categories
        const cats=(p.categories||'').toLowerCase();
        if(cats.includes('sparkling')||cats.includes('champagne')||cats.includes('prosecco')) setTypeOpt('sparkling');
        else if(cats.includes('white wine')) setTypeOpt('white');
        else if(cats.includes('ros')) setTypeOpt('rose');
        else if(cats.includes('port')||cats.includes('sherry')||cats.includes('fortif')) setTypeOpt('fortified');
        else if(cats.includes('dessert')) setTypeOpt('dessert');
        else if(cats.includes('red wine')||cats.includes('wine')) setTypeOpt('red');
        // Extract vintage from name
        const vm=(foundName+' '+(p.quantity||'')).match(/\b(19|20)\d{2}\b/);
        if(vm && !document.getElementById('fVintage').value) document.getElementById('fVintage').value=vm[0];
      }
    }
  }catch(e){ console.info('OFF lookup:',e.message); }

  // ── STEP 2: UPC Item DB fallback ─────────────────────────────────
  if(!foundName){
    try{
      const r=await fetchWithTimeout(
        'https://api.upcitemdb.com/prod/trial/lookup?upc='+encodeURIComponent(code), 5000);
      if(r.ok){
        const d=await r.json();
        if(d.code==='OK'&&d.items&&d.items[0]){
          foundName=(d.items[0].title||'').trim();
          foundProducer=foundProducer||(d.items[0].brand||'').trim();
          if(foundName && !document.getElementById('fName').value)
            document.getElementById('fName').value=foundName;
          if(foundProducer && !document.getElementById('fProducer').value)
            document.getElementById('fProducer').value=foundProducer;
        }
      }
    }catch(e){ console.info('UPC lookup:',e.message); }
  }

  // ── STEP 3: AI + live web search — always runs ───────────────────
  // Build the best query we can: use whatever the barcode gave us,
  // or fall back to the raw barcode so the AI can try to web-search it.
  const nameNow=document.getElementById('fName').value.trim();
  const prodNow=document.getElementById('fProducer').value.trim();
  const vintNow=document.getElementById('fVintage').value.trim();

  let aiQuery;
  if(nameNow){
    // We have a name — great, AI will find the rest easily
    aiQuery=[vintNow,prodNow,nameNow].filter(Boolean).join(' ');
    setFetchStatus('Filling in wine details…');
  } else {
    // No name from barcode DBs — send barcode itself; AI web-searches it
    aiQuery='barcode '+code+' Australian wine';
    setFetchStatus('Searching web for barcode '+code+'…');
  }

  await aiEnrichWineWithSearch(aiQuery);
  hideFetchStatus();
}

// ── Fetch with timeout ────────────────────────────────────────────
function fetchWithTimeout(url,ms){
  const ctrl=new AbortController();
  const tid=setTimeout(()=>ctrl.abort(),ms);
  return fetch(url,{signal:ctrl.signal,mode:'cors'}).finally(()=>clearTimeout(tid));
}

// ── Set type chip ─────────────────────────────────────────────────
function setTypeOpt(type){
  document.querySelectorAll('.type-opt').forEach(o=>{
    o.className='type-opt'+(o.dataset.type===type?' sel sel-'+type:'');
  });
}

// ── Fetch status helpers ──────────────────────────────────────────
function setFetchStatus(msg){
  const fs=document.getElementById('fetchStatus');
  fs.style.display='block';
  const lt=fs.querySelector('.loading-text'); if(lt) lt.textContent=msg;
}
function hideFetchStatus(){ document.getElementById('fetchStatus').style.display='none'; }

// ── AI enrichment via Netlify serverless proxy ───────────────────
// Calls /.netlify/functions/wine-lookup which runs server-side.
// This avoids the CORS block that prevented direct browser→Anthropic
// calls from working on Netlify (or any non-claude.ai host).
// The proxy also keeps your API key out of the browser entirely.
async function aiEnrichWineWithSearch(query){
  try{
    const resp=await fetch('/.netlify/functions/wine-lookup',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({query})
    });

    // Surface clear error messages based on what went wrong
    if(resp.status===500){
      const err=await resp.json().catch(()=>({}));
      if((err.error||'').includes('ANTHROPIC_API_KEY')){
        showToast('Setup needed — see README: add API key in Netlify');
        showSetupBanner();
        return;
      }
      throw new Error('Server error: '+(err.error||resp.status));
    }
    if(!resp.ok) throw new Error('HTTP '+resp.status);

    const result=await resp.json();
    if(result.error){
      console.warn('Wine lookup error:',result.error);
      const hasName=document.getElementById('fName').value.trim();
      if(!hasName) showToast('Wine not found — type name then tap Auto-fetch');
      return;
    }

    const wine=result.wine;
    if(!wine) throw new Error('No wine data in response');
    populateFormFields(wine);

    const filled=[wine.name,wine.producer,wine.region,wine.grapes].filter(Boolean).length;
    if(filled>=3) showToast('Wine details found ✓');
    else if(filled>0) showToast('Partial details found — please check fields');
    else showToast('Wine not identified — please fill in manually');

  }catch(e){
    console.warn('AI enrich error:',e);
    const hasName=document.getElementById('fName').value.trim();
    if(hasName) showToast('Details not loaded — name saved, fill rest manually');
    else showToast('Wine not found — type name then tap Auto-fetch');
  }
}

// ── Show one-time setup banner if API key is missing ─────────────
function showSetupBanner(){
  if(document.getElementById('setupBanner')) return;
  const b=document.createElement('div');
  b.id='setupBanner';
  b.style.cssText='position:fixed;top:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:#8B1A2C;color:white;padding:14px 16px;z-index:9999;font-family:sans-serif;font-size:13px;line-height:1.5';
  b.innerHTML=`<b>One-time setup needed:</b><br>
    1. Go to your Netlify dashboard → Site → Environment variables<br>
    2. Add <code style="background:rgba(255,255,255,0.2);padding:1px 5px;border-radius:3px">ANTHROPIC_API_KEY</code> = your API key<br>
    3. Trigger a redeploy (Deploys → Trigger deploy)<br>
    <a href="https://console.anthropic.com/settings/keys" target="_blank" style="color:#F0D98A">Get your API key →</a>
    <button onclick="this.parentElement.remove()" style="float:right;background:none;border:none;color:white;font-size:18px;cursor:pointer;margin-top:-4px">×</button>`;
  document.body.appendChild(b);
}

// ── Populate form fields (never overwrites if user already typed) ─
function populateFormFields(wine){
  const set=(id,val,overwrite)=>{
    if(val===null||val===undefined||val==='') return;
    const el=document.getElementById(id);
    if(el&&(overwrite||!el.value)) el.value=String(val);
  };
  set('fName',wine.name);
  set('fProducer',wine.producer);
  set('fVintage',wine.vintage);
  set('fRegion',wine.region,true);
  set('fState',wine.state,true);
  set('fCountry',wine.country,true);
  set('fGrapes',wine.grapes,true);
  set('fDrinkFrom',wine.drinkFrom,true);
  set('fDrinkTo',wine.drinkTo,true);
  set('fExpertRating',wine.expertRating,true);
  set('fVintageRank',wine.vintageRank,true);
  set('fFoodMatches',wine.foodMatches,true);
  if(wine.type) setTypeOpt(wine.type);
}

// ═══════════════════════════════════════════════════════════════════
// REAL REVIEW & WEB SEARCH
// ═══════════════════════════════════════════════════════════════════
function openRealReview(){
  const id=document.getElementById('detailPanel').dataset.wineId;
  const w=id?db.wines.find(x=>x.id===id):null;
  let url='https://www.therealreview.com';
  if(w) url+='/search?q='+encodeURIComponent(w.name+' '+w.vintage);
  openUrl(url);
}

function searchWine(query){
  openUrl('https://www.google.com/search?q='+encodeURIComponent(query+' wine review rating'));
}

// ═══════════════════════════════════════════════════════════════════
// SHARE / EXPORT / IMPORT
// ═══════════════════════════════════════════════════════════════════
function generateShareCode(){
  const code='TBS-'+Math.floor(1000+Math.random()*9000);
  db.shareCode=code; saveDB();
  document.getElementById('shareCode').textContent=code;
  document.getElementById('shareCodeArea').style.display='block';
  // Save cellar to a shareable format (encoded in code for now)
  showToast('Share code generated — send it to your partner device');
}

function joinCellar(){
  const code=document.getElementById('joinCodeInput').value.trim().toUpperCase();
  if(!code.startsWith('TBS-')){ showToast('Invalid code format — should be TBS-XXXX'); return; }
  showToast('Sync feature requires backend — use Export/Import for now');
}

function exportData(){
  const json=JSON.stringify(db.wines,null,2);
  const blob=new Blob([json],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='TBS-Wine-Cellar-'+new Date().toISOString().slice(0,10)+'.json';
  a.click();
  showToast('Cellar exported ✓');
}

function importData(e){
  const file=e.target.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=function(ev){
    try{
      const imported=JSON.parse(ev.target.result);
      if(Array.isArray(imported)){
        const newWines=imported.filter(w=>!db.wines.find(x=>x.id===w.id));
        db.wines=[...db.wines,...newWines];
        saveDB(); renderWineList();
        showToast(`Imported ${newWines.length} wines ✓`);
      } else { showToast('Invalid backup file format'); }
    }catch(err){ showToast('Could not read backup file'); }
  };
  reader.readAsText(file);
  e.target.value='';
}

function shareWine(){
  const id=document.getElementById('detailPanel').dataset.wineId;
  const w=id?db.wines.find(x=>x.id===id):null;
  if(!w) return;
  const text=`🍷 ${w.name} ${w.vintage}\n${w.producer} · ${w.region||''}\nRating: ${w.expertRating||'—'} pts\nDrink: ${w.drinkFrom||'?'}–${w.drinkTo||'?'}\n\nShared from TBS Wine Cellar`;
  if(navigator.share){
    navigator.share({title:'TBS Wine Cellar — '+w.name,text}).catch(()=>{});
  } else {
    navigator.clipboard.writeText(text).then(()=>showToast('Copied to clipboard ✓')).catch(()=>showToast('Share not available'));
  }
}

// ═══════════════════════════════════════════════════════════════════
// PWA INSTALL
// ═══════════════════════════════════════════════════════════════════
window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault(); deferredInstall=e;
  document.getElementById('installBtn').style.display='block';
});
function triggerInstall(){
  if(deferredInstall){ deferredInstall.prompt(); deferredInstall=null; }
  else { showToast('Open in Chrome and use Menu → Add to Home screen'); }
}
window.addEventListener('appinstalled',()=>showToast('TBS Wine Cellar installed! ✓'));

// ═══════════════════════════════════════════════════════════════════
// SECURITY — escape html
// ═══════════════════════════════════════════════════════════════════
function escHtml(s){
  if(!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function escAttr(s){
  if(!s) return '';
  return String(s).replace(/'/g,"\\'").replace(/</g,'&lt;');
}

// ═══════════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════════
function init(){
  loadDB();
  seedSampleData();
  renderWineList();
  updateClock();
  setInterval(updateClock,30000);
  // Register service worker
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').then(()=>{
      console.log('TBS Wine Cellar SW registered');
    }).catch(e=>console.warn('SW registration failed',e));
  }
  // Handle URL params (shortcuts)
  const params=new URLSearchParams(window.location.search);
  if(params.get('action')==='add') setTimeout(openAddForm,300);
  if(params.get('action')==='scan') setTimeout(openBarcodeScanner,300);
}

document.addEventListener('DOMContentLoaded',init);

// Back gesture / button support
window.addEventListener('popstate',()=>{
  document.querySelectorAll('.panel.open').forEach(p=>p.classList.remove('open'));
});
</script>
</body>
</html>

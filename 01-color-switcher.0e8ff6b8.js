!function(){var t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")},n=null;t.startBtn.addEventListener("click",(function(){t.stopBtn.disabled=!1,t.startBtn.disabled=!0,n=setInterval((function(){document.body.style.background="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),t.stopBtn.addEventListener("click",(function(){t.startBtn.disabled=!1,t.stopBtn.disabled=!0,clearInterval(n)}))}();
//# sourceMappingURL=01-color-switcher.0e8ff6b8.js.map

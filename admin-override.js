(() => {
  const adminKey = "irrit8-admin-v1";
  const params = new URLSearchParams(location.search);
  const flag = (params.get("admin") || "").toLowerCase();
  if (flag === "0" || flag === "off" || flag === "false") {
    localStorage.removeItem(adminKey);
    return;
  }
  const enabled = window.IRRIT8_ADMIN
    || /admin\.html$/i.test(location.pathname)
    || flag === "1"
    || flag === "true"
    || flag === "on"
    || localStorage.getItem(adminKey) === "1";
  if (!enabled) return;

  localStorage.setItem(adminKey, "1");
  if (typeof hasPack === "function") hasPack = function () { return true; };
  const badge = document.getElementById("adminBadge");
  if (badge) badge.hidden = false;
  const count = document.getElementById("ownedCount");
  if (count) count.textContent = "4";
  if (typeof renderBoard === "function") renderBoard();
  if (typeof renderStore === "function") {
    const previousOwned = owned;
    owned = new Set(["free", "classic", "brainrot", "domestic", "chaos"]);
    renderStore();
    owned = previousOwned;
  }
})();

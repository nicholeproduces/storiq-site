/* Shared investor numbers. Edit the amounts here; /investor reads this file. */
(function () {
  var brief = {
    useOfFunds: [
      { label: "Marketing tests (Apple Search Ads, Google Ads, creators)", amount: 3000 },
      { label: "UX audit and design", amount: 2500 },
      { label: "Teams, Production Pass, and show templates for pilot customers", amount: 2000 },
      { label: "Security review", amount: 1000 },
      { label: "Buffer (infrastructure, storage, AI)", amount: 1500 },
    ],
    useOfFundsNote: "Draft allocation; final amounts confirmed with investors.",
  };

  function money(amount) {
    return "~$" + amount.toLocaleString("en-US");
  }

  function total() {
    return brief.useOfFunds.reduce(function (sum, row) {
      return sum + row.amount;
    }, 0);
  }

  function row(label, amount, isTotal) {
    return (
      '<li class="d-flex justify-content-between gap-3 py-2 border-bottom' +
      (isTotal ? " fw-semibold" : "") +
      '"><span>' +
      label +
      "</span><strong>" +
      money(amount) +
      "</strong></li>"
    );
  }

  function render() {
    var html = brief.useOfFunds
      .map(function (item) {
        return row(item.label, item.amount, false);
      })
      .join("");
    html += row("Total", total(), true);
    document.querySelectorAll("[data-investor-funds]").forEach(function (el) {
      el.innerHTML = html;
    });
    document.querySelectorAll("[data-investor-funds-note]").forEach(function (el) {
      el.textContent = brief.useOfFundsNote;
    });
  }

  window.MYBOXAI_INVESTOR = brief;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();

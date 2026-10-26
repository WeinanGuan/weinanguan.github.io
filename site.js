(() => {
  const search = document.getElementById('paper-search');
  const year = document.getElementById('year-filter');
  const rows = [...document.querySelectorAll('.publication')];
  const count = document.getElementById('paper-count');
  const empty = document.getElementById('no-papers');
  function filterPapers() {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    rows.forEach(row => {
      const match = (year.value === 'all' || row.dataset.year === year.value)
        && row.textContent.toLocaleLowerCase().includes(query);
      row.hidden = !match;
      if (match) visible++;
    });
    count.textContent = `${visible} ${visible === 1 ? 'work' : 'works'}`;
    empty.hidden = visible !== 0;
  }
  search.addEventListener('input', filterPapers);
  year.addEventListener('change', filterPapers);
  function revealHashTarget() {
    const id = decodeURIComponent(location.hash.slice(1));
    const row = rows.find(item => item.id === id);
    if (row && row.hidden) {
      search.value = ''; year.value = 'all'; filterPapers();
      row.scrollIntoView({block: 'start'});
    }
  }
  window.addEventListener('hashchange', revealHashTarget);
  revealHashTarget();
  const dialog = document.getElementById('figure-dialog');
  const img = document.getElementById('figure-image');
  const title = document.getElementById('figure-title');
  const caption = document.getElementById('figure-caption');
  const source = document.getElementById('figure-source');
  let trigger;
  document.querySelectorAll('.zoom-image').forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || !dialog.showModal) return;
      event.preventDefault();
      trigger = link;
      img.src = link.href;
      img.alt = link.dataset.caption;
      title.textContent = link.dataset.title;
      caption.textContent = link.dataset.caption;
      source.href = link.dataset.source;
      dialog.showModal();
      document.body.classList.add('figure-open');
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('figure-open');
    if (trigger) trigger.focus({preventScroll:true});
  });
})();

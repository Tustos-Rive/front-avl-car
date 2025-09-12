export default function startMenu(header, title, content) {
  // Is just a test, after change to Modal
  const html = `<div class="card border-success mb-3" style="max-width: 40vw">
        <div class="card-header">${header}</div>
        <div class="card-body">
          <h4 class="card-title">${title}</h4>
          <div class="card-text">${content}</div>
        </div>
      </div>`;

  return html;
}

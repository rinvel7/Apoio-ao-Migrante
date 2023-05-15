const templateNovelPortion = (portion) => {
    return `
      <div id="${portion.id}" class="novel-part-container">
        ${
          portion.isOwner && portion.canDelete
            ? `<button class="delete-btn">
                <span class="delete-label">
                  Si pasa 1h o más despúes de publicar, ya no podrás eliminarlo
                </span>🗑️
              </button>`
            : ""
        }
        <div>
          ${portion.data.pharagraph}
        </div>
        <div class="meta">
          ${portion.data.date}
        </div>
      </div>
    `;
  };
  
  export default templateNovelPortion;
const FavoriteButton = (isAdded) => `
${isAdded
    ? `
                                <div class="add__favorite" aria-label="delete favorite" role="button" tabindex="3">
                                    <img data-src="./images/icon-delete.webp" alt="icon delete" class="lazyload"/>
                                    <span class="text__danger text__bold">Remove from favorite</span>
                                </div>
                                `
    : `
                                <div class="add__favorite" aria-label="add favorite" role="button" tabindex="3">
                                    <img data-src="./images/icon-add.jpg" alt="icon add" class="lazyload"/>
                                    <span class="text__default">Add to favorite</span>
                                </div>
                            `
}
`;

export {
  FavoriteButton,
};

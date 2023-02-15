module.exports = {
  '*.{md,json}': ['prettier --cache --write'],
  '*.{js,ts,vue}': ['eslint --fix', 'prettier --cache --write'],
  '*.{css,scss,vue}': ['stylelint --fix', 'prettier --cache --write'],
};

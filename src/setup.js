if (!Element.prototype.setHTMLUnsafe) {
  Element.prototype.setHTMLUnsafe = function(html) {
    this.innerHTML = html;
  };
}

if (!ShadowRoot.prototype.setHTMLUnsafe) {
  ShadowRoot.prototype.setHTMLUnsafe = function(html) {
    this.innerHTML = html;
  };
}
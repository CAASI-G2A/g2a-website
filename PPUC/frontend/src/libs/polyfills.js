// children polyfill for IE11
(function (constructor) {
  if (
    constructor &&
    constructor.prototype &&
    constructor.prototype.children == null
  ) {
    Object.defineProperty(constructor.prototype, "children", {
      get: function () {
        var i = 0,
          node,
          nodes = this.childNodes,
          children = [];
        //iterate all childNodes
        while ((node = nodes[i++])) {
          //remenber those, that are Node.ELEMENT_NODE (1)
          if (node.nodeType === 1) {
            children.push(node);
          }
        }
        return children;
      },
    });
  }
  //apply the fix to all HTMLElements (window.Element) and to SVG/XML (window.Node)
})(window.Node || window.Element);

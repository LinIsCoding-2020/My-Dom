dom = {
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  after(node, nextNode) {
    node.parentNode.insertBefore(node, nextNode.nextSibling);
  },
  before(node, beforeNode) {
    node.parentNode.insertBefore(node, beforeNode);
  },
  append(parent, node) {
    parent.appendChild(node);
  },
  wrap(parent, node) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  empty(node) {
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  attr(node, name, value) {
    if (arguments === 3) {
      node.setAttribute(name, value);
    } else if (arguments === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    if (arguments === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, string) {
    if (arguments === 2) {
      node.innerHTML = string;
    } else if (arguments === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if (arguments === 3) {
      node.style[name] = value;
    } else if (arguments === 2) {
      if (typeof name === "string") {
        // dom.style(div, 'color')
        return node.style[name];
      } else if (name instanceof Object) {
        // dom.style(div, {color: 'red'})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    contains(node, className) {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  sibling(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nextSibling === 3) {
      //去除text节点
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nextSibling === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    const list = dom.children(node.parentNode);
    for (let i = 0; i < list.length; i++) {
      if (list[i] === node) {
        return i;
      }
    }
  },
};

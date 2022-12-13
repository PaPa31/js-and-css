# Inject

Web application injected into pages.

Structure books in a regular File Explorer. View books in a regular Browser.

## `epub2html` styles

Required `js` and `css` files for [epub2html](https://github.com/PaPa31/epub2html) utility.

## 3 Pathes for 3 Environments

The ebup2html utility places this code in the `<head>` section of every html page.

<!-- prettier-ignore -->
```html
<script type="text/javascript" src="/js-and-css/js/inject.js"></script><script type="text/javascript" src="file:///media/storage418Gb/Users/parsh/Documents/Books/js-and-css/js/inject.js"></script><script type="text/javascript" src="file:///F:/Users/parsh/Documents/Books/js-and-css/js/inject.js"></script>
```

<!-- prettier-ignore -->
This makes it possible to open html files from anywhere: Windows Explorer, any Unix Explorers and from a local server.

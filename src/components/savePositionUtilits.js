export function saveScrollPosition(context) {
  let path = context.router.route.location.pathname;
  let y = window.scrollY;
  sessionStorage.setItem("scrollPosition_" + path, y.toString());
}

export function restoreScrollPosition(context) {
  let path = context.router.route.location.pathname;
  let y = Number(sessionStorage.getItem("scrollPosition_" + path));
  window.scrollTo(0, y);
}

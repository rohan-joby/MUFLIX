export const scrollToTop = () => {
  window.scrollTo(0,0);
};

export const scrollToBottom = () => {
//   const element = document.querySelector(".MovieDetails_load__3zHfu");
//   console.log(element);
//   const el=element.clientHeight;
//   console.log(el*5);
//   console.log(element.scrollTop);
//   element.scrollTop = 1000;
    window.scrollTo(0,document.body.scrollHeight);
};

//element.scrollHeight() - element.clientHeight();

export const scrollToTop = () => {
  const el = document.querySelector("#root");
  const scrollOptions = { left: 0, top: 0, behavior: "smooth" };
  console.log(scrollOptions);
  if(!el === null){el.scroll(scrollOptions);}
  if(el === null){window.scroll(scrollOptions);}
  
};

export const scrollToBottom = () => {
  const el = document.querySelector("#root");
  const scrollOptions = { left: 0, top: 850, behavior: "smooth" };
  console.log(scrollOptions);
  console.log(el);
  if(!el === null){el.scroll(scrollOptions);}
  if(el === null){window.scroll(scrollOptions);}
};

//element.scrollHeight() - element.clientHeight();


//.MovieDetails_container__215Fl

const scrollOptions = { left: 0, top: 850, behavior: "smooth" };
window.scroll(scrollOptions);
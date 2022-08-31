const borderGradient = {
  position: 'relative',
  borderRadius: "16px",
  ":after": {
    content: `""`,
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    borderRadius: "inherit",
    // border: "2px solid transparent",
    background: 'linear-gradient(-7deg, #0082bf44, transparent 15%, transparent 85%, #0082bf44);',
    // background: "linear-gradient(170deg, #0082bf44 2%, white, #0082bf44 98%) border-box",
    // "-webkit-mask": "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
    // "-webkit-mask-composite": "destination-out",
    // maskComposite: "exclude",
    margin: "-1px",
    zIndex: "-1",
  }
};

export default borderGradient;
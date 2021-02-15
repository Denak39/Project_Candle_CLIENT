// import * as React from "react";
// import { useLayer, Arrow } from "react-laag";
// import { Button, Menu } from "./ui";

// function Example() {
//   const [isOpen, setOpen] = React.useState(false);

//   const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
//     isOpen,
//     auto: true,
//     triggerOffset: 15,
//     containerOffset: 12,
//     arrowOffset: 4,
//     onDisappear: () => setOpen(false),
//   });

//   return (
//     <>
//       <Button {...triggerProps} onClick={() => setOpen(!isOpen)}>
//         Trigger
//       </Button>
//       {isOpen &&
//         renderLayer(
//           <Menu
//             {...layerProps}
//             style={{ ...layerProps.style, width: 200, height: 150 }}
//           >
//             Layer
//             <Arrow {...arrowProps} size={8} roundness={0.4} />
//           </Menu>
//         )}
//     </>
//   );
// }

// export default Example;

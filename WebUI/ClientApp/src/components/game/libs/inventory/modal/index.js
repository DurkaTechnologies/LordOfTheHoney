// Component: ChestModal
// Def: Main ui for the chest

import React from "react";
// React Spring
import { useTransition, a } from "react-spring";
// State
import { useImmer } from "use-immer";
import { state } from "./state";
// Components
import Grid from "./grid";

const ChestModal = ({ open, setOpen }) => {
  // Set immer state to our default state
  const [chestState, updateChestState] = useImmer(state);

  // Function to close the modal
  const closeModal = () => {
    setOpen(!open);
    closeChest.volume = 0.3;
    closeChest.play();
  };

  // Transitions via react-spring for when our modal mounts/unmounts
  // We fade in and fade out
  // const transitions = useTransition(open, null, {
  //   from: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   leave: { opacity: 0 },
  // });

  // Mount/unmount single-component reveals
  return (
    <>
          <div onClick={closeModal} className="overlay" />
          <div className="modal-chest">
            <div className="top">
              <div className="header">
                <h4>Chest</h4>
                <div onClick={closeModal} className="close">
                  x
                </div>
              </div>
              <Grid
                chestState={chestState}
                updateChestState={updateChestState}
                inventoryType="chestState"
              />
            </div>
            <div className="middle">
              <div className="header">
                <h4>Inventory</h4>
              </div>
              <Grid
                chestState={chestState}
                updateChestState={updateChestState}
                inventoryType="inventoryState"
              />
            </div>
            <div className="bottom">
              <Grid
                chestState={chestState}
                updateChestState={updateChestState}
                inventoryType="hotBarState"
              />
            </div>
          </div>
    </>

  );
};

export default ChestModal;
